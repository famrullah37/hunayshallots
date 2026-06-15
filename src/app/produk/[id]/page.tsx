"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { use } from "react";

const WHATSAPP_NUMBER = "6285233658619";

const CATEGORY_LABELS: Record<string, { id: string; en: string }> = {
  "bawang-putih": { id: "Bawang Putih", en: "Fried Garlic" },
  "bawang-merah": { id: "Bawang Merah", en: "Fried Shallot" },
  sambal: { id: "Sambal", en: "Sambal Sauce" },
};

interface ProductItem {
  id: string;
  nameId: string;
  nameEn: string;
  descriptionId: string | null;
  descriptionEn: string | null;
  price: number;
  weight: number;
  category: string;
  imageUrl: string | null;
  whatsappText: string | null;
  isActive: boolean;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { language } = useLanguage();
  const { addItem, items } = useCart();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [related, setRelated] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data: ProductItem) => {
        setProduct(data);
        setLoading(false);
        // fetch related products after main product loads
        if (data.category) {
          fetch(`/api/products?category=${data.category}&exclude=${data.id}`)
            .then((r) => r.json())
            .then((list: ProductItem[]) => setRelated(list))
            .catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [id]);

  const cartQty = items.find((i) => i.id === id)?.quantity ?? 0;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(
      {
        id: product.id,
        nameId: product.nameId,
        nameEn: product.nameEn,
        price: product.price,
        weight: product.weight,
        imageUrl: product.imageUrl,
        category: product.category,
        whatsappText: product.whatsappText,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const name = language === "id" ? product.nameId : product.nameEn;
    const text = product.whatsappText || `Halo Hunay! Saya ingin memesan ${product.nameId} (x${qty})`;
    window.open(
      `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 flex justify-center">
          <div className="w-8 h-8 border-4 border-forest-green border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-gray-500 text-lg mb-4">
            {language === "id" ? "Produk tidak ditemukan." : "Product not found."}
          </p>
          <Link href="/#produk" className="text-forest-green hover:underline">
            ← {language === "id" ? "Kembali ke Produk" : "Back to Products"}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const lang = language === "id";
  const name = lang ? product.nameId : product.nameEn;
  const description = lang ? product.descriptionId : product.descriptionEn;
  const categoryLabel = CATEGORY_LABELS[product.category]?.[language] ?? product.category;
  const imgSrc = product.imageUrl || `/products/${product.id}.jpg`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 pt-28 pb-20 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-forest-green transition">Home</Link>
          <span>/</span>
          <Link href="/#produk" className="hover:text-forest-green transition">
            {lang ? "Produk" : "Products"}
          </Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-xs">{name}</span>
        </nav>

        {/* Main product card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-72 md:h-auto min-h-72 bg-gray-100">
              <Image src={imgSrc} alt={name} fill className="object-cover" priority />
              <span className="absolute top-4 left-4 bg-white text-forest-green text-xs font-semibold px-3 py-1 rounded-full shadow">
                {categoryLabel}
              </span>
            </div>

            {/* Detail */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{name}</h1>

                <div className="flex items-center gap-4 mb-6">
                  <p className="text-3xl font-bold text-forest-green">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  {product.weight > 0 && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {product.weight >= 1000
                        ? `${(product.weight / 1000).toFixed(2)} kg`
                        : `${product.weight} g`}
                    </span>
                  )}
                </div>

                {description && (
                  <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
                )}

                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-700">{lang ? "Kategori" : "Category"}:</span>
                    <span>{categoryLabel}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-700">{lang ? "Berat" : "Weight"}:</span>
                    <span>{product.weight > 0 ? `${product.weight} gram` : "-"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {product.isActive
                        ? lang ? "Tersedia" : "Available"
                        : lang ? "Habis" : "Out of stock"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Cart qty indicator */}
                {cartQty > 0 && (
                  <p className="text-sm text-forest-green font-medium">
                    {lang ? `${cartQty} item di keranjang` : `${cartQty} item in cart`}
                  </p>
                )}

                {/* Quantity selector */}
                {product.isActive && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">{lang ? "Jumlah:" : "Qty:"}</span>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition font-bold text-lg leading-none"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition font-bold text-lg leading-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    {qty > 1 && (
                      <span className="text-sm text-gray-500">
                        = Rp {(product.price * qty).toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={!product.isActive}
                  className={`w-full py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-forest-green text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  {added
                    ? lang ? "Ditambahkan!" : "Added!"
                    : lang ? `Tambah ke Keranjang (${qty})` : `Add to Cart (${qty})`}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-xl font-bold border-2 border-green-500 text-green-600 hover:bg-green-50 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {lang ? "Pesan via WhatsApp" : "Order via WhatsApp"}
                </button>

                <Link
                  href="/#produk"
                  className="block text-center text-sm text-gray-400 hover:text-forest-green transition mt-2"
                >
                  ← {lang ? "Lihat produk lain" : "See other products"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              {lang ? "Produk Serupa" : "Related Products"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map((p) => {
                const pName = lang ? p.nameId : p.nameEn;
                const pImg = p.imageUrl || `/products/${p.id}.jpg`;
                return (
                  <Link
                    key={p.id}
                    href={`/produk/${p.id}`}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
                  >
                    <div className="relative h-36 bg-gray-100">
                      <Image src={pImg} alt={pName} fill className="object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{pName}</p>
                      <p className="text-forest-green font-bold text-sm">
                        Rp {p.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
