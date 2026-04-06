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
  input: "#58a6ff",
  output: "#8b949e",
  success: "#3fb950",
  error: "#f85149",
  info: "#bc8cff",
};

const linePrefix: Record<TerminalLine["type"], string> = {
  input: "❯ ",
  output: "  ",
  success: "✓ ",
  error: "✗ ",
  info: "→ ",
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
    // Eagerly cancel any in-flight timeouts from the previous run before scheduling new ones.
    // This closes the gap where loop reset and old callbacks could co-exist.
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    // Intentional synchronous reset — clears stale visible lines before scheduling new ones.
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
      style={{ backgroundColor: "#0d1117", border: "1px solid #30363d" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f85149" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffa657" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3fb950" }} />
        <span className="ml-2 text-xs" style={{ color: "#8b949e" }}>{title}</span>
      </div>

      {/* Lines — aria-live announces new lines as they appear */}
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
            style={{ backgroundColor: "#3fb950" }}
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
