import { SITE } from "@/lib/constants";

/** Contact page content: office, departments, FAQ and map. */
export const contactChannels = [
  {
    label: "Reservasi & Kamar",
    value: SITE.contact.phone,
    href: `tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`,
    description: "Tersedia setiap hari 07.00 – 22.00 WITA",
    icon: "Phone" as const,
  },
  {
    label: "WhatsApp Concierge",
    value: SITE.contact.whatsapp,
    href: `https://wa.me/${SITE.contact.whatsapp.replace(/[^\d]/g, "").replace(/^0/, "62")}`,
    description: "Respons rata-rata di bawah 10 menit",
    icon: "MessageCircle" as const,
  },
  {
    label: "Email Umum",
    value: SITE.contact.email,
    href: `mailto:${SITE.contact.email}`,
    description: "Untuk pertanyaan umum dan kemitraan",
    icon: "Mail" as const,
  },
  {
    label: "MICE & Event",
    value: SITE.contact.reservationEmail,
    href: `mailto:${SITE.contact.reservationEmail}`,
    description: "Proposal event dikirim dalam 2 hari kerja",
    icon: "CalendarCheck" as const,
  },
];

export const departmentContacts = [
  {
    name: "Reservasi Kamar & Paket",
    email: "reservation@quburesort.id",
    phone: "+62 361 8899 1200",
    hours: "Setiap hari 07.00 – 22.00 WITA",
  },
  {
    name: "Waterpark & Tiket",
    email: "waterpark@quburesort.id",
    phone: "+62 361 8899 1250",
    hours: "Setiap hari 09.00 – 18.00 WITA",
  },
  {
    name: "MICE & Convention Centre",
    email: "event@quburesort.id",
    phone: "+62 361 8899 1270",
    hours: "Senin – Jumat 09.00 – 17.00 WITA",
  },
  {
    name: "Kemitraan & Investor Relations",
    email: "partnership@quburesort.id",
    phone: "+62 361 8899 1290",
    hours: "Senin – Jumat 09.00 – 17.00 WIB",
  },
  {
    name: "Karir & Rekrutmen",
    email: "career@quburesort.id",
    phone: "+62 361 8899 1295",
    hours: "Senin – Jumat 09.00 – 17.00 WITA",
  },
];

export const interestOptions = [
  "Reservasi kamar / paket menginap",
  "Tiket waterpark",
  "MICE, konferensi, & pernikahan",
  "Spa & wellness",
  "Kemitraan bisnis / investor",
  "Media & pers",
  "Lainnya",
];

export const contactFaqs = [
  {
    question: "Berapa lama waktu check-in dan check-out?",
    answer:
      "Check-in mulai 14.00 WITA dan check-out pukul 12.00 WITA. Tamu suite mendapatkan late check-out hingga 15.00 WITA tanpa biaya tambahan, bergantung ketersediaan kamar.",
  },
  {
    question: "Apakah tiket waterpark bisa dibeli di loket?",
    answer:
      "Bisa, namun kami menyarankan pembelian online karena kuota harian dibatasi 4.500 pengunjung. Pembelian online juga lebih murah dan bebas antre di pintu masuk.",
  },
  {
    question: "Apakah tersedia layanan antar-jemput bandara?",
    answer:
      "Ya. Layanan transfer privat tersedia 24 jam dengan armada Alphard, Hiace Premio, atau bus 45 kursi. Pemesanan minimal dua jam sebelum keberangkatan melalui concierge.",
  },
  {
    question: "Apakah kawasan ini ramah untuk anak dan balita?",
    answer:
      "Sangat ramah. Tersedia Toddler Lagoon dengan kolam dangkal berpemanas surya, ruang laktasi, kursi bayi di semua restoran, serta kids club dengan rasio pendamping 1:6.",
  },
  {
    question: "Bagaimana kebijakan pembatalan reservasi?",
    answer:
      "Pembatalan gratis hingga 72 jam sebelum tanggal kedatangan. Pembatalan setelahnya dikenakan biaya satu malam, sedangkan no-show dikenakan biaya satu malam penuh.",
  },
];

export const officeLocations = [
  {
    name: "Kantor Pusat & Qubu Resort",
    address: "Jl. Pantai Q No. 88, Tanjung Benoa, Badung, Bali 80361",
    mapsUrl: "https://maps.google.com/?q=Tanjung+Benoa+Badung+Bali",
    image: {
      src: "/images/about-lobby.jpg",
      alt: "Lobi kantor pusat Qubu Resort",
    },
  },
  {
    name: "Paradis Q & Beach Club",
    address: "Kawasan Qubu Resort, Tanjung Benoa, Badung, Bali 80361",
    mapsUrl: "https://maps.google.com/?q=Tanjung+Benoa+Waterpark+Bali",
    image: {
      src: "/images/service-waterpark.jpg",
      alt: "Area waterpark Qubu Resort",
    },
  },
  {
    name: "Kantor Regional Jakarta",
    address: "Menara Q, Lantai 18, Jl. Jend. Sudirman Kav. 52, Jakarta 12190",
    mapsUrl: "https://maps.google.com/?q=Sudirman+Jakarta",
    image: {
      src: "/images/work-lobby.jpg",
      alt: "Lobi kantor regional Jakarta",
    },
  },
];
