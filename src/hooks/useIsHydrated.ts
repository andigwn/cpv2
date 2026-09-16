"use client";

import { useSyncExternalStore } from "react";

/** No-op subscription: hydration never changes again, we only need the snapshot split. */
const subscribe = () => () => {};

/**
 * True only after the client has hydrated.
 * Uses `useSyncExternalStore` so the server snapshot (false) and the client snapshot
 * (true) can differ without triggering a hydration mismatch warning.
 */
export function useIsHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
