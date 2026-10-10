import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import InquiryForm, { type InquiryLabels } from "@/components/InquiryForm";
import { CONTACT_EMAIL, WA_NUMBER, WA_DISPLAY } from "@/lib/contact";

// Localized export landing page (used by /ja/wholesale and /ko/wholesale).
// NOTE: copy was machine-assisted — have a native speaker review before promoting.

export type WholesaleCopy = {
  lang: "ja" | "ko";
  path: string;
  breadcrumbHome: string;
  breadcrumbSelf: string;
  h1: string;
  intro: string;
  ctaQuote: string;
  ctaSpec: string;
  productsTitle: string;
  products: { name: string; image: string; spec: string }[];
  specsTitle: string;
  specs: { label: string; value: string }[];
  termsTitle: string;
  terms: { label: string; value: string }[];
  certsTitle: string;
  marketsTitle: string;
  markets: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  quoteTitle: string;
  quoteIntro: string;
  form: InquiryLabels;
  contactTitle: string;
  englishLink: string;
};

const CERTIFICATES = [
  { name: "Halal MUI", image: "/halalmui.png" },
  { name: "BPOM", image: "/bpom.png" },
  { name: "HACCP", image: "/haccp.png" },
  { name: "ISO 9001:2015", image: "/iso9001.jpg" },
  { name: "GMP", image: "/gmp.png" },
  { name: "GAP", image: "/good.png" },
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

export function wholesaleSchemas(copy: WholesaleCopy) {
  const url = `${BASE_URL}${copy.path}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      inLanguage: copy.lang,
      mainEntity: copy.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.breadcrumbHome, item: BASE_URL },
        { "@type": "ListItem", position: 2, name: copy.breadcrumbSelf, item: url },
      ],
    },
  ];
}

export default function WholesaleLocalized({ copy }: { copy: WholesaleCopy }) {
  const waLink = `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&type=phone_number`;

  return (
    <div className="min-h-screen bg-white">
      {wholesaleSchemas(copy).map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <Header />

      <main lang={copy.lang} className="pt-32 pb-20">
        <section className="container mx-auto px-4 max-w-5xl text-center mb-16">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-forest-green">{copy.breadcrumbHome}</Link> / <span className="text-gray-600">{copy.breadcrumbSelf}</span>
            <span className="mx-2">·</span>
            <Link href="/wholesale" hrefLang="en" className="hover:text-forest-green">{copy.englishLink}</Link>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-forest-green mb-5">{copy.h1}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{copy.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#quote" className="bg-forest-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition">{copy.ctaQuote}</a>
            <a href="/hunay-spec-sheet.pdf" download className="border-2 border-forest-green text-forest-green px-8 py-3 rounded-full font-semibold hover:bg-forest-green hover:text-white transition">{copy.ctaSpec}</a>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{copy.productsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.products.map((p) => (
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

        <section className="container mx-auto px-4 max-w-5xl mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[{ title: copy.specsTitle, rows: copy.specs }, { title: copy.termsTitle, rows: copy.terms }].map((block) => (
            <div key={block.title}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{block.title}</h2>
              <table className="w-full text-sm">
                <tbody>
                  {block.rows.map((r) => (
                    <tr key={r.label} className="border-b border-gray-100">
                      <th scope="row" className="text-left font-semibold text-gray-700 py-3 pr-4 align-top w-2/5">{r.label}</th>
                      <td className="py-3 text-gray-600">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </section>

        <section className="container mx-auto px-4 max-w-5xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{copy.certsTitle}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {CERTIFICATES.map((c) => (
              <div key={c.name} className="rounded-2xl border border-gray-100 p-3 flex flex-col items-center gap-2">
                <div className="relative h-16 w-16">
                  <Image src={c.image} alt={c.name} fill sizes="64px" className="object-contain" />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-amber-50 py-14 mb-16">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{copy.marketsTitle}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {copy.markets.map((m) => (
                <span key={m} className="bg-white text-forest-green font-semibold px-5 py-2 rounded-full shadow-sm">{m}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 max-w-3xl mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{copy.faqTitle}</h2>
          <div className="space-y-3">
            {copy.faqs.map((f) => (
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

        <section id="quote" className="container mx-auto px-4 max-w-3xl mb-16 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{copy.quoteTitle}</h2>
          <p className="text-gray-600 mb-6">{copy.quoteIntro}</p>
          <InquiryForm labels={copy.form} sourcePage={copy.path} />
        </section>

        <section className="container mx-auto px-4 max-w-3xl text-center">
          <div className="bg-forest-green rounded-3xl px-6 py-10 text-white">
            <h2 className="text-xl md:text-2xl font-bold mb-5">{copy.contactTitle}</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${CONTACT_EMAIL}`} className="bg-golden-yellow text-gray-900 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">{CONTACT_EMAIL}</a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-white/10 border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition">WhatsApp {WA_DISPLAY}</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
