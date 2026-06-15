import { getPostBySlug } from "@/actions/blog";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunay.id";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Article Not Found" };

  const title = post.titleEn || post.titleId;
  const description = post.excerptEn || post.excerptId || "";
  const url = `${BASE_URL}/blog/${slug}`;
  const image = post.coverImage || "/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title || "" }],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [`${BASE_URL}/tentang-kami`],
      section: "Food & Lifestyle",
      tags: ["fried onion", "bawang goreng", "Hunay", "Indonesian food"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post || !post.isPublished) notFound();

  const title = post.titleEn || post.titleId || "";
  const excerpt = post.excerptEn || post.excerptId || "";
  const content = post.contentEn || post.contentId || "";
  const url = `${BASE_URL}/blog/${slug}`;
  const image = post.coverImage || "/og-image.jpg";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: excerpt,
    image: { "@type": "ImageObject", url: `${BASE_URL}${image}`, width: 1200, height: 630 },
    url,
    datePublished: post.publishedAt?.toISOString() ?? new Date().toISOString(),
    dateModified: post.updatedAt?.toISOString() ?? new Date().toISOString(),
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Hunay — CV. Dua Putri Sholehah",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Hunay",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/hunay_logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", "@id": `${BASE_URL}/#website` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-forest-green transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-forest-green transition">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-xs">{title}</span>
        </nav>

        {post.coverImage && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={post.coverImage} alt={title} fill className="object-cover" priority />
          </div>
        )}

        <p className="text-sm text-gray-400 mb-2">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
            : ""}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {excerpt && (
          <p className="text-lg text-gray-600 mb-8 border-l-4 border-green-500 pl-4">{excerpt}</p>
        )}

        {content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">Interested in Hunay products?</p>
          <a
            href="https://api.whatsapp.com/send/?phone=6285233658619&text=Hello+Hunay,+I+would+like+to+order&type=phone_number"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)/gm, "<h3>$1</h3>")
    .replace(/^## (.+)/gm, "<h2>$1</h2>")
    .replace(/^# (.+)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^> (.+)/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, "<hr />")
    .replace(/^- (.+)/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/^\d+\. (.+)/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hbuliop])/gm, "")
    .replace(/^(.+)$/s, "<p>$1</p>");
}
