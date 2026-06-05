import { prisma } from "@/lib/prisma";
import { updatePost } from "@/actions/blog";
import BlogForm from "@/components/admin/BlogForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Artikel | Hunay Admin" };

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updatePost(id, formData);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blog" className="text-gray-500 hover:text-gray-700">← Kembali</Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BlogForm post={post} action={action} submitLabel="Update Artikel" />
      </div>
    </div>
  );
}
