"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredSlugs, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { staggerItem } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import { ContentBand } from "@/components/sections/ContentBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

const posts = featuredSlugs
  .map((slug) => getNewsBySlug(slug))
  .filter((post): post is NonNullable<typeof post> => Boolean(post))
  .slice(0, 3);

/** Three latest stories, image + date + title only. */
export function NewsPreview() {
  if (!posts.length) return null;

  return (
    <ContentBand id="news" overlap>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle
          eyebrow="Berita"
          title="Kabar terbaru"
          className="max-w-xl"
          titleClassName="text-3xl sm:text-4xl"
        />
        <Button
          href="/news"
          variant="outline"
          className="shrink-0"
          icon={<ArrowRight className="h-4 w-4" aria-hidden />}
        >
          Semua berita
        </Button>
      </div>

      <StaggerContainer className="mt-14 grid gap-10 sm:grid-cols-3">
        {posts.map((post) => (
          <motion.article key={post.slug} variants={staggerItem}>
            <Link href={"/news/" + post.slug} className="group block">
              <span className="relative block aspect-16/10 overflow-hidden rounded-3xl">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>
              <span className="mt-5 block text-[0.65rem] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                {formatDate(post.publishedAt)}
              </span>
              <h3 className="mt-2 text-lg leading-snug text-ink-900 transition-colors group-hover:text-lagoon-700">
                {post.title}
              </h3>
            </Link>
          </motion.article>
        ))}
      </StaggerContainer>
    </ContentBand>
  );
}
