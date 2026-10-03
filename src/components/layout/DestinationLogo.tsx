import { cn } from "@/lib/utils";

/** Per-destination logo identities. Each unit gets its own mark + wordmark. */
const LOGOS: Record<string, { wordmark: string; subtitle: string }> = {
  "qubu-suites": { wordmark: "Qubu Suites", subtitle: "Hotel & Suites" },
  "hotel-q": { wordmark: "Hotel Q", subtitle: "Hotel" },
  qhall: { wordmark: "The Q Hall", subtitle: "Convention Center" },
  "paradis-q": { wordmark: "Paradis-Q", subtitle: "Waterpark" },
  villa: { wordmark: "Villa Town House", subtitle: "Private Villas" },
  "patio-bistro": { wordmark: "Patio Bistro", subtitle: "All-day Dining" },
  "embun-resto": { wordmark: "Embun Resto", subtitle: "Signature Restaurant" },
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
 * Destination logo shown in the navbar on destination pages: the shared "Q" mark plus
 * the destination's own wordmark, so every destination reads as its own brand while
 * staying inside the Qubu lockup language.
 */
export function DestinationLogo({ slug, className }: { slug: string; className?: string }) {
  const logo = LOGOS[slug];
  if (!logo) return null;

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 sm:gap-2.5", className)}>
      <QMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-lagoon-700 truncate text-[1.05rem] font-bold tracking-[0.01em] uppercase sm:text-[1.2rem]">
          {logo.wordmark}
        </span>
        <span className="text-ink-500 mt-0.5 truncate text-[0.42rem] font-semibold tracking-[0.22em] uppercase sm:text-[0.5rem]">
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
