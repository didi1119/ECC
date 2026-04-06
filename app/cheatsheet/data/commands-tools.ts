import type { CommandData } from "./types";

export const toolsCommands: CommandData[] = [
  {
    slug: "jira",
    name: "/jira",
    emoji: "📌",
    category: "tools",
    color: "#56d364",
    shortDesc: "整合 Jira：讀取 ticket 需求、更新狀態、新增評論，不用離開 Claude",
    whatItDoes: `開發者最常見的工作流程是：先看 Jira ticket 了解需求，然後去 IDE 開始寫程式，遇到問題回去查 ticket，完成後回 Jira 更新狀態……這個在兩個工具之間來回切換的過程非常打斷心流。/jira 把 Jira 整合進 Claude，讓你不用離開工作環境。

/jira 可以讀取 Jira ticket 的詳細資訊（需求說明、驗收條件、子任務）、更新 ticket 狀態（從「開發中」改為「待審查」）、新增評論（記錄進度或提問）。這些操作直接在 Claude 對話裡完成，讓你保持在開發的心流狀態。

需要先配置 Jira API token 才能使用（透過 /update-config 設定）。`,
    whenToUse: [
      "開始一個 ticket 前，讀取完整需求和驗收條件",
      "完成開發後，直接在 Claude 裡更新 ticket 狀態",
      "需要在 ticket 記錄技術決策或提問",
      "Sprint 規劃時，快速查閱多個 ticket 的詳情",
    ],
    promptExample: `/jira ENG-1234`,
    claudeMessages: [
      { role: "user", content: "/jira ENG-1234" },
      {
        role: "claude",
        content: `讀取 Jira ticket ENG-1234...

**標題**：實作用戶評分系統
**狀態**：In Progress
**優先級**：High
**指派給**：你

**需求說明**：
用戶可以對購買的商品進行評分（1-5星），每個商品可以看到平均分和評分數量。

**驗收條件**：
- [ ] 用戶可以提交評分
- [ ] 同一用戶對同一商品只能評分一次
- [ ] 商品頁顯示平均分（保留一位小數）
- [ ] 管理員可以刪除不當評論

要根據這些需求開始實作嗎？我可以用 /plan 先規劃一下。`,
      },
    ],
    pitfalls: [
      {
        type: "warning",
        title: "需要先設定 Jira API Token",
        content:
          "使用前需要在 Jira 帳號設定裡產生 API Token，並透過環境變數或 /update-config 設定給 Claude。沒有設定的話 /jira 無法連線。",
      },
      {
        type: "tip",
        title: "更新 ticket 狀態前 Claude 會先確認",
        content:
          "每次要修改 ticket 狀態或新增評論，Claude 都會先告訴你要做什麼並等你確認，不會直接改。",
      },
    ],
    relatedSlugs: ["plan", "prp-plan", "sessions"],
  },
  {
    slug: "pm2",
    name: "/pm2",
    emoji: "⚙️",
    category: "tools",
    color: "#56d364",
    shortDesc: "分析你的專案結構，自動生成 PM2 服務設定和啟動指令",
    whatItDoes: `PM2 是 Node.js 應用程式的程序管理器，讓應用程式在背景持續運行、自動重啟，並管理日誌。但設定 PM2 需要了解你的專案結構才能寫出正確的設定檔。/pm2 自動幫你分析專案，生成最適合的 PM2 設定。

/pm2 會掃描你的專案：是 Next.js 還是 Express？有幾個需要獨立運行的服務？入口文件是哪個？環境變數需要哪些？然後自動生成 ecosystem.config.js（PM2 的設定檔）和對應的啟動、停止、重啟指令。

省去手動查 PM2 文件、試錯設定的時間。`,
    whenToUse: [
      "要把 Node.js 應用部署到 VPS 或自管伺服器",
      "需要讓多個服務（前端 + 後端 + Worker）同時運行",
      "設定生產環境的程序管理",
      "從 forever 或 nodemon 遷移到 PM2",
    ],
    promptExample: `/pm2`,
    claudeMessages: [
      { role: "user", content: "/pm2" },
      {
        role: "claude",
        content: `分析專案結構...

偵測到：Next.js 前端 + Express API + Redis Worker

生成 ecosystem.config.js：

\`\`\`javascript
module.exports = {
  apps: [
    {
      name: "nextjs-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      env: { PORT: 3000, NODE_ENV: "production" }
    },
    {
      name: "express-api",
      script: "dist/server.js",
      instances: 2,
      exec_mode: "cluster",
      env: { PORT: 4000 }
    },
    {
      name: "redis-worker",
      script: "dist/worker.js",
      watch: false
    }
  ]
}
\`\`\`

啟動：pm2 start ecosystem.config.js
狀態：pm2 status
日誌：pm2 logs`,
      },
    ],
    pitfalls: [
      {
        type: "gotcha",
        title: "生產環境記得設定 PM2 開機自啟動",
        content:
          "伺服器重啟後 PM2 不會自動啟動。跑 pm2 startup 然後 pm2 save，確保開機後所有服務自動恢復。",
      },
    ],
    relatedSlugs: ["update-codemaps", "checkpoint", "docs"],
  },
  {
    slug: "setup-pm",
    name: "/setup-pm",
    emoji: "📦",
    category: "tools",
    color: "#56d364",
    shortDesc: "設定你偏好的套件管理器（npm/pnpm/yarn/bun），ECC 之後會自動使用",
    whatItDoes: `不同開發者習慣不同的 Node.js 套件管理器：有人用 npm，有人偏好更快的 pnpm，有人用 yarn，有人嘗試 bun。Claude 在安裝套件或跑 script 時，需要知道你的專案用哪個。

/setup-pm 讓你設定一次，之後 Claude 就永遠記得。它會更新 ECC 設定，讓所有涉及套件管理的指令（/tdd、/build-fix、/verify……）都自動使用你指定的套件管理器，不需要你每次都說「用 pnpm 不要用 npm」。

這是個一次性設定，非常快，但能避免很多不必要的困擾。`,
    whenToUse: [
      "開始使用 ECC 的第一件事（強烈建議）",
      "換了套件管理器（例如從 npm 換到 pnpm）",
      "發現 Claude 用了錯誤的套件管理器",
      "新機器設定 ECC 環境時",
    ],
    promptExample: `/setup-pm pnpm`,
    claudeMessages: [
      { role: "user", content: "/setup-pm pnpm" },
      {
        role: "claude",
        content: `設定套件管理器為 pnpm...

✅ .claude/settings.json 已更新：
{
  "packageManager": "pnpm"
}

從現在開始，所有指令都會使用 pnpm：
- 安裝套件：pnpm install
- 跑腳本：pnpm run build
- 新增依賴：pnpm add <package>

確認 pnpm 已安裝：pnpm --version`,
      },
    ],
    pitfalls: [
      {
        type: "tip",
        title: "每個專案可以有不同的套件管理器",
        content:
          "/setup-pm 可以設在專案層級（在專案目錄執行）或全局（在家目錄執行）。如果你在不同專案用不同的套件管理器，分別在各專案設定。",
      },
    ],
    relatedSlugs: ["update-codemaps", "harness-audit", "build-fix"],
  },
];
