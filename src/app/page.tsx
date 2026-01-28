import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import CompanyProfile from "@/components/CompanyProfile";
import WhyHunaySection from "@/components/WhyHunaySection";
import ProcessSection from "@/components/ProcessSection";
import ProductShowcase from "@/components/ProductShowcase";
import CTASection from "@/components/CTASection";
import TrustSection from "@/components/TrustSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MarqueeSection />
      <CompanyProfile />
      <WhyHunaySection />
      <ProductShowcase />
      <ProcessSection />
      <CTASection />
      <TrustSection />
      <LocationSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
