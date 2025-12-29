import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 70, 80, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["png.pngtree.com", "randomuser.me", "images.pexels.com"],
  },
};

export default nextConfig;
