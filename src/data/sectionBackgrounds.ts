import type { ImageAsset, SectionBackgroundConfig } from "@/types";

/**
 * Hero background for unit/outlet/service detail pages: always the entity's own
 * photo (`unit.image` / `outlet.image` / `service.image`), never a shared stock band.
 */
export function entityBackground(
  image: ImageAsset,
  loopVariant: "pan" | "zoom" = "zoom",
): SectionBackgroundConfig {
  return {
    type: "image-loop",
    src: image.src,
    alt: image.alt,
    loopVariant,
  };
}

export const sectionBackgrounds: Record<string, SectionBackgroundConfig> = {
  highlights: {
    type: "image-loop",
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort dengan logo Q",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/92 via-white/80 to-white/94",
  },
  homeAbout: {
    type: "image-loop",
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-r from-white/94 via-white/82 to-white/60",
  },
  homeServices: {
    type: "image-loop",
    src: "/images/paradis-q-1.jpeg",
    alt: "Area makan beratap di kawasan Paradis Q",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/93 via-white/85 to-white/95",
  },
  homeNews: {
    type: "image-loop",
    src: "/images/qubu-resort-3.jpeg",
    alt: "Gerbang kawasan Qubu Resort dari arah jalan masuk",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/96",
  },
  homeCta: {
    type: "image-loop",
    src: "/images/qubu-resort-4.jpeg",
    alt: "Monumen gerbang Qubu Resort saat matahari terbit",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-t from-white/92 via-white/72 to-white/40",
  },
  aboutIntro: {
    type: "image-loop",
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  aboutStory: {
    type: "image-loop",
    src: "/images/hotel-q-1.jpeg",
    alt: "Fasad Hotel Q dengan lapisan kisi geometris",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-r from-white/95 via-white/84 to-white/60",
  },
  aboutTimeline: {
    type: "image-loop",
    src: "/images/qubu-resort-3.jpeg",
    alt: "Gerbang kawasan Qubu Resort",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  aboutValues: {
    type: "image-loop",
    src: "/images/spa-gym-2.jpeg",
    alt: "Ruang fitness dengan peralatan modern",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/95",
  },
  aboutTeam: {
    type: "image-loop",
    src: "/images/about-hospitality-team.jpg",
    alt: "Tim hospitality menyambut tamu di area publik",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  servicesIntro: {
    type: "image-loop",
    src: "/images/paradis-q-1.jpeg",
    alt: "Area beratap di kawasan Paradis Q",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  worksGrid: {
    type: "image-loop",
    src: "/images/qhall-3.jpeg",
    alt: "Interior QHall dengan plafon tinggi",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/89 to-white/95",
  },
  newsGrid: {
    type: "image-loop",
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  careersIntro: {
    type: "image-loop",
    src: "/images/qubu-resort-4.jpeg",
    alt: "Monumen gerbang Qubu Resort saat matahari terbit",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  contactIntro: {
    type: "image-loop",
    src: "/images/hotel-q-1.jpeg",
    alt: "Fasad Hotel Q di kawasan Qubu Resort",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  contactForm: {
    type: "image-loop",
    src: "/images/qubu-resort-1.jpeg",
    alt: "Gerbang masuk kawasan Qubu Resort",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/90 to-white/96",
  },
  detailPage: {
    type: "image-loop",
    src: "/images/qubu-resort-2.jpeg",
    alt: "Gerbang kawasan Qubu Resort dengan patung burung",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/90 to-white/96",
  },
  ctaBand: {
    type: "image-loop",
    src: "/images/villa-2.jpeg",
    alt: "Ruang keluarga villa dengan tangga kayu",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-t from-white/94 via-white/78 to-white/45",
  },
};

export type SectionBackgroundKey = keyof typeof sectionBackgrounds;
