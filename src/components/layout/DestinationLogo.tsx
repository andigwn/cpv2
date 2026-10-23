import Image from "next/image";
import { cn } from "@/lib/utils";

type DestinationIdentity = {
  name: string;
  /** Official artwork in `public/images/`, when the destination has one. */
  logo?: { src: string; width: number; height: number };
  wordmark: string;
  subtitle: string;
};

/** Per-destination logo identities. Each unit gets its own mark + wordmark. */
const LOGOS: Record<string, DestinationIdentity> = {
  "qubu-suites": {
    name: "Hotel Qubu Suites",
    logo: { src: "/images/logo-qubu-suites.png", width: 3322, height: 1556 },
    wordmark: "Qubu Suites",
    subtitle: "Hotel & Suites",
  },
  "hotel-q": {
    name: "Hotel Q",
    logo: { src: "/images/logo-hotel-q.png", width: 2524, height: 1575 },
    wordmark: "Hotel Q",
    subtitle: "Hotel",
  },
  qhall: {
    name: "The Q Hall",
    logo: { src: "/images/logo-the-qhall.png", width: 7304, height: 2188 },
    wordmark: "The Q Hall",
    subtitle: "Convention Center",
  },
  // Wordmarks follow the brand names in the copywriting deck.
  "paradis-q": {
    name: "Paradis-Q Waterpark",
    logo: { src: "/images/logo-paradis-q-waterpark.png", width: 1604, height: 969 },
    wordmark: "Paradis-Q",
    subtitle: "Waterpark",
  },
  villa: { name: "Villa Town House", wordmark: "Villa Town House", subtitle: "Private Villas" },
  "patio-bistro": {
    name: "Patio Bistro",
    logo: { src: "/images/logo-patio.png", width: 4566, height: 2962 },
    wordmark: "Patio Bistro",
    subtitle: "All-day Dining",
  },
  "embun-resto": {
    name: "Embun Resto",
    logo: { src: "/images/logo-embun.png", width: 3508, height: 2480 },
    wordmark: "Embun Resto",
    subtitle: "Signature Restaurant",
  },
  "qubiq-bar": { name: "Qubiq Bar", wordmark: "Qubiq Bar", subtitle: "Bar & Lounge" },
  "food-corner": {
    name: "Food Corner",
    logo: { src: "/images/logo-food-corner.png", width: 7608, height: 3791 },
    wordmark: "Food Corner",
    subtitle: "Food Court",
  },
};

/**
 * Returns the destination slug for a pathname, or null when it is not a destination page.
 * Both destination families share this rule: `/unit-bisnis/<slug>` and `/dining/<slug>`.
 */
export function destinationSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/(?:unit-bisnis|dining)\/([^/]+)/);
  return match ? match[1] : null;
}

/**
 * Destination logo shown in the navbar on destination pages. Where the destination ships an
 * official logo file that artwork is used; the remaining ones fall back to the shared "Q"
 * mark plus the destination's own wordmark.
 *
 * The artwork sits directly on the page like the default logo on the home page — no plate
 * or card behind it — so every destination keeps the same clean navbar treatment.
 */
export function DestinationLogo({
  slug,
  overHero = false,
  className,
}: {
  slug: string;
  overHero?: boolean;
  className?: string;
}) {
  const logo = LOGOS[slug];
  if (!logo) return null;

  if (logo.logo) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src={logo.logo.src}
          alt={logo.name}
          width={logo.logo.width}
          height={logo.logo.height}
          sizes="(min-width: 1280px) 220px, (min-width: 640px) 190px, 150px"
          priority
          className="h-10 w-auto sm:h-12 lg:h-14 xl:h-16"
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)}>
      <QMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display truncate text-[1.05rem] font-bold tracking-[0.01em] uppercase sm:text-[1.2rem]",
            overHero ? "text-white drop-shadow-[0_1px_10px_rgba(19,25,34,0.7)]" : "text-lagoon-700",
          )}
        >
          {logo.wordmark}
        </span>
        <span
          className={cn(
            "mt-0.5 truncate text-[0.42rem] font-semibold tracking-[0.22em] uppercase sm:text-[0.5rem]",
            overHero ? "text-white/75" : "text-ink-500",
          )}
        >
          {logo.subtitle}
        </span>
      </span>
    </span>
  );
}

/** Simplified vector version of the brand's "Q" mark (orange ring, leaf, sun dot). */
function QMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient
          id="destination-logo-ring"
          x1="10"
          y1="6"
          x2="56"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFE52C" />
          <stop offset="0.45" stopColor="#EF723D" />
          <stop offset="1" stopColor="#F98F5D" />
        </linearGradient>
      </defs>
      <circle
        cx="34"
        cy="25"
        r="18"
        fill="none"
        stroke="url(#destination-logo-ring)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="92 26"
        transform="rotate(-36 34 25)"
      />
      <path d="M7 52c4-15 15-25 30-28-2 13-10 22-21 27l-5 3-4-2Z" fill="#0B6C3C" />
      <path d="M14 50c8-10 16-16 25-19-4 10-12 18-21 22l-4-3Z" fill="#8BC91B" />
      <circle cx="49" cy="47" r="5.5" fill="#FFE52C" />
    </svg>
  );
}
