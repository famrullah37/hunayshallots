import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import InquiryForm from "@/components/InquiryForm";
import { WHOLESALE_LANGUAGES } from "@/lib/i18n/hreflang";
import { CONTACT_EMAIL as EMAIL, WA_NUMBER, WA_DISPLAY } from "@/lib/contact";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";
const PAGE_URL = `${BASE_URL}/wholesale`;
const SPEC_SHEET = "/hunay-spec-sheet.pdf";

const CERTIFICATES = [
  { name: "Halal MUI", image: "/halalmui.png" },
  { name: "BPOM", image: "/bpom.png" },
  { name: "HACCP", image: "/haccp.png" },
  { name: "ISO 9001:2015", image: "/iso9001.jpg" },
  { name: "GMP", image: "/gmp.png" },
  { name: "GAP", image: "/good.png" },
  { name: "Non-GMO", image: "/gmo.png" },
  { name: "FDA", image: "/fda.png" },
];

// ─── Export terms ────────────────────────────────────────────────────────────
// TODO(Hunay): replace every "On request" with confirmed figures before promoting
// this page in ads/outreach. Concrete numbers (MOQ, lead time, Incoterms, carton
// specs, HS code) are what importers search for and what AI answers quote.
const EXPORT_TERMS: { label: string; value: string }[] = [
  { label: "Minimum order (MOQ)", value: "10 kg" },
  { label: "Production capacity", value: "1 ton+ per month" },
  { label: "Incoterms", value: "On request (e.g. FOB / CIF)" },
  { label: "Port of loading", value: "On request" },
  { label: "Lead time", value: "On request" },
  { label: "Payment terms", value: "On request" },
  { label: "Samples", value: "Available on request" },
  { label: "Documents", value: "Halal MUI, BPOM, ISO 9001:2015, HACCP — copies on request" },
];

const PRODUCTS = [
  {
    name: "Fried Shallots (Bawang Merah Goreng)",
    image: "/products/bawang-merah-goreng-pouch.jpg",
    spec: "100% biru lancor shallots, coconut oil, salt. No flour, no preservatives.",
  },
  {
    name: "Fried Garlic (Bawang Putih Goreng)",
    image: "/products/bawang-putih-goreng-pouch.jpg",
    spec: "Selected garlic, coconut oil, salt. No additives, no preservatives.",
  },
  {
    name: "Private Label / OEM",
    image: "/products/bawang-merah-goreng-toples-150.jpg",
    spec: "Your brand and packaging — we handle raw material to finished, export-ready goods.",
  },
];

const SPECS: { label: string; value: string }[] = [
  { label: "Raw material", value: "Biru lancor shallots from Probolinggo, East Java (water content 62–65%)" },
  { label: "Ingredients", value: "Shallots or garlic, coconut oil, salt" },
  { label: "Preservatives", value: "None" },
  { label: "Shelf life", value: "6–12 months unopened (vacuum packed)" },
  { label: "Retail packs", value: "Pouch 100 g · Jar 150 g · Bottle 75 g" },
  { label: "Bulk packs", value: "On request" },
  { label: "Diet", value: "Halal · Vegetarian · Vegan" },
  { label: "Certifications", value: "Halal MUI, BPOM, ISO 9001:2015, HACCP, GMP, GAP, P-IRT" },
];

// Real importer testimonials only — add with the buyer's written permission.
// The section stays hidden while this list is empty.
const IMPORTER_TESTIMONIALS: { quote: string; name: string; company: string; country: string }[] = [];

const MARKETS = ["Japan", "South Korea", "Canada", "Singapore", "United States", "Australia"];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does Hunay export fried shallots internationally?",
    a: "Yes. Hunay exports fried shallots and fried garlic to Japan, South Korea, Canada, Singapore, the United States and Australia. We work with importers, distributors, Asian grocery chains and food manufacturers.",
  },
  {
    q: "What are Hunay fried shallots made of?",
    a: "Only biru lancor shallots grown in Probolinggo, East Java, fried in coconut oil with salt. There is no flour, no MSG filler and no artificial preservatives.",
  },
  {
    q: "Are Hunay products halal certified?",
    a: "Yes. Hunay holds Halal MUI certification, plus BPOM registration, ISO 9001:2015, HACCP, GMP and GAP. Copies of certificates are available for importers on request.",
  },
  {
    q: "How long do the fried shallots stay crispy?",
    a: "6–12 months unopened in vacuum packaging. After opening, 1–2 months in an airtight container in a cool, dry place. Do not refrigerate — humidity makes them soggy.",
  },
  {
    q: "What makes biru lancor shallots better for frying?",
    a: "Biru lancor has a low water content (62–65%) and higher natural sugars. That gives crispier texture, a deeper golden color, stronger aroma and a longer shelf life without preservatives.",
  },
  {
    q: "Can you produce fried shallots under our own brand?",
    a: "Yes. We offer private label (OEM / maklon) production — from raw shallots to finished goods in your packaging and label design.",
  },
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "The minimum order is 10 kg. Larger volumes, private label and container orders are quoted on request.",
  },
  {
    q: "Can I get a sample before placing a bulk order?",
    a: "Yes. Contact us by email or WhatsApp with your company name, destination country and expected volume, and we will arrange samples and a quotation.",
  },
  {
    q: "Are Hunay fried shallots suitable for vegans?",
    a: "Yes. The ingredients are plant-based only: shallots or garlic, coconut oil and salt.",
  },
  {
    q: "Where is Hunay produced?",
    a: "Hunay is produced by CV. Dua Putri Sholehah in Tegalrejo, Dringu, Probolinggo, East Java, Indonesia. Shallots come directly from partner farmers in the Probolinggo region.",
  },
];

const waText = encodeURIComponent(
  "Hello Hunay, I'm interested in importing your fried shallots.\nCompany:\nCountry:\nProduct:\nEstimated volume (kg/month):\nPackaging (retail / bulk / private label):"
);
const WA_LINK = `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${waText}&type=phone_number`;
const MAIL_LINK = `mailto:${EMAIL}?subject=${encodeURIComponent("Export inquiry — Hunay fried shallots")}&body=${waText}`;

export const metadata: Metadata = {
  title: "Wholesale & Export Fried Shallots Supplier — Bulk, Private Label",
  description:
    "Import crispy fried shallots and fried garlic from Hunay, Indonesia. Biru lancor shallots, Halal MUI, HACCP, ISO 9001, no preservatives. Bulk supply and private label for importers and distributors.",
  alternates: { canonical: PAGE_URL, languages: WHOLESALE_LANGUAGES },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Hunay Fried Onions",
    title: "Wholesale & Export Fried Shallots — Hunay, Indonesia",
    description:
      "Bulk and private label fried shallots for importers. Halal, HACCP, ISO 9001, no preservatives. Exporting to Japan, Korea, Canada, Singapore, USA & Australia.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "Hunay wholesale fried shallots" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${PAGE_URL}#service`,
  name: "Wholesale and private label fried shallots for export",
  serviceType: "Food manufacturing and export",
  provider: { "@id": `${BASE_URL}/#organization` },
  areaServed: MARKETS.map((name) => ({ "@type": "Country", name })),
  url: PAGE_URL,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Wholesale & Export", item: PAGE_URL },
  ],
};

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-forest-green">Home</Link> / <span className="text-gray-600">Wholesale & Export</span>
            <span className="mx-2">·</span>
            <Link href="/ja/wholesale" hrefLang="ja" className="hover:text-forest-green">日本語</Link>
            <span className="mx-1">·</span>
            <Link href="/ko/wholesale" hrefLang="ko" className="hover:text-forest-green">한국어</Link>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-forest-green mb-5">
            Wholesale & Export Fried Shallots from Indonesia
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8" data-speakable>
            Hunay supplies crispy fried shallots and fried garlic made from biru lancor shallots in Probolinggo,
            East Java. Halal MUI, HACCP and ISO 9001 certified, with no preservatives. We ship to importers,
            distributors and food brands in {MARKETS.slice(0, -1).join(", ")} and {MARKETS[MARKETS.length - 1]}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quote" className="bg-forest-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition">
              Request a Quote
            </a>
            <a href={SPEC_SHEET} download className="border-2 border-forest-green text-forest-green px-8 py-3 rounded-full font-semibold hover:bg-forest-green hover:text-white transition">
              Download Spec Sheet (PDF)
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="border-2 border-forest-green text-forest-green px-8 py-3 rounded-full font-semibold hover:bg-forest-green hover:text-white transition">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* Products */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What we supply</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="relative h-48 bg-gray-50">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specs + terms */}
        <section className="container mx-auto px-4 max-w-5xl mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {SPECS.map((s) => (
                  <tr key={s.label} className="border-b border-gray-100">
                    <th scope="row" className="text-left font-semibold text-gray-700 py-3 pr-4 align-top w-2/5">{s.label}</th>
                    <td className="py-3 text-gray-600">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Export terms</h2>
            <table className="w-full text-sm">
              <tbody>
                {EXPORT_TERMS.map((s) => (
                  <tr key={s.label} className="border-b border-gray-100">
                    <th scope="row" className="text-left font-semibold text-gray-700 py-3 pr-4 align-top w-2/5">{s.label}</th>
                    <td className="py-3 text-gray-600">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Certificates */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Certifications</h2>
          <p className="text-gray-600 mb-6">Certificate copies are included with quotations and shipment documents.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CERTIFICATES.map((c) => (
              <div key={c.name} className="rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-3">
                <div className="relative h-20 w-20">
                  <Image src={c.image} alt={`${c.name} certificate — Hunay`} fill sizes="80px" className="object-contain" />
                </div>
                <span className="text-sm font-semibold text-gray-700">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Markets */}
        <section className="bg-amber-50 py-14 mb-16">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Export markets</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKETS.map((m) => (
                <span key={m} className="bg-white text-forest-green font-semibold px-5 py-2 rounded-full shadow-sm">{m}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Importer testimonials (hidden until real ones are added) */}
        {IMPORTER_TESTIMONIALS.length > 0 && (
          <section className="container mx-auto px-4 max-w-5xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What our importers say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {IMPORTER_TESTIMONIALS.map((t) => (
                <figure key={t.company} className="rounded-2xl border border-gray-100 p-6">
                  <blockquote className="text-gray-700 mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{t.name}</span>, {t.company} — {t.country}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* How to import */}
        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How to start an order</h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ["Send an inquiry", "Tell us your company, country, product and estimated volume."],
              ["Samples & quotation", "We send samples, specs, certificates and a price offer."],
              ["Confirm the order", "Agree on packaging, Incoterms, payment and shipping schedule."],
              ["Production & shipping", "We produce, pack and ship with full export documents."],
            ].map(([title, desc], i) => (
              <li key={title} className="rounded-2xl border border-gray-100 p-5">
                <div className="text-golden-yellow font-bold text-2xl mb-2">{i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ (visible — the FAQPage schema above must match this) */}
        <section className="container mx-auto px-4 max-w-3xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Importer FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-xl border border-gray-100 p-5 open:shadow-sm">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between gap-4">
                  {f.q}
                  <span className="text-forest-green group-open:rotate-45 transition">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* RFQ form */}
        <section id="quote" className="container mx-auto px-4 max-w-3xl mb-16 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Request a quotation</h2>
          <p className="text-gray-600 mb-6">Tell us what you need. We reply by email with pricing, specs and sample options.</p>
          <InquiryForm sourcePage="/wholesale" />
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-forest-green rounded-3xl px-6 py-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Prefer email or WhatsApp?</h2>
            <p className="text-white/80 mb-6">We reply in English. Include your destination country and expected monthly volume.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={MAIL_LINK} className="bg-golden-yellow text-gray-900 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">{EMAIL}</a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition">WhatsApp {WA_DISPLAY}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
