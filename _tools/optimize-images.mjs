import { readdir, stat, mkdir, copyFile, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WRITE = process.argv.includes("--write");
const DIR = path.join(process.cwd(), "public", "images");
const BACKUP = path.join(process.cwd(), "_tools", "originals");
const MAX_W = 1600;
const QUALITY = 78;

await mkdir(BACKUP, { recursive: true });
const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f) && !/^logo/i.test(f));

let before = 0;
let after = 0;
const rows = [];

for (const file of files) {
  const p = path.join(DIR, file);
  const s = await stat(p);
  // Read into a Buffer first: on Windows sharp would otherwise keep a read handle
  // on the same path and the in-place write below would fail.
  const src = await readFile(p);
  const meta = await sharp(src).metadata();
  let pipe = sharp(src).rotate();
  if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
  const buf = await pipe
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" })
    .toBuffer();

  before += s.size;
  after += buf.length;
  rows.push({ file, from: Math.round(s.size / 1024), to: Math.round(buf.length / 1024) });

  if (WRITE && buf.length < s.size) {
    await copyFile(p, path.join(BACKUP, file));
    await writeFile(p, buf);
  }
}

rows.sort((a, b) => b.from - a.from);
for (const r of rows.slice(0, 10)) {
  console.log("  " + r.file.padEnd(32) + String(r.from).padStart(5) + " KB -> " + String(r.to).padStart(5) + " KB");
}
console.log("  ... " + Math.max(0, rows.length - 10) + " file lain");
console.log("TOTAL " + (before / 1048576).toFixed(2) + " MB -> " + (after / 1048576).toFixed(2) + " MB  (" + Math.round((1 - after / before) * 100) + "% smaller)" + (WRITE ? "  [WRITTEN]" : "  [dry run]"));
