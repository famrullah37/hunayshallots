import Image from "next/image";
import { FileCheck2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import CertificateGallery from "@/components/CertificateGallery";
import { LOGO_ONLY_CERTIFICATES } from "@/lib/company";

export default function TrustSection() {
  return (
    <section id="sertifikat" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Certificates & quality"
            title="Certified for"
            highlight="International Trade"
            subtitle="Certifications covering food safety, quality management and export registration. Tap a certificate to view it."
          />

          <CertificateGallery />

          {LOGO_ONLY_CERTIFICATES.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              {LOGO_ONLY_CERTIFICATES.map((cert) => (
                <div key={cert.name} className="flex items-center gap-2">
                  <div className="relative h-12 w-12">
                    <Image src={cert.image} alt={`${cert.name} certificate`} fill sizes="48px" className="object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{cert.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-forest-green/5 p-5 text-gray-700">
            <FileCheck2 size={24} className="mt-0.5 shrink-0 text-forest-green" />
            <p>
              Previews are watermarked. Official copies of all certificates are sent to importers on request — mention
              it in your{" "}
              <a href="#quotation" className="font-semibold text-forest-green underline">quotation request</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
