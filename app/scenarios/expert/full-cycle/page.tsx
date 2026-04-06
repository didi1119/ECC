"use client";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import CodeDiff from "../../../components/CodeDiff";
import PitfallBox from "../../../components/PitfallBox";
import ChatDemo from "../../../components/ChatDemo";
import StepFlow from "../../../components/StepFlow";

const cycleSteps = [
  { number: 1, title: "/plan — 規劃功能", description: "產出可執行的分段計畫，確認後才開始" },
  { number: 2, title: "設定 Hooks", description: "PostToolUse 自動格式化 + Lint + 型別檢查" },
  { number: 3, title: "/tdd — 核心邏輯", description: "先寫測試（RED），再實作（GREEN），再重構（IMPROVE）" },
  { number: 4, title: "/tdd — API 端點", description: "整合測試，hooks 會在每次修改後自動跑" },
  { number: 5, title: "/code-review", description: "審查品質問題，處理 CRITICAL 和 HIGH" },
  { number: 6, title: "/security-review", description: "檔案上傳必須做安全審查" },
  { number: 7, title: "Commit & PR", description: "Stop hook 自動跑 build，確認後提交" },
];

const planPrompt = `/plan 為現有的 Next.js 14 + Supabase 專案新增「用戶大頭貼上傳」功能：

背景：
- 現有 auth 系統使用 Supabase Auth（不要修改 auth 邏輯）
- Storage：Supabase Storage 已設定好 bucket

需求：
- 支援 JPG、PNG、WebP，最大 2MB
- 上傳後自動裁切成 200x200
- 即時預覽，不用重新整理
- 舊大頭貼自動刪除（避免儲存空間浪費）

非目標：
- 圖片濾鏡或編輯功能
- 大頭貼歷史紀錄

每個 phase 列出：受影響的檔案路徑、可獨立 merge`;

const reviewChat = [
  {
    role: "user" as const,
    content: "/code-review",
  },
  {
    role: "claude" as const,
    content: `Code Review 結果：

**HIGH** — \`uploadAvatar.ts:23\`
\`\`\`typescript
// 問題：沒有驗證檔案副檔名，只驗證 MIME type 不夠
if (file.type.startsWith('image/')) { ... }

// 建議：加上副檔名白名單
const ALLOWED = ['.jpg', '.jpeg', '.png', '.webp'];
const ext = path.extname(file.name).toLowerCase();
if (!ALLOWED.includes(ext)) throw new Error('不支援的格式');
\`\`\`

**MEDIUM** — \`AvatarUpload.tsx:45\`
上傳中沒有 loading 狀態，用戶可能重複點擊

**LOW** — 函式命名建議：\`handleUpload\` → \`handleAvatarUpload\` 更清楚`,
  },
];

const securityChat = [
  {
    role: "user" as const,
    content: "/security-review",
  },
  {
    role: "claude" as const,
    content: `Security Review — 檔案上傳安全審查：

**CRITICAL** — 缺少檔案大小伺服器端驗證
\`\`\`typescript
// 問題：只在前端驗證 2MB 限制，可被繞過
// 修復：在 API route 加入伺服器端驗證
if (file.size > 2 * 1024 * 1024) {
  return NextResponse.json({ error: '檔案超過 2MB' }, { status: 400 });
}
\`\`\`

**HIGH** — 上傳路徑包含用戶可控的 filename
\`\`\`typescript
// 問題：path traversal 風險
const path = \`avatars/\${userId}/\${file.name}\`;

// 修復：用 UUID 重新命名，完全不信任原始 filename
const ext = getExtension(file.name);
const path = \`avatars/\${userId}/\${randomUUID()}\${ext}\`;
\`\`\`

建議：先修復 CRITICAL，再繼續其他工作`,
  },
];

const beforeSecurity = `// 有安全漏洞的版本
const path = \`avatars/\${userId}/\${file.name}\`;
// 用戶可以上傳 "../../config/secret.env" 這樣的路徑`;

const afterSecurity = `// 修復後的版本
import { randomUUID } from 'crypto';

const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const ext = path.extname(file.name).toLowerCase();

if (!ALLOWED_EXTS.includes(ext)) {
  throw new Error('不支援的檔案格式');
}
if (file.size > 2 * 1024 * 1024) {
  throw new Error('檔案超過 2MB');
}

// 用 UUID 完全取代原始 filename
const safePath = \`avatars/\${userId}/\${randomUUID()}\${ext}\`;`;

export default function FullCyclePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
          <span style={{ color: "#6e7681" }}>/</span>
          <span className="text-xs" style={{ color: "#f85149" }}>高手情境</span>
          <span style={{ color: "#6e7681" }}>/</span>
          <span className="text-xs" style={{ color: "#ffa657" }}>完整功能開發全流程</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>完整功能開發全流程</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(248,81,73,0.15)", color: "#f85149", border: "1px solid rgba(248,81,73,0.3)" }}>高手 · 總結篇</span>
              </div>
              <p style={{ color: "#ffa657" }}>把所有高手技巧串成一條完整的開發流水線</p>
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#3fb950" }}>📖 本篇案例：用戶大頭貼上傳功能</p>
            <p className="text-sm" style={{ color: "#8b949e" }}>
              一個真實的功能需求，從規劃到 commit，走完 7 個步驟，串聯所有前面學過的技巧。
            </p>
          </div>
        </div>

        {/* Full pipeline overview */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🗺️ 七步驟全流程</h2>
          <StepFlow steps={cycleSteps} />
        </div>

        {/* Step 1: Plan */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(88,166,255,0.15)", color: "#58a6ff" }}>步驟 1</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>/plan — 規劃功能</h2>
          </div>
          <p className="text-sm mb-3" style={{ color: "#8b949e" }}>套用提示工程技巧（背景 + 需求 + 非目標 + 格式要求）：</p>
          <CommandBlock command={planPrompt} description="完整的 /plan 提示（可直接套用修改）" />
          <div className="mt-3">
            <PitfallBox type="warning" title="確認計畫才開始實作">
              收到計畫後一定要仔細檢查 phase 分割，確認 yes 之後才進入步驟 2。修改計畫比修改程式碼便宜 10 倍。
            </PitfallBox>
          </div>
        </div>

        {/* Step 2: Hooks */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,166,87,0.15)", color: "#ffa657" }}>步驟 2</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>設定 Hooks（一次設定，長期受益）</h2>
          </div>
          <p className="text-sm mb-3" style={{ color: "#8b949e" }}>在開始寫程式碼之前，先設定好自動化 hooks：</p>
          <CommandBlock command="幫我設定 PostToolUse hook：每次修改 .ts / .tsx 後自動跑 npm run format、npm run lint、npx tsc --noEmit" description="設定三道自動檢查關卡" />
          <p className="text-xs mt-2" style={{ color: "#8b949e" }}>
            設定完成後，後面所有步驟的程式碼修改都會被自動驗證。詳見
            <Link href="/scenarios/expert/hooks-setup" style={{ color: "#58a6ff" }} className="underline ml-1">Hooks 設定教學</Link>。
          </p>
        </div>

        {/* Step 3+4: TDD */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(63,185,80,0.15)", color: "#3fb950" }}>步驟 3-4</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>/tdd — 核心邏輯 + API</h2>
          </div>
          <div className="space-y-3">
            <CommandBlock
              command="/tdd 實作 validateAvatarFile(file) 函式：驗證 MIME type（jpg/png/webp）、大小 ≤ 2MB、副檔名白名單，不符合時回傳明確錯誤訊息"
              description="先 TDD 核心驗證邏輯（最容易測試的部分）"
            />
            <CommandBlock
              command="/tdd 實作 POST /api/avatar 上傳端點：驗證 → 壓縮到 200x200 → 上傳 Supabase Storage → 刪除舊圖 → 回傳新 URL"
              description="再 TDD API 端點（整合測試）"
            />
          </div>
          <p className="text-xs mt-2" style={{ color: "#8b949e" }}>
            詳見 <Link href="/scenarios/expert/tdd-mastery" style={{ color: "#58a6ff" }} className="underline">TDD 完整實戰教學</Link>。
          </p>
        </div>

        {/* Step 5: Code Review */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(188,140,255,0.15)", color: "#bc8cff" }}>步驟 5</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>/code-review</h2>
          </div>
          <ChatDemo messages={reviewChat} />
          <div className="mt-3">
            <PitfallBox type="gotcha" title="測試全過才跑 /code-review">
              在測試還有紅燈時跑 code review 會浪費一整個 context 去分析不完整的程式碼。先確保綠燈，再 review。
            </PitfallBox>
          </div>
        </div>

        {/* Step 6: Security Review */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(248,81,73,0.15)", color: "#f85149" }}>步驟 6</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>/security-review（檔案上傳必做）</h2>
          </div>
          <ChatDemo messages={securityChat} />
          <div className="mt-4">
            <h3 className="text-sm font-bold mb-3" style={{ color: "#e6edf3" }}>修復 CRITICAL 安全問題：</h3>
            <CodeDiff
              before={beforeSecurity}
              after={afterSecurity}
              language="typescript"
              title="路徑遍歷漏洞修復"
              beforeLabel="❌ 有路徑遍歷漏洞"
              afterLabel="✅ UUID 重命名 + 白名單驗證"
            />
          </div>
          <div className="mt-4 space-y-3">
            <PitfallBox type="warning" title="檔案上傳、Auth、支付 — 這三類必跑 /security-review">
              這三種功能有最多常見漏洞。不要跳過，否則上線後很容易出事。
            </PitfallBox>
            <PitfallBox type="tip" title="用 /plan 的輸出當 PR 描述">
              把規劃階段的計畫直接貼到 PR body，review 者能立刻理解每個 phase 的目標和風險評估。
            </PitfallBox>
          </div>
        </div>

        {/* Step 7: Commit */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(63,185,80,0.15)", color: "#3fb950" }}>步驟 7</span>
            <h2 className="text-lg font-bold" style={{ color: "#e6edf3" }}>Commit & PR</h2>
          </div>
          <p className="text-sm mb-3" style={{ color: "#8b949e" }}>
            如果設定了 Stop hook，對話結束前會自動跑 <code style={{ color: "#e6edf3" }}>npm run build</code> 最終確認。
          </p>
          <CommandBlock command="git add app/api/avatar app/components/AvatarUpload.tsx && git commit -m 'feat: add avatar upload with Supabase Storage'" description="提交功能（Conventional Commits 格式）" />
        </div>

        {/* Summary command chain */}
        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}>
          <p className="text-sm font-semibold mb-3" style={{ color: "#e6edf3" }}>📋 完整指令鏈（複製備用）</p>
          <div className="space-y-1 font-mono text-xs" style={{ color: "#8b949e" }}>
            {[
              { cmd: "1. /plan [功能描述]", color: "#58a6ff" },
              { cmd: "2. 確認計畫 → yes", color: "#ffa657" },
              { cmd: "3. 設定 Hooks（只需一次）", color: "#ffa657" },
              { cmd: "4. /tdd [核心邏輯]", color: "#3fb950" },
              { cmd: "5. /tdd [API 端點]", color: "#3fb950" },
              { cmd: "6. /code-review", color: "#bc8cff" },
              { cmd: "7. /security-review（敏感功能）", color: "#f85149" },
              { cmd: "8. git commit", color: "#58a6ff" },
            ].map((item) => (
              <div key={item.cmd} style={{ color: item.color }}>{item.cmd}</div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/scenarios/expert/prompt-engineering" className="text-sm hover:underline" style={{ color: "#8b949e" }}>← 提示工程</Link>
          <Link href="/cheatsheet" className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "#ffa657", color: "#0d1117" }}>
            速查表 →
          </Link>
        </div>
      </div>
    </div>
  );
}
