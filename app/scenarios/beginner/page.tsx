import Link from "next/link";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";
import StepFlow from "../../components/StepFlow";

const steps = [
  {
    number: 1,
    title: "確認 ECC 已安裝",
    description: "打開 Claude Code，輸入 / 看看有沒有出現自訂指令選單",
    command: "/plan",
    color: "#3fb950",
  },
  {
    number: 2,
    title: "用 /plan 規劃你的第一個任務",
    description: "告訴 Claude 你想做什麼，它會幫你規劃步驟，但不會立刻動手寫程式",
    command: "/plan 我想建一個待辦事項清單 App",
    color: "#58a6ff",
  },
  {
    number: 3,
    title: "確認計劃後開始實作",
    description: "看完計劃，回覆 yes 讓 Claude 開始執行",
    command: "yes",
    color: "#bc8cff",
  },
  {
    number: 4,
    title: "寫完後用 /code-review 審查",
    description: "讓 ECC 的 code-reviewer agent 自動找出潛在問題",
    command: "/code-review",
    color: "#ffa657",
  },
];

const chatMessages = [
  {
    role: "user" as const,
    content: "/plan 我想做一個簡單的待辦事項清單 App，用 React 寫",
  },
  {
    role: "claude" as const,
    content: `# 實作規劃：待辦事項清單 App

## 需求確認
- React 前端應用程式
- 支援新增、刪除、完成待辦事項
- 本地儲存（localStorage）

## 實作階段

**Phase 1：專案初始化**
- create-react-app 或 Vite + React
- 基礎目錄結構

**Phase 2：核心元件**
- TodoList 主元件
- TodoItem 子元件
- AddTodo 輸入元件

**Phase 3：狀態管理**
- useState 管理清單
- useLocalStorage 持久化

## 預估時間：30-45 分鐘

⏸️ **等待確認**：是否依此計劃進行？`,
  },
  {
    role: "user" as const,
    content: "yes",
  },
  {
    role: "claude" as const,
    content: "好的！開始實作 Phase 1...\n\n已建立專案結構：\n✅ src/components/TodoList.tsx\n✅ src/components/TodoItem.tsx\n✅ src/components/AddTodo.tsx\n✅ src/hooks/useLocalStorage.ts",
  },
];

const codeReviewMessages = [
  {
    role: "user" as const,
    content: "/code-review",
  },
  {
    role: "claude" as const,
    content: `# 程式碼審查報告

## ✅ 通過項目
- 元件命名清晰（PascalCase）
- Props 有 TypeScript 型別定義
- 無硬編碼字串

## ⚠️ 建議改善（MEDIUM）
- TodoItem.tsx：缺少 key prop 警告處理
- useLocalStorage.ts：未處理 JSON 解析錯誤

## 🔧 建議修復
\`\`\`tsx
// 建議加入錯誤處理
try {
  return JSON.parse(stored);
} catch {
  return initialValue;
}
\`\`\`

整體評分：**B+** · 可以合併，建議修復 MEDIUM 問題`,
  },
];

export default function BeginnerPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
            <span style={{ color: "#6e7681" }}>/</span>
            <span className="text-xs" style={{ color: "#3fb950" }}>新手入門</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🌱</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>新手入門</h1>
              <p style={{ color: "#3fb950" }}>第一天使用 ECC</p>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "#3fb950" }}>📖 情境故事</p>
            <p style={{ color: "#8b949e" }}>
              小明剛安裝好 ECC，打開 Claude Code 卻不知道要怎麼用。
              他試著打 <code style={{ color: "#58a6ff" }}>/plan</code>，
              發現 Claude 會先幫他規劃好步驟，等他確認後才開始動手。
              寫完程式後再用 <code style={{ color: "#58a6ff" }}>/code-review</code>，
              Claude 自動找出三個問題，十分鐘內全部修好了。
            </p>
          </div>
        </div>

        {/* What you'll learn */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🎯 本章節學習重點</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📋", title: "/plan 指令", desc: "先規劃，後執行" },
              { icon: "🔍", title: "/code-review 指令", desc: "自動程式碼審查" },
              { icon: "✅", title: "確認流程", desc: "yes / modify / no" },
              { icon: "🤖", title: "planner agent", desc: "專門負責規劃的 AI" },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="font-semibold text-sm" style={{ color: "#e6edf3" }}>{item.title}</div>
                <div className="text-xs" style={{ color: "#8b949e" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Flow */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-6" style={{ color: "#e6edf3" }}>📚 操作步驟</h2>
          <StepFlow steps={steps} />
        </div>

        {/* Demo: /plan */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>💬 實際對話示範：/plan</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            輸入 <code style={{ color: "#58a6ff" }}>/plan</code> 後，描述你想做什麼，Claude 會列出完整計劃等你確認
          </p>
          <ChatDemo messages={chatMessages} title="情境示範 — /plan 規劃功能" />
        </div>

        {/* Demo: /code-review */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>💬 實際對話示範：/code-review</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>
            寫完程式後輸入 <code style={{ color: "#58a6ff" }}>/code-review</code>，自動找問題
          </p>
          <ChatDemo messages={codeReviewMessages} title="情境示範 — /code-review 審查程式碼" />
        </div>

        {/* Tips */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>💡 新手必知技巧</h2>
          <div className="space-y-3">
            {[
              {
                tip: "/plan 的核心價值：它不會立刻動手寫程式",
                detail: "很多人一開始誤以為 /plan 就是要讓 Claude 開始寫，其實它會先列出計劃等你確認，避免方向跑偏。",
                color: "#3fb950",
              },
              {
                tip: "回覆 modify: xxx 可以調整計劃",
                detail: '不用重新說一遍需求，直接說「modify: 改用 Vue 而不是 React」，Claude 會更新計劃。',
                color: "#58a6ff",
              },
              {
                tip: "/code-review 每次完成功能後都要跑",
                detail: "養成好習慣，寫完一個功能就 /code-review，比等 PR 被打回來再改省事多了。",
                color: "#bc8cff",
              },
            ].map((item) => (
              <div
                key={item.tip}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#161b22", border: `1px solid ${item.color}30` }}
              >
                <p className="font-semibold text-sm mb-1" style={{ color: item.color }}>✓ {item.tip}</p>
                <p className="text-sm" style={{ color: "#8b949e" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🚀 現在就試試看</h2>
          <div className="space-y-3">
            <CommandBlock
              command="/plan 我想建一個簡單的計算機 App"
              description="複製這個指令到 Claude Code 試試"
            />
            <CommandBlock
              command="/code-review"
              description="寫完程式後執行這個"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/" className="text-sm hover:underline" style={{ color: "#8b949e" }}>
            ← 回首頁
          </Link>
          <Link
            href="/scenarios/feature-dev"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "#58a6ff", color: "#0d1117" }}
          >
            下一章：功能開發 →
          </Link>
        </div>
      </div>
    </div>
  );
}
