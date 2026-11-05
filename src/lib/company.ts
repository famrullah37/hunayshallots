// Company facts shared by the homepage and /wholesale — change them here, not per page.

export const FOUNDED_YEAR = 2010;
export const MONTHLY_CAPACITY = "1 ton+";
export const MOQ = "10 kg";

export const CERTIFICATES = [
  { name: "Halal MUI", image: "/halalmui.png" },
  { name: "BPOM", image: "/bpom.png" },
  { name: "HACCP", image: "/haccp.png" },
  { name: "ISO 9001:2015", image: "/iso9001.jpg" },
  { name: "GMP", image: "/gmp.png" },
  { name: "GAP", image: "/good.png" },
  { name: "Non-GMO", image: "/gmo.png" },
  { name: "FDA", image: "/fda.png" },
];

// Scanned certificates shown on the site. Images are watermarked previews made by
// scripts/watermark-certificates.py — the original PDFs are never published.
export type CertificateDocument = {
  slug: string;
  name: string;
  issuer: string;
  number: string;
  pages: number;
};

export const CERTIFICATE_DOCUMENTS: CertificateDocument[] = [
  { slug: "haccp", name: "HACCP", issuer: "LMS Assessments Ltd (UK)", number: "ID250517011U", pages: 1 },
  { slug: "bpom", name: "BPOM MD", issuer: "Badan POM RI", number: "MD 023771000100154", pages: 1 },
  { slug: "fda", name: "US FDA Registration", issuer: "Integrated Assessment Services", number: "19358011222", pages: 1 },
  { slug: "gs1", name: "GS1 Barcode", issuer: "GS1 Indonesia", number: "Prefix 899702467", pages: 1 },
  { slug: "gap", name: "GAP (Good Agricultural Practice)", issuer: "Dinas Pertanian Jawa Timur", number: "GAP.01-35.13.4-II.008", pages: 2 },
];

// ISO country codes: flags are rendered as SVG from country-flag-icons, because
// Windows does not render flag emoji (it shows the letters "JP", "KR", ...).
export const MARKETS = [
  { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" },
  { name: "Canada", code: "CA" },
  { name: "Singapore", code: "SG" },
  { name: "United States", code: "US" },
  { name: "Australia", code: "AU" },
] as const;

// Certifications we show only as a logo, because no scanned document is published yet.
const HAS_DOCUMENT = ["BPOM", "HACCP", "GAP", "FDA"];
export const LOGO_ONLY_CERTIFICATES = CERTIFICATES.filter((c) => !HAS_DOCUMENT.includes(c.name));
