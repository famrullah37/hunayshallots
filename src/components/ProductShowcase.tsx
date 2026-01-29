"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

interface Product {
  id: string;
  nameKey: string;
  price: string;
  categoryKey: string;
}

export default function ProductShowcase() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("product.all");

  const products: Product[] = [
    {
      id: "p1",
      nameKey: "product.name1",
      price: "Rp 30.000",
      categoryKey: "product.category3",
    },
    {
      id: "p2",
      nameKey: "product.name2",
      price: "Rp 25.000",
      categoryKey: "product.category1",
    },
    {
      id: "p3",
      nameKey: "product.name3",
      price: "Rp 35.000",
      categoryKey: "product.category1",
    },
    {
      id: "p4",
      nameKey: "product.name4",
      price: "Rp 35.000",
      categoryKey: "product.category1",
    },
    {
      id: "p5",
      nameKey: "product.name5",
      price: "Rp 25.000",
      categoryKey: "product.category1",
    },
    {
      id: "p6",
      nameKey: "product.name6",
      price: "Rp 25.000",
      categoryKey: "product.category2",
    },
    {
      id: "p7",
      nameKey: "product.name7",
      price: "Rp 20.000",
      categoryKey: "product.category1",
    },
    {
      id: "p8",
      nameKey: "product.name8",
      price: "Rp 25.000",
      categoryKey: "product.category1",
    },
  ];

  const categories = [
    "product.all",
    "product.category1",
    "product.category2",
    "product.category3",
  ];

  const filteredProducts =
    activeCategory === "product.all"
      ? products
      : products.filter((product) => product.categoryKey === activeCategory);

  return (
    <section id="produk" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          {t("products.title")}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {t("products.subtitle")}
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
              {t(category)}
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
              <Image
                src={`/products/${product.id}.jpg`}
                alt={t(product.nameKey)}
                width={400}
                height={400}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 min-h-12">
                  {t(product.nameKey)}
                </h3>
                <p className="text-2xl font-bold text-forest-green mb-4">
                  {product.price}
                </p>
                <a
                  href={`https://api.whatsapp.com/send/?phone=6285233658619&text=Halo, saya ingin memesan ${t(product.nameKey)}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-forest-green text-white text-center py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  {t("products.order")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
