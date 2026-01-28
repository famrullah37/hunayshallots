"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="pt-24 pb-16 bg-linear-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")},{" "}
              <span className="text-forest-green">{t("hero.subtitle")}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Renyah, gurih, dan cocok untuk semua hidangan.
            </p>
            <a
              href="https://linktr.ee/hunaybawanggoreng?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnNMCOOLVAOcBihTLFe1HZkVGetZ5mjYLtKEuaYUMvkVbZ1rlcmytu4M3oQYM_aem_KzN7PxybTFJ5y1HlWXYmtA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-forest-green text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              {t("hero.cta")}
            </a>
          </div>

          {/* Right Side - Product Image */}
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Placeholder for product image */}
              <div className="absolute inset-0 bg-linear-to-br from-golden-yellow/20 to-forest-green/10 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-64 h-64 bg-linear-to-br from-golden-yellow/30 to-forest-green/20 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">🧅</span>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Tempatkan foto produk Hunay di sini
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
