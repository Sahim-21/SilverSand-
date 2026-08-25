import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preview / port-forward clients hit 127.0.0.1; Next 16 blocks that HMR origin by default.
  allowedDevOrigins: ["127.0.0.1"],
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
