import Link from "next/link";
import Navbar from "../../components/Navbar";
import CommandBlock from "../../components/CommandBlock";
import ChatDemo from "../../components/ChatDemo";

const reviewMessages = [
  {
    role: "user" as const,
    content: "/code-review",
  },
  {
    role: "claude" as const,
    content: `# 程式碼審查報告

## 🔴 CRITICAL（必須修復）
**SQL 注入風險** — \`userController.ts:34\`
\`\`\`ts
// 危險！直接拼接 SQL
const query = \`SELECT * FROM users WHERE id = \${userId}\`;

// 正確做法：使用參數化查詢
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);
\`\`\`

## ⚠️ HIGH（建議修復）
**函式過長** — \`processOrder.ts\`（87 行，超過建議的 50 行）
拆分建議：validateOrder()、calculateTotal()、saveOrder()

## 💡 MEDIUM
- 缺少 API 回應型別定義
- console.log 未清除（3 處）

## 結論
❌ BLOCK — 有 CRITICAL 安全漏洞，合併前必須修復`,
  },
];

const refactorMessages = [
  {
    role: "user" as const,
    content: "/refactor-clean",
  },
  {
    role: "claude" as const,
    content: `# 重構清理報告

## 🗑️ 死碼偵測

找到以下可安全刪除的項目：

**未使用的函式（3個）：**
- utils/formatDate.ts → formatDateLegacy()（已被 dayjs 替代）
- helpers/string.ts → capitalizeFirst()（未被任何地方引用）
- api/deprecated.ts（整個檔案，已有新版本）

**重複程式碼（2處）：**
- components/UserCard.tsx 與 components/ProfileCard.tsx
  有 40 行幾乎相同的程式碼，建議提取為 BaseCard 元件

## 📦 節省空間
刪除後預計減少：~180 行程式碼

是否執行清理？(yes/preview)`,
  },
  {
    role: "user" as const,
    content: "yes",
  },
  {
    role: "claude" as const,
    content: `✅ 清理完成

已刪除：
- utils/formatDate.ts → formatDateLegacy()
- helpers/string.ts → capitalizeFirst()
- api/deprecated.ts

已重構：
- 提取 BaseCard 元件，UserCard 和 ProfileCard 繼承使用

共減少 **182 行**程式碼 🎉`,
  },
];

export default function CodeQualityPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
            <span style={{ color: "var(--text-tertiary)" }}>/</span>
            <span className="text-xs" style={{ color: "var(--accent-brand)" }}>程式碼品質</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔍</span>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>程式碼品質</h1>
              <p style={{ color: "var(--accent-brand)" }}>PR 被打回來了</p>
            </div>
          </div>

          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "rgba(124,106,239,0.06)", border: "1px solid rgba(124,106,239,0.2)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-brand)" }}>📖 情境故事</p>
            <p style={{ color: "var(--text-secondary)" }}>
              小美的 PR 被 reviewer 說「有 SQL 注入風險」和「函式太長」。
              她跑了 <code style={{ color: "var(--accent-blue)" }}>/code-review</code>，
              Claude 找出了 1 個 CRITICAL 問題和 2 個 HIGH 問題，並附上修復範例。
              另外用 <code style={{ color: "var(--accent-blue)" }}>/refactor-clean</code> 清掉了 180 行死碼，
              PR 終於順利合併了。
            </p>
          </div>
        </div>

        {/* Severity levels */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>📊 嚴重程度說明</h2>
          <div className="space-y-2">
            {[
              { level: "CRITICAL", icon: "🔴", desc: "安全漏洞或資料損失風險", action: "BLOCK — 必須修復才能合併", color: "var(--accent-rose)" },
              { level: "HIGH", icon: "🟠", desc: "Bug 或重大品質問題", action: "WARN — 建議修復才合併", color: "var(--accent-orange)" },
              { level: "MEDIUM", icon: "🟡", desc: "可維護性問題", action: "INFO — 考慮修復", color: "var(--accent-amber)" },
              { level: "LOW", icon: "🟢", desc: "風格或次要建議", action: "NOTE — 可選", color: "var(--accent-green)" },
            ].map((item) => (
              <div
                key={item.level}
                className="flex items-center gap-4 p-3 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface-1)", border: `1px solid ${item.color}20` }}
              >
                <span>{item.icon}</span>
                <code className="font-mono font-bold text-sm w-20" style={{ color: item.color }}>{item.level}</code>
                <span className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>{item.desc}</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo: /code-review */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>💬 /code-review 示範</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            ECC 的 code-reviewer agent 自動檢查安全性、程式品質、測試覆蓋率
          </p>
          <ChatDemo messages={reviewMessages} title="情境示範 — PR 提交前的程式碼審查" />
        </div>

        {/* Demo: /refactor-clean */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>💬 /refactor-clean 示範</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            自動掃描死碼、重複程式碼，安全刪除不再使用的部分
          </p>
          <ChatDemo messages={refactorMessages} title="情境示範 — 清理死碼" />
        </div>

        {/* Security checklist */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🛡️ 安全檢查清單</h2>
          <div
            className="rounded-xl p-5"
            style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>ECC 的 /code-review 會自動檢查這些項目：</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                "無硬編碼密鑰（API key、密碼）",
                "SQL 注入防護（參數化查詢）",
                "XSS 防護（HTML 轉義）",
                "CSRF 保護啟用",
                "使用者輸入已驗證",
                "錯誤訊息不洩漏敏感資訊",
                "無 console.log 殘留",
                "測試覆蓋率 ≥ 80%",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-green)" }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🚀 現在就試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="/code-review" description="審查目前專案的程式碼" />
            <CommandBlock command="/refactor-clean" description="清理死碼和重複程式碼" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/feature-dev" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>
            ← 功能開發
          </Link>
          <Link
            href="/scenarios/automation"
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--accent-orange)", color: "var(--bg-base)" }}
          >
            下一章：自動化魔法 →
          </Link>
        </div>
      </div>
    </div>
  );
}
