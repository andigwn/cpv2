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
      src: "/images/paradis-q-1.jpeg",
      alt: "Area beratap di kawasan Paradis Q",
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
      src: "/images/spa-gym-1.jpeg",
      alt: "Ruang perawatan spa dengan dua tempat tidur dan tanaman",
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
      src: "/images/patio-1.jpeg",
      alt: "Interior Resto Patio dengan meja kayu dan rak tanaman",
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
      src: "/images/qhall-1.jpeg",
      alt: "Fasad QHall dengan kanopi kawat dekoratif",
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
