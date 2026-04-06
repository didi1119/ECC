import type { SkillData } from "./types";

export const writingSkills: SkillData = {
  slug: "writing-skills",
  name: "superpowers:writing-skills",
  displayName: "Writing Skills",
  phase: "meta",
  color: "#a78bfa",
  emoji: "✍️",
  shortDesc: "按照 SKILL.md 模板建立新的可重用技能，供任何 AI 代理使用",
  whatItDoes:
    "Writing Skills 讓你擴展 Superpowers 系統，加入你自己的工作流程技能。每個技能都是一個 SKILL.md 檔案，定義了觸發條件、完整的執行步驟和核心原則。\n\n好的技能應該可以被給任何 AI 代理使用，而無需了解你的個人背景或偏好。",
  whenToUse: [
    "需要標準化重複流程時",
    "希望未來代理自動套用某種做法",
    "發現現有技能無法覆蓋的工作模式",
    "想貢獻到 Superpowers 社群時",
  ],
  steps: [
    { number: 1, title: "定義技能目的", description: "一句話說清楚這個技能解決什麼問題" },
    { number: 2, title: "定義觸發條件", description: "什麼情況下應該使用這個技能" },
    { number: 3, title: "撰寫 SKILL.md", description: "包含：目的、觸發條件、完整步驟、核心原則" },
    { number: 4, title: "用全新代理測試", description: "給一個沒有上下文的代理，確認它能正確理解並執行" },
    { number: 5, title: "存到 skills/ 目錄", description: "skills/<skill-name>/SKILL.md", command: "skills/<skill-name>/SKILL.md" },
  ],
  chatExample: [
    { role: "user", content: "我想建立一個標準化資料庫 migration 流程的技能" },
    { role: "claude", content: "好的，我來使用 superpowers:writing-skills 技能。\n\n定義目的：「確保資料庫 migration 安全執行，包含回滾計畫」\n\n觸發條件：「每次需要修改資料庫 schema 時」\n\n撰寫 SKILL.md...\n\n[已建立 skills/database-migration/SKILL.md]\n\n用全新代理測試... 代理正確理解並執行了 migration 流程 ✓\n\n技能已就緒！你可以說 'use superpowers:database-migration' 來使用它。" },
  ],
  keyPrinciples: [
    "好的技能在沒有額外上下文的情況下也能執行",
    "步驟要具體且可執行，不模糊",
    "用全新代理測試，確認可移植性",
    "遵循 SKILL.md 模板格式",
  ],
  relatedSlugs: ["using-superpowers"],
};

export const usingSuperpowers: SkillData = {
  slug: "using-superpowers",
  name: "superpowers:using-superpowers",
  displayName: "Using Superpowers",
  phase: "meta",
  color: "#a78bfa",
  emoji: "⚡",
  shortDesc: "Superpowers 系統入門指南：技能是什麼、如何啟用、如何組合使用",
  whatItDoes:
    "Using Superpowers 是整個系統的入口。它解釋技能的概念、完整的 7 步驟工作流程，以及如何在實際開發中使用這些技能。\n\n這個技能會把系統介紹給剛加入的 AI 代理，讓它了解如何在正確的時機呼叫正確的技能。",
  whenToUse: [
    "第一次使用 Superpowers",
    "開始一個新專案時",
    "想了解整體工作流程時",
    "給新的 AI 代理介紹這個系統時",
  ],
  steps: [
    { number: 1, title: "了解技能概念", description: "技能是可組合的工作流程片段，每個都有明確的觸發條件和步驟" },
    { number: 2, title: "學習 7 步驟工作流程", description: "Brainstorm → Worktree → Plan → Subagent Dev → TDD → Review → Finish Branch" },
    { number: 3, title: "練習呼叫技能", description: "在對話中說 'use superpowers:<skill-name>' 來啟用", command: "use superpowers:brainstorming" },
    { number: 4, title: "了解技能如何串接", description: "Brainstorming → Writing Plans → Executing Plans → Finishing Branch" },
  ],
  chatExample: [
    { role: "user", content: "我剛安裝了 Superpowers，要怎麼開始？" },
    { role: "claude", content: "歡迎使用 Superpowers！我來介紹一下這個系統。\n\nSuperpowers 是一套幫助 AI 代理更有系統地開發軟體的技能庫。核心是 7 步驟工作流程：\n\n1️⃣ Brainstorm — 設計優先，在寫代碼前澄清所有問題\n2️⃣ Git Worktree — 為功能建立隔離工作區\n3️⃣ Write Plan — 把設計拆成 2-5 分鐘的 TDD 任務\n4️⃣ Subagent Dev — 每個任務由新的子代理執行\n5️⃣ TDD — RED-GREEN-REFACTOR\n6️⃣ Code Review — 兩階段審查\n7️⃣ Finish Branch — 合併或 PR\n\n要開始一個功能，試試說：'use superpowers:brainstorming'" },
  ],
  keyPrinciples: [
    "技能不是強制的，但系統化的流程能減少錯誤",
    "每個技能都可以單獨使用，也可以組合",
    "7 步驟流程適用於大多數功能開發",
    "設計優先永遠是最佳實踐",
  ],
  relatedSlugs: ["brainstorming", "writing-skills"],
};
