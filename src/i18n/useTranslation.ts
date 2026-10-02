"use client";

import { useMemo } from "react";
import { useLanguage } from "./useLanguage";
import { translate, translateList, type Language, type TranslationVars } from "./translate";

export type Translate = (key: string, vars?: TranslationVars) => string;

/** Translator bound to the active language; re-renders components when it changes. */
export function useT(): Translate {
  const language = useLanguage();
  return useMemo(() => (key: string, vars?: TranslationVars) => translate(language, key, vars), [
    language,
  ]);
}

/** Resolves a dictionary key whose value is a list of strings. */
export function useTList(key: string): string[] {
  const language = useLanguage();
  return useMemo(() => translateList(language, key), [language, key]);
}

/** Locale string for `Intl` helpers such as `formatDate`. */
export function useLocale(): string {
  const language = useLanguage();
  return language === "en" ? "en-GB" : "id-ID";
}

export function useLanguageValue(): Language {
  return useLanguage();
}
