import type { JobOpening } from "@/types";

/** English mirror of `src/data/careers.ts`. */
export const jobOpeningsEn: JobOpening[] = [
  {
    slug: "front-office-manager",
    title: "Front Office Manager",
    department: "Rooms Division",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Manager",
    description:
      "Lead a 42-person front office team to ensure guest check-in and check-out experiences are fast, warm, and accurate.",
    responsibilities: [
      "Manage 24-hour front office operations, including shift schedules and service standards",
      "Analyse daily occupancy, room revenue, and guest satisfaction reports",
      "Handle escalated guest complaints and ensure follow-up is documented",
      "Train and evaluate 42 front office and concierge team members",
    ],
    requirements: [
      "At least 5 years of front office experience in 4–5 star hotels",
      "2 years in a supervisory or managerial position",
      "Proficient in PMS (Opera or equivalent) and channel manager",
      "Active English; Mandarin is an advantage",
    ],
  },
  {
    slug: "waterpark-operations-supervisor",
    title: "Waterpark Operations Supervisor",
    department: "Paradis Q",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Supervisor",
    description:
      "Oversee the daily operations of the seven-zone waterpark, including ride readiness, water quality, and visitor safety.",
    responsibilities: [
      "Open and close the waterpark area according to the safety checklist",
      "Monitor water quality and the filtration system every two hours",
      "Coordinate 24 lifeguards and rotate surveillance posts",
      "Manage incident reports and monthly evacuation drills",
    ],
    requirements: [
      "Valid lifeguard certification (Bronze Medallion or equivalent)",
      "At least 3 years of waterpark or public swimming pool operations experience",
      "Understanding of pool circulation systems and water chemistry",
      "Willing to work shifts, including weekends and public holidays",
    ],
  },
  {
    slug: "executive-chef",
    title: "Executive Chef",
    department: "Food & Beverage",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Head of Department",
    description:
      "Lead four culinary outlets and the convention centre catering kitchen with a total of 86 kitchen team members.",
    responsibilities: [
      "Develop seasonal menus and control food cost across four outlets",
      "Ensure HACCP standards and halal certification for the main kitchen",
      "Lead the catering kitchen for events of up to 2,000 pax",
      "Develop training programmes for junior chefs and internship programmes",
    ],
    requirements: [
      "At least 8 years of professional kitchen experience, 3 years as Executive Sous Chef or Executive Chef",
      "Experience handling large-scale banquets",
      "Strong understanding of Indonesian archipelago ingredients and modern techniques",
      "Relevant HACCP or food safety certification",
    ],
  },
  {
    slug: "spa-therapist",
    title: "Spa Therapist",
    department: "Q Spa & Wellness",
    location: "Tanjung Benoa, Bali",
    type: "Full-time",
    level: "Staff",
    description:
      "Provide spa treatments based on local botanicals to Q Spa's standards of comfort and hygiene.",
    responsibilities: [
      "Perform body treatments, facials, and massage therapy according to protocol",
      "Maintain the cleanliness and readiness of treatment rooms",
      "Record guest preferences in the guest profile system",
      "Support sales of products and treatment packages",
    ],
    requirements: [
      "Spa school graduate or holder of a massage therapy certificate",
      "At least 1 year of experience in a hotel spa or wellness centre",
      "Friendly, detail-oriented, and comfortable working shift schedules",
      "Basic English for communicating with guests",
    ],
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "Marketing & Communication",
    location: "Denpasar, Bali (Hybrid)",
    type: "Full-time",
    level: "Senior Staff",
    description:
      "Manage digital campaigns for the hotel, waterpark, and convention centre, including social content and ad performance.",
    responsibilities: [
      "Plan and execute Meta, Google, and TikTok Ads campaigns",
      "Manage the content calendar and collaborations with local creators",
      "Analyse the booking funnel and report monthly performance",
      "Collaborate with the reservations team to optimise conversion",
    ],
    requirements: [
      "At least 3 years of digital marketing experience, ideally in hospitality or travel",
      "Proficient in analytics, pixel/tag manager, and basic design tools",
      "Ability to write content in Indonesian and English",
      "Accustomed to working with ROAS targets and data reports",
    ],
  },
  {
    slug: "management-trainee-2026",
    title: "Management Trainee 2026",
    department: "People & Culture",
    location: "Rotation across five destinations",
    type: "Contract",
    level: "Trainee",
    description:
      "A 12-month programme with rotations in rooms, F&B, waterpark operations, and marketing, with mentoring from the board of directors.",
    responsibilities: [
      "Complete rotations across four operational divisions",
      "Work on process improvement projects in each rotation",
      "Support daily operations during peak periods",
      "Present project results to a panel of directors",
    ],
    requirements: [
      "Bachelor's degree in any major, no more than 2 years after graduation",
      "Minimum GPA of 3.20 and active in organisations",
      "Willing to be placed across five destinations during the programme",
      "Active English and good analytical skills",
    ],
  },
];

export const careerBenefitsEn = [
  {
    title: "Family health insurance",
    description: "Inpatient and outpatient coverage for employees, spouses, and two children.",
    icon: "HeartPulse" as const,
  },
  {
    title: "Continuous development",
    description:
      "Annual training budget, professional certification, and a mentoring programme with the board of directors.",
    icon: "GraduationCap" as const,
  },
  {
    title: "Accommodation & transport",
    description: "Staff housing for talent from outside Bali as well as daily shift transfers.",
    icon: "Home" as const,
  },
  {
    title: "Meal & service allowance",
    description: "Daily meal allowance, monthly service charge, and family stay discounts.",
    icon: "UtensilsCrossed" as const,
  },
];

export const hiringStepsEn = [
  {
    step: "01",
    title: "Application & screening",
    description: "Send your CV and portfolio. The People & Culture team responds within 5 working days.",
  },
  {
    step: "02",
    title: "HR interview",
    description: "A 45-minute session to discuss experience, expectations, and work culture.",
  },
  {
    step: "03",
    title: "Technical & user interview",
    description: "A short case study with your prospective direct manager and division head.",
  },
  {
    step: "04",
    title: "Offer & orientation",
    description: "Job offer, reference checks, then a two-week orientation programme.",
  },
];
