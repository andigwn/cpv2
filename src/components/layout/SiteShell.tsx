"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useLanguageSync } from "@/i18n/useLanguage";
import { useT } from "@/i18n/useTranslation";

/**
 * Client shell around every page: smooth scroll, intro preloader, navbar, route
 * transitions and footer. Kept as one component so `app/layout.tsx` can stay a server
 * component that owns metadata.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const { isLoading, hasLoaded, finish } = useLoaderStore();
  const hydrated = useIsHydrated();
  const t = useT();

  // Rehydrate the persisted language and keep <html lang> in sync.
  useLanguageSync();

  useEffect(() => {
    // Failsafe: never trap the visitor behind the intro for more than 2.4s.
    const failsafe = setTimeout(finish, 2400);
    return () => clearTimeout(failsafe);
  }, [finish]);

  const handleFinish = useCallback(() => finish(), [finish]);

  return (
    <SmoothScrollProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-900 focus:shadow-lg"
      >
        {t("a11y.skipToContent")}
      </a>
      {hydrated && isLoading && !hasLoaded ? <Preloader onFinish={handleFinish} /> : null}
      <ScrollProgressBar />
      <Navbar />
      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </SmoothScrollProvider>
  );
}
