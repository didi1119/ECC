"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

interface HoverCardProps {
  href: string;
  accentHex: string;
  className?: string;
  children: React.ReactNode;
}

export default function HoverCard({ href, accentHex, className = "", children }: HoverCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.borderColor = `${accentHex}4d`;
    el.style.boxShadow = `0 0 0 1px ${accentHex}30, 0 8px 32px -8px ${accentHex}12`;
  }, [accentHex]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.borderColor = "var(--border-subtle)";
    el.style.boxShadow = "none";
  }, []);

  return (
    <Link
      ref={ref}
      href={href}
      className={`group block rounded-xl transition-all card-hover ${className}`}
      style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}
