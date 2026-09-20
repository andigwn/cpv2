import type { Work } from "@/types";

/** Portfolio / project showcase (prd.md sitemap: /works). */
export const works: Work[] = [
  {
    slug: "q-resort-waterpark",
    title: "Qubu Resort & Waterpark",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2021,
    category: "mixed-use",
    summary:
      "Kawasan terpadu 11,4 hektar berisi hotel 412 kamar, waterpark tujuh zona, beach club, spa, dan convention centre.",
    image: {
      src: "/images/qubu-resort-1.jpeg",
      alt: "Gerbang masuk kawasan Qubu Resort dengan logo Q",
    },
    metrics: [
      { label: "Luas kawasan", value: "11,4 ha" },
      { label: "Jumlah kamar", value: "412" },
      { label: "Kapasitas waterpark", value: "4.500 / hari" },
    ],
    scope: [
      "Masterplan kawasan & studi kelayakan",
      "Desain arsitektur dan lanskap tropis",
      "Manajemen konstruksi tahap 1–3",
      "Pre-opening & operasional hotel",
    ],
  },
  {
    slug: "qubu-suites-sayap-timur",
    title: "Qubu Suites Sayap Timur",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2026,
    category: "hotel",
    summary:
      "Renovasi 158 kamar dengan jendela panorama, sistem pendingin inverter, dan material interior ramah lingkungan.",
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Suite dengan tempat tidur king dan panel kayu",
    },
    metrics: [
      { label: "Kamar direnovasi", value: "158" },
      { label: "Durasi proyek", value: "7 bulan" },
      { label: "Efisiensi listrik", value: "-18%" },
    ],
    scope: [
      "Audit energi dan pemetaan beban",
      "Desain interior dan pemilihan material",
      "Renovasi bertahap tanpa menutup operasional",
      "Sertifikasi material ramah lingkungan",
    ],
  },
  {
    slug: "paradis-q-fase-dua",
    title: "Paradis Q Fase Dua",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2023,
    category: "waterpark",
    summary:
      "Penambahan menara racer slide 22 meter, kolam ombak 1.100 m², dan lazy river sepanjang 260 meter.",
    image: {
      src: "/images/paradis-q-1.jpeg",
      alt: "Area beratap di kawasan Paradis Q",
    },
    metrics: [
      { label: "Seluncuran baru", value: "9 unit" },
      { label: "Kolam ombak", value: "1.100 m²" },
      { label: "Waktu pengerjaan", value: "14 bulan" },
    ],
    scope: [
      "Desain teknis hidrolik & sirkulasi air",
      "Pengadaan wahana dari dua vendor Eropa",
      "Sertifikasi keselamatan dan pelatihan lifeguard",
      "Integrasi tiket digital dengan sistem hotel",
    ],
  },
  {
    slug: "beach-club",
    title: "Beach Club",
    client: "Qubu Resort",
    location: "Pantai Tanjung Benoa, Bali",
    year: 2022,
    category: "resort",
    summary:
      "Beach club dengan 24 daybed, 12 cabana, kolam infinity, dan sunset deck berkapasitas 420 pengunjung.",
    image: {
      src: "/images/work-beach-club.jpg",
      alt: "Beach club dengan kolam dan kursi santai menghadap laut",
    },
    metrics: [
      { label: "Daybed & cabana", value: "36 unit" },
      { label: "Kapasitas", value: "420 orang" },
      { label: "Waktu pengerjaan", value: "9 bulan" },
    ],
    scope: [
      "Desain lanskap tepi pantai",
      "Struktur ringan tahan angin laut",
      "Konsep F&B dan pelatihan pramusaji",
      "Program live music harian",
    ],
  },
  {
    slug: "qhall",
    title: "QHall",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2024,
    category: "mixed-use",
    summary:
      "Pusat konvensi dengan ballroom bebas pilar 1.800 m², delapan ruang breakout, dan pre-function lounge 620 m².",
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "Fasad QHall dengan kanopi kawat dekoratif",
    },
    metrics: [
      { label: "Ballroom", value: "1.800 m²" },
      { label: "Kapasitas theatre", value: "1.500 pax" },
      { label: "Breakout room", value: "8 ruang" },
    ],
    scope: [
      "Perencanaan akustik dan tata cahaya",
      "Struktur bentang lebar tanpa pilar",
      "Sistem rigging dan LED terintegrasi",
      "Dapur katering kapasitas 2.000 pax",
    ],
  },
  {
    slug: "q-spa-wellness-retreat",
    title: "Q Spa & Wellness Retreat",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2022,
    category: "resort",
    summary:
      "Delapan ruang perawatan, sauna inframerah, kolam hidroterapi, dan studio yoga dengan pemandangan taman.",
    image: {
      src: "/images/spa-gym-1.jpeg",
      alt: "Ruang perawatan spa dengan dua tempat tidur dan tanaman",
    },
    metrics: [
      { label: "Ruang perawatan", value: "8 ruang" },
      { label: "Kapasitas harian", value: "96 perawatan" },
      { label: "Waktu pengerjaan", value: "11 bulan" },
    ],
    scope: [
      "Konsep wellness dan kurasi menu perawatan",
      "Desain ruang dengan sirkulasi udara alami",
      "Instalasi hidroterapi dan sauna",
      "Pelatihan terapis dan fisioterapis",
    ],
  },
  {
    slug: "beachfront-dining-precinct",
    title: "Beachfront Dining Precinct",
    client: "Qubu Resort",
    location: "Pantai Tanjung Benoa, Bali",
    year: 2025,
    category: "resort",
    summary:
      "Empat outlet kuliner terintegrasi: all-day dining, seafood grill, plant-forward restaurant, dan pastry lounge.",
    image: {
      src: "/images/q-rooftop-2.jpeg",
      alt: "Rooftop dengan penataan meja jamuan dan dekorasi acara",
    },
    metrics: [
      { label: "Outlet", value: "4 restoran" },
      { label: "Total kursi", value: "1.150" },
      { label: "Live station", value: "12" },
    ],
    scope: [
      "Konsep kuliner dan pengembangan menu",
      "Desain dapur komersial dan alur servis",
      "Program pelatihan barista & chef",
      "Sertifikasi halal untuk dapur utama",
    ],
  },
  {
    slug: "sky-lounge-rooftop",
    title: "Sky Lounge & Rooftop Deck",
    client: "Qubu Resort",
    location: "Tanjung Benoa, Bali",
    year: 2025,
    category: "resort",
    summary:
      "Rooftop lounge dengan pemandangan Teluk Benoa, bar koktail, dan area lounge terbuka berkapasitas 180 orang.",
    image: {
      src: "/images/q-rooftop-1.jpeg",
      alt: "Rooftop Qubu Resort dengan dekorasi bunga dan meja bundar",
    },
    metrics: [
      { label: "Kapasitas", value: "180 orang" },
      { label: "Luas deck", value: "740 m²" },
      { label: "Waktu pengerjaan", value: "8 bulan" },
    ],
    scope: [
      "Desain struktural rooftop",
      "Perizinan dan studi beban angin",
      "Kurasi menu koktail tropis",
      "Integrasi jadwal sunset music",
    ],
  },
  {
    slug: "nusa-dua-boutique-hotel",
    title: "Nusa Dua Boutique Hotel",
    client: "Q Capital Partners",
    location: "Nusa Dua, Bali",
    year: 2024,
    category: "hotel",
    summary:
      "Hotel butik 96 kamar dengan kolam rooftop, restoran garden, dan konsep desain tropis minimalis.",
    image: {
      src: "/images/work-lobby.jpg",
      alt: "Lobi hotel terang dengan jendela besar dan tanaman",
    },
    metrics: [
      { label: "Kamar", value: "96" },
      { label: "Luas bangunan", value: "9.200 m²" },
      { label: "Waktu pengerjaan", value: "18 bulan" },
    ],
    scope: [
      "Manajemen proyek end-to-end",
      "Desain interior dan identitas properti",
      "Rekrutmen dan pelatihan tim pre-opening",
      "Sertifikasi standar layanan bintang empat",
    ],
  },
  {
    slug: "labuan-bajo-waterfront-masterplan",
    title: "Labuan Bajo Waterfront Masterplan",
    client: "Pemerintah Kabupaten Manggarai Barat",
    location: "Labuan Bajo, NTT",
    year: 2023,
    category: "mixed-use",
    summary:
      "Masterplan kawasan waterfront 6,8 hektar dengan hotel, marina kecil, dan ruang publik tepi laut.",
    image: {
      src: "/images/work-masterplan.jpg",
      alt: "Tampak udara kawasan resort dengan kolam dan jalur taman",
    },
    metrics: [
      { label: "Luas kawasan", value: "6,8 ha" },
      { label: "Berth marina", value: "24 kapal" },
      { label: "Ruang publik", value: "2,1 ha" },
    ],
    scope: [
      "Masterplan dan analisis daya dukung lingkungan",
      "Studi kelayakan ekonomi kawasan",
      "Panduan desain untuk investor",
      "Kajian mitigasi abrasi pantai",
    ],
  },
  {
    slug: "belitung-family-resort",
    title: "Belitung Family Resort",
    client: "Qubu Resort",
    location: "Belitung, Bangka Belitung",
    year: 2022,
    category: "resort",
    summary:
      "Resort keluarga 168 kamar dengan mini waterpark, kids club, dan akses langsung ke pantai granit.",
    image: {
      src: "/images/qubu-resort-4.jpeg",
      alt: "Monumen gerbang Qubu Resort saat matahari terbit",
    },
    metrics: [
      { label: "Kamar", value: "168" },
      { label: "Mini waterpark", value: "1,2 ha" },
      { label: "Waktu pengerjaan", value: "22 bulan" },
    ],
    scope: [
      "Studi lokasi dan analisis pasar keluarga",
      "Desain kawasan dan mini waterpark",
      "Kemitraan operator lokal",
      "Program pemberdayaan nelayan sekitar",
    ],
  },
  {
    slug: "bogor-wellness-lodge",
    title: "Bogor Wellness Lodge",
    client: "Q Capital Partners",
    location: "Bogor, Jawa Barat",
    year: 2025,
    category: "hotel",
    summary:
      "Lodge wellness 64 kamar di ketinggian 900 mdpl dengan spa hutan, jalur trekking, dan dapur plant-based.",
    image: {
      src: "/images/work-pool-deck.jpg",
      alt: "Kolam outdoor dengan kursi santai dan pepohonan",
    },
    metrics: [
      { label: "Kamar", value: "64" },
      { label: "Luas taman", value: "3,4 ha" },
      { label: "Sertifikasi", value: "Green Hotel" },
    ],
    scope: [
      "Konsep wellness retreat dan kurasi program",
      "Desain bangunan rendah energi",
      "Perancangan jalur trekking & kebun herbal",
      "Program pelatihan wellness concierge",
    ],
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}

export const workCategories = [
  { value: "all", label: "Semua Proyek" },
  { value: "mixed-use", label: "Kawasan Terpadu" },
  { value: "hotel", label: "Hotel" },
  { value: "waterpark", label: "Waterpark" },
  { value: "resort", label: "Resort" },
] as const;
