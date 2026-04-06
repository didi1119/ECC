import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ECC",
  assetPrefix: "/ECC/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
