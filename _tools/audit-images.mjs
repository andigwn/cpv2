import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images");
const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
let total = 0;
const rows = [];
for (const file of files) {
  const p = path.join(dir, file);
  const s = await stat(p);
  const meta = await sharp(p).metadata();
  total += s.size;
  rows.push({ file, kb: Math.round(s.size / 1024), w: meta.width, h: meta.height, format: meta.format });
}
rows.sort((a, b) => b.kb - a.kb);
for (const r of rows) {
  console.log(String(r.kb).padStart(6) + " KB  " + String(r.w).padStart(5) + "x" + String(r.h).padEnd(5) + "  " + String(r.format).padEnd(5) + "  " + r.file);
}
console.log("TOTAL: " + (total / 1024 / 1024).toFixed(2) + " MB across " + rows.length + " files");
