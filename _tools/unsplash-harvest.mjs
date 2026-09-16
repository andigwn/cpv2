/**
 * Development-only helper (NOT part of the app bundle).
 *
 * Harvests Unsplash photo ids for a set of bright hospitality keywords through the
 * r.jina.ai text proxy (unsplash.com blocks direct server-side requests), downloads the
 * best-sized variants into `_tools/unsplash/<keyword>/`, and reports brightness so the
 * strongest photo per slot can be promoted into `public/images/`.
 *
 * Usage: node _tools/unsplash-harvest.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_ROOT = path.join(ROOT, "_tools", "unsplash");
const HEADERS = { "user-agent": "aurora-cove-dev/1.0 (placeholder curation)" };
const PROXY = "https://r.jina.ai/";

/** keyword folder => [unsplash search phrase, per_page] */
const KEYWORDS = {
  "hero-pool": ["resort pool sunny", 12],
  "hero-waterpark": ["waterpark slide sunny", 12],
  "hotel-exterior": ["hotel exterior sunny resort", 12],
  "beach-resort": ["beach resort sunny", 12],
  "pool-deck": ["pool deck sun loungers", 12],
  "hotel-room": ["hotel room bright", 12],
  "lobby": ["hotel lobby bright interior", 12],
  "spa": ["spa massage room bright", 10],
  "restaurant": ["restaurant terrace sea view", 12],
  "ballroom": ["conference hall event stage", 10],
  "kids": ["kids playground colorful", 10],
  "fitness": ["hotel gym bright", 8],
  "beach-club": ["beach club daybed", 10],
  "aerial-resort": ["resort aerial pool", 10],
  "sustainability": ["solar panels tropical garden", 8],
  "team": ["professional portrait smiling studio", 12],
  "celebration": ["hotel celebration event guests", 10],
};

/** Brightness stats for a JPEG buffer. */
function analyze(buffer) {
  const { data, width, height } = jpeg.decode(buffer, { useTArray: true });
  const pixels = width * height;
  const step = Math.max(1, Math.floor(pixels / 12000));
  let sum = 0;
  let dark = 0;
  let light = 0;
  let counted = 0;
  for (let i = 0; i < pixels; i += step) {
    const o = i * 4;
    const l = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
    sum += l;
    if (l < 70) dark++;
    if (l > 165) light++;
    counted++;
  }
  return {
    width,
    height,
    brightness: Math.round(sum / counted),
    darkRatio: +(dark / counted).toFixed(3),
    lightRatio: +(light / counted).toFixed(3),
  };
}

async function harvestIds(phrase) {
  const url = `${PROXY}https://unsplash.com/s/photos/${encodeURIComponent(phrase.replace(/\s+/g, "-"))}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`proxy HTTP ${res.status}`);
  const text = await res.text();
  return [...new Set([...text.matchAll(/images\.unsplash\.com\/photo-([0-9a-zA-Z_-]{10,})/g)].map((m) => m[1]))];
}

const report = [];

for (const [folder, [phrase, limit]] of Object.entries(KEYWORDS)) {
  const dir = path.join(OUT_ROOT, folder);
  await mkdir(dir, { recursive: true });

  let ids = [];
  try {
    ids = (await harvestIds(phrase)).slice(0, limit);
  } catch (error) {
    console.log(`HARVEST FAIL ${folder}: ${error.message}`);
    continue;
  }

  const picked = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const label = `u${String(i + 1).padStart(2, "0")}`;
    const target = path.join(dir, `${label}.jpg`);
    try {
      let buffer;
      if (existsSync(target)) {
        buffer = await readFile(target);
      } else {
        const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&h=900&q=78`;
        const res = await fetch(url, { headers: HEADERS });
        if (!res.ok) throw new Error(`img HTTP ${res.status}`);
        buffer = Buffer.from(await res.arrayBuffer());
        await writeFile(target, buffer);
      }
      const stats = analyze(buffer);
      picked.push({ label, id, ...stats, kb: Math.round(buffer.length / 1024) });
      console.log(
        `${folder.padEnd(16)} ${label} L=${String(stats.brightness).padStart(3)} dark=${stats.darkRatio} light=${stats.lightRatio} ${String(Math.round(buffer.length / 1024)).padStart(4)}kb`,
      );
    } catch (error) {
      console.log(`${folder.padEnd(16)} ${label} FAIL ${error.message}`);
    }
  }
  report.push({ folder, phrase, ids, picked });
}

await writeFile(
  path.join(ROOT, "_tools", "unsplash-report.json"),
  JSON.stringify(report, null, 2),
);
console.log("\nWrote _tools/unsplash-report.json");
