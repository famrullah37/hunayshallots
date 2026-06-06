import { v2 as cloudinary } from "cloudinary";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env.local") });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cfg = cloudinary.config();
console.log("cloud_name:", cfg.cloud_name);
console.log("api_key:", cfg.api_key);
console.log("api_secret length:", cfg.api_secret?.length);
console.log("api_secret first char code:", cfg.api_secret?.charCodeAt(0));
console.log("api_secret last char code:", cfg.api_secret?.charCodeAt(cfg.api_secret.length - 1));

// Test signature generation
const ts = Math.round(Date.now() / 1000);
const params = { overwrite: true, public_id: "test", timestamp: ts };
const sig = cloudinary.utils.api_sign_request(params, cfg.api_secret);
console.log("\nGenerated signature:", sig);
console.log("String to sign:", Object.entries(params).sort().map(([k,v]) => `${k}=${v}`).join("&"));
