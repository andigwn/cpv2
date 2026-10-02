"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RoomImageSlider } from "@/components/ui/RoomImageSlider";
import { PageHero } from "@/components/sections/PageHero";
import { ContentBand } from "@/components/sections/ContentBand";
import { ImageBand } from "@/components/sections/ImageBand";
import { useDiningVenues } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

type DiningPageContentProps = {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
};

/**
 * Dining page (route: /dining).
 *
 * Patio Bistro and Embun Resto live here — moved from the Hotel Q and Hotel Qubu Suites
 * pages — each with its own photo slider, hours, location, and a reservation CTA.
 */
export function DiningPageContent({ heroBackground }: DiningPageContentProps) {
  const t = useT();
  const diningVenues = useDiningVenues();

  return (
    <>
      <PageHero
        eyebrow={t("dining.heroEyebrow")}
        title={t("dining.heroTitle")}
        description={t("dining.heroDescription")}
        background={heroBackground}
        breadcrumbs={[{ label: t("common.home"), href: "/" }, { label: t("nav.dining") }]}
      >
        <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
          {t("dining.reserveCta")}
        </Button>
      </PageHero>

      <ContentBand>
        <SectionTitle
          eyebrow={t("dining.listEyebrow")}
          title={t("dining.listTitle")}
          description={t("dining.listDescription")}
          className="max-w-2xl"
        />

        <div className="mt-12 flex flex-col gap-16">
          {diningVenues.map((venue, index) => (
            <motion.article
              key={venue.slug}
              id={venue.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={staggerItem}
              className="grid scroll-mt-32 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={
                  "relative aspect-4/3 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/70 shadow-[0_30px_80px_-60px_rgba(19,25,34,0.6)] " +
                  (index % 2 === 1 ? "lg:order-2" : "")
                }
              >
                <RoomImageSlider
                  slides={venue.gallery}
                  sizes="(max-width: 1023px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lagoon-700 inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
                    <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                    {venue.type}
                  </span>
                </div>

                <h3 className="font-display text-ink-900 text-3xl font-bold sm:text-4xl">
                  {venue.name}
                </h3>
                <p className="text-ink-600 text-base leading-relaxed">{venue.description}</p>

                <ul className="flex flex-wrap gap-2">
                  {venue.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-ink-200/80 text-ink-600 inline-flex items-center gap-1.5 rounded-full border bg-white/70 px-3 py-1.5 text-xs"
                    >
                      <Check className="text-leaf-600 h-3.5 w-3.5" aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                <dl className="text-ink-600 flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-2 font-semibold">
                      <Clock className="text-lagoon-600 h-4 w-4" aria-hidden />
                      {t("dining.hoursLabel")}
                    </dt>
                    <dd>{venue.hours}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="flex items-center gap-2 font-semibold">
                      <MapPin className="text-lagoon-600 h-4 w-4" aria-hidden />
                      {t("dining.locationLabel")}
                    </dt>
                    <dd>{venue.location}</dd>
                  </div>
                </dl>

                <div className="mt-2">
                  <Button href="/contact" variant="outline" size="md">
                    {t("dining.reserveCta")}
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </ContentBand>

      <ImageBand
        image={
          diningVenues[0]?.gallery[1] ??
          diningVenues[0]?.image ?? {
            src: "/images/patio-2.jpeg",
            alt: "Suasana makan malam di restoran kawasan Q",
          }
        }
        caption={t("dining.bandCaption")}
      />

      <ContentBand>
        <SectionTitle
          eyebrow={t("dining.ctaEyebrow")}
          title={t("dining.ctaTitle")}
          description={t("dining.ctaDescription")}
          align="center"
          className="mx-auto"
        />
        <div className="mt-8 flex justify-center">
          <Button href="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            {t("dining.ctaButton")}
          </Button>
        </div>
      </ContentBand>
    </>
  );
}
