import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for optimized Docker builds
  output: "standalone",


  basePath: "/newframe",
  assetPrefix: "/newframe",
};

export default nextConfig;
