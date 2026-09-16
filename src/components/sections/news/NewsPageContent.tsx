"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock, Search, Tag } from "lucide-react";
import { newsCategories, newsPosts } from "@/data/news";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { cn, formatDate } from "@/lib/utils";
import { staggerItem, viewportOnce } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

type NewsCategory = (typeof newsCategories)[number];

/** Newswire listing with category filter and keyword search (prd.md sitemap: /news). */
export function NewsPageContent({
  heroBackground,
}: {
  heroBackground: (typeof sectionBackgrounds)[keyof typeof sectionBackgrounds];
}) {
  const [category, setCategory] = useState<NewsCategory>("Semua");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return newsPosts.filter((post) => {
      const matchesCategory = category === "Semua" || post.category === category;
      const matchesQuery =
        term.length === 0 ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.includes(term));

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const [lead, ...rest] = filtered;

  return (
    <>
      <PageHero
        eyebrow="Newswire"
        title="Berita, promo, dan agenda Qubu Resort"
        description="Kabar terbaru dari properti kami: pembukaan fasilitas, program keberlanjutan, agenda event, dan penawaran musiman."
        background={heroBackground}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Berita" }]}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-sm">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari berita atau tag…"
              aria-label="Cari berita"
              className="h-12 w-full rounded-full border border-ink-200 bg-white/90 pr-4 pl-11 text-sm text-ink-800 placeholder:text-ink-400 backdrop-blur-md focus:border-lagoon-500 focus:outline-none"
            />
          </div>
        </div>
      </PageHero>

      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.newsGrid} />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SectionTitle
              eyebrow="Kategori"
              title="Pilih topik yang Anda minati"
              className="max-w-xl"
              titleClassName="text-2xl sm:text-3xl"
            />

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori berita">
              {newsCategories.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  isActive={category === item}
                  onClick={() => setCategory(item)}
                />
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-500">
            {filtered.length} artikel ditemukan
            {query ? (
              <>
                {" "}
                untuk pencarian <strong className="text-ink-800">&ldquo;{query}&rdquo;</strong>
              </>
            ) : null}
          </p>

          {filtered.length === 0 ? (
            <FadeIn className="mt-12 rounded-3xl border border-white/70 bg-white/85 p-12 text-center backdrop-blur-sm">
              <h3 className="text-xl">Belum ada artikel yang cocok</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-ink-600">
                Coba kata kunci lain atau pilih kategori berbeda. Anda juga bisa melihat seluruh
                berita terbaru kami.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("Semua");
                }}
              >
                Reset pencarian
              </Button>
            </FadeIn>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {lead ? (
                <motion.article
                  key={lead.slug}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_30px_80px_-55px_rgba(19,25,34,0.55)]"
                >
                  <Link href={`/news/${lead.slug}`} className="block h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={lead.image.src}
                        alt={lead.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                        priority
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-ink-900/65 via-ink-900/10 to-transparent"
                      />
                      <span className="absolute top-5 left-5 rounded-full bg-white/85 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.18em] text-coral-600 uppercase backdrop-blur-md">
                        {lead.category}
                      </span>
                      <h3 className="absolute inset-x-5 bottom-5 text-2xl leading-tight text-white sm:text-3xl">
                        {lead.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                          {formatDate(lead.publishedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" aria-hidden />
                          {lead.readingMinutes} menit baca
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5" aria-hidden />
                          {lead.tags.slice(0, 2).join(", ")}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink-600">{lead.excerpt}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lagoon-700">
                        Baca selengkapnya
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ) : null}

              <StaggerContainer key={`${category}-${query}`} className="flex flex-col gap-5">
                {rest.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={staggerItem}
                    className="group overflow-hidden rounded-3xl border border-white/70 bg-white/85 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_25px_60px_-40px_rgba(19,25,34,0.5)]"
                  >
                    <Link href={`/news/${post.slug}`} className="flex gap-4 p-4">
                      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-28 sm:w-40">
                        <Image
                          src={post.image.src}
                          alt={post.image.alt}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <span
                          className={cn(
                            "text-[0.62rem] font-semibold tracking-[0.16em] uppercase",
                            post.category === "Promo" ? "text-coral-600" : "text-lagoon-700",
                          )}
                        >
                          {post.category}
                        </span>
                        <h3 className="mt-1.5 line-clamp-2 text-base leading-snug">{post.title}</h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-500">
                          {post.excerpt}
                        </p>
                        <span className="mt-auto pt-3 text-xs text-ink-400">
                          {formatDate(post.publishedAt)} · {post.readingMinutes} menit
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </StaggerContainer>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
