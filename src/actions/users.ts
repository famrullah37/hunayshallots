"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { requireAdmin } from "@/actions/auth";

export type UserFormState = { ok: boolean; error?: string };

const MIN_PASSWORD = 8;

export async function getUsers() {
  await requireAdmin();
  return prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, username: true, role: true, isActive: true, createdAt: true },
  });
}

export async function createUser(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim().slice(0, 80);
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = formData.get("role") === "admin" ? "admin" : "produksi";

  if (!name || !username || !password) return { ok: false, error: "Semua kolom wajib diisi." };
  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    return { ok: false, error: "Username 3–32 karakter: huruf kecil, angka, titik, strip atau garis bawah." };
  }
  if (username === process.env.ADMIN_USERNAME?.toLowerCase()) {
    return { ok: false, error: "Username ini dipakai akun admin utama." };
  }
  if (password.length < MIN_PASSWORD) return { ok: false, error: `Password minimal ${MIN_PASSWORD} karakter.` };

  const exists = await prisma.adminUser.findUnique({ where: { username } });
  if (exists) return { ok: false, error: "Username sudah dipakai." };

  await prisma.adminUser.create({
    data: { name, username, role, passwordHash: await hashPassword(password) },
  });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function setUserActive(id: string, isActive: boolean) {
  await requireAdmin();
  await prisma.adminUser.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/users");
}

export async function resetUserPassword(id: string, _prev: UserFormState, formData: FormData): Promise<UserFormState> {
  await requireAdmin();
  const password = String(formData.get("password") ?? "");
  if (password.length < MIN_PASSWORD) return { ok: false, error: `Password minimal ${MIN_PASSWORD} karakter.` };
  await prisma.adminUser.update({ where: { id }, data: { passwordHash: await hashPassword(password) } });
  return { ok: true };
}
