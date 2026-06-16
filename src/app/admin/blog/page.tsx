import Link from "next/link";
import Image from "next/image";
import { getPosts, deletePost } from "@/actions/blog";

export const dynamic = "force-dynamic";
export const metadata = { title: "Blog | Hunay Admin" };

export default async function AdminBlogPage() {
  const posts = await getPosts().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Artikel Blog ({posts.length})</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
        >
          + Tulis Artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          Belum ada artikel. <Link href="/admin/blog/new" className="text-green-700 underline">Tulis sekarang</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
              {post.coverImage ? (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={post.coverImage} alt={post.titleId} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                  📰
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{post.titleId}</p>
                <p className="text-sm text-gray-400 truncate">{post.titleEn}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.isPublished ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  {post.isPublished && (
                    <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline">
                      Lihat ↗
                    </Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link href={`/admin/blog/${post.id}/edit`} className="text-blue-600 hover:underline text-sm">
                  Edit
                </Link>
                <form action={async () => { "use server"; await deletePost(post.id); }}>
                  <button type="submit" className="text-red-500 hover:underline text-sm">
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
