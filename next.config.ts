import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com", "i.postimg.cc"],
  },
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
