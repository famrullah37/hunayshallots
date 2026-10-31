import Link from "next/link";
import { Boxes, Factory, Store, Tag } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { MONTHLY_CAPACITY, MOQ } from "@/lib/company";

const SOLUTIONS = [
  {
    icon: Store,
    title: "Wholesale",
    desc: "Hunay-branded retail packs for importers, distributors and Asian grocery chains, ready for the shelf.",
  },
  {
    icon: Boxes,
    title: "Bulk Supply",
    desc: "Fried shallots and garlic in bulk packaging for food manufacturers, restaurants and catering.",
  },
  {
    icon: Factory,
    title: "OEM Production",
    desc: "Contract manufacturing (maklon) to your specification, produced in our certified facility.",
  },
  {
    icon: Tag,
    title: "Private Label",
    desc: "Your brand, your packaging design. We handle everything from raw shallots to export-ready goods.",
  },
];

export default function B2BSolutions() {
  return (
    <section id="maklon" className="bg-amber-50 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="B2B solutions"
          title="Supply Options for"
          highlight="Every Business"
          subtitle={`Start from ${MOQ} for trial orders and scale up to ${MONTHLY_CAPACITY} per month.`}
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-amber-100 bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-forest-green">
                <s.icon size={28} className="text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{s.title}</h3>
              <p className="leading-relaxed text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#quotation"
            className="rounded-full bg-forest-green px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-800"
          >
            Request a Quotation
          </a>
          <Link href="/wholesale" className="font-semibold text-forest-green hover:underline">
            See export terms &amp; specifications →
          </Link>
        </div>
      </div>
    </section>
  );
}
