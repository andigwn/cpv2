import type { DiningVenue } from "@/types";

/**
 * Dining venues of the Qubu Resort area.
 *
 * Each venue is a destination of its own: Patio Bistro and Embun Resto were moved out
 * of the Hotel Q and Hotel Qubu Suites pages, while Qubiq Bar (Hotel Qubu Suites) and
 * Food Corner (Paradis-Q Waterpark) were moved out of their facility lists. All four now
 * live on their own routes (`/dining/[slug]`), reachable from the "Dining" group inside
 * the Destinasi menu.
 */
export const diningVenues: DiningVenue[] = [
  {
    slug: "embun-resto",
    name: "Embun Resto",
    type: "Signature Restaurant",
    description:
      "Restoran Embun menghadirkan pengalaman bersantap di Qubu Suites dengan pilihan hidangan nusantara hingga western dengan sajian halal, yang disajikan dalam suasana nyaman dan modern, cocok untuk bersantap bersama keluarga, teman, maupun untuk pertemuan.",
    image: {
      src: "/images/embun-1.jpeg",
      alt: "Embun Resto dengan area buffet dan meja marmer hitam",
    },
    heroImage: {
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
    features: [],
    hours: "08:00 – 22:00 WIB",
    location: "Hotel Qubu Suites, lantai dasar",
  },
  {
    slug: "qubiq-bar",
    name: "Qubik Bar",
    type: "Bar & Lounge",
    description:
      "Qubik Bar menghadirkan pengalaman bersantai di Qubu Suites area outdoor dengan pilihan cocktail, wine, beer ditemani pemandangan sky bridge, super tree, dan aviary sebagai latar suasana malam yang berkesan.",
    image: {
      src: "/images/work-sky-lounge.jpg",
      alt: "Bar lounge dengan area duduk dan rak botol menghadap laut",
    },
    // Dek berpayung milik kawasan sendiri, lebih sesuai untuk hero penuh layar
    // dibandingkan foto stok yang dipakai `image`.
    heroImage: {
      src: "/images/service-sunset-deck.jpg",
      alt: "Area duduk bar di dek dengan cahaya matahari sore",
    },
    gallery: [
      {
        src: "/images/work-sky-lounge.jpg",
        alt: "Bar lounge dengan area duduk dan rak botol menghadap laut",
      },
      {
        src: "/images/service-sunset-deck.jpg",
        alt: "Area duduk bar di dek dengan cahaya matahari sore",
      },
    ],
    features: [
      "Pilihan cocktail, wine, dan beer",
      "Pemandangan sky bridge, super tree, dan aviary",
      "Suasana malam yang berkesan",
      "Area outdoor di Qubu Suites",
    ],
    hours: "TBC",
    location: "Hotel Qubu Suites, area outdoor",
  },
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
    // Angle yang lebih hangat dan lebih gelap, jadi copy putih terbaca tanpa scrim tebal.
    heroImage: {
      src: "/images/patio-2.jpeg",
      alt: "Suasana makan malam di Patio Bistro dengan plafon kayu",
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
    slug: "food-corner",
    name: "Food Corner",
    type: "Food Court",
    description:
      "Food court di Paradis-Q Waterpark dengan delapan tenant bertema nusantara dan area makan beratap untuk pengunjung waterpark.",
    image: {
      src: "/images/service-restaurant.jpg",
      alt: "Area makan dengan meja dan kursi menghadap laut",
    },
    heroImage: {
      src: "/images/service-restaurant.jpg",
      alt: "Area makan beratap dengan meja dan kursi menghadap laut",
    },
    gallery: [
      {
        src: "/images/service-restaurant.jpg",
        alt: "Area makan dengan meja dan kursi menghadap laut",
      },
      {
        src: "/images/service-cabana.jpg",
        alt: "Area makan beratap dengan deretan meja",
      },
    ],
    features: [
      "Delapan tenant bertema nusantara",
      "Area makan beratap 600 kursi",
      "Akses cepat dari area kolam",
      "Pembayaran nontunai dan kartu",
    ],
    hours: "10.00 – 20.00 WITA",
    location: "Paradis-Q Waterpark, sisi kolam utama",
  },
];

export function getDiningVenueBySlug(slug: string) {
  return diningVenues.find((venue) => venue.slug === slug);
}

/** Absolute href helper so every layer builds the same venue URLs. */
export function diningHref(venue: DiningVenue) {
  return "/dining/" + venue.slug;
}
