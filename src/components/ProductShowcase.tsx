"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import ProductCard, {
  CATEGORY_LABELS,
  FALLBACK_PRODUCTS,
  type ProductItem,
} from "@/components/ProductCard";

interface Props {
  products?: ProductItem[];
  /** Maksimal produk yang ditampilkan di homepage; selebihnya di /produk */
  limit?: number;
}

export default function ProductShowcase({ products = FALLBACK_PRODUCTS, limit = 8 }: Props) {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  return (
    <section id="produk" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {t("products.title")}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t("products.subtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-forest-green text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {CATEGORY_LABELS[cat]?.[language] ?? cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 bg-forest-green text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition shadow-lg"
          >
            {hasMore
              ? language === "id"
                ? `Lihat Semua ${filtered.length} Produk`
                : `View All ${filtered.length} Products`
              : language === "id"
                ? "Lihat Semua Produk"
                : "View All Products"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
