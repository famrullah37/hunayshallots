"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const products: Product[] = [
    {
      id: 1,
      name: "Paket Camilan Bawang Kemasan Box 200g",
      price: "Rp 30.000",
      category: "Paket Bundling",
      image: "📦",
    },
    {
      id: 2,
      name: "Camilan Bawang Kemasan Pouch 125gr",
      price: "Rp 25.000",
      category: "Bawang Goreng",
      image: "🧅",
    },
    {
      id: 3,
      name: "Bawang Putih Goreng Toples 150gr",
      price: "Rp 35.000",
      category: "Bawang Goreng",
      image: "🏺",
    },
    {
      id: 4,
      name: "Bawang Merah Goreng Toples 150gr",
      price: "Rp 35.000",
      category: "Bawang Goreng",
      image: "🏺",
    },
    {
      id: 5,
      name: "Bawang Putih Goreng Pouch 100gr",
      price: "Rp 25.000",
      category: "Bawang Goreng",
      image: "🧅",
    },
    {
      id: 6,
      name: "Aneka Sambal Hunay",
      price: "Rp 25.000",
      category: "Stik Bawang",
      image: "🌶️",
    },
    {
      id: 7,
      name: "Bawang Putih Botol 75gr",
      price: "Rp 20.000",
      category: "Bawang Goreng",
      image: "🍶",
    },
    {
      id: 8,
      name: "Bawang Merah Goreng Pouch 100gr",
      price: "Rp 25.000",
      category: "Bawang Goreng",
      image: "🧅",
    },
  ];

  const categories = [
    "Semua",
    "Bawang Goreng",
    "Stik Bawang",
    "Paket Bundling",
  ];

  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="produk" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Produk <span className="text-forest-green">Hunay</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Pilih camilan bawang goreng favorit Anda dengan berbagai varian
          kemasan
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeCategory === category
                  ? "bg-forest-green text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden group"
            >
              <div className="relative bg-linear-to-br from-golden-yellow/20 to-forest-green/10 h-48 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition">
                  {product.image}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 min-h-12">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-forest-green mb-4">
                  {product.price}
                </p>
                <a
                  href={`https://api.whatsapp.com/send/?phone=6285233658619&text=Halo, saya ingin memesan ${product.name}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-forest-green text-white text-center py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Order Sekarang!
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
