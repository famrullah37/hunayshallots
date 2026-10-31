import { Building2, ShoppingBasket, Truck, UtensilsCrossed } from "lucide-react";
import { AU, CA, JP, KR, SG, US } from "country-flag-icons/react/3x2";
import SectionHeading from "@/components/SectionHeading";
import { MARKETS } from "@/lib/company";

const FLAGS = { AU, CA, JP, KR, SG, US };

const PARTNERS = [
  { icon: Truck, title: "Importers", desc: "Container and consolidated shipments with export documents." },
  { icon: Building2, title: "Distributors", desc: "Regional distribution partnerships for Hunay-branded products." },
  { icon: ShoppingBasket, title: "Asian Grocery Chains", desc: "Shelf-ready retail packs for supermarkets and online stores." },
  { icon: UtensilsCrossed, title: "Food Manufacturers & HoReCa", desc: "Bulk supply as an ingredient or topping." },
];

export default function ExportSection() {
  return (
    <section id="ekspor" className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            dark
            eyebrow="Export experience"
            title="Trusted by Buyers in"
            highlight={`${MARKETS.length} Countries`}
            subtitle="Hunay fried shallots already reach kitchens and grocery shelves across Asia, North America and Oceania."
          />

          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {MARKETS.map((m) => {
              const Flag = FLAGS[m.code];
              return (
                <div key={m.name} className="rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10">
                  <Flag aria-hidden="true" className="mx-auto mb-3 h-8 w-12 rounded-sm shadow ring-1 ring-white/20" />
                  <div className="font-semibold text-white">{m.name}</div>
                </div>
              );
            })}
          </div>

          <h3 className="mb-8 text-center text-2xl font-bold text-white">Global Partnership Opportunities</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6">
                <p.icon size={28} className="mb-4 text-forest-green" />
                <h4 className="mb-2 font-bold text-gray-900">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#quotation"
              className="inline-block rounded-full bg-golden-yellow px-8 py-4 text-lg font-bold text-gray-900 shadow-lg transition hover:bg-amber-400"
            >
              Become a Hunay Partner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
