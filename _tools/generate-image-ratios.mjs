/**
 * Development-only helper (NOT part of the app bundle).
 *
 * Reads the intrinsic pixel size of every raster file in `public/images/` and writes
 * `src/data/imageRatios.ts`.
 *
 * Why this exists: on a phone the photo frames take the picture's own aspect ratio so the
 * photograph fills the frame edge to edge without cropping the subject. That needs the real
 * dimensions at runtime, and `next/image` cannot report them for a plain `/public` path
 * without either hardcoding them in the content data or measuring the file in the browser.
 * A generated map is both exact and free at runtime.
 *
 * Run it after adding, replacing or re-exporting any image:
 *   npm run images:ratios
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const OUT_FILE = path.join(ROOT, "src", "data", "imageRatios.ts");

const files = (await readdir(IMAGES_DIR))
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .sort((a, b) => a.localeCompare(b));

const entries = [];
const skipped = [];

for (const file of files) {
  const full = path.join(IMAGES_DIR, file);

  try {
    const meta = await sharp(full).metadata();
    if (!meta.width || !meta.height) {
      skipped.push(`${file} (no dimensions reported)`);
      continue;
    }
    entries.push({ file, width: meta.width, height: meta.height });
  } catch (error) {
    skipped.push(`${file} (${error.message})`);
  }
}

const body = entries
  .map(({ file, width, height }) => `  "/images/${file}": [${width}, ${height}],`)
  .join("\n");

const contents = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Intrinsic pixel size of every raster asset in \`public/images/\`, keyed by public path.
 * Regenerate with \`npm run images:ratios\` after adding, replacing or re-exporting an image.
 *
 * Read through \`photoFrame()\` in \`src/lib/photoFrame.ts\`; components should not import
 * this map directly.
 */
export const IMAGE_RATIOS = {
${body}
} as const satisfies Record<string, readonly [number, number]>;

export type ImageRatioKey = keyof typeof IMAGE_RATIOS;
`;

await writeFile(OUT_FILE, contents, "utf8");

const uniqueRatios = new Set(entries.map(({ width, height }) => `${width}/${height}`));
console.log(`Wrote ${path.relative(ROOT, OUT_FILE)}`);
console.log(`${entries.length} images, ${uniqueRatios.size} distinct aspect ratios`);
if (skipped.length) {
  console.log(`SKIPPED ${skipped.length}:`);
  for (const line of skipped) console.log(`  ${line}`);
}
