"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { navPanelItem, navPanelSubItem, navPanelVariants } from "@/lib/animations";
import type { NavItem } from "@/types";

type NavDropdownProps = {
  item: NavItem;
  isActive: boolean;
  overHero: boolean;
  linkTone: string;
  activeTone: string;
};

/**
 * Distance from a panel's content edge to its outer edge: the 12px padding plus the 1px
 * border. Published as a custom property so the fly-out can anchor to the parent panel's
 * OUTER edge — a second-level panel is a child of a row, which sits inside that padding,
 * so a plain `left-full` would tuck it under the panel's border and clip every row.
 */
const PANEL_INSET = "0.8125rem";

/**
 * Seam kept between the parent panel and a docked second-level panel. Just wide enough
 * that the two hairlines read as one continuous menu rather than two floating cards.
 */
const PANEL_GAP = "0.125rem";

/**
 * Desktop dropdown for a nav item that has children (the "Destinasi" menu).
 *
 * The panel renders every entry as a single vertical column (no grid) and keeps a
 * translucent, blurred background so the hero photography stays visible behind it while
 * the white labels remain readable. It opens on hover, click and keyboard focus, and
 * closes with Escape.
 *
 * Entries that themselves have children (the "Dining" group) are rendered as group rows
 * with a right-pointing chevron: hovering one opens a second panel docked to its right
 * edge, so every restaurant stays one hover away without ever leaving the dropdown.
 */
export function NavDropdown({ item, isActive, overHero, linkTone, activeTone }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [groupHref, setGroupHref] = useState<string | null>(null);
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
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setGroupHref(null);
    }, 130);
  };

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setGroupHref(null);
      }
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
            style={{ "--nav-panel-inset": PANEL_INSET } as CSSProperties}
            className={cn(
              "absolute top-full left-0 z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-visible rounded-3xl border p-[var(--nav-panel-inset)] shadow-[0_40px_90px_-50px_rgba(19,25,34,0.65)] backdrop-blur-xl",
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
                <NavPanelRow
                  key={child.href ?? child.label}
                  child={child}
                  groupHref={groupHref}
                  onGroupOpen={setGroupHref}
                />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * One row of the dropdown panel. A plain entry links straight to its route; an entry with
 * children acts as a group header and reveals a second, narrower panel on its right.
 */
function NavPanelRow({
  child,
  groupHref,
  onGroupOpen,
}: {
  child: NavItem;
  groupHref: string | null;
  onGroupOpen: (href: string | null) => void;
}) {
  const groupChildren = child.children ?? [];
  const groupKey = child.href ?? child.label;
  const groupOpen = groupChildren.length > 0 && groupHref === groupKey;
  const groupPanelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const openGroup = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    onGroupOpen(groupKey);
  };

  // The grace timer keeps the panel alive while the pointer crosses the gap between the
  // two panels, so the submenu does not snap shut mid-travel.
  const closeGroupSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => onGroupOpen(null), 130);
  };

  const rowClasses =
    "group/unit relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl px-4 py-2.5 text-left transition-colors duration-300 hover:bg-white/15 focus-visible:bg-white/15";

  const labelClasses =
    "font-display relative z-10 text-sm font-bold text-white drop-shadow-[0_1px_6px_rgba(19,25,34,0.55)]";

  // Leaf rows carry a chevron that simply steps forward on hover. It deliberately does
  // NOT rotate: that trick turned the old tail arrow into a diagonal ↗, which reads as
  // broken on a chevron.
  const chevronClasses =
    "relative z-10 h-3.5 w-3.5 shrink-0 text-white/70 transition-[translate,color] duration-300 group-hover/unit:translate-x-0.5 group-hover/unit:text-white";

  if (!groupChildren.length) {
    return (
      <motion.li variants={navPanelItem}>
        <Link href={child.href ?? "#"} className={rowClasses}>
          <span className={labelClasses}>{child.label}</span>
          <ChevronRight className={chevronClasses} aria-hidden />
        </Link>
      </motion.li>
    );
  }

  return (
    <motion.li
      variants={navPanelItem}
      className="relative"
      onMouseEnter={openGroup}
      onMouseLeave={closeGroupSoon}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={groupOpen}
        aria-controls={groupPanelId}
        onClick={() => onGroupOpen(groupOpen ? null : groupKey)}
        onFocus={openGroup}
        className={rowClasses}
      >
        <span className={labelClasses}>{child.label}</span>
        {/* Group rows point down while open, so a header and a plain link never look
            like the same kind of row. */}
        <ChevronRight
          className={cn(
            "relative z-10 h-3.5 w-3.5 shrink-0 text-white/70 transition-[translate,rotate,color] duration-300",
            groupOpen
              ? "translate-x-0.5 rotate-90 text-white"
              : "group-hover/unit:translate-x-0.5 group-hover/unit:text-white",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {groupOpen ? (
          <motion.div
            id={groupPanelId}
            variants={navPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ "--nav-panel-gap": PANEL_GAP } as CSSProperties}
            className={cn(
              // Docked level with the parent panel: it repeats the panel's own inset and
              // is lifted by the same amount, so its first row starts exactly on the
              // group row's top edge and the two menus read as one aligned block.
              "absolute left-full z-50 top-[calc(-1*var(--nav-panel-inset))] ml-[calc(var(--nav-panel-gap)+var(--nav-panel-inset))] w-60 rounded-3xl border border-white/25 bg-ink-900/40 p-[var(--nav-panel-inset)] shadow-[0_40px_90px_-50px_rgba(19,25,34,0.65)] backdrop-blur-xl",
            )}
          >
            <ul className="flex flex-col gap-1">
              {groupChildren.map((leaf) => (
                <motion.li key={leaf.href ?? leaf.label} variants={navPanelSubItem}>
                  <Link href={leaf.href ?? "#"} className={rowClasses}>
                    <span className={labelClasses}>{leaf.label}</span>
                    <ChevronRight className={chevronClasses} aria-hidden />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  );
}