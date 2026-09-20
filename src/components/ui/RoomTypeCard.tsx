"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { ArrowRight, BedDouble, Check, Eye, Maximize2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ImageAsset, RoomType } from "@/types";
import { EASE_SOFT } from "@/lib/animations";

type RoomTypeCardProps = {
  roomType: RoomType;
  /** Position in the list, used for the "Tipe 01" eyebrow. */
  index?: number;
  /** Photo of the parent unit, used when the room type has no photo of its own. */
  fallbackImage?: ImageAsset;
  /** Where the availability link points. */
  href?: string;
  className?: string;
};

type RoomSpec = {
  label: string;
  value: string;
  icon: ReactElement;
};

/**
 * Rich room-category card for lodging detail pages.
 *
 * The old room list was text only; this card leads with the room photo, overlays the
 * name on the image and lists the practical specs (size, bed, occupancy, view) plus the
 * short selling points, so a visitor can compare types at a glance.
 */
export function RoomTypeCard({
  roomType,
  index,
  fallbackImage,
  href = "/contact",
  className,
}: RoomTypeCardProps) {
  const image = roomType.image ?? fallbackImage;

  const specs: RoomSpec[] = [
    roomType.size
      ? {
          label: "Luas",
          value: roomType.size,
          icon: <Maximize2 className="h-4 w-4" aria-hidden />,
        }
      : null,
    roomType.bed
      ? {
          label: "Tempat tidur",
          value: roomType.bed,
          icon: <BedDouble className="h-4 w-4" aria-hidden />,
        }
      : null,
    roomType.capacity
      ? {
          label: "Kapasitas",
          value: roomType.capacity,
          icon: <Users className="h-4 w-4" aria-hidden />,
        }
      : null,
    roomType.view
      ? {
          label: "Pemandangan",
          value: roomType.view,
          icon: <Eye className="h-4 w-4" aria-hidden />,
        }
      : null,
  ].filter((spec): spec is RoomSpec => spec !== null);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASE_SOFT }}
      className={cn(
        "group/room flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 backdrop-blur-sm",
        "shadow-[0_22px_60px_-42px_rgba(19,25,34,0.55)] transition-shadow duration-500",
        "hover:shadow-[0_34px_80px_-46px_rgba(19,25,34,0.6)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            loading="lazy"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover/room:scale-[1.07]"
          />
        ) : (
          <div className="from-lagoon-100 via-sand-100 to-lagoon-50 flex h-full w-full items-center justify-center bg-gradient-to-br">
            <BedDouble className="text-lagoon-300 h-12 w-12" aria-hidden />
          </div>
        )}

        <div
          aria-hidden
          className="from-ink-900/85 via-ink-900/25 absolute inset-0 bg-gradient-to-t to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div className="flex flex-col gap-1.5">
            {index !== undefined ? (
              <span className="text-[0.65rem] font-semibold tracking-[0.24em] text-white/75 uppercase">
                {"Tipe " + String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <h3 className="font-display text-2xl leading-none font-bold text-white sm:text-[1.75rem]">
              {roomType.name}
            </h3>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-white/20 text-white backdrop-blur-md">
            <BedDouble className="h-5 w-5" aria-hidden />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <p className="text-ink-600 text-sm leading-relaxed">{roomType.description}</p>

        {specs.length ? (
          <dl className="grid grid-cols-2 gap-2.5">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="border-lagoon-100 bg-lagoon-50/60 flex items-center gap-3 rounded-2xl border px-3.5 py-2.5"
              >
                <span className="text-lagoon-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/80">
                  {spec.icon}
                </span>
                <div className="min-w-0">
                  <dt className="text-ink-400 text-[0.6rem] font-semibold tracking-[0.16em] uppercase">
                    {spec.label}
                  </dt>
                  <dd className="text-ink-800 text-sm leading-snug font-semibold">{spec.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        ) : null}

        {roomType.features?.length ? (
          <ul className="flex flex-wrap gap-2">
            {roomType.features.map((feature) => (
              <li
                key={feature}
                className="border-ink-200/80 text-ink-600 inline-flex items-center gap-1.5 rounded-full border bg-white/70 px-3 py-1.5 text-xs"
              >
                <Check className="text-leaf-600 h-3.5 w-3.5" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="border-ink-100 mt-auto border-t pt-4">
          <Link
            href={href}
            className="group/cta text-lagoon-700 hover:text-lagoon-800 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Tanya ketersediaan
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
