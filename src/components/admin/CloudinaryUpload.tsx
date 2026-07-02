"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryUpload({ value, onChange, label = "Upload Image" }: Props) {
  const [error, setError] = useState<string | null>(null);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <div className="space-y-2">
      {!cloudName && (
        <p className="text-sm text-red-600">
          Cloudinary belum dikonfigurasi (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME kosong). Upload tidak akan berfungsi.
        </p>
      )}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hunay_uploads"}
        onOpen={() => setError(null)}
        onSuccess={(result) => {
          if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
            onChange(result.info.secure_url as string);
          }
        }}
        onError={(err) => {
          const message = typeof err === "string" ? err : err?.statusText || "Upload gagal";
          console.error("[CloudinaryUpload] upload error:", err);
          setError(message);
        }}
        options={{ maxFiles: 1, resourceType: "image", clientAllowedFormats: ["jpg", "png", "webp"] }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            {label}
          </button>
        )}
      </CldUploadWidget>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
