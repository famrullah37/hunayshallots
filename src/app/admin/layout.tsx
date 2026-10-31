import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, logoutAction, type Role } from "@/actions/auth";

const NAV: { href: string; label: string; roles: Role[] }[] = [
  { href: "/admin", label: "Dashboard", roles: ["admin"] },
  { href: "/admin/orders", label: "Pesanan", roles: ["admin", "produksi"] },
  { href: "/admin/inquiries", label: "Penawaran", roles: ["admin", "produksi"] },
  { href: "/admin/products", label: "Produk", roles: ["admin", "produksi"] },
  { href: "/admin/blog", label: "Blog", roles: ["admin"] },
  { href: "/admin/videos", label: "Video", roles: ["admin"] },
  { href: "/admin/users", label: "Tim", roles: ["admin"] },
  { href: "/admin/settings", label: "Pengaturan", roles: ["admin"] },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Login page (no session): no admin nav.
  if (!user) return <div className="min-h-screen bg-gray-50">{children}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-800 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href={user.role === "admin" ? "/admin" : "/admin/orders"} className="flex items-center gap-2">
            <Image src="/hunay_logo.png" alt="Hunay" width={36} height={36} className="rounded-md" />
            <span className="font-bold text-lg">Admin</span>
          </Link>
          {NAV.filter((n) => n.roles.includes(user.role)).map((n) => (
            <Link key={n.href} href={n.href} className="text-green-200 hover:text-white text-sm transition">
              {n.label}
            </Link>
          ))}
          <Link href="/" target="_blank" className="text-green-200 hover:text-white text-sm transition">Lihat Website ↗</Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-200">
            {user.name} · {user.role === "admin" ? "Admin" : "Produksi"}
          </span>
          <form action={logoutAction}>
            <button type="submit" className="text-green-200 hover:text-white transition">
              Keluar
            </button>
          </form>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8 max-w-6xl">{children}</main>
    </div>
  );
}
