"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
    "nav.buyNow": "Beli Sekarang",

    // Marquee
    "marquee.sold": "10,000+ Pcs Terjual",
    "marquee.noPreservatives": "Tanpa Pengawet",
    "marquee.halalHygienic": "Halal & Higienis",
    "marquee.freshQuality": "Segar & Berkualitas",

    // Hero
    "hero.title": "Bawang Goreng Premium",
    "hero.subtitle": "Renyah, Gurih, dan Berkualitas Ekspor",
    "hero.cta": "Pesan Sekarang",

    // Company Profile
    "company.title": "Tentang",
    "company.subtitle": "CV. Dua Putri Sholehah",
    "company.since": "Berdiri Sejak 17 Oktober 2010",
    "company.desc1": "adalah UMKM olahan bawang merah dengan merek",
    "company.desc2": "yang berdiri di Tegalrejo, Dringu, Probolinggo.",
    "company.desc3": "Usaha ini berkembang dari skala kecil hingga berhasil",
    "company.desc4": "ekspor ke Jepang, Korea, Kanada, dan Singapura",
    "company.desc5":
      "Produk utama berupa bawang goreng kemasan berkualitas tinggi dari varietas lokal",
    "company.desc6": "biru lancor",
    "company.desc7":
      "Proses produksi terintegrasi dari budidaya hingga distribusi, dengan komitmen memberdayakan perempuan desa dan generasi muda.",
    "company.achievement1": "Ekspor ke 4 Negara",
    "company.achievement1Desc": "Jepang, Korea, Kanada, Singapura",
    "company.achievement2": "Sertifikasi Lengkap",
    "company.achievement2Desc": "Halal, BPOM, HACCP, GMP, GAP, ISO 9001",
    "company.achievement3": "Bawang Lokal",
    "company.achievement3Desc": "Varietas Biru Lancor Berkualitas",
    "company.achievement4": "Pemberdayaan",
    "company.achievement4Desc": "Perempuan Desa & Generasi Muda",
    "company.visionTitle": "Visi Kami",
    "company.vision":
      "Terus tumbuh sebagai UMKM ekspor yang inovatif, berdaya saing, dan berkelanjutan, menghadirkan produk bawang goreng berkualitas tinggi untuk pasar lokal dan internasional.",

    // Why Hunay
    "why.title": "Mengapa Harus",
    "why.feature1": "Bahan Pilihan",
    "why.feature1Desc": "Menggunakan bawang kualitas ekspor",
    "why.feature2": "Resep Rahasia",
    "why.feature2Desc": "Rasa autentik dan konsisten",
    "why.feature3": "Higienis",
    "why.feature3Desc": "Proses produksi standar tinggi",

    // Products
    "products.title": "Produk Kami",
    "products.subtitle": "Pilihan bawang goreng premium untuk kebutuhan Anda",
    "products.all": "Semua",
    "products.original": "Original",
    "products.spicy": "Pedas",
    "products.order": "Pesan Sekarang!",

    // Product names and categories
    "product.all": "Semua",
    "product.category1": "Bawang Goreng",
    "product.category2": "Stik Bawang",
    "product.category3": "Paket Bundling",
    "product.name1": "Paket Camilan Bawang Kemasan Box 200g",
    "product.name2": "Camilan Bawang Kemasan Pouch 125gr",
    "product.name3": "Bawang Putih Goreng Toples 150gr",
    "product.name4": "Bawang Merah Goreng Toples 150gr",
    "product.name5": "Bawang Putih Goreng Pouch 100gr",
    "product.name6": "Aneka Sambal Hunay",
    "product.name7": "Bawang Putih Botol 75gr",
    "product.name8": "Bawang Merah Goreng Pouch 100gr",

    // Process
    "process.title": "Cara Memesan",
    "process.subtitle": "Pesan produk Hunay dengan mudah dan cepat",
    "process.step1": "Pilih Produk",
    "process.step1Desc":
      "Browse katalog produk bawang goreng kami dan pilih varian favorit Anda",
    "process.step2": "Hubungi Kami",
    "process.step2Desc":
      "Chat via WhatsApp untuk konfirmasi pesanan dan detail pengiriman",
    "process.step3": "Pembayaran",
    "process.step3Desc":
      "Lakukan pembayaran mudah melalui transfer bank atau metode lainnya",
    "process.step4": "Pengiriman",
    "process.step4Desc":
      "Pesanan Anda akan segera diproses dan dikirim ke alamat tujuan",

    // CTA
    "cta.promo": "Promo Spesial Hari Ini!",
    "cta.title": "Siap Mencoba Kelezatan Bawang Goreng Hunay?",
    "cta.subtitle":
      "Dapatkan diskon khusus untuk pembelian pertama Anda. Hubungi kami sekarang melalui WhatsApp!",
    "cta.button": "Pesan Sekarang via WhatsApp",
    "cta.online": "Online 24/7",
    "cta.sold": "Produk Terjual",
    "cta.rating": "Rating Pelanggan",
    "cta.satisfaction": "Kepuasan",

    // Trust
    "trust.title": "Dipercaya &",
    "trust.titleHighlight": "Bersertifikat",
    "trust.subtitle":
      "Produk kami telah tersertifikasi dan dipercaya oleh ribuan pelanggan",
    "trust.testimonial": "Apa Kata Pelanggan Kami?",

    // Footer
    "footer.tagline":
      "Camilan bawang goreng renyah dan gurih, teman setia makan nasi Anda.",
    "footer.contactTitle": "Hubungi Kami",
    "footer.addressTitle": "Alamat",
    "footer.shopTitle": "Belanja di",
    "footer.copyright": "Hunay - CV Dua Putri Sholehah. All rights reserved.",

    // Location
    "location.title": "Lokasi",
    "location.titleHighlight": "Kami",
    "location.subtitle":
      "Kunjungi fasilitas produksi kami atau hubungi untuk informasi lebih lanjut",

    // Testimonials
    "testimonial.title": "Apa Kata Pelanggan Kami?",
  },
  en: {
    // Header
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.certificate": "Certificates",
    "nav.contact": "Contact",
    "nav.buyNow": "Buy Now",

    // Marquee
    "marquee.sold": "10,000+ Pcs Sold",
    "marquee.noPreservatives": "No Preservatives",
    "marquee.halalHygienic": "Halal & Hygienic",
    "marquee.freshQuality": "Fresh & Quality",

    // Hero
    "hero.title": "Premium Fried Onions",
    "hero.subtitle": "Crispy, Savory, and Export Quality",
    "hero.cta": "Order Now",

    // Company Profile
    "company.title": "About",
    "company.subtitle": "CV. Dua Putri Sholehah",
    "company.since": "Established Since October 17, 2010",
    "company.desc1": "is a shallot processing MSME with the brand",
    "company.desc2": "established in Tegalrejo, Dringu, Probolinggo.",
    "company.desc3": "This business has grown from small scale to successfully",
    "company.desc4": "exporting to Japan, Korea, Canada, and Singapore",
    "company.desc5":
      "The main product is high-quality packaged fried onions from local varieties",
    "company.desc6": "biru lancor",
    "company.desc7":
      "Integrated production process from cultivation to distribution, with a commitment to empowering rural women and young generations.",
    "company.achievement1": "Export to 4 Countries",
    "company.achievement1Desc": "Japan, Korea, Canada, Singapore",
    "company.achievement2": "Complete Certification",
    "company.achievement2Desc": "Halal, BPOM, HACCP, GMP, GAP, ISO 9001",
    "company.achievement3": "Local Onions",
    "company.achievement3Desc": "Quality Biru Lancor Variety",
    "company.achievement4": "Empowerment",
    "company.achievement4Desc": "Rural Women & Young Generation",
    "company.visionTitle": "Our Vision",
    "company.vision":
      "Continue to grow as an innovative, competitive, and sustainable export MSME, providing high-quality fried onion products for local and international markets.",

    // Why Hunay
    "why.title": "Why Choose",
    "why.feature1": "Premium Ingredients",
    "why.feature1Desc": "Using export quality onions",
    "why.feature2": "Secret Recipe",
    "why.feature2Desc": "Authentic and consistent taste",
    "why.feature3": "Hygienic",
    "why.feature3Desc": "High standard production process",

    // Products
    "products.title": "Our Products",
    "products.subtitle": "Premium fried onion choices for your needs",
    "products.all": "All",
    "products.original": "Original",
    "products.spicy": "Spicy",
    "products.order": "Order Now!",

    // Product names and categories
    "product.all": "All",
    "product.category1": "Fried Onions",
    "product.category2": "Onion Sticks",
    "product.category3": "Bundle Package",
    "product.name1": "Onion Snack Package Box 200g",
    "product.name2": "Onion Snack Pouch 125gr",
    "product.name3": "Fried Garlic Jar 150gr",
    "product.name4": "Fried Shallot Jar 150gr",
    "product.name5": "Fried Garlic Pouch 100gr",
    "product.name6": "Hunay Sambal Varieties",
    "product.name7": "Garlic Bottle 75gr",
    "product.name8": "Fried Shallot Pouch 100gr",

    // Process
    "process.title": "How to Order",
    "process.subtitle": "Order Hunay products easily and quickly",
    "process.step1": "Choose Product",
    "process.step1Desc":
      "Browse our fried onion product catalog and select your favorite variant",
    "process.step2": "Contact Us",
    "process.step2Desc":
      "Chat via WhatsApp to confirm your order and shipping details",
    "process.step3": "Payment",
    "process.step3Desc":
      "Make easy payment through bank transfer or other methods",
    "process.step4": "Delivery",
    "process.step4Desc":
      "Your order will be processed immediately and shipped to your address",

    // CTA
    "cta.promo": "Special Promo Today!",
    "cta.title": "Ready to Try the Deliciousness of Hunay Fried Onions?",
    "cta.subtitle":
      "Get a special discount for your first purchase. Contact us now via WhatsApp!",
    "cta.button": "Order Now via WhatsApp",
    "cta.online": "Online 24/7",
    "cta.sold": "Products Sold",
    "cta.rating": "Customer Rating",
    "cta.satisfaction": "Satisfaction",

    // Trust
    "trust.title": "Trusted &",
    "trust.titleHighlight": "Certified",
    "trust.subtitle":
      "Our products are certified and trusted by thousands of customers",
    "trust.testimonial": "What Our Customers Say?",

    // Footer
    "footer.tagline":
      "Crispy and savory fried onion snacks, your faithful companion for meals.",
    "footer.contactTitle": "Contact Us",
    "footer.addressTitle": "Address",
    "footer.shopTitle": "Shop at",
    "footer.copyright": "Hunay - CV Dua Putri Sholehah. All rights reserved.",

    // Location
    "location.title": "Our",
    "location.titleHighlight": "Location",
    "location.subtitle":
      "Visit our production facility or contact us for more information",

    // Testimonials
    "testimonial.title": "What Our Customers Say?",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

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
