import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com"],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
