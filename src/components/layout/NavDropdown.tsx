"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { navPanelItem, navPanelVariants } from "@/lib/animations";
import type { NavItem } from "@/types";

type NavDropdownProps = {
  item: NavItem;
  isActive: boolean;
  overHero: boolean;
  linkTone: string;
  activeTone: string;
};

/**
 * Desktop dropdown for a nav item that has children (the "Destinasi" menu).
 *
 * The panel only lists the business-unit names — no descriptions, category chips or
 * sub-menus — as requested in the revision brief. It is positioned against the
 * surrounding <nav> element so it always spans the content shell, opens on hover,
 * click and keyboard focus, and closes with Escape.
 */
export function NavDropdown({ item, isActive, overHero, linkTone, activeTone }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 130);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const children = item.children ?? [];

  return (
    <div
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-4",
          isActive ? activeTone : linkTone,
          open && (overHero ? "bg-white/15" : "bg-ink-100/80"),
        )}
      >
        {item.label}
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          className="inline-flex"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
        {isActive ? (
          <motion.span
            layoutId="nav-active"
            className={cn(
              "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full",
              overHero ? "bg-white" : "bg-lagoon-600",
            )}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            variants={navPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-4 shadow-[0_40px_90px_-50px_rgba(19,25,34,0.55)] backdrop-blur-xl sm:p-5"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="absolute inset-x-8 top-0 h-px origin-left bg-linear-to-r from-transparent via-[#FFE52C] to-transparent"
            />

            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {children.map((child) => (
                <motion.li key={child.href} variants={navPanelItem}>
                  <Link
                    href={child.href}
                    className="group/unit border-ink-100 relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border bg-white/70 px-4 py-3 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_18px_34px_-26px_rgba(11,108,60,0.7)]"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#FFE52C] to-[#EF723D] opacity-0 transition-opacity duration-500 ease-out group-hover/unit:opacity-100"
                    />
                    <span className="font-display text-ink-900 relative z-10 text-sm font-bold transition-colors duration-300">
                      {child.label}
                    </span>
                    <ArrowRight
                      className="text-ink-300 group-hover/unit:text-ink-900 relative z-10 h-3.5 w-3.5 shrink-0 transition-[transform,color] duration-300 group-hover/unit:translate-x-0.5 group-hover/unit:-rotate-45"
                      aria-hidden
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
