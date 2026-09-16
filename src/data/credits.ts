/**
 * Attribution for the placeholder photography shipped in `public/images`.
 *
 * All photos were sourced from the Unsplash library (free to use under the Unsplash
 * License) and Wikimedia Commons (CC0 / CC BY-SA where noted), then center-cropped to
 * 16:9 at 1600×900. They are PLACEHOLDERS: replace them with the client's real hotel and
 * waterpark photography before launch, then update this file.
 *
 * The raw downloads and the candidate review sheets live in `_tools/`.
 */
export const imageCredits = {
  provider: "Unsplash (unsplash.com) & Wikimedia Commons",
  license: "Unsplash License / CC0 / CC BY-SA 4.0",
  note: "Placeholder assets — not for redistribution as-is in a commercial launch without verification.",
  replaceBeforeLaunch: true,
};

/** Human readable checklist surfaced in the README. */
export const assetChecklist = [
  "Ganti seluruh foto di public/images dengan fotografi properti klien.",
  "Jalankan `node _tools/fetch-images.mjs` hanya bila ingin memakai placeholder lagi.",
  "Tambahkan video loop ke public/videos dan ubah data/sectionBackgrounds.ts ke type: \"video\".",
];
