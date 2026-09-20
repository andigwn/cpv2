/**
 * Attribution for the photography shipped in `public/images`.
 *
 * The property photos (qubu-resort-*, hotel-q-*, qhall-*, mahoni-*, paradis-q-*,
 * patio-*, embun-*, qubu-suites-*, spa-gym-*, q-rooftop-*, villa-*) are client
 * assets supplied by Qubu Resort. The remaining files are Unsplash / Wikimedia
 * placeholders that are still used for units without client photography.
 *
 * The raw imports live in the repository's `Assets Qubu Resort` folder; the
 * optimized originals are kept in `_tools/`.
 */
export const imageCredits = {
  provider: "Qubu Resort (aset klien) & Unsplash / Wikimedia Commons (placeholder)",
  license: "Milik klien — placeholder di bawah Unsplash License / CC0 / CC BY-SA 4.0",
  note: "Foto properti adalah aset klien. Placeholder hanya dipakai untuk unit yang belum punya foto resmi.",
  replaceBeforeLaunch: true,
};

/** Human readable checklist surfaced in the README. */
export const assetChecklist = [
  "Foto yang masih kurang: Pemancingan, Food Corner, Beach Club, Kids Club, dan Airport Transfer.",
  "Foto tim hospitality dan portrait tamu untuk testimoni belum tersedia — UI memakai avatar monogram.",
  "Foto berita penghargaan dan sustainability masih memakai placeholder Unsplash.",
  "Citra luar properti (Nusa Dua, Labuan Bajo, Bogor) masih memakai placeholder.",
  "Tambahkan video loop ke public/videos dan ubah data/sectionBackgrounds.ts ke type: \"video\".",
];
