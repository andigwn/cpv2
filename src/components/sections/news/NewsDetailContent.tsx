"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Share2, User } from "lucide-react";
import type { NewsPost } from "@/types";
import { newsPosts } from "@/data/news";
import { sectionBackgrounds } from "@/data/sectionBackgrounds";
import { formatDate } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { SectionBackground } from "@/components/animations/SectionBackground";

/** Article detail page (prd.md sitemap: /news/[slug]). */
export function NewsDetailContent({ post }: { post: NewsPost }) {
  const related = newsPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden pt-[calc(var(--site-header-height)+3.5rem)] pb-14">
        <SectionBackground {...sectionBackgrounds.newsGrid} />

        <div className="shell relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition-colors hover:text-lagoon-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Semua berita
          </Link>

          <div className="mt-6 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral-200 bg-white/85 px-4 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-coral-600 uppercase backdrop-blur-md">
              {post.category}
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>

            <p className="mt-5 text-base leading-relaxed text-ink-600 sm:text-lg">{post.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-500">
              <span className="inline-flex items-center gap-2">
                <User className="h-3.5 w-3.5" aria-hidden />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {post.readingMinutes} menit baca
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- Cover ---------------- */}
      <div className="shell relative z-10">
        <FadeIn
          direction="scale"
          className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_40px_100px_-60px_rgba(19,25,34,0.6)]"
        >
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </FadeIn>
      </div>

      {/* ---------------- Body ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <SectionBackground {...sectionBackgrounds.detailPage} />

        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-6">
              {post.body.map((paragraph, index) => (
                <FadeIn key={index} delay={index * 0.05}>
                  <p className="text-base leading-[1.85] text-ink-700">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-xs tracking-[0.16em] text-ink-500 uppercase">Tag</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-ink-200 bg-white/85 px-3 py-1 text-xs text-ink-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm">
              <div>
                <p className="font-display text-lg font-bold text-ink-900">
                  Bagikan artikel ini
                </p>
                <p className="mt-1 text-xs text-ink-500">
                  Bantu lebih banyak tamu menemukan informasi ini.
                </p>
              </div>
              <Button
                href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                variant="outline"
                icon={<Share2 className="h-4 w-4" aria-hidden />}
                iconPosition="left"
              >
                Bagikan
              </Button>
            </div>
          </div>

          {/* ---------------- Sidebar ---------------- */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:self-start">
            <FadeIn className="rounded-3xl border border-lagoon-100 bg-gradient-to-b from-lagoon-50 to-white p-6">
              <h2 className="text-lg">Rencanakan kunjungan</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Tim reservasi kami siap membantu menyusun paket menginap, tiket waterpark, dan
                agenda acara sesuai kebutuhan Anda.
              </p>
              <Button href="/contact" className="mt-5" fullWidth>
                Hubungi kami
              </Button>
              <Button href="/services" variant="outline" className="mt-3" fullWidth>
                Lihat layanan
              </Button>
            </FadeIn>

            <FadeIn delay={0.1} className="rounded-3xl border border-white/70 bg-white/85 p-6 backdrop-blur-sm">
              <h2 className="text-lg">Berita lainnya</h2>
              <ul className="mt-5 flex flex-col gap-5">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/news/${item.slug}`} className="group flex gap-4">
                      <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.6rem] font-semibold tracking-[0.16em] text-lagoon-700 uppercase">
                          {item.category}
                        </span>
                        <span className="mt-1 text-sm leading-snug text-ink-800 transition-colors group-hover:text-lagoon-700">
                          {item.title}
                        </span>
                        <span className="mt-1 text-xs text-ink-400">
                          {formatDate(item.publishedAt)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </aside>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <SectionBackground {...sectionBackgrounds.ctaBand} />

        <div className="shell relative z-10">
          <SectionTitle
            eyebrow="Lanjutkan"
            title="Siap merasakan sendiri pengalamannya?"
            description="Pesan langsung melalui situs kami untuk harga terbaik dan pembatalan gratis hingga 72 jam sebelum kedatangan."
          />

          <StaggerContainer className="mt-8 flex flex-wrap gap-4">
            <motion.div variants={staggerItem}>
              <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                Reservasi sekarang
              </Button>
            </motion.div>
            <motion.div variants={staggerItem}>
              <Button href="/services" size="lg" variant="outline">
                Jelajahi fasilitas
              </Button>
            </motion.div>
          </StaggerContainer>
        </div>
      </section>
    </article>
  );
}
