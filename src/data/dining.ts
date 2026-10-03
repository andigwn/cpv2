import type { DiningVenue, NavItem } from "@/types";

/**
 * Dining venues of the Qubu Resort area.
 *
 * Each venue is a destination of its own: Patio Bistro and Embun Resto were moved out
 * of the Hotel Q and Hotel Qubu Suites pages and now live on their own routes
 * (`/dining/[slug]`), reachable from the "Dining" group inside the Destinasi menu.
 */
export const diningVenues: DiningVenue[] = [
  {
    slug: "patio-bistro",
    name: "Patio Bistro",
    type: "All-day Dining",
    description:
      "Restoran all-day dining di Hotel Q dengan 240 kursi, live station nusantara, Asia, dan Western, serta teras yang menghadap taman tropis.",
    image: {
      src: "/images/patio-1.jpeg",
      alt: "Interior Patio Bistro dengan meja kayu dan rak botol",
    },
    gallery: [
      {
        src: "/images/patio-1.jpeg",
        alt: "Interior Patio Bistro dengan meja kayu dan rak botol",
      },
      {
        src: "/images/patio-2.jpeg",
        alt: "Suasana makan malam di Patio Bistro dengan plafon kayu",
      },
    ],
    features: [
      "240 kursi indoor dan teras",
      "12 live cooking station",
      "Menu nusantara, Asia, dan Western",
      "Sarapan hingga makan malam",
    ],
    hours: "06.00 – 23.00 WITA",
    location: "Hotel Q, lantai dasar",
  },
  {
    slug: "embun-resto",
    name: "Embun Resto",
    type: "Signature Restaurant",
    description:
      "Restoran signature di Hotel Qubu Suites dengan area buffet, meja marmer, dan menu plant-forward yang menghadap taman tropis.",
    image: {
      src: "/images/embun-1.jpeg",
      alt: "Embun Resto dengan area buffet dan meja marmer hitam",
    },
    gallery: [
      {
        src: "/images/embun-1.jpeg",
        alt: "Embun Resto dengan area buffet dan meja marmer hitam",
      },
      {
        src: "/images/service-restaurant.jpg",
        alt: "Area makan dengan meja dan kursi menghadap taman",
      },
    ],
    features: [
      "140 kursi dengan area buffet",
      "Menu plant-forward",
      "Sarapan buffet 06.00 – 10.30",
      "Live cooking station",
    ],
    hours: "06.00 – 22.00 WITA",
    location: "Hotel Qubu Suites, lantai dasar",
  },
];

export function getDiningVenueBySlug(slug: string) {
  return diningVenues.find((venue) => venue.slug === slug);
}

/** Absolute href helper so every layer builds the same venue URLs. */
export function diningHref(venue: DiningVenue) {
  return "/dining/" + venue.slug;
}

/** Entries for the "Dining" group in the Destinasi navigation menu, in display order. */
export const diningVenueMenu: NavItem[] = diningVenues.map((venue) => ({
  label: venue.name,
  href: diningHref(venue),
}));
