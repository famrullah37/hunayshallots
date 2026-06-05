import { createProduct } from "@/actions/products";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tambah Produk | Hunay Admin" };

export default function NewProductPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">← Kembali</Link>
        <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm action={createProduct} submitLabel="Simpan Produk" />
      </div>
    </div>
  );
}
