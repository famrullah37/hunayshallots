import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["ioredis"],
  // English-only export site: product URLs moved from /produk to /products.
  async redirects() {
    return [
      { source: "/produk", destination: "/products", permanent: true },
      { source: "/produk/:slug*", destination: "/products/:slug*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
