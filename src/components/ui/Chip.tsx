"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  /** Renders a decorative leading dot when active. */
  withDot?: boolean;
};

/** Small clickable indicator used by the highlight carousel and filter rows. */
export function Chip({ label, isActive = false, onClick, className, withDot = true }: ChipProps) {
  const interactive = typeof onClick === "function";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      aria-pressed={interactive ? isActive : undefined}
      whileHover={interactive ? { y: -2 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-300",
        isActive
          ? "border-lagoon-600 bg-lagoon-600 text-white shadow-[0_10px_26px_-14px_rgba(34,135,205,0.9)]"
          : "border-ink-200 bg-white/75 text-ink-600 hover:border-lagoon-300 hover:text-lagoon-700",
        !interactive && "cursor-default",
        className,
      )}
    >
      {withDot && isActive ? (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
      ) : null}
      {label}
    </motion.button>
  );
}
