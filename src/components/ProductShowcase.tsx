"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "6285233658619";

interface ProductItem {
  id: string;
  nameId: string;
  nameEn: string;
  price: number;
  weight: number;
  category: string;
  imageUrl: string | null;
  whatsappText: string | null;
}

const CATEGORY_LABELS: Record<string, { id: string; en: string }> = {
  all: { id: "Semua", en: "All" },
  "bawang-putih": { id: "Bawang Putih", en: "Fried Garlic" },
  "bawang-merah": { id: "Bawang Merah", en: "Fried Shallot" },
  sambal: { id: "Sambal", en: "Sambal Sauce" },
};

const FALLBACK_PRODUCTS: ProductItem[] = [
  { id: "p1", nameId: "Paket Camilan Bawang Kemasan Box 200g", nameEn: "Onion Snack Package Box 200g", price: 30000, weight: 250, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-box.jpg", whatsappText: null },
  { id: "p2", nameId: "Camilan Bawang Kemasan Pouch 125gr", nameEn: "Onion Snack Pouch 125gr", price: 25000, weight: 150, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-pouch.jpg", whatsappText: null },
  { id: "p3", nameId: "Bawang Putih Goreng Toples 150gr", nameEn: "Fried Garlic Jar 150gr", price: 35000, weight: 300, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-toples-150.jpg", whatsappText: null },
  { id: "p4", nameId: "Bawang Merah Goreng Toples 150gr", nameEn: "Fried Shallot Jar 150gr", price: 35000, weight: 300, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-toples-150.jpg", whatsappText: null },
  { id: "p5", nameId: "Bawang Putih Goreng Pouch 100gr", nameEn: "Fried Garlic Pouch 100gr", price: 25000, weight: 120, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-pouch.jpg", whatsappText: null },
  { id: "p6", nameId: "Aneka Sambal Hunay", nameEn: "Hunay Sambal Varieties", price: 25000, weight: 200, category: "sambal", imageUrl: "/products/sambel-geprek-pedas.jpg", whatsappText: null },
  { id: "p7", nameId: "Bawang Putih Botol 75gr", nameEn: "Garlic Bottle 75gr", price: 20000, weight: 200, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-botol.jpg", whatsappText: null },
  { id: "p8", nameId: "Bawang Merah Goreng Pouch 100gr", nameEn: "Fried Shallot Pouch 100gr", price: 25000, weight: 120, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-pouch.jpg", whatsappText: null },
];

interface Props {
  products?: ProductItem[];
}

export default function ProductShowcase({ products = FALLBACK_PRODUCTS }: Props) {
  const { language, t } = useLanguage();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: ProductItem) => {
    addItem({
      id: product.id,
      nameId: product.nameId,
      nameEn: product.nameEn,
      price: product.price,
      weight: product.weight,
      imageUrl: product.imageUrl,
      category: product.category,
      whatsappText: product.whatsappText,
    });
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  const handleOrderNow = (product: ProductItem) => {
    const name = language === "id" ? product.nameId : product.nameEn;
    const text = product.whatsappText || `Halo Hunay! Saya ingin memesan ${name}. Harga: Rp ${product.price.toLocaleString("id-ID")}`;
    window.open(
      `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

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
          {filtered.map((product) => {
            const name = language === "id" ? product.nameId : product.nameEn;
            const imgSrc = product.imageUrl || `/products/${product.id}.jpg`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group flex flex-col"
              >
                {/* Gambar — klik ke detail */}
                <Link href={`/produk/${product.id}`} className="block relative h-52 w-full overflow-hidden bg-gray-50 shrink-0">
                  <Image
                    src={imgSrc}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  {/* Nama — klik ke detail */}
                  <Link href={`/produk/${product.id}`} className="block mb-3 flex-1">
                    <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-forest-green transition line-clamp-2">
                      {name}
                    </h3>
                  </Link>

                  {/* Harga */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-forest-green leading-tight">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">IDR (Indonesian Rupiah)</p>
                  </div>

                  {/* Tombol Order Now */}
                  <button
                    onClick={() => handleOrderNow(product)}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-[#2d5a27] hover:bg-[#1e3d1a] text-white transition"
                  >
                    {language === "id" ? "Pesan Sekarang!" : "Order Now!"}
                  </button>

                  {/* Tambah ke keranjang — secondary */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full mt-2 py-2 rounded-xl text-sm font-medium border transition ${
                      addedIds.has(product.id)
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-500 hover:border-forest-green hover:text-forest-green"
                    }`}
                  >
                    {addedIds.has(product.id)
                      ? language === "id" ? "✓ Ditambahkan" : "✓ Added"
                      : language === "id" ? "+ Keranjang" : "+ Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
