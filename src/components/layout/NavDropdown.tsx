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
 * The panel renders every entry as a single vertical column (no grid, no sideways
 * fly-outs) and keeps a translucent, blurred background so the hero photography stays
 * visible behind it while the white labels remain readable. It opens on hover, click and
 * keyboard focus, and closes with Escape.
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
      className="relative"
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
            className={cn(
              "absolute top-full left-0 z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border p-3 shadow-[0_40px_90px_-50px_rgba(19,25,34,0.65)] backdrop-blur-xl",
              // Transparent panel: the hero photograph stays visible behind it.
              "border-white/25 bg-ink-900/35",
            )}
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="absolute inset-x-6 top-0 h-px origin-left bg-linear-to-r from-transparent via-[#FFE52C] to-transparent"
            />

            <ul className="flex flex-col gap-1">
              {children.map((child) => (
                <motion.li key={child.href} variants={navPanelItem}>
                  <Link
                    href={child.href}
                    className="group/unit relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl px-4 py-2.5 transition-colors duration-300 hover:bg-white/15 focus-visible:bg-white/15"
                  >
                    <span className="font-display relative z-10 text-sm font-bold text-white drop-shadow-[0_1px_6px_rgba(19,25,34,0.55)]">
                      {child.label}
                    </span>
                    <ArrowRight
                      className="relative z-10 h-3.5 w-3.5 shrink-0 text-white/70 transition-[transform,color] duration-300 group-hover/unit:translate-x-0.5 group-hover/unit:-rotate-45 group-hover/unit:text-white"
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
