"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DEFAULT_VIDEOS = [
  { slot: 1, titleId: "Profil Hunay",           titleEn: "Hunay Profile",          videoUrl: null as string | null },
  { slot: 2, titleId: "Produksi Sambal",         titleEn: "Sambal Production",       videoUrl: null as string | null },
  { slot: 3, titleId: "Produk Hunay",            titleEn: "Hunay Products",          videoUrl: null as string | null },
  { slot: 4, titleId: "Produk Premium",          titleEn: "Premium Products",        videoUrl: null as string | null },
  { slot: 5, titleId: "Gudang Produksi",         titleEn: "Production Warehouse",    videoUrl: null as string | null },
  { slot: 6, titleId: "Proses Produksi Hunay",   titleEn: "Hunay Production Process",
    videoUrl: "https://res.cloudinary.com/davkdgozv/video/upload/v1780710802/hunay/videos/proses-produksi.mp4" },
];

export async function getGalleryVideos() {
  try {
    const rows = await prisma.galleryVideo.findMany({ orderBy: { slot: "asc" } });
    return DEFAULT_VIDEOS.map((def) => {
      const row = rows.find((r) => r.slot === def.slot);
      return {
        slot: def.slot,
        titleId: row?.titleId ?? def.titleId,
        titleEn: row?.titleEn ?? def.titleEn,
        videoUrl: row?.videoUrl ?? def.videoUrl,
      };
    });
  } catch {
    return DEFAULT_VIDEOS;
  }
}

export async function updateGalleryVideo(slot: number, videoUrl: string | null) {
  const def = DEFAULT_VIDEOS[slot - 1];
  await prisma.galleryVideo.upsert({
    where: { slot },
    update: { videoUrl },
    create: {
      slot,
      titleId: def.titleId,
      titleEn: def.titleEn,
      videoUrl,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/videos");
}

export async function getVideoUploadSignature(slot: number) {
  const timestamp = Math.round(Date.now() / 1000);
  const publicId = `hunay/videos/slot-${slot}`;
  const paramsToSign = {
    folder: "hunay/videos",
    overwrite: "true",
    public_id: publicId,
    timestamp,
  };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );
  return {
    signature,
    timestamp,
    publicId,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  };
}
