import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    agentUpgrade: "latest",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        condition: {
          not: {
            path: /\.module\.css$/,
          },
        },
      },
    },
  },
};

export default nextConfig;
