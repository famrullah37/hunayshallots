import { getPostBySlug, getPosts } from "@/actions/blog";
import Image from "next/image";
import { cache } from "react";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

export const revalidate = 3600;

// generateMetadata and the page both need the post; dedupe the DB query per request.
const getPost = cache((slug: string) => getPostBySlug(slug).catch(() => null));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found" };

  const title = post.titleEn || post.titleId;
  const description = post.excerptEn || post.excerptId || "";
  const url = `${BASE_URL}/blog/${slug}`;
  const image = post.coverImage || "/og-image.jpg";
  // This domain is English-only. Posts without English content would render the
  // Indonesian fallback, which belongs on bawanghunay.com — keep those out of the index.
  const hasEnglish = Boolean(post.contentEn?.trim());

  return {
    title,
    ...(hasEnglish ? {} : { robots: { index: false, follow: true } }),
    description,
    keywords: post.keywords
      ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title || "" }],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [BASE_URL],
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
  const post = await getPost(slug);
  if (!post || !post.isPublished) notFound();
  // Indonesian-only posts live on bawanghunay.com; send visitors and link equity there.
  if (!post.contentEn?.trim()) permanentRedirect(`https://bawanghunay.com/blog/${slug}`);

  // Related articles give crawlers and readers a path between posts.
  const related = (await getPosts(true).catch(() => []))
    .filter((p) => p.slug !== slug && p.contentEn?.trim())
    .slice(0, 3);

  const title = post.titleEn || post.titleId || "";
  const excerpt = post.excerptEn || post.excerptId || "";
  const content = post.contentEn || post.contentId || "";
  const url = `${BASE_URL}/blog/${slug}`;
  const image = post.coverImage || "/og-image.jpg";
  const absImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description: excerpt,
    image: { "@type": "ImageObject", url: absImage, width: 1200, height: 630 },
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
    inLanguage: "en",
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
            className="article-content"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />
        )}

        <div className="mt-12 rounded-2xl bg-green-50 p-8 text-center">
          <p className="text-xl font-bold text-gray-900 mb-2">Buying fried shallots for your business?</p>
          <p className="text-gray-600 mb-6">Request samples, specs and a quotation. We reply in English.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/wholesale#quote"
              className="inline-block bg-green-700 text-white px-8 py-3 rounded-full font-medium hover:bg-green-800 transition"
            >
              Request a Quote
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=6285233658619&text=Hello+Hunay,+I+would+like+to+order&type=phone_number"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-green-700 text-green-700 px-8 py-3 rounded-full font-medium hover:bg-green-100 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="rounded-xl border border-gray-100 p-4 hover:border-green-600 hover:shadow-sm transition"
                >
                  <p className="font-semibold text-gray-900 line-clamp-3">{p.titleEn || p.titleId}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label: string, href: string) =>
      href.startsWith("/") || href.startsWith("#")
        ? `<a href="${href}">${label}</a>`
        : `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
    );
}

function tableRow(line: string, cell: "th" | "td"): string {
  const cells = line.trim().replace(/^\||\|$/g, "").split("|");
  return `<tr>${cells.map((c) => `<${cell}>${inline(c.trim())}</${cell}>`).join("")}</tr>`;
}

// Block-level markdown: headings, lists, tables, quotes, rules and paragraphs.
function markdownToHtml(md: string): string {
  const html: string[] = [];
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
    } else if (/^#{1,3} /.test(line)) {
      const level = line.match(/^#+/)![0].length;
      html.push(`<h${level}>${inline(line.slice(level + 1))}</h${level}>`);
      i++;
    } else if (/^---+$/.test(line.trim())) {
      html.push("<hr />");
      i++;
    } else if (line.trim().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++]);
      const body = rows.slice(2).map((r) => tableRow(r, "td")).join("");
      html.push(`<div class="table-wrap"><table><thead>${tableRow(rows[0], "th")}</thead><tbody>${body}</tbody></table></div>`);
    } else if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(`<li>${inline(lines[i++].slice(2))}</li>`);
      html.push(`<ul>${items.join("")}</ul>`);
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(/^\d+\. /, ""))}</li>`);
      html.push(`<ol>${items.join("")}</ol>`);
    } else if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) quote.push(inline(lines[i++].slice(2)));
      html.push(`<blockquote>${quote.join("<br />")}</blockquote>`);
    } else {
      const para: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^(#{1,3} |[-*] |\d+\. |> |\|)/.test(lines[i]) &&
        !/^---+$/.test(lines[i].trim())
      ) {
        para.push(inline(lines[i++]));
      }
      html.push(`<p>${para.join(" ")}</p>`);
    }
  }

  return html.join("\n");
}
