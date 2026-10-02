import { SITE } from "@/lib/constants";

export const contactChannelsEn = [
  {
    label: "Reservations & Rooms",
    value: SITE.contact.phone,
    href: `tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`,
    description: "Available daily 07.00 – 22.00 WITA",
    icon: "Phone" as const,
  },
  {
    label: "WhatsApp Concierge",
    value: SITE.contact.whatsapp,
    href: `https://wa.me/${SITE.contact.whatsapp.replace(/[^\d]/g, "").replace(/^0/, "62")}`,
    description: "Average response under 10 minutes",
    icon: "MessageCircle" as const,
  },
  {
    label: "General Email",
    value: SITE.contact.email,
    href: `mailto:${SITE.contact.email}`,
    description: "For general enquiries and partnerships",
    icon: "Mail" as const,
  },
  {
    label: "MICE & Events",
    value: SITE.contact.reservationEmail,
    href: `mailto:${SITE.contact.reservationEmail}`,
    description: "Event proposals sent within 2 working days",
    icon: "CalendarCheck" as const,
  },
];

export const departmentContactsEn = [
  {
    name: "Room & Package Reservations",
    email: "reservation@quburesort.id",
    phone: "+62 361 8899 1200",
    hours: "Daily 07.00 – 22.00 WITA",
  },
  {
    name: "Waterpark & Tickets",
    email: "waterpark@quburesort.id",
    phone: "+62 361 8899 1250",
    hours: "Daily 09.00 – 18.00 WITA",
  },
  {
    name: "MICE & Convention Centre",
    email: "event@quburesort.id",
    phone: "+62 361 8899 1270",
    hours: "Monday – Friday 09.00 – 17.00 WITA",
  },
  {
    name: "Partnerships & Investor Relations",
    email: "partnership@quburesort.id",
    phone: "+62 361 8899 1290",
    hours: "Monday – Friday 09.00 – 17.00 WIB",
  },
  {
    name: "Careers & Recruitment",
    email: "career@quburesort.id",
    phone: "+62 361 8899 1295",
    hours: "Monday – Friday 09.00 – 17.00 WITA",
  },
];

export const interestOptionsEn = [
  "Room / stay package reservations",
  "Waterpark tickets",
  "MICE, conferences, & weddings",
  "Spa & wellness",
  "Business partnership / investor",
  "Media & press",
  "Other",
];

export const contactFaqsEn = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in starts at 14.00 WITA and check-out is at 12.00 WITA. Suite guests receive late check-out until 15.00 WITA at no extra charge, subject to room availability.",
  },
  {
    question: "Can waterpark tickets be purchased at the counter?",
    answer:
      "Yes, but we recommend buying online because daily capacity is limited to 4,500 visitors. Online purchases are also cheaper and let you skip the queue at the entrance.",
  },
  {
    question: "Is airport transfer service available?",
    answer:
      "Yes. Private transfer service is available 24 hours with a fleet of Alphard, Hiace Premio, or 45-seat buses. Bookings must be made at least two hours before departure through the concierge.",
  },
  {
    question: "Is the precinct child- and toddler-friendly?",
    answer:
      "Very much so. There is a Toddler Lagoon with a solar-heated shallow pool, a lactation room, baby chairs in all restaurants, and a kids club with a 1:6 companion ratio.",
  },
  {
    question: "What is the reservation cancellation policy?",
    answer:
      "Free cancellation up to 72 hours before the arrival date. Cancellations after that incur a one-night charge, while no-shows are charged a full night.",
  },
];

export const officeLocationsEn = [
  {
    name: "Head Office & Qubu Resort",
    address: "Jl. Pantai Q No. 88, Tanjung Benoa, Badung, Bali 80361",
    mapsUrl: "https://maps.google.com/?q=Tanjung+Benoa+Badung+Bali",
    image: {
      src: "/images/qubu-resort-1.jpeg",
      alt: "Entrance gate to the Qubu Resort precinct",
    },
  },
  {
    name: "Paradis Q & Beach Club",
    address: "Kawasan Qubu Resort, Tanjung Benoa, Badung, Bali 80361",
    mapsUrl: "https://maps.google.com/?q=Tanjung+Benoa+Waterpark+Bali",
    image: {
      src: "/images/paradis-q-1.jpeg",
      alt: "Covered area within the Paradis Q precinct",
    },
  },
  {
    name: "Jakarta Regional Office",
    address: "Menara Q, Lantai 18, Jl. Jend. Sudirman Kav. 52, Jakarta 12190",
    mapsUrl: "https://maps.google.com/?q=Sudirman+Jakarta",
    image: {
      src: "/images/hotel-q-1.jpeg",
      alt: "Hotel Q building within the Qubu Resort precinct",
    },
  },
];
