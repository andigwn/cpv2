import type { SectionBackgroundConfig } from "@/types";

/**
 * Per-section animated background configuration (prd.md section 6 & 13b).
 *
 * Every large section passes one of these objects to `<SectionBackground />`; no section
 * logic is duplicated in the components. Two shapes are supported:
 *
 * - `video`      → `<video muted autoPlay loop playsInline poster />` attached lazily.
 *                  Enable by dropping an mp4/webm into `public/videos/` (see README) and
 *                  switching the entry below, e.g.
 *                  `{ type: "video", src: "/videos/pool-loop.mp4", poster: "/images/..." }`.
 * - `image-loop` → a photo animated with an infinite pan or zoom loop, transform-only.
 *
 * The shipped configuration uses `image-loop` for every section so the demo runs with zero
 * external video weight and no first-paint penalty; the video path is fully implemented and
 * ready for production media.
 */
export const sectionBackgrounds: Record<string, SectionBackgroundConfig> = {
  highlights: {
    type: "image-loop",
    src: "/images/work-lagoon-pool.jpg",
    alt: "Kolam laguna dengan air biru jernih dan taman tropis",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/92 via-white/80 to-white/94",
  },
  homeAbout: {
    type: "image-loop",
    src: "/images/about-lobby.jpg",
    alt: "Lobi hotel terang dengan jendela besar dan tanaman hijau",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-r from-white/94 via-white/82 to-white/60",
  },
  homeServices: {
    type: "image-loop",
    src: "/images/service-waterpark.jpg",
    alt: "Waterpark dengan seluncuran berwarna cerah dan air biru",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/93 via-white/85 to-white/95",
  },
  homeNews: {
    type: "image-loop",
    src: "/images/news-summer-promo.jpg",
    alt: "Suasana pantai cerah dengan kursi santai menghadap laut",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/96",
  },
  homeCta: {
    type: "image-loop",
    src: "/images/cta-banner.jpg",
    alt: "Kolam resort dengan air biru dan payung putih di siang hari",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-t from-white/92 via-white/72 to-white/40",
  },
  aboutIntro: {
    type: "image-loop",
    src: "/images/about-resort-aerial.jpg",
    alt: "Pemandangan udara kawasan resort dengan kolam dan taman",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  aboutStory: {
    type: "image-loop",
    src: "/images/about-heritage.jpg",
    alt: "Kawasan resort dengan kolam dan pepohonan tropis",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-r from-white/95 via-white/84 to-white/60",
  },
  aboutTimeline: {
    type: "image-loop",
    src: "/images/work-masterplan.jpg",
    alt: "Masterplan kawasan resort dilihat dari udara",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  aboutValues: {
    type: "image-loop",
    src: "/images/service-spa.jpg",
    alt: "Ruang perawatan spa yang terang dan menenangkan",
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
    src: "/images/service-beach-club.jpg",
    alt: "Beach club dengan kursi santai bergaris di tepi pantai",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  worksGrid: {
    type: "image-loop",
    src: "/images/work-masterplan.jpg",
    alt: "Tampak udara kawasan resort dengan kolam",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/89 to-white/95",
  },
  newsGrid: {
    type: "image-loop",
    src: "/images/news-summer-promo.jpg",
    alt: "Pantai cerah dengan kursi santai",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  careersIntro: {
    type: "image-loop",
    src: "/images/about-hospitality-team.jpg",
    alt: "Tim hospitality bekerja bersama di area resort",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/88 to-white/95",
  },
  contactIntro: {
    type: "image-loop",
    src: "/images/hero-pool-daylight.jpg",
    alt: "Dek kolam dengan kursi santai di bawah sinar matahari",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-b from-white/94 via-white/86 to-white/94",
  },
  contactForm: {
    type: "image-loop",
    src: "/images/about-lobby.jpg",
    alt: "Lobi hotel dengan pencahayaan alami",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/90 to-white/96",
  },
  detailPage: {
    type: "image-loop",
    src: "/images/work-lagoon-pool.jpg",
    alt: "Kolam laguna dengan taman tropis di sekelilingnya",
    loopVariant: "zoom",
    overlayClassName: "bg-gradient-to-b from-white/95 via-white/90 to-white/96",
  },
  ctaBand: {
    type: "image-loop",
    src: "/images/work-sky-lounge.jpg",
    alt: "Area lounge dengan pemandangan laut di siang hari",
    loopVariant: "pan",
    overlayClassName: "bg-gradient-to-t from-white/94 via-white/78 to-white/45",
  },
};

export type SectionBackgroundKey = keyof typeof sectionBackgrounds;
