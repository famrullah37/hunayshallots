"use client";

import React from "react";
import { Globe, Award, Package, Users, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CompanyProfile() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Globe,
      label: t("company.achievement1"),
      desc: t("company.achievement1Desc"),
    },
    {
      icon: Award,
      label: t("company.achievement2"),
      desc: t("company.achievement2Desc"),
    },
    {
      icon: Package,
      label: t("company.achievement3"),
      desc: t("company.achievement3Desc"),
    },
    {
      icon: Users,
      label: t("company.achievement4"),
      desc: t("company.achievement4Desc"),
    },
  ];

  return (
    <section id="tentang-kami" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("company.title")}{" "}
              <span className="text-forest-green">{t("company.subtitle")}</span>
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-golden-yellow"></div>
          </div>

          {/* Main Content */}
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Company Story */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-forest-green/10 px-4 py-2 text-sm font-semibold text-forest-green">
                <Building2 size={24} />
                <span>{t("company.since")}</span>
              </div>

              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                <strong className="text-forest-green">
                  {t("company.subtitle")}
                </strong>{" "}
                {t("company.desc1")} <strong>Hunay</strong>,{" "}
                {t("company.desc2")}
              </p>

              <p className="mb-4 leading-relaxed text-gray-600">
                {t("company.desc3")} <strong>{t("company.desc4")}</strong>.
                {t("company.desc5")} <em>{t("company.desc6")}</em>.
              </p>

              <p className="leading-relaxed text-gray-600">
                {t("company.desc7")}
              </p>
            </div>

            {/* Right: Image Placeholder */}
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-golden-yellow/20 to-forest-green/20 shadow-xl">
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <div className="mb-4 text-8xl">🏢</div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl bg-forest-green/10"></div>
            </div>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition hover:shadow-xl"
              >
                <div className="mb-3 w-16 h-16 bg-linear-to-br from-golden-yellow/20 to-forest-green/20 rounded-2xl flex items-center justify-center mx-auto">
                  <item.icon size={32} className="text-forest-green" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
