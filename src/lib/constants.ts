import type { NavItem, SocialLink } from "@/types";
import { businessUnitMenu } from "@/data/units";

/** Single source of truth for brand identity + static site configuration. */
export const SITE = {
  name: "Qubu Resort",
  legalName: "PT.Rezeki Wahana Gembira",
  tagline: "Hotel, Convention & Recreation",
  description:
    "Qubu Resort mengelola hotel, waterpark, convention centre, dan destinasi rekreasi keluarga melalui enam unit bisnis: Hotel Q, QHall, Paradis Q, Hotel Qubu Suites, Villa, dan Pemancingan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2009,
  contact: {
    address: "Jl. Pantai Q No. 88, Tanjung Benoa, Badung, Bali 80361",
    addressShort: "Tanjung Benoa, Bali",
    phone: "+62 361 8899 1200",
    whatsapp: "+62 811 3900 880",
    email: "hello@quburesort.id",
    reservationEmail: "reservation@quburesort.id",
    careerEmail: "career@quburesort.id",
    mapsQuery: "Tanjung Benoa, Badung, Bali",
  },
  hours: {
    resort: "Check-in 14.00 · Check-out 12.00",
    waterpark: "Setiap hari 09.00 – 18.00 WITA",
    sales: "Senin – Jumat, 09.00 – 17.00 WIB",
  },
} as const;

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Tentang", href: "/about" },
  // Dropdown entries are derived from src/data/units.ts (single source of truth).
  { label: "Unit Bisnis", href: "/unit-bisnis", children: businessUnitMenu },
  { label: "Kontak", href: "/contact" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Unit Bisnis",
    items: [
      { label: "Hotel Q", href: "/unit-bisnis/hotel-q" },
      { label: "QHall Convention Center", href: "/unit-bisnis/qhall" },
      { label: "Paradis Q Waterpark", href: "/unit-bisnis/paradis-q" },
      { label: "Hotel Qubu Suites", href: "/unit-bisnis/qubu-suites" },
      { label: "Villa", href: "/unit-bisnis/villa" },
      { label: "Pemancingan", href: "/unit-bisnis/pemancingan" },
    ],
  },
  {
    title: "Perusahaan",
    items: [
      { label: "Tentang Kami", href: "/about" },
      { label: "Kontak", href: "/contact" },
    ],
  },
  {
    title: "Untuk Tamu",
    items: [
      { label: "Paket Menginap", href: "/services#paket" },
      { label: "Tiket Waterpark", href: "/services/paradis-q" },
      { label: "MICE & Event", href: "/services/qhall" },
      { label: "Kebijakan Privasi", href: "/contact#privasi" },
      { label: "Pusat Bantuan", href: "/contact#bantuan" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];

export const DESTINATIONS = [
  "Nusa Dua, Bali",
  "Tanjung Benoa, Bali",
  "Labuan Bajo, NTT",
  "Belitung, Bangka Belitung",
  "Bogor, Jawa Barat",
] as const;

/** Section ids used by the floating section indicator + scroll linking. */
export const HOME_SECTIONS = [
  { id: "hero", label: "Beranda" },
  { id: "highlights", label: "Highlight" },
  { id: "about", label: "Tentang" },
  { id: "services", label: "Fasilitas" },
  { id: "news", label: "Berita" },
  { id: "cta", label: "Reservasi" },
] as const;

/** Reusable overlay presets so every section keeps readable contrast (WCAG AA). */
export const OVERLAY = {
  light: "bg-gradient-to-b from-white/85 via-white/70 to-white/90",
  soft: "bg-gradient-to-t from-white/85 via-white/60 to-white/30",
  veil: "bg-white/55",
  dark: "bg-gradient-to-t from-ink-900/60 via-ink-900/25 to-transparent",
  edge: "bg-gradient-to-t from-white via-white/60 to-transparent",
} as const;
