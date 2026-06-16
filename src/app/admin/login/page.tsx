import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login | Hunay" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ttl?: string }>;
}) {
  const { error, ttl } = await searchParams;

  const errorMessage =
    error === "rate"
      ? `Terlalu banyak percobaan. Coba lagi dalam ${Math.ceil(Number(ttl) / 60)} menit.`
      : error === "redis"
      ? "Server tidak bisa membuat sesi login (koneksi Redis gagal). Hubungi admin teknis."
      : error
      ? "Password salah. Coba lagi."
      : null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hunay Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Masukkan password untuk masuk</p>
        </div>
        <LoginForm errorMessage={errorMessage} isRateLimited={error === "rate"} />
      </div>
    </div>
  );
}
