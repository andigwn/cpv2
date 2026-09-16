/**
 * Development-only helper (NOT part of the app bundle).
 * Builds contact sheets from `_tools/unsplash/<folder>/` so harvested candidates can be
 * reviewed visually (subject + brightness) before being promoted to `public/images/`.
 *
 * Usage: node _tools/unsplash-review.mjs [folder ...]
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import zlib from "node:zlib";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_ROOT = path.join(ROOT, "_tools", "unsplash");
const OUT_DIR = path.join(ROOT, "_tools");

const TILE = 300;
const COLS = 4;

function tile(source, size) {
  const { data, width, height } = source;
  const aspect = width / height;
  const targetAspect = 4 / 3;
  let cropW = width;
  let cropH = height;
  if (aspect > targetAspect) cropW = Math.round(height * targetAspect);
  else cropH = Math.round(width / targetAspect);
  const offsetX = Math.floor((width - cropW) / 2);
  const offsetY = Math.floor((height - cropH) / 2);
  const outH = Math.round(size / targetAspect);

  const out = Buffer.alloc(size * outH * 4);
  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < size; x++) {
      const sx = offsetX + Math.floor((x * cropW) / size);
      const sy = offsetY + Math.floor((y * cropH) / outH);
      const s = (sy * width + sx) * 4;
      const d = (y * size + x) * 4;
      out[d] = data[s];
      out[d + 1] = data[s + 1];
      out[d + 2] = data[s + 2];
      out[d + 3] = 255;
    }
  }
  return { pixels: out, height: outH };
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

const requested = process.argv.slice(2);
const folders = requested.length
  ? requested
  : (await readdir(SRC_ROOT, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);

for (const folder of folders) {
  const dir = path.join(SRC_ROOT, folder);
  const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg")).sort();
  if (!files.length) continue;

  const tiles = [];
  for (const file of files) {
    const decoded = jpeg.decode(await readFile(path.join(dir, file)), { useTArray: true });
    tiles.push({ label: file.replace(".jpg", ""), ...tile(decoded, TILE) });
  }

  const tileH = tiles[0].height;
  const rows = Math.ceil(tiles.length / COLS);
  const width = COLS * TILE;
  const height = rows * tileH;
  const canvas = Buffer.alloc(width * height * 4, 24);

  tiles.forEach((item, index) => {
    const cx = (index % COLS) * TILE;
    const cy = Math.floor(index / COLS) * tileH;
    for (let y = 0; y < item.height; y++) {
      const srcStart = y * TILE * 4;
      const dstStart = ((cy + y) * width + cx) * 4;
      item.pixels.copy(canvas, dstStart, srcStart, srcStart + TILE * 4);
    }
  });

  const outName = `review-${folder}.png`;
  await writeFile(path.join(OUT_DIR, outName), encodePng(width, height, canvas));
  console.log(`${outName}  ${width}x${height}  order: ${tiles.map((t) => t.label).join(" | ")}`);
}
