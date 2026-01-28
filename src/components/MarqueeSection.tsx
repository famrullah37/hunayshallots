"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MarqueeSection() {
  const { t } = useLanguage();

  const items = [
    `✔ ${t("marquee.sold")}`,
    `✔ ${t("marquee.noPreservatives")}`,
    `✔ ${t("marquee.halalHygienic")}`,
    `✔ ${t("marquee.freshQuality")}`,
  ];

  return (
    <div className="bg-forest-green text-white py-4 overflow-hidden">
      <div className="marquee-container">
        <div className="marquee-content">
          {[...items, ...items, ...items].map((item, index) => (
            <span key={index} className="inline-block px-8 text-lg font-medium">
              {item} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
