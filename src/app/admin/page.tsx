import Link from "next/link";
import { getProducts } from "@/actions/products";
import { getPosts } from "@/actions/blog";

export const metadata = { title: "Dashboard | Hunay Admin" };

export default async function AdminDashboard() {
  const [products, posts] = await Promise.all([
    getProducts().catch(() => []),
    getPosts().catch(() => []),
  ]);

  const activeProducts = products.filter((p) => p.isActive).length;
  const publishedPosts = posts.filter((p) => p.isPublished).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Produk" value={products.length} color="green" />
        <StatCard label="Produk Aktif" value={activeProducts} color="blue" />
        <StatCard label="Total Artikel" value={posts.length} color="purple" />
        <StatCard label="Artikel Published" value={publishedPosts} color="orange" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickLink
          href="/admin/products/new"
          title="Tambah Produk Baru"
          desc="Upload foto & isi detail produk"
          icon="📦"
        />
        <QuickLink
          href="/admin/blog/new"
          title="Tulis Artikel Baru"
          desc="Buat konten blog atau artikel"
          icon="✏️"
        />
        <QuickLink
          href="/admin/products"
          title="Kelola Produk"
          desc="Edit, aktifkan, atau hapus produk"
          icon="🛍️"
        />
        <QuickLink
          href="/admin/blog"
          title="Kelola Artikel"
          desc="Publish, edit, atau hapus artikel"
          icon="📰"
        />
        <QuickLink
          href="/admin/videos"
          title="Kelola Video Galeri"
          desc="Upload video untuk 6 slot galeri"
          icon="🎬"
        />
        <QuickLink
          href="/admin/settings"
          title="Pengaturan"
          desc="Atur ongkos pengiriman global"
          icon="⚙️"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };
  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-70">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function QuickLink({ href, title, desc, icon }: { href: string; title: string; desc: string; icon: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </Link>
  );
}
