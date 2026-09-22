import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dock-scheduling-system",
  assetPrefix: "/dock-scheduling-system/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
