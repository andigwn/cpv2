import type { NavItem, NavLinkItem, SocialLink } from "@/types";
import { businessUnitMenu } from "@/data/units";
import { diningVenueMenu } from "@/data/dining";

/** Single source of truth for brand identity + static site configuration. */
export const SITE = {
  name: "Qubu Resort",
  legalName: "PT.Rezeki Wahana Gembira",
  tagline: "Hotel, Convention & Recreation",
  description:
    "Qubu Resort mengelola hotel, waterpark, convention centre, dan destinasi rekreasi keluarga melalui lima destinasi: Hotel Qubu Suites, Hotel Q, The Q Hall Convention Center, Paradis-Q Waterpark, dan Villa Town House.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2009,
  contact: {
    address: "Jl. Arteri Supadio No.16, Sungai Raya, Kec. Sungai Raya, Kabupaten Kubu Raya, Kalimantan Barat 78117",
    addressShort: "Kubu Raya, Kalimantan Barat",
    phone: "+62 361 8899 1200",
    whatsapp: "+62 811 3900 880",
    email: "hello@quburesort.id",
    reservationEmail: "reservation@quburesort.id",
    careerEmail: "career@quburesort.id",
    mapsQuery: "Jl. Arteri Supadio No.16, Sungai Raya, Kec. Sungai Raya, Kabupaten Kubu Raya, Kalimantan Barat 78117",
  },
  hours: {
    resort: "Check-in 14.00 · Check-out 12.00",
    waterpark: "Setiap hari 09.00 – 18.00 WITA",
    sales: "Senin – Jumat, 09.00 – 17.00 WIB",
  },
} as const;

export const MAIN_NAV: NavItem[] = [
  { label: "Home", labelKey: "nav.home", href: "/" },
  { label: "Tentang", labelKey: "nav.about", href: "/about" },
  // Dropdown entries are derived from src/data/units.ts (single source of truth).
  {
    label: "Destinasi",
    labelKey: "nav.destinations",
    href: "/unit-bisnis",
    children: [
      ...businessUnitMenu,
      // Dining is a group entry: it has no page of its own and only reveals its
      // restaurants (Patio Bistro, Embun Resto) on hover / tap.
      { label: "Dining", labelKey: "nav.dining", children: diningVenueMenu },
    ],
  },
  { label: "Kontak", labelKey: "nav.contact", href: "/contact" },
  { label: "Karir", labelKey: "nav.careers", href: "/careers" },
];

export const FOOTER_NAV: { title: string; titleKey: string; items: NavLinkItem[] }[] = [
  {
    title: "Destinasi",
    titleKey: "nav.destinations",
    items: [
      { label: "Hotel Qubu Suites", href: "/unit-bisnis/qubu-suites" },
      { label: "Hotel Q", href: "/unit-bisnis/hotel-q" },
      { label: "The Q Hall Convention Center", href: "/unit-bisnis/qhall" },
      { label: "Paradis-Q Waterpark", href: "/unit-bisnis/paradis-q" },
      { label: "Villa Town House", href: "/unit-bisnis/villa" },
      { label: "Patio Bistro", href: "/dining/patio-bistro" },
      { label: "Embun Resto", href: "/dining/embun-resto" },
      { label: "Semua Destinasi", labelKey: "common.allDestinations", href: "/unit-bisnis" },
    ],
  },
  {
    title: "Perusahaan",
    titleKey: "footer.company",
    items: [
      { label: "Tentang Kami", labelKey: "nav.about", href: "/about" },
      { label: "Kontak", labelKey: "nav.contact", href: "/contact" },
      { label: "Karir", labelKey: "nav.careers", href: "/careers" },
    ],
  },
  {
    title: "Untuk Tamu",
    titleKey: "footer.forGuests",
    items: [
      { label: "Paket Menginap", labelKey: "footer.stayPackages", href: "/services#paket" },
      { label: "Tiket Waterpark", labelKey: "footer.waterparkTickets", href: "/services/paradis-q" },
      { label: "MICE & Event", labelKey: "footer.mice", href: "/services/qhall" },
      { label: "Kebijakan Privasi", labelKey: "footer.privacy", href: "/contact#privasi" },
      { label: "Pusat Bantuan", labelKey: "footer.help", href: "/contact#bantuan" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
];
