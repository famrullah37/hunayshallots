import { getShippingCost, updateShippingCost, getRajaOngkirSettings, updateRajaOngkirSettings } from "@/actions/settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pengaturan | Hunay Admin" };

export default async function SettingsPage() {
  const shippingCost = await getShippingCost();
  const { apiKey, originCityId } = await getRajaOngkirSettings();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>

      {/* Flat shipping override */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Ongkos Pengiriman Global (Override)</h2>
        <p className="text-sm text-gray-500 mb-5">
          Isi nilai ini hanya jika ingin meng-override kalkulator ongkir dengan harga tetap.
          Isi <strong>0</strong> agar pembeli menggunakan kalkulator ongkir otomatis.
        </p>

        <form action={updateShippingCost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biaya Pengiriman Tetap (IDR)
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
              <span className="bg-gray-50 px-3 py-2 text-sm text-gray-500 border-r border-gray-300 font-medium select-none">
                Rp
              </span>
              <input
                name="shipping_cost"
                type="number"
                defaultValue={shippingCost}
                min={0}
                step={1000}
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
                placeholder="0 = gunakan kalkulator otomatis"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Masukkan 0 agar kalkulator RajaOngkir aktif di halaman checkout.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Saat ini:</strong>{" "}
              {shippingCost > 0
                ? `Rp ${shippingCost.toLocaleString("id-ID")} (override aktif)`
                : "Kalkulator ongkir otomatis aktif"}
            </span>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
          >
            Simpan
          </button>
        </form>
      </div>

      {/* RajaOngkir config */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Konfigurasi RajaOngkir</h2>
        <p className="text-sm text-gray-500 mb-2">
          Digunakan untuk menghitung ongkir otomatis di halaman checkout (pengiriman dalam negeri).
          Daftar gratis di{" "}
          <a href="https://rajaongkir.com" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
            rajaongkir.com
          </a>{" "}
          untuk mendapatkan API key.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 mb-5">
          <strong>Cara cari Kode Kota Asal:</strong> Login RajaOngkir → API → City → cari &quot;Probolinggo&quot; → lihat <code>city_id</code>.<br />
          Default sudah diset ke <strong>439</strong> (Kota Probolinggo).
        </div>

        <form action={updateRajaOngkirSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key RajaOngkir <span className="text-red-500">*</span>
            </label>
            <input
              name="rajaongkir_key"
              type="text"
              defaultValue={apiKey}
              placeholder="Masukkan API key dari rajaongkir.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode Kota Asal (RajaOngkir City ID)
            </label>
            <input
              name="origin_city_id"
              type="text"
              defaultValue={originCityId}
              placeholder="439"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400 mt-1">Default: 439 (Kota Probolinggo)</p>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Status API Key:</strong>{" "}
              {apiKey ? "✅ Sudah dikonfigurasi" : "⚠️ Belum dikonfigurasi — kalkulator ongkir tidak aktif"}
            </span>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
          >
            Simpan Konfigurasi
          </button>
        </form>
      </div>
    </div>
  );
}
