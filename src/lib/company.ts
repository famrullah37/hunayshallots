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
