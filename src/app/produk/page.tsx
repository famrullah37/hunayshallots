import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCatalog from "@/components/ProductCatalog";
import { getProducts } from "@/actions/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Semua Produk — Bawang Goreng, Camilan & Sambal | Hunay",
  description:
    "Jelajahi seluruh produk Hunay: bawang merah goreng, bawang putih goreng, camilan bawang, dan aneka sambal premium. Halal, tanpa pengawet, renyah dari Probolinggo.",
  alternates: { canonical: `${BASE_URL}/produk` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/produk`,
    siteName: "Hunay Fried Onions",
    title: "Semua Produk | Hunay",
    description:
      "Bawang goreng, camilan, dan sambal premium dari Hunay — halal, tanpa pengawet, renyah.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Produk Hunay" }],
  },
};

export default async function ProdukPage() {
  const products = await getProducts(true).catch(() => []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Produk", item: `${BASE_URL}/produk` },
    ],
  };

  const itemListSchema = products.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.nameEn || p.nameId,
          url: `${BASE_URL}/produk/${p.slug}`,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
      <Header />
      <ProductCatalog products={products.length > 0 ? products : undefined} />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
