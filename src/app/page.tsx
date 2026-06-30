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
import { getProducts } from "@/actions/products";
import { getGalleryVideos } from "@/actions/videos";

export const revalidate = 3600;

export default async function Home() {
  const [products, galleryVideos] = await Promise.all([
    getProducts(true).catch(() => []),
    getGalleryVideos(),
  ]);

  return (
    <div className="min-h-screen">
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
