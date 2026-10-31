import Image from "next/image";
import { FileCheck2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CERTIFICATES } from "@/lib/company";

export default function TrustSection() {
  return (
    <section id="sertifikat" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Certificates & quality"
            title="Certified for"
            highlight="International Trade"
            subtitle="Valid certifications covering food safety, quality management and halal compliance."
          />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {CERTIFICATES.map((cert) => (
              <div key={cert.name} className="rounded-2xl p-6 text-center shadow-lg transition hover:shadow-xl">
                <div className="relative mx-auto mb-4 h-20 w-20">
                  <Image src={cert.image} alt={`${cert.name} certificate`} fill sizes="80px" className="object-contain" />
                </div>
                <h3 className="font-bold text-gray-900">{cert.name}</h3>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-forest-green/5 p-5 text-gray-700">
            <FileCheck2 size={24} className="mt-0.5 shrink-0 text-forest-green" />
            <p>
              Copies of all certificates are available to importers on request — mention it in your{" "}
              <a href="#quotation" className="font-semibold text-forest-green underline">quotation request</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
