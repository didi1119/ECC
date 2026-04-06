import type { CommandData } from "./types";

export const qualityCommands: CommandData[] = [
  {
    slug: "code-review",
    name: "/code-review",
    emoji: "🔍",
    category: "quality",
    color: "#bc8cff",
    shortDesc: "請 Claude 審查你的程式碼，找出品質和安全問題",
    whatItDoes: `在軟體業，「code review（程式碼審查）」是同事互相看對方程式碼、給意見的流程。就像交報告前讓同學幫你看一遍，抓錯別字、邏輯問題、或有沒有更好的表達方式。

/code-review 讓 Claude 擔任資深工程師的角色，審查你最近修改的程式碼。它會分析：程式碼是否清晰易讀？有沒有安全漏洞？效能有沒有問題？是否遵循最佳實踐？

每個問題都會被標上嚴重等級：CRITICAL（必須修）、HIGH（應該修）、MEDIUM（可以考慮修）、LOW（小建議）。`,
    whenToUse: [
      "寫完一段程式碼，想確認品質",
      "準備把程式碼提交給同事 review 前，先自我檢查",
      "懷疑自己的做法不是最佳解，想聽意見",
      "接手別人的程式碼，需要快速評估品質",
      "學習：想知道怎麼把程式碼寫得更好",
    ],
    promptExample: `/code-review 審查我剛完成的購物車功能，特別關注安全性和效能`,
    claudeMessages: [
      { role: "user", content: "/code-review" },
      {
        role: "claude",
        content: `Code Review 結果：

**CRITICAL** — \`app/api/orders/route.ts:23\`
SQL 注入風險：直接把用戶輸入拼接進 SQL 語句
\`\`\`
// 危險：
const query = \`SELECT * FROM orders WHERE id = \${userId}\`
// 安全：使用參數化查詢
const query = db.select().from(orders).where(eq(orders.userId, userId))
\`\`\`

**HIGH** — \`app/components/ProductList.tsx:45\`
N+1 查詢問題：在迴圈裡呼叫 API，100 個商品就打 100 次 API
建議：改用批次查詢

**MEDIUM** — \`CartService.ts:78\`
函式超過 60 行，建議拆成較小的函式

**LOW** — 命名建議：\`data\` 改為 \`cartItems\` 更清楚

整體評分：⚠️ 有 CRITICAL 問題，需先修復再提交`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "測試沒通過前不要 code review",
        content:
          "如果測試還在失敗，code review 的結果是基於不完整的程式碼，浪費一個 review 機會。先讓測試全綠再 review。",
      },
      {
        type: "warning",
        title: "CRITICAL 問題一定要修",
        content:
          "CRITICAL 等級通常是安全漏洞或資料遺失風險，不修不能提交。HIGH 等級應該在本次修，MEDIUM 和 LOW 可以排到下次。",
      },
    ],
    relatedSlugs: ["security-review", "tdd", "verify"],
  },
  {
    slug: "security-review",
    name: "/security-review",
    emoji: "🔐",
    category: "quality",
    color: "#bc8cff",
    shortDesc: "專門針對安全漏洞的深度審查，適合處理敏感功能",
    whatItDoes: `一般的 code review 關注程式碼品質，而 /security-review 專門找安全漏洞。這就像房子裡有兩種不同的檢查：一般裝修品質檢查，以及防盜安全檢查——後者專門找你可能沒注意到的安全弱點。

安全問題往往很細微，一個字打錯就可能讓駭客入侵或用戶資料外洩。/security-review 會用 OWASP Top 10（業界公認的前十大安全漏洞清單）來檢查你的程式碼，找出 SQL 注入、XSS 攻擊、未授權存取、密鑰洩漏等問題。`,
    whenToUse: [
      "實作任何跟「帳號登入、密碼、權限」相關的功能",
      "處理用戶上傳的檔案",
      "整合金流或支付功能",
      "需要存取或顯示用戶個人資料",
      "開放公開 API 讓外部存取",
    ],
    promptExample: `/security-review 審查我剛完成的用戶上傳頭像功能，這個功能允許用戶上傳圖片`,
    claudeMessages: [
      { role: "user", content: "/security-review 審查檔案上傳功能" },
      {
        role: "claude",
        content: `Security Review — 檔案上傳功能：

**CRITICAL** — 路徑遍歷攻擊
\`\`\`
// 危險：用戶可以上傳路徑為 "../../config/.env" 的檔案
const path = \`uploads/\${userId}/\${file.name}\`

// 安全：用 UUID 重新命名，完全不信任原始檔名
const safePath = \`uploads/\${userId}/\${randomUUID()}\${ext}\`
\`\`\`

**CRITICAL** — 缺少伺服器端檔案大小驗證
前端驗證可被繞過，需在 API 層加入驗證

**HIGH** — MIME type 驗證不足
只檢查副檔名不夠，需同時驗證實際的檔案內容

建議：先修復兩個 CRITICAL 再上線`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "這三類功能必須跑 security-review",
        content: "認證登入、檔案上傳、金流支付——這三種功能有最多常見漏洞，每次實作都要跑 /security-review，不要省略。",
      },
      {
        type: "tip",
        title: "在 code-review 後再跑",
        content: "建議先 /code-review（解決品質問題），再 /security-review（專注安全），兩個分開跑效果更好。",
      },
    ],
    relatedSlugs: ["code-review", "verify", "tdd"],
  },
  {
    slug: "refactor-clean",
    name: "/refactor-clean",
    emoji: "🧹",
    category: "quality",
    color: "#bc8cff",
    shortDesc: "自動找出並移除沒有在用的程式碼和依賴套件",
    whatItDoes: `程式碼和房間一樣，久了就會堆積雜物：不再使用的函式、已經刪掉頁面的元件、三個月前引入但一次都沒用到的套件……這些「死程式碼」讓專案越來越臃腫，搜尋和維護都更困難。

/refactor-clean 會用自動分析工具（knip、depcheck 等）掃描整個專案，找出所有沒有被使用的程式碼，然後依照安全程度分類：確認沒用的直接刪、可能有用的先問你、危險的動之前告訴你。

每次刪除後都會重跑測試確認沒有破壞任何功能，讓清理過程安全可靠。`,
    whenToUse: [
      "專案執行 npm install 越來越慢",
      "node_modules 資料夾太大",
      "有很多「好像沒在用」的元件或函式",
      "定期維護，保持專案精簡",
    ],
    promptExample: `/refactor-clean`,
    claudeMessages: [
      { role: "user", content: "/refactor-clean" },
      {
        role: "claude",
        content: `執行死程式碼分析...

**未使用的依賴套件（4個）**
- react-syntax-highlighter：未使用，安全移除
- @types/lodash：未使用，安全移除
- moment：未使用（建議改用 date-fns）
- framer-motion：只在測試 mock 中，源碼未使用

**未使用的內部模組（2個）**
- app/utils/oldHelpers.ts：完全未被引用
- app/components/DeprecatedCard.tsx：無任何 import

基線測試：49/49 通過

開始清理... 每刪一個就重跑測試
→ 移除 react-syntax-highlighter：測試 49/49 ✅
→ 移除 @types/lodash：測試 49/49 ✅
→ 移除 framer-motion：測試 49/49 ✅
→ 移除 oldHelpers.ts：測試 49/49 ✅

清理完成！節省約 2.3MB 套件大小`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "動態 import 可能被誤判為未使用",
        content:
          "如果你的程式碼用 import() 動態載入某個模組，靜態分析工具可能認為它沒有被使用。/refactor-clean 在刪除前會告訴你，仔細確認後再允許刪除。",
      },
      {
        type: "tip",
        title: "每個月執行一次當例行維護",
        content: "養成每個月跑一次 /refactor-clean 的習慣，就像定期整理房間，不讓雜物積累太多。",
      },
    ],
    relatedSlugs: ["code-review", "verify"],
  },
  {
    slug: "e2e",
    name: "/e2e",
    emoji: "🌐",
    category: "quality",
    color: "#bc8cff",
    shortDesc: "產生並執行端對端測試，模擬真實用戶操作流程",
    whatItDoes: `E2E 是「End-to-End（端對端）」的縮寫。一般的測試只測試程式碼的某個小部分，而 E2E 測試模擬真實用戶從打開瀏覽器到完成某個目標的整個流程。

就像請一個真人試用你的網站：「你去試試看登入、然後加一個商品到購物車、然後結帳」，但這件事由程式自動完成，不需要真人一次次手動測試。

/e2e 會用 Playwright 這個工具在真實的瀏覽器裡執行這些流程，如果哪個步驟壞了會截圖並告訴你，讓你精確知道問題在哪。`,
    whenToUse: [
      "要確認整個購物流程（從選商品到付款）都運作正常",
      "部署上線前的最終測試",
      "做了重大改動後，確認核心功能沒壞",
      "用戶回報了某個功能壞了，想重現問題",
    ],
    promptExample: `/e2e 為購物流程寫端對端測試：用戶登入 → 搜尋商品 → 加入購物車 → 結帳`,
    claudeMessages: [
      {
        role: "user",
        content: "/e2e 為用戶登入和購物流程寫測試",
      },
      {
        role: "claude",
        content: `產生 E2E 測試...

\`\`\`typescript
// e2e/shopping.spec.ts
test('完整購物流程', async ({ page }) => {
  // 1. 開啟首頁
  await page.goto('/');

  // 2. 登入
  await page.click('[data-testid="login-btn"]');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('[type="submit"]');
  await expect(page).toHaveURL('/dashboard');

  // 3. 搜尋商品
  await page.fill('[data-testid="search"]', '蘋果');
  await page.press('[data-testid="search"]', 'Enter');

  // 4. 加入購物車
  await page.click('[data-testid="add-to-cart"]:first-child');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

  // 5. 截圖備存
  await page.screenshot({ path: 'e2e/screenshots/cart.png' });
});
\`\`\`

執行測試... ✅ 通過`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "E2E 測試需要有 data-testid",
        content:
          "E2E 測試需要能找到頁面上的元素。確保你的重要元件有 data-testid 屬性，例如 data-testid=\"login-btn\"，否則測試會找不到按鈕。",
      },
    ],
    relatedSlugs: ["tdd", "verify", "code-review"],
  },
  {
    slug: "harness-audit",
    name: "/harness-audit",
    emoji: "🔬",
    category: "quality",
    color: "#bc8cff",
    shortDesc: "掃描 ECC 設定的健康狀態，找出設定問題、過期 hooks 和效能瓶頸",
    whatItDoes: `就像汽車定期保養——你不會等引擎壞掉才去保養，而是定期檢查各個零件的狀況。/harness-audit 就是你的 ECC 設定「健康檢查」工具。

/harness-audit 會掃描你的 .claude/ 設定目錄，檢查：hooks 是否設定正確、agents 和 skills 的版本是否過期、settings.json 有沒有設定錯誤、有沒有衝突的規則……然後給你一份優先排序的問題清單和修復建議。

這個指令特別適合在「Claude 的行為開始不對勁」但找不到原因時使用，或是定期維護 ECC 設定時執行。`,
    whenToUse: [
      "Claude 的行為看起來不對，懷疑是設定問題",
      "剛升級 ECC 版本後，確認設定相容性",
      "每隔幾個月做一次例行的設定健康檢查",
      "與人分享你的 ECC 設定前，先確認沒有問題",
    ],
    promptExample: `/harness-audit`,
    claudeMessages: [
      { role: "user", content: "/harness-audit" },
      {
        role: "claude",
        content: `掃描 .claude/ 設定...

**設定健康報告：**

🟡 中優先級（2 個）
- hooks/PostToolUse：prettier 指令路徑錯誤（找不到 ./node_modules/.bin/prettier）
- settings.json：allowedTools 包含已棄用的工具名稱

🟢 正常（18 個）
- agents 版本：最新 ✅
- skills 載入：全部正常 ✅
- rules 設定：無衝突 ✅

**建議修復：**
1. 更新 prettier 路徑為 npx prettier
2. 從 allowedTools 移除棄用工具

執行 /harness-audit --fix 自動修復以上問題？`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "每次大幅修改 .claude/ 設定後執行",
        content:
          "每次手動修改了 settings.json、新增 hooks 或更新 agents 之後，跑一次 /harness-audit 確認設定正確。",
      },
    ],
    relatedSlugs: ["update-codemaps", "skill-health", "verify"],
  },
];
