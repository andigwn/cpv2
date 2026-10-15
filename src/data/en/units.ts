import type { BusinessUnit } from "@/types";

/**
 * English mirror of the Indonesian business-unit data in `src/data/units.ts`.
 * Slugs, image paths, numbers, and ordering are identical; only human-readable
 * strings are translated.
 */
export const businessUnitsEn: BusinessUnit[] = [
  {
    slug: "qubu-suites",
    name: "Qubu Suites Hotel",
    type: "Hotel & Suites",
    tagline:
      "Qubu Suites Hotel offers a stay that blends modern comfort with the calm of nature, creating a space to rest, unwind, and enjoy every moment more meaningfully.",
    homeTagline:
      "88 rooms that blend modern comfort with a calm atmosphere — the best place to rest after a full day of activities.",
    summary:
      "Enjoy a special stay at Qubu Suites Hotel, with comfortable rooms, private balconies, and complete facilities to relax together as a family.",
    description: [
      "Qubu Suites Hotel offers a comfortable stay across five room types: Deluxe, Deluxe with View, Suite Room, Family Suite, and Qubu Grand Suite.",
      "Every room is designed with a modern, comfortable atmosphere, complete with a private balcony and facilities that support your needs during the stay. The range of rooms makes Qubu Suites suitable for business trips, family holidays, or simply taking time to rest.",
      "Beyond the comfort of the rooms, Qubu Suites also offers a range of facilities within one area — restaurants, wellness & spa, Kids Club, an entertainment room, and meeting rooms. Everything is designed so you can enjoy more experiences without travelling far from the comfort of the hotel.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Hotel Qubu Suites room with a king bed and carved wooden panels",
    },
    heroImage: {
      src: "/images/qubu-suites-2.jpeg",
      alt: "Hotel Qubu Suites suite interior with a work desk and a large window",
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
      "88 rooms in five types",
      "A private balcony in every room type",
      "Paradis-Q Waterpark",
      "Embun Resto",
      "Qubik Bar and Entertainment Room",
      "Wellness & Spa and Kids Club",
    ],
    specs: [
      { label: "Number of rooms", value: "88 Rooms" },
      { label: "Room types", value: "5 Room Types" },
      { label: "Room size", value: "27–75 m2" },
      { label: "Check-in / out", value: "14:00/12:00 WIB" },
      {
        label: "Facilities",
        value:
          "Paradis-Q Waterpark, Embun Resto, Qubik Bar, entertainment room, Wellness & Spa, Kids Club.",
      },
    ],
    hours: "24-hour reception",
    roomTypesLabel: "Room Types",
    roomTypesNoun: "rooms",
    roomTypes: [
      {
        slug: "deluxe",
        name: "Deluxe Room",
        description:
          "Deluxe Room is designed to deliver comfort every guest can enjoy. It offers a choice of comfortable Double or Twin beds, a modern bathroom, a functional work area, a 43-inch Smart TV, and high-speed internet access.",
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
        size: "27 m2",
        bed: "Double or Twin size bed",
        capacity: "2 Guests",
        view: "Street view / Garden view",
        location: "Floor 1",
        countRoom: "24 Rooms",
      },
      {
        slug: "deluxe-with-view",
        name: "Deluxe with View",
        description:
          "Deluxe Room with View offers a more special stay on floors 2 and 3, with a view from the room to enjoy throughout your stay. It comes with a choice of Queen or Twin beds, a modern bathroom, a 43-inch Smart TV, a work area, and high-speed internet access.",
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
        size: "27 m2",
        bed: "Double or Twin size bed",
        capacity: "2 Guests",
        view: "Pool view / Nature view",
        location: "Floor 2 & Floor 3",
        countRoom: "50 Rooms",
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Suite Room offers spacious and elegant interiors, designed to give guests who want a special stay that much more comfort. Complete with a living room and pantry, it provides a comfortable space to relax or enjoy time together.",
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
        size: "48 m2",
        bed: "Double size bed",
        capacity: "2 Guests",
        view: "Pool view / Nature view",
        location: "Floors 1, 2 & 3",
        countRoom: "6 Rooms",
      },
      {
        slug: "family-suite",
        name: "Family Suite",
        description:
          "Family Suite offers spacious and comfortable rooms designed specifically for families who want to enjoy their time together with more freedom. With two bedrooms and two bathrooms, every family member gets privacy and comfort — the right choice for larger families who want a comfortable, practical space to stay.",
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
        size: "75 m2",
        bed: "Double & Twin Size bed",
        capacity: "4 Guests",
        view: "Pool view / Nature view",
        location: "Floor 1 & Floor 2",
        countRoom: "3 Rooms",
      },
      {
        slug: "qubu-grand-suite",
        name: "Qubu Grand Suite",
        description:
          "Qubu Grand Suite is the most spacious and exclusive room type at Qubu Suites Hotel, offering elegant interiors with premium facilities for a special stay. Complete with a bathtub overlooking the waterpark, a comfortable living room, and a spacious walk-in closet, every space is designed to deliver comfort and privacy in one refined experience.",
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
        size: "75 m2",
        bed: "Double & Twin Size bed",
        capacity: "4 Guests",
        view: "Pool / Nature / forest view",
        location: "Floor 3",
        countRoom: "1 Room",
      },
    ],
    facilities: [
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
          "An entertainment room to relax and gather, whether to fill your free time after a busy day or to get together before heading to bed.",
        highlights: [
          "In-hotel entertainment. Practical and easy to access while you stay.",
          "Good for gathering. Suits families, friends, or groups.",
          "A comfortable, relaxed atmosphere. A place to unwind after travelling.",
        ],
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
          "A fun play space for the little ones — ideal right after check-in, between family activities, or before bedtime.",
        highlights: [
          "A cheerful, child-friendly atmosphere.",
          "Play area inside the hotel.",
          "Perfect for family holidays.",
        ],
        note: "Children should be accompanied by a parent or guardian while playing.",
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
    tagline:
      "Hotel Q brings a relaxed atmosphere with a touch of modern style mixed with local accents. With 38 rooms across a range of types, enjoy a comfortable space to rest and recharge.",
    homeTagline:
      "A 4-star hotel with a relaxed atmosphere, modern touches, and local accents — a warm place to stay, whether you are on holiday or travelling for work.",
    summary:
      "Hotel Q offers a relaxed atmosphere with a modern take on lifestyle, mixed with local accents. With 38 rooms across a range of types, Hotel Q is a comfortable place to rest and spend a calmer kind of time.",
    description: [
      "Hotel Q is the main building of the Q area and the entry point for most guests. It offers five room types: Superior, Superior Plus, Premier, Premier Plus, and Suite Room.",
      "An atrium-style lobby connects the reception, lobby lounge, and tourist information centre for guests newly arrived in the Q area.",
      "Supporting facilities include an adult pool and kids pool, a fitness centre, a meeting room, and a covered pedestrian walkway to The Q Hall and Paradis-Q.",
    ],
    image: {
      src: "/images/hotel-q-1.jpeg",
      alt: "Hotel Q facade with layered red and white geometric lattice",
    },
    heroImage: {
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
      { label: "Number of rooms", value: "38 Rooms" },
      { label: "Room types", value: "5 Room Types" },
      { label: "Room size", value: "18-45 m2" },
      { label: "Check-in / out", value: "14:00/12:00 WIB" },
      { label: "Signature facilities", value: "Paradis-Q Waterpark" },
    ],
    hours: "24-hour reception",
    roomTypesLabel: "Room Types",
    roomTypesNoun: "rooms",
    roomTypes: [
      {
        slug: "superior",
        name: "Superior Room",
        description:
          "Enjoy simple yet memorable comfort, in a space designed to deliver a calm and practical stay.",
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
        size: "21 m2",
        bed: "Double or Twin Size bed",
        capacity: "2 Guests",
        view: "Lotus / Teras field / City view",
        location: "Floors 1, 2 and 3",
        countRoom: "Double (17 Rooms) / Twin (11 Rooms)",
      },
      {
        slug: "superior-plus",
        name: "Superior Plus",
        description:
          "More space and more complete comfort — ideal for resting after enjoying the various experiences at Hotel Q.",
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
        size: "24 m2",
        bed: "Double or Twin Size bed",
        capacity: "2 Guests",
        view: "Lotus / Teras field / City view",
        location: "Floors 2 and 3",
        countRoom: "Double (4 Rooms) / Twin (2 Rooms)",
      },
      {
        slug: "premier",
        name: "Premier Room",
        description:
          "With more open space and a more comfortable atmosphere, Premier Room offers a more special stay for every trip.",
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
        size: "36 m2",
        bed: "Double or Twin Size bed",
        capacity: "2 Guests",
        view: "Lotus / Teras field / City view",
        location: "Floors 2 and 3",
        countRoom: "Double (2 Rooms)",
      },
      {
        slug: "premier-plus",
        name: "Premier Plus",
        description:
          "More spacious, more comfortable, and designed to give you room to relax and enjoy your time at Hotel Q.",
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
        size: "45 m2",
        bed: "Double or Twin Size bed",
        capacity: "2 Guests",
        view: "Lotus / Teras field / City view",
        location: "Floor 3",
        countRoom: "King Bed (1 Room)",
      },
      {
        slug: "suite-room",
        name: "Suite Room",
        description:
          "Enjoy a more complete stay with generous space and an area to relax, creating a comfortable setting for moments with the people closest to you.",
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
        size: "40 m2",
        bed: "Double or Twin Size bed",
        capacity: "2 Guests",
        view: "Lotus / Teras field / City view",
        location: "Floor 2",
        countRoom: "King Bed (1 Room)",
      },
    ],
    // No supporting facilities of its own: the meeting room it shares is published on the
    // Qubu Suites page, so the band is dropped from this page rather than duplicated.
    facilities: [],
    showFacilitiesSection: false,
  },
  {
    slug: "qhall",
    name: "The Q Hall Ballroom and Convention Center",
    type: "Ballroom and Convention Center",
    tagline:
      "With a capacity of up to 2,000 guests, The Q Hall Convention Center is a flexible venue for every occasion — from weddings and conferences to meetings, seminars, workshops, and gatherings.",
    homeTagline:
      "A ballroom with capacity for up to 2,000 guests, ready for weddings, conferences, seminars, and company gatherings.",
    summary:
      "A spacious and comfortable venue for your conferences, exhibitions, and weddings, supported by an event team ready to guide you from planning through to event day.",
    description: [
      "The Q Hall's main ballroom covers 1,340 m² and is designed without pillars, so all of your guests can enjoy the event with an unobstructed view. For smaller guest counts, the ballroom can be divided into three standalone rooms.",
      "We also provide six meeting rooms of varying sizes and capacities for parallel sessions, banquets, and private events.",
      "Our event team helps prepare technical requirements, catering for thousands of servings, and accommodation for attendees staying at Hotel Q and Qubu Suites. That way, you can focus on the content of your event.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "The Q Hall Convention Center facade with a decorative wire canopy",
    },
    heroImage: {
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
      "VIP Room / Naratama Room. A dedicated area for special guests. It can be used as a transit room or a preparation space for your special guests.",
      "Integrated LED Videotron screens, audio system, and rigging. Supports large-scale event production.",
      "Catering for thousands of pax from a halal kitchen. Keeps every one of your guests comfortable.",
    ],
    specs: [
      { label: "Main ballroom area", value: "1,340 m²" },
      { label: "Meeting room options", value: "6 rooms" },
      { label: "Banquet capacity", value: "2,000 pax" },
    ],
    hours: "The schedule can be adjusted to your needs",
    roomTypesLabel: "Venue Types",
    roomTypesNoun: "venues",
    roomTypes: [
      {
        slug: "lontar",
        name: "Lontar",
        description:
          "A comfortable banquet room for meetings, receptions, and delegate dinners. Located close to the QHall entrance.",
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
        size: "204 m²",
      },
      {
        slug: "merbau",
        name: "Merbau",
        description:
          "A meeting room with warm lighting for your conference sessions. Setups can be classroom, theatre, or U-shape, with a projector and screen.",
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
        size: "306 m²",
      },
      {
        slug: "pulai",
        name: "Pulai",
        description:
          "The largest meeting room, with theatre, standing, or banquet setups to suit your needs. Can be equipped with an LED Videotron screen and a sound system.",
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
        size: "740 m²",
      },
      {
        slug: "the-q-hall-lantai-1",
        name: "The Q Hall Lantai 1",
        description:
          "The largest main hall on the ground floor, formed by combining three rooms for exhibitions, conventions, and large banquets. Loading dock access and rigging are available.",
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
        size: "1,340 m²",
      },
      {
        slug: "mahoni",
        name: "Mahoni",
        description:
          "A comfortable room for your seminars or private banquets, with banquet or seminar setups. Equipped with a projector and a small stage to complete your event.",
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
        size: "368 m²",
      },
      {
        slug: "mahoni-outdoor",
        name: "Mahoni Outdoor",
        description:
          "A semi-open area with natural airflow, suited to birthdays, family events, and private garden-themed receptions. The decorative stage can be tailored to your concept.",
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
        size: "442 m²",
      },
    ],
    facilities: [],
    sectionCopy: {
      heroCtaLabel: "Discuss Your Event",
      heroNote: "The schedule can be adjusted to your needs",
      profile: {
        eyebrow: "A closer look at The Q Hall",
        title: "A space that helps your event run smoothly",
      },
      rooms: {
        eyebrow: "Venue Options",
        title: "Venue options to match the needs of your event",
        description:
          "Every room differs in size, capacity, and facilities so it can suit your event.",
        ctaLabel: "Ask about availability",
      },
      facilities: {
        eyebrow: "Supporting Facilities",
        title: "Other facilities for a smooth-running event",
        description: "Additional equipment available to make your event more memorable.",
      },
      gallery: {
        eyebrow: "Gallery",
        title: "The Q Hall Ballroom Convention Center gallery",
        description:
          "See what our hall looks like as a reference for planning your best event yet.",
      },
      closing: {
        title: "Ready to plan your event?",
        description:
          "Tell us the date, number of guests, and the concept you have in mind. Our Q Hall team will get to work and make your event unforgettable.",
        ctaLabel: "Contact Us Now",
      },
    },
  },
  {
    slug: "paradis-q",
    name: "Paradis-Q Waterpark",
    type: "Waterpark",
    tagline:
      "Time for fun at Paradis-Q Waterpark! Enjoy the thrill of the wave pool, ride a range of water slides, swim in a leafy area, or simply relax in a gazebo with the family.",
    homeTagline:
      "A family waterpark with a wave pool, a kiddy pool, shaded areas, and gazebos to relax with your loved ones.",
    summary:
      "A water recreation destination for families, offering a range of pools and water attractions for all ages. Find the fun at Paradis Q Waterpark, with water experiences across five pools of different flavours and attractions worth the challenge. Complete with a lounging area and dining options. Make the day more fun by swimming at Paradis Q Waterpark.",
    description: [
      "A water recreation destination for families, offering a range of pools and water attractions for all ages. Find the fun at Paradis Q Waterpark, with water experiences across five pools of different flavours, right through to attractions worth the challenge.",
      "Complete with a lounging area and dining options. Make the day more fun by swimming at Paradis Q Waterpark.",
    ],
    image: {
      src: "/images/thower_slide_1.jpg",
      alt: "Colourful 22-metre slide tower at Paradis-Q Waterpark",
    },
    heroImage: {
      src: "/images/thower_slide_1.jpg",
      alt: "Slide tower and main pool at Paradis-Q Waterpark",
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
      "Five pools with different flavours of fun",
      "Water attractions for an adrenaline hit",
      "A lounging area and dining options",
    ],
    specs: [
      { label: "Number of pools", value: "5 Pools" },
      { label: "Price", value: "Weekday 75,000 & Weekend 125,000" },
      { label: "Operating hours", value: "09:00 – 17:00 WIB" },
      { label: "Free entry", value: "Seniors 60+ & children under 80 cm" },
    ],
    hours: "09:00 – 17:00 WIB",
    roomTypesLabel: "Pool Types",
    roomTypesNoun: "pools",
    roomTypes: [
      {
        slug: "kolam-anak",
        name: "Kids Pool",
        description:
          "A kids pool with plenty of fun attractions and an iconic giant tipping bucket.",
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
        size: "40 CM",
        capacity: "Children & Toddlers",
        specLabels: { size: "Pool Depth", capacity: "Pool Category" },
      },
      {
        slug: "kolam-arus",
        name: "Lazy River",
        description:
          "A lazy river set amid lush greenery, with a gentle current to float along and relax.",
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
        size: "120 CM",
        capacity: "General",
        specLabels: { size: "Pool Depth", capacity: "Pool Category" },
      },
      {
        slug: "semi-olympic",
        name: "Semi Olympic",
        description: "A comfortable semi-Olympic pool for a calmer spell of swimming.",
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
        size: "80 CM – 2 M",
        capacity: "Teens & Adults",
        specLabels: { size: "Pool Depth", capacity: "Pool Category" },
      },
      {
        slug: "kolam-ombak",
        name: "Wave Pool",
        description:
          "An iconic wave pool with waves arriving on a rhythm, delivering thrills you never quite expect.",
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
        size: "0 – 2 M",
        capacity: "General",
        specLabels: { size: "Pool Depth", capacity: "Pool Category" },
      },
      {
        slug: "tower-slide",
        name: "Slide Pool",
        description: "A slide pool with an extreme run for a fully adrenaline-fuelled experience.",
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
        size: "80 CM",
        capacity: "General",
        specLabels: { size: "Pool Depth", capacity: "Pool Category" },
      },
    ],
    facilities: [
      {
        slug: "rooftop-q",
        name: "Rooftop Q",
        type: "Rooftop Venue",
        description:
          "Rooftop Q overlooks the waterpark and offers indoor and semi-outdoor areas, suited to a wide range of events.",
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
    tagline:
      "An accommodation destination at Qubu Resort made up of four two-storey villas, suited to large families or guests who want more privacy.",
    homeTagline:
      "Four two-storey villas for large families or groups who want more privacy.",
    summary:
      "An accommodation destination at Qubu Resort made up of four two-storey villas, suited to large families or guests who want more privacy.",
    description: [
      "An accommodation destination at Qubu Resort made up of four two-storey villas, suited to large families or guests who want more privacy.",
    ],
    image: {
      src: "/images/villa-5.jpeg",
      alt: "Orange two-storey Villa Town House facade",
    },
    heroImage: {
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
      "2 bedrooms + 1 children's room",
      "Mini chiller",
      "Living room",
      "AC and non-smoking",
      "Hot water",
      "Second-floor balcony",
      "Kitchen + free breakfast for 6 people",
      "6 Paradis-Q Waterpark entry tickets",
      "Free Wi-Fi",
      "Free airport / A Yani pick-up and drop-off",
    ],
    specs: [
      { label: "Number of villas", value: "4 Units" },
      { label: "Number of rooms", value: "3 Rooms" },
      { label: "Check-in / out", value: "14:00 / 12:00 WIB" },
    ],
    hours: "Check-in 14:00 · Check-out 12:00",
    facilities: [],
  },
];
