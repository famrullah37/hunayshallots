import { ClipboardCheck, Factory, Sprout } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const PILLARS = [
  {
    icon: Sprout,
    title: "Raw Materials",
    points: [
      "Biru lancor shallots from Probolinggo, East Java",
      "Bought directly from partner farmers",
      "Low water content (62–65%) for a crispier, longer-lasting fry",
    ],
  },
  {
    icon: Factory,
    title: "Production",
    points: [
      "Fried in coconut oil with salt — nothing else",
      "No flour, no MSG filler, no preservatives",
      "Vacuum packed: 6–12 months shelf life unopened",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Quality Control",
    points: [
      "HACCP food safety system and GMP practices",
      "ISO 9001:2015 quality management",
      "Halal MUI certified and BPOM registered",
    ],
  },
];

export default function WhyHunaySection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-forest-green to-green-600 py-20">
      <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"></div>
      <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-white/5"></div>

      <div className="relative z-10 container mx-auto px-4">
        <SectionHeading dark eyebrow="Why choose us" title="Why Choose" highlight="Hunay?" />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white/95 p-8 shadow-xl">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700">
                <p.icon size={32} className="text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">{p.title}</h3>
              <ul className="space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-golden-yellow"></span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
