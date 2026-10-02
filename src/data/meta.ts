import type { Stat } from "@/types";
import { businessUnits } from "./units";

/**
 * Rotating hero background — one general resort shot plus one photo from every
 * business unit, so the opening frame represents the whole destination.
 * Hero copy itself lives in the translation dictionary (`src/i18n/translations.ts`).
 */
export const heroBackgrounds = [
  {
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort dengan logo Q dan bendera",
  },
  ...businessUnits.map((unit) => ({
    src: unit.image.src,
    alt: unit.image.alt,
  })),
];

export const companyStats: Stat[] = [
  { value: "16", label: "Tahun pengalaman hospitality" },
  { value: "5", label: "Destinasi di Indonesia" },
  { value: "1.240", label: "Kamar & suite terkelola" },
  { value: "18", label: "Penghargaan industri" },
];