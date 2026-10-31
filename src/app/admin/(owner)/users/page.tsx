import { getUsers, createUser, setUserActive, resetUserPassword } from "@/actions/users";
import { CreateUserForm, ResetPasswordForm } from "@/components/admin/UserForms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tim | Hunay Admin" };

export default async function AdminUsersPage() {
  const users = await getUsers().catch(() => []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Akun Tim</h1>
      <p className="text-sm text-gray-500 mb-6">
        <strong>Produksi</strong>: memproses Pesanan &amp; Penawaran dan mengelola Produk.{" "}
        <strong>Admin</strong>: semua menu termasuk Dashboard. Akun admin utama (dari pengaturan server) tidak tampil di sini.
      </p>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Tambah akun</h2>
        <CreateUserForm action={createUser} />
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          Belum ada akun tim.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className={`font-semibold ${u.isActive ? "text-gray-900" : "text-gray-400 line-through"}`}>
                  {u.name} <span className="font-normal text-gray-500">@{u.username}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {u.role === "admin" ? "Admin" : "Produksi"}
                  {!u.isActive && " · nonaktif"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <ResetPasswordForm action={resetUserPassword.bind(null, u.id)} />
                <form action={setUserActive.bind(null, u.id, !u.isActive)}>
                  <button
                    type="submit"
                    className={`text-sm font-medium ${u.isActive ? "text-red-600 hover:text-red-700" : "text-green-700 hover:text-green-800"}`}
                  >
                    {u.isActive ? "Nonaktifkan" : "Aktifkan"}
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
