import type { CommandData } from "./types";

export const planningCommands: CommandData[] = [
  {
    slug: "plan",
    name: "/plan",
    emoji: "📋",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "讓 Claude 先規劃再動手，確認計畫後才寫程式",
    whatItDoes: `想像你要請人幫你裝潢房子。好的師傅不會一進門就開始敲牆——他會先給你一份施工計畫，列出第一週做什麼、第二週做什麼，你確認沒問題後才開工。/plan 就是這個概念。

你告訴 Claude 你想做什麼功能，Claude 會分析你的需求，把工作拆解成一個個步驟，評估哪些地方有風險，然後呈現給你看。這個過程中 Claude 完全不會動你的程式碼——只是在「規劃」。

等你看完計畫、覺得方向正確，再回覆「yes」或「確認」，Claude 才會開始實作。這個流程可以避免你事後發現 Claude 做的方向完全跑偏的問題。`,
    whenToUse: [
      "要開始一個新功能，不確定從哪裡下手",
      "功能比較複雜，會影響很多個檔案",
      "想在 Claude 動手前先審查一下方向",
      "第一次使用 ECC 處理某種類型的任務",
      "老闆或客戶需要知道實作計畫再批准",
    ],
    promptExample: `/plan 為我的 Next.js 部落格新增「留言功能」：
- 用戶可以在文章下方留言
- 留言需要顯示名字和時間
- 不需要登入，但要防止惡意留言（垃圾訊息）
- 資料存在 Supabase 資料庫
請分成可以獨立完成的階段，每階段列出會影響哪些檔案`,
    claudeMessages: [
      {
        role: "user",
        content: "/plan 為我的部落格新增留言功能，用 Supabase 存資料",
      },
      {
        role: "claude",
        content: `# 實作計畫：部落格留言功能

## Phase 1：資料庫設計（低風險）
- 新增 \`comments\` 資料表：id, post_id, author_name, content, created_at
- 設定 Row Level Security 允許任何人讀取、新增
- 影響檔案：\`supabase/migrations/001_comments.sql\`

## Phase 2：API 端點（中風險）
- 新增 \`GET /api/comments?postId=xxx\` 取得留言列表
- 新增 \`POST /api/comments\` 新增留言（含簡單防垃圾過濾）
- 影響檔案：\`app/api/comments/route.ts\`

## Phase 3：前端元件（低風險）
- 建立 \`CommentList\` 元件顯示留言
- 建立 \`CommentForm\` 表單讓用戶留言
- 影響檔案：\`app/components/CommentList.tsx\`, \`app/components/CommentForm.tsx\`

**等待確認：要按照這個計畫實作嗎？**`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "計畫太籠統沒有用",
        content:
          "如果你只說「/plan 做登入」，Claude 會給你一個很模糊的計畫。要告訴它你用什麼技術（Next.js？Vue？）、有什麼限制（不能改認證系統）、期望的格式（要列出影響的檔案）。",
      },
      {
        type: "warning",
        title: "確認前不要說 yes",
        content:
          "收到計畫後先仔細看，如果有哪個階段不對勁，直接說「Phase 2 太大了，拆細一點」或「不要動認證系統」。計畫確認後才難修改。",
      },
      {
        type: "tip",
        title: "加上「非目標」讓計畫更精準",
        content:
          "在提示詞裡加上「這次不做：發票功能、優惠碼」，Claude 就不會把這些自動排進計畫，避免範疇膨脹。",
      },
    ],
    relatedSlugs: ["tdd", "prp-plan", "code-review"],
  },
  {
    slug: "multi-plan",
    name: "/multi-plan",
    emoji: "🗂️",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "同時為多個獨立子任務分別規劃，適合大型功能",
    whatItDoes: `有時候一個大功能可以拆成幾個完全獨立的部分同時進行。就像蓋房子可以同時派一組人做電線、另一組人做水管，因為這兩件事不互相干擾。

/multi-plan 讓你告訴 Claude 你有哪些獨立的子任務，Claude 會分別為每個子任務產生詳細計畫，然後你可以用 /multi-execute 同時執行這些計畫。

這個指令特別適合「前端和後端可以同時開發」、「三個不同模組互不相依」這類情況。`,
    whenToUse: [
      "一個功能有前端和後端兩個獨立部分",
      "多個頁面/模組可以同時開發，彼此不相依",
      "有多位開發者可以並行工作",
      "時間緊迫，需要最大化並行效率",
    ],
    promptExample: `/multi-plan 為電商系統同時規劃這三個獨立模組：
1. 商品搜尋功能（含過濾和排序）
2. 購物車功能（新增/移除/數量調整）
3. 用戶願望清單功能
這三個模組彼此獨立，可以同時開發`,
    claudeMessages: [
      {
        role: "user",
        content: "/multi-plan 同時規劃搜尋、購物車、願望清單三個獨立模組",
      },
      {
        role: "claude",
        content: `# 並行計畫：三個獨立模組

## 📦 模組 1：商品搜尋（負責人：Agent A）
- Phase 1：搜尋 API + Elasticsearch 整合
- Phase 2：前端搜尋列和過濾器 UI
- 預估：6 小時

## 🛒 模組 2：購物車（負責人：Agent B）
- Phase 1：購物車 Redux store
- Phase 2：購物車 UI 元件
- 預估：5 小時

## ❤️ 模組 3：願望清單（負責人：Agent C）
- Phase 1：願望清單 API
- Phase 2：心形收藏按鈕元件
- 預估：4 小時

三個計畫互不相依，可同時執行。確認後執行 /multi-execute？`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "確認子任務真的獨立",
        content:
          "如果兩個子任務都需要修改同一個檔案（例如 API 路由入口），就不算真正獨立，同時執行會造成衝突。使用前先確認各模組修改的檔案不重疊。",
      },
      {
        type: "tip",
        title: "搭配 /multi-execute 使用效果最好",
        content:
          "多計畫產出後，用 /multi-execute 同時執行，速度可以是依序執行的 3 倍。",
      },
    ],
    relatedSlugs: ["plan", "multi-execute", "orchestrate"],
  },
  {
    slug: "prp-plan",
    name: "/prp-plan",
    emoji: "📐",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "深度分析程式碼庫後產出詳盡計畫文件，適合複雜功能",
    whatItDoes: `PRP 是「Product Requirements & Planning」的縮寫。/prp-plan 比 /plan 更深入：它會主動爬梳你整個程式碼庫，找出所有相關的檔案、命名慣例、錯誤處理模式，然後把這些發現全部寫進一份詳細的計畫文件（.plan.md），保存在你的專案裡。

就像建築師不只是畫草圖，而是完整的施工藍圖——包括每一根柱子的尺寸、使用什麼材料、每個工序的順序。這份藍圖詳細到任何一個施工隊拿到都能按圖施工。

計畫文件存在專案裡，之後隨時可以用 /prp-implement 執行，或者拿給別人實作。`,
    whenToUse: [
      "功能很複雜，需要修改 10+ 個檔案",
      "想要一份可以存檔、分享的詳細計畫",
      "需要讓其他人（或 AI）按照計畫實作",
      "計畫需要包含所有命名慣例和程式碼模式的引用",
      "要做架構層面的改動",
    ],
    promptExample: `/prp-plan 為現有的 Next.js + Supabase 電商系統新增「訂閱制會員」功能：
- 整合 Stripe 訂閱 API
- 三種方案：Free/Pro/Team
- 升降級即時生效
- 取消後當期結束才失效
非目標：發票功能、優惠碼`,
    claudeMessages: [
      {
        role: "user",
        content: "/prp-plan 為電商系統新增訂閱會員功能",
      },
      {
        role: "claude",
        content: `正在深度分析程式碼庫...

✅ 發現命名慣例：服務層用 camelCase，型別用 PascalCase
✅ 發現錯誤處理模式：統一使用 AppError 類別
✅ 發現測試模式：Vitest + React Testing Library
✅ 找到相似實作：現有 payments/ 模組可作為參考

計畫已儲存至：.claude/PRPs/plans/subscription-membership.plan.md

**Complexity**: Large（14 個檔案，8 個任務）
**信心分數**: 9/10 — 可單次實作完成

下一步：執行 /prp-implement .claude/PRPs/plans/subscription-membership.plan.md`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "搭配 /prp-implement 一起使用",
        content:
          "/prp-plan 只產出計畫，/prp-implement 才是執行計畫。兩個要搭配使用。",
      },
      {
        type: "warning",
        title: "分析大型專案需要時間",
        content:
          "如果你的專案有幾百個檔案，/prp-plan 的分析可能需要幾分鐘。這是正常的，它在仔細閱讀你的程式碼。",
      },
    ],
    relatedSlugs: ["plan", "prp-implement", "prp-commit"],
  },
  {
    slug: "prp-implement",
    name: "/prp-implement",
    emoji: "⚙️",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "按照 /prp-plan 產出的計畫文件自動實作",
    whatItDoes: `/prp-implement 是 PRP 工作流程的第二步，它讀取 /prp-plan 產出的計畫文件（.plan.md），然後按照文件裡的每個任務一步步實作。

就像工人拿到施工藍圖開始施工一樣。計畫文件裡已經記錄了所有需要知道的資訊：命名規則、錯誤處理方式、哪些檔案要新建、哪些要修改——執行時不需要再問任何問題。

每完成一個任務，它會自動執行驗證（跑測試、型別檢查），確認沒問題才進行下一個任務，形成一個自動化的品質保證迴圈。`,
    whenToUse: [
      "已經用 /prp-plan 產出了計畫文件，要開始實作",
      "計畫文件由別人（或 AI）準備好，你來執行",
      "想要自動化的逐步實作，每步都有驗證",
    ],
    promptExample: `/prp-implement .claude/PRPs/plans/subscription-membership.plan.md`,
    claudeMessages: [
      {
        role: "user",
        content: "/prp-implement .claude/PRPs/plans/subscription-membership.plan.md",
      },
      {
        role: "claude",
        content: `讀取計畫文件...

**Task 1/8**: 建立資料庫 Schema
→ 建立 supabase/migrations/004_subscriptions.sql ✅
→ 驗證：tsc --noEmit ✅

**Task 2/8**: 建立 Stripe Webhook 處理器
→ 建立 app/api/webhooks/stripe/route.ts ✅
→ 驗證：npm test ✅

**Task 3/8**: 建立訂閱服務層...`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "計畫路徑要正確",
        content:
          "執行 /prp-implement 時要提供正確的計畫文件路徑。通常是 .claude/PRPs/plans/xxx.plan.md。",
      },
      {
        type: "tip",
        title: "中途可以暫停",
        content:
          "如果某個任務出現問題，/prp-implement 會停下來告訴你，不會繼續執行後面的任務，這是設計上的保護機制。",
      },
    ],
    relatedSlugs: ["prp-plan", "prp-commit", "build-fix"],
  },
  {
    slug: "prp-commit",
    name: "/prp-commit",
    emoji: "✅",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "PRP 工作流程的最後一步：驗證後提交程式碼",
    whatItDoes: `/prp-commit 是 PRP 三步驟的最後一步（plan → implement → commit）。它會在提交程式碼之前做最終驗證——跑完整測試、型別檢查、lint——全部通過才提交。

就像交作業前的最後檢查：確認名字有寫、題目都答了、沒有空白頁，然後才交給老師。這個步驟確保提交到 git 的程式碼是乾淨、正確的。

它也會自動產生格式正確的 commit message，遵循 Conventional Commits 規範（feat:、fix:、refactor: 等前綴）。`,
    whenToUse: [
      "用 /prp-implement 實作完成，準備提交到 git",
      "想要確保提交前所有驗證都通過",
      "需要自動產生格式正確的 commit message",
    ],
    promptExample: `/prp-commit`,
    claudeMessages: [
      { role: "user", content: "/prp-commit" },
      {
        role: "claude",
        content: `執行最終驗證...

✅ TypeScript：0 個錯誤
✅ ESLint：0 個警告
✅ 測試：48/48 通過
✅ Build：成功

準備提交以下異動：
- app/api/webhooks/stripe/route.ts（新增）
- app/components/PricingTable.tsx（新增）
- supabase/migrations/004_subscriptions.sql（新增）

Commit message：
\`feat: add subscription membership with Stripe integration\`

確認提交嗎？`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "測試失敗不會提交",
        content: "如果任何驗證失敗，/prp-commit 會停下來告訴你問題在哪，不會強制提交。先修好問題再試一次。",
      },
    ],
    relatedSlugs: ["prp-plan", "prp-implement", "checkpoint"],
  },
  {
    slug: "prp-prd",
    name: "/prp-prd",
    emoji: "📝",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "用互動問答方式產生完整的產品需求文件（PRD）",
    whatItDoes: `在開始寫程式之前，最重要的問題是「到底要做什麼？」很多工程師跳過需求分析，直接開始寫程式，結果做到一半才發現方向不對，全部要重來。/prp-prd 就是防止這種情況的工具。

/prp-prd 會和你進行一段對話，透過提問幫你把模糊的想法變成清晰的需求文件（PRD）。它會問你：目標用戶是誰？要解決什麼問題？成功的定義是什麼？有哪些限制？把這些問題想清楚後，自動產生一份結構化的 PRD 文件。

這份 PRD 文件後續可以用 /prp-plan 轉換成實作計畫，也可以分享給團隊成員讓大家對齊。整個 PRP 工作流的起點。`,
    whenToUse: [
      "有個模糊的功能想法，還沒確定具體要做什麼",
      "需要和團隊對齊需求，避免各自解讀不同",
      "開始新功能前，想把需求文件化再開始實作",
      "客戶或 PM 給的需求不夠清晰，需要整理",
    ],
    promptExample: `/prp-prd 我想做一個用戶評分系統`,
    claudeMessages: [
      { role: "user", content: "/prp-prd 我想做一個用戶評分系統" },
      {
        role: "claude",
        content: `好的，讓我問幾個問題幫你釐清需求：

**1. 目標用戶**
這個評分系統是誰評誰？用戶評商品？買家評賣家？還是其他？

**2. 評分維度**
只有星評（1-5星），還是有多個維度（品質/服務/速度）？

**3. 展示方式**
評分要顯示在哪裡？商品頁？用戶個人頁？

請回答以上問題，我會根據你的答案繼續深入了解需求。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "花時間在 PRD 上是值得的投資",
        content:
          "寫 PRD 花 30 分鐘，可以省下事後重構的 5 個小時。需求越清楚，實作越順暢。",
      },
      {
        type: "gotcha",
        title: "PRD 不是一成不變的",
        content:
          "PRD 是出發點，不是合約。隨著實作推進，如果發現新的問題，可以更新 PRD。",
      },
    ],
    relatedSlugs: ["prp-plan", "prp-implement", "plan"],
  },
  {
    slug: "prp-pr",
    name: "/prp-pr",
    emoji: "🔀",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "自動分析當前分支的改動，建立格式完整的 GitHub PR",
    whatItDoes: `當你完成一個功能分支的開發，需要提 PR（Pull Request）讓同事審查。手動寫 PR 描述很麻煩——你需要回顧所有 commit、整理改動說明、列出測試步驟……/prp-pr 自動幫你完成這些工作。

/prp-pr 會分析你當前分支和 main 之間的所有 commit，自動整理：改動了什麼、為什麼這樣改、如何測試這些改動，然後產生一份格式完整的 PR 描述，包含摘要、改動清單、測試計畫。如果有 PR 模板，它也會自動套用。

最後還會自動把分支推送到遠端，並用 gh 命令建立 PR，一步到位。`,
    whenToUse: [
      "功能開發完成，要提 PR 給團隊審查",
      "懶得手動寫 PR 描述（幾乎每次）",
      "想確保 PR 描述包含所有必要資訊",
      "有 PR 模板需要套用",
    ],
    promptExample: `/prp-pr main`,
    claudeMessages: [
      { role: "user", content: "/prp-pr main" },
      {
        role: "claude",
        content: `分析分支改動...
feature/user-rating 對比 main：7 個 commit，14 個檔案

建立 PR：

**標題**：feat: add user rating system with multi-dimension scoring

**摘要**：
- 新增商品評分功能（1-5星 × 3個維度）
- 評分 API 端點（POST/GET /api/ratings）
- 評分元件整合到商品頁面
- 防刷機制：每用戶每商品限評一次

**測試計畫**：
- [ ] 新增評分 → 確認顯示在商品頁
- [ ] 重複評分 → 確認返回錯誤

PR 已建立：https://github.com/org/repo/pull/142`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "需要 gh CLI 已登入",
        content:
          "使用前確認已安裝並登入 GitHub CLI（gh auth login）。否則 PR 建立這步會失敗。",
      },
      {
        type: "tip",
        title: "先跑 /prp-commit 確保改動已提交",
        content:
          "確認所有改動都已 commit，再跑 /prp-pr。有未提交的改動會讓 PR 描述不完整。",
      },
    ],
    relatedSlugs: ["prp-commit", "prp-implement", "checkpoint"],
  },
  {
    slug: "prompt-optimize",
    name: "/prompt-optimize",
    emoji: "✨",
    category: "planning",
    color: "#58a6ff",
    shortDesc: "分析你的提示詞並給出改進建議，讓 Claude 的回應更準確",
    whatItDoes: `和 Claude 合作時，提示詞的品質直接決定輸出品質。一個模糊的提示詞會得到模糊的結果；一個清晰、結構化的提示詞會得到精確、有用的結果。/prompt-optimize 幫你把「還可以」的提示詞提升到「很棒」。

你把一個提示詞交給 /prompt-optimize，它會分析哪裡不夠清楚、缺少了什麼重要資訊、結構可以如何改進，然後提供優化後的版本並解釋改了什麼、為什麼這樣改。

特別適合那種「我已經問了好幾次，Claude 就是不給我想要的答案」的情況——通常問題出在提示詞本身。`,
    whenToUse: [
      "Claude 的回應一直不符合你的期望",
      "要建立一個重複使用的提示詞模板",
      "想了解如何寫出更好的 AI 提示詞",
      "有重要的複雜任務，想先優化提示詞再執行",
    ],
    promptExample: `/prompt-optimize 幫我審查這段程式碼`,
    claudeMessages: [
      {
        role: "user",
        content: '/prompt-optimize "幫我審查這段程式碼"',
      },
      {
        role: "claude",
        content: `**原始提示詞分析：**
問題：
- 沒有指定審查重點（安全？效能？可讀性？）
- 沒有說明語言或框架
- 沒有提供程式碼
- 沒有說明期望的輸出格式

**優化版本：**
\`\`\`
請審查以下 [語言] 程式碼，重點關注：
1. 安全漏洞（特別是輸入驗證）
2. 效能瓶頸
3. 命名和可讀性

程式碼：
[貼上程式碼]

請用列表格式說明每個問題，並給出修改建議。
\`\`\`

改進說明：指定了審查重點、要求具體輸出格式、預留程式碼位置。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "好提示詞的共同特徵：具體、有背景、有期望格式",
        content:
          "幾乎所有好的提示詞都有三個要素：說清楚你要做什麼、提供必要的背景資訊、說明你希望答案是什麼格式。",
      },
    ],
    relatedSlugs: ["plan", "prp-plan", "model-route"],
  },
];
