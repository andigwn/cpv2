"use client";

import { useCallback, useEffect, type ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { useLoaderStore } from "@/store/useLoaderStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";

/**
 * Client shell around every page: smooth scroll, intro preloader, navbar, route
 * transitions and footer. Kept as one component so `app/layout.tsx` can stay a server
 * component that owns metadata.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const { isLoading, hasLoaded, finish } = useLoaderStore();
  const hydrated = useIsHydrated();

  useEffect(() => {
    // Failsafe: never trap the visitor behind the intro for more than 2.4s.
    const failsafe = setTimeout(finish, 2400);
    return () => clearTimeout(failsafe);
  }, [finish]);

  const handleFinish = useCallback(() => finish(), [finish]);

  return (
    <SmoothScrollProvider>
      {hydrated && isLoading && !hasLoaded ? <Preloader onFinish={handleFinish} /> : null}
      <ScrollProgressBar />
      <Navbar />
      <main id="main" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
