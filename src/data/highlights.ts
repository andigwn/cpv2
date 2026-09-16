import type { HighlightSlide } from "@/types";

/**
 * Home highlights carousel — one slide per core business line.
 * Every image is a bright, daytime hospitality photograph (prd.md section 7).
 */
export const highlightSlides: HighlightSlide[] = [
  {
    id: "waterpark",
    chip: "Waterpark",
    eyebrow: "Paradis Q",
    title: "7 Zona Permainan Air untuk Semua Usia",
    description:
      "Dari kolam balita bersuhu hangat sampai seluncuran racer 22 meter, waterpark kami menjadi pusat liburan keluarga di Bali selatan.",
    image: {
      src: "/images/hero-waterpark-pool.jpg",
      alt: "Kolam waterpark biru dengan seluncuran dan pengunjung di siang hari",
    },
    href: "/services/paradis-q",
    ctaLabel: "Lihat Waterpark",
  },
  {
    id: "suite",
    chip: "Kamar & Suite",
    eyebrow: "Qubu Suites",
    title: "412 Kamar dengan Balkon Menghadap Laut",
    description:
      "Interior bernuansa tropis modern, linen katun organik, dan balkon privat untuk menikmati matahari terbit di atas Teluk Benoa.",
    image: {
      src: "/images/hero-hotel-room.jpg",
      alt: "Kamar hotel terang dengan tempat tidur besar dan jendela besar",
    },
    href: "/services/qubu-suites",
    ctaLabel: "Lihat Kamar",
  },
  {
    id: "beach-club",
    chip: "Beach Club",
    eyebrow: "Beach Club",
    title: "Sunset Deck & Cabanas Tepi Pantai",
    description:
      "Daybed privat, koktail tropis, dan live acoustic setiap senja — langsung di atas pasir putih Tanjung Benoa.",
    image: {
      src: "/images/service-cabana.jpg",
      alt: "Cabana dan daybed tepi kolam dengan payung putih di siang hari",
    },
    href: "/services/beach-club",
    ctaLabel: "Lihat Beach Club",
  },
  {
    id: "wellness",
    chip: "Spa",
    eyebrow: "Q Spa & Wellness",
    title: "Ritual Wellness dengan Bahan Botani Lokal",
    description:
      "Delapan ruang perawatan, sauna inframerah, dan kolam hidroterapi dengan pemandangan taman tropis.",
    image: {
      src: "/images/service-spa.jpg",
      alt: "Ruang perawatan spa terang dengan handuk putih dan tanaman hijau",
    },
    href: "/services/q-spa-wellness",
    ctaLabel: "Lihat Spa",
  },
  {
    id: "mice",
    chip: "MICE",
    eyebrow: "QHall",
    title: "Ballroom 1.800 m² untuk 1.500 Delegasi",
    description:
      "Didukung pre-function lounge, delapan ruang breakout, dan tim event teknis yang siaga penuh selama acara berlangsung.",
    image: {
      src: "/images/service-ballroom.jpg",
      alt: "Ballroom luas dengan penataan meja dan pencahayaan terang",
    },
    href: "/services/qhall",
    ctaLabel: "Lihat Convention Centre",
  },
];

export const highlightSection = {
  eyebrow: "Highlight",
  title: "Satu kawasan, lima pengalaman",
  description:
    "Kami menggabungkan hotel resort, waterpark, beach club, spa, dan convention centre agar tamu tidak perlu berpindah lokasi untuk mendapatkan pengalaman lengkap.",
} as const;
