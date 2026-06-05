"use client";

import { useState } from "react";
import CloudinaryUpload from "./CloudinaryUpload";
import type { BlogPost } from "@/generated/prisma/client";

interface Props {
  post?: BlogPost;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
}

export default function BlogForm({ post, action, submitLabel = "Simpan" }: Props) {
  const [coverImage, setCoverImage] = useState(post?.coverImage || "");
  const [isPublished, setIsPublished] = useState(post?.isPublished ?? false);
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="isPublished" value={String(isPublished)} />

      {/* Language Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-1">
          {(["id", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg transition border-b-2 -mb-px ${
                lang === l
                  ? "border-green-600 text-green-700 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {l === "id" ? "🇮🇩 Indonesia" : "🇬🇧 English"}
            </button>
          ))}
        </div>
      </div>

      {/* Tab ID — stays in DOM */}
      <div style={{ display: lang === "id" ? "block" : "none" }} className="space-y-4">
        <Field label="Judul Artikel" name="titleId" defaultValue={post?.titleId} required />
        <Textarea label="Ringkasan (Excerpt)" name="excerptId" defaultValue={post?.excerptId || ""} rows={2} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konten — Markdown
          </label>
          <textarea
            name="contentId"
            defaultValue={post?.contentId || ""}
            rows={16}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
            placeholder="Tulis konten dalam format Markdown..."
          />
        </div>
      </div>

      {/* Tab EN — stays in DOM */}
      <div style={{ display: lang === "en" ? "block" : "none" }} className="space-y-4">
        <Field label="Article Title" name="titleEn" defaultValue={post?.titleEn} required />
        <Textarea label="Excerpt" name="excerptEn" defaultValue={post?.excerptEn || ""} rows={2} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content — Markdown
          </label>
          <textarea
            name="contentEn"
            defaultValue={post?.contentEn || ""}
            rows={16}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-y"
            placeholder="Write content in Markdown format..."
          />
        </div>
      </div>

      {/* Shared: Cover Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
        <CloudinaryUpload value={coverImage} onChange={setCoverImage} label="Upload Cover" />
      </div>

      {/* Shared: Publish toggle */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <button
          type="button"
          onClick={() => setIsPublished(!isPublished)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isPublished ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              isPublished ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">
          {isPublished ? "✅ Published — tampil di website" : "📝 Draft — tidak tampil di website"}
        </span>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <button
          type="submit"
          className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
        >
          {submitLabel}
        </button>
        <span className="text-xs text-gray-400">Pastikan isi field di kedua tab (ID & EN)</span>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, required }: {
  label: string; name: string; defaultValue?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type="text"
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function Textarea({ label, name, defaultValue, rows = 3 }: {
  label: string; name: string; defaultValue?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
      />
    </div>
  );
}
