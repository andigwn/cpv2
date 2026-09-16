import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind-aware class names, ignoring falsy values. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats an ISO date into a readable Indonesian date. */
export function formatDate(iso: string, locale = "id-ID") {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Builds a `tel:` friendly string. */
export function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Builds a WhatsApp deep link. */
export function toWhatsAppHref(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, "").replace(/^0/, "62");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Clamps a number between a min and max value. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Stable modulo that always returns a positive index (carousel wrap-around). */
export function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

/** Absolute URL helper for metadata / sitemap. */
export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncate(value: string, max = 160) {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}
