import Header from "@/components/Header";
import CompanyProfile from "@/components/CompanyProfile";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function TentangKami() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <CompanyProfile />
      </div>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
