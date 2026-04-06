import Link from "next/link";
import type { SkillData } from "../data/types";

interface SkillCardProps {
  skill: SkillData;
  showPhase?: boolean;
}

export default function SkillCard({ skill, showPhase = false }: SkillCardProps) {
  return (
    <Link
      href={`/superpowers/skills/${skill.slug}`}
      className="group block rounded-xl p-4 transition-all duration-200 skill-card"
      style={
        {
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          "--skill-hover-border": `${skill.color}4d`,
          "--skill-hover-shadow": `0 0 0 1px ${skill.color}30, 0 8px 32px -8px ${skill.color}20`,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0 mt-0.5">{skill.emoji}</span>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="font-mono text-sm font-semibold"
              style={{ color: skill.color }}
            >
              {skill.name}
            </span>
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {skill.shortDesc}
          </p>
        </div>
      </div>

      {showPhase && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider"
            style={{
              backgroundColor: `${skill.color}18`,
              color: skill.color,
              border: `1px solid ${skill.color}30`,
            }}
          >
            {skill.phase}
          </span>
        </div>
      )}
    </Link>
  );
}
