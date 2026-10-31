import { getUsdRate, updateUsdRate } from "@/actions/settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pengaturan | Hunay Admin" };

export default async function SettingsPage() {
  const usdRate = await getUsdRate();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>

      {/* USD exchange rate */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Kurs Dolar (USD)</h2>
        <p className="text-sm text-gray-500 mb-5">
          Digunakan untuk menampilkan harga produk dan ongkir dalam Dolar AS ($) ke pengunjung
          berbahasa Inggris — untuk pembeli luar negeri. Harga asli tetap tersimpan dalam Rupiah.
        </p>

        <form action={updateUsdRate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">1 USD = berapa Rupiah?</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
              <span className="bg-gray-50 px-3 py-2 text-sm text-gray-500 border-r border-gray-300 font-medium select-none">
                Rp
              </span>
              <input
                name="usd_rate"
                type="number"
                defaultValue={usdRate}
                min={1}
                step={1}
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
                placeholder="15800"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Contoh: produk Rp 30.000 akan tampil sebagai $
              {(30000 / usdRate).toFixed(2)} di halaman berbahasa Inggris.
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
