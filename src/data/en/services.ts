import type { Service, ServiceCategory } from "@/types";

export const serviceCategoriesEn: { value: ServiceCategory | "all"; label: string }[] = [
  { value: "all", label: "All Services" },
  { value: "hotel", label: "Hotel & Rooms" },
  { value: "waterpark", label: "Waterpark" },
  { value: "wellness", label: "Spa & Wellness" },
  { value: "events", label: "Events & MICE" },
  { value: "dining", label: "Dining" },
];

export const servicesEn: Service[] = [
  {
    slug: "paradis-q",
    name: "Paradis Q Waterpark",
    tagline: "7 water play zones across 3.4 hectares",
    category: "waterpark",
    summary:
      "A family waterpark with 18 slides, a wave pool, a lazy river, and a dedicated water play area for toddlers.",
    description: [
      "Paradis Q is designed as the heart of the family holiday experience in the Q area. Seven themed zones offer a different water play experience for every age, from a 20 cm-deep toddler pool to a 22-metre slide tower.",
      "The entire area uses a closed-loop circulation filtration system with water quality monitored every two hours, and is guarded by 24 Bronze Medallion-certified lifeguards patrolling in shifts.",
      "For family comfort, there are 320 large lockers, a lactation room, warm-water rinse areas, and eight archipelago-themed food trucks within the area.",
    ],
    image: {
      src: "/images/kolam_ombak_2.jpg",
      alt: "Visitors playing in the wave pool at Paradis Q Waterpark",
    },
    gallery: [
      {
        src: "/images/thower_slide_2.jpg",
        alt: "Tower slide with splashing water at Paradis Q Waterpark",
      },
      {
        src: "/images/kolam_ombak_3.jpg",
        alt: "Wave pool with visitors and rows of palm trees",
      },
      {
        src: "/images/kolam_arus_2.jpg",
        alt: "Visitors floating in the lazy river on yellow inner tubes",
      },
    ],
    features: [
      "18 slides including racer and bowl slides",
      "1,100 m² wave pool with scheduled waves",
      "260-metre lazy river",
      "Toddler Lagoon: solar-heated shallow pool",
      "24 internationally certified lifeguards",
      "Closed-loop filtration system + monitoring every 2 hours",
      "320 lockers, warm-water rinse areas, and a lactation room",
      "Eight archipelago-themed food trucks",
    ],
    specs: [
      { label: "Site area", value: "3.4 hectares" },
      { label: "Daily capacity", value: "4,500 visitors" },
      { label: "Operating hours", value: "09:00 – 18:00 WITA" },
      { label: "Tallest slide", value: "22 metres" },
      { label: "Deepest pool", value: "1.5 metres" },
      { label: "Location", value: "Tanjung Benoa, Bali" },
    ],
    priceFrom: "Rp 275,000 / person",
    featured: true,
  },
  {
    slug: "qubu-suites",
    name: "Qubu Suites & Rooms",
    tagline: "412 sea-facing rooms and suites",
    category: "hotel",
    summary:
      "Rooms and suites with private balconies, organic linens, and views of Benoa Bay or the tropical garden.",
    description: [
      "Qubu Suites offers 412 rooms across six categories, from Deluxe Garden View to a three-bedroom Presidential Q Villa with a private pool.",
      "All rooms feature pocket-spring mattresses, 400 thread count organic cotton linens, and large windows to maximise natural light throughout the day.",
      "Suite guests enjoy access to the Executive Lounge for private breakfast, 24-hour butler service, and late check-out until 15:00.",
    ],
    image: {
      src: "/images/qubu-suites-1.jpeg",
      alt: "Qubu Suites hotel suite with a king bed and wooden accents",
    },
    gallery: [
      {
        src: "/images/qubu-suites-2.jpeg",
        alt: "Suite with a seating area and natural lighting",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Suite room with a bed and wooden panels",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Interior detail of a Qubu Suites hotel suite",
      },
    ],
    features: [
      "Six room categories, from Deluxe to Presidential Q Villa",
      "Private balconies in 78% of rooms",
      "400 thread count organic cotton linens",
      "Mini fridge, coffee machine, and complimentary daily drinking water",
      "24-hour butler service for suite categories",
      "Executive Lounge access for private breakfast",
      "Twice-daily housekeeping",
      "300 Mbps fibre Wi-Fi in all rooms",
    ],
    specs: [
      { label: "Number of rooms", value: "412 rooms & suites" },
      { label: "Room categories", value: "6 categories" },
      { label: "Smallest size", value: "42 m²" },
      { label: "Largest size", value: "310 m² (Presidential Villa)" },
      { label: "Check-in / out", value: "14:00 / 12:00 WITA" },
      { label: "Location", value: "Tanjung Benoa, Bali" },
    ],
    priceFrom: "Rp 1,450,000 / night",
    featured: true,
  },
  {
    slug: "beach-club",
    name: "Beach Club",
    tagline: "Sunset deck, cabanas, and tropical cocktails",
    category: "dining",
    summary:
      "A beachfront beach club with private daybeds, an infinity pool, live acoustic music, and a fresh grill menu.",
    description: [
      "Beach Club sits directly on the white sand of Tanjung Benoa with an infinity pool that visually merges with the sea.",
      "There are 24 daybeds and 12 private cabanas available for daily booking, complete with personal waiter service and charging points.",
      "Every day from 17:00, the Sunset Deck hosts live acoustic music and a grill menu featuring the local fishermen's daily catch.",
    ],
    image: {
      src: "/images/service-beach-club.jpg",
      alt: "Beachfront beach club with daybeds and umbrellas during the day",
    },
    gallery: [
      {
        src: "/images/work-beach-club.jpg",
        alt: "Beach club deck facing the blue sea",
      },
      {
        src: "/images/service-sunset-deck.jpg",
        alt: "Sunset deck with lounge chairs facing the sea",
      },
      {
        src: "/images/service-cabana.jpg",
        alt: "Private cabana with white curtains",
      },
    ],
    features: [
      "24 daybeds and 12 private cabanas",
      "Sea-facing infinity pool",
      "Live acoustic daily 17:00 – 21:00",
      "Grill menu with the daily catch",
      "Signature cocktails made with local fruit",
      "Personal waiter service at the daybeds",
      "Direct beach access",
      "Child-friendly with a dedicated menu",
    ],
    specs: [
      { label: "Capacity", value: "420 visitors" },
      { label: "Operating hours", value: "10:00 – 23:00 WITA" },
      { label: "Daybeds", value: "24 units" },
      { label: "Cabanas", value: "12 units" },
      { label: "Dress code", value: "Resort casual" },
      { label: "Location", value: "Tanjung Benoa Beach" },
    ],
    priceFrom: "Rp 150,000 / daybed",
    featured: true,
  },
  {
    slug: "q-spa-wellness",
    name: "Q Spa & Wellness",
    tagline: "Local botanical rituals in 8 treatment rooms",
    category: "wellness",
    summary:
      "A spa with treatments using local botanicals, an infrared sauna, a hydrotherapy pool, and a yoga studio.",
    description: [
      "Q Spa & Wellness combines traditional Balinese massage techniques with botanical formulations blended in-house from our herb garden in Bedugul.",
      "Eight treatment rooms consist of six couples' rooms and two rooms dedicated to sports therapy. Each room is equipped with a private shower and a small terrace overlooking the garden.",
      "Supporting facilities include an infrared sauna, a warm-water hydrotherapy pool, a relaxation room, and a yoga studio with daily morning classes.",
    ],
    image: {
      src: "/images/spa-gym-1.jpeg",
      alt: "Spa treatment room with two beds and natural decor",
    },
    gallery: [
      {
        src: "/images/spa-gym-2.jpeg",
        alt: "Fitness room with treadmills and a dumbbell rack",
      },
      {
        src: "/images/qubu-suites-3.jpeg",
        alt: "Qubu Suites hotel suite where the spa is located",
      },
      {
        src: "/images/qubu-suites-4.jpeg",
        alt: "Interior of Qubu Suites hotel",
      },
    ],
    features: [
      "Eight treatment rooms, including six couples' rooms",
      "In-house botanical products from the Bedugul herb garden",
      "Infrared sauna and hydrotherapy pool",
      "Yoga studio with daily morning classes",
      "24-hour fitness centre with full equipment",
      "Sports therapy with certified physiotherapists",
      "Relaxation room with herbal tea",
      "120-minute couples treatment package",
    ],
    specs: [
      { label: "Number of rooms", value: "8 treatment rooms" },
      { label: "Operating hours", value: "08:00 – 21:00 WITA" },
      { label: "Treatment duration", value: "60 / 90 / 120 minutes" },
      { label: "Daily capacity", value: "96 treatments" },
      { label: "Facilities", value: "Sauna, hydrotherapy, yoga studio" },
      { label: "Location", value: "Qubu Resort, 2nd floor" },
    ],
    priceFrom: "Rp 520,000 / treatment",
    featured: false,
  },
  {
    slug: "dining",
    name: "Q Dining",
    tagline: "Four restaurants, one philosophy of flavour",
    category: "dining",
    summary:
      "Four culinary outlets with different concepts: all-day dining at Resto Patio, banquets and receptions at Mahoni, breakfast and plant-forward menus at Resto Embun, and a food court at Food Corner.",
    description: [
      "Q Dining encompasses four culinary outlets within the Q area, each with a distinct flavour identity yet sharing a commitment to fresh local ingredients.",
      "Resto Patio at Hotel Q is an all-day dining venue with 12 live stations serving Indonesian, Asian, and Western cuisine. The kitchen opens at 06:00 for breakfast and closes at 23:00.",
      "Mahoni at QHall hosts banquets and receptions with a mahogany interior seating 320, while Resto Embun at Qubu Suites offers a breakfast buffet and a plant-forward menu with 40% vegetable-based dishes.",
    ],
    image: {
      src: "/images/patio-1.jpeg",
      alt: "Interior of Resto Patio with wooden tables and a plant shelf",
    },
    gallery: [
      {
        src: "/images/mahoni-1.jpeg",
        alt: "Mahoni banquet room with round tables",
      },
      {
        src: "/images/embun-1.jpeg",
        alt: "Resto Embun with a buffet area and black marble tables",
      },
      {
        src: "/images/q-rooftop-4-indoor.jpeg",
        alt: "Indoor dining room with round tables and a buffet",
      },
    ],
    features: [
      "Four outlets: Resto Patio, Mahoni, Resto Embun, and Food Corner",
      "12 live cooking stations at Resto Patio",
      "Plant-forward menu at Resto Embun",
      "Banquets and receptions for 320 seats at Mahoni",
      "600-seat food court at Food Corner",
      "Breakfast buffet 06:00 – 10:30 at Resto Embun",
      "24-hour in-room dining",
      "Kids' and allergy menu options",
    ],
    specs: [
      { label: "Number of outlets", value: "4 restaurants & food court" },
      { label: "Total seats", value: "1,300 seats" },
      { label: "Operating hours", value: "06:00 – 23:00 WITA" },
      { label: "Breakfast", value: "Buffet 06:00 – 10:30" },
      { label: "In-room dining", value: "24 hours" },
      { label: "Location", value: "Across 4 destinations" },
    ],
    priceFrom: "Rp 185,000 / person",
    featured: false,
  },
  {
    slug: "qhall",
    name: "QHall",
    tagline: "A 1,800 m² ballroom and 8 breakout rooms",
    category: "events",
    summary:
      "A convention centre with a pillar-free ballroom, a pre-function lounge, and a certified technical event team.",
    description: [
      "QHall is designed for large-scale conferences, exhibitions, and weddings. Its main ballroom spans 1,800 m² with no pillars and a 9-metre ceiling height, and can be divided into three independent rooms.",
      "Eight breakout rooms with capacities from 40 to 180 people are available for parallel sessions, equipped with LED screens and integrated audio systems.",
      "Our event team handles technical planning, catering for up to 2,000 pax, and accommodation coordination for delegates staying at our properties.",
    ],
    image: {
      src: "/images/qhall-1.jpeg",
      alt: "QHall facade with a decorative wire canopy",
    },
    gallery: [
      {
        src: "/images/qhall-5.jpeg",
        alt: "QHall ballroom with event decor and chandeliers",
      },
      {
        src: "/images/qhall-2.jpeg",
        alt: "QHall room with event seating arrangements",
      },
      {
        src: "/images/qhall-3.jpeg",
        alt: "QHall interior with a high ceiling",
      },
    ],
    features: [
      "1,800 m² pillar-free ballroom with a 9-metre ceiling",
      "Can be divided into three independent rooms",
      "Eight breakout rooms (40 – 180 people)",
      "620 m² pre-function lounge",
      "Integrated LED screens, audio system, and rigging",
      "Catering for up to 2,000 pax with a halal kitchen",
      "Certified technical event team",
      "Dedicated exhibition loading dock",
    ],
    specs: [
      { label: "Ballroom", value: "1,800 m² (capacity 1,500 delegates)" },
      { label: "Breakout rooms", value: "8 rooms" },
      { label: "Ceiling", value: "9 metres, pillar-free" },
      { label: "Banquet capacity", value: "1,200 pax" },
      { label: "Theatre capacity", value: "1,500 pax" },
      { label: "Location", value: "Qubu Resort, east wing" },
    ],
    priceFrom: "Rp 42,000,000 / day",
    featured: true,
  },
  {
    slug: "kids-club-adventure",
    name: "Kids Club & Adventure",
    tagline: "Daily programmes for our littlest guests",
    category: "wellness",
    summary:
      "A kids club with certified supervisors, creative classes, and an outdoor adventure programme.",
    description: [
      "Kids Club & Adventure provides scheduled daily programmes for children aged 4 to 12, with a maximum supervisor ratio of 1:6.",
      "Activities include cooking classes, upcycled crafts, mangrove planting, and adventure programmes such as a treasure hunt around the resort.",
      "A 240 m² air-conditioned indoor space features a soft play area, a children's library, and a nap room.",
    ],
    image: {
      src: "/images/service-kids-club.jpg",
      alt: "Bright and colourful children's play area",
    },
    gallery: [
      {
        src: "/images/hero-pool-daylight.jpg",
        alt: "Children's pool with lifeguard supervision",
      },
      {
        src: "/images/about-hospitality-team.jpg",
        alt: "Kids club supervisors with children",
      },
      {
        src: "/images/kolam_anak_3.jpg",
        alt: "A giant bucket pouring water in the children's water play area",
      },
    ],
    features: [
      "Daily programme 09:00 – 17:00 WITA",
      "Maximum supervisor ratio of 1:6",
      "First-aid certified supervisors",
      "240 m² air-conditioned room with a soft play area",
      "Cooking and craft classes",
      "Mangrove planting programme",
      "Treasure hunt around the resort",
      "Evening babysitting service (on request)",
    ],
    specs: [
      { label: "Participant age", value: "4 – 12 years" },
      { label: "Supervisor ratio", value: "1 : 6" },
      { label: "Operating hours", value: "09:00 – 17:00 WITA" },
      { label: "Indoor area", value: "240 m²" },
      { label: "Languages", value: "Indonesian & English" },
      { label: "Location", value: "Qubu Resort, garden wing" },
    ],
    priceFrom: "Rp 180,000 / session",
    featured: false,
  },
  {
    slug: "airport-transfer-tour",
    name: "Airport Transfer & Island Tour",
    tagline: "Private transport and island tours",
    category: "hotel",
    summary:
      "Airport transfer service with a private fleet, plus half-day and full-day tour packages.",
    description: [
      "Our private transfer service uses a fleet of Toyota Alphard, Hiace Premio, and 45-seat buses with certified drivers and travel insurance.",
      "The concierge team also curates half-day and full-day tour packages to destinations such as Uluwatu, Ubud, Nusa Penida, and Bedugul, complete with guides speaking Indonesian, English, and Mandarin.",
      "All vehicles are equipped with child seats, mineral water, and Wi-Fi during the journey.",
    ],
    image: {
      src: "/images/service-airport-shuttle.jpg",
      alt: "Airport shuttle vehicle on the road in morning light",
    },
    gallery: [
      {
        src: "/images/about-resort-aerial.jpg",
        alt: "Aerial view of the resort area",
      },
      {
        src: "/images/hero-beach-resort.jpg",
        alt: "Beach at an island tour destination",
      },
      {
        src: "/images/about-heritage.jpg",
        alt: "Traditional Balinese building during a cultural tour",
      },
    ],
    features: [
      "24-hour airport transfers",
      "Fleet of Alphard, Hiace Premio, and 45-seat buses",
      "Certified drivers + travel insurance",
      "Child seats and boosters available",
      "Half-day and full-day tour packages",
      "Guides speaking Indonesian, English, Mandarin",
      "Wi-Fi and mineral water during the journey",
      "Flexible booking up to 2 hours before departure",
    ],
    specs: [
      { label: "Distance from airport", value: "18 km (± 35 minutes)" },
      { label: "Service hours", value: "24 hours" },
      { label: "Fleet capacity", value: "1 – 45 seats" },
      { label: "Tour destinations", value: "12 popular routes" },
      { label: "Guide languages", value: "ID / EN / Mandarin" },
      { label: "Pickup location", value: "I Gusti Ngurah Rai Airport" },
    ],
    priceFrom: "Rp 350,000 / trip",
    featured: false,
  },
];

export const stayPackagesEn = [
  {
    name: "Q Escape",
    nights: 2,
    price: "Rp 3,290,000",
    perks: [
      "2 nights Deluxe Garden View",
      "Breakfast for 2",
      "2-day waterpark tickets",
      "Late check-out 14:00",
    ],
    highlight: false,
  },
  {
    name: "Family Splash",
    nights: 3,
    price: "Rp 6,750,000",
    perks: [
      "3 nights Family Suite",
      "Breakfast for 4",
      "Waterpark + kids club tickets",
      "Family dinner at Resto Patio",
      "30-minute family photo session",
    ],
    highlight: true,
  },
  {
    name: "Wellness Reset",
    nights: 3,
    price: "Rp 7,980,000",
    perks: [
      "3 nights Qubu Suite",
      "3 x 90-minute spa sessions",
      "Private morning yoga class",
      "Plant-forward menu at Resto Embun",
    ],
    highlight: false,
  },
];
