/**
 * Development-only helper (NOT part of the app bundle).
 *
 * Searches Wikimedia Commons for freely licensed, *bright* hospitality photography,
 * downloads candidates into `_tools/candidates/<slot>/`, and reports brightness so the
 * best photo per slot can be promoted into `public/images/`.
 *
 * Usage: node _tools/commons-candidates.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_ROOT = path.join(ROOT, "_tools", "candidates");
const API = "https://commons.wikimedia.org/w/api.php";
const HEADERS = { "user-agent": "aurora-cove-dev/1.0 (placeholder curation script)" };

/** slot => [search query, how many candidates] */
const SLOTS = {
  "hero-resort-pool": ["resort swimming pool palm sunny", 6],
  "hero-waterpark-pool": ["water park wave pool people", 6],
  "hero-hotel-exterior": ["hotel exterior tropical garden daylight", 6],
  "hero-beach-resort": ["beach resort pool sea sunny", 6],
  "hero-pool-daylight": ["swimming pool deck sun loungers", 6],
  "hero-hotel-room": ["hotel room bed interior daylight", 6],
  "about-lobby": ["hotel lobby interior daylight", 6],
  "about-resort-aerial": ["resort aerial view pool", 5],
  "about-hospitality-team": ["hotel staff reception service", 5],
  "about-heritage": ["bali temple garden daylight", 5],
  "service-waterpark": ["water slide aquapark", 6],
  "service-beach-club": ["beach club deck sea", 5],
  "service-spa": ["spa massage room", 5],
  "service-restaurant": ["hotel restaurant interior tables", 6],
  "service-ballroom": ["hotel ballroom conference hall", 6],
  "service-kids-club": ["children playground colorful", 5],
  "service-cabana": ["pool cabana sun loungers", 5],
  "service-sunset-deck": ["terrace sea view restaurant", 5],
  "service-fitness": ["hotel gym fitness room", 5],
  "service-airport-shuttle": ["airport shuttle van transfer", 5],
  "news-summer-promo": ["beach sunny umbrella summer", 5],
  "news-waterpark-event": ["water park slide fun", 5],
  "news-renovation": ["hotel renovation construction interior", 5],
  "news-mice": ["conference audience presentation hall", 5],
  "news-sustainability": ["solar panels garden green", 5],
  "news-award": ["trophy award ceremony hotel", 5],
  "work-pool-deck": ["infinity pool resort sea", 5],
  "work-suite": ["hotel suite living room", 5],
  "work-lobby": ["hotel lobby lounge interior", 5],
  "work-masterplan": ["resort masterplan aerial buildings", 5],
  "work-aquapark": ["aquapark tower slides", 5],
  "work-cabana-club": ["beach cabana palm", 5],
  "work-sky-lounge": ["rooftop bar city view", 5],
  "team-1": ["businessman portrait suit smiling", 4],
  "team-2": ["businesswoman portrait smiling office", 4],
  "team-3": ["hotel manager portrait man", 4],
  "team-4": ["woman portrait professional smiling", 4],
  "team-5": ["man portrait chef hotel", 4],
  "team-6": ["woman portrait hospitality staff", 4],
};

async function searchCommons(query, limit) {
  const url = `${API}?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
    `filetype:bitmap ${query}`,
  )}&gsrlimit=${limit * 2}&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1920`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const pages = Object.values(json.query?.pages ?? {});
  return pages
    .map((page) => ({ title: page.title, info: page.imageinfo?.[0] }))
    .filter((page) => page.info && page.info.mime === "image/jpeg" && page.info.width >= 1280)
    .slice(0, limit);
}

/** Mean luminance / dark ratio of a JPEG buffer. */
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
    brightness: Math.round(sum / counted),
    darkRatio: +(dark / counted).toFixed(3),
    lightRatio: +(light / counted).toFixed(3),
  };
}

const summary = [];

for (const [slot, [query, limit]] of Object.entries(SLOTS)) {
  const dir = path.join(OUT_ROOT, slot);
  await mkdir(dir, { recursive: true });
  let found = [];
  try {
    found = await searchCommons(query, limit);
  } catch (error) {
    console.log(`SEARCH FAIL ${slot}: ${error.message}`);
    continue;
  }

  const picked = [];
  for (let i = 0; i < found.length; i++) {
    const { title, info } = found[i];
    const label = `c${i + 1}`;
    const target = path.join(dir, `${label}.jpg`);
    try {
      let buffer;
      if (existsSync(target)) {
        buffer = await readFile(target);
      } else {
        const res = await fetch(info.thumburl ?? info.url, { headers: HEADERS });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        buffer = Buffer.from(await res.arrayBuffer());
        await writeFile(target, buffer);
      }
      const stats = analyze(buffer);
      picked.push({ label, title, ...stats, kb: Math.round(buffer.length / 1024) });
      console.log(
        `${slot.padEnd(24)} ${label} L=${String(stats.brightness).padStart(3)} dark=${stats.darkRatio} light=${stats.lightRatio}  ${title.replace("File:", "")}`,
      );
    } catch (error) {
      console.log(`${slot.padEnd(24)} ${label} FAIL ${error.message}`);
    }
  }
  summary.push({ slot, query, picked });
}

await writeFile(
  path.join(ROOT, "_tools", "commons-report.json"),
  JSON.stringify(summary, null, 2),
);
console.log("\nWrote _tools/commons-report.json");
