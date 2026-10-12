"use client";

import type Lenis from "lenis";

/**
 * Imperative bridge from the navigation menus to the global smooth scroller.
 *
 * In-page links ("/unit-bisnis/qubu-suites#kids-club") must not be left to the browser:
 * the fixed navbar's own router navigation resolves them with `history.pushState`,
 * which fires no `hashchange`, and while Lenis is active it also forces
 * `scroll-behavior: auto !important`, so a native jump would land with no animation and
 * at the wrong offset. The menus therefore route the click through here.
 *
 * `SmoothScrollProvider` registers its instance once; without one (reduced motion, or
 * before hydration) the helper falls back to the platform's own scrolling.
 */

/** Room the fixed navbar occupies, so an anchored section is not hidden behind it. */
const NAVBAR_OFFSET = 96;

let lenisInstance: Lenis | null = null;

/** Called by `SmoothScrollProvider` whenever its Lenis instance mounts or unmounts. */
export function registerLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

function anchorTarget(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!id) return null;
  return document.getElementById(decodeURIComponent(id));
}

/**
 * Scrolls to `#hash` on the current page.
 *
 * Returns false when there is no such element, so the caller can fall back to a normal
 * navigation rather than swallowing the click.
 */
export function scrollToAnchor(hash: string): boolean {
  const target = anchorTarget(hash);
  if (!target) return false;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -NAVBAR_OFFSET });
  } else {
    target.scrollIntoView({ block: "start" });
  }

  return true;
}

/**
 * Applies a link to the current page: updates the URL and scrolls, without a router
 * navigation and without a reload.
 */
export function jumpToAnchor(href: string) {
  const hashIndex = href.indexOf("#");
  const hash = href.slice(hashIndex);

  window.history.pushState(null, "", href);
  scrollToAnchor(hash);
  window.dispatchEvent(new Event("hashchange"));
}