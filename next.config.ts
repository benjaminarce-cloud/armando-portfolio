import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Lockfiles sit above this folder in iCloud Drive, so Turbopack otherwise
  // guesses the home directory as the workspace root and fails to resolve deps.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Cloudinary already does the job Next's optimizer would do: lib/media.ts
    // requests f_auto,q_auto at a capped width, so every URL is format- and
    // size-negotiated before it leaves the CDN. Running it through the Next
    // optimizer as well re-encodes an already-optimal file, adds a hop, and
    // bills for it. Serve what Cloudinary returns.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    // /work is a project page again, so the blanket /work/:slug -> /video
    // redirect from the last rebrand is gone. What replaces it is a map from
    // every film that used to have a detail page of its own to the project
    // that now contains it — a film is no longer a page, but the URL it had
    // should still land on the work.
    const filmToProject: Record<string, string> = {
      "miles-byrd-doc-trailer": "miles-byrd",
      "byrd-steal-and-one": "miles-byrd",
      "byrd-intro-clip": "miles-byrd",
      "ncaa-golf-postcards": "ncaa-golf",
      "carnell-tate": "carnell-tate",
      "west-coast-final": "world-cup-final",
      "trell-mic-up": "trell",
      "cam-ward": "cam-ward",
      "elzie-20": "elzie",
      "strictly-finale": "strictly-run-club",
      "strictly-fall-recap": "strictly-run-club",
      "practice-727": "aztec-practice",
      "ghost-town": "ghost-town",
      "softball-colors": "softball",
      "tae-dunk": "tae",
      "track-25": "track-field",
      "nevada-shootaround": "aztec-season",
      "march-madness": "aztec-season",
      "san-jose-state-recap": "aztec-season",
      "color-grades": "color-grades",
      reel: "reel",
    };

    return [
      ...Object.entries(filmToProject).map(([film, project]) => ({
        source: `/video/${film}`,
        destination: `/work/${project}`,
        permanent: true,
      })),
      // Anything else that used to be a film detail page falls back to the
      // video mosaic rather than 404ing.
      { source: "/video/:slug", destination: "/video", permanent: true },
      { source: "/about", destination: "/me", permanent: true },
      { source: "/contact", destination: "/me", permanent: true },
    ];
  },
};

export default nextConfig;
