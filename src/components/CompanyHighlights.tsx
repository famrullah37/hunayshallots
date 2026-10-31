import { BadgeCheck } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { CERTIFICATES, FOUNDED_YEAR, MARKETS, MONTHLY_CAPACITY } from "@/lib/company";

const VERIFIED = ["Halal MUI", "BPOM", "HACCP", "ISO 9001:2015"];

export default function CompanyHighlights() {
  const stats = [
    { value: String(FOUNDED_YEAR), label: "Established" },
    { value: MONTHLY_CAPACITY, label: "Production capacity / month" },
    { value: `${new Date().getFullYear() - FOUNDED_YEAR}+ yrs`, label: "Fried shallot experience" },
    { value: `${MARKETS.length}`, label: "Export markets" },
  ];

  return (
    <section id="tentang-kami" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Company highlights" title="About" highlight="CV. Dua Putri Sholehah" />

          <div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#e8dcc4] bg-white p-6 text-center shadow-sm">
                <div className="mb-1 text-3xl font-bold text-forest-green md:text-4xl">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                <strong className="text-forest-green">CV. Dua Putri Sholehah</strong> is the producer of{" "}
                <strong>Hunay</strong> fried shallots, based in Tegalrejo, Dringu, Probolinggo — East Java&apos;s
                shallot-growing heartland. Since {FOUNDED_YEAR} we have grown from a small village kitchen into an
                exporter supplying importers in {MARKETS.length} countries.
              </p>
              <p className="mb-6 leading-relaxed text-gray-600">
                We fry only <em>biru lancor</em> shallots sourced directly from partner farmers, and we employ women
                and young people from the surrounding villages.
              </p>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATES.filter((c) => VERIFIED.includes(c.name)).map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-forest-green/10 px-3 py-1.5 text-sm font-semibold text-forest-green"
                  >
                    <BadgeCheck size={16} />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative isolate">
              <div className="aspect-video overflow-hidden rounded-3xl shadow-xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/LDg_kJmY740"
                  title="Hunay Company Profile"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                ></iframe>
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-forest-green/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
