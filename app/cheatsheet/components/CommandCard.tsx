"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import type { CommandData } from "../data/types";
import CategoryBadge from "./CategoryBadge";

interface CommandCardProps {
  command: CommandData;
}

export default function CommandCard({ command }: CommandCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.borderColor = `${command.color}4d`;
    el.style.boxShadow = `0 0 0 1px ${command.color}30, 0 8px 32px -8px ${command.color}12`;
  }, [command.color]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.borderColor = "var(--border-subtle)";
    el.style.boxShadow = "none";
  }, []);

  return (
    <Link
      ref={ref}
      href={`/cheatsheet/commands/${command.slug}`}
      className="group block rounded-xl p-5 transition-all card-hover"
      style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{command.emoji}</span>
          <span
            className="font-mono font-bold text-base"
            style={{ color: command.color }}
          >
            {command.name}
          </span>
        </div>
        <CategoryBadge category={command.category} size="sm" />
      </div>
      <p
        className="text-sm leading-relaxed line-clamp-2"
        style={{ color: "var(--text-secondary)" }}
      >
        {command.shortDesc}
      </p>
      <div className="mt-3 flex items-center gap-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
        <span>點擊看詳細說明</span>
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </Link>
  );
}
