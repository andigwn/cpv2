"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { featuredSlugs, getNewsBySlug } from "@/data/news";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { formatDate } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

const posts = featuredSlugs
  .map((slug) => getNewsBySlug(slug))
  .filter((post): post is NonNullable<typeof post> => Boolean(post));

/**
 * Editorial news grid (5 cards): one hero card plus four compact cards
 * (prd.md section 4 point 4).
 */
export function NewsPreview() {
  const [lead, ...rest] = posts;

  if (!lead) return null;

  return (
    <section id="news" className="relative overflow-hidden py-20 lg:py-28">
      <SectionBackground {...sectionBackgrounds.homeNews} />

      <div className="shell relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Newswire"
            title="Berita, promo, dan agenda terbaru"
            description="Ikuti kabar terbaru dari properti kami — pembukaan fasilitas, program keberlanjutan, hingga promo musiman."
            className="max-w-2xl"
          />
          <Button
            href="/news"
            variant="outline"
            icon={<ArrowRight className="h-4 w-4" aria-hidden />}
            className="shrink-0"
          >
            Semua berita
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Lead story */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_30px_80px_-50px_rgba(19,25,34,0.55)]"
          >
            <Link href={`/news/${lead.slug}`} className="block">
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={lead.image.src}
                  alt={lead.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-900 ease-out group-hover:scale-[1.06]"
                  priority={false}
                />
                <div
                  aria-hidden
                  className="from-ink-900/60 via-ink-900/5 absolute inset-0 bg-linear-to-t to-transparent"
                />
                <span className="text-coral-600 absolute top-5 left-5 rounded-full bg-white/85 px-4 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase backdrop-blur-md">
                  {lead.category}
                </span>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <h3 className="text-2xl leading-tight text-white sm:text-3xl">{lead.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="text-ink-500 flex flex-wrap items-center gap-4 text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {formatDate(lead.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {lead.readingMinutes} menit baca
                  </span>
                </div>
                <p className="text-ink-600 mt-4 text-sm leading-relaxed">{lead.excerpt}</p>
                <span className="text-lagoon-700 mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Baca selengkapnya
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </motion.article>

          {/* Compact list */}
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 4).map((post) => (
              <Card
                key={post.slug}
                variants={staggerItem}
                image={post.image}
                title={post.title}
                eyebrow={post.category}
                href={`/news/${post.slug}`}
                ratio="aspect-[16/9]"
                accent="lagoon"
                className="sm:flex-row lg:flex-row"
                imageClassName="sm:w-2/5 lg:w-2/5"
                meta={
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                    {formatDate(post.publishedAt)}
                  </span>
                }
              />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
