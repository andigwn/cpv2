import type { BusinessUnit } from "@/types";

/**
 * English mirror of the Indonesian business-unit data in `src/data/units.ts`.
 * Slugs, image paths, numbers, and ordering are identical; only human-readable
 * strings are translated.
 */
export const businessUnitsEn: BusinessUnit[] = [
  {
    slug: "qubu-suites",
    name: "Hotel Qubu Suites",
    type: "Hotel & Suites",
    tagline: "Suites with private balconies, a bar lounge, and a spa",
    summary:
      "The suite wing of the Q area with private balconies, 24-hour butler service, and Qubiq Bar, spa, and family facilities all in one building.",
    description: [
      "Hotel Qubu Suites occupies the west wing of the Q area with 144 suites divided into five types: Deluxe, Deluxe with View, Suite Room, Family Suite, and Qubu Grand Suite.",
      "All suites feature pocket-spring mattresses, organic cotton linens, and private balconies overlooking the tropical garden or Benoa Bay. Suite guests receive Executive Lounge access for private breakfast and 24-hour butler service.",
      "The building also houses Qubiq Bar, Meeting Room, Spa & Wellness Center, Entertainment Room, and Kids Club, so guests never need to leave the suite wing to relax or let the children play.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Hotel Qubu Suites room with a king bed and carved wooden panels",
    },
    gallery: [
      {
        src: "/images/qubu-suites-1.jpeg",
        alt: "Hotel Qubu Suites room with a king bed and carved wooden panels",
      },
      {
        src: "/images/qubu-suites-2.jpeg",
        alt: "Suite room with a work desk, lounge chair, and large window",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Kitchenette and minibar area inside a Hotel Qubu Suites suite",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Suite living room with a sofa, dining table, and television",
      },
      {
        src: "/images/embun-1.jpeg",
        alt: "Embun Signature Restaurant with a buffet area and black marble tables",
      },
      {
        src: "/images/spa-gym-1.jpeg",
        alt: "Two treatment beds at the Qubu Spa & Wellness Center",
      },
      {
        src: "/images/work-sky-lounge.jpg",
        alt: "Bar lounge with a seating area and a bottle shelf facing the sea",
      },
      {
        src: "/images/service-ballroom.jpg",
        alt: "Meeting room with rows of chairs and a high ceiling",
      },
      {
        src: "/images/work-lobby.jpg",
        alt: "Lounge with red sofas and wooden tables",
      },
      {
        src: "/images/service-kids-club.jpg",
        alt: "Kids play area with a slide and colourful frames",
      },
    ],
    features: [
      "144 suites in five types",
      "Private balconies in most suites",
      "24-hour butler service",
      "Executive Lounge access for private breakfast",
      "Qubiq Bar and Entertainment Room",
      "Spa & Wellness Center and Kids Club",
    ],
    specs: [
      { label: "Number of suites", value: "144 suites" },
      { label: "Room types", value: "5 categories" },
      { label: "Room size", value: "48 – 160 m2" },
      { label: "Check-in / out", value: "14:00 / 12:00 WITA" },
      { label: "Signature facilities", value: "Qubiq Bar, Spa, Kids Club" },
      { label: "Location", value: "Q area, west wing" },
    ],
    hours: "24-hour reception",
    roomTypesLabel: "Room Types",
    roomTypesNoun: "rooms",
    roomTypes: [
      {
        slug: "deluxe",
        name: "Deluxe",
        description:
          "Deluxe room with a king bed, work desk, and warm lighting for two guests.",
        image: {
          src: "/images/qubu-suites-2.jpeg",
          alt: "Deluxe room with a king bed and a work desk facing the window",
        },
        images: [
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Deluxe room with a king bed and a work desk facing the window",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Deluxe living area with a sofa, dining table, and television",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Deluxe room with a sofa and a wide window",
          },
        ],
        size: "48 m2",
        bed: "1 King or 2 Singles",
        capacity: "2 guests",
        view: "Garden view",
        features: [
          "AC and smart TV",
          "Bathroom with shower",
          "Mini bar and safety box",
          "Private balcony",
        ],
      },
      {
        slug: "deluxe-with-view",
        name: "Deluxe with View",
        description:
          "Upper-floor deluxe room with a balcony overlooking the tropical garden or Benoa Bay.",
        image: {
          src: "/images/qubu-suites-1.jpeg",
          alt: "Deluxe with View room with a king bed and carved wooden panels",
        },
        images: [
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Deluxe with View room with a king bed and carved wooden panels",
          },
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Deluxe with View room with a work desk and large window",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Deluxe with View room with a wavy headboard panel",
          },
        ],
        size: "52 m2",
        bed: "1 King",
        capacity: "2 guests + 1 child",
        view: "Garden or Benoa Bay",
        features: [
          "Private balcony with a view",
          "Seating area",
          "Mini fridge and coffee machine",
          "Executive Lounge access",
        ],
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "One-bedroom suite with a separate living room, dining table, and Executive Lounge access.",
        image: {
          src: "/images/qubu-suites-4.jpeg",
          alt: "Suite Room living room with a sofa and dining table",
        },
        images: [
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Suite Room living room with a sofa and dining table",
          },
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Suite Room with a king bed and carved wooden panels",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Suite Room with a wavy headboard panel",
          },
        ],
        size: "64 m2",
        bed: "1 King",
        capacity: "2 guests",
        view: "Garden view",
        features: [
          "Separate living room",
          "Private balcony",
          "Executive Lounge access",
          "24-hour butler service",
        ],
      },
      {
        slug: "family-suite",
        name: "Family Suite",
        description:
          "Family suite with a kitchenette and shared living room for up to four guests.",
        image: {
          src: "/images/qubu-suites-3.jpeg",
          alt: "Kitchenette and minibar area in a Family Suite at Hotel Qubu Suites",
        },
        images: [
          {
            src: "/images/qubu-suites-3.jpeg",
            alt: "Kitchenette and minibar area in a Family Suite at Hotel Qubu Suites",
          },
          {
            src: "/images/qubu-suites-2.jpeg",
            alt: "Family Suite room with a work desk and large window",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Family Suite living room with a sofa and dining table",
          },
        ],
        size: "96 m2",
        bed: "1 King + 2 Single",
        capacity: "4 guests",
        view: "Tropical garden",
        features: [
          "Shared living room",
          "Kitchenette",
          "Children's amenities available",
          "Executive Lounge access",
        ],
      },
      {
        slug: "qubu-grand-suite",
        name: "Qubu Grand Suite",
        description:
          "The largest suite with a separate living room and dining room plus a panoramic balcony.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Qubu Grand Suite with a seating area and a bed facing a large window",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Qubu Grand Suite with a seating area and a bed facing a large window",
          },
          {
            src: "/images/qubu-suites-1.jpeg",
            alt: "Qubu Grand Suite bedroom with a king bed and carved wooden panels",
          },
          {
            src: "/images/qubu-suites-4.jpeg",
            alt: "Qubu Grand Suite living room with a sofa and dining table",
          },
        ],
        size: "160 m2",
        bed: "1 King",
        capacity: "2 – 4 guests",
        view: "Benoa Bay panorama",
        features: [
          "Separate living room and dining room",
          "Panoramic balcony",
          "24-hour butler service",
          "Executive Lounge access",
        ],
      },
    ],
    facilities: [
      {
        slug: "qubiq-bar",
        name: "Qubiq Bar",
        type: "Bar & Lounge",
        description:
          "Bar lounge with tropical cocktails, a wine selection, and small bites, open every afternoon into the evening.",
        image: {
          src: "/images/work-sky-lounge.jpg",
          alt: "Bar lounge with a seating area and a bottle shelf facing the sea",
        },
      },
      {
        slug: "meeting-room",
        name: "Meeting Room",
        type: "Meeting Room",
        description:
          "Meeting room with a projector, sound system, and round-table setups for corporate meetings and private events.",
        image: {
          src: "/images/service-ballroom.jpg",
          alt: "Meeting room with rows of chairs and a high ceiling",
        },
      },
      {
        slug: "spa-wellness-center",
        name: "Spa & Wellness Center",
        type: "Spa & Wellness",
        description:
          "Eight treatment rooms, an infrared sauna, a hydrotherapy pool, and house-blended botanical products.",
        image: {
          src: "/images/spa-gym-1.jpeg",
          alt: "Two treatment beds at the Qubu Spa & Wellness Center",
        },
      },
      {
        slug: "entertainment-room",
        name: "Entertainment Room",
        type: "Entertainment Room",
        description:
          "Entertainment room with a billiard table, karaoke, and game consoles for adult guests and families alike.",
        image: {
          src: "/images/work-lobby.jpg",
          alt: "Lounge with red sofas and wooden tables",
        },
      },
      {
        slug: "kids-club",
        name: "Kids Club",
        type: "Kids Club",
        description:
          "Kids play area with certified supervisors, daily activities, and a 1:6 supervision ratio.",
        image: {
          src: "/images/service-kids-club.jpg",
          alt: "Kids play area with a slide and colourful frames",
        },
      },
    ],
  },
  {
    slug: "hotel-q",
    name: "Hotel Q",
    type: "Hotel",
    tagline: "Superior to Suite rooms in the main building of the Q area",
    summary:
      "The main building of the Q area with five room types, an adult pool and a kids pool, plus pedestrian access to The Q Hall and Paradis-Q.",
    description: [
      "Hotel Q is the main building of the Q area and the entry point for most guests. It offers five room types: Superior, Superior Plus, Premier, Premier Plus, and Suite Room.",
      "An atrium-style lobby connects the reception, lobby lounge, and tourist information centre for guests newly arrived in the Q area.",
      "Supporting facilities include an adult pool and kids pool, a fitness centre, a meeting room, and a covered pedestrian walkway to The Q Hall and Paradis-Q.",
    ],
    image: {
      src: "/images/hotel-q-1.jpeg",
      alt: "Hotel Q facade with layered red and white geometric lattice",
    },
    gallery: [
      {
        src: "/images/hotel-q-2.jpeg",
        alt: "Hotel Q room with a large bed and elephant-shaped towels",
      },
      {
        src: "/images/hotel-q-1.jpeg",
        alt: "Hotel Q facade with layered red and white geometric lattice",
      },
      {
        src: "/images/hero-hotel-room.jpg",
        alt: "Hotel room with a sofa, large bed, and wide window",
      },
      {
        src: "/images/work-suite.jpg",
        alt: "Hotel room with a large bed and a wavy headboard panel",
      },
      {
        src: "/images/patio-1.jpeg",
        alt: "Patio Bistro interior with wooden tables and a bottle shelf",
      },
      {
        src: "/images/patio-2.jpeg",
        alt: "Dinner atmosphere at Patio Bistro with a wooden ceiling",
      },
      {
        src: "/images/service-ballroom.jpg",
        alt: "Meeting room with rows of chairs and a high ceiling",
      },
    ],
    features: [
      "Five room types for couples and families",
      "Adult pool and kids pool",
      "Meeting room for small gatherings",
      "24-hour fitness centre",
      "Lobby lounge and tourist information centre",
      "Covered pedestrian walkway to The Q Hall and Paradis-Q",
    ],
    specs: [
      { label: "Number of rooms", value: "268 rooms" },
      { label: "Room types", value: "5 categories" },
      { label: "Room size", value: "24 – 56 m2" },
      { label: "Check-in / out", value: "14:00 / 12:00 WITA" },
      { label: "Signature facilities", value: "Adult Pool & Meeting Room" },
      { label: "Location", value: "Q area, Tanjung Benoa" },
    ],
    hours: "24-hour reception",
    roomTypesLabel: "Room Types",
    roomTypesNoun: "rooms",
    roomTypes: [
      {
        slug: "superior",
        name: "Superior",
        description:
          "Hotel Q's entry-level room type with full amenities for two guests and access to the entire Q area.",
        image: {
          src: "/images/hotel-q-2.jpeg",
          alt: "Superior room at Hotel Q with a large bed and elephant-shaped towels",
        },
        images: [
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Superior room at Hotel Q with a large bed and elephant-shaped towels",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Superior room with a sofa, large bed, and wide window",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Superior room with a wavy headboard panel",
          },
        ],
        size: "24 m2",
        bed: "1 King or 2 Singles",
        capacity: "2 guests",
        view: "City or garden",
        features: [
          "AC and smart TV",
          "Bathroom with shower",
          "Mini bar and safety box",
          "Adult pool & kids pool access",
        ],
      },
      {
        slug: "superior-plus",
        name: "Superior Plus",
        description:
          "A larger superior room with a seating area, work desk, and large window.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Superior Plus room with a sofa, large bed, and wide window",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Superior Plus room with a sofa, large bed, and wide window",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Superior Plus room with a large bed",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Superior Plus room with a wavy headboard panel",
          },
        ],
        size: "28 m2",
        bed: "1 King",
        capacity: "2 guests + 1 child",
        view: "Pool view",
        features: [
          "Extra seating area",
          "Private balcony",
          "Coffee maker and mini bar",
          "Adult pool & kids pool access",
        ],
      },
      {
        slug: "premier",
        name: "Premier",
        description:
          "Premier room with a large bed, wooden panels, and more generous space.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Premier room with a large bed and a wavy headboard panel",
        },
        images: [
          {
            src: "/images/work-suite.jpg",
            alt: "Premier room with a large bed and a wavy headboard panel",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Premier room with a sofa and a wide window",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Premier room with a large bed and towel decorations",
          },
        ],
        size: "32 m2",
        bed: "1 King",
        capacity: "3 guests",
        view: "Garden view",
        features: [
          "Work area and vanity desk",
          "Mini fridge and coffee machine",
          "Bathrobe and slippers",
          "Adult pool & kids pool access",
        ],
      },
      {
        slug: "premier-plus",
        name: "Premier Plus",
        description:
          "Premier room with an extra seating area and pool or garden views of the Q area.",
        image: {
          src: "/images/hero-hotel-room.jpg",
          alt: "Premier Plus room with a sofa and a bed facing a large window",
        },
        images: [
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Premier Plus room with a sofa and a bed facing a large window",
          },
          {
            src: "/images/work-suite.jpg",
            alt: "Premier Plus room with a large bed and a wavy panel",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Premier Plus room with a large bed and towel decorations",
          },
        ],
        size: "36 m2",
        bed: "1 King",
        capacity: "2 guests + 1 child",
        view: "Pool & garden view",
        features: [
          "Extra seating area",
          "Private balcony",
          "Coffee maker and mini bar",
          "Adult pool & kids pool access",
        ],
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "One-bedroom suite with a small living room and the most generous space at Hotel Q.",
        image: {
          src: "/images/work-suite.jpg",
          alt: "Suite Room with a large bed and seating area at Hotel Q",
        },
        images: [
          {
            src: "/images/work-suite.jpg",
            alt: "Suite Room with a large bed and seating area at Hotel Q",
          },
          {
            src: "/images/hero-hotel-room.jpg",
            alt: "Suite Room living room with a sofa and a wide window",
          },
          {
            src: "/images/hotel-q-2.jpeg",
            alt: "Suite Room at Hotel Q with a large bed",
          },
        ],
        size: "56 m2",
        bed: "1 King",
        capacity: "2 guests + 2 children",
        view: "Pool view",
        features: [
          "Separate living room",
          "Private balcony",
          "24-hour room service",
          "Adult pool & kids pool access",
        ],
      },
    ],
    facilities: [
      {
        slug: "meeting-room",
        name: "Meeting Room",
        type: "Meeting Room",
        description:
          "Meeting room with a projector and sound system for corporate meetings and small-scale private events.",
        image: {
          src: "/images/service-ballroom.jpg",
          alt: "Meeting room with rows of chairs and a high ceiling",
        },
      },
    ],
  },
  {
    slug: "qhall",
    name: "The Q Hall Convention Center",
    type: "Convention Center",
    tagline: "A pillar-free ballroom and six versatile meeting rooms",
    summary:
      "A convention centre with a pillar-free ballroom, pre-function lounge, and a technical event team for conferences, exhibitions, and large-scale weddings.",
    description: [
      "The Q Hall Convention Center is designed for conferences, exhibitions, and large-scale weddings. Its main ballroom is pillar-free with a 9-metre ceiling height and can be divided into three independent rooms.",
      "Six meeting rooms — Merbau, Lontar, Pulai, The Q Hall Floor 1, Mahoni, and Mahoni Outdoor — are available for parallel sessions, banquets, and private events with varying capacities.",
      "The Q Hall event team handles technical planning, catering for thousands of pax, and accommodation coordination for delegates staying at Hotel Q and Hotel Qubu Suites.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "The Q Hall Convention Center facade with a decorative wire canopy",
    },
    gallery: [
      {
        src: "/images/qhall-1.jpeg",
        alt: "The Q Hall Convention Center facade with a decorative wire canopy",
      },
      {
        src: "/images/qhall-2.jpeg",
        alt: "Merbau room with rows of chairs and a red patterned carpet",
      },
      {
        src: "/images/qhall-3.jpeg",
        alt: "Lontar room with round tables and a patterned red carpet",
      },
      {
        src: "/images/qhall-4.jpeg",
        alt: "Pulai room with classroom table setup and chandeliers",
      },
      {
        src: "/images/qhall-5.jpeg",
        alt: "Mahoni room with a flower-decorated aisle and chandeliers",
      },
      {
        src: "/images/qhall-6.jpeg",
        alt: "The Q Hall Floor 1 with round tables, red carpet, and gold chandeliers",
      },
      {
        src: "/images/mahoni-1.jpeg",
        alt: "Mahoni room with round tables and pink-draped chairs",
      },
      {
        src: "/images/mahoni-2.jpeg",
        alt: "Mahoni Outdoor room with balloon decorations and an event stage",
      },
    ],
    features: [
      "Pillar-free ballroom with a 9-metre ceiling",
      "Can be divided into three independent rooms",
      "Six versatile meeting rooms",
      "Pre-function lounge for receptions and exhibitions",
      "Integrated LED screens, audio system, and rigging",
      "Catering for thousands of pax with a halal kitchen",
    ],
    specs: [
      { label: "Ballroom", value: "1,800 m2" },
      { label: "Meeting rooms", value: "6 rooms" },
      { label: "Ceiling", value: "9 metres, pillar-free" },
      { label: "Banquet capacity", value: "1,200 pax" },
      { label: "Theatre capacity", value: "1,500 delegates" },
      { label: "Location", value: "Q area, east wing" },
    ],
    hours: "Flexible according to the event schedule",
    roomTypesLabel: "Venue Types",
    roomTypesNoun: "venues",
    roomTypes: [
      {
        slug: "merbau",
        name: "Merbau",
        description:
          "The largest meeting room with theatre or classroom setups and the signature patterned carpet of Q Hall.",
        image: {
          src: "/images/qhall-2.jpeg",
          alt: "Merbau room with rows of chairs and a red patterned carpet",
        },
        images: [
          {
            src: "/images/qhall-2.jpeg",
            alt: "Merbau room with rows of chairs and a red patterned carpet",
          },
          {
            src: "/images/qhall-4.jpeg",
            alt: "Merbau room with classroom table setup and chandeliers",
          },
          {
            src: "/images/qhall-6.jpeg",
            alt: "Merbau room with round tables, red carpet, and gold chandeliers",
          },
        ],
        size: "500 m2",
        capacity: "400 delegates",
        features: [
          "Theatre, classroom, or banquet setups",
          "LED screen and sound system",
          "Direct access door to the pre-function lounge",
        ],
      },
      {
        slug: "lontar",
        name: "Lontar",
        description:
          "Banquet room with round tables for gala dinners, receptions, and delegate dinners.",
        image: {
          src: "/images/qhall-3.jpeg",
          alt: "Lontar room with round tables and a patterned red carpet",
        },
        images: [
          {
            src: "/images/qhall-3.jpeg",
            alt: "Lontar room with round tables and a patterned red carpet",
          },
          {
            src: "/images/qhall-6.jpeg",
            alt: "Banquet room with round tables and gold chandeliers",
          },
          {
            src: "/images/qhall-2.jpeg",
            alt: "Lontar room with chair setup and a red patterned carpet",
          },
        ],
        size: "380 m2",
        capacity: "300 guests",
        features: [
          "Round-table banquet setup",
          "Close to the catering kitchen",
          "Holding room for the bridal couple",
        ],
      },
      {
        slug: "pulai",
        name: "Pulai",
        description:
          "Meeting room with classroom table setup and warm lighting for parallel conference sessions.",
        image: {
          src: "/images/qhall-4.jpeg",
          alt: "Pulai room with classroom table setup and chandeliers",
        },
        images: [
          {
            src: "/images/qhall-4.jpeg",
            alt: "Pulai room with classroom table setup and chandeliers",
          },
          {
            src: "/images/qhall-2.jpeg",
            alt: "Pulai room with rows of chairs and a red carpet",
          },
          {
            src: "/images/qhall-3.jpeg",
            alt: "Pulai room with round tables and a patterned carpet",
          },
        ],
        size: "240 m2",
        capacity: "180 attendees",
        features: [
          "Classroom or U-shape setup",
          "Projector and screen",
          "Connection to other breakout rooms",
        ],
      },
      {
        slug: "the-q-hall-lantai-1",
        name: "The Q Hall Floor 1",
        description:
          "Main ground-floor hall for exhibitions, conventions, and large banquets with a high ceiling.",
        image: {
          src: "/images/qhall-6.jpeg",
          alt: "The Q Hall Floor 1 with round tables, red carpet, and gold chandeliers",
        },
        images: [
          {
            src: "/images/qhall-6.jpeg",
            alt: "The Q Hall Floor 1 with round tables, red carpet, and gold chandeliers",
          },
          {
            src: "/images/qhall-3.jpeg",
            alt: "The Q Hall Floor 1 with round tables and a red carpet",
          },
          {
            src: "/images/qhall-4.jpeg",
            alt: "The Q Hall Floor 1 with classroom table setup",
          },
        ],
        size: "1,200 m2",
        capacity: "1,200 guests",
        features: [
          "Loading dock access",
          "Can be combined with the main ballroom",
          "Rigging and three-phase power",
        ],
      },
      {
        slug: "mahoni",
        name: "Mahoni",
        description:
          "Meeting and banquet room with round-table setups and draped chairs for private events.",
        image: {
          src: "/images/mahoni-1.jpeg",
          alt: "Mahoni room with round tables and pink-draped chairs",
        },
        images: [
          {
            src: "/images/mahoni-1.jpeg",
            alt: "Mahoni room with round tables and pink-draped chairs",
          },
          {
            src: "/images/mahoni-2.jpeg",
            alt: "Mahoni room with event decorations and a stage",
          },
          {
            src: "/images/qhall-5.jpeg",
            alt: "Banquet room with a flower-decorated aisle and chandeliers",
          },
        ],
        size: "320 m2",
        capacity: "240 guests",
        features: [
          "Banquet and seminar setups",
          "Projector and small stage",
          "Kitchen connected to Q Hall catering",
        ],
      },
      {
        slug: "mahoni-outdoor",
        name: "Mahoni Outdoor",
        description:
          "Semi-open area beside Mahoni for casual events, birthdays, and garden-themed receptions.",
        image: {
          src: "/images/mahoni-2.jpeg",
          alt: "Mahoni Outdoor room with balloon decorations and an event stage",
        },
        images: [
          {
            src: "/images/mahoni-2.jpeg",
            alt: "Mahoni Outdoor room with balloon decorations and an event stage",
          },
          {
            src: "/images/mahoni-1.jpeg",
            alt: "Mahoni Outdoor room with round tables and draped chairs",
          },
          {
            src: "/images/qhall-5.jpeg",
            alt: "Semi-open area with a flower-decorated aisle",
          },
        ],
        size: "260 m2",
        capacity: "200 guests",
        features: [
          "Flexible decorative stage",
          "Open-air ventilation",
          "Great for family events",
        ],
      },
    ],
    facilities: [],
  },
  {
    slug: "paradis-q",
    name: "Paradis-Q Waterpark",
    type: "Waterpark",
    tagline: "A wave pool, lazy river, and a 22-metre slide tower",
    summary:
      "A family waterpark with five main pool areas, a slide tower, plus Food Corner and Rooftop Q within the area.",
    description: [
      "Paradis-Q Waterpark is the heart of the family holiday experience in the Q area. Five main pool areas serve every age, from a 20 cm-deep kids pool to a 1,100 m2 wave pool and a 22-metre slide tower.",
      "The entire area uses a closed-circulation filtration system with water quality monitoring every two hours, and is guarded by Bronze Medallion-certified lifeguards patrolling in shifts.",
      "Supporting facilities include lockers, warm-water shower rooms, a lactation room, Food Corner, and Rooftop Q with direct views of the pool area.",
    ],
    image: {
      src: "/images/thower_slide_1.jpg",
      alt: "Colourful 22-metre slide tower at Paradis-Q Waterpark",
    },
    gallery: [
      {
        src: "/images/thower_slide_1.jpg",
        alt: "Colourful slide tower with yellow, blue, and green lanes",
      },
      {
        src: "/images/kolam_ombak_2.jpg",
        alt: "Visitors playing in the wave pool with green inner tubes",
      },
      {
        src: "/images/kolam_arus_1.jpg",
        alt: "Lazy river channel between rocks and greenery",
      },
      {
        src: "/images/kolam_anak_1.jpg",
        alt: "Water play structure with small slides and a tipping bucket at the kids pool",
      },
      {
        src: "/images/semi_olympic_2.jpg",
        alt: "Semi-olympic pool lanes with lane ropes and swimming visitors",
      },
      {
        src: "/images/thower_slide_2.jpg",
        alt: "Tower slide with water splashes and a rocky cliff theme",
      },
      {
        src: "/images/thower_slide_3.jpg",
        alt: "Wide view of the waterpark with its slide tower and pools",
      },
      {
        src: "/images/kolam_ombak_1.jpg",
        alt: "Wave pool with waves and palm trees along the edge",
      },
      {
        src: "/images/kolam_ombak_3.jpg",
        alt: "Crowded wave pool beneath palm trees",
      },
      {
        src: "/images/kolam_arus_2.jpg",
        alt: "Visitors floating in the lazy river with yellow inner tubes",
      },
      {
        src: "/images/kolam_arus_3.jpg",
        alt: "Winding lazy river channel between rocks",
      },
      {
        src: "/images/kolam_anak_2.jpg",
        alt: "Kids pool with a tipping bucket and small slides",
      },
      {
        src: "/images/kolam_anak_3.jpg",
        alt: "Giant bucket pouring water in the kids pool play area",
      },
      {
        src: "/images/semi_olympic_1.jpg",
        alt: "Semi-olympic pool with swimming visitors and a patterned deck",
      },
      {
        src: "/images/semi_olympic_3.jpg",
        alt: "Large pool facing the building and tropical garden",
      },
    ],
    features: [
      "1,100 m2 wave pool with scheduled waves",
      "260-metre lazy river",
      "22-metre slide tower",
      "Kids pool with a depth of 20 – 40 cm",
      "Certified lifeguards with regular monitoring",
      "Food Corner and Rooftop Q within the area",
    ],
    specs: [
      { label: "Area size", value: "3.4 hectares" },
      { label: "Pool types", value: "5 pool areas" },
      { label: "Daily capacity", value: "4,500 visitors" },
      { label: "Operating hours", value: "09:00 – 18:00 WITA" },
      { label: "Tallest slide", value: "22 metres" },
      { label: "Location", value: "Q area, north side" },
    ],
    hours: "09:00 – 18:00 WITA",
    roomTypesLabel: "Pool Types",
    roomTypesNoun: "pools",
    roomTypes: [
      {
        slug: "kolam-anak",
        name: "Kids Pool",
        description:
          "Shallow solar-heated pool with small slides and lifeguard supervision for toddlers.",
        image: {
          src: "/images/kolam_anak_1.jpg",
          alt: "Water play structure with small slides and a tipping bucket at the kids pool",
        },
        images: [
          {
            src: "/images/kolam_anak_1.jpg",
            alt: "Water play structure with small slides and a tipping bucket at the kids pool",
          },
          {
            src: "/images/kolam_anak_2.jpg",
            alt: "Kids pool with a tipping bucket and small slides",
          },
          {
            src: "/images/kolam_anak_3.jpg",
            alt: "Giant bucket pouring water in the kids pool play area",
          },
        ],
        size: "Depth 20 – 40 cm",
        capacity: "Children & toddlers",
        features: [
          "Warm water from solar heating",
          "Small slides designed for children",
          "Full lifeguard supervision",
        ],
      },
      {
        slug: "semi-olympic",
        name: "Semi Olympic",
        description:
          "Semi-olympic-size pool with six lanes for serious swimming and light training.",
        image: {
          src: "/images/semi_olympic_2.jpg",
          alt: "Semi-olympic pool lanes with lane ropes and swimming visitors",
        },
        images: [
          {
            src: "/images/semi_olympic_2.jpg",
            alt: "Semi-olympic pool lanes with lane ropes and swimming visitors",
          },
          {
            src: "/images/semi_olympic_1.jpg",
            alt: "Semi-olympic pool with swimming visitors and a patterned deck",
          },
          {
            src: "/images/semi_olympic_3.jpg",
            alt: "Semi-olympic pool facing the building and tropical garden",
          },
        ],
        size: "25 metres, 6 lanes",
        capacity: "Adults & teens",
        features: [
          "Depth 1.2 – 1.5 metres",
          "Lanes with clear markers",
          "Start and finish area for training",
        ],
      },
      {
        slug: "kolam-arus",
        name: "Lazy River",
        description:
          "A 260-metre lazy river winding around the waterpark's green area.",
        image: {
          src: "/images/kolam_arus_1.jpg",
          alt: "Lazy river channel between rocks and greenery",
        },
        images: [
          {
            src: "/images/kolam_arus_1.jpg",
            alt: "Lazy river channel between rocks and greenery",
          },
          {
            src: "/images/kolam_arus_2.jpg",
            alt: "Visitors floating in the lazy river with yellow inner tubes",
          },
          {
            src: "/images/kolam_arus_3.jpg",
            alt: "Winding lazy river channel between rocks",
          },
        ],
        size: "260 metres",
        capacity: "All ages",
        features: [
          "Gentle current along a circular route",
          "Inner tubes available",
          "Exit points in several zones",
        ],
      },
      {
        slug: "kolam-ombak",
        name: "Wave Pool",
        description:
          "A 1,100 m2 wave pool with scheduled waves every session.",
        image: {
          src: "/images/kolam_ombak_2.jpg",
          alt: "Visitors playing in the wave pool with green inner tubes",
        },
        images: [
          {
            src: "/images/kolam_ombak_2.jpg",
            alt: "Visitors playing in the wave pool with green inner tubes",
          },
          {
            src: "/images/kolam_ombak_1.jpg",
            alt: "Wave pool with waves and palm trees along the edge",
          },
          {
            src: "/images/kolam_ombak_3.jpg",
            alt: "Crowded wave pool beneath palm trees",
          },
        ],
        size: "1,100 m2",
        capacity: "All ages",
        features: [
          "Scheduled waves every session",
          "Gradual depth 0.3 – 1.5 metres",
          "Poolside seating area",
        ],
      },
      {
        slug: "tower-slide",
        name: "Tower Slide",
        description:
          "A 22-metre slide tower with a racer slide and bowl slide for adrenaline seekers.",
        image: {
          src: "/images/thower_slide_1.jpg",
          alt: "Colourful slide tower with a pool below",
        },
        images: [
          {
            src: "/images/thower_slide_1.jpg",
            alt: "Colourful slide tower with a pool below",
          },
          {
            src: "/images/thower_slide_2.jpg",
            alt: "Tower slide with water splashes and a rocky cliff theme",
          },
          {
            src: "/images/thower_slide_3.jpg",
            alt: "Wide view of the waterpark with its slide tower and pools",
          },
        ],
        size: "Height 22 metres",
        capacity: "Minimum height 120 cm",
        features: [
          "Multi-lane racer slide",
          "Bowl slide for one or two riders",
          "Height check at the entrance",
        ],
      },
    ],
    facilities: [
      {
        slug: "food-corner",
        name: "Food Corner",
        type: "Food Court",
        description:
          "Food court with eight Indonesian-themed tenants and a covered dining area for waterpark visitors.",
        image: {
          src: "/images/service-restaurant.jpg",
          alt: "Dining area with tables and chairs facing the sea",
        },
      },
      {
        slug: "rooftop-q",
        name: "Rooftop Q",
        type: "Rooftop Venue",
        description:
          "Versatile rooftop for private events, banquets, and weddings with direct views of the waterpark area.",
        image: {
          src: "/images/q-rooftop-1.jpeg",
          alt: "Rooftop Q with a flower-decorated aisle and round tables",
        },
      },
    ],
  },
  {
    slug: "villa",
    name: "Villa Town House",
    type: "Villa",
    tagline: "Six private two-storey villas with their own pools and kitchens",
    summary:
      "Six private villas with two to four bedrooms, private pools, kitchens, and villa host service.",
    description: [
      "Villa Town House consists of six private two-storey units with two to four bedrooms, each with its own private pool, kitchen, and dining area.",
      "Each villa has a villa host who takes care of guest needs, from transportation and catering to scheduling family activities.",
      "The villas suit large families, small groups, and guests on long stays who need more privacy.",
    ],
    image: {
      src: "/images/villa-5.jpeg",
      alt: "Orange two-storey Villa Town House facade",
    },
    gallery: [
      {
        src: "/images/villa-5.jpeg",
        alt: "Orange two-storey Villa Town House facade",
      },
      {
        src: "/images/villa-1.jpeg",
        alt: "Villa bedroom with a wooden wardrobe and vanity desk",
      },
      {
        src: "/images/villa-6.jpeg",
        alt: "Villa bedroom with two twin beds and wooden floors",
      },
      {
        src: "/images/villa-7.jpeg",
        alt: "Villa kids bedroom with bunk beds and colourful rugs",
      },
      {
        src: "/images/villa-2.jpeg",
        alt: "Villa family room with a yellow sofa and wooden stairs",
      },
      {
        src: "/images/villa-3.jpeg",
        alt: "Villa dining room with a wooden table and kitchenette",
      },
      {
        src: "/images/villa-4.jpeg",
        alt: "Villa balcony with iron railings overlooking the garden and pool",
      },
    ],
    features: [
      "Six private villas, 2 to 4 bedrooms",
      "Private pool and full kitchen",
      "Villa host for daily needs",
      "Private catering on request",
      "In-area shuttle service",
    ],
    specs: [
      { label: "Number of villas", value: "6 units" },
      { label: "Bedrooms", value: "2 – 4 rooms per villa" },
      { label: "Capacity", value: "4 – 10 guests per villa" },
      { label: "Check-in / out", value: "14:00 / 12:00 WITA" },
      { label: "Facilities", value: "Private pool, kitchen, villa host" },
      { label: "Location", value: "Q area, south side" },
    ],
    hours: "Check-in 14:00 · Check-out 12:00",
    facilities: [],
  },
];
