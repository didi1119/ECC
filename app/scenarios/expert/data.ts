export type ExpertScenarioCard = {
  href: string;
  emoji: string;
  title: string;
  story: string;
  tags: string[];
  accentHex: string;
  navLabel: string;
};

export const expertScenarioCards: ExpertScenarioCard[] = [
  {
    href: "/scenarios/expert/reviewer-loop",
    emoji: "🧑‍⚖️",
    title: "雙 Agent 評審迴圈",
    story: "一個 Agent 負責開發，另一個 Agent 專職評審打分，低於 8 分就退回修正直到過線。",
    tags: ["評分門檻", "雙 Agent", "自動回圈"],
    accentHex: "#fb923c",
    navLabel: "評審迴圈",
  },
  {
    href: "/scenarios/expert/autopilot-delivery",
    emoji: "🛫",
    title: "不中斷交付模式",
    story: "先把完整流程和停損條件交給 ECC，除非碰到高風險決策，否則中途不要一直停下來等你指令。",
    tags: ["流程接管", "少回報", "自動推進"],
    accentHex: "#60a5fa",
    navLabel: "不中斷交付",
  },
  {
    href: "/scenarios/expert/self-qa-sprint",
    emoji: "🧹",
    title: "自我驗收補漏衝刺",
    story: "宣稱完成前先自己跑測試、檢查缺漏、補文件、找風險，把 reviewer 可能挑的點先清掉。",
    tags: ["自我驗收", "補漏", "完成定義"],
    accentHex: "#34d399",
    navLabel: "自我驗收",
  },
  {
    href: "/scenarios/expert/repo-onboarding",
    emoji: "🗺️",
    title: "陌生 Repo 接手模式",
    story: "先讓 ECC 自己摸清架構、入口、風險與開工順序，再開始改動，減少你當人工導覽。",
    tags: ["接手專案", "自我探索", "風險盤點"],
    accentHex: "#7c6aef",
    navLabel: "接手陌生 Repo",
  },
  {
    href: "/scenarios/expert/pr-final-sprint",
    emoji: "🏁",
    title: "PR 前自動衝刺",
    story: "在準備交 PR 前，自動跑 lint、test、build、review、docs 補漏，把最後一公里交給 ECC。",
    tags: ["PR 前", "最終驗收", "自動收尾"],
    accentHex: "#f59e0b",
    navLabel: "PR 前衝刺",
  },
  {
    href: "/scenarios/expert/fail-until-pass",
    emoji: "♻️",
    title: "失敗就重試到過線",
    story: "把 build、測試、型別或 review 失敗都視為迴圈信號，持續修復與再驗證，直到真的過線。",
    tags: ["retry loop", "自動修正", "過線為止"],
    accentHex: "#f472b6",
    navLabel: "重試到過線",
  },
  {
    href: "/scenarios/expert/self-healing",
    emoji: "🔁",
    title: "Agent 自我修復迴圈",
    story: "設定自動化迴圈，Claude 持續跑測試、發現問題、修復、再測試",
    tags: ["AnimatedTerminal", "/loop", "自動修復"],
    accentHex: "#fb923c",
    navLabel: "自我修復",
  },
  {
    href: "/scenarios/expert/prd-pipeline",
    emoji: "⚙️",
    title: "PRD 到上線全自動",
    story: "PM 丟需求文件，ECC 自動跑完規劃、實作、審查、部署整條流水線",
    tags: ["ProgressPipeline", "/prp-plan", "全自動"],
    accentHex: "#7c6aef",
    navLabel: "PRD 流程",
  },
  {
    href: "/scenarios/expert/multi-agent",
    emoji: "🤝",
    title: "多 Agent 即時協作",
    story: "前端、後端、基礎設施三個 Agent 同時出動，即時視覺化進度",
    tags: ["ParallelAgentViz", "/multi-plan", "並行"],
    accentHex: "#60a5fa",
    navLabel: "多 Agent",
  },
  {
    href: "/scenarios/expert/hooks-setup",
    emoji: "🪝",
    title: "Hooks 自動化設定",
    story: "每次寫完程式碼自動格式化、Lint、型別檢查，設定一次長期受益",
    tags: ["PostToolUse", "PreToolUse", "實作教學"],
    accentHex: "#34d399",
    navLabel: "Hooks 設定",
  },
  {
    href: "/scenarios/expert/tdd-mastery",
    emoji: "🧪",
    title: "TDD 完整實戰",
    story: "RED → GREEN → IMPROVE 三階段完整教學，含壞提示 vs 好提示對比",
    tags: ["/tdd", "RED-GREEN-IMPROVE", "實作教學"],
    accentHex: "#f472b6",
    navLabel: "TDD 精通",
  },
  {
    href: "/scenarios/expert/prompt-engineering",
    emoji: "✍️",
    title: "高效 /plan 提示工程",
    story: "寫出讓 Claude 產出可執行計畫的提示詞，含四要素拆解和迭代技巧",
    tags: ["/plan", "提示詞", "實作教學"],
    accentHex: "#7c6aef",
    navLabel: "Prompt 工程",
  },
  {
    href: "/scenarios/expert/full-cycle",
    emoji: "🚀",
    title: "完整功能開發全流程",
    story: "7 步驟端到端：/plan → Hooks → /tdd → /code-review → /security-review → commit",
    tags: ["總結篇", "端到端", "實作教學"],
    accentHex: "#fb923c",
    navLabel: "完整流程",
  },
];

export const expertScenarioNavItems = expertScenarioCards.map((item) => ({
  href: item.href,
  label: item.navLabel,
}));
