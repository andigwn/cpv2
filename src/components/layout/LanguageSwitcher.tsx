"use client";

import { cn } from "@/lib/utils";
import { useLanguage, useLanguageStore } from "@/i18n/useLanguage";
import { useT } from "@/i18n/useTranslation";

type LanguageSwitcherProps = {
  /** Light treatment for the transparent navbar over dark hero photography. */
  overHero?: boolean;
  className?: string;
};

/**
 * ID / EN toggle. The choice is applied instantly (no reload) and persisted by the
 * language store, so it survives page changes and reloads.
 */
export function LanguageSwitcher({ overHero = false, className }: LanguageSwitcherProps) {
  const language = useLanguage();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const t = useT();

  const options = [
    { code: "id" as const, label: t("nav.indonesianShort"), aria: t("nav.switchToIndonesian") },
    { code: "en" as const, label: t("nav.englishShort"), aria: t("nav.switchToEnglish") },
  ];

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5 transition-colors duration-300",
        overHero ? "border-white/40 bg-white/15 backdrop-blur-md" : "border-ink-200 bg-white/80",
        className,
      )}
    >
      {options.map((option) => {
        const active = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            aria-label={option.aria}
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] transition-colors duration-300",
              active
                ? overHero
                  ? "bg-white text-ink-900"
                  : "bg-lagoon-600 text-white"
                : overHero
                  ? "text-white/80 hover:text-white"
                  : "text-ink-500 hover:text-ink-800",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
