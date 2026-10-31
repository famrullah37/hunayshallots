import { createPost } from "@/actions/blog";
import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tulis Artikel | Hunay Admin" };

export default function NewBlogPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-gray-500 hover:text-gray-700">← Kembali</Link>
        <h1 className="text-2xl font-bold text-gray-900">Tulis Artikel Baru</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BlogForm action={createPost} submitLabel="Simpan Artikel" />
      </div>
    </div>
  );
}
