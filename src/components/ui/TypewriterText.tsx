"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSequentialTypewriter, useTypewriter } from "@/hooks/useTypewriter";

type TypewriterTextProps = {
  /** Single-line mode. Ignored when `lines` is provided. */
  text?: string;
  /** Sequential multi-line mode: each line starts after the previous one finished. */
  lines?: string[];
  /** Milliseconds per character. */
  speed?: number;
  /** Delay before the first character, in milliseconds. */
  startDelay?: number;
  className?: string;
  lineClassName?: string;
  cursorClassName?: string;
  /** Called once every line has been typed (fires on every pass when `loop` is on). */
  onComplete?: () => void;
  /** Keep the blinking cursor after typing finished. */
  keepCursor?: boolean;
  /** Type, pause, delete, pause, then type again — forever — instead of stopping once fully typed. */
  loop?: boolean;
  /** How long the fully-typed text stays on screen before it starts deleting. Only used when `loop` is true. */
  holdDuration?: number;
  /** Milliseconds between characters while deleting. Defaults to a faster pace than typing. Only used when `loop` is true. */
  deleteSpeed?: number;
  /** Blank pause after everything is deleted, before typing starts again. Only used when `loop` is true. */
  pauseBeforeRestart?: number;
  /** Render as an inline run of text (e.g. one word inside a sentence) instead of a block-level line. */
  inline?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

// Motion components are created once at module scope (not during render).
const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Headline that types itself character by character with a blinking cursor.
 * Only used by the Home hero (prd.md section 13a); the timing logic itself lives in
 * `hooks/useTypewriter.ts` so this file stays presentational.
 */
export function TypewriterText({
  text,
  lines,
  speed = 50,
  startDelay = 0,
  className,
  lineClassName,
  cursorClassName,
  onComplete,
  keepCursor = true,
  loop = false,
  holdDuration,
  deleteSpeed,
  pauseBeforeRestart,
  inline = false,
  as: Tag = "span",
}: TypewriterTextProps) {
  const Wrapper = MOTION_TAGS[Tag] ?? MOTION_TAGS.span;
  const multi = Array.isArray(lines) && lines.length > 0;
  const displayClass = inline ? "inline" : "block";

  const single = useTypewriter(text ?? "", {
    speed,
    startDelay,
    onComplete,
    disabled: multi,
    loop,
    holdDuration,
    deleteSpeed,
    pauseBeforeRestart,
  });
  const sequential = useSequentialTypewriter(lines ?? [], {
    speed,
    startDelay,
    onComplete,
    disabled: !multi,
    loop,
    holdDuration,
    deleteSpeed,
    pauseBeforeRestart,
  });

  const renderedLines = multi ? sequential.lines : [single.displayedText];
  const done = multi ? sequential.isDone : single.isDone;
  const activeLine = multi ? sequential.activeLine : 0;
  const showCursor = keepCursor || !done;

  return (
    <Wrapper className={cn(displayClass, className)}>
      {renderedLines.map((line, index) => {
        const isActiveLine = multi ? activeLine === index : true;
        return (
          <span key={index} className={cn(displayClass, lineClassName)}>
            {line}
            {showCursor && isActiveLine ? (
              <motion.span
                aria-hidden
                className={cn(
                  "bg-lagoon-600 ml-1 inline-block h-[0.95em] w-0.75 translate-y-[0.08em] rounded-full align-middle",
                  cursorClassName,
                )}
                animate={{ opacity: done ? [1, 0.85, 1] : [1, 0] }}
                transition={
                  done
                    ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.8, repeat: Infinity, ease: "linear" }
                }
              />
            ) : null}
          </span>
        );
      })}
    </Wrapper>
  );
}
