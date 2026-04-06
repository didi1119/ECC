import type { PhaseInfo, SkillData } from "../data/types";
import SkillCard from "./SkillCard";

interface PhaseSectionProps {
  phase: PhaseInfo;
  skills: SkillData[];
}

export default function PhaseSection({ phase, skills }: PhaseSectionProps) {
  if (skills.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{
            backgroundColor: `${phase.color}18`,
            border: `1px solid ${phase.color}30`,
          }}
        >
          {phase.emoji}
        </div>
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {phase.label}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            {phase.description}
          </p>
        </div>
        <div
          className="ml-auto text-xs font-mono px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${phase.color}12`,
            color: phase.color,
            border: `1px solid ${phase.color}25`,
          }}
        >
          {skills.length} 個技能
        </div>
      </div>

      {/* Phase connector line */}
      <div
        className="ml-5 border-l-2 pl-8 pb-2"
        style={{ borderColor: `${phase.color}25` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
