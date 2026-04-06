import Link from "next/link";
import Navbar from "./components/Navbar";
import CommandBlock from "./components/CommandBlock";
import HoverCard from "./components/HoverCard";
import RevealOnScroll from "./components/RevealOnScroll";

const scenarios = [
  {
    href: "/scenarios/beginner",
    emoji: "🌱",
    title: "新手入門",
    subtitle: "第一天使用 ECC",
    story: "你剛裝好 ECC，不知道從哪裡開始...",
    commands: ["/plan", "/code-review"],
    difficulty: "入門",
    difficultyColor: "var(--accent-green)",
    time: "10 分鐘",
    accentHex: "#34d399",
  },
  {
    href: "/scenarios/feature-dev",
    emoji: "🚀",
    title: "功能開發",
    subtitle: "從需求到上線",
    story: "老闆說要加購物車功能，你需要從零開始...",
    commands: ["/plan", "/tdd", "/build-fix"],
    difficulty: "初級",
    difficultyColor: "var(--accent-blue)",
    time: "15 分鐘",
    accentHex: "#60a5fa",
  },
  {
    href: "/scenarios/code-quality",
    emoji: "🔍",
    title: "程式碼品質",
    subtitle: "PR 被打回來了",
    story: "reviewer 說你的程式碼有問題，如何快速修好...",
    commands: ["/code-review", "/refactor-clean"],
    difficulty: "初級",
    difficultyColor: "var(--accent-brand)",
    time: "10 分鐘",
    accentHex: "#7c6aef",
  },
  {
    href: "/scenarios/automation",
    emoji: "⚡",
    title: "自動化魔法",
    subtitle: "讓 Claude 幫你省時間",
    story: "每次存檔都要手動格式化，你想要自動化一切...",
    commands: ["Hooks", "/loop"],
    difficulty: "中級",
    difficultyColor: "var(--accent-amber)",
    time: "15 分鐘",
    accentHex: "#fbbf24",
  },
  {
    href: "/scenarios/advanced",
    emoji: "🧠",
    title: "進階編排",
    subtitle: "多 Agent 並行作戰",
    story: "一個大任務需要同時處理前後端和測試...",
    commands: ["/multi-plan", "/orchestrate"],
    difficulty: "進階",
    difficultyColor: "var(--accent-rose)",
    time: "20 分鐘",
    accentHex: "#f472b6",
  },
];

const expertScenarios = [
  {
    href: "/scenarios/expert/self-healing",
    emoji: "🔁",
    title: "Agent 自我修復迴圈",
    story: "設定自動化迴圈，Claude 持續跑測試、發現問題、修復、再測試",
    tags: ["AnimatedTerminal", "/loop", "自動修復"],
    accentHex: "#fb923c",
  },
  {
    href: "/scenarios/expert/prd-pipeline",
    emoji: "⚙️",
    title: "PRD 到上線全自動",
    story: "PM 丟需求文件，ECC 自動跑完規劃、實作、審查、部署整條流水線",
    tags: ["ProgressPipeline", "/prp-plan", "全自動"],
    accentHex: "#7c6aef",
  },
  {
    href: "/scenarios/expert/multi-agent",
    emoji: "🤝",
    title: "多 Agent 即時協作",
    story: "前端、後端、基礎設施三個 Agent 同時出動，即時視覺化進度",
    tags: ["ParallelAgentViz", "/multi-plan", "並行"],
    accentHex: "#60a5fa",
  },
  {
    href: "/scenarios/expert/hooks-setup",
    emoji: "🪝",
    title: "Hooks 自動化設定",
    story: "每次寫完程式碼自動格式化、Lint、型別檢查，設定一次長期受益",
    tags: ["PostToolUse", "PreToolUse", "實作教學"],
    accentHex: "#34d399",
  },
  {
    href: "/scenarios/expert/tdd-mastery",
    emoji: "🧪",
    title: "TDD 完整實戰",
    story: "RED → GREEN → IMPROVE 三階段完整教學，含壞提示 vs 好提示對比",
    tags: ["/tdd", "RED-GREEN-IMPROVE", "實作教學"],
    accentHex: "#f472b6",
  },
  {
    href: "/scenarios/expert/prompt-engineering",
    emoji: "✍️",
    title: "高效 /plan 提示工程",
    story: "寫出讓 Claude 產出可執行計畫的提示詞，含四要素拆解和迭代技巧",
    tags: ["/plan", "提示詞", "實作教學"],
    accentHex: "#7c6aef",
  },
  {
    href: "/scenarios/expert/full-cycle",
    emoji: "🚀",
    title: "完整功能開發全流程",
    story: "7 步驟端到端：/plan → Hooks → /tdd → /code-review → /security-review → commit",
    tags: ["總結篇", "端到端", "實作教學"],
    accentHex: "#fb923c",
  },
];

const quickCommands = [
  { cmd: "/plan", desc: "規劃任務，等你確認才動手" },
  { cmd: "/code-review", desc: "審查程式碼品質與安全性" },
  { cmd: "/tdd", desc: "先寫測試的開發流程" },
  { cmd: "/build-fix", desc: "自動修復建置錯誤" },
  { cmd: "/docs", desc: "自動生成文件" },
  { cmd: "/refactor-clean", desc: "清理重複與無用程式碼" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)",
          }}
        />

        {/* Violet glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(124,106,239,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-8"
            style={{
              backgroundColor: "rgba(124,106,239,0.08)",
              border: "1px solid rgba(124,106,239,0.2)",
              color: "var(--accent-brand)",
            }}
          >
            ⬡ Everything Claude Code
          </div>

          <h1
            className="font-bold mb-6 leading-[1.1]"
            style={{
              fontSize: "clamp(2.5rem, 1rem + 5vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>30 分鐘</span>
            <br />
            <span className="gradient-text">從零掌握 ECC</span>
          </h1>

          <p
            className="mb-3 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: "1.7" }}
          >
            透過真實情境，學習如何用 38 個專用 Agent 和 72 個自訂指令提升開發效率
          </p>
          <p className="text-sm mb-12" style={{ color: "var(--text-tertiary)" }}>
            不需要 AI 開發經驗 · 每個情境都有可直接複製的指令
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            <Link
              href="/scenarios/beginner"
              className="nav-cta-btn px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: "var(--accent-brand)",
                color: "#fff",
              }}
            >
              從新手入門開始
            </Link>
            <Link
              href="/cheatsheet"
              className="nav-link px-6 py-3 rounded-lg font-medium text-sm transition-all"
              style={{
                backgroundColor: "transparent",
                border: "1px solid var(--border-medium)",
                color: "var(--text-primary)",
              }}
            >
              直接看速查表
            </Link>
          </div>

          {/* Stats -- inline pills */}
          <div className="flex items-center justify-center gap-6">
            {[
              { num: "38", label: "Agents" },
              { num: "72", label: "指令" },
              { num: "5+", label: "情境" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span
                  className="text-2xl font-bold font-mono"
                  style={{ color: "var(--accent-brand)" }}
                >
                  {stat.num}
                </span>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="px-6 pb-20" style={{ paddingTop: "clamp(2rem, 1rem + 3vw, 5rem)" }}>
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <h2
              className="text-center font-semibold mb-2"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.015em", color: "var(--text-primary)" }}
            >
              選擇你的情境
            </h2>
            <p
              className="text-center mb-10"
              style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}
            >
              每個情境從一個真實開發問題出發，帶你學會對應的 ECC 工具
            </p>
          </RevealOnScroll>

          {/* Featured first card + grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s, i) => (
              <RevealOnScroll key={s.href} delay={i * 80}>
                <HoverCard
                  href={s.href}
                  accentHex={s.accentHex}
                  className={`p-6 ${i === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] uppercase font-semibold px-2 py-0.5 rounded-md tracking-wider"
                        style={{
                          backgroundColor: `${s.accentHex}15`,
                          color: s.difficultyColor,
                          border: `1px solid ${s.accentHex}30`,
                        }}
                      >
                        {s.difficulty}
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {s.time}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)", fontSize: "1rem" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: s.difficultyColor }}>
                    {s.subtitle}
                  </p>
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
                  >
                    {s.story}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {s.commands.map((cmd) => (
                      <code
                        key={cmd}
                        className="text-xs px-2 py-0.5 rounded-md font-mono"
                        style={{
                          backgroundColor: "var(--bg-surface-2)",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {cmd}
                      </code>
                    ))}
                  </div>
                </HoverCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Scenarios — visually distinct */}
      <section
        className="px-6 pb-20 pt-16 relative"
        style={{
          backgroundColor: "var(--bg-surface-1)",
          borderTop: "1px solid var(--border-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(244,114,182,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          <RevealOnScroll>
            {/* Dramatic divider with glow */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, var(--accent-rose), transparent)",
                  opacity: 0.3,
                }}
              />
              <span
                className="text-xs uppercase font-bold tracking-[0.15em] px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(244,114,182,0.12)",
                  color: "var(--accent-rose)",
                  border: "1px solid rgba(244,114,182,0.25)",
                  boxShadow: "0 0 20px rgba(244,114,182,0.1)",
                }}
              >
                高手區域
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to left, transparent, var(--accent-rose), transparent)",
                  opacity: 0.3,
                }}
              />
            </div>

            <h2
              className="font-semibold mb-2"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.015em", color: "var(--text-primary)" }}
            >
              高手情境
            </h2>
            <p
              className="mb-8"
              style={{ color: "var(--text-secondary)", fontSize: "0.9375rem" }}
            >
              進階技巧 — 每個情境都有互動動畫讓你直觀理解運作方式
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {expertScenarios.map((s, i) => (
              <RevealOnScroll key={s.href} delay={i * 80}>
                <HoverCard
                  href={s.href}
                  accentHex={s.accentHex}
                  className="p-5 expert-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <span
                      className="text-[11px] uppercase font-semibold px-2 py-0.5 rounded-md tracking-wider"
                      style={{
                        backgroundColor: "rgba(244,114,182,0.08)",
                        color: "var(--accent-rose)",
                        border: "1px solid rgba(244,114,182,0.15)",
                      }}
                    >
                      高手
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.story}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <code
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md font-mono"
                        style={{
                          backgroundColor: "var(--bg-surface-2)",
                          border: "1px solid var(--border-subtle)",
                          color: s.accentHex,
                        }}
                      >
                        {tag}
                      </code>
                    ))}
                  </div>
                </HoverCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Commands */}
      <section className="px-6 pb-20 pt-20">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div
              className="rounded-xl p-8"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <h2
                className="font-semibold mb-1"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.015em", color: "var(--text-primary)" }}
              >
                最常用的 6 個指令
              </h2>
              <p className="mb-6" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                記住這些，你已掌握 ECC 的 80% 核心功能
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickCommands.map((item) => (
                  <div
                    key={item.cmd}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--bg-surface-2)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <code
                      className="font-mono font-bold text-sm flex-shrink-0"
                      style={{ color: "var(--accent-blue)" }}
                    >
                      {item.cmd}
                    </code>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Install */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll>
            <h2
              className="font-semibold mb-2"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.015em", color: "var(--text-primary)" }}
            >
              還沒安裝 ECC？
            </h2>
            <p className="mb-6" style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              一行指令完成安裝
            </p>
            <CommandBlock
              command="git clone https://github.com/affaan-m/everything-claude-code.git && cd everything-claude-code && node scripts/install-apply.js --profile full"
              description="安裝 ECC（全功能版）"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          ECC 情境教學 · 基於{" "}
          <a
            href="https://github.com/affaan-m/everything-claude-code"
            className="hover:underline transition-colors"
            style={{ color: "var(--accent-blue)" }}
          >
            everything-claude-code
          </a>
        </p>
      </footer>
    </div>
  );
}
