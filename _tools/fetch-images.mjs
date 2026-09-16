/**
 * Development-only helper (NOT part of the app bundle).
 *
 * Downloads openly licensed placeholder photography from the Unsplash CDN into
 * `public/images/` and verifies that every photo is bright/sunny so it matches the
 * light hospitality theme required by prd.md section 7. Writes `_tools/image-report.json`.
 *
 * Usage: node _tools/fetch-images.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");

/** local filename => Unsplash photo id. One entry per unique asset. */
const PHOTOS = {
  // --- hero rotating background (bright pool / resort / waterpark) ---
  "hero-resort-pool.jpg": "photo-1571896349842-33c89424de2d",
  "hero-hotel-exterior.jpg": "photo-1566073771259-6a8506099945",
  "hero-resort-sunny.jpg": "photo-1571003123894-1f0594d2b5d9",
  "hero-pool-daylight.jpg": "photo-1596394516093-501ba68a0ba6",
  "hero-beach-resort.jpg": "photo-1540541338287-41700207dee6",
  "hero-waterpark-pool.jpg": "photo-1520250497591-112f2f40a3f4",
  "hero-hotel-room.jpg": "photo-1582719508461-905c673771fd",

  // --- about ---
  "about-lobby.jpg": "photo-1445019980597-93fa8acb246c",
  "about-resort-aerial.jpg": "photo-1551882547-ff40c63fe5fa",
  "about-hospitality-team.jpg": "photo-1470004914212-05527e49370b",
  "about-heritage.jpg": "photo-1560448204-e02f11c3d0e2",

  // --- facilities / services ---
  "service-waterpark.jpg": "photo-1544551763-46a013bb70d5",
  "service-beach-club.jpg": "photo-1519046904884-53103b34b206",
  "service-spa.jpg": "photo-1602002418082-a4443e081dd1",
  "service-restaurant.jpg": "photo-1610641818989-c2051b5e2cfd",
  "service-ballroom.jpg": "photo-1564501049412-61c2a3083791",
  "service-kids-club.jpg": "photo-1590523277543-a94d2e4eb00b",
  "service-cabana.jpg": "photo-1584132967334-10e028bd69f7",
  "service-sunset-deck.jpg": "photo-1559599238-308793637427",
  "service-fitness.jpg": "photo-1534438327276-14e5300c3a48",
  "service-airport-shuttle.jpg": "photo-1544620347-c4fd4a3d5957",

  // --- news / newswire ---
  "news-summer-promo.jpg": "photo-1507525428034-b723cf961d3e",
  "news-waterpark-event.jpg": "photo-1520250497591-112f2f40a3f4",
  "news-renovation.jpg": "photo-1560448204-e02f11c3d0e2",
  "news-mice.jpg": "photo-1540575467063-178a50c2df87",
  "news-sustainability.jpg": "photo-1441974231531-c6227db76b6e",
  "news-award.jpg": "photo-1596394516093-501ba68a0ba6",

  // --- portfolio / works ---
  "work-pool-deck.jpg": "photo-1540541338287-41700207dee6",
  "work-suite.jpg": "photo-1582719508461-905c673771fd",
  "work-lobby.jpg": "photo-1445019980597-93fa8acb246c",
  "work-masterplan.jpg": "photo-1551882547-ff40c63fe5fa",
  "work-aquapark.jpg": "photo-1544551763-46a013bb70d5",
  "work-beach-club.jpg": "photo-1519046904884-53103b34b206",
  "work-spa.jpg": "photo-1602002418082-a4443e081dd1",
  "work-restaurant.jpg": "photo-1610641818989-c2051b5e2cfd",
  "work-convention.jpg": "photo-1564501049412-61c2a3083791",
  "work-lagoon-pool.jpg": "photo-1571896349842-33c89424de2d",
  "work-cabana-club.jpg": "photo-1584132967334-10e028bd69f7",
  "work-sky-lounge.jpg": "photo-1559599238-308793637427",

  // --- team ---
  "team-1.jpg": "photo-1560250097-0b93528c311a",
  "team-2.jpg": "photo-1573496359142-b8d87734a5a2",
  "team-3.jpg": "photo-1519085360753-af0119f7cbe7",
  "team-4.jpg": "photo-1494790108377-be9c29b29330",
  "team-5.jpg": "photo-1500648767791-00dcc994a43e",
  "team-6.jpg": "photo-1580489944761-15a19d654956",
};

const WIDTH = 1920;
const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
};

async function download(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Mean luminance / dark pixel ratio of a JPEG buffer. */
function analyze(buffer) {
  const { data, width, height } = jpeg.decode(buffer, { useTArray: true });
  const pixels = width * height;
  const step = Math.max(1, Math.floor(pixels / 20000));
  let sum = 0;
  let dark = 0;
  let light = 0;
  let counted = 0;
  for (let i = 0; i < pixels; i += step) {
    const o = i * 4;
    const l = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
    sum += l;
    if (l < 70) dark++;
    if (l > 160) light++;
    counted++;
  }
  return {
    brightness: Math.round(sum / counted),
    darkRatio: +(dark / counted).toFixed(3),
    lightRatio: +(light / counted).toFixed(3),
    size: `${width}x${height}`,
  };
}

await mkdir(OUT_DIR, { recursive: true });

const results = [];
const failed = [];

for (const [filename, id] of Object.entries(PHOTOS)) {
  const target = path.join(OUT_DIR, filename);
  try {
    let buffer;
    if (existsSync(target)) {
      buffer = await readFile(target);
    } else {
      buffer = await download(
        `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${WIDTH}&q=80`,
      );
      await writeFile(target, buffer);
    }
    const stats = analyze(buffer);
    const bright = stats.brightness >= 118 && stats.darkRatio <= 0.2;
    results.push({ filename, id, kb: Math.round(buffer.length / 1024), ...stats, bright });
    console.log(
      `${bright ? "BRIGHT" : "REVIEW"} ${filename.padEnd(28)} ${String(Math.round(buffer.length / 1024)).padStart(5)}kb  L=${stats.brightness} dark=${stats.darkRatio} light=${stats.lightRatio} ${stats.size}`,
    );
  } catch (error) {
    failed.push({ filename, id, error: error.message });
    console.log(`FAIL   ${filename.padEnd(28)} ${error.message}`);
  }
}

const totalKb = results.reduce((acc, r) => acc + r.kb, 0);
console.log(`\n${results.length} images, ${(totalKb / 1024).toFixed(1)} MB total.`);
const dim = results.filter((r) => !r.bright).map((r) => r.filename);
if (dim.length) console.log(`Flagged as not bright enough -> ${dim.join(", ")}`);
if (failed.length) console.log(`Failed: ${failed.map((f) => `${f.id} (${f.error})`).join(", ")}`);

await writeFile(
  path.join(ROOT, "_tools", "image-report.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), results, failed }, null, 2),
);
