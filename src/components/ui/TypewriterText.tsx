"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_SOFT } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSequentialTypewriter, useTypewriter, useTypewriterWords } from "@/hooks/useTypewriter";

type TypewriterTextProps = {
  /** Single-line mode. Ignored when `lines` or `words` is provided. */
  text?: string;
  /** Sequential multi-line mode: each line starts after the previous one finished. */
  lines?: string[];
  /**
   * Cycling mode: types a word, holds it, deletes it, then moves to the next one —
   * forever. Ignored when `lines` is provided.
   */
  words?: readonly string[];
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
  /** Human typing rhythm: jitter per key and a beat after spaces/punctuation. */
  organic?: boolean;
  /** Each freshly typed character eases in instead of appearing all at once. */
  animateChars?: boolean;
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
 * Renders the revealed text character by character, easing each new character in.
 * Existing characters keep their identity, so only the freshly typed one animates.
 */
function TypedLine({ text, animated }: { text: string; animated: boolean }) {
  if (!animated) return <>{text}</>;

  return (
    <>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.26, ease: EASE_SOFT }}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

/**
 * Headline that types itself character by character with a blinking cursor.
 * Only used by the Home hero (prd.md section 13a); the timing logic itself lives in
 * `hooks/useTypewriter.ts` so this file stays presentational.
 */
export function TypewriterText({
  text,
  lines,
  words,
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
  organic = true,
  animateChars = true,
  as: Tag = "span",
}: TypewriterTextProps) {
  const Wrapper = MOTION_TAGS[Tag] ?? MOTION_TAGS.span;
  const prefersReducedMotion = usePrefersReducedMotion();
  const multi = Array.isArray(lines) && lines.length > 0;
  const cycling = Array.isArray(words) && words.length > 0;
  const displayClass = inline ? "inline" : "block";
  const animateCharacters = animateChars && !prefersReducedMotion;

  const single = useTypewriter(text ?? "", {
    speed,
    startDelay,
    onComplete,
    disabled: multi || cycling,
    loop,
    holdDuration,
    deleteSpeed,
    pauseBeforeRestart,
    organic,
  });
  const sequential = useSequentialTypewriter(lines ?? [], {
    speed,
    startDelay,
    onComplete,
    disabled: !multi || cycling,
    loop,
    holdDuration,
    deleteSpeed,
    pauseBeforeRestart,
    organic,
  });
  const wordCycle = useTypewriterWords(words ?? [], {
    speed,
    startDelay,
    onComplete,
    disabled: !cycling,
    holdDuration,
    deleteSpeed,
    pauseBeforeRestart,
    organic,
  });

  const renderedLines = cycling
    ? [wordCycle.displayedText]
    : multi
      ? sequential.lines
      : [single.displayedText];
  const done = cycling ? wordCycle.isDone : multi ? sequential.isDone : single.isDone;
  const activeLine = cycling ? 0 : multi ? sequential.activeLine : 0;
  const showCursor = keepCursor || !done;

  return (
    <Wrapper className={cn(displayClass, className)}>
      {renderedLines.map((line, index) => {
        const isActiveLine = multi ? activeLine === index : true;
        return (
          <span key={index} className={cn(displayClass, lineClassName)}>
            <TypedLine text={line} animated={animateCharacters} />
            {showCursor && isActiveLine ? (
              <motion.span
                aria-hidden
                className={cn(
                  "from-sunshine-300 to-[#EF723D] ml-1 inline-block h-[0.95em] w-0.75 translate-y-[0.08em] rounded-full bg-linear-to-b align-middle shadow-[0_0_14px_rgba(255,229,44,0.6)]",
                  cursorClassName,
                )}
                animate={
                  done ? { opacity: [1, 0.2, 1], scaleY: [1, 0.8, 1] } : { opacity: 1, scaleY: [1, 0.82, 1] }
                }
                transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
          </span>
        );
      })}
    </Wrapper>
  );
}
