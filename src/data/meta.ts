import type { Stat, Testimonial } from "@/types";

/** Home hero copy — used by the typewriter headline. */
export const heroContent = {
  eyebrow: "Qubu Resort · Sejak 2009",
  /** Each entry is typed sequentially by `useSequentialTypewriter`. */
  headlineLines: ["Liburan Tak Terlupakan", "di Qubu Resort"],
  /** Static text that opens the second headline line; the loop word is typed right after it. */
  headlineLine2Prefix: "di ",
  /** Only this word types-deletes-retypes in a loop; the rest of the headline is typed once. */
  headlineLoopWord: "Qubu Resort",
  subheadline:
    "Hotel resort tepi pantai, waterpark keluarga, dan convention centre dalam satu kawasan terpadu — dirancang untuk liburan yang cerah, hangat, dan sulit dilupakan.",
  primaryCta: { label: "Reservasi Sekarang", href: "/contact" },
  secondaryCta: { label: "Jelajahi Fasilitas", href: "/services" },
  scrollHint: "Gulir untuk menjelajah",
} as const;

/** Rotating hero background — bright, sunny hospitality photography only. */
export const heroBackgrounds = [
  {
    src: "/images/hero-resort-pool.jpg",
    alt: "Kolam renang resort dengan air biru jernih di bawah langit cerah",
  },
  {
    src: "/images/hero-waterpark-pool.jpg",
    alt: "Area waterpark dengan kolam biru dan seluncuran di siang hari",
  },
  {
    src: "/images/hero-hotel-exterior.jpg",
    alt: "Fasad hotel Qubu Resort dengan taman tropis dan pencahayaan alami",
  },
  {
    src: "/images/hero-beach-resort.jpg",
    alt: "Pantai berpasir putih di depan resort dengan air laut toska",
  },
  {
    src: "/images/hero-pool-daylight.jpg",
    alt: "Dek kolam dengan kursi santai dan payung di bawah sinar matahari",
  },
] as const;

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
    image: { src: "/images/team-4.jpg", alt: "Potret tamu Qubu Resort" },
  },
  {
    quote:
      "Kami menyelenggarakan konferensi regional untuk 900 peserta. Tim Qubu Resort menangani teknis, katering, dan akomodasi dengan sangat profesional.",
    name: "Bagas Prasetyo",
    role: "Head of Events · Nusantara Tech",
    image: { src: "/images/team-3.jpg", alt: "Potret penyelenggara acara" },
  },
  {
    quote:
      "Standar housekeeping dan keramahan stafnya konsisten di semua properti. Itu alasan kami mempercayakan managed operations ke Qubu Resort.",
    name: "Sarah Lim",
    role: "Asset Manager · Q Capital",
    image: { src: "/images/team-2.jpg", alt: "Potret mitra bisnis" },
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