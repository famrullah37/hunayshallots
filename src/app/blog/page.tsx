import { getPosts } from "@/actions/blog";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunay.id";

export const metadata: Metadata = {
  title: "Blog & Artikel — Hunay Fried Onions",
  description:
    "Tips, resep, dan cerita seputar bawang goreng premium Hunay dari Probolinggo, Indonesia. Tips memasak, cara penyimpanan, dan informasi ekspor.",
  keywords: [
    "blog bawang goreng", "resep bawang goreng", "tips memasak bawang goreng",
    "hunay blog", "artikel bawang goreng premium",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
    languages: {
      "en-US": `${BASE_URL}/blog`,
      "id-ID": `${BASE_URL}/blog?lang=id`,
    },
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "Hunay Fried Onions",
    title: "Blog & Artikel — Hunay Fried Onions",
    description: "Tips, resep, dan cerita seputar bawang goreng premium Hunay dari Probolinggo.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hunay Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Artikel — Hunay Fried Onions",
    description: "Tips, resep, dan cerita seputar bawang goreng premium Hunay.",
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getPosts(true).catch(() => []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="mb-10 text-center">
          <Link href="/" className="text-sm text-green-700 hover:underline mb-4 inline-block">← Kembali ke Beranda</Link>
          <h1 className="text-4xl font-bold text-gray-900">Blog & Artikel</h1>
          <p className="text-gray-500 mt-2">Tips, resep, dan cerita seputar bawang goreng premium Hunay</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Belum ada artikel. Segera hadir!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
              >
                <div className="relative h-48 bg-gray-100">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-5xl">🧅</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-2">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
                      : ""}
                  </p>
                  <h2 className="font-bold text-gray-900 line-clamp-2 group-hover:text-green-700 transition">
                    {post.titleEn}
                  </h2>
                  {post.excerptEn && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">{post.excerptEn}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
