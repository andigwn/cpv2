import type { NewsPost } from "@/types";

/** Newswire / blog content (prd.md section 4 point 4). */
export const newsPosts: NewsPost[] = [
  {
    slug: "promo-liburan-sekolah-2026",
    title: "Promo Liburan Sekolah 2026: Gratis Tiket Waterpark untuk Anak",
    excerpt:
      "Setiap pemesanan Family Suite minimal dua malam selama periode liburan sekolah mendapatkan tiket waterpark gratis untuk dua anak.",
    body: [
      "Menyambut musim liburan sekolah, Qubu Resort menghadirkan paket Family Splash yang berlaku untuk pemesanan 1 Juni sampai 31 Juli 2026. Paket ini mencakup menginap di Family Suite, sarapan untuk empat orang, serta tiket Paradis Q selama masa menginap.",
      "Anak usia 4 sampai 12 tahun mendapatkan akses gratis ke seluruh zona waterpark, termasuk Toddler Lagoon dan area bermain air berkedalaman rendah yang diawasi lifeguard bersertifikat. Orang tua dapat menikmati Beach Club atau Q Spa sementara anak-anak mengikuti program Kids Club.",
      "Pemesanan dapat dilakukan melalui situs ini, telepon ke +62 361 8899 1200, atau melalui WhatsApp resmi kami. Kuota paket terbatas 120 kamar per periode dan tidak dapat digabung dengan promosi lain.",
    ],
    category: "Promo",
    publishedAt: "2026-05-18",
    readingMinutes: 3,
    author: "Marketing Qubu Resort",
    image: {
      src: "/images/qubu-suites-2.jpeg",
      alt: "Suite Hotel Qubu Suites untuk paket liburan sekolah",
    },
    featured: true,
    tags: ["promo", "keluarga", "waterpark"],
  },
  {
    slug: "karnival-air-paradis-q-2026",
    title: "Karnival Air Paradis Q 2026 Kembali dengan 4 Zona Baru",
    excerpt:
      "Festival air tahunan menghadirkan zona seluncuran baru, kompetisi rafting keluarga, dan panggung musik tepi kolam.",
    body: [
      "Karnival Air Paradis Q kembali digelar pada 12 sampai 14 September 2026 di kawasan Paradis Q. Tahun ini kami menambahkan empat zona permainan baru, termasuk menara racer slide setinggi 22 meter dan area splash untuk balita.",
      "Selama tiga hari, pengunjung dapat mengikuti kompetisi rafting keluarga, kelas selam pemula, dan pertunjukan tari air. Panggung musik tepi kolam akan menampilkan musisi lokal setiap pukul 16.00 WITA.",
      "Tiket karnival tersedia dalam dua kategori: Day Pass dan Twilight Pass yang berlaku mulai pukul 15.00. Pemegang tiket karnival juga mendapat potongan 20% untuk kunjungan kedua pada bulan yang sama.",
    ],
    category: "Event",
    publishedAt: "2026-04-27",
    readingMinutes: 4,
    author: "Tim Paradis Q",
    image: {
      src: "/images/paradis-q-1.jpeg",
      alt: "Area beratap di kawasan Paradis Q tempat karnival air digelar",
    },
    featured: true,
    tags: ["event", "waterpark", "festival"],
  },
  {
    slug: "renovasi-qubu-suites-sayap-timur",
    title: "Renovasi Qubu Suites Sayap Timur Selesai Lebih Cepat",
    excerpt:
      "158 kamar di sayap timur kini memakai jendela panorama, sistem pendingin baru, dan material interior bersertifikat ramah lingkungan.",
    body: [
      "Setelah tujuh bulan pengerjaan, renovasi 158 kamar Qubu Suites di sayap timur resmi selesai pada akhir Maret 2026, dua pekan lebih cepat dari jadwal. Pekerjaan dilakukan bertahap per lantai agar tamu tetap dapat menginap tanpa gangguan berarti.",
      "Perubahan utama mencakup jendela panorama berlapis ganda untuk mengurangi panas, sistem pendingin inverter yang lebih efisien, serta interior dari kayu bersertifikat dan tekstil daur ulang. Setiap kamar kini juga memiliki area kerja dan colokan USB-C di kedua sisi kasur.",
      "Direktur Operasional Qubu Resort menyebut renovasi ini menurunkan konsumsi listrik sayap timur sekitar 18% dibanding periode yang sama tahun lalu.",
    ],
    category: "Facility",
    publishedAt: "2026-04-02",
    readingMinutes: 3,
    author: "Divisi Operasional",
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Suite yang direnovasi di Qubu Suites sayap timur",
    },
    featured: false,
    tags: ["renovasi", "hotel", "efisiensi"],
  },
  {
    slug: "qhall-tuan-rumah-konferensi-regional",
    title: "QHall Jadi Tuan Rumah Konferensi Regional 2026",
    excerpt:
      "Sebanyak 1.240 delegasi dari 14 negara menghadiri konferensi pariwisata berkelanjutan di ballroom utama kami.",
    body: [
      "QHall menjadi tuan rumah Konferensi Pariwisata Berkelanjutan Asia Pasifik 2026 yang berlangsung selama tiga hari dengan 1.240 delegasi dari 14 negara. Acara ini menggunakan ballroom utama serta tujuh dari delapan ruang breakout yang kami miliki.",
      "Tim event kami menangani seluruh kebutuhan teknis, termasuk panggung modular, sistem interpretasi simultan dalam empat bahasa, serta katering 1.240 pax tiga kali sehari dengan opsi halal dan plant-based.",
      "Selama konferensi, kami juga menyelenggarakan sesi lapangan ke kawasan konservasi bakau Tanjung Benoa, bekerja sama dengan komunitas lokal.",
    ],
    category: "Corporate",
    publishedAt: "2026-03-14",
    readingMinutes: 4,
    author: "QHall",
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "Fasad QHall tempat konferensi regional berlangsung",
    },
    featured: false,
    tags: ["mice", "konferensi", "event"],
  },
  {
    slug: "target-net-zero-2040",
    title: "Qubu Resort Tetapkan Target Net Zero 2040",
    excerpt:
      "Peta jalan dekarbonisasi mencakup panel surya 4,2 MWp, daur ulang air kolam, dan penghapusan plastik sekali pakai di seluruh properti.",
    body: [
      "Qubu Resort menetapkan target emisi nol bersih (net zero) pada 2040, sepuluh tahun lebih awal dari komitmen sektor hospitality pada umumnya. Peta jalan ini disusun bersama konsultan energi independen dan akan ditinjau setiap dua tahun.",
      "Langkah pertama adalah pemasangan panel surya berkapasitas 4,2 MWp di atap sayap barat dan area parkir, yang ditargetkan memasok 32% kebutuhan listrik kawasan. Selain itu, sistem daur ulang air kolam kami menurunkan pemakaian air bersih hingga 41%.",
      "Sejak 2019 seluruh properti telah menghapus plastik sekali pakai untuk sedotan, gelas, dan wadah makanan, menggantinya dengan material kompos atau kaca yang dapat digunakan ulang.",
    ],
    category: "Sustainability",
    publishedAt: "2026-02-20",
    readingMinutes: 5,
    author: "Divisi Sustainability",
    image: {
      src: "/images/news-sustainability.jpg",
      alt: "Kawasan resort dengan taman hijau dan area terbuka",
    },
    featured: true,
    tags: ["sustainability", "net-zero", "lingkungan"],
  },
  {
    slug: "penghargaan-hospitality-excellence-2026",
    title: "Dua Properti Qubu Resort Raih Hospitality Excellence Award 2026",
    excerpt:
      "Penghargaan diberikan untuk kategori Best Family Resort dan Best Managed Convention Venue.",
    body: [
      "Qubu Resort Tanjung Benoa dan QHall menerima Hospitality Excellence Award 2026 untuk kategori Best Family Resort dan Best Managed Convention Venue. Penilaian dilakukan melalui audit misteri, survei tamu, dan evaluasi praktik keberlanjutan.",
      "Dewan juri mencatat konsistensi standar housekeeping, program kids club dengan rasio pendamping 1:6, serta kemampuan tim event menangani perubahan teknis di menit terakhir.",
      "Penghargaan ini menjadi yang ke-18 bagi grup sejak 2009 dan akan menjadi dasar pengembangan standar layanan baru pada 2027.",
    ],
    category: "Corporate",
    publishedAt: "2026-01-30",
    readingMinutes: 3,
    author: "Corporate Communication",
    image: {
      src: "/images/news-award.jpg",
      alt: "Suasana acara penghargaan dengan tamu bertepuk tangan",
    },
    featured: false,
    tags: ["penghargaan", "corporate"],
  },
];

export function getNewsBySlug(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

export const featuredNews = newsPosts.filter((post) => post.featured);

export const newsCategories = [
  "Semua",
  "Promo",
  "Event",
  "Corporate",
  "Facility",
  "Sustainability",
] as const;

export const featuredSlugs = newsPosts.slice(0, 5).map((post) => post.slug);
