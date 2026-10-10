const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hunayshallots.com";

// hreflang cluster for the wholesale page in every language. Each page must list all of them.
export const WHOLESALE_LANGUAGES = {
  en: `${BASE_URL}/wholesale`,
  ja: `${BASE_URL}/ja/wholesale`,
  ko: `${BASE_URL}/ko/wholesale`,
  "x-default": `${BASE_URL}/wholesale`,
};
