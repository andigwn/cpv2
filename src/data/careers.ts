import type { JobOpening } from "@/types";

/** Career openings (prd.md sitemap: /careers). */
export const jobOpenings: JobOpening[] = [
  {
    slug: "front-office-manager",
    title: "Front Office Manager",
    department: "Rooms Division",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Manager",
    description:
      "Memimpin tim front office 42 orang untuk memastikan pengalaman check-in dan check-out tamu berjalan cepat, hangat, dan akurat.",
    responsibilities: [
      "Mengelola operasional front office 24 jam termasuk jadwal shift dan standar layanan",
      "Menganalisis laporan okupansi, pendapatan kamar, dan kepuasan tamu harian",
      "Menangani keluhan tamu tingkat lanjut dan memastikan tindak lanjut terdokumentasi",
      "Melatih dan mengevaluasi 42 anggota tim front office dan concierge",
    ],
    requirements: [
      "Minimal 5 tahun pengalaman front office di hotel bintang 4–5",
      "2 tahun di posisi supervisory atau managerial",
      "Menguasai PMS (Opera atau setara) dan channel manager",
      "Bahasa Inggris aktif; bahasa Mandarin menjadi nilai tambah",
    ],
  },
  {
    slug: "waterpark-operations-supervisor",
    title: "Waterpark Operations Supervisor",
    department: "Paradis Q",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Supervisor",
    description:
      "Mengawasi operasional harian waterpark tujuh zona, termasuk kesiapan wahana, kualitas air, dan keselamatan pengunjung.",
    responsibilities: [
      "Membuka dan menutup area waterpark sesuai checklist keselamatan",
      "Memantau kualitas air dan sistem filtrasi setiap dua jam",
      "Mengoordinasikan 24 lifeguard dan rotasi pos pengawasan",
      "Mengelola laporan insiden dan simulasi evakuasi bulanan",
    ],
    requirements: [
      "Sertifikasi lifeguard (Bronze Medallion atau setara) yang masih berlaku",
      "Minimal 3 tahun pengalaman operasional waterpark atau kolam renang publik",
      "Memahami sistem sirkulasi dan kimia air kolam",
      "Bersedia bekerja dalam shift, termasuk akhir pekan dan hari libur",
    ],
  },
  {
    slug: "executive-chef",
    title: "Executive Chef",
    department: "Food & Beverage",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Head of Department",
    description:
      "Memimpin empat outlet kuliner dan dapur katering convention centre dengan total 86 anggota tim dapur.",
    responsibilities: [
      "Menyusun menu musiman dan mengontrol food cost di empat outlet",
      "Memastikan standar HACCP dan sertifikasi halal dapur utama",
      "Memimpin dapur katering untuk acara hingga 2.000 pax",
      "Mengembangkan program pelatihan chef muda dan program magang",
    ],
    requirements: [
      "Minimal 8 tahun pengalaman dapur profesional, 3 tahun sebagai Executive Sous Chef atau Executive Chef",
      "Pengalaman menangani banquet berskala besar",
      "Pemahaman kuat bahan lokal nusantara dan teknik modern",
      "Sertifikasi HACCP atau food safety yang relevan",
    ],
  },
  {
    slug: "spa-therapist",
    title: "Spa Therapist",
    department: "Q Spa & Wellness",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Staff",
    description:
      "Memberikan perawatan spa berbasis botani lokal dengan standar kenyamanan dan kebersihan Q Spa.",
    responsibilities: [
      "Melakukan perawatan body, facial, dan terapi pijat sesuai protokol",
      "Menjaga kebersihan dan kesiapan ruang perawatan",
      "Mencatat preferensi tamu pada sistem profil tamu",
      "Mendukung penjualan produk dan paket perawatan",
    ],
    requirements: [
      "Lulusan sekolah spa atau memiliki sertifikat terapi pijat",
      "Minimal 1 tahun pengalaman di spa hotel atau wellness centre",
      "Ramah, teliti, dan nyaman bekerja dengan jadwal shift",
      "Bahasa Inggris dasar untuk berkomunikasi dengan tamu",
    ],
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "Marketing & Communication",
    location: "Denpasar, Bali (Hybrid)",
    type: "Full-time",
    level: "Senior Staff",
    description:
      "Mengelola kampanye digital untuk hotel, waterpark, dan convention centre, termasuk konten sosial dan performa iklan.",
    responsibilities: [
      "Merencanakan dan mengeksekusi kampanye meta, Google, dan TikTok Ads",
      "Mengelola kalender konten dan kolaborasi dengan kreator lokal",
      "Menganalisis funnel pemesanan dan melaporkan performa bulanan",
      "Berkolaborasi dengan tim reservasi untuk optimasi konversi",
    ],
    requirements: [
      "Minimal 3 tahun pengalaman digital marketing, idealnya di hospitality atau travel",
      "Menguasai analytics, pixel/tag manager, dan alat desain dasar",
      "Kemampuan menulis konten dalam bahasa Indonesia dan Inggris",
      "Terbiasa bekerja dengan target ROAS dan laporan data",
    ],
  },
  {
    slug: "management-trainee-2026",
    title: "Management Trainee 2026",
    department: "People & Culture",
    location: "Rotasi lima destinasi",
    type: "Contract",
    level: "Trainee",
    description:
      "Program 12 bulan dengan rotasi di rooms, F&B, waterpark operations, dan marketing, dengan mentoring direksi.",
    responsibilities: [
      "Menyelesaikan rotasi di empat divisi operasional",
      "Mengerjakan proyek perbaikan proses di setiap rotasi",
      "Mendukung operasional harian saat periode puncak",
      "Mempresentasikan hasil proyek kepada panel direksi",
    ],
    requirements: [
      "Lulusan S1 semua jurusan, maksimal 2 tahun setelah kelulusan",
      "IPK minimal 3,20 dan aktif berorganisasi",
      "Bersedia ditempatkan di lima destinasi selama program",
      "Bahasa Inggris aktif dan kemampuan analisis yang baik",
    ],
  },
];

export const careerBenefits = [
  {
    title: "Asuransi kesehatan keluarga",
    description: "Qrage rawat inap dan rawat jalan untuk karyawan, pasangan, dan dua anak.",
    icon: "HeartPulse" as const,
  },
  {
    title: "Pengembangan berkelanjutan",
    description:
      "Anggaran pelatihan tahunan, sertifikasi profesi, dan program mentoring dengan direksi.",
    icon: "GraduationCap" as const,
  },
  {
    title: "Akomodasi & transport",
    description: "Mess karyawan untuk talenta dari luar Bali serta antar-jemput shift harian.",
    icon: "Home" as const,
  },
  {
    title: "Tunjangan makan & service",
    description: "Tunjangan makan harian, service charge bulanan, dan diskon menginap keluarga.",
    icon: "UtensilsCrossed" as const,
  },
];

export const hiringSteps = [
  {
    step: "01",
    title: "Lamaran & screening",
    description: "Kirim CV dan portfolio. Tim People & Culture merespons dalam 5 hari kerja.",
  },
  {
    step: "02",
    title: "Wawancara HR",
    description: "Sesi 45 menit untuk membahas pengalaman, ekspektasi, dan budaya kerja.",
  },
  {
    step: "03",
    title: "Wawancara teknis & user",
    description: "Studi kasus singkat bersama calon atasan langsung dan kepala divisi.",
  },
  {
    step: "04",
    title: "Penawaran & orientasi",
    description: "Penawaran kerja, pemeriksaan referensi, lalu program orientasi dua pekan.",
  },
];
