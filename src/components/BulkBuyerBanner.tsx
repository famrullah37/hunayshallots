import Link from "next/link";
import { Boxes } from "lucide-react";
import { MOQ } from "@/lib/company";

// Shown next to retail prices so B2B buyers don't go through the retail cart flow.
export default function BulkBuyerBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-forest-green/20 bg-forest-green/5 p-6 ${className}`}>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-green">
            <Boxes size={24} className="text-white" />
          </div>
          <div>
            <p className="mb-1 text-lg font-bold text-gray-900">Buying in bulk or for export?</p>
            <p className="text-sm text-gray-600">
              Prices shown are retail. Importers and distributors get wholesale pricing, bulk packaging,
              MOQ from {MOQ}, OEM / private label and custom packaging.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <Link
            href="/#quotation"
            className="rounded-full bg-forest-green px-6 py-3 text-center font-semibold text-white transition hover:bg-green-800"
          >
            Request a Quotation
          </Link>
          <Link
            href="/wholesale"
            className="rounded-full border-2 border-forest-green px-6 py-3 text-center font-semibold text-forest-green transition hover:bg-forest-green hover:text-white"
          >
            Export Terms
          </Link>
        </div>
      </div>
    </div>
  );
}
