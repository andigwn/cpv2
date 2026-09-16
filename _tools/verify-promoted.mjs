/**
 * Development-only helper (NOT part of the app bundle).
 * Builds verification contact sheets from the files that actually ship in `public/images/`.
 *
 * Usage: node _tools/verify-promoted.mjs
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import zlib from "node:zlib";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "images");
const OUT_DIR = path.join(ROOT, "_tools");

const TILE_W = 260;
const TILE_H = 150;
const COLS = 3;
const PER_SHEET = 12;

function resample(source, w, h) {
  const { data, width, height } = source;
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx = Math.min(width - 1, Math.floor((x * width) / w));
      const sy = Math.min(height - 1, Math.floor((y * height) / h));
      const s = (sy * width + sx) * 4;
      const d = (y * w + x) * 4;
      out[d] = data[s];
      out[d + 1] = data[s + 1];
      out[d + 2] = data[s + 2];
      out[d + 3] = 255;
    }
  }
  return out;
}

let table;
function crc32(buffer) {
  if (!table) {
    table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buffer.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buffer[i]) & 0xff];
  return crc ^ -1;
}

function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const chunk = (type, payload) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(payload.length, 0);
    const body = Buffer.concat([Buffer.from(type, "ascii"), payload]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0, 0);
    return Buffer.concat([length, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const files = (await readdir(IMG_DIR)).filter((f) => f.endsWith(".jpg")).sort();
const sheets = [];
for (let i = 0; i < files.length; i += PER_SHEET) sheets.push(files.slice(i, i + PER_SHEET));

for (let s = 0; s < sheets.length; s++) {
  const group = sheets[s];
  const rows = Math.ceil(group.length / COLS);
  const width = COLS * TILE_W;
  const height = rows * TILE_H;
  const canvas = Buffer.alloc(width * height * 4, 20);

  for (let i = 0; i < group.length; i++) {
    const decoded = jpeg.decode(await readFile(path.join(IMG_DIR, group[i])), { useTArray: true });
    const pixels = resample(decoded, TILE_W, TILE_H);
    const cx = (i % COLS) * TILE_W;
    const cy = Math.floor(i / COLS) * TILE_H;
    for (let y = 0; y < TILE_H; y++) {
      const srcStart = y * TILE_W * 4;
      const dstStart = ((cy + y) * width + cx) * 4;
      pixels.copy(canvas, dstStart, srcStart, srcStart + TILE_W * 4);
    }
  }

  const name = `verify-promoted-${s + 1}.png`;
  await writeFile(path.join(OUT_DIR, name), encodePng(width, height, canvas));
  console.log(`${name}: ${group.join(" | ")}`);
}
