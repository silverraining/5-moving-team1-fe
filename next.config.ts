import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["moving-app-uploads.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
