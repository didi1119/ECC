import type { SkillData } from "./types";

export const systematicDebugging: SkillData = {
  slug: "systematic-debugging",
  name: "superpowers:systematic-debugging",
  displayName: "Systematic Debugging",
  phase: "debugging",
  color: "#f87171",
  emoji: "🔍",
  shortDesc: "四階段根因分析：調查 → 模式比對 → 假設驗證 → 實作，禁止隨機嘗試",
  whatItDoes:
    "Systematic Debugging 的核心規則是：「沒有找到根因之前，不允許任何修復」。它用科學方法取代直覺猜測，平均每次修復只需 15-30 分鐘，成功率 95%。\n\n四個階段必須依序完成：調查錯誤 → 比對工作中的代碼 → 提出並驗證假設 → 最後才實作修復。",
  whenToUse: [
    "任何 bug 調查",
    "測試失敗的根因分析",
    "意外行為除錯",
    "performance 問題調查",
  ],
  steps: [
    {
      number: 1,
      title: "Phase 1：調查根因",
      description: "完整讀取錯誤訊息 → 確認可重現 → 審查最近的變更 → 加入診斷 log → 向上追蹤錯誤來源",
    },
    {
      number: 2,
      title: "Phase 2：模式分析",
      description: "找到類似功能的正常工作代碼 → 完整讀取（不是略讀）→ 記錄每一個差異",
    },
    {
      number: 3,
      title: "Phase 3：假設驗證",
      description: "明確說明「我相信 X 導致這個問題，因為 Y」→ 每次只改一個變數 → 確認結果",
    },
    {
      number: 4,
      title: "Phase 4：實作修復",
      description: "先寫失敗測試 → 修復根因 → 確認測試通過且沒有 regression",
      command: "npm test",
    },
  ],
  chatExample: [
    { role: "user", content: "用戶登入後，session 在 30 秒後隨機失效" },
    { role: "claude", content: "好的，我來使用 superpowers:systematic-debugging 技能。\n\n**Phase 1：調查根因**\n加入 session 事件 log...\n\n發現：session 失效時間不固定，但都在 token refresh 後。\n最近變更：3 天前修改了 JWT 過期時間計算。\n\n**Phase 2：模式分析**\n比對原始的 token refresh 代碼...\n發現差異：舊代碼用 Date.now()，新代碼用 new Date()（時區處理不同）\n\n**Phase 3：假設**\n「我相信時區轉換導致 token 提前過期，因為 new Date() 在伺服器 UTC+0 環境下比 Date.now() 早 8 小時」\n\n**Phase 4：修復**\n寫失敗測試 → 改回 Date.now() → 測試通過 ✅" },
  ],
  keyPrinciples: [
    "沒有找到根因就不修復",
    "連續 3 次修復失敗後，停下來質疑架構設計",
    "不要「試試看改這個」，要「我相信 X 因為 Y」",
    "系統性調查平均 15-30 分鐘，隨機嘗試平均 2-3 小時",
  ],
  relatedSlugs: ["verification-before-completion", "test-driven-development"],
};

export const verificationBeforeCompletion: SkillData = {
  slug: "verification-before-completion",
  name: "superpowers:verification-before-completion",
  displayName: "Verification Before Completion",
  phase: "debugging",
  color: "#f87171",
  emoji: "✅",
  shortDesc: "確認修復解決了根因而非只讓測試通過，並檢查邊緣案例和 regression",
  whatItDoes:
    "這個技能防止一個常見的陷阱：測試通過了，但問題其實沒有真正解決（只是測試不夠嚴格）。\n\n它要求在宣告完成之前，明確驗證根因已被解決、邊緣案例都有涵蓋、沒有引入新的 regression。",
  whenToUse: [
    "宣告 bug 修復完成前",
    "每次 git commit 之前",
    "systematic-debugging 的最後一步",
  ],
  steps: [
    { number: 1, title: "確認根因已解決", description: "不只是症狀消失，而是根本原因已移除" },
    { number: 2, title: "執行完整測試套件", description: "不只是相關測試，是全部測試", command: "npm test" },
    { number: 3, title: "檢查邊緣案例", description: "空值、極端值、並發情況都有測試" },
    { number: 4, title: "確認無 regression", description: "與此修復相關的所有功能都還正常工作" },
  ],
  chatExample: [
    { role: "user", content: "session 問題修復了，測試通過" },
    { role: "claude", content: "好的，我來使用 superpowers:verification-before-completion 技能。\n\n確認根因已解決：時區問題已修正，不只是 session 時間延長 ✓\n\n執行完整測試套件：82/82 通過 ✓\n\n邊緣案例：\n- 跨越午夜的 session ✓\n- 夏令時間切換 ✓\n- 並發 token refresh ✓\n\n確認無 regression：auth、payment、notifications 模組測試全通過 ✓\n\n驗證完成，可以安全 commit。" },
  ],
  keyPrinciples: [
    "測試通過不等於問題解決",
    "必須明確驗證根因已移除",
    "不只跑相關測試，要跑完整套件",
    "邊緣案例要有測試覆蓋",
  ],
  relatedSlugs: ["systematic-debugging", "test-driven-development"],
};
