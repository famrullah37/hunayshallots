import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

interface Post {
  id: string;
  slug: string;
  titleEn: string;
  excerptEn: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
}

// Always rendered so the homepage keeps its link into the blog even when no posts load.
export default function LatestArticles({ posts }: { posts: Post[] }) {
  return (
    <section id="artikel" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Articles"
            title="Guides for"
            highlight="Buyers & Importers"
            subtitle="Sourcing tips, product knowledge and export insights on Indonesian fried shallots."
          />

          {posts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-48 bg-gray-100">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.titleEn}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-5xl">🧅</div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.publishedAt && (
                      <p className="mb-2 text-xs text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    )}
                    <h3 className="line-clamp-2 font-bold text-gray-900 transition group-hover:text-green-700">{post.titleEn}</h3>
                    {post.excerptEn && <p className="mt-2 line-clamp-3 text-sm text-gray-500">{post.excerptEn}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-forest-green hover:underline">
              Read all articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
