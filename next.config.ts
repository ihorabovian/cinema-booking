import type { NextConfig } from "next";

const apiBaseUrl = process.env.API_BASE_URL;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Posters and actor photos are served by the cinema API.
    remotePatterns: apiBaseUrl ? [new URL(`${apiBaseUrl}/static/**`)] : [],
    // The local API runs on 127.0.0.1, which Next.js blocks by default to prevent SSRF.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
