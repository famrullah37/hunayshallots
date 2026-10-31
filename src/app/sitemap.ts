import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

export const dynamic = "force-dynamic";

const latest = (dates: Date[]) =>
  dates.length ? new Date(Math.max(...dates.map((d) => d.getTime()))) : undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([
    prisma.blogPost
      .findMany({
        // English-only domain: skip posts that have no English body.
        where: { isPublished: true, contentEn: { not: null } },
        select: { slug: true, updatedAt: true, contentEn: true },
      })
      .then((rows) => rows.filter((post) => post.contentEn?.trim()))
      .catch(() => []),
    prisma.product
      .findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      })
      .catch(() => []),
  ]);

  // lastmod must reflect real content changes: a "now" on every request teaches
  // crawlers to ignore it. Pages without a data source simply omit it.
  const productsUpdated = latest(products.map((p) => p.updatedAt));
  const postsUpdated = latest(posts.map((p) => p.updatedAt));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: latest([productsUpdated, postsUpdated].filter((d): d is Date => !!d)), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: productsUpdated, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/wholesale`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/ja/wholesale`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ko/wholesale`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: postsUpdated, changeFrequency: "weekly", priority: 0.8 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
