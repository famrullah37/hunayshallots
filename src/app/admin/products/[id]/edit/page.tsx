import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/actions/products";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Produk | Hunay Admin" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updateProduct(id, formData);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">← Kembali</Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Produk</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm product={product} action={action} submitLabel="Update Produk" />
      </div>
    </div>
  );
}
