"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LocationSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#f5f1e8] py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("location.title")}{" "}
              <span className="text-forest-green">
                {t("location.titleHighlight")}
              </span>
            </h2>
            <div className="h-1 w-24 bg-golden-yellow rounded-full mx-auto mb-4"></div>
            <p className="mx-auto max-w-2xl text-gray-600">
              {t("location.subtitle")}
            </p>
          </div>

          {/* Content Grid */}
          <div>
            {/* Google Maps */}
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3957.4!2d113.247134!3d-7.787528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDcnMTUuMSJTIDExM8KwMTQnNDkuNyJF!5e0!3m2!1sid!2sid!4v1738137600000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                className="min-h-100"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
