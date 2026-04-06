import type { CommandData } from "./types";

export const automationCommands: CommandData[] = [
  {
    slug: "loop",
    name: "/loop",
    emoji: "🔄",
    category: "automation",
    color: "#ffa657",
    shortDesc: "設定定時自動重複執行某個指令，例如每 5 分鐘跑一次測試",
    whatItDoes: `想像你設了一個鬧鐘，每天早上 7 點自動叫你起床——你不用每天手動設定，它就會自己響。/loop 就是這個概念，但用在程式開發上。

/loop 讓你設定一個「定時任務」：每隔固定時間，自動執行你指定的指令。例如 /loop 5m npm test 就是「每 5 分鐘自動跑一次測試」。這樣你可以專心寫程式，背景自動幫你監控測試是否還在通過。

支援的時間格式：s（秒）、m（分鐘）、h（小時）、d（天）。定時任務會自動在 7 天後過期，也可以隨時用 /loop stop 或 CronDelete 取消。`,
    whenToUse: [
      "持續開發過程中，想讓測試在背景自動跑",
      "監控某個 API 的健康狀態",
      "定期自動部署或同步",
      "想確保你的改動沒有讓測試掛掉",
    ],
    promptExample: `/loop 5m npm test`,
    claudeMessages: [
      { role: "user", content: "/loop 5m npm test" },
      {
        role: "claude",
        content: `已排程定時任務：

- **執行內容**：npm test
- **頻率**：每 5 分鐘
- **Cron 表達式**：\`*/5 * * * *\`
- **首次執行**：現在立即執行一次
- **自動過期**：7 天後

任務 ID：cron_abc123（用這個 ID 可以取消）

---

首次立即執行：
npm test 執行中... ✅ 所有測試通過（49/49）`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "可以搭配其他指令一起用",
        content:
          "/loop 5m /verify 就是每 5 分鐘跑完整驗證。搭配各種 ECC 指令使用，背景自動守護你的程式碼品質。",
      },
      {
        type: "warning",
        title: "定時任務 7 天後自動過期",
        content:
          "每個定時任務最多執行 7 天，之後自動停止。如果需要繼續，重新執行 /loop 指令就好。",
      },
      {
        type: "gotcha",
        title: "時間太短可能會有干擾",
        content:
          "如果設定太短（例如 /loop 30s ...），而任務本身執行時間超過 30 秒，任務會疊加。建議最少設 5 分鐘以上。",
      },
    ],
    relatedSlugs: ["verify", "tdd", "orchestrate"],
  },
  {
    slug: "orchestrate",
    name: "/orchestrate",
    emoji: "🎼",
    category: "automation",
    color: "#ffa657",
    shortDesc: "讓一個主 Claude 負責指揮，派出多個子 Claude 平行完成任務",
    whatItDoes: `在一般的開發流程裡，Claude 是一個人幫你做所有事——先做這個，再做那個，一件一件來。/orchestrate 則是「交響樂團模式」：一個指揮家（主 Claude）負責統籌大局，然後同時派出多個演奏家（子 Claude）各自負責一個部分，同時進行。

就像蓋大樓，一般做法是同一組工人先打地基、再蓋牆、再裝屋頂。但交響樂模式是：地基組、牆面組、屋頂組同時開工，最後指揮確認所有部分組合正確。

這樣的好處是速度可以快 3-5 倍。適合那種「前端和後端可以同時做，不互相等待」的任務。`,
    whenToUse: [
      "一個大功能有多個完全獨立的子任務",
      "前端元件、API 端點、資料庫設計可以同時進行",
      "有 10 個以上的頁面需要同時更新",
      "需要在最短時間完成大量不相依的工作",
    ],
    promptExample: `/orchestrate 同時完成這三個獨立任務：
1. 建立用戶個人頁面 API（app/api/users/[id]/route.ts）
2. 建立用戶頁面前端元件（app/users/[id]/page.tsx）
3. 更新 README 加入新 API 說明`,
    claudeMessages: [
      {
        role: "user",
        content: "/orchestrate 同時建立三個獨立功能",
      },
      {
        role: "claude",
        content: `分析任務相依性... 確認 3 個任務可以並行執行

**啟動 3 個子 Agent：**

🤖 Agent A → 建立 API 端點
🤖 Agent B → 建立前端元件
🤖 Agent C → 更新文件

---

Agent A 完成：app/api/users/[id]/route.ts ✅
Agent C 完成：README.md 更新 ✅
Agent B 完成：app/users/[id]/page.tsx ✅

**整合結果：**
所有任務完成，執行整合測試...
→ 測試 49/49 通過 ✅

總耗時：8 分鐘（相比依序執行估計需 24 分鐘）`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "任務必須真正獨立才能平行",
        content:
          "如果 Agent B 需要等 Agent A 的結果才能開始，那就不是真正獨立。平行執行這種有依賴關係的任務會導致衝突或錯誤。先確認任務彼此不相依。",
      },
      {
        type: "gotcha",
        title: "避免多個 Agent 修改同一個檔案",
        content:
          "如果兩個 Agent 都要改 app/utils.ts，會產生衝突。/orchestrate 前要確認每個任務的修改範圍不重疊。",
      },
      {
        type: "tip",
        title: "搭配 /multi-plan 效果最好",
        content:
          "先用 /multi-plan 讓 Claude 把大任務拆解成獨立子任務並規劃，確認後再用 /orchestrate 執行，效果最佳。",
      },
    ],
    relatedSlugs: ["multi-plan", "multi-execute", "plan"],
  },
  {
    slug: "save-session",
    name: "/save-session",
    emoji: "💾",
    category: "automation",
    color: "#ffa657",
    shortDesc: "儲存目前 Claude 的工作記憶，下次繼續工作時不用重新解釋",
    whatItDoes: `Claude 和人一樣有「短期記憶」——每次開啟新的對話，它就忘了上次做了什麼。就像每次重新打開電腦，之前沒儲存的工作就消失了。

/save-session 就像按下「儲存」按鈕，把目前的工作狀態、你的技術棧、你的偏好設定、還有這次修改的脈絡全部記錄下來，存成一個摘要文件。

下次開新對話時，用 /resume-session 就能讓 Claude 「讀取存檔」，馬上回到上次的狀態，不用再花時間解釋「我的專案是什麼、用什麼技術、上次做到哪」。`,
    whenToUse: [
      "今天工作要結束，但功能還沒做完，明天要繼續",
      "切換到別的任務，但這個分支之後還要回來",
      "想讓別人（或另一個 AI）接手繼續做",
      "開始高風險操作前，先存一個「工作記憶快照」",
    ],
    promptExample: `/save-session`,
    claudeMessages: [
      { role: "user", content: "/save-session" },
      {
        role: "claude",
        content: `正在儲存工作狀態...

**Session 摘要已儲存至 .claude/sessions/2024-01-15-purchase-flow.md**

記錄內容：
- 📁 **專案**：Next.js 電商平台（TypeScript + Supabase）
- 🔧 **當前分支**：feature/purchase-flow
- ✅ **已完成**：購物車 API、前端元件、資料庫 Schema
- 🚧 **進行中**：結帳頁面（完成了 70%）
- 📋 **下一步**：整合 Stripe 付款、測試完整流程
- ⚠️ **注意事項**：訂單 API 需要先完成才能測試結帳

下次用 /resume-session 2024-01-15-purchase-flow 繼續工作`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "養成每天收工前存檔的習慣",
        content:
          "就像存遊戲進度一樣，養成每天工作結束前跑 /save-session 的習慣，隔天可以立刻繼續，不浪費時間重新解釋。",
      },
      {
        type: "gotcha",
        title: "存的是「記憶」，不是程式碼",
        content:
          "/save-session 存的是工作的脈絡和狀態記錄，不是程式碼本身。程式碼的儲存仍然需要靠 git（用 /checkpoint 或 git commit）。",
      },
    ],
    relatedSlugs: ["resume-session", "checkpoint", "prp-commit"],
  },
  {
    slug: "resume-session",
    name: "/resume-session",
    emoji: "▶️",
    category: "automation",
    color: "#ffa657",
    shortDesc: "讀取上次 /save-session 的記錄，讓 Claude 回到上次的工作狀態",
    whatItDoes: `/resume-session 是 /save-session 的配對指令，就像「讀取存檔」。它會讀取之前儲存的工作摘要，讓 Claude 快速了解：你在做什麼專案、用什麼技術棧、上次做到哪裡、接下來要做什麼。

想像你把一份非常詳細的「工作交接文件」交給新來的 Claude，它讀完之後就知道所有背景，不用你再一一解釋。這樣可以省下大量溝通時間，讓你和 Claude 直接進入工作狀態。

通常和 /save-session 配對使用：工作結束時 save，下次開始時 resume。`,
    whenToUse: [
      "隔天繼續昨天沒做完的功能",
      "從 /save-session 的存檔繼續工作",
      "換一個新的對話視窗繼續工作",
      "讓別人或另一個 AI 接手你的工作",
    ],
    promptExample: `/resume-session 2024-01-15-purchase-flow`,
    claudeMessages: [
      {
        role: "user",
        content: "/resume-session 2024-01-15-purchase-flow",
      },
      {
        role: "claude",
        content: `讀取 Session 存檔...

**已恢復工作狀態！**

我已了解當前情況：
- 你在開發 Next.js 電商平台（TypeScript + Supabase）
- 當前分支：feature/purchase-flow
- 購物車 API、前端元件、資料庫 Schema 都已完成
- 結帳頁面完成了 70%，還需要整合 Stripe

**按照上次的計畫，下一步應該：**
1. 整合 Stripe 付款 API 到結帳頁面
2. 完成結帳頁面剩餘的 UI
3. 用 /e2e 測試完整的購物流程

要從哪裡開始？`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "指定存檔名稱更快",
        content:
          "直接輸入 /resume-session 加上存檔名稱，Claude 會立刻找到對應的記錄。如果忘記名稱，可以先問 Claude「我有哪些 session 存檔？」",
      },
      {
        type: "warning",
        title: "存檔只反映存檔當下的狀態",
        content:
          "如果你在存檔後繼續改了程式碼但沒有再次 save，下次 resume 時 Claude 的記憶會是舊的。記得在重要進度後更新存檔。",
      },
    ],
    relatedSlugs: ["save-session", "checkpoint", "plan"],
  },
  {
    slug: "loop-status",
    name: "/loop-status",
    emoji: "📡",
    category: "automation",
    color: "#ffa657",
    shortDesc: "查看目前所有定時任務的執行狀態、進度和錯誤訊息",
    whatItDoes: `當你用 /loop 設定了定時任務後，它們就在背景默默執行。/loop-status 讓你「看見」背景裡正在發生什麼——哪些任務還在跑、上次執行是成功還是失敗、下次執行是什麼時候。

就像機場的航班狀態看板，讓你一眼看清楚所有航班的現況。/loop-status 列出所有活躍的定時任務，包括任務 ID、設定的間隔、上次執行時間和結果、下次預計執行時間，以及任何錯誤訊息。

如果發現某個任務一直失敗，也可以直接在這裡看到錯誤原因。`,
    whenToUse: [
      "設定了多個定時任務，想確認都在正常運作",
      "懷疑某個定時任務沒有正常執行",
      "想查看上次自動測試是否通過",
      "要取消某個任務前，先查它的 ID",
    ],
    promptExample: `/loop-status`,
    claudeMessages: [
      { role: "user", content: "/loop-status" },
      {
        role: "claude",
        content: `活躍定時任務（2 個）：

**cron_abc123** 🟢 運作中
- 指令：npm test
- 間隔：每 5 分鐘
- 上次執行：2 分鐘前 ✅ 通過（76/76）
- 下次執行：3 分鐘後

**cron_def456** 🔴 有錯誤
- 指令：npm run deploy
- 間隔：每 1 小時
- 上次執行：47 分鐘前 ❌ 失敗
- 錯誤：BUILD_FAILED - 型別錯誤在 app/api/route.ts:45

建議：先修復型別錯誤，或用 /loop stop cron_def456 暫停這個任務`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "配合 /loop 和 /loop stop 一起使用",
        content:
          "完整工作流：/loop 設定任務 → /loop-status 查狀態 → /loop stop 取消任務。",
      },
    ],
    relatedSlugs: ["loop", "orchestrate", "save-session"],
  },
  {
    slug: "sessions",
    name: "/sessions",
    emoji: "🗂️",
    category: "automation",
    color: "#ffa657",
    shortDesc: "列出所有 Claude 工作階段的歷史記錄，方便查閱或切換",
    whatItDoes: `每次和 Claude 的對話都是一個「工作階段」（session）。/sessions 就像你的工作日記索引——列出你過去所有的工作階段，包括時間、主要工作內容、使用了哪些指令。

你可以用 /sessions 快速找回某次工作的記錄，查看那次用了什麼方法解決問題，或者直接跳回那個工作階段繼續（搭配 /resume-session）。對於需要長時間追蹤的專案特別有用。`,
    whenToUse: [
      "想回顧上週某次工作的解決方案",
      "想知道之前為某個問題用了什麼指令",
      "找到之前工作階段的 session ID 以便 resume",
      "了解自己最常使用哪些 ECC 功能",
    ],
    promptExample: `/sessions`,
    claudeMessages: [
      { role: "user", content: "/sessions" },
      {
        role: "claude",
        content: `最近工作階段（7 個）：

📁 2024-01-15  購物車功能開發
   主要指令：/plan, /tdd, /code-review
   狀態：已存檔（save-session）

📁 2024-01-14  修復 API 認證 bug
   主要指令：/build-fix, /security-review
   狀態：已完成

📁 2024-01-12  速查表頁面重構
   主要指令：/refactor-clean, /verify
   狀態：已完成

輸入 /resume-session [session-name] 繼續工作`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "搭配 /save-session 建立完整工作記錄",
        content:
          "每次重要工作結束前跑 /save-session，才能在 /sessions 看到詳細的工作狀態記錄，而不只是空的標題。",
      },
    ],
    relatedSlugs: ["save-session", "resume-session", "checkpoint"],
  },
  {
    slug: "aside",
    name: "/aside",
    emoji: "💬",
    category: "automation",
    color: "#ffa657",
    shortDesc: "在不中斷當前任務的情況下，快速問一個旁邊的問題",
    whatItDoes: `想像你正在施工，突然想問工人「這種磚頭的正確名稱是什麼？」你不需要停下所有工作才能問這個問題。/aside 讓你在任何時刻插入一個「旁白問題」，得到答案後自動繼續原本的任務。

/aside 的特別之處是「不污染上下文」——它的問題和答案不會影響 Claude 對當前任務的記憶和理解。問完就回去繼續，好像什麼都沒發生過一樣。

適合那種「我現在很想知道但和目前任務無關」的問題，例如：在開發過程中突然想確認某個 JavaScript API 的行為。`,
    whenToUse: [
      "開發中途想快速查一個概念或語法",
      "想問一個和目前任務完全無關的問題",
      "不想開新對話但又怕影響當前工作流",
      "確認某個庫的 API 用法",
    ],
    promptExample: `/aside Array.reduce() 的第二個參數是做什麼的？`,
    claudeMessages: [
      {
        role: "user",
        content: "/aside Array.reduce() 的第二個參數是做什麼的？",
      },
      {
        role: "claude",
        content: `【旁白回答，不影響當前任務】

Array.reduce(callback, initialValue) 的第二個參數是累加器的初始值。

例如：[1,2,3].reduce((acc, n) => acc + n, 0) → 初始值 0，結果 6
如果不提供初始值，reduce 用陣列第一個元素當初始值。

【回到當前任務...繼續實作購物車計算邏輯】`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "適合簡短的查詢問題",
        content:
          "/aside 適合快速問答。如果問題很複雜、需要長篇回答，開個新對話視窗會更好。",
      },
    ],
    relatedSlugs: ["save-session", "context-budget", "sessions"],
  },
  {
    slug: "multi-backend",
    name: "/multi-backend",
    emoji: "⚙️",
    category: "automation",
    color: "#ffa657",
    shortDesc: "後端優先的多步驟開發工作流：Research → Plan → Execute → Review",
    whatItDoes: `/multi-backend 是專門為後端開發設計的完整工作流指令。它把後端功能開發的完整流程封裝進來：先研究現有架構和相似實作，再規劃設計，然後執行實作，最後做程式碼審查。

整個流程由 AI 自動協調，每個步驟的輸出會成為下一步的輸入，確保各步驟之間的連貫性。比單獨跑 /plan 再跑 /tdd 更整合，因為研究階段的發現會自動影響後續的設計決策。

適合建立 API 端點、服務層邏輯、資料庫操作等後端任務。`,
    whenToUse: [
      "建立新的 API 端點（從設計到實作到測試）",
      "實作新的業務邏輯服務",
      "需要完整後端功能的端到端實作",
      "後端功能有複雜的業務規則需要仔細設計",
    ],
    promptExample: `/multi-backend 建立訂單管理 API（CRUD + 狀態機）`,
    claudeMessages: [
      { role: "user", content: "/multi-backend 建立訂單管理 API" },
      {
        role: "claude",
        content: `啟動後端工作流...

🔍 Research：分析現有 API 架構和模式
→ 找到 RESTful 模式、Zod 驗證、Supabase ORM

💡 Design：設計訂單 Schema 和 API 端點
→ 6 個端點、3 種訂單狀態、2 個 Webhook

⚙️ Execute：實作 API
→ app/api/orders/route.ts ✅
→ app/api/orders/[id]/route.ts ✅
→ app/lib/order-service.ts ✅

🔍 Review：程式碼審查
→ 0 個關鍵問題，2 個建議已套用

✅ 完成！共建立 6 個檔案，32 個測試通過`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "給出足夠的業務規則說明",
        content:
          "告訴 /multi-backend 業務規則（例如：訂單狀態只能向前轉換、不能直接從 pending 跳到 delivered），這些細節會進入設計階段。",
      },
    ],
    relatedSlugs: ["multi-frontend", "multi-workflow", "prp-plan"],
  },
  {
    slug: "multi-frontend",
    name: "/multi-frontend",
    emoji: "🎨",
    category: "automation",
    color: "#ffa657",
    shortDesc: "前端優先的多步驟開發工作流：Research → Ideation → Execute → Optimize",
    whatItDoes: `/multi-frontend 是專門為前端開發設計的完整工作流。和 /multi-backend 類似，但針對前端優化了工作流步驟：加入了「Ideation（構思 UI/UX）」和「Optimize（效能優化）」步驟，這兩個步驟在前端開發特別重要。

工作流會先研究現有元件和設計系統，然後構思 UI 互動方案，接著實作元件，最後進行效能優化（bundle size、渲染效能、動畫流暢度）。

特別適合需要精心設計的 UI 元件或頁面，而不只是把資料顯示出來。`,
    whenToUse: [
      "建立需要精心設計的 UI 元件",
      "實作複雜的前端互動（動畫、拖拉、即時預覽）",
      "需要考慮效能的前端功能（大量列表、圖片）",
      "Landing page 或重要的行銷頁面",
    ],
    promptExample: `/multi-frontend 建立商品圖片輪播元件，支援縮放和全螢幕`,
    claudeMessages: [
      { role: "user", content: "/multi-frontend 建立商品圖片輪播元件" },
      {
        role: "claude",
        content: `啟動前端工作流...

🔍 Research：分析現有元件和設計系統
→ 找到設計 tokens、動畫慣例、無障礙標準

💡 Ideation：構思 UI 互動方案
→ 方案 A：CSS scroll-snap（簡單、無障礙）
→ 方案 B：Framer Motion（更豐富的動畫）
→ 選擇：方案 A（更好的效能和無障礙）

⚙️ Execute：實作元件
→ components/ProductGallery.tsx ✅
→ 縮放、全螢幕、鍵盤導覽

⚡ Optimize：效能優化
→ 圖片懶加載 ✅
→ 虛擬化（只渲染可見圖片）✅
→ LCP 從 3.2s → 1.4s ✅`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "說明設計需求比技術需求更重要",
        content:
          "告訴 /multi-frontend 你想要什麼感覺（「流暢的」「輕盈的」「有層次感的」），而不只是技術規格。AI 可以把感覺轉換成技術決策。",
      },
    ],
    relatedSlugs: ["multi-backend", "multi-workflow", "e2e"],
  },
  {
    slug: "multi-workflow",
    name: "/multi-workflow",
    emoji: "🔗",
    category: "automation",
    color: "#ffa657",
    shortDesc: "前後端同時推進的完整全棧工作流，智慧分配任務給前後端各自的模型",
    whatItDoes: `/multi-workflow 是 /multi-backend 和 /multi-frontend 的合體版——完整的全棧功能開發工作流。它會智慧地把前端任務和後端任務分別交給最擅長的 AI 模型處理，然後整合結果。

整個流程涵蓋：需求研究 → 前後端分頭設計 → 前後端平行實作 → 整合測試 → 效能優化 → 程式碼審查。每個階段的輸出自動流入下一個階段。

這是實作一個完整功能最全面的方法，但也是最費時的——適合真正重要的核心功能，而不是小修改。`,
    whenToUse: [
      "實作一個需要前後端配合的完整功能",
      "有充足時間，想要最高品質的全棧實作",
      "新功能涉及新的 API 設計和對應的前端 UI",
      "需要完整的端到端測試覆蓋",
    ],
    promptExample: `/multi-workflow 實作完整的商品搜尋功能：全文搜尋、篩選、排序、分頁`,
    claudeMessages: [
      { role: "user", content: "/multi-workflow 實作完整商品搜尋功能" },
      {
        role: "claude",
        content: `啟動全棧工作流...

🔍 Research（前後端）：分析現有架構
後端路由 → Codex 負責
前端元件 → Gemini 負責

💡 Design：分頭設計
後端：搜尋 API + Elasticsearch 整合
前端：搜尋 UI + 即時建議 + 篩選面板

⚙️ Execute（平行）：
[後端] search API ✅ | [前端] SearchBar ✅
[後端] 篩選邏輯 ✅  | [前端] FilterPanel ✅

🔗 整合：前後端整合測試
→ 所有 E2E 測試通過 ✅

✅ 完成！20 個檔案，68 個測試`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "任務越複雜越值得用，小功能過度了",
        content:
          "完整工作流需要比較長的時間。如果只是加一個按鈕或改個顏色，直接用 /plan 就夠了。",
      },
    ],
    relatedSlugs: ["multi-backend", "multi-frontend", "devfleet"],
  },
];
