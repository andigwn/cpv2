"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { FinaleBand } from "@/components/sections/FinaleBand";
import { useCompanyStats } from "@/i18n/useContent";
import { useT } from "@/i18n/useTranslation";

const closingImage = {
  src: "/images/villa-2.jpeg",
} as const;

/**
 * Closing call to action. Sits on the last pinned photograph instead of a plain canvas:
 * the veil deepens while the page scrolls, then the message rises over it, so the home
 * page ends on the same cinematic beat it opened with.
 */
export function CtaBanner() {
  const t = useT();
  const companyStats = useCompanyStats();

  return (
    <FinaleBand id="cta" image={{ ...closingImage, alt: t("home.closingAlt") }}>
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="text-sunshine-300 inline-flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.4em] uppercase">
          <span aria-hidden className="h-px w-8 bg-current opacity-70" />
          {t("home.ctaEyebrow", { count: companyStats[0].value })}
          <span aria-hidden className="h-px w-8 bg-current opacity-70" />
        </span>

        <h2 className="mt-6 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
          {t("home.ctaTitle")}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80">
          {t("home.ctaDescription")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/contact"
            size="lg"
            icon={<CalendarCheck className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            {t("home.ctaPrimary")}
          </Button>
          <Button
            href={"tel:" + SITE.contact.phone.replace(/[^+\d]/g, "")}
            size="lg"
            variant="light"
            icon={<Phone className="h-4 w-4" aria-hidden />}
            iconPosition="left"
          >
            {SITE.contact.phone}
          </Button>
        </div>
      </motion.div>
    </FinaleBand>
  );
}
