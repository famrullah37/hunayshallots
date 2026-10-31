import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const PRODUCTS = [
  {
    name: "Fried Shallots",
    image: "/products/bawang-merah-goreng-toples-150.jpg",
    desc: "Our core product. Biru lancor shallots fried in coconut oil — crispy, golden and aromatic, with no flour and no preservatives.",
    formats: "Pouch 100 g · Jar 150 g · Bulk",
  },
  {
    name: "Fried Garlic",
    image: "/products/bawang-putih-goreng-pouch.jpg",
    desc: "Selected garlic fried in coconut oil with salt. A ready-to-use topping for noodles, rice, soups and snacks.",
    formats: "Pouch 100 g · Jar 150 g · Bottle 75 g · Bulk",
  },
  {
    name: "Sambal",
    image: "/products/sambel-geprek-pedas.jpg",
    desc: "Authentic Indonesian chili sambal made in the same facility — a natural add-on for Asian grocery and food-service buyers.",
    formats: "Retail jars · Variants on request",
  },
];

export default function ProductCategories() {
  return (
    <section id="produk" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Our products"
          title="Three Product Lines,"
          highlight="One Export-Ready Supplier"
          subtitle="Available in retail packs, bulk packaging or under your own brand."
        />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
              <div className="relative aspect-4/3 bg-gray-100">
                <Image src={p.image} alt={`Hunay ${p.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">{p.name}</h3>
                <p className="mb-4 flex-1 text-gray-600">{p.desc}</p>
                <p className="mb-5 text-sm font-medium text-forest-green">{p.formats}</p>
                <a
                  href="#quotation"
                  className="inline-flex items-center gap-2 font-semibold text-forest-green hover:text-green-800"
                >
                  Request a quotation <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-forest-green px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
          >
            View Full Product Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
