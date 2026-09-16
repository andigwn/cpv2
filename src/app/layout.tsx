import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | Company Profile`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "hotel Bali",
    "resort tepi pantai",
    "waterpark keluarga",
    "convention centre Bali",
    "company profile hospitality",
    "Qubu Resort",
    "Hotel Q",
    "QHall convention centre",
    "Paradis Q waterpark",
    "Hotel Qubu Suites",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: absoluteUrl("/images/og-cover.jpg"),
        width: 1600,
        height: 900,
        alt: "Kolam resort Qubu Resort dengan air biru dan taman tropis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [absoluteUrl("/images/og-cover.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Hospitality",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf7f0",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        {/* Warm the connection for the largest hero photo. */}
        <link rel="preload" as="image" href="/images/hero-resort-pool.jpg" fetchPriority="high" />
      </head>
      <body className="flex min-h-full flex-col bg-sand-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-900 focus:shadow-lg"
        >
          Lewati ke konten utama
        </a>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
