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
    // /work became /video in the last rebrand. This one moves the bio off the
    // home page onto /me, so /about and /contact both land there. Every film
    // slug changed with the new drop, so old detail URLs go to the index
    // rather than to a 404.
    return [
      { source: "/work", destination: "/video", permanent: true },
      { source: "/work/:slug", destination: "/video", permanent: true },
      { source: "/about", destination: "/me", permanent: true },
      { source: "/contact", destination: "/me", permanent: true },
    ];
  },
};

export default nextConfig;
