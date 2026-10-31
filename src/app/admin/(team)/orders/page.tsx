import Link from "next/link";
import { getOrders, updateOrderStatus, updateLocalOrderStatus } from "@/actions/order";
import StatusSelect from "@/components/admin/StatusSelect";
import type { OrderItemInput } from "@/actions/order";
import { fetchLocalOrders, isLocalOrdersEnabled, type LocalOrder } from "@/lib/bawanghunay";
import { LOCAL_STATUSES } from "@/lib/status";

export const dynamic = "force-dynamic";
export const metadata = { title: "Pesanan | Hunay Admin" };

const rupiah = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
const weight = (g: number) => (g >= 1000 ? `${(g / 1000).toFixed(2)} kg` : `${g} g`);
const dateTime = (d: Date) => d.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

type ExportOrder = Awaited<ReturnType<typeof getOrders>>[number];
type Entry =
  | { source: "export"; date: Date; isNew: boolean; order: ExportOrder }
  | { source: "lokal"; date: Date; isNew: boolean; order: LocalOrder };

const SOURCE_LABEL = {
  export: { text: "🌏 hunayshallots.com", className: "bg-blue-50 text-blue-700" },
  lokal: { text: "🇮🇩 bawanghunay.com", className: "bg-red-50 text-red-700" },
};

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string; only?: string }>;
}) {
  const { source = "all", only } = await searchParams;
  const [exportOrders, localOrders] = await Promise.all([getOrders().catch(() => []), fetchLocalOrders()]);

  const all: Entry[] = [
    ...exportOrders.map((order) => ({ source: "export" as const, date: order.createdAt, isNew: order.status === "new", order })),
    ...(localOrders ?? []).map((order) => ({
      source: "lokal" as const,
      date: new Date(order.createdAt),
      isNew: order.status === "baru",
      order,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const entries = all.filter((e) => (source === "all" || e.source === source) && (only !== "new" || e.isNew));
  const newCount = all.filter((e) => e.isNew).length;

  const filterHref = (s: string, o?: string) => {
    const p = new URLSearchParams();
    if (s !== "all") p.set("source", s);
    if (o) p.set("only", o);
    const q = p.toString();
    return q ? `/admin/orders?${q}` : "/admin/orders";
  };
  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-semibold transition ${active ? "bg-green-700 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-green-700"}`;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Pesanan ({all.length})
        {newCount > 0 && <span className="ml-2 text-base font-semibold text-red-600">· {newCount} baru</span>}
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Pesanan dari hunayshallots.com (ekspor/retail luar negeri) dan bawanghunay.com (pasar Indonesia) dalam satu daftar.
      </p>

      {isLocalOrdersEnabled && localOrders === null && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Pesanan bawanghunay.com tidak bisa dimuat saat ini. Yang tampil hanya pesanan hunayshallots.com.
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <Link href={filterHref("all", only)} className={chip(source === "all")}>Semua</Link>
        <Link href={filterHref("export", only)} className={chip(source === "export")}>hunayshallots.com</Link>
        {isLocalOrdersEnabled && (
          <Link href={filterHref("lokal", only)} className={chip(source === "lokal")}>bawanghunay.com</Link>
        )}
        <span className="mx-1 border-l border-gray-200" />
        <Link href={filterHref(source, only === "new" ? undefined : "new")} className={chip(only === "new")}>
          Hanya yang baru
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          Belum ada pesanan.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) =>
            e.source === "export" ? (
              <ExportOrderCard key={`export-${e.order.id}`} order={e.order} />
            ) : (
              <LocalOrderCard key={`lokal-${e.order.id}`} order={e.order} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function SourceBadge({ source }: { source: keyof typeof SOURCE_LABEL }) {
  const s = SOURCE_LABEL[source];
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.className}`}>{s.text}</span>;
}

function ExportOrderCard({ order: o }: { order: ExportOrder }) {
  const items = o.items as OrderItemInput[];
  const waDigits = o.whatsapp.replace(/\D/g, "");
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <SourceBadge source="export" />
          <h2 className="font-bold text-gray-900">
            {o.customerName} <span className="font-normal text-gray-500">— {o.country}</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <StatusSelect status={o.status} handledBy={o.handledBy} onChange={updateOrderStatus.bind(null, o.id)} />
          <span className="text-xs text-gray-400">{dateTime(o.createdAt)}</span>
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
}

function LocalOrderCard({ order: o }: { order: LocalOrder }) {
  // bawanghunay.com stores Indonesian numbers like 0812…; WhatsApp needs 62812…
  const digits = (o.customer?.phone ?? "").replace(/\D/g, "").replace(/^0/, "62");
  const shipping =
    typeof o.shippingCost === "number" ? rupiah(o.shippingCost) : o.shippingEstimate ?? "-";
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <SourceBadge source="lokal" />
          <h2 className="font-bold text-gray-900">
            {o.customer?.name ?? "-"}{" "}
            <span className="font-normal text-gray-500">
              — {o.customer?.city ?? "-"}{o.customer?.zone ? ` (${o.customer.zone})` : ""}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <StatusSelect
            status={o.status}
            handledBy={o.handledBy ?? null}
            options={LOCAL_STATUSES}
            onChange={updateLocalOrderStatus.bind(null, o.id)}
          />
          <span className="text-xs text-gray-400">{dateTime(new Date(o.createdAt))}</span>
        </div>
      </div>

      <table className="w-full text-sm mb-3">
        <tbody>
          {(o.items ?? []).map((i, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-1.5">{i.productName}</td>
              <td className="py-1.5 text-gray-500 text-right whitespace-nowrap">× {i.qty}</td>
              <td className="py-1.5 text-right whitespace-nowrap">{rupiah(i.price * i.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
        <div>
          <dt className="text-gray-400">WhatsApp</dt>
          <dd>
            {digits ? (
              <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">
                {o.customer?.phone}
              </a>
            ) : (
              "-"
            )}
          </dd>
        </div>
        <div><dt className="text-gray-400">Total bayar</dt><dd className="font-semibold">{o.total != null ? rupiah(o.total) : "-"}</dd></div>
        <div><dt className="text-gray-400">Ongkir{o.courier ? ` (${o.courier})` : ""}</dt><dd>{shipping}</dd></div>
        <div><dt className="text-gray-400">Pembayaran</dt><dd>{o.paymentMethod ?? "-"}</dd></div>
      </dl>
      <p className="mt-3 text-xs text-gray-400">{o.id}</p>
    </div>
  );
}
