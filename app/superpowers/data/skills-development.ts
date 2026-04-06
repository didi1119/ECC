import type { SkillData } from "./types";

export const subagentDrivenDevelopment: SkillData = {
  slug: "subagent-driven-development",
  name: "superpowers:subagent-driven-development",
  displayName: "Subagent-Driven Development",
  phase: "development",
  color: "#7c6aef",
  emoji: "🤖",
  shortDesc: "為每個任務派發全新子代理，搭配規格合規 + 代碼品質雙階段審查",
  whatItDoes:
    "Subagent-Driven Development 是執行計畫的進階方式：每個任務都派發一個全新的子代理來實作，避免上下文污染。\n\n每個任務完成後，依序通過兩個審查：第一個確認是否符合規格書，第二個確認代碼品質。兩者都通過才算完成。",
  whenToUse: [
    "執行多任務計畫時",
    "需要隔離上下文時",
    "複雜功能需要專業化處理",
    "想要最高品質保證的開發流程",
  ],
  steps: [
    { number: 1, title: "提取所有任務", description: "一次讀完計畫，識別所有任務和依賴關係" },
    { number: 2, title: "建立 TodoWrite 追蹤", description: "建立任務進度清單" },
    { number: 3, title: "派發實作子代理", description: "傳入完整任務文字 + 相關上下文（子代理不讀取檔案）", command: "Task: 實作 [任務名稱]" },
    { number: 4, title: "Stage 1：規格合規審查", description: "派發審查子代理確認實作符合規格書要求" },
    { number: 5, title: "Stage 2：代碼品質審查", description: "派發代碼品質子代理審查可讀性和最佳實踐" },
    { number: 6, title: "標記完成，進入下一任務", description: "兩階段都通過才移到下一個任務" },
  ],
  chatExample: [
    { role: "user", content: "請用 subagent-driven 模式執行 user-auth 計畫" },
    { role: "claude", content: "好的，我來使用 superpowers:subagent-driven-development 技能。\n\n已提取 8 個任務。開始 Task 1...\n\n[派發實作子代理 → Task 1 完成]\n[派發 Stage 1 規格審查 → 通過]\n[派發 Stage 2 品質審查 → 通過]\n\n✅ Task 1 完成。開始 Task 2..." },
    { role: "user", content: "Task 3 的審查發現什麼問題嗎？" },
    { role: "claude", content: "Stage 1 審查發現：密碼重設 API 缺少速率限制（規格書第 4.2 節要求）。\n\n已派發修復子代理，修復後再次通過兩階段審查。✅ Task 3 現在完成。" },
  ],
  keyPrinciples: [
    "子代理不繼承你的上下文，必須主動提供所需資訊",
    "兩階段審查都通過才算完成",
    "複雜任務用強模型，機械性任務可用較便宜的模型",
    "永遠不要跳過審查或帶著未修復的問題繼續",
  ],
  relatedSlugs: ["writing-plans", "dispatching-parallel-agents", "test-driven-development"],
};

export const dispatchingParallelAgents: SkillData = {
  slug: "dispatching-parallel-agents",
  name: "superpowers:dispatching-parallel-agents",
  displayName: "Dispatching Parallel Agents",
  phase: "development",
  color: "#7c6aef",
  emoji: "⚡",
  shortDesc: "識別獨立問題域，同時派發多個專業子代理並行處理",
  whatItDoes:
    "當多個問題或任務彼此獨立時，可以同時派發多個子代理並行處理，大幅縮短總時間。\n\n每個代理都有聚焦的範疇、自包含的提示詞和明確的輸出格式。完成後統一審查結果，確認沒有衝突。",
  whenToUse: [
    "多個不相關的測試失敗",
    "跨模組的平行功能開發",
    "調查彼此獨立的問題",
    "需要同時進行多個代碼審查",
  ],
  steps: [
    { number: 1, title: "識別獨立問題域", description: "確認問題之間沒有共享狀態或依賴關係" },
    { number: 2, title: "為每個代理建立聚焦任務", description: "每個任務：明確範疇 + 目標 + 限制 + 預期輸出格式" },
    { number: 3, title: "同時派發所有代理", description: "並行執行，而非依序等待", command: "Task (parallel): [問題 1] / [問題 2] / [問題 3]" },
    { number: 4, title: "審查並整合結果", description: "檢查修復是否衝突，驗證全部測試通過" },
  ],
  chatExample: [
    { role: "user", content: "有 6 個測試失敗：3 個在 auth 模組、2 個在 payment 模組、1 個在 notifications" },
    { role: "claude", content: "好的，我來使用 superpowers:dispatching-parallel-agents 技能。\n\n這 3 個問題域彼此獨立，可以並行處理：\n\n[同時派發 3 個子代理]\n→ Agent A：auth 模組 3 個失敗\n→ Agent B：payment 模組 2 個失敗\n→ Agent C：notifications 1 個失敗\n\n全部完成後整合結果，確認無衝突..." },
    { role: "user", content: "結果如何？" },
    { role: "claude", content: "✅ 全部 6 個測試現在通過：\n- Agent A 修復：缺少 JWT 過期驗證\n- Agent B 修復：非同步處理 race condition\n- Agent C 修復：錯誤的 email template 路徑\n\n修復無衝突，可以 commit。" },
  ],
  keyPrinciples: [
    "只在問題真正獨立時才並行",
    "每個代理的提示詞必須完全自包含",
    "必須確認所有修復不會相互衝突",
    "一個代理一個問題域",
  ],
  relatedSlugs: ["subagent-driven-development"],
};
