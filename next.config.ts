import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/rooms",
        destination: "/rooms/deluxe-ac",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
