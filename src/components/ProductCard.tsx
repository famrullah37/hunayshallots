"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export interface ProductItem {
  id: string;
  slug: string;
  nameId: string;
  nameEn: string;
  price: number;
  weight: number;
  category: string;
  imageUrl: string | null;
  whatsappText: string | null;
}

export const CATEGORY_LABELS: Record<string, { id: string; en: string }> = {
  all: { id: "Semua", en: "All" },
  "bawang-putih": { id: "Bawang Putih", en: "Fried Garlic" },
  "bawang-merah": { id: "Bawang Merah", en: "Fried Shallot" },
  sambal: { id: "Sambal", en: "Sambal Sauce" },
};

export const FALLBACK_PRODUCTS: ProductItem[] = [
  { id: "p1", slug: "paket-camilan-bawang-kemasan-box-200g", nameId: "Paket Camilan Bawang Kemasan Box 200g", nameEn: "Onion Snack Package Box 200g", price: 30000, weight: 250, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-box.jpg", whatsappText: null },
  { id: "p2", slug: "camilan-bawang-kemasan-pouch-125gr", nameId: "Camilan Bawang Kemasan Pouch 125gr", nameEn: "Onion Snack Pouch 125gr", price: 25000, weight: 150, category: "bawang-merah", imageUrl: "/products/camilan-bawang-merah-pouch.jpg", whatsappText: null },
  { id: "p3", slug: "bawang-putih-goreng-toples-150gr", nameId: "Bawang Putih Goreng Toples 150gr", nameEn: "Fried Garlic Jar 150gr", price: 35000, weight: 300, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-toples-150.jpg", whatsappText: null },
  { id: "p4", slug: "bawang-merah-goreng-toples-150gr", nameId: "Bawang Merah Goreng Toples 150gr", nameEn: "Fried Shallot Jar 150gr", price: 35000, weight: 300, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-toples-150.jpg", whatsappText: null },
  { id: "p5", slug: "bawang-putih-goreng-pouch-100gr", nameId: "Bawang Putih Goreng Pouch 100gr", nameEn: "Fried Garlic Pouch 100gr", price: 25000, weight: 120, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-pouch.jpg", whatsappText: null },
  { id: "p6", slug: "aneka-sambal-hunay", nameId: "Aneka Sambal Hunay", nameEn: "Hunay Sambal Varieties", price: 25000, weight: 200, category: "sambal", imageUrl: "/products/sambel-geprek-pedas.jpg", whatsappText: null },
  { id: "p7", slug: "bawang-putih-botol-75gr", nameId: "Bawang Putih Botol 75gr", nameEn: "Garlic Bottle 75gr", price: 20000, weight: 200, category: "bawang-putih", imageUrl: "/products/bawang-putih-goreng-botol.jpg", whatsappText: null },
  { id: "p8", slug: "bawang-merah-goreng-pouch-100gr", nameId: "Bawang Merah Goreng Pouch 100gr", nameEn: "Fried Shallot Pouch 100gr", price: 25000, weight: 120, category: "bawang-merah", imageUrl: "/products/bawang-merah-goreng-pouch.jpg", whatsappText: null },
];

export default function ProductCard({ product }: { product: ProductItem }) {
  const { language } = useLanguage();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const name = language === "id" ? product.nameId : product.nameEn;
  const imgSrc = product.imageUrl || `/products/${product.id}.jpg`;

  const handleAddToCart = () => {
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
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group flex flex-col">
      {/* Gambar — klik ke detail */}
      <Link href={`/produk/${product.slug}`} className="block relative h-52 w-full overflow-hidden bg-gray-50 shrink-0">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {/* Nama — klik ke detail */}
        <Link href={`/produk/${product.slug}`} className="block mb-3 flex-1">
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

        {/* Tambah ke keranjang */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition ${
            added
              ? "bg-green-600 text-white"
              : "bg-[#2d5a27] hover:bg-[#1e3d1a] text-white"
          }`}
        >
          {added
            ? language === "id" ? "✓ Ditambahkan" : "✓ Added"
            : language === "id" ? "+ Tambah ke Keranjang" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
