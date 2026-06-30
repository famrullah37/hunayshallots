"use client";

import React from "react";
import { Factory, Users, Tag, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MaklonSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Factory,
      title: t("maklon.service1"),
      description: t("maklon.service1Desc"),
    },
    {
      icon: Tag,
      title: t("maklon.service2"),
      description: t("maklon.service2Desc"),
    },
    {
      icon: Users,
      title: t("maklon.service3"),
      description: t("maklon.service3Desc"),
    },
  ];

  const stats = [
    { value: "10 kg", label: t("maklon.stat1") },
    { value: "1 ton+", label: t("maklon.stat2") },
    { value: "50+", label: t("maklon.stat3") },
  ];

  return (
    <section id="maklon" className="py-20 bg-amber-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-forest-green/10 text-forest-green px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Factory size={16} />
            <span>B2B / Maklon</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("maklon.title")}{" "}
            <span className="text-forest-green">{t("maklon.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t("maklon.subtitle")}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-amber-100"
            >
              <div className="w-14 h-14 bg-forest-green rounded-xl flex items-center justify-center mb-5">
                <service.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-forest-green rounded-2xl py-8 px-6 max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={
                  index < stats.length - 1
                    ? "border-r border-white/20"
                    : ""
                }
              >
                <div className="text-3xl font-bold text-golden-yellow mb-1">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`https://api.whatsapp.com/send/?phone=6285233658619&text=${encodeURIComponent(t("maklon.waMessage"))}&type=phone_number&app_absent=0`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-forest-green text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-800 transition shadow-lg transform hover:scale-105"
          >
            <MessageCircle size={22} fill="currentColor" />
            <span>{t("maklon.cta")}</span>
          </a>
          <p className="text-gray-500 text-sm mt-3">{t("maklon.ctaNote")}</p>
        </div>
      </div>
    </section>
  );
}
