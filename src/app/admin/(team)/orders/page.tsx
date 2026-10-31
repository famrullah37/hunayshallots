import { getOrders, updateOrderStatus } from "@/actions/order";
import StatusSelect from "@/components/admin/StatusSelect";
import type { OrderItemInput } from "@/actions/order";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pesanan | Hunay Admin" };

const rupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
const weight = (g: number) => (g >= 1000 ? `${(g / 1000).toFixed(2)} kg` : `${g} g`);

export default async function AdminOrdersPage() {
  const orders = await getOrders().catch(() => []);
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Pesanan Retail ({orders.length})
        {newCount > 0 && <span className="ml-2 text-base font-semibold text-red-600">· {newCount} baru</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Tercatat saat pembeli menekan tombol order WhatsApp di keranjang. Pembayaran dan ongkir final tetap dikonfirmasi di WhatsApp.
      </p>
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          Belum ada pesanan.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const items = o.items as OrderItemInput[];
            const waDigits = o.whatsapp.replace(/\D/g, "");
            return (
              <div key={o.id} className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h2 className="font-bold text-gray-900">
                    {o.customerName} <span className="font-normal text-gray-500">— {o.country}</span>
                  </h2>
                  <div className="flex items-center gap-3">
                    <StatusSelect status={o.status} handledBy={o.handledBy} onChange={updateOrderStatus.bind(null, o.id)} />
                    <span className="text-xs text-gray-400">
                      {o.createdAt.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                </div>

                <table className="w-full text-sm mb-3">
                  <tbody>
                    {items.map((i, idx) => (
                      <tr key={idx} className="border-t border-gray-100">
                        <td className="py-1.5">{i.name}</td>
                        <td className="py-1.5 text-gray-500 text-right whitespace-nowrap">× {i.quantity}</td>
                        <td className="py-1.5 text-right whitespace-nowrap">{rupiah(i.price * i.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <dl className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <dt className="text-gray-400">WhatsApp</dt>
                    <dd>
                      {waDigits ? (
                        <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
                          {o.whatsapp}
                        </a>
                      ) : (
                        o.whatsapp
                      )}
                    </dd>
                  </div>
                  <div><dt className="text-gray-400">Subtotal</dt><dd className="font-semibold">{rupiah(o.subtotal)}</dd></div>
                  <div><dt className="text-gray-400">Est. ongkir</dt><dd>{o.shippingEstimate != null ? rupiah(o.shippingEstimate) : "-"}</dd></div>
                  <div><dt className="text-gray-400">Berat</dt><dd>{weight(o.totalWeight)}</dd></div>
                </dl>
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-line"><span className="text-gray-400">Alamat: </span>{o.address}</p>
                {o.notes && <p className="mt-1 text-sm text-gray-700 whitespace-pre-line"><span className="text-gray-400">Catatan: </span>{o.notes}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
