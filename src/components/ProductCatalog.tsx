"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import ProductCard, {
  CATEGORY_LABELS,
  FALLBACK_PRODUCTS,
  type ProductItem,
} from "@/components/ProductCard";

type SortOption = "default" | "price-asc" | "price-desc";

interface Props {
  products?: ProductItem[];
}

export default function ProductCatalog({ products = FALLBACK_PRODUCTS }: Props) {
  const { language } = useLanguage();
  const lang = language === "id";
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(() => {
    let list = products;

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.nameId.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [products, activeCategory, search, sort]);

  return (
    <div className="container mx-auto px-4 pt-28 pb-20">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 max-w-7xl mx-auto">
        <Link href="/" className="hover:text-forest-green transition">Home</Link>
        <span>/</span>
        <span className="text-gray-700">{lang ? "Produk" : "Products"}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        {lang ? "Semua Produk" : "All Products"}
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        {lang
          ? "Jelajahi seluruh pilihan bawang goreng, camilan, dan sambal premium dari Hunay"
          : "Explore Hunay's full range of premium fried onions, snacks, and sambal"}
      </p>

      {/* Pencarian & urutkan */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-3xl mx-auto">
        <div className="relative w-full sm:flex-1">
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang ? "Cari produk..." : "Search products..."}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow border-0 focus:outline-none focus:ring-2 focus:ring-forest-green text-gray-800"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-white shadow text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-green cursor-pointer"
          aria-label={lang ? "Urutkan produk" : "Sort products"}
        >
          <option value="default">{lang ? "Urutan Standar" : "Default Order"}</option>
          <option value="price-asc">{lang ? "Harga Terendah" : "Lowest Price"}</option>
          <option value="price-desc">{lang ? "Harga Tertinggi" : "Highest Price"}</option>
        </select>
      </div>

      {/* Filter kategori */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
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

      {/* Jumlah hasil */}
      <p className="text-center text-sm text-gray-500 mb-10">
        {lang
          ? `Menampilkan ${filtered.length} dari ${products.length} produk`
          : `Showing ${filtered.length} of ${products.length} products`}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            {lang
              ? "Tidak ada produk yang cocok dengan pencarian Anda."
              : "No products match your search."}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="text-forest-green font-semibold hover:underline"
          >
            {lang ? "Reset filter" : "Reset filters"}
          </button>
        </div>
      )}
    </div>
  );
}
