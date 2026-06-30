import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | Hunay",
  description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Hunay untuk menemukan produk bawang goreng premium kami.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Onion icon placeholder */}
        <div className="text-8xl mb-6">🧅</div>

        <h1 className="text-6xl font-bold text-amber-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia. Mungkin sudah dipindahkan
          atau dihapus. Yuk kembali ke beranda dan temukan bawang goreng premium
          kami!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/#produk"
            className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Lihat Produk
          </Link>
        </div>
      </div>
    </div>
  );
}
