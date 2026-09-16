"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Phase = "typing" | "holding" | "deleting" | "waiting";

type TypewriterOptions = {
  /** Milliseconds between characters while typing. */
  speed?: number;
  /** Delay before typing starts. */
  startDelay?: number;
  /** Called once the whole string has been revealed (fires once per type pass, so also on every loop). */
  onComplete?: () => void;
  /** Skip the animation and render the final text immediately. */
  disabled?: boolean;
  /** Change this value to re-run the animation from the beginning. */
  resetKey?: string | number;
  /** Type, pause, delete, pause, then type again — forever — instead of stopping once fully typed. */
  loop?: boolean;
  /** How long the fully-typed text stays on screen before it starts deleting. Only used when `loop` is true. */
  holdDuration?: number;
  /** Milliseconds between characters while deleting. Defaults to a faster pace than typing. Only used when `loop` is true. */
  deleteSpeed?: number;
  /** Blank pause after everything is deleted, before typing starts again. Only used when `loop` is true. */
  pauseBeforeRestart?: number;
};

type TypewriterResult = {
  displayedText: string;
  isDone: boolean;
};

/**
 * Types a single string one character at a time.
 * Honours `prefers-reduced-motion` by rendering the full text instantly (loop is ignored in that case).
 *
 * The animation runs as a recursive `setTimeout` chain guarded by a `cancelled` flag rather than
 * `setInterval` + bare closure variables. This makes it safe under React 18 Strict Mode's dev-only
 * double effect invocation: any timer left over from a cancelled effect run becomes a no-op the
 * moment it fires, instead of continuing to push state updates.
 */
export function useTypewriter(text: string, options: TypewriterOptions = {}): TypewriterResult {
  const {
    speed = 50,
    startDelay = 0,
    onComplete,
    disabled = false,
    resetKey,
    loop = false,
    holdDuration = 1800,
    deleteSpeed = Math.max(20, Math.round(speed / 2)),
    pauseBeforeRestart = 500,
  } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const skip = disabled || prefersReducedMotion;

  const [displayedText, setDisplayedText] = useState(skip ? text : "");
  const [isDone, setIsDone] = useState(skip);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (skip) {
      // Reduced motion / disabled: render the finished text immediately, no looping.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with an external system (the OS motion preference)
      setDisplayedText(text);
      setIsDone(true);
      return;
    }

    setDisplayedText("");
    setIsDone(false);

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let index = 0;
    let phase: Phase = "typing";

    const run = () => {
      if (cancelled) return;

      if (phase === "typing") {
        index += 1;
        setDisplayedText(text.slice(0, index));

        if (index >= text.length) {
          onCompleteRef.current?.();
          if (!loop) {
            setIsDone(true);
            return;
          }
          phase = "holding";
          timeoutId = setTimeout(run, holdDuration);
          return;
        }
        timeoutId = setTimeout(run, speed);
        return;
      }

      if (phase === "holding") {
        phase = "deleting";
        timeoutId = setTimeout(run, deleteSpeed);
        return;
      }

      if (phase === "deleting") {
        index -= 1;
        setDisplayedText(text.slice(0, Math.max(index, 0)));

        if (index <= 0) {
          phase = "waiting";
          timeoutId = setTimeout(run, pauseBeforeRestart);
          return;
        }
        timeoutId = setTimeout(run, deleteSpeed);
        return;
      }

      // phase === "waiting"
      index = 0;
      phase = "typing";
      timeoutId = setTimeout(run, speed);
    };

    timeoutId = setTimeout(run, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay, skip, resetKey, loop, holdDuration, deleteSpeed, pauseBeforeRestart]);

  return { displayedText, isDone };
}

type SequentialResult = {
  /** Text revealed so far per line, in the same order as the input array. */
  lines: string[];
  /** True while a line is actively being typed or deleted. */
  isTyping: boolean;
  /** Index of the line currently being typed/deleted (`lines.length` when finished and not looping). */
  activeLine: number;
  isDone: boolean;
};

/**
 * Types several lines one after another: line 2 starts only after line 1 finished.
 * Used by the Home hero headline (prd.md section 13a).
 *
 * With `loop: true`, once every line is typed the hook waits `holdDuration`, deletes the
 * lines back to front (last line first), pauses `pauseBeforeRestart`, then types them all
 * again — forever, until the component unmounts.
 */
export function useSequentialTypewriter(
  sourceLines: string[],
  options: TypewriterOptions = {},
): SequentialResult {
  const {
    speed = 50,
    startDelay = 0,
    onComplete,
    disabled = false,
    resetKey,
    loop = false,
    holdDuration = 1800,
    deleteSpeed = Math.max(20, Math.round(speed / 2)),
    pauseBeforeRestart = 500,
  } = options;
  const prefersReducedMotion = usePrefersReducedMotion();
  const skip = disabled || prefersReducedMotion;
  const linesKey = sourceLines.join("\u0000");

  const [state, setState] = useState<{ lines: string[]; activeLine: number; isDone: boolean }>(
    () =>
      skip
        ? { lines: [...sourceLines], activeLine: sourceLines.length, isDone: true }
        : { lines: sourceLines.map(() => ""), activeLine: 0, isDone: false },
  );

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const linesSource = linesKey.split("\u0000");

    if (skip) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with an external system (the OS motion preference)
      setState({ lines: [...linesSource], activeLine: linesSource.length, isDone: true });
      return;
    }

    setState({ lines: linesSource.map(() => ""), activeLine: 0, isDone: false });

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let lineIndex = 0;
    let charIndex = 0;
    let phase: Phase = "typing";

    const applyLineText = (text: string, done: boolean) => {
      setState((previous) => {
        const nextLines = [...previous.lines];
        nextLines[lineIndex] = text;
        return { lines: nextLines, activeLine: lineIndex, isDone: done };
      });
    };

    const run = () => {
      if (cancelled) return;
      const currentLine = linesSource[lineIndex] ?? "";

      if (phase === "typing") {
        charIndex += 1;
        applyLineText(currentLine.slice(0, charIndex), false);

        if (charIndex >= currentLine.length) {
          const isLastLine = lineIndex === linesSource.length - 1;
          if (isLastLine) {
            onCompleteRef.current?.();
            if (!loop) {
              setState((previous) => ({ ...previous, isDone: true, activeLine: linesSource.length }));
              return;
            }
            phase = "holding";
            timeoutId = setTimeout(run, holdDuration);
            return;
          }
          lineIndex += 1;
          charIndex = 0;
        }
        timeoutId = setTimeout(run, speed);
        return;
      }

      if (phase === "holding") {
        // Start deleting from the last line backward.
        phase = "deleting";
        charIndex = currentLine.length;
        timeoutId = setTimeout(run, deleteSpeed);
        return;
      }

      if (phase === "deleting") {
        charIndex -= 1;

        if (charIndex <= 0) {
          applyLineText("", false);

          if (lineIndex === 0) {
            phase = "waiting";
            timeoutId = setTimeout(run, pauseBeforeRestart);
            return;
          }

          lineIndex -= 1;
          charIndex = (linesSource[lineIndex] ?? "").length;
          timeoutId = setTimeout(run, deleteSpeed);
          return;
        }

        applyLineText(currentLine.slice(0, charIndex), false);
        timeoutId = setTimeout(run, deleteSpeed);
        return;
      }

      // phase === "waiting": everything is erased, start a fresh type pass.
      lineIndex = 0;
      charIndex = 0;
      phase = "typing";
      setState({ lines: linesSource.map(() => ""), activeLine: 0, isDone: false });
      timeoutId = setTimeout(run, speed);
    };

    timeoutId = setTimeout(run, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [linesKey, speed, startDelay, skip, resetKey, loop, holdDuration, deleteSpeed, pauseBeforeRestart]);

  return {
    lines: state.lines,
    isTyping: !state.isDone && state.activeLine < state.lines.length,
    activeLine: state.activeLine,
    isDone: state.isDone,
  };
}