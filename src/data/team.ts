import type { TeamMember } from "@/types";

/**
 * Leadership team.
 *
 * `image` is intentionally optional: the UI falls back to a branded monogram avatar when
 * no headshot is available, so no generic stock portrait is used as if it were a real
 * employee. Add `image: { src: "/images/team-x.jpg", alt: "..." }` once the client
 * supplies real photography.
 */
export const team: TeamMember[] = [
  {
    name: "Adiwangsa Pramudya",
    role: "Founder & Chief Executive Officer",
    bio: "Membuka properti pertama Qubu Resort pada 2009 dan memimpin ekspansi grup ke lima destinasi. Berlatar belakang manajemen hotel dan pengembangan properti.",
  },
  {
    name: "Maya Kusumaningrum",
    role: "Chief Operating Officer",
    bio: "Bertanggung jawab atas standar operasional hotel, waterpark, dan beach club. Sebelumnya memimpin operasional dua grup resort di Bali dan Lombok.",
  },
  {
    name: "Rizky Hardiansyah",
    role: "Chief Financial Officer",
    bio: "Mengelola struktur modal dan kemitraan investasi grup, termasuk pembiayaan tahap dua Paradis Q dan Convention Centre.",
  },
  {
    name: "Nadia Suryani",
    role: "Director of Guest Experience",
    bio: "Merancang program layanan tamu, kids club, dan pelatihan keramahan untuk lebih dari 1.700 karyawan di seluruh properti.",
  },
  {
    name: "Bayu Nugroho",
    role: "Director of Engineering & Safety",
    bio: "Memimpin tim teknis waterpark, sertifikasi keselamatan, dan program efisiensi energi menuju target Net Zero 2040.",
  },
  {
    name: "Clara Wibowo",
    role: "Director of Sustainability & Community",
    bio: "Mengembangkan kemitraan dengan komunitas pesisir, program konservasi bakau, dan pelaporan keberlanjutan kuartalan.",
  },
];
