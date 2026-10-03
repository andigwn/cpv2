"use client";

import Link from "next/link";
import { ChevronRight, Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { navItemKey } from "@/lib/nav";
import { useMainNav } from "@/i18n/useNav";
import { useT } from "@/i18n/useTranslation";

export default function NotFound() {
  const t = useT();
  // Group headers such as "Dining" have no page of their own, so they are not listed
  // here as an available destination.
  const navItems = useMainNav().filter((item) => item.href);

  return (
    <>
      <PageHero
        eyebrow={t("notFound.eyebrow")}
        title={t("notFound.title")}
        description={t("notFound.description")}
        background={sectionBackgrounds.detailPage}
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("notFound.eyebrow") }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/" icon={<Home className="h-4 w-4" aria-hidden />} iconPosition="left">
            {t("notFound.backHome")}
          </Button>
          <Button
            href="/services"
            variant="outline"
            icon={<Compass className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            {t("notFound.exploreServices")}
          </Button>
        </div>
      </PageHero>

      <section className="shell relative z-10 py-16">
        <h2 className="text-lg">{t("notFound.available")}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navItems.map((item) => (
            <li key={navItemKey(item)}>
              <Link
                href={item.href!}
                className="group border-ink-200 text-ink-800 hover:border-lagoon-400 hover:text-lagoon-700 flex items-center justify-between rounded-2xl border bg-white/85 px-5 py-4 text-sm font-medium transition-colors"
              >
                {item.label}
                <ChevronRight
                  className="text-ink-300 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
