"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DEFAULT_USD_RATE, formatPrice as formatPriceUtil, formatDual as formatDualUtil } from "@/lib/currency";

interface CurrencyContextType {
  usdRate: number;
  /** Format an IDR amount in the current language's currency (Rp for id, $ for en). */
  formatPrice: (amountIdr: number) => string;
  /** Format an IDR amount showing both currencies when language is en. */
  formatDual: (amountIdr: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  usdRate: DEFAULT_USD_RATE,
  formatPrice: (amountIdr) => formatPriceUtil(amountIdr, "id", DEFAULT_USD_RATE),
  formatDual: (amountIdr) => formatDualUtil(amountIdr, "id", DEFAULT_USD_RATE),
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [usdRate, setUsdRate] = useState(DEFAULT_USD_RATE);

  useEffect(() => {
    fetch("/api/settings/usd-rate")
      .then((r) => r.json())
      .then((data) => {
        if (typeof data?.rate === "number" && data.rate > 0) setUsdRate(data.rate);
      })
      .catch(() => {});
  }, []);

  const value: CurrencyContextType = {
    usdRate,
    formatPrice: (amountIdr: number) => formatPriceUtil(amountIdr, language, usdRate),
    formatDual: (amountIdr: number) => formatDualUtil(amountIdr, language, usdRate),
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
