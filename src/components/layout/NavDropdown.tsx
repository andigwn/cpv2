"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { navPanelItem, navPanelSubItem, navPanelVariants } from "@/lib/animations";
import { isSamePageHash } from "@/lib/nav";
import { jumpToAnchor } from "@/lib/anchorScroll";
import { useT } from "@/i18n/useTranslation";
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
 * Entries that themselves have children open a second panel docked to their right edge:
 * the "Dining" group, and every destination, whose fly-out lists the sections of its own
 * page. A destination row is both at once — the label stays a link to the page and only
 * the chevron reveals its sections — so nothing that used to be one click away is lost.
 */
export function NavDropdown({ item, isActive, overHero, linkTone, activeTone }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [groupKey, setGroupKey] = useState<string | null>(null);
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const groupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setGroupKey(null);
    }, 130);
  };

  useEffect(() => cancelClose, []);

  /**
   * One timer drives every row's fly-out, and it lives here rather than in the rows.
   *
   * A per-row timer reads fine until the pointer sweeps down the column: the row being
   * left schedules its own close, then the row being entered opens its fly-out, and only
   * then does the first timer fire — wiping the fly-out that had just appeared. One shared
   * timer makes the newest hover win, so a fly-out opens every time instead of only when
   * the pointer happens to linger.
   */
  const showGroup = (key: string) => {
    if (groupTimer.current) {
      clearTimeout(groupTimer.current);
      groupTimer.current = null;
    }
    setGroupKey(key);
  };

  const hideGroupSoon = () => {
    if (groupTimer.current) clearTimeout(groupTimer.current);
    groupTimer.current = setTimeout(() => setGroupKey(null), 130);
  };

  useEffect(
    () => () => {
      if (groupTimer.current) clearTimeout(groupTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setGroupKey(null);
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
              "absolute top-full left-0 z-50 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-visible rounded-3xl border p-(--nav-panel-inset) shadow-[0_40px_90px_-50px_rgba(19,25,34,0.65)] backdrop-blur-xl",
              // Transparent panel: the hero photograph stays visible behind it.
              "bg-ink-900/35 border-white/25",
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
              {children.map((child, index) => (
                <NavPanelRow
                  key={child.href ?? child.label}
                  child={child}
                  // The last row hangs its fly-out from its own bottom edge, so the two
                  // cards share a flush baseline; rows above it open downwards instead.
                  alignBottom={index === children.length - 1}
                  groupKey={groupKey}
                  onGroupOpen={showGroup}
                  onGroupClose={hideGroupSoon}
                />
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type NavPanelRowProps = {
  child: NavItem;
  /** Last row of the panel: its fly-out is docked to the shared bottom edge instead. */
  alignBottom: boolean;
  /** Which row currently has its fly-out open, so only one is revealed at a time. */
  groupKey: string | null;
  onGroupOpen: (key: string) => void;
  onGroupClose: () => void;
};

/**
 * One row of the dropdown panel.
 *
 * A plain entry links straight to its route. An entry with children reveals a second,
 * narrower panel on its right, and the two things can coexist: a destination row links to
 * its page through its label while its chevron opens the sections of that same page.
 */
function NavPanelRow({
  child,
  alignBottom,
  groupKey,
  onGroupOpen,
  onGroupClose,
}: NavPanelRowProps) {
  const pathname = usePathname();
  const t = useT();
  const groupChildren = child.children ?? [];
  const rowKey = child.href ?? child.label;
  const groupOpen = groupChildren.length > 0 && groupKey === rowKey;
  const groupPanelId = useId();

  // The grace period belongs to the parent: it owns the one timer that decides which
  // fly-out is open, so a row only reports that the pointer arrived or left.
  const openGroup = () => onGroupOpen(rowKey);
  const closeGroupSoon = onGroupClose;

  const rowClasses =
    "group/unit relative flex w-full items-center gap-2 rounded-2xl px-4 py-2.5 text-left transition-colors duration-300 hover:bg-white/15 focus-within:bg-white/15";

  const labelClasses =
    "font-display relative z-10 text-sm font-bold text-white drop-shadow-[0_1px_6px_rgba(19,25,34,0.55)]";

  // Leaf rows carry a chevron that simply steps forward on hover. It deliberately does
  // NOT rotate: that trick turned the old tail arrow into a diagonal ↗, which reads as
  // broken on a chevron.
  const chevronClasses =
    "relative z-10 h-3.5 w-3.5 shrink-0 text-white/70 transition-[translate,color] duration-300 group-hover/unit:translate-x-0.5 group-hover/unit:text-white";

  // A row that both links somewhere and groups children: the label navigates, the
  // chevron toggles the fly-out. Anchors on the page already on screen bypass the router
  // so the scroll stays under Lenis' control.
  const label = <span className={labelClasses}>{child.label}</span>;
  const rowLabel = isSamePageHash(child.href, pathname) ? (
    <a
      href={child.href}
      onClick={(event) => {
        event.preventDefault();
        jumpToAnchor(child.href!);
      }}
      className="min-w-0 flex-1 rounded-lg"
    >
      {label}
    </a>
  ) : child.href ? (
    <Link href={child.href} className="min-w-0 flex-1 rounded-lg">
      {label}
    </Link>
  ) : null;

  const groupChevron = (
    <ChevronRight
      className={cn(
        "relative z-10 h-3.5 w-3.5 shrink-0 text-white/70 transition-[translate,rotate,color] duration-300",
        groupOpen
          ? "translate-x-0.5 rotate-90 text-white"
          : "group-hover/unit:translate-x-0.5 group-hover/unit:text-white",
      )}
      aria-hidden
    />
  );

  if (!groupChildren.length) {
    return (
      <motion.li variants={navPanelItem}>
        <Link
          href={child.href ?? "#"}
          onClick={(event) => {
            if (!isSamePageHash(child.href, pathname)) return;
            event.preventDefault();
            jumpToAnchor(child.href!);
          }}
          className={cn(rowClasses, "justify-between gap-3")}
        >
          {label}
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
      <div className={rowClasses}>
        {rowLabel ?? (
          <span className="min-w-0 flex-1">{label}</span>
        )}
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={groupOpen}
          aria-controls={groupPanelId}
          aria-label={t("nav.showSections", { name: child.label })}
          onClick={() => (groupOpen ? onGroupClose() : onGroupOpen(rowKey))}
          onFocus={openGroup}
          className="relative z-10 -mr-1 shrink-0 rounded-full p-1 focus-visible:bg-white/20"
        >
          {/* Group rows point down while open, so a header and a plain link never look
              like the same kind of row. */}
          {groupChevron}
        </button>
      </div>

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
              "bg-ink-900/40 absolute left-full z-50 ml-[calc(var(--nav-panel-gap)+var(--nav-panel-inset))] max-h-[min(70vh,32rem)] w-60 overflow-y-auto rounded-3xl border border-white/25 p-(--nav-panel-inset) shadow-[0_40px_90px_-50px_rgba(19,25,34,0.65)] backdrop-blur-xl",
              // Docked level with the parent panel, anchored by whichever edge keeps the two
              // cards flush. The last row (Dining) hangs from its BOTTOM edge so it shares
              // the panel's baseline and grows upward; a row anywhere else opens from its
              // TOP edge and grows downward, which stays on screen whichever row it is.
              alignBottom ? "-bottom-(--nav-panel-inset)" : "-top-(--nav-panel-inset)",
            )}
          >
            <ul className="flex flex-col gap-1">
              {groupChildren.map((leaf) => (
                <motion.li key={leaf.href ?? leaf.label} variants={navPanelSubItem}>
                  <Link
                    href={leaf.href ?? "#"}
                    onClick={(event) => {
                      if (!isSamePageHash(leaf.href, pathname)) return;
                      event.preventDefault();
                      jumpToAnchor(leaf.href!);
                    }}
                    className={cn(rowClasses, "justify-between gap-3")}
                  >
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
