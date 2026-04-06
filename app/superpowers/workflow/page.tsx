import Link from "next/link";
import Navbar from "../../components/Navbar";
import RevealOnScroll from "../../components/RevealOnScroll";
import { SKILLS_BY_SLUG } from "../data";

// Workflow-specific annotations only — color/emoji/invocation derived from skill data
const WORKFLOW_META = [
  { number: 1, slug: "brainstorming",                   title: "Brainstorming",       trigger: "開始任何新功能時",    output: "docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md",       description: "每個功能從設計開始，而非從代碼開始。AI 透過一次一個問題的方式澄清需求，提出 2-3 種方案，並產出設計文件。你的批准是進入下一步的門票。" },
  { number: 2, slug: "using-git-worktrees",             title: "Git Worktrees",        trigger: "設計批准後",          output: ".worktrees/<feature-name>/ 上的新分支",                       description: "設計批准後，為功能建立隔離的 git worktree。這讓你可以同時在多個功能上工作，而不會互相污染。基準測試必須通過才能繼續。" },
  { number: 3, slug: "writing-plans",                   title: "Writing Plans",        trigger: "建立 worktree 後",    output: "docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md",         description: "把設計文件拆解成 2-5 分鐘的 TDD 任務。每個任務都有完整的代碼片段、確切的檔案路徑和測試指令。計畫存到 docs/superpowers/plans/。" },
  { number: 4, slug: "subagent-driven-development",     title: "Subagent Dev",         trigger: "計畫已就緒時",        output: "每個任務的 commit",                                            description: "每個任務派發一個全新的子代理來實作。每個任務完成後，依序通過規格合規和代碼品質兩個審查階段。兩者都通過才算完成。" },
  { number: 5, slug: "test-driven-development",         title: "TDD",                  trigger: "每個任務的實作階段",  output: "通過測試的代碼 + commit",                                      description: "每個子代理在實作時都遵循 RED-GREEN-REFACTOR 循環。先寫失敗測試，確認它真的失敗，再寫最少的代碼讓它通過，最後重構。" },
  { number: 6, slug: "requesting-code-review",          title: "Code Review",          trigger: "每個任務完成後",      output: "審查報告 + 修復",                                              description: "任務完成後對照規格書自我審查，然後由代碼品質審查員審查。Critical 問題必須修復才能繼續。這個步驟防止問題累積。" },
  { number: 7, slug: "finishing-a-development-branch",  title: "Finish Branch",        trigger: "所有任務完成後",      output: "合併的代碼或 Pull Request",                                    description: "所有任務完成後，執行完整測試套件，然後選擇：本地合併、建立 PR、保留或捨棄。worktree 在選項 1/2/4 後自動清除。" },
] as const;

const WORKFLOW_STEPS = WORKFLOW_META.map((m) => ({
  ...m,
  color: SKILLS_BY_SLUG[m.slug].color,
  emoji: SKILLS_BY_SLUG[m.slug].emoji,
  invocation: SKILLS_BY_SLUG[m.slug].name,
}));

export const metadata = {
  title: "7 步驟工作流程 — Superpowers",
  description: "從設計到合併的完整 Superpowers 開發流程",
};

export default function WorkflowPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <main className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <RevealOnScroll>
            <div className="mb-12 text-center">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 uppercase tracking-wider"
                style={{
                  backgroundColor: "rgba(124,106,239,0.12)",
                  border: "1px solid rgba(124,106,239,0.3)",
                  color: "var(--accent-brand)",
                }}
              >
                完整流程
              </div>
              <h1
                className="text-3xl font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                7 步驟開發工作流程
              </h1>
              <p
                className="text-lg leading-relaxed max-w-xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                Superpowers 的核心是一套從設計到合併的完整流程，每個步驟都由專屬技能支援。
              </p>
            </div>
          </RevealOnScroll>

          {/* Workflow steps */}
          <div className="relative">
            {/* Vertical connector */}
            <div
              className="absolute left-6 top-8 bottom-8 w-0.5"
              style={{ backgroundColor: "var(--border-subtle)" }}
            />

            <div className="space-y-4">
              {WORKFLOW_STEPS.map((step, i) => (
                <RevealOnScroll key={step.number} delay={i * 80}>
                  <div className="flex gap-6">
                    {/* Step circle */}
                    <div className="shrink-0 relative z-10">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                        style={{
                          backgroundColor: `${step.color}18`,
                          border: `2px solid ${step.color}55`,
                        }}
                      >
                        {step.emoji}
                      </div>
                    </div>

                    {/* Step card */}
                    <div
                      className="flex-1 rounded-xl border p-5 mb-4"
                      style={{
                        backgroundColor: "var(--bg-surface-1)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <span
                            className="text-xs font-mono mr-2"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            Step {step.number}
                          </span>
                          <h2
                            className="text-lg font-bold inline"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {step.title}
                          </h2>
                        </div>
                        <Link
                          href={`/superpowers/skills/${step.slug}`}
                          className="shrink-0 text-xs px-2 py-1 rounded-lg transition-colors"
                          style={{
                            backgroundColor: `${step.color}15`,
                            color: step.color,
                            border: `1px solid ${step.color}30`,
                          }}
                        >
                          詳細說明 →
                        </Link>
                      </div>

                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div
                          className="rounded-lg px-3 py-2"
                          style={{
                            backgroundColor: "var(--bg-surface-2)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          <span style={{ color: "var(--text-tertiary)" }}>
                            觸發時機：
                          </span>
                          <span
                            className="ml-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {step.trigger}
                          </span>
                        </div>
                        <div
                          className="rounded-lg px-3 py-2 font-mono"
                          style={{
                            backgroundColor: `${step.color}08`,
                            border: `1px solid ${step.color}20`,
                            color: step.color,
                          }}
                        >
                          {step.invocation}
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* CTA */}
          <RevealOnScroll delay={600}>
            <div
              className="mt-12 rounded-2xl border p-8 text-center"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                borderColor: "var(--border-medium)",
              }}
            >
              <h2
                className="text-xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                準備開始了嗎？
              </h2>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                從 Brainstorming 開始你的第一個 Superpowers 功能開發
              </p>
              <Link
                href="/superpowers/skills/brainstorming"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                style={{
                  backgroundColor: "var(--accent-brand)",
                  color: "#fff",
                }}
              >
                開始 Brainstorming →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </main>
    </div>
  );
}
