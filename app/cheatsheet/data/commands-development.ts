import type { CommandData } from "./types";

export const developmentCommands: CommandData[] = [
  {
    slug: "tdd",
    name: "/tdd",
    emoji: "🧪",
    category: "development",
    color: "#3fb950",
    shortDesc: "先寫測試，再寫程式碼 — 確保功能正確的開發方式",
    whatItDoes: `TDD 是「Test-Driven Development（測試驅動開發）」的縮寫。這個方式的邏輯是：先寫一個「驗收標準」（測試），確認它目前是失敗的（因為功能還沒做），然後再寫最少的程式碼讓它通過。

用生活比喻：你要烤一個蛋糕，TDD 的做法是先寫下「成品應該鬆軟、甜度適中、直徑 20 公分」，然後開始嘗試做，每次都拿這個標準來量，直到完全符合為止。這樣不管做了幾次，你都知道什麼叫「做對了」。

/tdd 會引導 Claude 按照 RED（測試失敗）→ GREEN（讓測試通過）→ IMPROVE（整理程式碼）的順序工作，確保你的程式碼有清晰的驗收標準。`,
    whenToUse: [
      "開發新功能，想確保它真的按預期運作",
      "修復 bug，想防止同樣的 bug 再次出現",
      "重構程式碼，想確保改了之後功能沒壞",
      "別人要接手你的程式碼，需要有測試說明行為",
      "第一次做某個功能，不確定邊界條件有哪些",
    ],
    promptExample: `/tdd 實作 validateEmail(email) 函式：
- 正確的 email 格式（含 @ 和 . ）回傳 true
- 沒有 @ 回傳 false 並附錯誤訊息
- 沒有 . 回傳 false 並附錯誤訊息
- 空字串回傳 false
先寫測試，讓我確認測試正確後再實作`,
    claudeMessages: [
      {
        role: "user",
        content: "/tdd 實作 validateEmail(email) 函式",
      },
      {
        role: "claude",
        content: `**RED 階段**：先寫測試

\`\`\`typescript
// email.test.ts
describe('validateEmail', () => {
  it('正確 email 回傳 true', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
  it('沒有 @ 回傳 false', () => {
    const result = validateEmail('userexample.com');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('@');
  });
  it('空字串回傳 false', () => {
    expect(validateEmail('').valid).toBe(false);
  });
});
\`\`\`

跑測試 → 全部 FAIL ✅（預期的，因為還沒實作）

確認測試符合你的預期嗎？確認後進入 GREEN 階段。`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "一定要確認測試真的失敗了",
        content:
          "如果測試一寫完就通過，代表這個測試根本沒在測任何東西。要求 Claude「給我看 FAIL 的輸出」確認 RED 階段真的是紅的。",
      },
      {
        type: "warning",
        title: "提示詞要具體才有好測試",
        content:
          "「/tdd 做登入」這種模糊提示會讓 Claude 跳過 RED 直接寫程式碼。要說清楚「有哪些情況要測試」，例如密碼太短、帳號不存在、登入成功。",
      },
      {
        type: "tip",
        title: "IMPROVE 階段只整理，不加功能",
        content:
          "重構時只改程式碼結構（提取函式、改名字），不加新功能。新功能要從新的 RED 階段開始。",
      },
    ],
    relatedSlugs: ["build-fix", "code-review", "verify"],
  },
  {
    slug: "build-fix",
    name: "/build-fix",
    emoji: "🔧",
    category: "development",
    color: "#3fb950",
    shortDesc: "自動分析並修復建置錯誤和型別錯誤",
    whatItDoes: `有時候你的程式碼寫完後，執行 npm run build 或跑測試會出現一堆紅色錯誤。這些錯誤可能是型別不對、語法錯誤、缺少某個函式……對初學者來說看起來很嚇人。

/build-fix 的作用就是讀取這些錯誤訊息，分析問題在哪裡，然後一個一個修復。它很有耐心，每修一個就重新驗證一次，確認修好了再繼續下一個。

就像修車師傅——你不需要懂引擎，只要把車開進去，師傅會告訴你哪裡壞了、怎麼修，修好後試車確認沒問題。`,
    whenToUse: [
      "執行 npm run build 出現錯誤",
      "跑 npx tsc --noEmit 有型別錯誤",
      "ESLint 報告了一堆警告和錯誤",
      "剛升級了某個套件，出現不兼容的錯誤",
      "看到錯誤訊息但不知道從哪裡開始修",
    ],
    promptExample: `/build-fix`,
    claudeMessages: [
      { role: "user", content: "/build-fix" },
      {
        role: "claude",
        content: `偵測到 3 個建置錯誤，開始逐一修復：

**錯誤 1**：TypeScript 型別錯誤
\`\`\`
app/components/Cart.tsx:45 — Type 'string' is not assignable to type 'number'
\`\`\`
→ 修復：將 \`price\` 的型別改為 \`number\`，在使用時加上 \`Number()\` 轉換
→ 驗證：型別錯誤已消除 ✅

**錯誤 2**：ESLint 警告
→ 修復：移除未使用的 import \`useState\`
→ 驗證：lint 通過 ✅

**錯誤 3**：缺少必要的 prop
→ 修復：在 ProductCard 元件加入 \`key\` prop
→ 驗證：所有錯誤已修復 ✅

Build 成功 🎉`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "讓它自己跑，不要打斷",
        content:
          "/build-fix 需要重複「修復 → 驗證 → 修復」的循環，可能需要幾分鐘。讓它自己跑完再看結果。",
      },
      {
        type: "warning",
        title: "嚴重架構問題它無法修",
        content:
          "如果問題是設計層面的（例如整個資料結構設計錯了），/build-fix 只能修表面症狀，無法解決根本問題。這時需要重新 /plan。",
      },
    ],
    relatedSlugs: ["tdd", "verify", "code-review"],
  },
  {
    slug: "verify",
    name: "/verify",
    emoji: "✔️",
    category: "development",
    color: "#3fb950",
    shortDesc: "完整驗證：建置 + 型別 + lint + 測試 + 安全掃描，一次全做",
    whatItDoes: `/verify 是一個「全身健康檢查」指令。它會按照固定順序幫你的專案做一系列的檢查：

1. **建置**：確認專案可以正常編譯
2. **型別檢查**：確認所有型別都正確
3. **Lint**：確認沒有程式碼風格問題
4. **測試**：確認所有測試通過
5. **安全掃描**：確認沒有洩漏密鑰或其他安全問題

就像汽車出廠前要做的全面品管檢查——每個環節都要過關才能放行。最後會給你一份清楚的報告，哪些通過、哪些需要修。`,
    whenToUse: [
      "準備把程式碼提交到 git 前",
      "完成一個功能後做最終確認",
      "懷疑某個改動有副作用，想全面檢查",
      "交給別人 review 前先自我審查",
      "部署上線前的最後關卡",
    ],
    promptExample: `/verify`,
    claudeMessages: [
      { role: "user", content: "/verify" },
      {
        role: "claude",
        content: `開始全面驗證...

**Phase 1：Build** ✅ — 17 個靜態頁面全部編譯成功
**Phase 2：TypeScript** ✅ — 0 個型別錯誤
**Phase 3：Lint** ✅ — 0 個警告，0 個錯誤
**Phase 4：Tests** ✅ — 49/49 通過，96.7% 覆蓋率
**Phase 5：Security** ✅ — 沒有洩漏密鑰，沒有 console.log

---
## 驗證結果：PASS ✅
所有檢查通過，可以安全提交。`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "在提交前養成習慣跑 /verify",
        content: "把 /verify 當成提交前的必做儀式，慢慢會變成自然習慣，提交品質會大幅提升。",
      },
    ],
    relatedSlugs: ["build-fix", "code-review", "security-review"],
  },
  {
    slug: "docs",
    name: "/docs",
    emoji: "📝",
    category: "development",
    color: "#3fb950",
    shortDesc: "自動分析程式碼並產生或更新文件",
    whatItDoes: `文件（documentation）就是解釋你的程式碼「是什麼、怎麼用」的說明書。就像買家電時附的說明書，告訴你每個按鈕是幹嘛的。

/docs 會閱讀你的程式碼，自動產生或更新 README.md、API 說明、元件文件等。它能理解你的程式碼在做什麼，用清楚的語言解釋給其他人看。

這樣你就不用自己手動寫文件了（很多程式設計師最討厭寫文件），Claude 幫你搞定。`,
    whenToUse: [
      "完成一個功能或模組，想產生說明文件",
      "要開源你的專案，需要好的 README",
      "API 有變動，需要更新 API 文件",
      "新人要加入專案，需要快速了解各元件",
    ],
    promptExample: `/docs 為 app/components/ 下的所有元件產生使用說明，包含 Props 說明和使用範例`,
    claudeMessages: [
      {
        role: "user",
        content: "/docs 為我的 CartService 產生文件",
      },
      {
        role: "claude",
        content: `# CartService 文件

## 簡介
CartService 管理購物車的所有操作，包括新增商品、調整數量、計算總價。

## 方法

### addItem(item, quantity)
新增商品到購物車。
- **item**: 商品物件（需包含 id, name, price）
- **quantity**: 數量（預設為 1）
- **回傳**: 更新後的購物車

### removeItem(itemId)
從購物車移除指定商品。

### getTotal()
計算購物車總價（含稅）。
- **回傳**: number（新台幣）

## 使用範例
\`\`\`typescript
const cart = new CartService();
cart.addItem({ id: '1', name: '蘋果', price: 30 }, 3);
console.log(cart.getTotal()); // 90
\`\`\``,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "指定文件的讀者是誰",
        content:
          "在提示裡說「給完全沒有背景的人看」或「給 API 使用者看」，Claude 會調整說明的詳細程度和用語。",
      },
    ],
    relatedSlugs: ["code-review", "update-codemaps"],
  },
  {
    slug: "checkpoint",
    name: "/checkpoint",
    emoji: "🏁",
    category: "development",
    color: "#3fb950",
    shortDesc: "儲存當前工作進度，以便之後可以安全回滾",
    whatItDoes: `在電玩遊戲裡，checkpoint 是「存檔點」——你在這裡存檔，就算之後死掉了也可以從這裡重來，不用從頭開始。程式開發的 checkpoint 概念相同。

/checkpoint 會在 git 裡建立一個存檔點（commit），記錄目前的工作狀態。之後如果你做了什麼改動但後悔了，可以回到這個 checkpoint 重新來過。

這在做高風險的實驗性修改時特別有用——先存一個 checkpoint，大膽去試，如果試爛了就回來這個點。`,
    whenToUse: [
      "要開始嘗試一個可能會破壞東西的改動前",
      "完成了一個里程碑，想留個記錄",
      "要進行大量的重構前",
      "準備嘗試新的技術或套件前",
    ],
    promptExample: `/checkpoint 完成購物車功能基礎架構`,
    claudeMessages: [
      { role: "user", content: "/checkpoint 完成購物車功能" },
      {
        role: "claude",
        content: `建立 checkpoint...

已暫存並 commit 目前的所有改動：
- 5 個檔案已變更
- Commit: \`checkpoint: 完成購物車功能基礎架構\`
- Hash: abc1234

你可以繼續開發。如果之後需要回到這個狀態，執行：
\`git checkout abc1234\``,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "要做危險操作前記得先 checkpoint",
        content: "準備做大幅度重構、刪除程式碼、或嘗試新方法前，養成先跑 /checkpoint 的習慣，給自己留退路。",
      },
    ],
    relatedSlugs: ["save-session", "prp-commit", "verify"],
  },
  {
    slug: "quality-gate",
    name: "/quality-gate",
    emoji: "🚦",
    category: "development",
    color: "#3fb950",
    shortDesc: "一鍵執行完整品質檢查管道：型別、Lint、測試、覆蓋率",
    whatItDoes: `想像工廠裡的品質管制站——每個產品出廠前都要通過一系列檢查：外觀、尺寸、功能、安全……只要有一項不合格就不能出廠。/quality-gate 就是你程式碼的品質管制站。

/quality-gate 把所有品質檢查合併成一個指令：TypeScript 型別檢查、ESLint 語法檢查、所有單元測試、測試覆蓋率達標確認。每個環節按順序執行，任何一關不過就停下來報告問題。

比單獨跑 /verify 更全面——它加入了 Lint 檢查和覆蓋率強制要求。適合在 commit 前或 PR 前做最後把關。`,
    whenToUse: [
      "提交程式碼前的最終品質確認",
      "設定 CI/CD 管道的本地模擬",
      "修完一個 bug 後確認沒有引入新問題",
      "每日工作結束時的例行品質掃描",
    ],
    promptExample: `/quality-gate`,
    claudeMessages: [
      { role: "user", content: "/quality-gate" },
      {
        role: "claude",
        content: `執行品質管道...

🔷 TypeScript 型別檢查
→ npx tsc --noEmit
✅ 0 個型別錯誤

🔷 ESLint 語法檢查
→ npx eslint . --ext .ts,.tsx
✅ 0 個錯誤，0 個警告

🔷 單元測試
→ npm test -- --run
✅ 76/76 測試通過

🔷 測試覆蓋率
→ 覆蓋率 96.84%（目標 ≥ 80%）
✅ 達標

━━━━━━━━━━━━━━━━━━━━━━
品質閘道：✅ PASS — 可以提交`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "在 commit hook 裡執行效果最好",
        content:
          "把 /quality-gate 加入 git pre-commit hook，讓每次提交前自動跑，確保沒有問題的程式碼進入版本庫。",
      },
      {
        type: "warning",
        title: "任何一關失敗都要先修好",
        content:
          "品質管道是有序的——型別錯誤不修好就不會跑測試。按照報告的順序修問題，不要跳過。",
      },
    ],
    relatedSlugs: ["verify", "test-coverage", "code-review"],
  },
  {
    slug: "test-coverage",
    name: "/test-coverage",
    emoji: "📊",
    category: "development",
    color: "#3fb950",
    shortDesc: "分析測試覆蓋率缺口，自動補寫缺少的測試直到達到 80%+",
    whatItDoes: `測試覆蓋率就像安全網的密度——覆蓋率越高，越少有 bug 能漏網。但很多人不知道自己的程式碼哪些部分完全沒有測試。/test-coverage 就像拿一盞燈照亮黑暗角落，告訴你「這幾個函式從來沒被測試過」。

/test-coverage 不只是顯示覆蓋率報告——它還會分析哪些程式碼路徑完全沒有測試、哪些分支條件沒有被測到，然後自動幫你補寫缺少的測試，直到達到 80% 以上的覆蓋率目標。

特別適合接手舊專案，或完成一個功能後發現覆蓋率不夠的情況。`,
    whenToUse: [
      "跑完 verify 發現覆蓋率低於 80%",
      "接手舊專案，想了解哪些地方缺少測試",
      "完成新功能後，確認測試有充分涵蓋",
      "設定品質目標，要求至少 80% 覆蓋率",
    ],
    promptExample: `/test-coverage`,
    claudeMessages: [
      { role: "user", content: "/test-coverage" },
      {
        role: "claude",
        content: `分析覆蓋率報告...

**目前覆蓋率：62%（目標 80%）**

未覆蓋的關鍵路徑：
- app/lib/pricing.ts（第 45-78 行）— 折扣計算邏輯，0% 覆蓋
- app/api/orders/route.ts（第 123-156 行）— 訂單驗證，0% 覆蓋
- app/hooks/useCart.ts（第 89-102 行）— 邊界情況未測試

正在補寫測試...

✅ 新增 pricing.test.ts（12 個測試）
✅ 新增 orders.test.ts（8 個測試）
✅ 更新 useCart.test.ts（+5 個邊界情況）

**新覆蓋率：84%** ✅ 達標！`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "覆蓋率不等於測試品質",
        content:
          "100% 覆蓋率不代表沒有 bug——只代表每行程式碼都被執行過。還要確保測試在驗證正確的行為，而不只是讓程式碼跑過去。",
      },
      {
        type: "tip",
        title: "先針對核心業務邏輯補測試",
        content:
          "如果覆蓋率很低，先從最重要的業務邏輯（計算、驗證、核心流程）開始補，而不是 UI 元件。",
      },
    ],
    relatedSlugs: ["tdd", "verify", "quality-gate"],
  },
  {
    slug: "update-docs",
    name: "/update-docs",
    emoji: "📚",
    category: "development",
    color: "#3fb950",
    shortDesc: "掃描程式碼變動，自動同步更新 README、API 文件和各種說明文件",
    whatItDoes: `文件和程式碼之間最常見的問題是「脫節」——程式碼改了，但文件還是舊的，導致新人看文件去理解程式碼時完全搞混。/update-docs 解決這個問題，讓文件自動追蹤程式碼的變化。

/update-docs 會掃描你最近的程式碼變動，找出哪些 README、API 文件、JSDoc 注解或型別說明已經過期，然後自動更新它們使其與程式碼一致。新增的函式會自動加注解，刪掉的 API 端點會從文件中移除，改動的介面說明會同步更新。

這是 /docs 的補充指令——/docs 是從零建立文件，/update-docs 是同步已有的文件和程式碼。`,
    whenToUse: [
      "剛完成一個功能，要確保文件反映最新狀態",
      "PR 前做最後整理，確保文件沒有過期資訊",
      "定期維護，讓文件持續與程式碼同步",
      "新人加入前，確保文件是最新的",
    ],
    promptExample: `/update-docs`,
    claudeMessages: [
      { role: "user", content: "/update-docs" },
      {
        role: "claude",
        content: `掃描程式碼變動...

**偵測到以下文件需要更新：**

📄 README.md
→ API 端點列表過期（新增了 /api/ratings）
→ 環境變數說明缺少 STRIPE_WEBHOOK_SECRET

📄 app/api/users/route.ts
→ 缺少 JSDoc（最近新增的 3 個函式）

📄 CHANGELOG.md
→ 最近 5 個 commit 未記錄

更新中...
✅ README.md 已同步
✅ JSDoc 已補齊
✅ CHANGELOG.md 已更新

所有文件已與程式碼同步`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "把 /update-docs 加入 commit 流程",
        content:
          "在每次 commit 前跑 /update-docs，養成「程式碼和文件一起更新」的習慣，避免文件越來越落後。",
      },
    ],
    relatedSlugs: ["docs", "update-codemaps", "checkpoint"],
  },
  {
    slug: "model-route",
    name: "/model-route",
    emoji: "🧭",
    category: "development",
    color: "#3fb950",
    shortDesc: "根據任務複雜度，推薦最適合的 Claude 模型版本，節省成本",
    whatItDoes: `Claude 有多個不同版本，每個版本在能力和成本之間有不同的取捨。用最貴的模型做簡單的事，就像用卡車去買便利商店的東西——浪費資源。/model-route 幫你做出明智的選擇。

你描述手頭的任務，/model-route 會評估任務的複雜度、需要多深的推理能力、有多少程式碼上下文……然後推薦最適合的模型：Haiku（快速輕量）、Sonnet（日常開發首選）、還是 Opus（最複雜的架構設計）。

對個人開發者來說可以省成本，對企業來說可以在不降低品質的前提下大幅減少 API 費用。`,
    whenToUse: [
      "不確定這個任務需要用哪個 Claude 版本",
      "想在不降低品質的前提下降低 API 成本",
      "建立自動化工作流，需要決定每個步驟用哪個模型",
      "多個 Agent 並行時，為每個 Agent 選最合適的模型",
    ],
    promptExample: `/model-route 我需要幫一個 React 元件加一個 onClick 事件處理器`,
    claudeMessages: [
      {
        role: "user",
        content: "/model-route 幫 React 元件加 onClick 事件處理器",
      },
      {
        role: "claude",
        content: `任務分析：
- 複雜度：低（單一元件，明確需求）
- 推理需求：最小（直接的 React 模式）
- 上下文需求：小（單一元件）

**推薦：Haiku**

理由：這是一個直接的程式碼修改，不需要深度推理。Haiku 可以完美處理，成本是 Sonnet 的 1/3。

Sonnet 更適合：複雜功能規劃、架構設計、debug 複雜問題
Opus 更適合：最複雜的系統設計、多步驟推理任務`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "日常開發用 Sonnet，簡單任務用 Haiku，大架構用 Opus",
        content:
          "這個原則覆蓋了 90% 的情況：寫功能用 Sonnet，簡單修改用 Haiku，設計整個系統架構用 Opus。",
      },
    ],
    relatedSlugs: ["plan", "devfleet", "context-budget"],
  },
];
