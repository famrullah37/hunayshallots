"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CloudinaryUpload({ value, onChange, label = "Upload Image" }: Props) {
  return (
    <div className="space-y-2">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "hunay_uploads"}
        onSuccess={(result) => {
          if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
            onChange(result.info.secure_url as string);
          }
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
      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
