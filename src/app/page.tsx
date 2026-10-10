import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import CompanyProfile from "@/components/CompanyProfile";
import WhyHunaySection from "@/components/WhyHunaySection";
import ProcessSection from "@/components/ProcessSection";
import ProductShowcase from "@/components/ProductShowcase";
import MaklonSection from "@/components/MaklonSection";
import CTASection from "@/components/CTASection";
import TrustSection from "@/components/TrustSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Metadata } from "next";
import { getProducts } from "@/actions/products";
import { getGalleryVideos } from "@/actions/videos";

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
  const [products, galleryVideos] = await Promise.all([
    getProducts(true).catch(() => []),
    getGalleryVideos(),
  ]);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <Header />
      <HeroSection />
      <MarqueeSection />
      <CompanyProfile />
      <WhyHunaySection />
      <ProductShowcase products={products.length > 0 ? products : undefined} />
      <ProcessSection />
      <MaklonSection />
      <CTASection />
      <TrustSection />
      <GallerySection galleryVideos={galleryVideos} />
      <LocationSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
