/**
 * Upload media from data/ folders to Cloudinary.
 *
 * Usage:
 *   set PATH=C:\tools\node-v20.19.5-win-x64;%PATH% && npx tsx scripts/upload-media.ts
 *
 * Structure:
 *   data/yala/photo.jpg        → Cloudinary public ID: yala/photo
 *   data/bundala/video.mp4     → Cloudinary public ID: bundala/video
 *   data/site/hero-banner.jpg  → Cloudinary public ID: site/hero-banner
 *
 * The first image in each destination folder becomes the featured image.
 * All files are uploaded with clean names (spaces replaced with hyphens, lowercase).
 */

import { config } from "dotenv";
import * as fs from "fs";
import * as path from "path";

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

const DATA_DIR = path.join(process.cwd(), "data");

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".avi", ".webm"];

function cleanFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_.]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getResourceType(ext: string): "image" | "video" | null {
  if (IMAGE_EXTENSIONS.includes(ext.toLowerCase())) return "image";
  if (VIDEO_EXTENSIONS.includes(ext.toLowerCase())) return "video";
  return null;
}

async function uploadFile(
  filePath: string,
  folder: string,
  fileName: string,
  resourceType: "image" | "video"
): Promise<{ publicId: string; url: string }> {
  const publicId = `${folder}/${fileName}`;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString("base64");
  const dataUri = `data:${resourceType === "image" ? "image/jpeg" : "video/mp4"};base64,${base64}`;

  const timestamp = Math.floor(Date.now() / 1000).toString();

  // Generate signature
  const crypto = await import("crypto");
  const signatureStr = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");

  const formData = new URLSearchParams();
  formData.append("file", dataUri);
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("api_key", API_KEY!);
  formData.append("signature", signature);
  formData.append("overwrite", "true");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed for ${publicId}: ${res.status} ${text}`);
  }

  const data = await res.json();
  return { publicId: data.public_id, url: data.secure_url };
}

async function uploadFolder(folderName: string): Promise<void> {
  const folderPath = path.join(DATA_DIR, folderName);

  if (!fs.existsSync(folderPath)) {
    console.log(`  ⚠ Folder not found: ${folderName}`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return getResourceType(ext) !== null;
  });

  if (files.length === 0) {
    console.log(`  ⚠ No media files in: ${folderName}`);
    return;
  }

  console.log(`  Uploading ${files.length} files from ${folderName}/...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const cleanName = cleanFileName(baseName);
    const resourceType = getResourceType(ext)!;
    const filePath = path.join(folderPath, file);

    try {
      const result = await uploadFile(filePath, folderName, cleanName, resourceType);
      console.log(`    ✓ [${resourceType}] ${result.publicId}`);
    } catch (err) {
      console.error(`    ✗ Failed: ${file} — ${(err as Error).message}`);
    }
  }
}

async function main() {
  console.log("Uploading media to Cloudinary...\n");

  const folders = fs.readdirSync(DATA_DIR).filter((f) => {
    return fs.statSync(path.join(DATA_DIR, f)).isDirectory();
  });

  for (const folder of folders) {
    await uploadFolder(folder);
  }

  console.log("\n✅ Upload complete!");
  console.log("\nPublic IDs follow the pattern: {folder}/{clean-filename}");
  console.log("Update the seed script with the actual public IDs if needed.");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
