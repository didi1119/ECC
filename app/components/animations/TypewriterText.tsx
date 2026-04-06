"use client";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  reducedMotion?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 28,
  reducedMotion = false,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState(reducedMotion ? text : "");
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setDone(true);
      onComplete?.();
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reducedMotion, onComplete]);

  return (
    <span
      data-testid="typewriter-container"
      className={className}
      // Announce the completed text to screen readers, not every character
      aria-live="polite"
      aria-atomic="true"
      aria-label={done ? text : undefined}
    >
      {displayed}
      {!done && (
        // Cursor is decorative — hidden from screen readers
        <span
          aria-hidden="true"
          className="inline-block w-0.5 h-4 ml-0.5 align-middle animate-pulse"
          style={{ backgroundColor: "var(--accent-green)" }}
        />
      )}
    </span>
  );
}
