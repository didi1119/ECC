"use client";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import CodeDiff from "../../../components/CodeDiff";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const hookSteps = [
  { number: 1, title: "確認工具已安裝", description: "prettier、eslint、vitest 都要在 package.json 裡" },
  { number: 2, title: "建立 PostToolUse Hook", description: "每次 Claude 寫完檔案後自動觸發" },
  { number: 3, title: "疊加 Lint + 型別檢查", description: "格式化之後再跑 ESLint 和 tsc" },
  { number: 4, title: "加入 PreToolUse 守衛", description: "阻擋超過 800 行的單一檔案" },
  { number: 5, title: "加入 Stop Hook", description: "對話結束時自動跑 build 最終確認" },
];

const beforeJson = `// 沒有 hooks 設定
{
  "model": "claude-sonnet-4-5"
}`;

const afterJson = `{
  "model": "claude-sonnet-4-5",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npm run format -- \\"$FILE_PATH\\"",
        "description": "Auto-format after every edit"
      },
      {
        "matcher": "Write|Edit",
        "command": "npm run lint -- \\"$FILE_PATH\\"",
        "description": "Lint after format"
      },
      {
        "matcher": "Write|Edit",
        "command": "npx tsc --noEmit --pretty false",
        "description": "Type-check after edit"
      }
    ],
    "Stop": [
      {
        "command": "npm run build",
        "description": "Final build check at end of session"
      }
    ]
  }
}`;

const beforeGuard = `// 沒有 PreToolUse 守衛
// Claude 可能產生 1200 行的巨型檔案`;

const afterGuard = `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "command": "node -e \\"
          let d='';
          process.stdin.on('data',c=>d+=c);
          process.stdin.on('end',()=>{
            const lines = (JSON.parse(d).tool_input?.content||'').split('\\\\n').length;
            if(lines>800){
              console.error('BLOCKED: '+lines+' lines > 800');
              process.exit(2);
            }
            console.log(d);
          })
        \\"",
        "description": "Block files > 800 lines"
      }
    ]
  }
}`;

export default function HooksSetupPage() {
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
          <span className="text-xs" style={{ color: "var(--accent-orange)" }}>Hooks 自動化設定</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🪝</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Hooks 自動化設定</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-orange)" }}>讓 Claude 每次寫完程式碼就自動格式化、Lint、型別檢查</p>
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-blue)" }}>📋 前置需求</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              確認你的 <code style={{ color: "var(--text-primary)" }}>package.json</code> 有 <code style={{ color: "var(--text-primary)" }}>format</code>、<code style={{ color: "var(--text-primary)" }}>lint</code> 腳本，以及 <code style={{ color: "var(--text-primary)" }}>vitest</code> 或 <code style={{ color: "var(--text-primary)" }}>jest</code> 已安裝。
            </p>
          </div>
        </div>

        {/* Steps Overview */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>📋 設定流程</h2>
          <StepFlow steps={hookSteps} />
        </div>

        {/* Step 1 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>步驟 1：建立 PostToolUse Hook</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            在專案根目錄建立或修改 <code style={{ color: "var(--text-primary)" }}>.claude.json</code>（或 <code style={{ color: "var(--text-primary)" }}>~/.claude/settings.json</code> 設定全域 hooks）：
          </p>
          <CodeDiff
            before={beforeJson}
            after={afterJson}
            language="json"
            title=".claude.json — 加入 hooks"
          />
          <div className="mt-4 space-y-3">
            <PitfallBox type="gotcha" title="用 npx 安裝不可靠">
              Hook command 裡用 <code>npx prettier</code> 會在每次觸發時下載最新版，速度慢且版本不一致。請改用專案本地的腳本（<code>npm run format</code>）。
            </PitfallBox>
            <PitfallBox type="warning" title="Hook 在專案根目錄執行">
              <code>$FILE_PATH</code> 是絕對路徑，但 command 的工作目錄是 <code>.claude.json</code> 所在的資料夾。確認你的腳本支援傳入路徑參數。
            </PitfallBox>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>步驟 2：加入 PreToolUse 守衛（防止巨型檔案）</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            這個守衛會在 Claude 寫出超過 800 行的檔案前攔截，強制拆分成小模組：
          </p>
          <CodeDiff
            before={beforeGuard}
            after={afterGuard}
            language="json"
            title="PreToolUse 800 行守衛"
            beforeLabel="❌ 沒有守衛"
            afterLabel="✅ 加入守衛"
          />
          <div className="mt-4">
            <PitfallBox type="tip" title="先手動測試再掛上 Hook">
              在掛上 hook 之前，先在終端手動跑一次指令（如 <code>npm run format -- src/foo.ts</code>），確認它正常執行後再設定。
            </PitfallBox>
          </div>
        </div>

        {/* Step 3: Hook 觸發示意 */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>步驟 3：確認 Hook 正常觸發</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>設定完成後，讓 Claude 修改任意一個檔案，你應該會看到類似這樣的輸出：</p>
          <div className="rounded-xl p-4 font-mono text-xs space-y-1" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent-blue)" }}>✏️  Edit: src/utils/cart.ts</div>
            <div style={{ color: "var(--text-secondary)" }}>⚡ Hook: Auto-format after every edit</div>
            <div style={{ color: "var(--accent-green)" }}>   → prettier --write src/utils/cart.ts ✓</div>
            <div style={{ color: "var(--text-secondary)" }}>⚡ Hook: Lint after format</div>
            <div style={{ color: "var(--accent-green)" }}>   → eslint src/utils/cart.ts ✓</div>
            <div style={{ color: "var(--text-secondary)" }}>⚡ Hook: Type-check after edit</div>
            <div style={{ color: "var(--accent-green)" }}>   → tsc --noEmit ✓</div>
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>🚀 試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="幫我在 .claude.json 設定 PostToolUse hook，每次寫完 .ts 或 .tsx 檔案就自動跑 npm run format 和 npm run lint" description="讓 Claude 幫你設定 hooks" />
            <CommandBlock command="幫我加入 PreToolUse hook，阻擋任何超過 800 行的單一檔案寫入" description="防巨型檔案守衛" />
            <CommandBlock command="幫我設定 Stop hook，在每次對話結束時自動執行 npm run build 確認沒有 build 錯誤" description="結束時自動驗證 build" />
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/expert/multi-agent" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>← 並行 Agent</Link>
          <Link href="/scenarios/expert/tdd-mastery" className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: "var(--accent-blue)", color: "var(--bg-base)" }}>
            下一個：TDD 實戰 →
          </Link>
        </div>
      </div>
    </div>
  );
}
