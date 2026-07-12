import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Lockfiles sit above this folder in iCloud Drive, so Turbopack otherwise
  // guesses the home directory as the workspace root and fails to resolve deps.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    // The rebrand replaced /work with /video and folded /about into /contact.
    return [
      { source: "/work", destination: "/video", permanent: true },
      { source: "/work/:slug", destination: "/video/:slug", permanent: true },
      { source: "/about", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
