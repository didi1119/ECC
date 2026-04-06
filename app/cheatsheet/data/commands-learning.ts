import type { CommandData } from "./types";

export const learningCommands: CommandData[] = [
  {
    slug: "learn",
    name: "/learn",
    emoji: "🎓",
    category: "learning",
    color: "#e3b341",
    shortDesc: "分析目前工作階段，提取值得保存的解決模式，存入技能庫",
    whatItDoes: `每次你和 Claude 一起解決一個棘手問題，那個解決方法就是有價值的知識。但下次開新對話，這個知識就消失了。/learn 讓你在工作進行中（或結束時）把這些知識「存檔」。

/learn 會回顧目前工作階段裡有趣的問題解決過程，把可重用的模式、工具組合、或解題思路提取出來，整理成技能文件。下次遇到類似問題，Claude 會直接應用已學到的解法，而不是從頭摸索。

這是 ECC 學習系統的核心——讓 Claude 越用越懂你的工作方式。`,
    whenToUse: [
      "剛解決了一個有趣或困難的問題，想保存解法",
      "工作階段結束前，確認有價值的知識被記錄下來",
      "發現了一個特別好用的工具組合或工作流",
      "建立特定領域的知識庫（例如：如何在這個 codebase 做認證）",
    ],
    promptExample: `/learn`,
    claudeMessages: [
      { role: "user", content: "/learn" },
      {
        role: "claude",
        content: `分析本次工作階段...

**發現 2 個可提取的模式：**

**模式 1：Next.js 15 動態路由 params 必須 await**
出現在：修復 /cheatsheet/commands/[slug] 的 404 問題
關鍵知識：在 Next.js 15+，params 是 Promise，需要 await params

**模式 2：@testing-library/user-event 的互動測試模式**
出現在：SearchFilter 測試
關鍵知識：搜尋輸入的測試模式，type + 等待 DOM 更新

正在儲存...
✅ .claude/skills/nextjs-patterns/SKILL.md 已更新
✅ .claude/skills/testing-patterns/SKILL.md 已更新`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "在解決問題後立刻跑效果最好",
        content:
          "趁著解決方案還新鮮時跑 /learn，提取的模式會最完整。不要等到一週後才跑，那時候很多細節已經被清理掉了。",
      },
    ],
    relatedSlugs: ["learn-eval", "skill-create", "save-session"],
  },
  {
    slug: "learn-eval",
    name: "/learn-eval",
    emoji: "🧪",
    category: "learning",
    color: "#e3b341",
    shortDesc: "評估已學到的技能品質，決定哪些值得保留、哪些需要修改或刪除",
    whatItDoes: `技能庫如果充滿了低品質或過期的技能，反而會干擾 Claude 的判斷。/learn-eval 是技能庫的「品質管控」——定期評估已儲存的技能，確保每個技能都是準確、有用的。

/learn-eval 會對技能庫裡的每個技能打分數：這個技能描述是否清晰？例子是否正確？在當前程式碼基礎下是否還適用？評分低的技能會被標記為「需要更新」，嚴重過期的會建議刪除。

搭配 /learn 和 /skill-create 一起構成完整的學習管理流程。`,
    whenToUse: [
      "定期維護技能庫品質（每月建議一次）",
      "升級了主要依賴後，確認技能還適用",
      "技能庫積累了很多技能，需要整理和評估",
      "感覺 Claude 的建議有時候會參考到過時的做法",
    ],
    promptExample: `/learn-eval`,
    claudeMessages: [
      { role: "user", content: "/learn-eval" },
      {
        role: "claude",
        content: `評估技能庫（12 個技能）...

✅ 高品質（8 個）：描述清晰，例子正確，仍然適用

⚠️ 需要更新（3 個）：
- react-patterns：useEffect 的例子是舊版寫法
- api-patterns：缺少 Next.js App Router 的 route handlers 範例
- auth-patterns：Next-Auth v4 → Auth.js v5 語法變更

❌ 建議刪除（1 個）：
- webpack-config：專案已改用 Vite，這個技能完全不適用

執行更新？(yes/no)`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "低分技能不一定要刪除",
        content:
          "有些技能在特定情境下還是有用的，只是不夠通用。你可以選擇更新它、縮小它的適用範圍，而不是直接刪除。",
      },
    ],
    relatedSlugs: ["learn", "skill-health", "evolve"],
  },
  {
    slug: "evolve",
    name: "/evolve",
    emoji: "🌱",
    category: "learning",
    color: "#e3b341",
    shortDesc: "分析學習到的 instincts，建議或自動產生更進化的結構",
    whatItDoes: `Instincts（本能）是 ECC 學習系統對細粒度觀察的稱呼——Claude 從工作中注意到的小規律、偏好、和模式。/evolve 把這些零碎的 instincts 整合升華，找出更深層的規律，建議更有結構化的進化方向。

就像人類透過重複實踐，某些技巧從「刻意執行」變成「直覺反應」，/evolve 讓 instincts 也能這樣升級——從零散的觀察變成系統性的知識結構。

這是 ECC 學習系統中最高層次的指令，通常在積累了足夠多的 instincts 後使用。`,
    whenToUse: [
      "積累了很多 instincts，想整合成更高層次的知識",
      "想讓 Claude 對你的工作方式有更深的理解",
      "定期的學習系統維護（每季一次）",
      "專案進入新階段，需要更新工作模式",
    ],
    promptExample: `/evolve`,
    claudeMessages: [
      { role: "user", content: "/evolve" },
      {
        role: "claude",
        content: `分析 47 個累積的 instincts...

**發現進化機會：**

**群組 1：錯誤處理（9 個相關 instincts）**
當前：零散的「用 try-catch」「回傳錯誤物件」觀察
進化方向：統一的錯誤處理架構（AppError 類、統一格式）
建議：產生 error-handling SKILL.md

**群組 2：測試模式（12 個相關 instincts）**
進化方向：完整的測試策略文件

是否產生這 2 個進化方向的技能文件？`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "需要先有足夠的 instincts 才有效",
        content:
          "如果 instincts 少於 20 個，/evolve 的分析可能不夠有意義。先用 /learn 積累一段時間再使用。",
      },
    ],
    relatedSlugs: ["learn", "learn-eval", "skill-create"],
  },
  {
    slug: "prune",
    name: "/prune",
    emoji: "✂️",
    category: "learning",
    color: "#e3b341",
    shortDesc: "刪除超過 30 天未被採用的 pending instincts，清理學習庫",
    whatItDoes: `就像植物需要修剪才能長得更好，Claude 的學習系統也需要定期清理。/prune 自動刪除那些「沉睡」的 pending instincts——那些被記錄下來但超過 30 天沒有被確認採用、也沒有被使用的觀察。

Pending instincts 是等待確認的候選知識。如果一個 instinct 超過一個月都沒有人確認要採用，通常意味著它不夠有用、或者是錯誤的觀察。清理它們可以讓知識庫保持精簡高效。

這是學習系統的「衛生工作」，讓知識庫保持清潔而不是越來越臃腫。`,
    whenToUse: [
      "每月例行清理學習庫（建議設成定時任務）",
      "知識庫積累了很多 pending 項目，影響 Claude 反應速度",
      "想保持 instincts 的高信號品質比",
      "學習庫維護的一部分",
    ],
    promptExample: `/prune`,
    claudeMessages: [
      { role: "user", content: "/prune" },
      {
        role: "claude",
        content: `掃描 pending instincts...

找到 23 個 pending instincts，其中：

- **8 個** 超過 30 天未被採用
- **3 個** 已知重複，與現有技能重疊
- **12 個** 仍在觀察期（少於 30 天），保留

刪除 11 個 pending instincts？

預覽要刪除的項目：
- "use lodash for array operations"（45 天前，專案已用 native JS）
- "add console.log for debugging"（38 天前，太基礎）
- ...（還有 9 個）

確認刪除？(yes/no)`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "用 /loop 設定每月自動執行",
        content:
          "/loop 1d /prune 可以每天自動清理過期的 pending instincts，讓學習庫自動保持整潔。",
      },
    ],
    relatedSlugs: ["learn", "evolve", "promote"],
  },
  {
    slug: "promote",
    name: "/promote",
    emoji: "⬆️",
    category: "learning",
    color: "#e3b341",
    shortDesc: "把專案範圍的 instincts 升級為全局 instincts，讓所有專案都能受益",
    whatItDoes: `Instincts 有兩個層級：專案層級（只在當前專案生效）和全局層級（在所有專案生效）。/promote 讓你把在某個專案學到的有用知識升級為全局知識，讓你在每個新專案裡都能自動受益。

就像你在一個工作裡學到的技能，升職後可以帶到下一個崗位用——/promote 讓學習成果在所有專案間流動。

例如：你在 A 專案學到了「Next.js 15 的 params 需要 await」，把它 promote 後，以後做所有 Next.js 專案時 Claude 都會記得這個知識。`,
    whenToUse: [
      "在某個專案學到了通用的技術知識",
      "發現某個 instinct 對所有 React/Next.js 專案都適用",
      "想讓特定的工作習慣在所有未來專案中生效",
      "整理知識時，識別出哪些是普遍適用的",
    ],
    promptExample: `/promote nextjs-params-await-pattern`,
    claudeMessages: [
      {
        role: "user",
        content: "/promote nextjs-params-await-pattern",
      },
      {
        role: "claude",
        content: `準備提升 instinct：nextjs-params-await-pattern

**當前位置**：~/.claude/instincts/ecc-tutorial/ (專案層級)
**目標位置**：~/.claude/instincts/global/ (全局層級)

**Instinct 內容**：
"在 Next.js 15+ 中，動態路由的 params 和 searchParams 是 Promise，
必須使用 await 才能取得值。不 await 會導致 undefined，觸發 notFound()。"

✅ 已提升為全局 instinct

現在所有使用 Next.js 的專案都會自動知道這個規則。`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "只 promote 真正通用的知識",
        content:
          "全局 instincts 會影響所有專案。只 promote 那些跨專案都適用的通用知識（語言/框架特性），不要 promote 專案特有的業務規則。",
      },
    ],
    relatedSlugs: ["learn", "prune", "instinct-status"],
  },
  {
    slug: "projects",
    name: "/projects",
    emoji: "📁",
    category: "learning",
    color: "#e3b341",
    shortDesc: "列出所有已知專案及其 instinct 統計，了解知識積累情況",
    whatItDoes: `/projects 給你一個鳥瞰視角，看到 ECC 知識系統中所有已追蹤的專案，以及每個專案的學習狀況——有多少 instincts、有多少技能、最近一次學習活動是什麼時候。

就像看你的讀書清單，知道每本書讀了多少、做了多少筆記。/projects 讓你知道哪些專案的 AI 知識比較豐富、哪些還比較薄弱、哪些已經很久沒有學習活動了。`,
    whenToUse: [
      "想了解各專案的知識積累狀況",
      "切換專案前，快速回顧該專案的知識深度",
      "管理多個專案時，做知識資源分配",
      "找到最活躍學習的專案作為最佳實踐參考",
    ],
    promptExample: `/projects`,
    claudeMessages: [
      { role: "user", content: "/projects" },
      {
        role: "claude",
        content: `已知專案（4 個）：

📦 **ecc-tutorial**（最活躍）
   Instincts：47 個 | 技能：12 個
   最近活動：2 小時前

📦 **ecommerce-platform**
   Instincts：23 個 | 技能：8 個
   最近活動：3 天前

📦 **internal-dashboard**
   Instincts：11 個 | 技能：3 個
   最近活動：2 週前

📦 **blog-redesign**
   Instincts：4 個 | 技能：1 個
   最近活動：1 個月前

提示：blog-redesign 的知識積累較少，建議在下次工作後執行 /learn。`,
      },
    ],
    pitfalls: [],
    relatedSlugs: ["instinct-status", "promote", "save-session"],
  },
  {
    slug: "instinct-status",
    name: "/instinct-status",
    emoji: "🧭",
    category: "learning",
    color: "#e3b341",
    shortDesc: "顯示目前專案和全局的所有 instincts，及其信心分數",
    whatItDoes: `/instinct-status 是 ECC 學習系統的「儀表板」，顯示目前所有 instincts 的詳細狀態：每個 instinct 的內容、它的來源（從哪個工作階段學到的）、以及信心分數（被驗證使用的次數越多，信心越高）。

信心分數是一個重要指標——信心高的 instinct 是經過多次驗證的可靠知識，信心低的可能還需要更多觀察。這個命令讓你對 Claude 的「知識狀態」有完整的透明度。`,
    whenToUse: [
      "想了解 Claude 目前「知道」什麼關於這個專案",
      "調試問題時，確認相關的 instincts 是否正確",
      "知識庫審計，找出需要更新的 instincts",
      "在分享 .claude/ 設定給他人前，先審查 instincts",
    ],
    promptExample: `/instinct-status`,
    claudeMessages: [
      { role: "user", content: "/instinct-status" },
      {
        role: "claude",
        content: `Instinct 狀態報告

**專案層級**（ecc-tutorial）：12 個
🟢 高信心（5 個，信心 > 0.8）：
  - next15-params-await（0.95）已驗證 5 次
  - vitest-testing-pattern（0.88）已驗證 4 次

🟡 中信心（5 個，0.5-0.8）：
  - tailwind-color-tokens（0.65）
  - searchfilter-userevent（0.72）

🔴 低信心（2 個，< 0.5）：
  - framer-motion-usage（0.3）— 只見過 1 次

**全局層級**：8 個
  （以 next.js-related 為主）`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "低信心的 instincts 要多加注意",
        content:
          "信心低於 0.5 的 instincts 可能是錯誤的觀察或情境特定的做法。遇到相關問題時，仍需要你自己確認 Claude 的建議是否正確。",
      },
    ],
    relatedSlugs: ["projects", "instinct-export", "learn-eval"],
  },
  {
    slug: "instinct-export",
    name: "/instinct-export",
    emoji: "📤",
    category: "learning",
    color: "#e3b341",
    shortDesc: "把 instincts 匯出成檔案，方便備份、分享或遷移到其他機器",
    whatItDoes: `當你在一台電腦上積累了大量有價值的 instincts，換電腦時不想從零開始；或者你想把自己學到的知識分享給同事——/instinct-export 讓你把 instincts 匯出成一個可攜帶的文件。

匯出格式是結構化的 JSON 或 Markdown，包含所有 instincts 的內容、來源和信心分數。可以指定匯出專案層級、全局層級，或兩者都要。`,
    whenToUse: [
      "換新電腦前，備份所有學習成果",
      "想把自己的知識分享給使用相同技術棧的同事",
      "專案結束後，備份該專案特有的知識",
      "定期備份（配合自動化排程）",
    ],
    promptExample: `/instinct-export --scope project --output instincts-backup.json`,
    claudeMessages: [
      {
        role: "user",
        content: "/instinct-export --scope all --output my-instincts.json",
      },
      {
        role: "claude",
        content: `匯出 instincts...

範圍：專案層級（12）+ 全局層級（8）= 20 個

✅ 已匯出至：my-instincts.json（3.2 KB）

包含：
- 12 個專案層級 instincts（ecc-tutorial）
- 8 個全局層級 instincts
- 所有信心分數和來源記錄

使用 /instinct-import my-instincts.json 在另一台機器上還原`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "不要公開分享包含敏感業務邏輯的匯出檔",
        content:
          "Instincts 可能包含你的業務邏輯細節（API 設計、資料模型）。分享給外部人員前，先審查內容。",
      },
    ],
    relatedSlugs: ["instinct-import", "instinct-status", "save-session"],
  },
  {
    slug: "instinct-import",
    name: "/instinct-import",
    emoji: "📥",
    category: "learning",
    color: "#e3b341",
    shortDesc: "從檔案或 URL 匯入 instincts，快速建立知識庫",
    whatItDoes: `/instinct-import 是 /instinct-export 的配對指令。它讀取一個 instincts 文件，把裡面的知識匯入你目前的知識庫。可以從本機文件匯入，也可以從 URL 匯入（例如：從 GitHub 上的共享知識庫匯入）。

匯入前可以預覽要加入的 instincts，確認沒有衝突或問題。如果某個 instinct 已經存在，可以選擇覆蓋、合併或跳過。`,
    whenToUse: [
      "換新電腦後，恢復之前備份的 instincts",
      "接受同事分享的 instincts 知識庫",
      "從社群資源匯入特定技術領域的知識",
      "新專案開始，匯入相關的通用知識",
    ],
    promptExample: `/instinct-import my-instincts.json`,
    claudeMessages: [
      { role: "user", content: "/instinct-import my-instincts.json" },
      {
        role: "claude",
        content: `讀取 my-instincts.json...

預覽（20 個 instincts）：

新增（18 個）：
  - next15-params-await ✅
  - vitest-testing-pattern ✅
  - tailwind-color-tokens ✅
  ...

衝突（2 個，已有相似的 instinct）：
  - react-patterns：你的版本（信心 0.7）vs 匯入版本（信心 0.85）
    → 建議：用信心較高的版本

確認匯入？(yes/no)`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "匯入的 instincts 不一定適合你的專案",
        content:
          "從他人匯入的 instincts 是基於他們的工作環境學到的。仔細檢查是否適合你的技術棧和工作方式，不要無腦全部接受。",
      },
    ],
    relatedSlugs: ["instinct-export", "instinct-status", "promote"],
  },
];
