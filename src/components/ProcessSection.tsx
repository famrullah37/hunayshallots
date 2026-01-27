import React from "react";
import { ShoppingCart, MessageSquare, CreditCard, Truck } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Pilih Produk",
      description:
        "Browse katalog produk bawang goreng kami dan pilih varian favorit Anda",
      icon: ShoppingCart,
    },
    {
      number: "02",
      title: "Hubungi Kami",
      description:
        "Chat via WhatsApp untuk konfirmasi pesanan dan detail pengiriman",
      icon: MessageSquare,
    },
    {
      number: "03",
      title: "Pembayaran",
      description:
        "Lakukan pembayaran mudah melalui transfer bank atau metode lainnya",
      icon: CreditCard,
    },
    {
      number: "04",
      title: "Pengiriman",
      description:
        "Pesanan Anda akan segera diproses dan dikirim ke alamat tujuan",
      icon: Truck,
    },
  ];

  return (
    <section className="relative py-20 bg-[#fefdfb] overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 pattern-dots"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara <span className="text-forest-green">Memesan</span>
          </h2>
          <div className="h-1 w-24 bg-golden-yellow rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan yang mudah dan cepat, hanya dalam 4 langkah
            sederhana
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-linear-to-r from-forest-green/30 to-transparent"></div>
                )}

                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border border-[#e8dcc4] text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-forest-green text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {step.number}
                  </div>

                  <div className="mt-6 mb-4">
                    <div className="w-16 h-16 bg-linear-to-br from-golden-yellow/20 to-forest-green/20 rounded-2xl flex items-center justify-center mx-auto">
                      <step.icon size={32} className="text-forest-green" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="#produk"
            className="inline-block bg-forest-green text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Lihat Produk Kami
          </a>
        </div>
      </div>
    </section>
  );
}
