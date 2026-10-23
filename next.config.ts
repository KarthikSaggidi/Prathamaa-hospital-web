import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 95],
  },
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [{ source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, nosnippet" }] }];
  },
};

export default nextConfig;
