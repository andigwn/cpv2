import type { DiningVenue } from "@/types";

export const diningVenuesEn: DiningVenue[] = [
  {
    slug: "patio-bistro",
    name: "Patio Bistro",
    type: "All-day Dining",
    description:
      "An all-day dining restaurant at Hotel Q with 240 seats, live stations for Indonesian, Asian, and Western cuisine, and a terrace overlooking the tropical garden.",
    image: {
      src: "/images/patio-1.jpeg",
      alt: "Patio Bistro interior with wooden tables and a bottle rack",
    },
    heroImage: {
      src: "/images/patio-2.jpeg",
      alt: "Dinner atmosphere at Patio Bistro with a wooden ceiling",
    },
    gallery: [
      {
        src: "/images/patio-1.jpeg",
        alt: "Patio Bistro interior with wooden tables and a bottle rack",
      },
      {
        src: "/images/patio-2.jpeg",
        alt: "Dinner atmosphere at Patio Bistro with a wooden ceiling",
      },
    ],
    features: [
      "240 indoor and terrace seats",
      "12 live cooking stations",
      "Indonesian, Asian, and Western menus",
      "Breakfast through dinner",
    ],
    hours: "06:00 – 23:00 WITA",
    location: "Hotel Q, ground floor",
  },
  {
    slug: "embun-resto",
    name: "Embun Resto",
    type: "Signature Restaurant",
    description:
      "Embun Restaurant brings a dining experience to Qubu Suites with a choice of Indonesian to Western dishes, all halal, served in a comfortable and modern atmosphere — ideal for meals with family, friends, or a business meeting.",
    image: {
      src: "/images/embun-1.jpeg",
      alt: "Embun Resto with a buffet area and black marble tables",
    },
    heroImage: {
      src: "/images/embun-1.jpeg",
      alt: "Embun Resto with a buffet area and black marble tables",
    },
    gallery: [
      {
        src: "/images/embun-1.jpeg",
        alt: "Embun Resto with a buffet area and black marble tables",
      },
      {
        src: "/images/service-restaurant.jpg",
        alt: "Dining area with tables and chairs overlooking the garden",
      },
    ],
    features: [],
    hours: "08:00 – 22:00 WIB",
    location: "Hotel Qubu Suites, ground floor",
  },
  {
    slug: "qubiq-bar",
    name: "Qubiq Bar",
    type: "Bar & Lounge",
    description:
      "Qubiq Bar offers a relaxed experience in the outdoor area of Qubu Suites, with a selection of cocktails, wine, and beer against views of the sky bridge, super tree, and aviary — the backdrop of a memorable evening.",
    image: {
      src: "/images/work-sky-lounge.jpg",
      alt: "Bar lounge with a seating area and a bottle shelf facing the sea",
    },
    heroImage: {
      src: "/images/service-sunset-deck.jpg",
      alt: "Bar seating on the deck in the late afternoon light",
    },
    gallery: [
      {
        src: "/images/work-sky-lounge.jpg",
        alt: "Bar lounge with a seating area and a bottle shelf facing the sea",
      },
      {
        src: "/images/service-sunset-deck.jpg",
        alt: "Bar seating on the deck in late afternoon light",
      },
    ],
    features: [
      "A selection of cocktails, wine, and beer",
      "Views of the sky bridge, super tree, and aviary",
      "A memorable evening atmosphere",
      "Outdoor area at Qubu Suites",
    ],
    hours: "TBC",
    location: "Hotel Qubu Suites, outdoor area",
  },
  {
    slug: "food-corner",
    name: "Food Corner",
    type: "Food Court",
    description:
      "A food court at Paradis-Q Waterpark with eight Indonesian-themed tenants and a covered dining area for waterpark visitors.",
    image: {
      src: "/images/service-restaurant.jpg",
      alt: "Dining area with tables and chairs facing the sea",
    },
    heroImage: {
      src: "/images/service-restaurant.jpg",
      alt: "Covered dining terrace with tables and chairs facing the sea",
    },
    gallery: [
      {
        src: "/images/service-restaurant.jpg",
        alt: "Dining area with tables and chairs facing the sea",
      },
      {
        src: "/images/service-cabana.jpg",
        alt: "Covered dining area with rows of tables",
      },
    ],
    features: [
      "Eight Indonesian-themed tenants",
      "600-seat covered dining area",
      "Quick access from the pool area",
      "Cashless and card payment",
    ],
    hours: "10:00 – 20:00 WITA",
    location: "Paradis-Q Waterpark, main pool side",
  },
];
