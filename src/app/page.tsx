import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CompanyHighlights from "@/components/CompanyHighlights";
import ProductCategories from "@/components/ProductCategories";
import B2BSolutions from "@/components/B2BSolutions";
import WhyHunaySection from "@/components/WhyHunaySection";
import ProductionSection from "@/components/ProductionSection";
import ExportSection from "@/components/ExportSection";
import TrustSection from "@/components/TrustSection";
import QuotationSection from "@/components/QuotationSection";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { getGalleryVideos } from "@/actions/videos";
import { getPosts } from "@/actions/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

export const revalidate = 3600;

// Canonical & hreflang khusus homepage — jangan di root layout,
// karena akan diwarisi semua halaman dan membuat Google menganggapnya duplikat homepage
export const metadata: Metadata = {
  alternates: {
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
      // Indonesian-market site (separate domain). Needs the reciprocal tag on bawanghunay.com.
      id: "https://bawanghunay.com",
      "x-default": BASE_URL,
    },
  },
};

// WebPage schema is homepage-only (it describes this URL, so it must not live in the root layout).
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Hunay — Premium Fried Onions & Fried Shallots | Export Quality from Probolinggo",
  inLanguage: "en",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  description:
    "Premium crispy fried shallots and fried garlic from Probolinggo, Indonesia. Halal MUI certified, no preservatives, biru lancor variety. Bulk supply, private label and export to importers and distributors worldwide.",
  primaryImageOfPage: { "@type": "ImageObject", url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 },
};

export default async function Home() {
  const [galleryVideos, posts] = await Promise.all([
    getGalleryVideos(),
    getPosts(true).then((p) => p.slice(0, 3)).catch(() => []),
  ]);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <Header />
      <HeroSection />
      <CompanyHighlights />
      <ProductCategories />
      <B2BSolutions />
      <WhyHunaySection />
      <ProductionSection galleryVideos={galleryVideos} />
      <ExportSection />
      <TrustSection />
      <QuotationSection />
      <LatestArticles posts={posts} />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
