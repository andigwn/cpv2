"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { MAIN_NAV, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { mobileMenuVariants, mobileSubmenuItem } from "@/lib/animations";
import { useMenuStore } from "@/store/useMenuStore";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

/**
 * Fixed navbar with hide-on-scroll-down behaviour, a scroll progress bar and a
 * full-screen mobile drawer (prd.md section 8).
 */
export function Navbar() {
  const pathname = usePathname();
  const { isOpen, toggle, close } = useMenuStore();
  const { scrolled, scrollingDown, progress } = useScrollProgress(48);

  useLockBodyScroll(isOpen);

  // The Home hero sits behind the navbar, so links start white there.
  const overHero = pathname === "/" && !scrolled;
  const isHidden = scrollingDown && !isOpen;

  const linkTone = overHero ? "text-white/90 hover:text-white" : "text-ink-600 hover:text-ink-900";
  const activeTone = overHero ? "text-white" : "text-lagoon-700";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isHidden ? "-115%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-white/60 bg-white/85 shadow-[0_10px_40px_-30px_rgba(19,25,34,0.6)] backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <nav
          aria-label="Navigasi utama"
          className="shell relative flex h-(--site-header-height) items-center justify-between gap-4 xl:gap-6"
        >
          {/* The logo already carries the wordmark and the tagline, so it replaces
              the old icon + text lockup. Over the hero it sits on a soft white plate
              so the dark green artwork stays legible on any photograph. */}
          <Link
            href="/"
            onClick={close}
            aria-label={SITE.name + " — beranda"}
            className={cn(
              "group inline-flex shrink-0 items-center rounded-2xl px-2 py-1.5 transition-all duration-500",
              overHero && "",
            )}
          >
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              width={199}
              height={36}
              priority
              className="h-7 w-auto transition-transform duration-500 group-hover:scale-[1.03] sm:h-8 xl:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {MAIN_NAV.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              if (item.children?.length) {
                return (
                  <li key={item.href}>
                    <NavDropdown
                      item={item}
                      isActive={isActive}
                      overHero={overHero}
                      linkTone={linkTone}
                      activeTone={activeTone}
                    />
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-4",
                      isActive ? activeTone : linkTone,
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-[#FFE52C] to-[#EF723D]"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href="/contact" size="sm" variant="primary">
              Reservasi
            </Button>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
              overHero
                ? "border-white/50 bg-white/15 text-white backdrop-blur-md"
                : "border-ink-200 text-ink-800 bg-white/80 backdrop-blur-md",
            )}
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </nav>

        {/* Reading progress */}
        <motion.div
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-0.5 origin-left",
            overHero ? "bg-white/70" : "bg-linear-to-r from-[#FFE52C] to-[#EF723D]",
          )}
          style={{ scaleX: progress }}
        />
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="via-lagoon-50 to-sand-100 fixed inset-0 z-40 flex flex-col bg-linear-to-b from-white pt-(--site-header-height) lg:hidden"
          >
            <nav aria-label="Navigasi mobile" className="shell flex-1 overflow-y-auto py-8">
              <ul className="flex flex-col gap-1">
                {MAIN_NAV.map((item, index) => (
                  <MobileNavItem key={item.href} item={item} index={index} onNavigate={close} />
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/contact" fullWidth size="lg" onClick={close}>
                  <CalendarDays className="h-4 w-4" aria-hidden /> Reservasi Sekarang
                </Button>
                <Button
                  href={`tel:${SITE.contact.phone.replace(/[^+\d]/g, "")}`}
                  variant="outline"
                  fullWidth
                  size="lg"
                >
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.contact.phone}
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="border-ink-200 text-ink-600 hover:border-lagoon-400 hover:text-lagoon-700 flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors"
                  >
                    <SocialIcon name={social.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/**
 * One row of the mobile drawer. Items with children expand into an accordion so
 * every business unit stays reachable on a phone; the child list stays a plain
 * list of names — no descriptions and no sub-menus.
 */
function MobileNavItem({
  item,
  index,
  onNavigate,
}: {
  item: NavItem;
  index: number;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const children = item.children ?? [];
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  const entrance = {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.05 + index * 0.05, duration: 0.4 },
  } as const;

  if (!children.length) {
    return (
      <motion.li {...entrance}>
        <Link
          href={item.href}
          onClick={onNavigate}
          aria-current={isActive ? "page" : undefined}
          className="border-ink-200/70 font-display text-ink-900 flex items-center justify-between border-b py-4 text-2xl font-bold"
        >
          {item.label}
          <span className="text-ink-400 text-xs font-medium tracking-widest">0{index + 1}</span>
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li {...entrance}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="border-ink-200/70 font-display text-ink-900 flex w-full items-center justify-between border-b py-4 text-left text-2xl font-bold"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "text-ink-400 h-5 w-5 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pb-3"
          >
            {children.map((child, childIndex) => (
              <motion.li
                key={child.href}
                custom={childIndex}
                variants={mobileSubmenuItem}
                initial="hidden"
                animate="visible"
                className="pt-2"
              >
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className="group/mobile border-ink-100 text-ink-700 relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-white/70 px-4 py-3 text-base font-medium transition-transform duration-300 ease-out active:scale-[0.99]"
                >
                  <span
                    aria-hidden
                    className="group-active/mobile:opacity-100 pointer-events-none absolute inset-0 bg-linear-to-r from-[#FFE52C] to-[#EF723D] opacity-0 transition-opacity duration-500 ease-out group-hover/mobile:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="bg-ink-300 group-hover/mobile:bg-ink-900 relative z-10 h-1.5 w-1.5 rounded-full transition-colors duration-300"
                  />
                  <span className="group-hover/mobile:text-ink-900 relative z-10 transition-colors duration-300">
                    {child.label}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}
