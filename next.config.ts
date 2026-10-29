import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, nosnippet" }] }];
  },
};

export default nextConfig;
