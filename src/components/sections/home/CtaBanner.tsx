"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Phone, Sparkles } from "lucide-react";
import { SITE } from "@/lib/constants";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { SectionBackground } from "@/components/animations/SectionBackground";

/**
 * Full-width call-to-action band with an animated photo background
 * (prd.md section 4a — this is the section type meant for a video loop in production).
 */
export function CtaBanner() {
  return (
    <section id="cta" className="relative overflow-hidden py-24 lg:py-32">
      <SectionBackground {...sectionBackgrounds.homeCta} />

      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/70 bg-white/85 px-6 py-12 text-center shadow-[0_40px_100px_-60px_rgba(19,25,34,0.55)] backdrop-blur-md sm:px-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sunshine-100 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.2em] text-sunshine-800 uppercase">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Paket terbatas musim ini
          </span>

          <h2 className="mt-6 text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Siap merencanakan liburan cerah berikutnya?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-600">
            Tim reservasi kami membantu menyusun paket menginap, tiket waterpark, hingga agenda
            MICE dalam satu penawaran. Respons rata-rata di bawah 10 menit pada jam operasional.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              icon={<CalendarCheck className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              Minta penawaran
            </Button>
            <Button
              href={`tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`}
              size="lg"
              variant="outline"
              icon={<Phone className="h-4 w-4" aria-hidden />}
              iconPosition="left"
            >
              {SITE.contact.phone}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-500">
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
              Pembatalan gratis hingga 72 jam sebelum kedatangan
            </span>
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-lagoon-600" aria-hidden />
              Harga terbaik untuk pemesanan langsung
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
