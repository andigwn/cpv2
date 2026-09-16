"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { businessUnits, outletCount, unitHref } from "@/data/units";

/** Look up the building metadata (type label) for a menu entry. */
const unitByHref = new Map(businessUnits.map((unit) => [unitHref(unit), unit]));

type NavDropdownProps = {
  item: NavItem;
  isActive: boolean;
  overHero: boolean;
  linkTone: string;
  activeTone: string;
};

/**
 * Desktop dropdown for a nav item that has children (the "Unit Bisnis" menu).
 *
 * The panel is positioned against the surrounding <nav> element, so it always
 * spans the content shell instead of overflowing at narrow viewports. It opens
 * on hover, on click and on keyboard focus, and closes with Escape.
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
        )}
      >
        {item.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden
        />
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-50 mt-3 rounded-3xl border border-white/70 bg-white/95 p-5 shadow-[0_40px_90px_-50px_rgba(19,25,34,0.55)] backdrop-blur-xl"
          >
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {children.map((child) => {
                const unit = unitByHref.get(child.href);

                return (
                  <div
                    key={child.href}
                    className="border-ink-100 hover:border-lagoon-200 rounded-2xl border bg-white/70 p-4 transition-colors duration-300 hover:bg-white"
                  >
                    <Link
                      href={child.href}
                      className="group/unit flex items-start justify-between gap-3"
                    >
                      <span>
                        <span className="font-display text-ink-900 group-hover/unit:text-lagoon-700 block text-sm font-bold transition-colors">
                          {child.label}
                        </span>
                        <span className="text-ink-400 mt-1 block text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                          {unit ? unit.type : "Unit bisnis"}
                        </span>
                      </span>
                      <ArrowRight
                        className="text-ink-300 group-hover/unit:text-lagoon-600 mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/unit:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>

                    {child.children?.length ? (
                      <ul className="border-ink-100 mt-3 flex flex-col gap-2 border-t pt-3">
                        {child.children.map((outlet) => (
                          <li key={outlet.href}>
                            <Link
                              href={outlet.href}
                              className="group/outlet text-ink-600 hover:text-lagoon-700 inline-flex items-center gap-2 text-xs transition-colors"
                            >
                              <span
                                aria-hidden
                                className="bg-lagoon-300 group-hover/outlet:bg-lagoon-600 h-1 w-1 rounded-full transition-colors"
                              />
                              {outlet.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="border-ink-100 text-ink-400 mt-3 border-t pt-3 text-xs">
                        Unit tunggal tanpa outlet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-ink-100 mt-4 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-ink-500 text-xs">
                {businessUnits.length} bangunan dengan {outletCount} unit bisnis di dalamnya.
              </p>
              <Link
                href={item.href}
                className="group/all text-lagoon-700 hover:text-lagoon-800 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Lihat semua unit bisnis
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
