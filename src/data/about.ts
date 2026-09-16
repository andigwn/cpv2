import type { Stat, TimelineEntry } from "@/types";
import { brandPromises, companyStats, testimonials } from "./meta";

export { companyStats, testimonials, brandPromises };

/** Long-form company story for the About page. */
export const aboutStory = {
  eyebrow: "Tentang Kami",
  title: "Menghadirkan liburan cerah sejak 2009",
  lead: "Qubu Resort mengelola hotel resort tepi pantai, waterpark keluarga, dan pusat konvensi di lima destinasi Indonesia — dengan satu keyakinan sederhana: liburan terbaik terasa hangat, mudah, dan menyenangkan untuk semua usia.",
  paragraphs: [
    "Kami memulai pada 2009 dari satu hotel 64 kamar di Tanjung Benoa, Bali. Saat itu tim kami hanya 38 orang, namun kami sudah menetapkan standar yang masih kami pegang sampai hari ini: kebersihan yang bisa dipercaya, staf yang benar-benar hadir untuk tamu, dan ruang terbuka yang memaksimalkan cahaya alami.",
    "Pada 2016 kami membuka Paradis Q sebagai jawaban atas kebutuhan keluarga Indonesia akan destinasi liburan yang aman dan menyenangkan untuk anak-anak. Kesuksesan waterpark pertama membawa kami membuka properti berikutnya di Belitung, Labuan Bajo, Nusa Dua, dan Bogor.",
    "Hari ini kami mengelola 1.240 kamar, dua waterpark, tiga beach club, empat spa, dan satu convention centre dengan lebih dari 1.700 karyawan. Kami tetap perusahaan yang dikelola pendirinya, dengan keputusan diambil dekat ke operasional harian dan ke tamu.",
  ],
  mission:
    "Menghadirkan pengalaman liburan yang cerah, aman, dan berkesan bagi setiap tamu — serta pertumbuhan yang berkelanjutan bagi destinasi tempat kami beroperasi.",
  vision:
    "Menjadi grup hospitality keluarga paling dipercaya di Asia Tenggara pada 2030, dengan standar keberlanjutan yang terukur dan tim lokal yang tumbuh bersama kami.",
};

/** Milestone timeline (About page). */
export const timeline: TimelineEntry[] = [
  {
    year: "2009",
    title: "Qubu Resort dibuka",
    description:
      "Hotel 64 kamar di Tanjung Benoa dengan 38 karyawan dan satu restoran tepi pantai.",
  },
  {
    year: "2013",
    title: "Ekspansi sayap barat & spa pertama",
    description:
      "Penambahan 96 kamar, kolam utama baru, dan Q Spa dengan empat ruang perawatan.",
  },
  {
    year: "2016",
    title: "Paradis Q fase satu",
    description:
      "Pembukaan waterpark tiga zona dengan sembilan seluncuran dan kapasitas 2.000 pengunjung per hari.",
  },
  {
    year: "2019",
    title: "Menghapus plastik sekali pakai",
    description:
      "Seluruh properti beralih ke material kompos dan wadah guna ulang untuk operasional harian.",
  },
  {
    year: "2021",
    title: "Kawasan terpadu 11,4 hektar",
    description:
      "Integrasi hotel, waterpark, beach club, spa, dan convention centre dalam satu kawasan.",
  },
  {
    year: "2023",
    title: "Waterpark fase dua & Labuan Bajo",
    description:
      "Racer slide 22 meter, kolam ombak 1.100 m², dan penugasan masterplan waterfront Labuan Bajo.",
  },
  {
    year: "2026",
    title: "Target Net Zero 2040",
    description:
      "Peta jalan dekarbonisasi dengan panel surya 4,2 MWp dan target 32% listrik dari energi terbarukan.",
  },
];

/** Company values shown on the About page. */
export const companyValues = [
  {
    title: "Cahaya & keterbukaan",
    description:
      "Desain kami memaksimalkan cahaya alami dan ruang terbuka agar tamu merasa segar sejak tiba.",
    icon: "Sun" as const,
  },
  {
    title: "Keselamatan tanpa kompromi",
    description:
      "Sistem filtrasi air terpantau, lifeguard bersertifikat, dan simulasi evakuasi setiap kuartal.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Tumbuh bersama lokal",
    description:
      "78% karyawan kami berasal dari kabupaten tempat properti beroperasi, dengan program pelatihan berkelanjutan.",
    icon: "Users" as const,
  },
  {
    title: "Keberlanjutan terukur",
    description:
      "Konsumsi air, energi, dan limbah dilaporkan setiap kuartal dengan target tahunan yang dipublikasikan.",
    icon: "Leaf" as const,
  },
];

/** Headline numbers for the About page intro. */
export const aboutStats: Stat[] = [
  { value: "1.240", label: "Kamar & suite terkelola" },
  { value: "1.700+", label: "Karyawan di lima destinasi" },
  { value: "2,1 juta", label: "Kunjungan tamu per tahun" },
  { value: "78%", label: "Karyawan berasal dari daerah setempat" },
];
