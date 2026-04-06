import Link from "next/link";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";

const multiPlanMessages = [
  {
    role: "user" as const,
    content: "/multi-plan 重構整個電商平台：前端 React 升級 + 後端 API 重寫 + 資料庫遷移",
  },
  {
    role: "claude" as const,
    content: `# 多 Agent 並行計劃

## 拆分策略
將任務分配給 3 個並行 Agent：

**Agent A — 前端重構** 🎨
- React 18 升級
- 元件重構
- 估計：6 小時

**Agent B — 後端 API 重寫** ⚙️
- REST → GraphQL 遷移
- 身份驗證重構
- 估計：8 小時

**Agent C — 資料庫遷移** 🗄️
- Schema 更新
- 資料遷移腳本
- 估計：4 小時

## 並行執行優勢
串行：18 小時 → 並行：**8 小時**（節省 55%）

## 依賴關係
\`\`\`
前端 ─────┐
後端 ─────┼──► 整合測試 ──► 部署
資料庫 ───┘
\`\`\`

⏸️ 確認後啟動 3 個並行 Agent？`,
  },
  {
    role: "user" as const,
    content: "yes",
  },
  {
    role: "claude" as const,
    content: `🚀 啟動 3 個並行 Agent

Agent A [前端] 🟡 進行中...
Agent B [後端] 🟡 進行中...
Agent C [資料庫] 🟢 完成 (4h)

輸入 /multi-plan status 查看進度`,
  },
];

const agents = [
  { name: "planner", desc: "規劃任務，等確認才動手", trigger: "/plan", color: "var(--accent-blue)" },
  { name: "code-reviewer", desc: "審查程式碼品質與安全性", trigger: "/code-review", color: "var(--accent-green)" },
  { name: "tdd-guide", desc: "測試驅動開發引導", trigger: "/tdd", color: "var(--accent-brand)" },
  { name: "build-error-resolver", desc: "自動修復建置錯誤", trigger: "/build-fix", color: "var(--accent-orange)" },
  { name: "security-reviewer", desc: "OWASP 安全漏洞掃描", trigger: "自動觸發", color: "var(--accent-rose)" },
  { name: "architect", desc: "系統架構設計決策", trigger: "自動觸發", color: "var(--accent-amber)" },
  { name: "doc-updater", desc: "自動更新文件", trigger: "/docs", color: "var(--accent-blue)" },
  { name: "refactor-cleaner", desc: "清理死碼與重構", trigger: "/refactor-clean", color: "var(--accent-green)" },
];

export default function AdvancedPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
            <span style={{ color: "var(--text-tertiary)" }}>/</span>
            <span className="text-xs" style={{ color: "var(--accent-rose)" }}>進階編排</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🧠</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>進階編排</h1>
              <p style={{ color: "var(--accent-rose)" }}>多 Agent 並行作戰</p>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-rose)" }}>📖 情境故事</p>
            <p style={{ color: "var(--text-secondary)" }}>
              技術主管阿強接到重構任務：同時要升級前端框架、重寫後端 API、遷移資料庫。
              他用 <code style={{ color: "var(--accent-blue)" }}>/multi-plan</code> 把任務拆給三個並行 Agent 同時執行，
              原本需要 18 小時的工作，8 小時內全部完成。
            </p>
          </div>
        </div>

        {/* Agent ecosystem */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>🤖 ECC 的 38 個 Agents</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            每個 Agent 都是專門化的 AI，只負責自己擅長的領域。以下是最常用的 8 個：
          </p>
          <div className="grid grid-cols-1 gap-2">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: agent.color }}
                />
                <code className="font-mono text-sm flex-shrink-0 w-40" style={{ color: agent.color }}>{agent.name}</code>
                <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{agent.desc}</span>
                <code className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>{agent.trigger}</code>
              </div>
            ))}
          </div>
        </div>

        {/* /multi-plan demo */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>💬 /multi-plan 多 Agent 並行</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            <code style={{ color: "var(--accent-rose)" }}>/multi-plan</code> 自動拆分大任務，
            啟動多個 Agent 並行執行，大幅縮短時間
          </p>
          <ChatDemo messages={multiPlanMessages} title="情境示範 — 電商平台重構" />
        </div>

        {/* Parallel execution concept */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>⚡ 為什麼並行這麼重要？</h2>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-rose)" }}>❌ 串行執行（慢）</p>
              <div className="space-y-1">
                {["前端重構 → 6h", "後端重寫 → 8h", "資料庫遷移 → 4h"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-6 rounded text-xs flex items-center px-3 font-mono" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", width: `${parseInt(item.split("→")[1]) * 24}px`, minWidth: "80px" }}>
                      {item}
                    </div>
                  </div>
                ))}
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>總計：<span style={{ color: "var(--accent-rose)" }}>18 小時</span></p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-green)" }}>✅ 並行執行（快）</p>
              <div className="space-y-1">
                {["前端重構 → 6h", "後端重寫 → 8h", "資料庫遷移 → 4h"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="h-6 rounded text-xs flex items-center px-3 font-mono" style={{ backgroundColor: "rgba(52,211,153,0.15)", color: "var(--accent-green)", width: `${parseInt(item.split("→")[1]) * 24}px`, minWidth: "80px" }}>
                      {item}
                    </div>
                  </div>
                ))}
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                  總計：<span style={{ color: "var(--accent-green)" }}>8 小時</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(52,211,153,0.15)", color: "var(--accent-green)" }}>節省 55%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced commands */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🛠️ 進階指令</h2>
          <div className="space-y-3">
            <CommandBlock command="/multi-plan 你的大型任務描述" description="拆分任務給多個並行 Agent" />
            <CommandBlock command="/orchestrate" description="手動編排 Agent 執行順序" />
            <CommandBlock command="/multi-execute" description="同時執行多個獨立任務" />
            <CommandBlock command="/devfleet" description="啟動完整開發艦隊（多 Agent 協作）" />
          </div>
        </div>

        {/* When to use */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🎯 什麼時候用多 Agent？</h2>
          <div className="space-y-2">
            {[
              { use: "用多 Agent", examples: ["大型重構（前後端同時改）", "多模組並行開發", "跨語言專案（TypeScript + Python）"], color: "var(--accent-green)" },
              { use: "用單 Agent", examples: ["單一功能開發", "小 bug 修復", "文件更新"], color: "var(--text-secondary)" },
            ].map((item) => (
              <div
                key={item.use}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface-1)", border: `1px solid ${item.color}25` }}
              >
                <p className="font-semibold text-sm mb-2" style={{ color: item.color }}>✓ {item.use}</p>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex) => (
                    <span key={ex} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(13,17,23,0.5)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/automation" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>
            ← 自動化魔法
          </Link>
          <Link
            href="/cheatsheet"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--accent-blue)", color: "var(--accent-blue)" }}
          >
            📋 查看完整速查表 →
          </Link>
        </div>
      </div>
    </div>
  );
}
