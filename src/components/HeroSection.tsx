import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { FOUNDED_YEAR } from "@/lib/company";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f1e8] pt-28 pb-16 md:pt-32 lg:min-h-screen lg:flex lg:items-center">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-forest-green/10 px-4 py-2 text-sm font-semibold text-forest-green">
              Manufacturer &amp; Exporter · Probolinggo, Indonesia · Since {FOUNDED_YEAR}
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Premium Fried Shallots, <span className="text-forest-green">Made for Global Kitchens</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700">
              Crispy fried shallots, fried garlic and sambal from biru lancor shallots — no preservatives,
              Halal MUI and HACCP certified. Bulk supply, OEM and private label for importers and distributors.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#quotation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-green px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-800"
              >
                Request a Quotation
                <ArrowRight size={20} />
              </a>
              <a
                href="/hunay-spec-sheet.pdf"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest-green px-8 py-4 text-lg font-semibold text-forest-green transition hover:bg-forest-green hover:text-white"
              >
                <FileText size={20} />
                Product Spec Sheet
              </a>
            </div>
          </div>

          <div className="relative isolate">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/hero-hunay.jpg"
                alt="Hunay fried shallots in jar, pouch and gift box packaging"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-3xl bg-forest-green/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
