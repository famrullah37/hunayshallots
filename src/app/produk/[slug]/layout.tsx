import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

const CATEGORY_LABELS: Record<string, string> = {
  "bawang-putih": "Fried Garlic",
  "bawang-merah": "Fried Shallot",
  sambal: "Sambal Sauce",
};

async function getProductSEO(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      select: {
        nameEn: true,
        nameId: true,
        descriptionEn: true,
        descriptionId: true,
        imageUrl: true,
        price: true,
        category: true,
        weight: true,
        keywords: true,
      },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductSEO(slug);

  if (!product) return { title: "Produk | Hunay" };

  const name = product.nameEn || product.nameId;
  const category = CATEGORY_LABELS[product.category] || product.category;
  const description =
    product.descriptionEn ||
    product.descriptionId ||
    `${name} — ${category} premium dari Hunay, Probolinggo. Halal, tanpa pengawet, renyah.`;
  const imgUrl = product.imageUrl || `${BASE_URL}/og-image.jpg`;
  const absImg = imgUrl.startsWith("http") ? imgUrl : `${BASE_URL}${imgUrl}`;
  const url = `${BASE_URL}/produk/${slug}`;
  const weightLabel =
    product.weight >= 1000
      ? `${(product.weight / 1000).toFixed(0)}kg`
      : `${product.weight}g`;

  return {
    title: `${name} (${weightLabel}) — ${category} | Hunay`,
    description,
    keywords: product.keywords
      ? product.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Hunay Fried Onions",
      title: `${name} | Hunay`,
      description,
      images: [{ url: absImg, width: 1200, height: 630, alt: name || "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | Hunay`,
      description,
      images: [absImg],
    },
    other: {
      "product:price:amount": String(product.price),
      "product:price:currency": "IDR",
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductSEO(slug);
  const url = `${BASE_URL}/produk/${slug}`;

  const productSchema = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.nameEn || product.nameId,
        description: product.descriptionEn || product.descriptionId || "",
        image: product.imageUrl?.startsWith("http")
          ? product.imageUrl
          : `${BASE_URL}${product.imageUrl || "/og-image.jpg"}`,
        url,
        brand: { "@type": "Brand", name: "Hunay" },
        manufacturer: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: "CV. Dua Putri Sholehah",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.price,
          availability: "https://schema.org/InStock",
          url,
          seller: { "@type": "Organization", name: "Hunay" },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "50",
          bestRating: "5",
          worstRating: "1",
        },
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Produk", item: `${BASE_URL}/produk` },
      {
        "@type": "ListItem",
        position: 3,
        name: product ? product.nameEn || product.nameId : "Produk",
        item: url,
      },
    ],
  };

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
