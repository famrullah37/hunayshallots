import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["ioredis"],
  // English-only export site: product URLs moved from /produk to /products.
  async redirects() {
    return [
      { source: "/produk", destination: "/products", permanent: true },
      { source: "/produk/:slug*", destination: "/products/:slug*", permanent: true },
      // Old Indonesian toggle; the Indonesian site is now bawanghunay.com.
      {
        source: "/",
        has: [{ type: "query", key: "lang", value: "id" }],
        destination: "https://bawanghunay.com/",
        permanent: true,
      },
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
