import type { CommandData } from "./types";

export const advancedCommands: CommandData[] = [
  {
    slug: "multi-execute",
    name: "/multi-execute",
    emoji: "⚡",
    category: "advanced",
    color: "#f85149",
    shortDesc: "同時執行多個 /prp-plan 計畫，平行實作多個功能",
    whatItDoes: `/multi-execute 是 /multi-plan 的執行搭檔。當你用 /multi-plan 產出了多份獨立的計畫文件之後，/multi-execute 會同時執行這些計畫——就像指揮多個工程師小組同時開工，每個小組負責一份計畫。

這和 /orchestrate 的核心概念相似，但 /multi-execute 是專門針對「已經有計畫文件」的情況。計畫文件裡記錄了所有細節（命名規則、錯誤處理、測試模式），所以每個執行的 Agent 都能獨立按圖施工，不需要互相溝通。

速度可以是依序執行的 2-4 倍，特別適合大型功能或多模組系統的平行開發。`,
    whenToUse: [
      "已用 /multi-plan 產出多份獨立計畫，要同時執行",
      "大型功能有多個完全獨立的模組",
      "有時間壓力，需要最快速度完成開發",
      "多個不相依的 bug 需要同時修復",
    ],
    promptExample: `/multi-execute .claude/PRPs/plans/search-feature.plan.md .claude/PRPs/plans/cart-feature.plan.md .claude/PRPs/plans/wishlist-feature.plan.md`,
    claudeMessages: [
      {
        role: "user",
        content: "/multi-execute search cart wishlist 三個計畫",
      },
      {
        role: "claude",
        content: `讀取 3 份計畫文件，確認相依性...

✅ 三個計畫無相互依賴，可平行執行

同時啟動 3 個 Agent：

**Agent A（搜尋功能）**
→ Task 1/5：建立 Elasticsearch 整合...
→ Task 2/5：搜尋 API 端點...

**Agent B（購物車功能）**
→ Task 1/4：購物車 Redux store...
→ Task 2/4：購物車 API...

**Agent C（願望清單）**
→ Task 1/3：願望清單資料庫 Schema...
→ Task 2/3：願望清單 API...

---
全部完成！

- ✅ 搜尋功能（5/5 任務，測試通過）
- ✅ 購物車功能（4/4 任務，測試通過）
- ✅ 願望清單（3/3 任務，測試通過）

總耗時：22 分鐘（估計依序執行需 65 分鐘）`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "計畫路徑要正確",
        content:
          "每個計畫文件的路徑都要正確。通常是 .claude/PRPs/plans/xxx.plan.md。",
      },
      {
        type: "gotcha",
        title: "任何一個 Agent 失敗都會停止",
        content:
          "如果某個 Agent 在執行中遇到無法解決的問題，它會停下來告訴你，其他 Agent 也會暫停等待。處理完問題後可以繼續。",
      },
      {
        type: "tip",
        title: "完整 PRP 工作流：plan → implement → execute",
        content:
          "最高效的工作流是：/multi-plan 規劃 → 確認計畫 → /multi-execute 執行 → /prp-commit 提交。",
      },
    ],
    relatedSlugs: ["multi-plan", "prp-implement", "orchestrate"],
  },
  {
    slug: "devfleet",
    name: "/devfleet",
    emoji: "🚢",
    category: "advanced",
    color: "#f85149",
    shortDesc: "啟動一整隊專業 Agent，每個負責不同面向：規劃、前端、後端、測試",
    whatItDoes: `想像一個完整的軟體開發團隊：有架構師負責設計、前端工程師做 UI、後端工程師做 API、測試工程師寫測試、安全專家做安全審查……每個人都有專業分工。/devfleet 就是這樣的「虛擬開發團隊」。

你只需要描述你想要什麼功能，/devfleet 會自動組建一隊專業 Agent，每個 Agent 負責自己的專業：架構師先設計系統架構，前後端工程師依架構開發，測試工程師同步寫測試，安全專家最後做安全審查。

這是目前最強大的開發模式，適合複雜的大型功能，整個流程由 Fleet 自動協調，你只需要最後審核結果。`,
    whenToUse: [
      "需要完整實作一個複雜功能（前後端 + 測試 + 安全）",
      "想要最高品質的輸出，不同面向都有專家把關",
      "時間緊迫，需要多個面向同時推進",
      "大型重構，需要全方位的規劃和執行",
    ],
    promptExample: `/devfleet 為我的電商平台新增完整的「訂閱制會員」功能：
- 三種方案：Free/Pro/Team
- 整合 Stripe 訂閱 API
- 升降級即時生效
- 完整前端頁面和後端 API`,
    claudeMessages: [
      {
        role: "user",
        content: "/devfleet 新增訂閱制會員功能",
      },
      {
        role: "claude",
        content: `組建 DevFleet 團隊...

🏗️ **架構師 Agent** → 設計系統架構和資料庫 Schema
🎨 **前端 Agent** → 訂閱頁面、方案選擇 UI
⚙️ **後端 Agent** → Stripe 整合、訂閱 API、Webhook
🧪 **測試 Agent** → 單元測試、整合測試、E2E
🔐 **安全 Agent** → 支付安全審查、API 授權

---

**架構師完成** → Schema 設計和整體架構 ✅
**前後端並行開發中...**
**測試 Agent 同步撰寫測試...**
**安全審查進行中...**

Fleet 完成！
- 14 個檔案修改/建立
- 52 個測試全部通過
- 0 個安全問題
- Build 成功 ✅`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "這是最消耗資源的指令",
        content:
          "/devfleet 同時運行多個 Agent，會使用大量 API 呼叫。適合真正複雜的功能，小任務用 /plan 就夠了。",
      },
      {
        type: "tip",
        title: "給出足夠的需求細節",
        content:
          "Fleet 的品質取決於需求的清晰度。描述功能時盡量說明：技術棧、非功能性需求（效能？安全？）、明確的邊界條件。",
      },
    ],
    relatedSlugs: ["orchestrate", "multi-execute", "prp-plan"],
  },
  {
    slug: "context-budget",
    name: "/context-budget",
    emoji: "📊",
    category: "advanced",
    color: "#f85149",
    shortDesc: "監控和管理 Claude 的上下文使用量，避免超出限制",
    whatItDoes: `Claude 的「上下文視窗」就像短期記憶的容量——它能記住的內容是有限的。就像一張白紙，寫滿了就沒地方寫了。當你和 Claude 的對話越來越長、讀取的程式碼越來越多，上下文就越來越滿。

/context-budget 讓你隨時知道目前用了多少上下文、還剩多少空間，並且建議你哪些資訊可以清除或壓縮，以便繼續工作。就像電腦的記憶體管理，幫你在有限空間裡把工作做得更有效率。

這個指令特別重要於長時間的大型開發會話，可以預防因上下文滿了導致 Claude 開始「忘事」或表現變差。`,
    whenToUse: [
      "長時間工作後，感覺 Claude 的回答品質下降",
      "開始複雜任務前，想確認有足夠的上下文空間",
      "讀取了大量程式碼後，想知道還剩多少空間",
      "需要優化上下文使用，讓重要資訊保持在記憶裡",
    ],
    promptExample: `/context-budget`,
    claudeMessages: [
      { role: "user", content: "/context-budget" },
      {
        role: "claude",
        content: `上下文使用量分析：

**已用：** 68,432 tokens（約 54%）
**剩餘：** 58,000 tokens（約 46%）
**警戒線：** 剩餘 20% 時建議 /save-session

**主要佔用：**
- 程式碼檔案：32,000 tokens（47%）
- 對話歷史：21,000 tokens（31%）
- 系統提示：15,000 tokens（22%）

**建議：**
- 可以清除已完成任務的對話歷史（釋放約 8,000 tokens）
- app/api/ 資料夾的程式碼可以在需要時再讀取
- 目前狀況良好，可以繼續工作 3-4 小時`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "剩餘 20% 時一定要 /save-session",
        content:
          "當上下文剩下 20% 時，Claude 的表現開始下降。在這之前跑 /save-session 儲存狀態，然後開新對話用 /resume-session 繼續。",
      },
      {
        type: "gotcha",
        title: "上下文滿了不會自動提示",
        content:
          "Claude 不會主動告訴你上下文快滿了，需要你主動查詢。養成長時間工作時定期跑 /context-budget 的習慣。",
      },
    ],
    relatedSlugs: ["save-session", "resume-session", "checkpoint"],
  },
  {
    slug: "update-config",
    name: "/update-config",
    emoji: "⚙️",
    category: "advanced",
    color: "#f85149",
    shortDesc: "更新 Claude 的專案設定，調整行為模式、偏好和工具配置",
    whatItDoes: `每個專案都有自己的「規矩」：用哪種測試框架、遵循什麼程式碼風格、哪些指令在這個專案不適用……/update-config 讓你把這些「專案規矩」寫成設定檔，讓 Claude 每次在這個專案裡工作都自動遵守。

就像公司給新員工的「工作規範手冊」——告訴他：我們用 TypeScript 不用 JavaScript、測試要用 Vitest、Git commit 要用英文、不能直接 push 到 main……Claude 讀了這份設定，就會一直按照這些規矩工作，不用你每次重新說明。

設定存在 .claude/config.json，可以包含：偏好的工具、不允許的操作、程式碼風格規則、專案特有的指令。`,
    whenToUse: [
      "想讓 Claude 在這個專案裡遵守特定規則",
      "團隊協作時，統一所有人的 Claude 設定",
      "想關閉某些預設行為（例如：不要自動加 console.log）",
      "建立新專案時，配置專案特有的工作流程",
    ],
    promptExample: `/update-config 幫我設定：
- 測試框架：Vitest
- 不允許：直接修改 main 分支
- 程式碼風格：TypeScript strict mode
- Commit 訊息：Conventional Commits 格式`,
    claudeMessages: [
      { role: "user", content: "/update-config 設定我的專案偏好" },
      {
        role: "claude",
        content: `更新專案設定...

**.claude/config.json 已更新：**

\`\`\`json
{
  "project": {
    "name": "my-ecommerce",
    "techStack": ["Next.js", "TypeScript", "Supabase"]
  },
  "preferences": {
    "testFramework": "vitest",
    "commitStyle": "conventional-commits",
    "typescript": "strict"
  },
  "restrictions": {
    "neverPushToMain": true,
    "requireTestsBeforeCommit": true
  },
  "commands": {
    "verify": "npm run build && npx tsc --noEmit && npm test"
  }
}
\`\`\`

設定已儲存。之後在這個專案裡，Claude 會自動遵守這些規則。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "把設定加入 git 版控",
        content:
          ".claude/ 資料夾應該加入 git，這樣團隊所有成員都有相同的 Claude 設定，保持一致的工作流程。",
      },
      {
        type: "warning",
        title: "不要設定太多限制",
        content:
          "限制過多會讓 Claude 無法靈活處理各種情況。只把真正重要的規則加入設定，其他的用提示詞即時說明就好。",
      },
    ],
    relatedSlugs: ["update-codemaps", "checkpoint", "save-session"],
  },
  {
    slug: "update-codemaps",
    name: "/update-codemaps",
    emoji: "🗺️",
    category: "advanced",
    color: "#f85149",
    shortDesc: "自動掃描程式碼庫，產生架構地圖，讓 Claude 更快理解你的專案",
    whatItDoes: `當你的專案越來越大，Claude 每次需要了解整個架構時，都得花時間讀取大量檔案。/update-codemaps 解決這個問題：它會掃描你整個專案，自動產生一份「架構地圖」文件（CODEMAPS.md），記錄：有哪些重要的目錄和文件、每個部分是做什麼的、各個模組之間如何連接。

就像城市的地圖——你不需要走遍每條街才能知道這個城市的布局，看一眼地圖就懂了。有了這份地圖，Claude 可以在不讀取所有原始碼的情況下，快速理解你的專案結構，更精準地幫你做各種任務。

這個文件也對新進開發者很有幫助，讓他們快速上手。`,
    whenToUse: [
      "專案變大後，Claude 開始花很多時間「探索」代碼庫",
      "有新功能加入，需要更新架構文件",
      "團隊有新成員加入，需要快速了解專案結構",
      "定期維護，確保架構文件反映最新狀態",
    ],
    promptExample: `/update-codemaps`,
    claudeMessages: [
      { role: "user", content: "/update-codemaps" },
      {
        role: "claude",
        content: `掃描程式碼庫...

分析了 142 個檔案、23 個目錄

**CODEMAPS.md 已更新：**

\`\`\`
app/
├── api/           # REST API 端點（12 個路由）
├── components/    # 共用 React 元件（28 個）
├── hooks/         # 自定義 React Hooks（8 個）
├── lib/           # 工具函式和服務（15 個）
├── store/         # Zustand 狀態管理（4 個 store）
└── types/         # TypeScript 型別定義（6 個）

核心依賴：Next.js 14、TypeScript、Supabase、Stripe
認證：Supabase Auth（app/lib/auth.ts）
資料庫：Supabase PostgreSQL（app/lib/supabase.ts）
\`\`\`

架構地圖已儲存，Claude 在這個專案裡的工作效率將會提升。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "每次大改架構後記得更新",
        content:
          "當你新增了很多模組、改變了資料夾結構、或引入了新的核心套件，記得跑 /update-codemaps 讓地圖保持最新。",
      },
      {
        type: "gotcha",
        title: "加入 git 版控讓全團隊受益",
        content:
          "CODEMAPS.md 存在 .claude/ 或專案根目錄，加入 git 後整個團隊（包括 CI/CD 裡的 AI 工具）都能受益於這份架構地圖。",
      },
      {
        type: "tip",
        title: "搭配 /prp-plan 效果倍增",
        content:
          "先跑 /update-codemaps 更新地圖，再用 /prp-plan 規劃新功能，Claude 在分析程式碼庫時會更準確，計畫品質更高。",
      },
    ],
    relatedSlugs: ["docs", "prp-plan", "harness-audit"],
  },
  {
    slug: "skill-create",
    name: "/skill-create",
    emoji: "🛠️",
    category: "advanced",
    color: "#f85149",
    shortDesc: "從你的 git 歷史自動提取程式碼模式，產生可重複使用的 SKILL.md 技能文件",
    whatItDoes: `每個開發者和每個專案都有自己解決問題的模式——你的錯誤處理方式、你的測試結構、你的 API 設計慣例。這些「智慧」散落在過去的 commit 裡，每次遇到相似問題都要重新思考。/skill-create 把這些模式「提煉」出來。

/skill-create 分析你的 git 提交歷史，找出重複出現的程式碼模式，然後把它們整理成一個結構化的 SKILL.md 文件——包含使用情境、範例程式碼、注意事項。下次 Claude 在類似情況下工作時，就會直接套用這個技能，不用重新摸索。

把它想成「幫你的開發智慧建立記憶」的工具。`,
    whenToUse: [
      "想讓 Claude 記住你解決某類問題的慣用方式",
      "團隊有特殊的技術約定，想讓 Claude 自動遵守",
      "解決了一個棘手問題，想把解法保存下來以後重用",
      "建立新的技術領域的知識庫",
    ],
    promptExample: `/skill-create 從最近 50 個 commit 提取 API 設計模式`,
    claudeMessages: [
      {
        role: "user",
        content: "/skill-create 從最近 50 個 commit 提取模式",
      },
      {
        role: "claude",
        content: `分析 50 個 commit...

**發現 3 個顯著模式：**

**模式 1：API 錯誤處理**
出現 12 次：統一用 \`{ error: string, code: string }\` 格式

**模式 2：Zod Schema 驗證**
出現 8 次：在路由入口統一驗證 request body

**模式 3：Supabase 查詢結構**
出現 15 次：固定的 try-catch + 錯誤轉換格式

正在產生技能文件...
✅ .claude/skills/api-patterns/SKILL.md 已建立

下次 Claude 處理 API 相關任務時，會自動套用這些模式。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "越多 commit 歷史效果越好",
        content:
          "至少需要 20-30 個相關 commit 才能發現有意義的模式。新專案先累積一些歷史再用這個指令。",
      },
    ],
    relatedSlugs: ["skill-health", "update-codemaps", "learn"],
  },
  {
    slug: "skill-health",
    name: "/skill-health",
    emoji: "📈",
    category: "advanced",
    color: "#f85149",
    shortDesc: "顯示你的技能資料庫健康狀況儀表板：技能數量、使用頻率、需要更新的技能",
    whatItDoes: `/skill-health 是你的技能資料庫管理工具。就像健身 App 追蹤你的運動習慣，/skill-health 追蹤你的 AI 技能組合——哪些技能在積極使用、哪些已經過期需要更新、哪些領域還缺少技能覆蓋。

它會掃描 ~/.claude/skills/ 目錄下所有的技能文件，分析每個技能的最後更新時間、使用頻率（從 session 日誌估算）、和當前程式碼的一致性，然後給你一份健康狀況報告和行動建議。

適合定期維護你的技能資料庫，確保 Claude 的「記憶」保持新鮮和準確。`,
    whenToUse: [
      "定期維護技能資料庫（建議每月一次）",
      "升級技術棧後，找出哪些技能需要更新",
      "想了解自己積累了哪些可重用的 AI 技能",
      "感覺 Claude 的建議開始過時，懷疑技能庫需要更新",
    ],
    promptExample: `/skill-health`,
    claudeMessages: [
      { role: "user", content: "/skill-health" },
      {
        role: "claude",
        content: `技能資料庫健康報告

📊 總覽：24 個技能
🟢 健康：18 個（最近 30 天內更新）
🟡 需要審查：4 個（30-90 天未更新）
🔴 過期：2 個（90 天以上未更新）

⚠️ 需要審查的技能：
- api-patterns（45 天前）— 可能需要更新 Zod v4 語法
- auth-patterns（62 天前）— Next.js Auth.js 有重大更新

🔴 建議更新：
- react-patterns（120 天前）— React 19 有新 API

覆蓋空白：尚無 database-migrations 相關技能

建議：執行 /skill-create 補充 database-migrations 技能`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "技術框架升級後一定要做一次 health check",
        content:
          "每次升級主要依賴（Next.js、React、TypeScript 版本）後，跑 /skill-health 找出哪些技能需要更新。",
      },
    ],
    relatedSlugs: ["skill-create", "harness-audit", "update-codemaps"],
  },
  {
    slug: "rules-distill",
    name: "/rules-distill",
    emoji: "⚗️",
    category: "advanced",
    color: "#f85149",
    shortDesc: "從對話歷史中提煉出通用規則，加入 .claude/rules/ 讓 Claude 永久遵守",
    whatItDoes: `在工作過程中，你可能多次糾正 Claude：「不要這樣做，要那樣做」、「這個專案用 Zustand 不用 Redux」、「錯誤訊息要用中文」……這些指正散落在各個對話中，每次新對話都要重新說。/rules-distill 把這些「教訓」變成永久規則。

/rules-distill 分析你最近的對話歷史，找出你重複提到的偏好、糾正和約定，然後把它們整理成結構化的規則文件，存入 .claude/rules/。之後 Claude 在任何工作中都會自動遵守這些規則，不需要你再重複說明。

把它想成「幫你的偏好建立長期記憶」的工具。`,
    whenToUse: [
      "發現自己一直在重複糾正 Claude 同樣的問題",
      "想把專案的技術約定固化成永久規則",
      "建立新專案的工作規範",
      "整理一段時間合作下來發現的最佳實踐",
    ],
    promptExample: `/rules-distill`,
    claudeMessages: [
      { role: "user", content: "/rules-distill" },
      {
        role: "claude",
        content: `分析最近 20 個工作階段...

**發現的規律（可提煉為規則）：**

你糾正了 5 次：「錯誤訊息要用中文顯示給用戶」
你糾正了 4 次：「不要用 any，要用具體型別」
你糾正了 3 次：「測試檔案放在 __tests__ 資料夾」

建議新增規則：

\`\`\`markdown
# 專案規則
- UI 錯誤訊息：一律用繁體中文
- TypeScript：禁止使用 any 型別
- 測試結構：測試檔案統一放在 __tests__/ 目錄
\`\`\`

加入 .claude/rules/project.md？(yes/no)`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "規則太多會讓 Claude 束手束腳",
        content:
          "只把真正重要、普遍適用的規則加進去。過於具體或情境特定的規則留在提示詞裡說就好，不要全部固化成規則。",
      },
    ],
    relatedSlugs: ["skill-create", "update-codemaps", "harness-audit"],
  },
  {
    slug: "gan-build",
    name: "/gan-build",
    emoji: "🎯",
    category: "advanced",
    color: "#f85149",
    shortDesc: "GAN 模式：Generator 建構 UI，Evaluator 評分，自動迭代直到達到品質門檻",
    whatItDoes: `GAN（Generative Adversarial Network）是 AI 裡一種「以攻促防」的訓練機制——一個 AI 負責生成，另一個 AI 負責批評，兩者互相較勁，讓輸出越來越好。/gan-build 把這個概念用在 UI 開發上。

/gan-build 啟動兩個 Agent：Generator 負責實作你要的 UI，Evaluator 負責評分（0-10分）和指出問題。Generator 收到評分後修改，再給 Evaluator 評，如此循環，直到分數超過你設定的門檻（預設 7.0）才停止。

這就像有一個永不滿足的設計師在旁邊一直說「還不夠好，再改改」，讓最終輸出遠超單次生成的品質。`,
    whenToUse: [
      "需要高品質的 UI 元件，不接受將就",
      "Landing page 或重要展示頁面",
      "想要超越「普通 AI 輸出」的設計品質",
      "有明確的品質標準（例如：必須達到 8 分以上）",
    ],
    promptExample: `/gan-build 建立電商首頁 Hero Section，高端質感，深色主題`,
    claudeMessages: [
      {
        role: "user",
        content: "/gan-build 電商首頁 Hero Section --pass-threshold 8.0",
      },
      {
        role: "claude",
        content: `GAN 循環開始（門檻：8.0 / 最多 15 輪）

**第 1 輪**
Generator → 建立基礎 Hero Section
Evaluator → 5.2/10（批評：排版太平、缺乏視覺層次）

**第 2 輪**
Generator → 加入視差效果、調整字型比例
Evaluator → 6.8/10（批評：動畫太複雜影響效能）

**第 3 輪**
Generator → 優化動畫到 CSS-only
Evaluator → 8.1/10 ✅ 超過門檻！

GAN 循環結束（3 輪）
✅ 最終品質：8.1/10`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "門檻設太高可能跑很多輪",
        content:
          "9.0 以上的門檻可能需要 10-15 輪迭代。建議從 7.5 開始，先看看輸出品質，再決定要不要提高門檻重跑。",
      },
    ],
    relatedSlugs: ["gan-design", "devfleet", "multi-frontend"],
  },
  {
    slug: "gan-design",
    name: "/gan-design",
    emoji: "🎨",
    category: "advanced",
    color: "#f85149",
    shortDesc: "GAN 模式專注於視覺設計：反覆優化設計稿直到達到美學門檻",
    whatItDoes: `/gan-design 是 /gan-build 的設計專注版本。兩者的差別在於：/gan-build 評估的是功能+設計，/gan-design 的評分標準更專注在視覺品質：色彩搭配、排版節奏、視覺層次、品牌感、空間感……

預設門檻設得更高（7.5，比 /gan-build 的 7.0 更嚴格），因為純設計任務對視覺品質的要求更高。Evaluator 的評分準則也更偏向美學判斷而非功能正確性。

適合需要特別注重視覺表現的任務，例如設計系統、品牌頁面、數據視覺化圖表的樣式。`,
    whenToUse: [
      "建立設計系統的基礎元件（按鈕、卡片、表單）",
      "品牌識別頁面，視覺品質至關重要",
      "數據視覺化，需要既準確又美觀",
      "任何需要打動人心的視覺設計",
    ],
    promptExample: `/gan-design 設計一套深色主題的設計系統顏色 tokens`,
    claudeMessages: [
      {
        role: "user",
        content: "/gan-design 深色主題設計系統顏色 tokens --pass-threshold 8.5",
      },
      {
        role: "claude",
        content: `設計 GAN 循環（門檻：8.5）

第 1 輪 → 6.2/10（色彩對比不足，沒有層次）
第 2 輪 → 7.8/10（改善了，但背景色太藍）
第 3 輪 → 8.6/10 ✅

最終設計系統顏色：
--bg-primary: oklch(12% 0.01 240)
--bg-surface: oklch(18% 0.01 240)
--text-primary: oklch(95% 0 0)
--accent: oklch(68% 0.21 250)
對比度全部符合 WCAG AA`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "提供參考風格讓 Evaluator 有基準",
        content:
          "告訴 /gan-design 你喜歡的風格參考，例如「像 Linear 的設計風格」或「參考 Vercel 的色彩系統」，Evaluator 會用這個基準評分，方向更準確。",
      },
    ],
    relatedSlugs: ["gan-build", "devfleet", "multi-frontend"],
  },
];
