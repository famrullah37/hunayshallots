import { getInquiries } from "@/actions/inquiry";

export const dynamic = "force-dynamic";
export const metadata = { title: "Permintaan Penawaran | Hunay Admin" };

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries().catch(() => []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Permintaan Penawaran Ekspor ({inquiries.length})</h1>
      {inquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          Belum ada permintaan penawaran.
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((q) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h2 className="font-bold text-gray-900">
                  {q.company} <span className="font-normal text-gray-500">— {q.name}, {q.country}</span>
                </h2>
                <span className="text-xs text-gray-400">
                  {q.createdAt.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                  {q.sourcePage ? ` · ${q.sourcePage}` : ""}
                </span>
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                <div><dt className="text-gray-400">Email</dt><dd><a href={`mailto:${q.email}`} className="text-green-700 underline">{q.email}</a></dd></div>
                <div><dt className="text-gray-400">Telepon</dt><dd>{q.phone || "-"}</dd></div>
                <div><dt className="text-gray-400">Produk</dt><dd>{q.product}{q.packaging ? ` · ${q.packaging}` : ""}</dd></div>
                <div><dt className="text-gray-400">Volume</dt><dd>{q.volume || "-"}</dd></div>
              </dl>
              {q.message && <p className="mt-3 text-sm text-gray-700 whitespace-pre-line">{q.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
