import Link from "next/link";
import type { SkillData } from "../data/types";

interface SkillDetailProps {
  skill: SkillData;
  allSkills: readonly SkillData[];
}

export default function SkillDetail({ skill, allSkills }: SkillDetailProps) {
  const related = skill.relatedSlugs
    .map((slug) => allSkills.find((s) => s.slug === slug))
    .filter((s): s is SkillData => !!s);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{skill.emoji}</span>
          <div>
            <h1
              className="text-2xl font-bold font-mono"
              style={{ color: skill.color }}
            >
              {skill.name}
            </h1>
            <span
              className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider"
              style={{
                backgroundColor: `${skill.color}18`,
                color: skill.color,
                border: `1px solid ${skill.color}30`,
              }}
            >
              {skill.phase}
            </span>
          </div>
        </div>
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.shortDesc}
        </p>
      </div>

      {/* What it does */}
      <section
        className="mb-8 rounded-xl border p-6"
        style={{
          backgroundColor: "var(--bg-surface-1)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          📖 這個技能在做什麼？
        </h2>
        <div className="space-y-3">
          {skill.whatItDoes.split("\n\n").map((para) => (
            <p
              key={para.slice(0, 32)}
              className="leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* When to use */}
      <section
        className="mb-8 rounded-xl border p-6"
        style={{
          backgroundColor: "var(--bg-surface-1)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          🕐 什麼時候用？
        </h2>
        <ul className="space-y-2">
          {skill.whenToUse.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 shrink-0 text-sm"
                style={{ color: "var(--accent-green)" }}
              >
                ✓
              </span>
              <span style={{ color: "var(--text-primary)" }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Invocation */}
      <section
        className="mb-8 rounded-xl border p-6"
        style={{
          backgroundColor: "var(--bg-surface-1)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          💬 如何啟用？
        </h2>
        <div
          className="rounded-lg p-4 font-mono text-sm"
          style={{
            backgroundColor: `${skill.color}11`,
            border: `1px solid ${skill.color}33`,
          }}
        >
          <span
            className="select-none mr-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            &gt;
          </span>
          <span style={{ color: skill.color }}>use {skill.name}</span>
        </div>
      </section>

      {/* Steps */}
      {skill.steps.length > 0 && (
        <section
          className="mb-8 rounded-xl border p-6"
          style={{
            backgroundColor: "var(--bg-surface-1)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <h2
            className="text-base font-semibold mb-5 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            🔢 執行步驟
          </h2>
          <div className="space-y-0">
            {skill.steps.map((step, i) => (
              <div key={step.number} className="flex gap-4">
                {/* Step number + connector line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      backgroundColor: `${skill.color}22`,
                      border: `2px solid ${skill.color}55`,
                      color: skill.color,
                    }}
                  >
                    {step.number}
                  </div>
                  {i < skill.steps.length - 1 && (
                    <div
                      className="w-0.5 flex-1 my-1"
                      style={{ backgroundColor: `${skill.color}25`, minHeight: "20px" }}
                    />
                  )}
                </div>
                {/* Step content */}
                <div className="pb-5 flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                  {step.command && (
                    <code
                      className="inline-block text-xs px-2 py-0.5 rounded font-mono"
                      style={{
                        backgroundColor: `${skill.color}12`,
                        color: skill.color,
                        border: `1px solid ${skill.color}25`,
                      }}
                    >
                      {step.command}
                    </code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chat example */}
      {skill.chatExample.length > 0 && (
        <section
          className="mb-8 rounded-xl border p-6"
          style={{
            backgroundColor: "var(--bg-surface-1)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <h2
            className="text-base font-semibold mb-5 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            🤖 對話範例
          </h2>
          <div className="space-y-4">
            {skill.chatExample.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "claude" && (
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: "rgba(124,106,239,0.2)" }}
                  >
                    🤖
                  </div>
                )}
                <div
                  className="rounded-xl px-4 py-3 text-sm max-w-[85%]"
                  style={
                    msg.role === "user"
                      ? {
                          backgroundColor: "rgba(96,165,250,0.15)",
                          border: "1px solid rgba(96,165,250,0.3)",
                          color: "var(--text-primary)",
                        }
                      : {
                          backgroundColor: "var(--bg-surface-2)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-primary)",
                        }
                  }
                >
                  <p className="whitespace-pre-wrap font-sans leading-relaxed text-sm">
                    {msg.content}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ backgroundColor: "rgba(96,165,250,0.15)" }}
                  >
                    👤
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key principles */}
      {skill.keyPrinciples.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-base font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            ⚡ 核心原則
          </h2>
          <div className="space-y-2">
            {skill.keyPrinciples.map((principle) => (
              <div
                key={principle.slice(0, 32)}
                className="rounded-xl border px-4 py-3 text-sm"
                style={{
                  backgroundColor: `${skill.color}08`,
                  borderColor: `${skill.color}25`,
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ color: skill.color }} className="mr-2">
                  →
                </span>
                {principle}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related skills */}
      {related.length > 0 && (
        <section className="mb-8">
          <h3
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--text-tertiary)" }}
          >
            相關技能
          </h3>
          <div className="flex flex-wrap gap-2">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/superpowers/skills/${s.slug}`}
                className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-all"
                style={{
                  backgroundColor: "var(--bg-surface-1)",
                  borderColor: "var(--border-subtle)",
                  color: s.color,
                }}
              >
                <span>{s.emoji}</span>
                <span className="font-mono font-medium text-xs">{s.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
