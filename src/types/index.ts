import type { Metadata } from "next";
import type { ReactNode } from "react";

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
  href: string;
  /** Optional sub-entries: rendered as a dropdown on desktop, accordion on mobile. */
  children?: NavItem[];
};

export type SocialLink = {
  label: string;
  href: string;
  /** lucide-react icon key, resolved in the UI layer. */
  icon: SocialIconName;
};

export type SocialIconName = "instagram" | "facebook" | "youtube" | "linkedin" | "twitter";

export type SectionBackgroundConfig =
  | {
      type: "video";
      /** Video file path, lazily attached once the section approaches the viewport. */
      src: string;
      /** Shown before the video is ready (avoids an empty frame). */
      poster: string;
      /** Extra Tailwind classes layered on top of the media. */
      overlayClassName?: string;
    }
  | {
      type: "image-loop";
      src: string;
      alt: string;
      loopVariant: "pan" | "zoom";
      overlayClassName?: string;
    };

export type Stat = {
  value: string;
  label: string;
};

/** Content of the living video band on the home page (the video twin of ImageBand). */
export type VideoBandContent = {
  id: string;
  /** Video path; scrubbed by scroll while the band is pinned (reversible). */
  src: string;
  /** Shown before the footage is ready and for reduced-motion visitors. */
  poster: ImageAsset;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  /**
   * Optional frame crop for footage that carries browser chrome (screen recordings):
   * the frame is scaled around this origin so only the page area stays visible.
   */
  crop?: { scale: number; origin: string };
};

export type HighlightSlide = {
  id: string;
  /** Short label rendered inside the clickable chip indicator. */
  chip: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  href: string;
  ctaLabel: string;
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

export type Work = {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  category: "hotel" | "waterpark" | "resort" | "mixed-use";
  summary: string;
  image: ImageAsset;
  metrics: { label: string; value: string }[];
  scope: string[];
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

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Optional: falls back to a branded monogram avatar when omitted. */
  image?: ImageAsset;
  linkedin?: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional: real guest portraits are not available yet — omit rather than fake one. */
  image?: ImageAsset;
};

export type FacilityShowcase = {
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
  icon: string;
  hours: string;
};

/** A business unit (outlet) that operates inside a building. */
export type UnitOutlet = {
  slug: string;
  name: string;
  /** Short type label, e.g. "Restoran", "Gym", "Spa". */
  type: string;
  tagline: string;
  summary: string;
  description: string[];
  image: ImageAsset;
  gallery: ImageAsset[];
  features: string[];
  specs: { label: string; value: string }[];
  hours: string;
  priceFrom?: string;
};

/** A building owned by the group, plus the business units operating inside it. */
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
  /** Business units inside this building. May be empty for single-purpose sites. */
  outlets: UnitOutlet[];
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

export type LegalLink = {
  label: string;
  href: string;
};

export type LayoutSlot = {
  children: ReactNode;
  params?: Promise<Record<string, string>>;
} & Record<string, unknown>;

export type MetadataFactory = (input?: { title?: string; description?: string }) => Metadata;
