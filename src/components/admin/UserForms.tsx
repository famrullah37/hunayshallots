"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { UserFormState } from "@/actions/users";

const input =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

type FormAction = (prev: UserFormState, formData: FormData) => Promise<UserFormState>;

export function CreateUserForm({ action }: { action: FormAction }) {
  const [state, formAction, pending] = useActionState(action, { ok: false });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Nama</span>
        <input name="name" required className={input} placeholder="Nurul" />
      </label>
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Username</span>
        <input name="username" required className={input} placeholder="nurul" autoComplete="off" />
      </label>
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Password (min. 8)</span>
        <input name="password" type="password" required minLength={8} className={input} autoComplete="new-password" />
      </label>
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Peran</span>
        <select name="role" defaultValue="produksi" className={input}>
          <option value="produksi">Produksi</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition disabled:opacity-60"
      >
        {pending ? "Menyimpan…" : "+ Tambah"}
      </button>
      {state.error && <p className="md:col-span-5 text-sm text-red-600">{state.error}</p>}
      {state.ok && <p className="md:col-span-5 text-sm text-green-700">Akun berhasil dibuat.</p>}
    </form>
  );
}

export function ResetPasswordForm({ action }: { action: FormAction }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(action, { ok: false });

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm text-gray-600 hover:text-green-700">
        Ganti password
      </button>
    );
  }

  if (state.ok) return <span className="text-sm text-green-700">Password diganti.</span>;

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input
        name="password"
        type="password"
        required
        minLength={8}
        placeholder="Password baru"
        autoComplete="new-password"
        className="px-2 py-1 border border-gray-300 rounded text-sm w-36"
      />
      <button type="submit" disabled={pending} className="text-sm text-green-700 font-medium disabled:opacity-60">
        Simpan
      </button>
      {state.error && <span className="text-xs text-red-600">{state.error}</span>}
    </form>
  );
}
