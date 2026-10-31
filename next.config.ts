import type { NextConfig } from "next";

// Security headers for every route. No strict Content-Security-Policy on purpose:
// the site loads third-party scripts and frames (YouTube, Cloudinary, Umami).
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["ioredis"],
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
