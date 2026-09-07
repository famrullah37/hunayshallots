"use client";

import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import type { Product } from "@/generated/prisma/client";

const CATEGORIES = [
  { value: "bawang-putih", labelId: "Bawang Putih", labelEn: "Fried Garlic" },
  { value: "bawang-merah", labelId: "Bawang Merah", labelEn: "Fried Shallot" },
  { value: "sambal", labelId: "Sambal", labelEn: "Sambal Sauce" },
];

interface Props {
  product?: Product;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

export default function ProductForm({ product, action, submitLabel = "Simpan" }: Props) {
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [nameEn, setNameEn] = useState(product?.nameEn || "");

  return (
    <form action={action} className="space-y-6 max-w-2xl">
      <input type="hidden" name="imageUrl" value={imageUrl} />
      {/* nameId is required in the database (in case the ID sister site still
          reads it) but this admin only writes English content now, so mirror
          the English name into it rather than asking the admin to type it twice. */}
      <input type="hidden" name="nameId" value={nameEn} />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            name="nameEn"
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <Textarea label="Product Description" name="descriptionEn" defaultValue={product?.descriptionEn || ""} />
      </div>

      {/* Shared fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harga (IDR)</label>
          <input
            name="price"
            type="number"
            defaultValue={product?.price}
            required
            min={0}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Berat <span className="text-gray-400 font-normal">(gram)</span>
          </label>
          <input
            name="weight"
            type="number"
            defaultValue={product?.weight ?? 0}
            required
            min={0}
            placeholder="contoh: 150"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            name="category"
            defaultValue={product?.category || "bawang-putih"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.labelId} / {c.labelEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Urutan Tampil" name="sortOrder" type="number" defaultValue={String(product?.sortOrder ?? 0)} />
      </div>

      <Field
        label="Custom Pesan WhatsApp (opsional)"
        name="whatsappText"
        defaultValue={product?.whatsappText || ""}
        placeholder="Hello, I'd like to order..."
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kata Kunci SEO <span className="text-gray-400 font-normal">(pisahkan dengan koma)</span>
        </label>
        <input
          name="keywords"
          type="text"
          defaultValue={product?.keywords || ""}
          placeholder="fried shallot, fried garlic, halal snack"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Foto Produk</label>
        <CloudinaryUpload value={imageUrl} onChange={setImageUrl} label="Upload Foto" />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          value="true"
          defaultChecked={product?.isActive ?? true}
          className="w-4 h-4 accent-green-600"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Tampilkan produk di website
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, name, defaultValue, required, type = "text", placeholder,
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function Textarea({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={4}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
      />
    </div>
  );
}
