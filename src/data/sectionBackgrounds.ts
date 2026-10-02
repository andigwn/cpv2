import type { ImageAsset, SectionBackgroundConfig } from "@/types";

/**
 * Hero background for unit/service detail pages: always the entity's own photo
 * (`unit.image` / `service.image`), never a shared stock band.
 */
export function entityBackground(image: ImageAsset): SectionBackgroundConfig {
  return {
    src: image.src,
    alt: image.alt,
  };
}

export const sectionBackgrounds: Record<string, SectionBackgroundConfig> = {
  aboutIntro: {
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort",
  },
  homeCta: {
    src: "/images/qubu-resort-4.jpeg",
    alt: "Monumen gerbang Qubu Resort saat matahari terbit",
  },
  aboutStory: {
    src: "/images/hotel-q-1.jpeg",
    alt: "Fasad Hotel Q dengan lapisan kisi geometris",
  },
  aboutTimeline: {
    src: "/images/qubu-resort-3.jpeg",
    alt: "Gerbang kawasan Qubu Resort",
  },
  aboutTeam: {
    src: "/images/about-hospitality-team.jpg",
    alt: "Tim hospitality menyambut tamu di area publik",
  },
  servicesIntro: {
    src: "/images/paradis-q-1.jpeg",
    alt: "Area beratap di kawasan Paradis Q",
  },
  newsGrid: {
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
  },
  unitsBand: {
    src: "/images/qhall-3.jpeg",
    alt: "Interior QHall dengan plafon tinggi",
  },
  careersIntro: {
    src: "/images/qubu-resort-4.jpeg",
    alt: "Monumen gerbang Qubu Resort saat matahari terbit",
  },
  contactIntro: {
    src: "/images/hotel-q-1.jpeg",
    alt: "Fasad Hotel Q di kawasan Qubu Resort",
  },
  contactForm: {
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort",
  },
  detailPage: {
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
  },
  ctaBand: {
    src: "/images/villa-2.jpeg",
    alt: "Ruang keluarga villa dengan tangga kayu",
  },
  dining: {
    src: "/images/patio-1.jpeg",
    alt: "Interior restoran dengan meja kayu dan rak botol",
  },
};
