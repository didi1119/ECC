"use client";
import { useEffect, useState, useReducer, useRef } from "react";

export interface TerminalLine {
  type: "input" | "output" | "success" | "error" | "info";
  text: string;
  delay?: number; // ms before this line appears
}

interface AnimatedTerminalProps {
  lines: TerminalLine[];
  title?: string;
  loop?: boolean;
  loopDelay?: number;
}

const lineColor: Record<TerminalLine["type"], string> = {
  input: "var(--accent-blue)",
  output: "var(--text-secondary)",
  success: "var(--accent-green)",
  error: "var(--accent-rose)",
  info: "var(--accent-brand)",
};

const linePrefix: Record<TerminalLine["type"], string> = {
  input: "> ",
  output: "  ",
  success: "ok ",
  error: "!! ",
  info: "-> ",
};

export default function AnimatedTerminal({
  lines,
  title = "Terminal",
  loop = false,
  loopDelay = 2500,
}: AnimatedTerminalProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [, forceReset] = useReducer((x: number) => x + 1, 0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(0);

    lines.forEach((line, i) => {
      const baseDelay = lines.slice(0, i).reduce((sum, l) => sum + (l.delay ?? 500), 0);
      const t = setTimeout(() => setVisibleCount(i + 1), baseDelay + (line.delay ?? 500));
      timeoutsRef.current.push(t);
    });

    if (loop) {
      const totalDelay = lines.reduce((sum, l) => sum + (l.delay ?? 500), 0);
      const resetTimer = setTimeout(() => {
        forceReset();
      }, totalDelay + loopDelay);
      timeoutsRef.current.push(resetTimer);
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [lines, loop, loopDelay, forceReset]);

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-sm"
      style={{ backgroundColor: "var(--bg-base)", border: "1px solid var(--border-subtle)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ backgroundColor: "var(--bg-surface-1)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          {title}
        </span>
      </div>

      {/* Lines */}
      <div
        className="p-4 space-y-1.5 min-h-[120px]"
        aria-live="polite"
        aria-atomic="false"
        role="log"
      >
        {lines.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="flex gap-1 leading-relaxed"
            style={{
              color: lineColor[line.type],
              animation: "fadeInUp 0.2s ease forwards",
            }}
          >
            <span className="flex-shrink-0 select-none">{linePrefix[line.type]}</span>
            <span className="whitespace-pre-wrap">{line.text}</span>
          </div>
        ))}
        {visibleCount < lines.length && (
          <span
            aria-hidden="true"
            className="inline-block w-2 h-4 animate-pulse"
            style={{ backgroundColor: "var(--accent-green)" }}
          />
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
