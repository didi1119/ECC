import type { SkillData } from "./types";

export const brainstorming: SkillData = {
  slug: "brainstorming",
  name: "superpowers:brainstorming",
  displayName: "Brainstorming",
  phase: "planning",
  color: "#60a5fa",
  emoji: "💡",
  shortDesc: "透過 9 步驟 Socratic 對話將想法精煉為設計文件，再開始實作",
  whatItDoes:
    "Brainstorming 技能強迫你在寫任何一行程式碼之前，先把想法變成一份完整的設計文件。\n\n它會探索專案上下文，一次問一個澄清問題，然後提出 2-3 種方案及其優缺點。設計文件自動存到 docs/superpowers/specs/ 並且需要你的批准，之後才會進入實作階段。",
  whenToUse: [
    "任何新功能開發前",
    "設計有不確定性時",
    "避免一開始就走錯方向",
    "需要讓 AI 完全理解你的意圖時",
  ],
  steps: [
    { number: 1, title: "探索專案上下文", description: "閱讀相關檔案、文件和最近的 commits" },
    { number: 2, title: "提供 Visual Companion（選用）", description: "需要圖表或 mockup 時，單獨詢問同意" },
    { number: 3, title: "逐一提問澄清", description: "一次只問一個問題，理解目的、限制和成功標準" },
    { number: 4, title: "提出 2-3 種方案", description: "列出各方案的優缺點和推薦選擇" },
    { number: 5, title: "呈現設計", description: "展示架構、元件、資料流、錯誤處理、測試策略" },
    { number: 6, title: "撰寫設計文件", description: "存到 docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md 並 commit", command: "docs/superpowers/specs/" },
    { number: 7, title: "規格自我審查", description: "檢查有無佔位符、矛盾或模糊之處" },
    { number: 8, title: "等待用戶批准", description: "你批准設計後才繼續" },
    { number: 9, title: "轉交實作", description: "只呼叫 writing-plans 技能，不直接寫程式", command: "superpowers:writing-plans" },
  ],
  chatExample: [
    { role: "user", content: "我想加入用戶登入功能" },
    { role: "claude", content: "好的，我來使用 superpowers:brainstorming 技能。\n\n第一個問題：這個登入系統需要支援哪種驗證方式？\n  A. Email + 密碼\n  B. OAuth（Google/GitHub）\n  C. 兩者都要" },
    { role: "user", content: "C，兩者都要" },
    { role: "claude", content: "了解。第二個問題：用戶 session 如何管理？\n  A. JWT token（stateless）\n  B. Server-side session（Redis）\n  C. 讓我推薦最適合的" },
    { role: "user", content: "讓你推薦" },
    { role: "claude", content: "我建議使用 JWT + refresh token 模式。以下是三種方案的比較...\n\n[設計文件已儲存到 docs/superpowers/specs/2026-04-06-user-auth-design.md]\n\n請審閱後告訴我是否批准，或是有需要調整的地方。" },
  ],
  keyPrinciples: [
    "一次只問一個問題",
    "沒有設計批准，絕對不寫程式碼",
    "提供多選題而非開放問題",
    "設計文件存到 docs/superpowers/specs/",
    "對 YAGNI 原則嚴格執行（不加不需要的功能）",
  ],
  relatedSlugs: ["writing-plans", "using-superpowers"],
};

export const writingPlans: SkillData = {
  slug: "writing-plans",
  name: "superpowers:writing-plans",
  displayName: "Writing Plans",
  phase: "planning",
  color: "#60a5fa",
  emoji: "📝",
  shortDesc: "將規格書拆解成 2-5 分鐘可完成的 TDD 任務清單，帶完整代碼片段",
  whatItDoes:
    "Writing Plans 把已批准的設計文件變成一份精確的實作計畫。每個任務都是 2-5 分鐘內可完成的 TDD 步驟：寫失敗測試 → 確認失敗 → 實作 → 確認通過 → commit。\n\n計畫裡不允許任何 TODO 佔位符，每一步都要有完整的代碼和確切的檔案路徑。",
  whenToUse: [
    "有已批准的設計文件後",
    "實作複雜多步驟功能前",
    "需要可委派給子代理的任務清單",
    "希望整個開發流程有 checkpoint 時",
  ],
  steps: [
    { number: 1, title: "讀取設計文件", description: "從 docs/superpowers/specs/ 讀入已批准的設計" },
    { number: 2, title: "識別子系統邊界", description: "複雜功能拆成多份計畫，每份聚焦單一子系統" },
    { number: 3, title: "拆解為 TDD 任務", description: "每個任務 = 寫失敗測試 + 實作 + commit" },
    { number: 4, title: "填入完整代碼", description: "每步都要有確切的檔案路徑和完整代碼片段" },
    { number: 5, title: "自我審查清單", description: "掃描規格涵蓋度、無佔位符、型別一致性" },
    { number: 6, title: "存檔並提供選項", description: "存到 docs/superpowers/plans/，提供子代理 vs 內聯執行兩種選項", command: "docs/superpowers/plans/" },
  ],
  chatExample: [
    { role: "user", content: "請根據設計文件 user-auth-design.md 撰寫實作計畫" },
    { role: "claude", content: "好的，我來使用 superpowers:writing-plans 技能。\n\n# 用戶驗證 Implementation Plan\n**Goal:** 實作 Email + OAuth 雙重登入\n**Architecture:** JWT + refresh token，Prisma ORM\n\n## Task 1: 建立 User model 測試\n```typescript\n// tests/user.test.ts\ntest('createUser stores hashed password', async () => {\n  const user = await createUser({ email: 'test@test.com', password: 'secret' });\n  expect(user.password).not.toBe('secret');\n  expect(await bcrypt.compare('secret', user.password)).toBe(true);\n});\n```\n\n## Task 2: 實作 User model...\n[計畫已存到 docs/superpowers/plans/2026-04-06-user-auth.md]" },
  ],
  keyPrinciples: [
    "每個任務 2-5 分鐘內可完成",
    "禁止 TODO / TBD 佔位符",
    "每步都有確切的測試指令和預期輸出",
    "計畫存到 docs/superpowers/plans/",
  ],
  relatedSlugs: ["brainstorming", "executing-plans", "subagent-driven-development"],
};

export const executingPlans: SkillData = {
  slug: "executing-plans",
  name: "superpowers:executing-plans",
  displayName: "Executing Plans",
  phase: "planning",
  color: "#60a5fa",
  emoji: "▶️",
  shortDesc: "載入計畫檔案，依序執行每個任務，在每個任務後進行驗證",
  whatItDoes:
    "Executing Plans 讀取 writing-plans 產生的計畫檔案，並帶有 checkpoint 的依序執行。每個任務完成後都要驗證，發現阻礙立刻停止而非盲目繼續。\n\n全部任務完成後自動呼叫 finishing-a-development-branch 技能。",
  whenToUse: [
    "有 writing-plans 生成的計畫檔後",
    "需要有 checkpoint 的批次執行",
    "想讓 AI 自主完成整個計畫",
  ],
  steps: [
    { number: 1, title: "載入並審查計畫", description: "讀取計畫檔案，檢查有無問題，開始前先提出疑慮" },
    { number: 2, title: "建立 TodoWrite 清單", description: "把所有任務加入追蹤清單" },
    { number: 3, title: "依序執行任務", description: "標記進行中 → 執行步驟 → 驗證 → 標記完成" },
    { number: 4, title: "遇到阻礙立刻停止", description: "不猜測，請求澄清或協助" },
    { number: 5, title: "完成後收尾", description: "呼叫 finishing-a-development-branch 技能", command: "superpowers:finishing-a-development-branch" },
  ],
  chatExample: [
    { role: "user", content: "請執行 docs/superpowers/plans/2026-04-06-user-auth.md" },
    { role: "claude", content: "好的，我來使用 superpowers:executing-plans 技能。\n\n載入計畫... 共 8 個任務，預估 40 分鐘。\n我有一個問題：Task 3 需要 Redis，目前環境有安裝嗎？" },
    { role: "user", content: "有，docker compose up 就可以了" },
    { role: "claude", content: "了解。開始執行：\n\n✅ Task 1：建立 User model 測試 — 通過 (2分鐘)\n⏳ Task 2：實作 User model — 進行中..." },
  ],
  keyPrinciples: [
    "開始前先批判性審查計畫",
    "每個任務後都要驗證",
    "遇到阻礙立刻停止，不要猜測",
    "完成後呼叫 finishing-a-development-branch",
  ],
  relatedSlugs: ["writing-plans", "subagent-driven-development", "finishing-a-development-branch"],
};
