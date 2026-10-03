import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  async redirects() {
    return [
      { source: "/expertises", destination: "/services", permanent: true },
      {
        source: "/ja/expertises",
        destination: "/ja/services",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
