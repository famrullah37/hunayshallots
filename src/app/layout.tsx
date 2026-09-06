import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import Script from "next/script";
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
    // Primary EN (US & UK)
    "fried onions", "fried shallots", "premium fried onion", "Indonesian fried shallot",
    "crispy fried onion", "fried onion supplier Indonesia", "wholesale fried onion",
    "halal fried onion", "biru lancor fried onion", "export fried onion Indonesia",
    "fried onion Probolinggo", "fried shallot Indonesia export",
    // US market
    "fried onion supplier USA", "import Indonesian fried onion USA", "Asian fried shallots USA",
    "crispy onion flakes", "Asian condiment USA", "wholesale fried shallots USA",
    "Indonesian food importer USA", "halal fried onion USA", "Asian grocery fried onion",
    "fried shallot topping", "crispy shallot flakes USA",
    // UK market
    "fried onion supplier UK", "Indonesian fried onion UK", "halal fried onion UK",
    "crispy shallots UK", "Asian grocery UK", "Indonesian condiment UK",
    "fried shallot UK", "wholesale fried onion UK",
    // Australia market
    "fried onion supplier Australia", "Indonesian fried onion Australia",
    "halal fried onion Australia", "Asian grocery Australia", "wholesale fried shallots Australia",
    // Korean keywords
    "튀긴 양파", "튀긴 샬롯", "프리미엄 튀긴 양파", "인도네시아 튀긴 양파",
    "바삭한 튀긴 양파", "양파 유통업체", "도매 튀긴 양파", "할랄 튀긴 양파",
    "인도네시아 양파 수출", "프로볼링고 양파", "바삭한 튀긴 샬롯",
    "인도네시아 식품 수입", "아시안 양념", "프로볼링고 양파 유통",
    "할랄 인증 양파", "인도네시아 양파 도매",
    // Arabic keywords
    "بصل مقلي", "ثوم مقلي", "بصل أحمر مقلي", "بصل مقلي مقرمش",
    "بصل مقلي إندونيسي", "ثوم مقلي إندونيسي", "توابل إندونيسية",
    "مورد بصل مقلي", "بصل مقلي بالجملة", "بصل مقلي للتصدير",
    "بدون مواد حافظة", "حلال", "بصل مقلي حلال",
    // Brand
    "Hunay", "CV Dua Putri Sholehah",
    // Long-tail
    "fried onion manufacturer Indonesia",
    // Shallots informational (People Also Ask)
    "shallots", "pickled shallots", "substitute for shallots",
    "shallots vs onions", "are shallots onions", "how to cut shallots",
    "difference between shallots and onions", "shallots recipe",
    "what is shallots", "red shallots", "what are shallots",
    "onion", "garlic", "onion shallots", "shallots onion", "green shallots",
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
  inLanguage: "en-US",
  keywords: "fried onion, bawang goreng, biru lancor, halal, Probolinggo, Indonesia, export",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".hero-title", ".hero-description", ".product-name", ".about-text"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Hunay — Premium Fried Onions & Fried Shallots | Export Quality from Probolinggo",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  description: "Buy premium fried onions (bawang goreng) directly from the producer in Probolinggo, Indonesia. Halal MUI certified, no preservatives, crispy biru lancor variety. Available retail and wholesale.",
  primaryImageOfPage: { "@type": "ImageObject", url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2", ".hero-description", ".product-description", ".about-section", "[data-speakable]"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: BASE_URL }],
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
      availableLanguage: ["Indonesian", "English"],
      hoursAvailable: { "@type": "OpeningHoursSpecification", opens: "08:00", closes: "17:00", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] },
    },
    {
      "@type": "ContactPoint",
      telephone: "+62-852-3365-8619",
      contactType: "customer service",
      contactOption: "TollFree",
      availableLanguage: ["Indonesian"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/hunay.id/",
    "https://www.tiktok.com/@hunay_id",
    "https://shopee.co.id/hunay.id",
    "https://www.tokopedia.com/hunay-1",
  ],
  areaServed: [
    { "@type": "Country", name: "Indonesia" },
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
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Fried Shallot Pouch 100gr", description: "Premium crispy fried shallots, 100 gram pouch packaging", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "120" } }, priceCurrency: "IDR", price: "25000" },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Fried Shallot Jar 150gr", description: "Premium crispy fried shallots in glass jar, 150 gram", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "35000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "95" } }, priceCurrency: "IDR", price: "35000" },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Fried Garlic Pouch 100gr", description: "Premium crispy fried garlic, 100 gram pouch packaging", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "87" } }, priceCurrency: "IDR", price: "25000" },
    { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sambal Sauce Varieties", description: "Hunay authentic sambal sauce collection", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "68" } }, priceCurrency: "IDR", price: "25000" },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["FoodEstablishment", "Store", "LocalBusiness"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Hunay — Premium Fried Onions",
  alternateName: "Hunay Bawang Goreng Premium",
  image: [`${BASE_URL}/hero-hunay.jpg`, `${BASE_URL}/hero-hunay2.jpg`],
  url: BASE_URL,
  telephone: "+62-852-3365-8619",
  email: "cvduaputrisholehah@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Desa Tegalrejo, RT/RW 002/003, Dusun Tesnan",
    addressLocality: "Dringu",
    addressRegion: "Probolinggo",
    postalCode: "67271",
    addressCountry: "ID",
  },
  geo: { "@type": "GeoCoordinates", latitude: -7.7377, longitude: 113.2153 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "17:00" },
  ],
  priceRange: "Rp20.000 – Rp40.000",
  servesCuisine: "Indonesian",
  paymentAccepted: "Bank Transfer, Cash, COD",
  currenciesAccepted: "IDR",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  hasMap: "https://maps.google.com/?q=Tegalrejo+Dringu+Probolinggo",
  areaServed: { "@type": "Country", name: "Indonesia" },
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: -7.7377, longitude: 113.2153 },
    geoRadius: "5000000",
  },
};

const productCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Hunay Product Catalog",
  description: "Complete catalog of Hunay premium fried onions and sambal products",
  url: `${BASE_URL}/#produk`,
  numberOfItems: 8,
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Product", name: "Fried Shallot Pouch 100gr", description: "Crispy premium fried shallots from biru lancor variety, 100 gram convenient pouch packaging.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "120" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Product", name: "Fried Shallot Jar 150gr", description: "Premium fried shallots in glass jar, 150 gram, long-lasting crispiness.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "35000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "95" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Product", name: "Fried Garlic Pouch 100gr", description: "Premium crispy fried garlic, 100 gram pouch, aromatic and golden.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "87" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Product", name: "Fried Garlic Jar 150gr", description: "Premium fried garlic in glass jar, 150 gram, crispy and long-lasting.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "35000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "72" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Product", name: "Fried Garlic Bottle 75gr", description: "Fried garlic in 75gr bottle, perfect as souvenir or gift.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "20000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "54" } } },
    { "@type": "ListItem", position: 6, item: { "@type": "Product", name: "Hunay Sambal Varieties", description: "Authentic Hunay sambal collection with various spicy flavor options.", brand: { "@type": "Brand", name: "Hunay" }, offers: { "@type": "Offer", priceCurrency: "IDR", price: "25000", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "68" } } },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Hunay fried onion made of?",
      acceptedAnswer: { "@type": "Answer", text: "Hunay fried onions are made from 100% biru lancor variety shallots and garlic grown locally in Probolinggo, East Java, Indonesia. No flour additives, no artificial preservatives — only shallots/garlic, coconut oil, and salt." },
    },
    {
      "@type": "Question",
      name: "Is Hunay fried onion halal certified?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Hunay products hold Halal certification from MUI (Majelis Ulama Indonesia). We also hold BPOM food registration, ISO 9001:2015, HACCP, GMP, and GAP certifications." },
    },
    {
      "@type": "Question",
      name: "Does Hunay export fried onions internationally?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Hunay exports premium fried onions to Japan, South Korea, Canada, Singapore, USA, and Australia. Our products meet stringent international food safety standards including Japanese MHLW and Korean MFDS requirements." },
    },
    {
      "@type": "Question",
      name: "How do I order Hunay fried onions?",
      acceptedAnswer: { "@type": "Answer", text: "You can order Hunay fried onions via WhatsApp at +62 852-3365-8619, or shop online through Tokopedia (tokopedia.com/hunay-1) and Shopee (shopee.co.id/hunay.id). We ship across Indonesia and internationally." },
    },
    {
      "@type": "Question",
      name: "Does Hunay use preservatives?",
      acceptedAnswer: { "@type": "Answer", text: "No. Hunay fried onions contain zero artificial preservatives. Crispiness and shelf life (6–12 months unopened) are achieved through the naturally low water content of biru lancor shallots and vacuum packaging technology." },
    },
    {
      "@type": "Question",
      name: "What makes biru lancor shallots special for frying?",
      acceptedAnswer: { "@type": "Answer", text: "Biru lancor is a local shallot variety from Probolinggo with water content of only 62–65%, significantly lower than other varieties. This produces crispier fried onions, a more intense golden color (from higher natural sugars), stronger aroma, and a longer shelf life without preservatives." },
    },
    {
      "@type": "Question",
      name: "How long do Hunay fried onions stay crispy?",
      acceptedAnswer: { "@type": "Answer", text: "Unopened Hunay fried onions stay crispy for 6–12 months in their vacuum packaging. After opening, they remain crispy for 1–2 months when stored in an airtight container in a cool, dry place. Do not refrigerate as humidity will make them soggy." },
    },
    {
      "@type": "Question",
      name: "Can restaurants and catering businesses order Hunay in bulk?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Hunay provides wholesale and bulk packaging (kiloan) starting from 5 kg with special pricing for restaurants, catering services, hotels, and food businesses. Contact us via WhatsApp at +62 852-3365-8619 for wholesale price lists and supply agreements." },
    },
    {
      "@type": "Question",
      name: "Where is Hunay produced?",
      acceptedAnswer: { "@type": "Answer", text: "Hunay is produced by CV. Dua Putri Sholehah, located in Desa Tegalrejo, Kecamatan Dringu, Kabupaten Probolinggo, East Java, Indonesia. The production facility sources biru lancor shallots directly from local farmer partners in the Probolinggo region." },
    },
    {
      "@type": "Question",
      name: "Are Hunay products suitable for vegetarians and vegans?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Hunay fried onions and fried garlic contain only plant-based ingredients: shallots or garlic, coconut oil, and salt. They are suitable for vegetarians and vegans." },
    },
    {
      "@type": "Question",
      name: "What certifications does Hunay hold?",
      acceptedAnswer: { "@type": "Answer", text: "Hunay holds the following certifications: Halal MUI, BPOM (food registration), ISO 9001:2015 (quality management), HACCP (hazard analysis), GMP (good manufacturing practice), GAP (good agricultural practice), and P-IRT." },
    },
    {
      "@type": "Question",
      name: "How much do Hunay fried onions cost?",
      acceptedAnswer: { "@type": "Answer", text: "Hunay retail products range from Rp20.000 (garlic bottle 75gr) to Rp35.000 (shallot or garlic jar 150gr). Wholesale bulk pricing is available for businesses — contact WhatsApp +62 852-3365-8619 for current wholesale rates." },
    },
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

const howToOrderSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Order Hunay Premium Fried Onions",
  description: "Step-by-step guide to ordering Hunay premium fried onions via WhatsApp or online marketplace",
  totalTime: "PT5M",
  supply: [{ "@type": "HowToSupply", name: "WhatsApp or internet access" }],
  tool: [{ "@type": "HowToTool", name: "Smartphone or computer" }],
  step: [
    { "@type": "HowToStep", position: 1, name: "Browse the Product Catalog", text: `Visit hunayshallots.com or scroll to the product section. Choose from fried shallot, fried garlic, or sambal variants in various packaging sizes.`, image: `${BASE_URL}/hero-hunay.jpg` },
    { "@type": "HowToStep", position: 2, name: "Add to Cart", text: "Click 'Add to Cart' on your chosen product. You can add multiple products and adjust quantities in the shopping cart." },
    { "@type": "HowToStep", position: 3, name: "Fill in Shipping Details", text: "In the cart page, fill in your complete name, WhatsApp number, and full delivery address including city and province." },
    { "@type": "HowToStep", position: 4, name: "Send Order via WhatsApp", text: "Click 'Send Order via WhatsApp'. Your complete order details will automatically be sent to Hunay admin at +62 852-3365-8619 for order confirmation." },
    { "@type": "HowToStep", position: 5, name: "Confirm Payment", text: "Admin will respond with shipping cost calculation. Complete payment via bank transfer or other available methods." },
    { "@type": "HowToStep", position: 6, name: "Receive Your Order", text: "Your order will be processed and shipped to your address. Estimated delivery 2–7 working days depending on destination." },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToOrderSchema) }} />
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
