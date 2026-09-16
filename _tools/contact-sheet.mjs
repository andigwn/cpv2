/**
 * Development-only helper (NOT part of the app bundle).
 * Builds contact sheets from `public/images` so the placeholder photography can be
 * reviewed by eye (brightness + subject relevance) without opening 45 files.
 *
 * Usage: node _tools/contact-sheet.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import zlib from "node:zlib";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "images");

const SHEETS = {
  "sheet-hero-about.png": [
    "hero-resort-pool.jpg",
    "hero-hotel-exterior.jpg",
    "hero-resort-sunny.jpg",
    "hero-pool-daylight.jpg",
    "hero-beach-resort.jpg",
    "hero-waterpark-pool.jpg",
    "hero-hotel-room.jpg",
    "about-lobby.jpg",
    "about-resort-aerial.jpg",
    "about-hospitality-team.jpg",
    "about-heritage.jpg",
    "service-waterpark.jpg",
  ],
  "sheet-services.png": [
    "service-beach-club.jpg",
    "service-spa.jpg",
    "service-restaurant.jpg",
    "service-ballroom.jpg",
    "service-kids-club.jpg",
    "service-cabana.jpg",
    "service-sunset-deck.jpg",
    "service-fitness.jpg",
    "service-airport-shuttle.jpg",
    "work-aquapark.jpg",
    "work-pool-deck.jpg",
    "work-convention.jpg",
  ],
  "sheet-news-works.png": [
    "news-summer-promo.jpg",
    "news-waterpark-event.jpg",
    "news-renovation.jpg",
    "news-mice.jpg",
    "news-sustainability.jpg",
    "news-award.jpg",
    "work-suite.jpg",
    "work-lobby.jpg",
    "work-masterplan.jpg",
    "work-beach-club.jpg",
    "work-restaurant.jpg",
    "work-sky-lounge.jpg",
  ],
  "sheet-team.png": [
    "team-1.jpg",
    "team-2.jpg",
    "team-3.jpg",
    "team-4.jpg",
    "team-5.jpg",
    "team-6.jpg",
  ],
};

const TILE = 320;
const COLS = 4;

/** Center-crop + nearest-neighbour downscale to a square RGBA tile. */
function tile(source, size) {
  const { data, width, height } = source;
  const side = Math.min(width, height);
  const offsetX = Math.floor((width - side) / 2);
  const offsetY = Math.floor((height - side) / 2);
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const sx = offsetX + Math.floor((x * side) / size);
      const sy = offsetY + Math.floor((y * side) / size);
      const s = (sy * width + sx) * 4;
      const d = (y * size + x) * 4;
      out[d] = data[s];
      out[d + 1] = data[s + 1];
      out[d + 2] = data[s + 2];
      out[d + 3] = 255;
    }
  }
  return out;
}

/** Minimal PNG encoder (truecolor, filter 0). */
function encodePng(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const chunks = [];
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const chunk = (type, payload) => {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(payload.length, 0);
    const body = Buffer.concat([Buffer.from(type, "ascii"), payload]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(body) >>> 0, 0);
    return Buffer.concat([length, body, crc]);
  };
  chunks.push(signature, chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0)));
  return Buffer.concat(chunks);
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

for (const [sheetName, files] of Object.entries(SHEETS)) {
  const rows = Math.ceil(files.length / COLS);
  const width = COLS * TILE;
  const height = rows * TILE;
  const canvas = Buffer.alloc(width * height * 4, 30);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const buffer = await readFile(path.join(IMG_DIR, file));
    const decoded = jpeg.decode(buffer, { useTArray: true });
    const pixels = tile(decoded, TILE);
    const cx = (i % COLS) * TILE;
    const cy = Math.floor(i / COLS) * TILE;
    for (let y = 0; y < TILE; y++) {
      const srcStart = y * TILE * 4;
      const dstStart = ((cy + y) * width + cx) * 4;
      pixels.copy(canvas, dstStart, srcStart, srcStart + TILE * 4);
    }
  }

  const png = encodePng(width, height, canvas);
  await writeFile(path.join(ROOT, "_tools", sheetName), png);
  console.log(`${sheetName}  ${width}x${height}  order: ${files.join(" | ")}`);
}
