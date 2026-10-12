import type { NavItem } from "@/types";

/**
 * Helpers for the navigation tree.
 *
 * The tree is three levels deep: a destination row (which keeps its own page link) can
 * carry the sections of that page as anchor children, and the "Dining" row is a pure
 * group with no route at all. Active-state detection therefore has to walk the whole
 * subtree, not just the top level.
 */

/**
 * Splits `/route#anchor` into its path and its anchor. Entries without a hash get an
 * empty anchor rather than `undefined`, so callers can compare it unconditionally.
 */
function splitHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1
    ? { path: href, anchor: "" }
    : { path: href.slice(0, hashIndex), anchor: href.slice(hashIndex + 1) };
}

/**
 * Matches a route against the full location, anchor included.
 *
 * A plain route matches on the prefix rule alone. An anchor entry additionally requires
 * its own anchor to be the one in the URL, which keeps sibling sections of the same page
 * from all lighting up at once while you scroll through them.
 */
function matchesHref(href: string | undefined, pathname: string, hash: string) {
  if (!href) return false;
  const { path, anchor } = splitHref(href);
  // A fragment-only link ("#paket") targets the page already on screen.
  if (!path) return hash === "#" + anchor;

  const pathMatches = path === "/" ? pathname === "/" : pathname.startsWith(path);
  return pathMatches && (anchor ? hash === "#" + anchor : true);
}

/**
 * True when the location belongs to this entry or to any of its descendants.
 *
 * `hash` defaults to `""` so callers that only know the pathname keep the old behaviour:
 * anchor entries then never match on their own, and their parent row carries the state.
 */
export function navItemIsActive(item: NavItem, pathname: string, hash = ""): boolean {
  if (matchesHref(item.href, pathname, hash)) return true;
  return item.children?.some((child) => navItemIsActive(child, pathname, hash)) ?? false;
}

/** True when the entry points at a route with an anchor, e.g. "/unit-bisnis/x#kids-club". */
export function isHashHref(href: string | undefined): boolean {
  return Boolean(href?.includes("#"));
}

/**
 * True when a link points at a section of the page already on screen.
 *
 * Used by the nav menus to decide between `<Link>` (client navigation to a new page) and
 * the plain in-page jump, which has to keep working while Lenis owns the scroll position.
 */
export function isSamePageHash(href: string | undefined, pathname: string): boolean {
  if (!href?.includes("#")) return false;
  const { path, anchor } = splitHref(href);
  return Boolean(anchor) && (path === "" || path === pathname);
}

/** Stable React key for a nav entry; group headers have no href to key on. */
export function navItemKey(item: NavItem): string {
  return item.href ?? item.children?.[0]?.href ?? item.label;
}

/** True when the entry only groups children and has no page of its own. */
export function isNavGroup(item: NavItem): boolean {
  return Boolean(item.children?.length) && !item.href;
}

/**
 * Route prefixes whose page opens with a full-bleed dark hero photograph, so the fixed navbar
 * has to stay transparent and light while it sits over them.
 *
 * The index pages are deliberately absent: `/unit-bisnis` still opens on `PageHero`, which
 * veils its photograph into the light canvas and is already designed for dark navbar text.
 * The trailing slash is what makes the prefix specific to a detail page.
 */
const DARK_HERO_ROUTE_PREFIXES = ["/unit-bisnis/", "/dining/"];

export function hasDarkHero(pathname: string) {
  return pathname === "/" || DARK_HERO_ROUTE_PREFIXES.some((route) => pathname.startsWith(route));
}
