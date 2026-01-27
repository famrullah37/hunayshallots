import React from "react";
import { Package, ChefHat, ShieldCheck } from "lucide-react";

export default function WhyHunaySection() {
  const features = [
    {
      icon: Package,
      title: "Bahan Pilihan",
      description: "Menggunakan bawang kualitas ekspor",
    },
    {
      icon: ChefHat,
      title: "Resep Rahasia",
      description: "Rasa autentik dan konsisten",
    },
    {
      icon: ShieldCheck,
      title: "Higienis",
      description: "Proses produksi standar tinggi",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Mengapa Harus <span className="text-forest-green">Hunay?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-golden-yellow/20 to-forest-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={40} className="text-forest-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
