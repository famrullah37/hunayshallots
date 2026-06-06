import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/hunay_logo.png" alt="Hunay" width={36} height={36} className="rounded-md" />
            <span className="font-bold text-lg">Admin</span>
          </Link>
          <Link href="/admin" className="text-green-200 hover:text-white text-sm transition">Dashboard</Link>
          <Link href="/admin/products" className="text-green-200 hover:text-white text-sm transition">Produk</Link>
          <Link href="/admin/blog" className="text-green-200 hover:text-white text-sm transition">Blog</Link>
          <Link href="/admin/videos" className="text-green-200 hover:text-white text-sm transition">Video</Link>
          <Link href="/" target="_blank" className="text-green-200 hover:text-white text-sm transition">Lihat Website ↗</Link>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-green-200 hover:text-white transition">
            Keluar
          </button>
        </form>
      </nav>
      <main className="container mx-auto px-6 py-8 max-w-6xl">{children}</main>
    </div>
  );
}
