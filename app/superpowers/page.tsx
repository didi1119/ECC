import Link from "next/link";
import Navbar from "../components/Navbar";
import RevealOnScroll from "../components/RevealOnScroll";
import PhaseSection from "./components/PhaseSection";
import { ALL_SKILLS, PHASES, SKILLS_BY_PHASE, SKILLS_BY_SLUG } from "./data";

export const metadata = {
  title: "Superpowers — 為 Claude Code 打造的技能庫",
  description:
    "14 個可組合的技能，涵蓋設計、開發、版控、品質與除錯。讓 AI 代理更有系統地開發軟體。",
};

const INSTALL_STEPS = [
  {
    step: "1",
    title: "Clone 技能庫",
    description: "將 Superpowers 技能庫加入你的專案",
    code: "git clone https://github.com/obra/superpowers vendor/superpowers",
    color: "#60a5fa",
  },
  {
    step: "2",
    title: "執行安裝腳本",
    description: "將技能複製到 Claude Code 全域技能目錄",
    code: ".\\scripts\\install-superpowers.ps1",
    codeAlt: "bash scripts/install-superpowers.sh",
    color: "#34d399",
  },
  {
    step: "3",
    title: "驗證安裝",
    description: "在 Claude Code 中輸入以下指令確認安裝成功",
    code: "use superpowers:using-superpowers",
    color: "#7c6aef",
  },
];

const WORKFLOW_PILL_SLUGS = [
  { label: "Brainstorm",    slug: "brainstorming" },
  { label: "Worktree",      slug: "using-git-worktrees" },
  { label: "Write Plan",    slug: "writing-plans" },
  { label: "Subagent Dev",  slug: "subagent-driven-development" },
  { label: "TDD",           slug: "test-driven-development" },
  { label: "Code Review",   slug: "requesting-code-review" },
  { label: "Finish Branch", slug: "finishing-a-development-branch" },
] as const;

const WORKFLOW_PILLS = WORKFLOW_PILL_SLUGS.map((p) => ({
  ...p,
  color: SKILLS_BY_SLUG[p.slug].color,
}));

export default function SuperpowersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-4 pt-24 pb-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,106,239,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <RevealOnScroll>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(124,106,239,0.12)",
                  border: "1px solid rgba(124,106,239,0.3)",
                  color: "var(--accent-brand)",
                }}
              >
                ⚡ obra/superpowers
              </div>
              <h1
                className="font-bold mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                }}
              >
                為{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-brand), var(--accent-blue))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Claude Code
                </span>{" "}
                打造的技能庫
              </h1>
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                14 個可組合的開發技能，涵蓋設計、版控、TDD、代碼審查與除錯。
                讓 AI 代理從直覺猜測變成系統化專業開發。
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/superpowers/workflow"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                  style={{
                    backgroundColor: "var(--accent-brand)",
                    color: "#fff",
                  }}
                >
                  7 步驟工作流程 →
                </Link>
                <Link
                  href="#install"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                  style={{
                    backgroundColor: "var(--bg-surface-2)",
                    border: "1px solid var(--border-medium)",
                    color: "var(--text-secondary)",
                  }}
                >
                  安裝指南 ↓
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Workflow pills */}
        <RevealOnScroll delay={100}>
          <section className="px-4 pb-16">
            <div className="max-w-3xl mx-auto">
              <p
                className="text-center text-xs font-medium uppercase tracking-wider mb-4"
                style={{ color: "var(--text-tertiary)" }}
              >
                7 步驟工作流程
              </p>
              <div className="flex flex-wrap justify-center items-center gap-2">
                {WORKFLOW_PILLS.map((pill, i) => (
                  <div key={pill.slug} className="flex items-center gap-2">
                    <Link
                      href={`/superpowers/skills/${pill.slug}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor: `${pill.color}15`,
                        border: `1px solid ${pill.color}35`,
                        color: pill.color,
                      }}
                    >
                      {pill.label}
                    </Link>
                    {i < WORKFLOW_PILLS.length - 1 && (
                      <span style={{ color: "var(--text-tertiary)", fontSize: "10px" }}>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll delay={150}>
          <section className="px-4 pb-16">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "14", label: "個技能", color: "var(--accent-brand)" },
                  { value: "6", label: "個階段", color: "var(--accent-green)" },
                  { value: "7", label: "步驟工作流程", color: "var(--accent-blue)" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border p-4 text-center"
                    style={{
                      backgroundColor: "var(--bg-surface-1)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* Install guide */}
        <RevealOnScroll delay={200}>
          <section id="install" className="px-4 pb-20">
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                安裝指南
              </h2>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                三步驟完成安裝，在任何 Claude Code 專案中使用
              </p>

              <div className="space-y-4">
                {INSTALL_STEPS.map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl border p-5"
                    style={{
                      backgroundColor: "var(--bg-surface-1)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{
                          backgroundColor: `${s.color}18`,
                          border: `2px solid ${s.color}40`,
                          color: s.color,
                        }}
                      >
                        {s.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-sm mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.title}
                        </p>
                        <p
                          className="text-xs mb-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {s.description}
                        </p>
                        <code
                          className="block text-xs font-mono px-3 py-2 rounded-lg overflow-x-auto"
                          style={{
                            backgroundColor: `${s.color}0e`,
                            border: `1px solid ${s.color}25`,
                            color: s.color,
                          }}
                        >
                          {s.code}
                        </code>
                        {s.codeAlt && (
                          <code
                            className="block text-xs font-mono px-3 py-2 rounded-lg overflow-x-auto mt-2"
                            style={{
                              backgroundColor: "var(--bg-surface-2)",
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-tertiary)",
                            }}
                          >
                            # Mac / Linux: {s.codeAlt}
                          </code>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>

        {/* All skills by phase */}
        <section className="px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                所有技能
              </h2>
              <p
                className="text-sm mb-10"
                style={{ color: "var(--text-secondary)" }}
              >
                {ALL_SKILLS.length} 個技能，按開發階段分類
              </p>
            </RevealOnScroll>

            {PHASES.map((phase, i) => (
              <RevealOnScroll key={phase.id} delay={i * 60}>
                <PhaseSection
                  phase={phase}
                  skills={SKILLS_BY_PHASE[phase.id]}
                />
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
