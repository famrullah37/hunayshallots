"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Header
    "nav.about": "Tentang Kami",
    "nav.products": "Produk",
    "nav.certificate": "Sertifikat",
    "nav.contact": "Kontak",

    // Footer
    "footer.tagline":
      "Camilan bawang goreng renyah dan gurih, teman setia makan nasi Anda.",
    "footer.contactTitle": "Hubungi Kami",
    "footer.addressTitle": "Alamat",
  },
  en: {
    // Header
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.certificate": "Certificates",
    "nav.contact": "Contact",

    // Footer
    "footer.tagline":
      "Crispy and savory fried onion snacks, your faithful companion for meals.",
    "footer.contactTitle": "Contact Us",
    "footer.addressTitle": "Address",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.id] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
