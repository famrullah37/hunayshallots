import React from "react";
import { Package, ChefHat, ShieldCheck } from "lucide-react";

export default function WhyHunaySection() {
  const features = [
    {
      icon: Package,
      title: "Bahan Pilihan",
      description:
        "Menggunakan bawang putih kualitas ekspor yang dipilih dengan teliti untuk hasil terbaik",
    },
    {
      icon: ChefHat,
      title: "Resep Rahasia",
      description:
        "Rasa autentik dan konsisten yang diolah dengan bumbu rempah pilihan warisan turun temurun",
    },
    {
      icon: ShieldCheck,
      title: "Higienis",
      description:
        "Proses produksi dengan standar tinggi dan dikemas secara higienis untuk keamanan konsumen",
    },
  ];

  return (
    <section className="relative py-20 bg-linear-to-br from-forest-green to-green-600 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 border-2 border-white/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Mengapa Harus <span className="text-golden-yellow">Hunay?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition transform hover:scale-105 text-center"
            >
              <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon size={40} className="text-white" />
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
