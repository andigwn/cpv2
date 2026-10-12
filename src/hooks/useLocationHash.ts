"use client";

import { useEffect, useState } from "react";

/**
 * The current URL fragment, kept in React state.
 *
 * `usePathname` only reports the path, but the navbar's in-page entries — a destination's
 * own rooms and facilities — are addressed by anchor, so active-state needs to react to
 * the fragment as well.
 *
 * The initial value is deliberately empty: reading `window` during render would make the
 * server and client markup disagree. The real value lands in the first effect.
 */
export function useLocationHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return hash;
}