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
      "A signature restaurant at Hotel Qubu Suites with a buffet area, marble tables, and a plant-forward menu overlooking the tropical garden.",
    image: {
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
    features: [
      "140 seats with a buffet area",
      "Plant-forward menu",
      "Buffet breakfast 06:00 – 10:30",
      "Live cooking station",
    ],
    hours: "06:00 – 22:00 WITA",
    location: "Hotel Qubu Suites, ground floor",
  },
];
