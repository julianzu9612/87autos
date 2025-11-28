import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/87autos',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
