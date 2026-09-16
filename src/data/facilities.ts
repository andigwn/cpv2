import type { FacilityShowcase } from "@/types";

/** Icon keys resolvable by `components/ui/Icon.tsx`. */
export type FacilityIconKey =
  | "waves"
  | "umbrella"
  | "flower"
  | "utensils"
  | "presentation"
  | "baby";

export type Facility = FacilityShowcase & { iconKey: FacilityIconKey };

/**
 * Facilities managed by Qubu Resort. Used by the About page band and the
 * Services overview strip. Kept as plain data so the client can re-order freely.
 */
export const facilityShowcase: Facility[] = [
  {
    slug: "waterpark",
    title: "Waterpark Terpadu",
    description:
      "18 seluncuran, kolam ombak, dan lazy river dengan pengawasan lifeguard bersertifikat.",
    image: {
      src: "/images/service-waterpark.jpg",
      alt: "Seluncuran waterpark dengan air biru dan pengunjung",
    },
    icon: "waves",
    iconKey: "waves",
    hours: "09.00 – 18.00 WITA",
  },
  {
    slug: "beach-club",
    title: "Beach Club Tepi Pantai",
    description: "Daybed dan cabana privat, kolam infinity, serta live acoustic setiap senja.",
    image: {
      src: "/images/service-beach-club.jpg",
      alt: "Daybed bergaris di tepi pantai berpasir putih",
    },
    icon: "umbrella",
    iconKey: "umbrella",
    hours: "10.00 – 23.00 WITA",
  },
  {
    slug: "spa",
    title: "Spa & Wellness",
    description: "Delapan ruang perawatan, sauna inframerah, hidroterapi, dan studio yoga.",
    image: {
      src: "/images/service-spa.jpg",
      alt: "Ruang perawatan spa dengan tempat tidur putih",
    },
    icon: "flower",
    iconKey: "flower",
    hours: "08.00 – 21.00 WITA",
  },
  {
    slug: "dining",
    title: "Empat Outlet Kuliner",
    description:
      "Dari all-day dining dan seafood grill sampai omakase counter dan pastry lounge.",
    image: {
      src: "/images/service-restaurant.jpg",
      alt: "Teras restoran dengan tanaman dan pemandangan laut",
    },
    icon: "utensils",
    iconKey: "utensils",
    hours: "06.00 – 23.00 WITA",
  },
  {
    slug: "events",
    title: "Convention Centre",
    description:
      "Ballroom bebas pilar 1.800 m², delapan ruang breakout, katering hingga 2.000 pax.",
    image: {
      src: "/images/service-ballroom.jpg",
      alt: "Ruang konferensi dengan deretan kursi dan panggung",
    },
    icon: "presentation",
    iconKey: "presentation",
    hours: "Fleksibel sesuai acara",
  },
  {
    slug: "kids",
    title: "Kids Club & Adventure",
    description: "Program harian dengan pendamping bersertifikat dan rasio maksimal 1:6.",
    image: {
      src: "/images/service-kids-club.jpg",
      alt: "Area bermain air anak berwarna cerah",
    },
    icon: "baby",
    iconKey: "baby",
    hours: "09.00 – 17.00 WITA",
  },
];
