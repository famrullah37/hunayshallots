import { getShippingCost, updateShippingCost } from "@/actions/settings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pengaturan | Hunay Admin" };

export default async function SettingsPage() {
  const shippingCost = await getShippingCost();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Ongkos Pengiriman Global</h2>
        <p className="text-sm text-gray-500 mb-5">
          Biaya pengiriman ini akan ditampilkan langsung di halaman checkout dan disertakan dalam total pesanan WhatsApp.
          Isi <strong>0</strong> jika ingin ongkir dikonfirmasi manual.
        </p>

        <form action={updateShippingCost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biaya Pengiriman (IDR)
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
                placeholder="Contoh: 15000"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Masukkan 0 untuk konfirmasi ongkir manual via WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Saat ini:</strong>{" "}
              {shippingCost > 0
                ? `Rp ${shippingCost.toLocaleString("id-ID")}`
                : "Dikonfirmasi manual via WhatsApp"}
            </span>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
          >
            Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  );
}
