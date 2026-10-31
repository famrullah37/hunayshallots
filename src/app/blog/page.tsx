import { getPosts } from "@/actions/blog";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

const TITLE = "Fried Shallot Buying Guides & Export Insights";
const DESCRIPTION =
  "Guides for importers, distributors and food manufacturers buying fried shallots from Indonesia: sourcing, specifications, packaging, shelf life and recipes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "fried shallot supplier", "import fried shallots from Indonesia", "fried shallot wholesale",
    "bulk fried onions", "fried shallot specifications", "Hunay blog",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "Hunay Fried Onions",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hunay Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${BASE_URL}/og-image.jpg`],
  },
};

// Rendered per request: the Docker build has no database, so a build-time
// prerender would bake in an empty list until the first revalidation.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // English-only domain: list only posts that actually have English content.
  const posts = (await getPosts(true).catch(() => [])).filter((p) => p.contentEn?.trim());

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-20 max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-forest-green mb-2">Hunay Blog</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Buying Guides &amp; Export Insights</h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Practical guides for importers, distributors and food manufacturers sourcing fried shallots
            from Indonesia, plus recipes for your customers.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No articles yet. Coming soon!</p>
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

        <div className="mt-16 rounded-2xl bg-forest-green p-8 text-center text-white">
          <p className="text-xl font-bold mb-2">Sourcing fried shallots for your business?</p>
          <p className="text-white/80 mb-6">Get specifications, samples and an export quotation.</p>
          <Link
            href="/wholesale#quote"
            className="inline-block rounded-full bg-golden-yellow px-8 py-3 font-bold text-gray-900 transition hover:bg-amber-400"
          >
            Request a Quote
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
