/** Shared shapes used across the content layer (`src/data`) and the UI. */

export type ImageAsset = {
  /** Public path or remote URL. */
  src: string;
  /** Always descriptive: required for accessibility + SEO. */
  alt: string;
  /** Optional blur placeholder (base64) for `next/image`. */
  blurDataURL?: string;
};

export type NavItem = {
  label: string;
  /** Dot-path key in `src/i18n/translations.ts`; falls back to `label` when omitted. */
  labelKey?: string;
  /**
   * Target route. Omitted for pure group headers (e.g. "Dining" in the Destinasi
   * menu) which only exist to reveal their own `children` on hover / tap.
   */
  href?: string;
  /** Optional sub-entries: rendered as a dropdown on desktop, accordion on mobile. */
  children?: NavItem[];
};

/**
 * A nav entry that always points at a route. Used where a group header would be
 * meaningless — footer columns and the 404 page index.
 */
export type NavLinkItem = NavItem & { href: string };

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon key, resolved in the UI layer. */
  icon: SocialIconName;
};

export type SocialIconName = "instagram" | "facebook" | "youtube" | "linkedin" | "twitter";

export type SectionBackgroundConfig = {
  src: string;
  alt: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ServiceCategory = "hotel" | "waterpark" | "wellness" | "events" | "dining";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  category: ServiceCategory;
  summary: string;
  description: string[];
  image: ImageAsset;
  gallery: ImageAsset[];
  /** Feature bullets shown on the detail page. */
  features: string[];
  /** Operational details (capacity, hours, location). */
  specs: { label: string; value: string }[];
  priceFrom: string;
  featured: boolean;
};

export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: "Promo" | "Event" | "Corporate" | "Facility" | "Sustainability";
  publishedAt: string;
  readingMinutes: number;
  author: string;
  image: ImageAsset;
  featured: boolean;
  tags: string[];
};

/** A supporting facility shown on a business-unit page (no separate route). */
export type UnitFacility = {
  slug: string;
  name: string;
  /** Short type label, e.g. "Restoran", "Bar", "Meeting Room". */
  type: string;
  description: string;
  /** Optional: text-only cards are valid for facilities without official photography. */
  image?: ImageAsset;
};

/** A dining venue, rendered on its own page under /dining/[slug]. */
export type DiningVenue = {
  slug: string;
  name: string;
  /** Short type label, e.g. "Restoran", "All-day Dining". */
  type: string;
  description: string;
  image: ImageAsset;
  /** Photos used by the venue gallery. */
  gallery: ImageAsset[];
  /** Short selling points shown as chips. */
  features: string[];
  hours: string;
  location: string;
};

/** A room category offered by a lodging business unit. */
export type RoomType = {
  slug: string;
  name: string;
  description: string;
  /** Lead photo for the room card. Falls back to the unit photo when omitted. */
  image?: ImageAsset;
  /**
   * Extra photos shown in the card's automatic slider. When omitted (or a single
   * photo) the card renders the still image without a slider.
   */
  images?: ImageAsset[];
  /** Floor area, e.g. "28 m2". */
  size?: string;
  /** Bed configuration, e.g. "1 King atau 2 Single". */
  bed?: string;
  /** Occupancy, e.g. "2 tamu". */
  capacity?: string;
  /** Main outlook, e.g. "Garden view". */
  view?: string;
  /** Short selling points shown as chips on the card. */
  features?: string[];
};

/** A business unit owned by the group, with its rooms, facilities and gallery. */
export type BusinessUnit = {
  slug: string;
  name: string;
  /** Short type label shown as the eyebrow, e.g. "Hotel", "Convention Center". */
  type: string;
  tagline: string;
  summary: string;
  description: string[];
  image: ImageAsset;
  gallery: ImageAsset[];
  features: string[];
  specs: { label: string; value: string }[];
  hours: string;
  /** Room/venue/pool categories; shown in the unit page and the nav menu. */
  roomTypes?: RoomType[];
  /** Section label for `roomTypes`: "Jenis Kamar", "Jenis Ruangan" or "Jenis Kolam". */
  roomTypesLabel?: string;
  /** Localized plural noun for `roomTypes`, used in generated headings e.g. "kamar"/"rooms". */
  roomTypesNoun?: string;
  /** Supporting facilities shown on the page (restaurants, spa, meeting rooms, ...). */
  facilities: UnitFacility[];
};

export type JobOpening = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
};
