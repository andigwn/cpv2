import type { Metadata } from "next";
import { HomePageContent } from "@/components/sections/home/HomePageContent";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

/**
 * Home route: metadata lives here (server component) while the page rhythm renders in
 * a client component so its copy follows the active language.
 */
export default function HomePage() {
  return <HomePageContent />;
}
