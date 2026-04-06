import type { SkillData } from "./types";

export const testDrivenDevelopment: SkillData = {
  slug: "test-driven-development",
  name: "superpowers:test-driven-development",
  displayName: "Test-Driven Development",
  phase: "quality",
  color: "#f59e0b",
  emoji: "🔴",
  shortDesc: "RED-GREEN-REFACTOR 循環：先寫失敗測試，再寫最小實作，最後重構",
  whatItDoes:
    "TDD 是 Superpowers 中最核心的技能。它要求每一行產品代碼都必須先有一個失敗的測試。\n\n三個階段：RED（寫失敗測試，確認它真的失敗）→ GREEN（寫最小的代碼讓測試通過）→ REFACTOR（改善代碼，不加新功能）。",
  whenToUse: [
    "實作任何新功能",
    "修復 bug",
    "重構既有代碼",
    "所有 writing-plans 產生的任務",
  ],
  steps: [
    { number: 1, title: "RED：寫一個失敗測試", description: "測試名稱要清楚描述一個行為，用真實代碼而非 mock" },
    { number: 2, title: "RED：確認測試失敗", description: "執行測試，看到紅燈。沒有看到失敗就不知道測試是否正確", command: "npm test -- --watch" },
    { number: 3, title: "GREEN：寫最小實作", description: "只寫讓測試通過所需的最少代碼，不過度設計" },
    { number: 4, title: "GREEN：確認測試通過", description: "執行測試，看到綠燈。所有其他測試也要通過", command: "npm test" },
    { number: 5, title: "REFACTOR：整理代碼", description: "移除重複、改善命名、提取輔助函數。不加新行為" },
    { number: 6, title: "重複", description: "下一個行為從 RED 開始" },
  ],
  chatExample: [
    { role: "user", content: "實作一個函數：失敗的操作要重試 3 次" },
    { role: "claude", content: "好的，我來使用 superpowers:test-driven-development 技能。\n\n**RED：寫失敗測試**\n```typescript\ntest('retries failed operations 3 times', async () => {\n  const operation = jest.fn()\n    .mockRejectedValueOnce(new Error('fail 1'))\n    .mockRejectedValueOnce(new Error('fail 2'))\n    .mockResolvedValueOnce('success');\n  \n  const result = await retry(operation, 3);\n  expect(result).toBe('success');\n  expect(operation).toHaveBeenCalledTimes(3);\n});\n```\n執行測試... ❌ 紅燈（retry 函數不存在）\n\n**GREEN：最小實作**\n```typescript\nexport async function retry<T>(fn: () => Promise<T>, times: number): Promise<T> {\n  try {\n    return await fn();\n  } catch (e) {\n    if (times <= 1) throw e;\n    return retry(fn, times - 1);\n  }\n}\n```\n執行測試... ✅ 綠燈\n\n**REFACTOR：** 加入更好的錯誤訊息..." },
  ],
  keyPrinciples: [
    "沒有看到測試失敗，就不知道它是否在測試正確的東西",
    "GREEN 階段只寫最少的代碼",
    "REFACTOR 階段不加新行為",
    "沒有失敗測試就先刪除產品代碼再重寫",
  ],
  relatedSlugs: ["requesting-code-review", "verification-before-completion", "subagent-driven-development"],
};

export const requestingCodeReview: SkillData = {
  slug: "requesting-code-review",
  name: "superpowers:requesting-code-review",
  displayName: "Requesting Code Review",
  phase: "quality",
  color: "#f59e0b",
  emoji: "📋",
  shortDesc: "提交前對照規格書的自我審查清單，確認所有需求都實作完整",
  whatItDoes:
    "在請求代碼審查前，這個技能讓 AI 先對照原始規格書做一次系統性的自我檢查。它會確認每個需求都有對應的實作和測試，列出所有疑慮。\n\n這個前置步驟能大幅減少審查來回次數。",
  whenToUse: [
    "每個任務完成後",
    "準備提交 PR 前",
    "subagent-driven-development 的 Stage 1 審查",
  ],
  steps: [
    { number: 1, title: "對照規格書", description: "把實作和原始設計文件逐條對比" },
    { number: 2, title: "確認測試覆蓋率", description: "每個規格要求都有對應的測試" },
    { number: 3, title: "列出疑慮", description: "記錄任何可能的問題或不確定之處" },
    { number: 4, title: "標記審查狀態", description: "DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED" },
  ],
  chatExample: [
    { role: "user", content: "Task 3 的用戶登入 API 已完成，請準備審查" },
    { role: "claude", content: "好的，我來使用 superpowers:requesting-code-review 技能。\n\n對照規格書 user-auth-design.md 第 3 節：\n✅ POST /auth/login 端點實作完成\n✅ Email + 密碼驗證正確\n✅ JWT token 回傳格式符合規格\n⚠️ 疑慮：規格要求登入失敗要有速率限制，目前尚未實作\n\n建議：先加入速率限制後再提交審查，或標記為 DONE_WITH_CONCERNS。" },
  ],
  keyPrinciples: [
    "始終對照原始規格書，而非記憶",
    "誠實記錄所有疑慮，不隱瞞",
    "審查前先確認測試全部通過",
  ],
  relatedSlugs: ["receiving-code-review", "writing-plans", "subagent-driven-development"],
};

export const receivingCodeReview: SkillData = {
  slug: "receiving-code-review",
  name: "superpowers:receiving-code-review",
  displayName: "Receiving Code Review",
  phase: "quality",
  color: "#f59e0b",
  emoji: "✉️",
  shortDesc: "系統化處理審查意見：分類優先級，逐一修復，確認每個問題都解決",
  whatItDoes:
    "收到代碼審查意見後，這個技能幫你系統化地處理每一條意見。它把意見分成 Critical / Major / Minor 三個優先級，從最重要的開始修復，並確認每個修復都有對應的測試。",
  whenToUse: [
    "收到代碼審查意見後",
    "subagent-driven-development 的 Stage 2 審查後",
    "PR 收到 reviewer 意見時",
  ],
  steps: [
    { number: 1, title: "分類所有意見", description: "Critical（安全/功能問題）→ Major（設計問題）→ Minor（風格建議）" },
    { number: 2, title: "從 Critical 開始處理", description: "Critical 問題必須全部修復才能繼續" },
    { number: 3, title: "逐一修復並加測試", description: "每個修復都用 TDD 方式確認" },
    { number: 4, title: "回應 reviewer", description: "說明每個意見如何處理，或為何不採納" },
  ],
  chatExample: [
    { role: "user", content: "審查意見：1) SQL injection 風險 2) 函數太長 3) 變數命名可以更好" },
    { role: "claude", content: "好的，我來使用 superpowers:receiving-code-review 技能。\n\n分類意見：\n🔴 Critical：SQL injection — 立即修復（使用參數化查詢）\n🟡 Major：函數太長 — 拆分為 3 個小函數\n🟢 Minor：變數命名 — 重新命名提升可讀性\n\n按優先序修復中...\n[修復 SQL injection + 加測試]\n[拆分函數 + 更新測試]\n[重新命名]\n\n全部意見已處理，測試全部通過 ✅" },
  ],
  keyPrinciples: [
    "Critical 問題必須全部修復",
    "每個修復都要有對應的測試",
    "不辯論，先修再說",
    "回應每一條意見（即使不採納也要說明原因）",
  ],
  relatedSlugs: ["requesting-code-review", "test-driven-development"],
};
