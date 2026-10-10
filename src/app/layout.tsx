import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import Script from "next/script";
import { CONTACT_EMAIL } from "@/lib/contact";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Hunay — Premium Fried Onions & Fried Shallots | Export Quality from Probolinggo, Indonesia",
    template: "%s | Hunay Premium Fried Onions",
  },
  description:
    "Hunay produces premium export-quality fried onions and fried shallots (bawang goreng) from Probolinggo, Indonesia. Made from biru lancor variety, Halal MUI certified, no preservatives. Trusted by Japan, South Korea, Canada & Singapore importers. Order wholesale via WhatsApp.",
  keywords: [
    "fried shallots", "fried onions", "crispy fried shallots", "Indonesian fried shallots",
    "fried shallot supplier", "fried shallot manufacturer Indonesia", "wholesale fried shallots",
    "bulk fried onions", "halal fried shallots", "fried garlic supplier", "private label fried onions",
    "fried shallot exporter", "biru lancor shallots", "bawang goreng", "Hunay",
  ],
  authors: [{ name: "CV. Dua Putri Sholehah", url: BASE_URL }],
  creator: "CV. Dua Putri Sholehah",
  publisher: "Hunay",
  category: "Food & Beverage",
  classification: "Food Manufacturer, Fried Onion Producer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Hunay Fried Onions",
    title: "Hunay — Premium Fried Onions from Probolinggo, Indonesia",
    description:
      "Export-quality fried onions and fried shallots. Halal MUI certified, no preservatives. Made from biru lancor variety. Trusted exporter to Japan, South Korea, Canada & Singapore. Wholesale orders welcome.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hunay Premium Fried Onions — Export Quality from Probolinggo, Indonesia",
      },
      {
        url: "/hero-hunay.jpg",
        width: 1200,
        height: 800,
        alt: "Hunay Fried Shallots — Crispy, Halal, No Preservatives",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunay — Premium Fried Onions | Export Quality from Indonesia",
    description:
      "Crispy, halal, no preservatives. Made from biru lancor shallots in Probolinggo. Exported to Japan, South Korea, Canada & Singapore.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Hunay Fried Onions",
  alternateName: ["Hunay Bawang Goreng", "hunayshallots.com"],
  url: BASE_URL,
  description: "Official website of Hunay premium fried onions and fried shallots by CV. Dua Putri Sholehah, Probolinggo, East Java, Indonesia. Halal certified, no preservatives, exported globally.",
  inLanguage: "en",
  keywords: "fried onion, bawang goreng, biru lancor, halal, Probolinggo, Indonesia, export",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-title", ".hero-description", ".product-name", ".about-text"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "CV. Dua Putri Sholehah",
  alternateName: ["Hunay", "Hunay Fried Onions", "Hunay Bawang Goreng"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/hunay_logo.png`,
    width: 200,
    height: 200,
  },
  image: `${BASE_URL}/hero-hunay.jpg`,
  description:
    "Indonesian SME producing premium export-quality fried onions (bawang goreng) since 2010. Certified Halal MUI, BPOM, ISO 9001:2015, HACCP, GMP, and GAP. Exported to Japan, South Korea, Canada, Singapore, USA, and Australia.",
  foundingDate: "2010-10-17",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Desa Tegalrejo, RT/RW 002/003, Dusun Tesnan",
    addressLocality: "Dringu",
    addressRegion: "Probolinggo",
    postalCode: "67271",
    addressCountry: "ID",
  },
  geo: { "@type": "GeoCoordinates", latitude: -7.7377, longitude: 113.2153 },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+62-852-3365-8619",
      contactType: "sales",
      email: CONTACT_EMAIL,
      areaServed: ["JP", "KR", "CA", "SG", "US", "AU"],
      availableLanguage: ["English", "Indonesian"],
      hoursAvailable: { "@type": "OpeningHoursSpecification", opens: "08:00", closes: "17:00", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
    },
  ],
  sameAs: [
    "https://www.instagram.com/hunay.id/",
    "https://www.tiktok.com/@hunay_id",
  ],
  areaServed: [
    { "@type": "Country", name: "Japan" },
    { "@type": "Country", name: "South Korea" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Australia" },
  ],
  knowsAbout: [
    "Fried onion production", "Shallot farming", "Halal food manufacturing",
    "Food export", "HACCP food safety", "Biru lancor variety shallots",
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", credentialCategory: "Halal MUI Certification", recognizedBy: { "@type": "Organization", name: "Majelis Ulama Indonesia" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "BPOM Registration", recognizedBy: { "@type": "Organization", name: "Badan Pengawas Obat dan Makanan Indonesia" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 9001:2015", recognizedBy: { "@type": "Organization", name: "ISO" } },
    { "@type": "EducationalOccupationalCredential", credentialCategory: "HACCP", recognizedBy: { "@type": "Organization", name: "Food Safety Authority" } },
  ],
};

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${BASE_URL}/#glossary`,
  name: "Hunay Fried Onion Glossary",
  description: "Key terms related to Hunay premium fried onions and Indonesian fried shallot production",
  hasDefinedTerm: [
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-biru-lancor`,
      name: "Biru Lancor",
      description: "A premium local shallot variety (Allium cepa var. aggregatum) native to Probolinggo, East Java, Indonesia. Distinguished by very low water content (62–65%), producing exceptionally crispy fried onions with intense golden color, rich aroma, and long shelf life without preservatives. The foundation of Hunay's quality.",
      inDefinedTermSet: { "@id": `${BASE_URL}/#glossary` },
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-bawang-goreng`,
      name: "Bawang Goreng",
      description: "Indonesian crispy fried shallots or fried onions. A staple condiment in Indonesian, Malaysian, and Southeast Asian cuisines. Used as a topping for rice (nasi goreng, soto), soups, noodles, and salads. Premium quality bawang goreng uses biru lancor variety and no preservatives.",
      inDefinedTermSet: { "@id": `${BASE_URL}/#glossary` },
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-bawang-putih-goreng`,
      name: "Bawang Putih Goreng",
      description: "Indonesian crispy fried garlic. Used as a condiment and flavor enhancer in Southeast Asian cooking. Hunay's fried garlic is made from selected garlic with no additives or preservatives.",
      inDefinedTermSet: { "@id": `${BASE_URL}/#glossary` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://analytics.hunayshallots.com/script.js"
          data-website-id="4b355a33-ad7e-4000-84ed-954c780a48f6"
          strategy="afterInteractive"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      </head>
      <body className={`${quicksand.variable} ${nunito.variable} antialiased`}>
        <LanguageProvider>
          <CurrencyProvider>
            <CartProvider>{children}</CartProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
