import type { SkillData } from "./types";

export const usingGitWorktrees: SkillData = {
  slug: "using-git-worktrees",
  name: "superpowers:using-git-worktrees",
  displayName: "Using Git Worktrees",
  phase: "git",
  color: "#34d399",
  emoji: "🌿",
  shortDesc: "為每個功能建立隔離的 git worktree，避免分支切換污染工作狀態",
  whatItDoes:
    "Git Worktrees 讓你在不切換分支的情況下，同時在多個功能上工作。每個 worktree 是一個獨立的工作目錄，有自己的分支和工作狀態。\n\n這個技能會自動處理目錄選擇、.gitignore 驗證、依賴安裝和基準測試驗證。",
  whenToUse: [
    "每次開始新功能前",
    "平行開發多個功能時",
    "需要隔離的乾淨工作環境",
    "避免主分支被開發中的代碼污染",
  ],
  steps: [
    { number: 1, title: "檢查 worktree 目錄", description: "優先使用 .worktrees/，否則詢問用戶偏好" },
    { number: 2, title: "驗證 .gitignore", description: "確認 .worktrees/ 在 .gitignore 中，若沒有則自動加入並 commit" },
    { number: 3, title: "建立 worktree", description: "在新分支上建立 worktree", command: "git worktree add .worktrees/<feature-name> -b feature/<feature-name>" },
    { number: 4, title: "安裝依賴", description: "自動偵測並安裝（npm install / pip install / cargo build）", command: "npm install" },
    { number: 5, title: "執行基準測試", description: "確認全部測試在乾淨狀態下通過", command: "npm test" },
    { number: 6, title: "回報位置", description: "告知 worktree 路徑和分支名稱，開始工作" },
  ],
  chatExample: [
    { role: "user", content: "我要開始實作用戶登入功能" },
    { role: "claude", content: "好的，我來使用 superpowers:using-git-worktrees 技能。\n\n檢查 .gitignore... .worktrees/ 已存在 ✓\n\n建立 worktree：\n```\ngit worktree add .worktrees/user-auth -b feature/user-auth\n```\n\n安裝依賴... npm install 完成 ✓\n執行基準測試... 76/76 通過 ✓\n\nWorktree 已就緒：.worktrees/user-auth/\n分支：feature/user-auth\n\n準備好開始實作了！" },
  ],
  keyPrinciples: [
    ".worktrees 目錄必須在 .gitignore 中",
    "每次都要驗證基準測試通過再開始",
    "永遠不要跳過 .gitignore 驗證",
    "一個功能 = 一個 worktree = 一個分支",
  ],
  relatedSlugs: ["finishing-a-development-branch"],
};

export const finishingBranch: SkillData = {
  slug: "finishing-a-development-branch",
  name: "superpowers:finishing-a-development-branch",
  displayName: "Finishing a Development Branch",
  phase: "git",
  color: "#34d399",
  emoji: "🏁",
  shortDesc: "驗證測試後提供四個選項：本地合併、建立 PR、保留或捨棄",
  whatItDoes:
    "完成功能開發後，這個技能引導你安全地收尾：先驗證所有測試，然後提供四個明確的選項讓你決定如何處理這個分支。\n\n它需要你輸入 'discard' 來確認捨棄操作，防止意外刪除工作成果。",
  whenToUse: [
    "完成功能的所有任務後",
    "準備合併或提 PR 時",
    "需要決定分支去向時",
  ],
  steps: [
    { number: 1, title: "執行測試套件", description: "確認全部測試通過，若失敗則停止", command: "npm test" },
    { number: 2, title: "確認目標分支", description: "識別要合併回去的基礎分支（通常是 main 或 master）" },
    { number: 3, title: "呈現四個選項", description: "讓用戶選擇：合併 / PR / 保留 / 捨棄" },
    { number: 4, title: "執行選擇", description: "依選項執行對應的 git 操作" },
    { number: 5, title: "清理 worktree", description: "選項 1/2/4 會清除 worktree，選項 3 保留" },
  ],
  chatExample: [
    { role: "user", content: "用戶登入功能全部完成了" },
    { role: "claude", content: "好的，我來使用 superpowers:finishing-a-development-branch 技能。\n\n執行測試... 82/82 通過 ✓\n基礎分支：main\n\n請選擇：\n1. 本地合併回 main\n2. Push 並建立 Pull Request\n3. 保留分支（稍後處理）\n4. 捨棄這份工作" },
    { role: "user", content: "2" },
    { role: "claude", content: "好的，Push 並建立 PR...\n\ngit push origin feature/user-auth\ngh pr create --title 'feat: 用戶登入功能' --body '...'\n\nPR 已建立：https://github.com/.../pull/42\nWorktree .worktrees/user-auth/ 已清除。" },
  ],
  keyPrinciples: [
    "測試失敗就停止，不進行任何 git 操作",
    "捨棄操作需要輸入 'discard' 確認",
    "選項 1/2/4 後會清除 worktree",
    "選項 3 保留 worktree 供之後使用",
  ],
  relatedSlugs: ["using-git-worktrees", "subagent-driven-development"],
};
