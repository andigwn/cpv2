/**
 * Development-only helper (NOT part of the app bundle).
 *
 * Promotes reviewed candidates from `_tools/unsplash/<folder>/uNN.jpg` into
 * `public/images/<name>.jpg` (re-cropped to 16:9 at 1920px) and saves attribution data to
 * `src/data/credits.ts` — replace these placeholders with the client's real photography later.
 *
 * Usage: node _tools/promote-images.mjs
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const jpeg = require("jpeg-js");

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_ROOT = path.join(ROOT, "_tools", "unsplash");
const OUT_DIR = path.join(ROOT, "public", "images");

/** public filename => [folder, label] chosen after visual review */
const SELECTION = {
  // hero rotation (all verified bright / daytime)
  "hero-resort-pool.jpg": ["hero-pool", "u05"],
  "hero-waterpark-pool.jpg": ["hero-waterpark", "u01"],
  "hero-hotel-exterior.jpg": ["hotel-exterior", "u02"],
  "hero-beach-resort.jpg": ["beach-resort", "u05"],
  "hero-pool-daylight.jpg": ["pool-deck", "u05"],
  "hero-hotel-room.jpg": ["hotel-room", "u01"],

  // about
  "about-lobby.jpg": ["lobby", "u05"],
  "about-resort-aerial.jpg": ["aerial-resort", "u07"],
  "about-hospitality-team.jpg": ["celebration", "u05"],
  "about-heritage.jpg": ["hero-pool", "u12"],

  // facilities / services
  "service-waterpark.jpg": ["hero-waterpark", "u03"],
  "service-waterpark-alt.jpg": ["hero-waterpark", "u05"],
  "service-beach-club.jpg": ["beach-club", "u08"],
  "service-spa.jpg": ["spa", "u01"],
  "service-restaurant.jpg": ["restaurant", "u07"],
  "service-ballroom.jpg": ["ballroom", "u03"],
  "service-kids-club.jpg": ["kids", "u01"],
  "service-cabana.jpg": ["beach-club", "u04"],
  "service-sunset-deck.jpg": ["beach-club", "u05"],
  "service-fitness.jpg": ["../candidates/service-fitness", "c2"],
  "service-airport-shuttle.jpg": ["pool-deck", "u02"],

  // news / newswire
  "news-summer-promo.jpg": ["beach-club", "u03"],
  "news-waterpark-event.jpg": ["hero-waterpark", "u02"],
  "news-renovation.jpg": ["hotel-exterior", "u07"],
  "news-mice.jpg": ["ballroom", "u04"],
  "news-sustainability.jpg": ["aerial-resort", "u04"],
  "news-award.jpg": ["celebration", "u05"],

  // portfolio / works
  "work-pool-deck.jpg": ["pool-deck", "u02"],
  "work-suite.jpg": ["hotel-room", "u11"],
  "work-lobby.jpg": ["lobby", "u02"],
  "work-masterplan.jpg": ["aerial-resort", "u01"],
  "work-aquapark.jpg": ["hero-waterpark", "u07"],
  "work-beach-club.jpg": ["beach-club", "u07"],
  "work-spa.jpg": ["spa", "u02"],
  "work-restaurant.jpg": ["restaurant", "u05"],
  "work-sky-lounge.jpg": ["restaurant", "u10"],
  "work-lagoon-pool.jpg": ["hero-pool", "u06"],
  "work-cabana-club.jpg": ["beach-club", "u06"],
  "work-convention.jpg": ["ballroom", "u06"],

  // Team portraits are deliberately NOT taken from generic stock: the team section renders
  // branded initial avatars. Drop real headshots into public/images/ and point data/team.ts
  // at them when the client supplies them.

  "cta-banner.jpg": ["hero-pool", "u09"],
  "og-cover.jpg": ["hero-pool", "u05"],
};

const TARGET_W = 1600;
const TARGET_H = 900;

/** Center-crops to 16:9 and resamples with a box filter, then re-encodes as JPEG. */
function toWide(source) {
  const { data, width, height } = source;
  const targetAspect = TARGET_W / TARGET_H;
  let cropW = width;
  let cropH = Math.round(width / targetAspect);
  if (cropH > height) {
    cropH = height;
    cropW = Math.round(height * targetAspect);
  }
  const offsetX = Math.floor((width - cropW) / 2);
  const offsetY = Math.floor((height - cropH) / 2);

  const out = Buffer.alloc(TARGET_W * TARGET_H * 4);
  const scaleX = cropW / TARGET_W;
  const scaleY = cropH / TARGET_H;

  for (let y = 0; y < TARGET_H; y++) {
    const sy0 = offsetY + Math.floor(y * scaleY);
    const sy1 = Math.max(sy0 + 1, offsetY + Math.floor((y + 1) * scaleY));
    for (let x = 0; x < TARGET_W; x++) {
      const sx0 = offsetX + Math.floor(x * scaleX);
      const sx1 = Math.max(sx0 + 1, offsetX + Math.floor((x + 1) * scaleX));
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let sy = sy0; sy < sy1; sy++) {
        for (let sx = sx0; sx < sx1; sx++) {
          const s = (sy * width + sx) * 4;
          r += data[s];
          g += data[s + 1];
          b += data[s + 2];
          n++;
        }
      }
      const d = (y * TARGET_W + x) * 4;
      out[d] = Math.round(r / n);
      out[d + 1] = Math.round(g / n);
      out[d + 2] = Math.round(b / n);
      out[d + 3] = 255;
    }
  }
  return out;
}

/** Mean luminance + dark ratio, used to confirm the promoted photo stays bright. */
function analyze(pixels) {
  let sum = 0;
  let dark = 0;
  let count = 0;
  for (let i = 0; i < pixels.length; i += 4 * 7) {
    const l = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
    sum += l;
    if (l < 70) dark++;
    count++;
  }
  return { brightness: Math.round(sum / count), darkRatio: +(dark / count).toFixed(3) };
}

await mkdir(OUT_DIR, { recursive: true });

const credits = [];
const missing = [];
const flagged = [];

for (const [target, [folder, label]] of Object.entries(SELECTION)) {
  const source = path.join(SRC_ROOT, folder, `${label}.jpg`);
  if (!existsSync(source)) {
    missing.push(`${target} <- ${folder}/${label}`);
    continue;
  }
  const decoded = jpeg.decode(await readFile(source), { useTArray: true });
  const pixels = toWide(decoded);
  const stats = analyze(pixels);
  const encoded = jpeg.encode({ data: pixels, width: TARGET_W, height: TARGET_H }, 82).data;
  await writeFile(path.join(OUT_DIR, target), encoded);
  credits.push({ file: target, folder, label });
  if (stats.brightness < 118 || stats.darkRatio > 0.2) {
    flagged.push(`${target} (L=${stats.brightness}, dark=${stats.darkRatio})`);
  }
  console.log(
    `${target.padEnd(30)} <- ${folder}/${label}  L=${String(stats.brightness).padStart(3)} dark=${stats.darkRatio}  ${Math.round(encoded.length / 1024)}kb`,
  );
}

await writeFile(
  path.join(ROOT, "_tools", "promote-report.json"),
  JSON.stringify({ credits, missing, flagged }, null, 2),
);
console.log(`\nPromoted ${credits.length} images to public/images.`);
if (missing.length) console.log(`Missing sources:\n - ${missing.join("\n - ")}`);
if (flagged.length) console.log(`Not bright enough:\n - ${flagged.join("\n - ")}`);
