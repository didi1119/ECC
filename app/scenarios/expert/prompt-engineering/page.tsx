"use client";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import CodeDiff from "../../../components/CodeDiff";
import PitfallBox from "../../../components/PitfallBox";
import ChatDemo from "../../../components/ChatDemo";

const badPlan = `/plan 做一個電商網站`;

const goodPlan = `/plan 為現有的 Next.js 14 專案（使用 Supabase + Stripe）新增「訂閱方案」功能：

背景：
- 現有 auth 系統已完成（不要動它）
- 資料庫：Supabase PostgreSQL
- 支付：Stripe（已有 API key 設定）

需求：
- 三種方案：Free / Pro($9.9/mo) / Team($29/mo)
- 升級/降級要立即生效
- 取消訂閱後當期結束才失效

非目標（這次不做）：
- 發票與收據功能
- 優惠碼系統
- 年繳方案

請分成可以獨立 merge 的 phase，每個 phase 列出：受影響的檔案路徑、風險等級`;

const badOutput = `# 電商網站計畫

我會幫你做一個完整的電商網站，包含：
- 商品頁面
- 購物車
- 結帳流程
- 會員系統
...（20 行模糊描述，沒有具體步驟）`;

const goodOutput = `# 訂閱方案功能計畫

## Phase 1：資料庫 Schema（低風險，可獨立 merge）
- 新增 subscriptions 表：id, user_id, plan, status, period_end
- 修改：supabase/migrations/003_subscriptions.sql

## Phase 2：Stripe Webhook 處理（中風險）
- 新增：app/api/webhooks/stripe/route.ts
- 處理：checkout.completed, customer.subscription.updated, customer.subscription.deleted

## Phase 3：前端方案選擇 UI（低風險）
- 新增：app/settings/billing/page.tsx
- 依賴：Phase 1 完成

風險：Phase 2 需要 Stripe test mode 驗證，建議先在測試環境跑完整 webhook 流程`;

const iterateChat = [
  {
    role: "user" as const,
    content: "Phase 2 太大了，能分得更細嗎？",
  },
  {
    role: "claude" as const,
    content: `好的，Phase 2 拆成：

**Phase 2a：Webhook 基礎設施**
- 建立 webhook handler + signature 驗證
- 只處理 checkout.completed

**Phase 2b：訂閱狀態同步**
- 處理 subscription.updated / deleted
- 更新 Supabase subscriptions 表

這樣每個 PR 更小，更容易 review ✅`,
  },
  {
    role: "user" as const,
    content: "Phase 1 要注意什麼 migration 的問題嗎？",
  },
  {
    role: "claude" as const,
    content: `Phase 1 風險點：

1. **現有 users 表** — 新增 subscriptions 表後需要 FK constraint，確認沒有孤兒資料
2. **RLS Policy** — subscriptions 需要設定 Row Level Security，否則用戶能看到他人訂閱
3. **回滾** — Migration 加上對應的 down migration 以備不時之需

建議：先在 Supabase Studio 手動測試 schema，確認後再寫進 migration file`,
  },
];

export default function PromptEngineeringPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <span style={{ color: "var(--text-tertiary)" }}>/</span>
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <span style={{ color: "var(--text-tertiary)" }}>/</span>
          <span className="text-xs" style={{ color: "var(--accent-orange)" }}>提示工程</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✍️</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>高效 /plan 提示工程</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-orange)" }}>寫出讓 Claude 產出可執行計畫的提示詞</p>
            </div>
          </div>
        </div>

        {/* Why it matters */}
        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-orange)" }}>💡 為什麼提示詞品質這麼重要？</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            模糊的 <code style={{ color: "var(--text-primary)" }}>/plan</code> 會產出「做一個登入系統」這種沒有具體步驟的計畫，浪費大量 context window。
            好的提示詞可以讓 Claude 在第一次就產出可直接執行的分段計畫。
          </p>
        </div>

        {/* Prompt Anatomy */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🔬 有效 /plan 提示的四個要素</h2>
          <div className="space-y-3">
            {[
              { icon: "📍", label: "背景（Context）", desc: "現有的技術棧、已完成的部分、不能動的地方", color: "var(--accent-blue)" },
              { icon: "🎯", label: "需求（Requirements）", desc: "具體的功能點，越精確越好", color: "var(--accent-green)" },
              { icon: "🚫", label: "非目標（Non-goals）", desc: "明確說「這次不做」，防止範疇蔓延", color: "var(--accent-rose)" },
              { icon: "📦", label: "產出格式（Output format）", desc: "要求列出受影響的檔案路徑、風險等級、可獨立 merge 的 phase", color: "var(--accent-brand)" },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold mb-0.5" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Comparison */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>📝 提示詞對比</h2>
          <CodeDiff
            before={badPlan}
            after={goodPlan}
            beforeLabel="❌ 模糊（產出無法執行的計畫）"
            afterLabel="✅ 具體（產出可立即執行的計畫）"
            title="/plan 提示詞品質"
          />
        </div>

        {/* Output Comparison */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>📊 計畫產出品質對比</h2>
          <CodeDiff
            before={badOutput}
            after={goodOutput}
            beforeLabel="❌ 模糊提示的輸出"
            afterLabel="✅ 具體提示的輸出"
            title="計畫品質差異"
          />
          <div className="mt-4">
            <PitfallBox type="gotcha" title="沒有檔案路徑的計畫不可執行">
              計畫如果只說「建立一個 API」而不說具體路徑（如 <code>app/api/stripe/route.ts</code>），Claude 之後實作時每次都要重新猜位置，浪費 context。要求計畫必須包含完整路徑。
            </PitfallBox>
          </div>
        </div>

        {/* Iterating on plan */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>🔄 如何迭代計畫</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            計畫不滿意時直接在對話框說「調整」，不需要重新 /plan：
          </p>
          <ChatDemo messages={iterateChat} />
          <div className="mt-4 space-y-3">
            <PitfallBox type="tip" title="「可以獨立 merge」是最好的 phase 分割原則">
              每個 phase 完成後都應該可以 merge 到 main 而不破壞現有功能。這迫使 Claude 設計出更乾淨的介面邊界。
            </PitfallBox>
            <PitfallBox type="warning" title="計畫確認後才開始實作">
              收到計畫後先仔細看，確認 phase 分割合理、風險評估正確再說 yes。一旦開始實作，修改計畫的代價很高。
            </PitfallBox>
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🚀 試試看</h2>
          <div className="space-y-3">
            <CommandBlock command={badPlan} description="❌ 不要這樣寫" />
            <CommandBlock command={goodPlan} description="✅ 套用這個範本，改成你的功能" />
            <CommandBlock
              command="/plan Phase 2 太大，拆細一點，每個 phase 最多影響 3 個檔案"
              description="迭代計畫的標準說法"
            />
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/expert/tdd-mastery" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>← TDD 實戰</Link>
          <Link href="/scenarios/expert/full-cycle" className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "var(--accent-green)", color: "var(--bg-base)" }}>
            下一個：完整全流程 →
          </Link>
        </div>
      </div>
    </div>
  );
}
