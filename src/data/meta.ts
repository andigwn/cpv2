import type { Stat, Testimonial } from "@/types";
import { businessUnits } from "./units";

/** Home hero copy — used by the typewriter headline. */
export const heroContent = {
  eyebrow: "Qubu Resort · Sejak 2009",
  /** Each entry is typed sequentially by `useSequentialTypewriter`. */
  headlineLines: ["Liburan Tak Terlupakan", "di Qubu Resort"],
  /** Static text that opens the second headline line; the business-unit names cycle after it. */
  headlineLine2Prefix: "di ",
  /**
   * The business units of Qubu Resort, in display order. The hero types each name,
   * holds it, deletes it and moves to the next one — forever — via `useTypewriterWords`.
   */
  headlineLoopWords: [
    "Hotel Qubu Suites",
    "Embun Signature Restaurant",
    "Spa & Wellness Center",
    "Entertainment Room",
    "Kids Club",
    "Qubiq Bar",
    "Hotel Q",
    "Patio Bistro",
    "The Q Hall Convention Center",
    "Paradis-Q Waterpark",
    "Food Corner",
    "Villa Town House",
  ],
  subheadline:
    "Hotel resort tepi pantai, waterpark keluarga, dan convention centre dalam satu kawasan terpadu — dirancang untuk liburan yang cerah, hangat, dan sulit dilupakan.",
  primaryCta: { label: "Reservasi Sekarang", href: "/contact" },
  secondaryCta: { label: "Jelajahi Fasilitas", href: "/services" },
  scrollHint: "Gulir untuk menjelajah",
} as const;

/**
 * Rotating hero background — one general resort shot plus one photo from every
 * business unit, so the opening frame represents the whole destination.
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

export const testimonials: Testimonial[] = [
  {
    quote:
      "Qubu Resort memahami arti liburan keluarga. Anak-anak menghabiskan seharian di waterpark, kami menikmati spa dan sunset deck. Semua berjalan tanpa hambatan.",
    name: "Rani Kusuma",
    role: "Tamu keluarga · Jakarta",
  },
  {
    quote:
      "Kami menyelenggarakan konferensi regional untuk 900 peserta. Tim Qubu Resort menangani teknis, katering, dan akomodasi dengan sangat profesional.",
    name: "Bagas Prasetyo",
    role: "Head of Events · Nusantara Tech",
  },
  {
    quote:
      "Standar housekeeping dan keramahan stafnya konsisten di semua properti. Itu alasan kami mempercayakan managed operations ke Qubu Resort.",
    name: "Sarah Lim",
    role: "Asset Manager · Q Capital",
  },
];

/** Marquee items used under the hero. */
export const heroMarquee = [
  "Beachfront Resort",
  "Waterpark Keluarga",
  "Spa & Wellness",
  "Convention Centre",
  "Fine Dining",
  "Kids Club",
  "Sunset Deck",
  "MICE Specialist",
] as const;

/** Simple, dependency-free syntax highlight seen on the About page. */
export const brandPromises = [
  {
    title: "Cerah & Ramah",
    description:
      "Setiap properti dirancang dengan cahaya alami, ruang terbuka, dan palet warna hangat agar tamu langsung merasa rileks.",
    icon: "sun",
  },
  {
    title: "Aman untuk Keluarga",
    description:
      "Waterpark kami memakai sistem filtrasi dan pengawasan lifeguard tersertifikasi dengan standar keselamatan internasional.",
    icon: "shield",
  },
  {
    title: "Ramah Lingkungan",
    description:
      "Air kolam didaur ulang, energi surya memasok 32% kebutuhan listrik, dan kami menghapus plastik sekali pakai sejak 2019.",
    icon: "leaf",
  },
] as const;