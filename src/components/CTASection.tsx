import React from "react";
import { Gift, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 bg-linear-to-br from-forest-green to-green-700 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-white/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Gift size={24} className="text-white" />
            <span className="text-white font-semibold">
              Promo Spesial Hari Ini!
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Siap Mencoba Kelezatan <br className="hidden md:block" />
            Bawang Goreng Hunay?
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Dapatkan diskon khusus untuk pembelian pertama Anda. Hubungi kami
            sekarang melalui WhatsApp!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://api.whatsapp.com/send/?phone=6285233658619&text=Halo%20Hunay,%20saya%20ingin%20order%20dengan%20promo%20spesial!&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-forest-green px-8 py-4 rounded-full text-lg font-bold hover:bg-golden-yellow hover:text-white transition shadow-xl transform hover:scale-105"
            >
              <MessageCircle size={24} fill="currentColor" />
              <span>Pesan Sekarang via WhatsApp</span>
            </a>

            <div className="flex items-center gap-2 text-white/80">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm">Online 24/7</span>
              </span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10.000+</div>
              <div className="text-white/80 text-sm">Produk Terjual</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-white/80 text-sm">Rating Pelanggan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 text-sm">Kepuasan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
