"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "./translate";

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const STORAGE_KEY = "qubu-language";

/**
 * Language preference store.
 *
 * Indonesian is the default. The choice is persisted in localStorage and rehydrated
 * after mount (see `useLanguageSync`) so the server-rendered HTML and the first client
 * render agree — no hydration mismatch — while the switch itself is instant after that.
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "id",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set({ language: get().language === "id" ? "en" : "id" }),
    }),
    {
      name: STORAGE_KEY,
      skipHydration: true,
    },
  ),
);

export function useLanguage(): Language {
  return useLanguageStore((state) => state.language);
}

/**
 * Rehydrates the stored preference once and keeps `<html lang>` in sync with the
 * active language. Mounted once by `SiteShell`.
 */
export function useLanguageSync() {
  const language = useLanguage();

  useEffect(() => {
    if (!useLanguageStore.persist.hasHydrated()) {
      void useLanguageStore.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
}
