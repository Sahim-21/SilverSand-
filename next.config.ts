import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/rooms/deluxe-ac",
        destination: "/rooms/deluxe-ac-room",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
