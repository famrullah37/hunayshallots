import { v2 as cloudinary } from "cloudinary";
import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

config({ path: join(root, ".env.local") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videos = [
  "profil-hunay.mp4",
  "produksi-sambal.mp4",
  "produk-1.mp4",
  "produk-2.mp4",
  "gudang-produksi.mp4",
  // "proses-produksi.mp4", // sudah diupload: https://res.cloudinary.com/davkdgozv/video/upload/v1780710802/hunay/videos/proses-produksi.mp4
];

console.log("Uploading videos to Cloudinary...\n");

const results = {};

for (const filename of videos) {
  const filePath = join(root, "public", "video", filename);
  const publicId = `hunay/videos/${filename.replace(".mp4", "")}`;

  process.stdout.write(`Uploading ${filename}... `);
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "video", public_id: publicId, overwrite: true, chunk_size: 6_000_000 },
        (err, res) => (err ? reject(err) : resolve(res))
      );
      createReadStream(filePath).pipe(stream);
    });
    results[filename] = result.secure_url;
    console.log(`OK`);
    console.log(`  -> ${result.secure_url}`);
  } catch (err) {
    console.log(`FAILED: ${err.message ?? JSON.stringify(err)}`);
  }
}

console.log("\n=== Update GallerySection.tsx dengan URL berikut ===\n");
for (const [file, url] of Object.entries(results)) {
  console.log(`${file}:`);
  console.log(`  ${url}\n`);
}
