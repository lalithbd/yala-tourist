/**
 * Upload missing media from data/upload/ to Cloudinary.
 *
 * Usage:
 *   npx tsx scripts/upload-missing.ts
 *
 * Files in data/upload/ are mapped to Cloudinary public IDs:
 *   data/upload/yala/yala-photo-02.jpg       → tourist/yala/yala-photo-02
 *   data/upload/gami-gedara/gami-gedara.jpg  → tourist/gami-gedara/gami-gedara
 *   data/upload/lunugamvehera/lunugamvehera.jpg → tourist/lunugamvehera
 *
 * Special cases for root-level public IDs (no subfolder in the ID):
 *   lunugamvehera/lunugamvehera.jpg         → tourist/lunugamvehera
 *   lunugamvehera/lunugamvehera-elephants.jpg → tourist/lunugamvehera-elephants
 *   sithulpawwa/sithulpawwa.webp            → tourist/sithulpawwa
 *   sithulpawwa/sithulpawwa-temple.jpg      → tourist/sithulpawwa-temple
 *   weheragala/weheragala.jpg               → tourist/weheragala
 *   weheragala/weheragala-reservoir.jpg     → tourist/weheragala-reservoir
 */

import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

config({ path: ".env.local" });

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error(
    "Missing CLOUDINARY env vars. Add these to .env.local:\n" +
      "  CLOUDINARY_API_KEY=your_api_key\n" +
      "  CLOUDINARY_API_SECRET=your_api_secret\n" +
      "  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name"
  );
  process.exit(1);
}

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi", ".webm"];

// Folders where the public ID should be "tourist/{filename}" (no subfolder)
const ROOT_LEVEL_FOLDERS = ["lunugamvehera", "sithulpawwa", "weheragala"];

interface UploadItem {
  filePath: string;
  publicId: string;
  resourceType: "image" | "video";
}

function getResourceType(ext: string): "image" | "video" | null {
  if (IMAGE_EXTENSIONS.includes(ext.toLowerCase())) return "image";
  if (VIDEO_EXTENSIONS.includes(ext.toLowerCase())) return "video";
  return null;
}

function buildUploadList(): UploadItem[] {
  const uploadDir = path.join(process.cwd(), "data", "upload");
  const items: UploadItem[] = [];

  if (!fs.existsSync(uploadDir)) {
    console.error("data/upload/ directory not found");
    process.exit(1);
  }

  const folders = fs.readdirSync(uploadDir).filter((f) =>
    fs.statSync(path.join(uploadDir, f)).isDirectory()
  );

  for (const folder of folders) {
    const folderPath = path.join(uploadDir, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const resourceType = getResourceType(ext);
      if (!resourceType) continue;

      const baseName = path.basename(file, ext);
      const filePath = path.join(folderPath, file);

      let publicId: string;
      if (ROOT_LEVEL_FOLDERS.includes(folder)) {
        // e.g. tourist/lunugamvehera, tourist/weheragala-reservoir
        publicId = `tourist/${baseName}`;
      } else {
        // e.g. tourist/yala/yala-photo-02, tourist/gami-gedara/gami-gedara
        publicId = `tourist/${folder}/${baseName}`;
      }

      items.push({ filePath, publicId, resourceType });
    }
  }

  return items;
}

async function uploadFile(item: UploadItem): Promise<void> {
  const { filePath, publicId, resourceType } = item;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString("base64");
  const mimeType = resourceType === "image" ? "image/jpeg" : "video/mp4";
  const dataUri = `data:${mimeType};base64,${base64}`;

  const timestamp = Math.floor(Date.now() / 1000).toString();

  const signatureStr = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}&unique_filename=false${API_SECRET}`;
  const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");

  const formData = new URLSearchParams();
  formData.append("file", dataUri);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("api_key", API_KEY!);
  formData.append("signature", signature);
  formData.append("overwrite", "true");
  formData.append("unique_filename", "false");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }

  const data = await res.json();
  console.log(`  ✓ [${resourceType}] ${data.public_id} → ${data.secure_url}`);
}

async function main() {
  console.log("Uploading missing assets to Cloudinary...\n");

  const items = buildUploadList();
  console.log(`Found ${items.length} files to upload:\n`);

  for (const item of items) {
    console.log(`  → ${item.publicId} (${item.resourceType})`);
  }

  console.log("\nStarting upload...\n");

  let success = 0;
  let failed = 0;

  for (const item of items) {
    try {
      await uploadFile(item);
      success++;
    } catch (err) {
      console.error(`  ✗ ${item.publicId} — ${(err as Error).message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done! ${success} uploaded, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
