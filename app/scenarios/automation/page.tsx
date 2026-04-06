import Link from "next/link";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";

const hookExample = `// ~/.claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write \\"$FILE_PATH\\"",
        "description": "每次存檔自動格式化"
      }
    ]
  }
}`;

const loopMessages = [
  {
    role: "user" as const,
    content: "/loop 5m /code-review",
  },
  {
    role: "claude" as const,
    content: `已設定循環任務 ✅

**每 5 分鐘**自動執行 \`/code-review\`

目前狀態：
- 下次執行：4:58 後
- 已執行次數：0
- 模式：持續運行（直到你停止）

輸入 \`/loop-status\` 查看狀態
輸入 \`stop\` 或關閉視窗停止`,
  },
];

const hooks = [
  {
    name: "存檔自動格式化",
    trigger: "PostToolUse: Write/Edit",
    command: 'prettier --write "$FILE_PATH"',
    benefit: "永遠不需要手動跑 prettier",
    color: "#3fb950",
  },
  {
    name: "ESLint 自動修復",
    trigger: "PostToolUse: Write/Edit",
    command: 'eslint --fix "$FILE_PATH"',
    benefit: "即時修復 lint 警告",
    color: "#58a6ff",
  },
  {
    name: "提交前品質檢查",
    trigger: "PreToolUse: Bash（git commit）",
    command: "lint-staged && tsc --noEmit",
    benefit: "阻止有問題的程式碼進入 git",
    color: "#bc8cff",
  },
  {
    name: "Session 結束建置驗證",
    trigger: "Stop",
    command: "npm run build",
    benefit: "每次工作結束確認 build 正常",
    color: "#ffa657",
  },
];

export default function AutomationPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
            <span style={{ color: "#6e7681" }}>/</span>
            <span className="text-xs" style={{ color: "#ffa657" }}>自動化魔法</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚡</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>自動化魔法</h1>
              <p style={{ color: "#ffa657" }}>讓 Claude 幫你省時間</p>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "rgba(255,166,87,0.06)", border: "1px solid rgba(255,166,87,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#ffa657" }}>📖 情境故事</p>
            <p style={{ color: "#8b949e" }}>
              老王每次存檔都要手動跑 prettier，每次 commit 前都要手動跑 lint。
              他設定了 ECC 的 Hooks，從此存檔自動格式化、commit 前自動品質檢查、
              session 結束自動驗證 build。一週省下了 2 小時重複操作。
            </p>
          </div>
        </div>

        {/* Hooks concept */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>🎣 什麼是 Hooks？</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            Hooks 是在特定事件發生時自動執行的指令。不需要你手動觸發，Claude Code 自動幫你跑。
          </p>

          <div className="grid grid-cols-1 gap-3">
            {[
              { type: "PreToolUse", desc: "工具執行前觸發（可以阻止）", example: "在 git commit 前先跑 lint", color: "#58a6ff" },
              { type: "PostToolUse", desc: "工具執行後觸發", example: "存檔後自動格式化", color: "#3fb950" },
              { type: "Stop", desc: "每次 Claude 回應結束時觸發", example: "Session 結束自動跑 build", color: "#ffa657" },
            ].map((item) => (
              <div
                key={item.type}
                className="p-4 rounded-lg flex items-start gap-4"
                style={{ backgroundColor: "#161b22", border: `1px solid ${item.color}25` }}
              >
                <code className="font-mono font-bold text-sm flex-shrink-0 w-28" style={{ color: item.color }}>{item.type}</code>
                <div>
                  <p className="text-sm mb-0.5" style={{ color: "#e6edf3" }}>{item.desc}</p>
                  <p className="text-xs" style={{ color: "#6e7681" }}>例：{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common hooks */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>⚙️ 最實用的 4 個 Hook 配置</h2>
          <div className="space-y-3">
            {hooks.map((hook) => (
              <div
                key={hook.name}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#161b22", border: `1px solid ${hook.color}25` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm" style={{ color: "#e6edf3" }}>{hook.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${hook.color}15`, color: hook.color, border: `1px solid ${hook.color}30` }}
                  >
                    {hook.trigger}
                  </span>
                </div>
                <code className="block text-xs font-mono mb-2 p-2 rounded" style={{ backgroundColor: "#0d1117", color: "#8b949e" }}>
                  {hook.command}
                </code>
                <p className="text-xs" style={{ color: "#6e7681" }}>✓ {hook.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings example */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>📄 設定範例</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            修改 <code style={{ color: "#58a6ff" }}>~/.claude/settings.json</code> 加入 Hooks 設定
          </p>
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #30363d" }}>
            <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: "#1c2128", borderBottom: "1px solid #30363d" }}>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f85149" }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffa657" }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3fb950" }} />
                <span className="text-xs ml-2" style={{ color: "#8b949e" }}>~/.claude/settings.json</span>
              </div>
            </div>
            <pre className="p-4 text-xs font-mono overflow-x-auto" style={{ backgroundColor: "#161b22", color: "#8b949e" }}>
              <span style={{ color: "#8b949e" }}>{hookExample}</span>
            </pre>
          </div>
          <p className="text-xs mt-2" style={{ color: "#6e7681" }}>
            💡 ECC 已在安裝時幫你配置了許多實用的 Hooks，可以直接使用
          </p>
        </div>

        {/* /loop */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>🔁 /loop — 定時重複執行</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            用 <code style={{ color: "#ffa657" }}>/loop</code> 設定定時任務，例如每 5 分鐘自動跑一次 code review
          </p>
          <ChatDemo messages={loopMessages} title="情境示範 — /loop 定時任務" />

          <div className="mt-4 space-y-2">
            <CommandBlock command="/loop 10m /code-review" description="每 10 分鐘自動審查程式碼" />
            <CommandBlock command="/loop 30m /docs" description="每 30 分鐘自動更新文件" />
          </div>
        </div>

        {/* Quick setup */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>⚡ 快速啟用自動化</h2>
          <div className="space-y-3">
            <CommandBlock
              command="/update-config"
              description="用 ECC 的設定助手配置 Hooks"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/scenarios/code-quality" className="text-sm hover:underline" style={{ color: "#8b949e" }}>
            ← 程式碼品質
          </Link>
          <Link
            href="/scenarios/advanced"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#f85149", color: "#fff" }}
          >
            下一章：進階編排 →
          </Link>
        </div>
      </div>
    </div>
  );
}
