import type { NavItem } from "@/types";

/**
 * Helpers for the navigation tree.
 *
 * `MAIN_NAV` is a tree, not a flat list: group entries such as "Dining" carry no route of
 * their own and only exist to reveal their children. Active-state detection therefore has
 * to walk the whole subtree, not just the top level.
 */

/** Matches a route against a pathname using the same prefix rule the navbar has always used. */
function matchesHref(href: string | undefined, pathname: string) {
  if (!href) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** True when the pathname belongs to this entry or to any of its descendants. */
export function navItemIsActive(item: NavItem, pathname: string): boolean {
  if (matchesHref(item.href, pathname)) return true;
  return item.children?.some((child) => navItemIsActive(child, pathname)) ?? false;
}

/** Stable React key for a nav entry; group headers have no href to key on. */
export function navItemKey(item: NavItem): string {
  return item.href ?? item.children?.[0]?.href ?? item.label;
}

/** True when the entry only groups children and has no page of its own. */
export function isNavGroup(item: NavItem): boolean {
  return Boolean(item.children?.length) && !item.href;
}
