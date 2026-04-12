import Link from "next/link";
import { ChevronRight, Gauge, MessagesSquare, ShieldCheck, Rocket } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import ChatDemo from "../../../components/ChatDemo";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const reviewLoopSteps = [
  { number: 1, title: "指定雙角色", description: "一個 Agent 只負責實作，一個 Agent 只負責評審" },
  { number: 2, title: "定義評分表", description: "功能完整度、測試、可讀性、風險，各自有分數" },
  { number: 3, title: "設定門檻", description: "總分未達 8/10 不得宣布完成" },
  { number: 4, title: "自動退件", description: "reviewer 指出缺口後，developer 直接修正再送審" },
  { number: 5, title: "過線才結案", description: "達標後再整理最終摘要與剩餘風險" },
];

const loopPrompt = `請用雙 Agent 模式完成這個功能：

- Agent A = developer，只負責實作
- Agent B = reviewer，只負責審查與打分

流程規則：
1. developer 完成一輪後，reviewer 依下列 rubric 打分：
   - 功能完整度 0-10
   - 測試與驗證 0-10
   - 可讀性與結構 0-10
   - 風險控制 0-10
2. reviewer 要給出總評與明確缺失
3. 只要任一項低於 8 分，就退回 developer 修正
4. developer 修正後再次送 reviewer
5. 直到所有項目都 >= 8 分才可結束
6. 除非遇到架構方向或需求衝突，不要中途停下來問我`;

const reviewMessages = [
  {
    role: "user" as const,
    content: loopPrompt,
  },
  {
    role: "claude" as const,
    content: `Reviewer 回合 1：

- 功能完整度：8/10
- 測試與驗證：6/10
- 可讀性與結構：7/10
- 風險控制：8/10

未達標，退回修正。

缺失：
1. 缺少失敗情境測試
2. loading / error state 沒驗證
3. 核心函式過長，建議拆分

Developer 進入下一輪修正，不中斷等待。`,
  },
  {
    role: "claude" as const,
    content: `Reviewer 回合 2：

- 功能完整度：9/10
- 測試與驗證：8/10
- 可讀性與結構：8/10
- 風險控制：8/10

✅ 達標，可結案。
最終輸出：變更摘要、測試結果、殘餘風險、可 follow-up 項目。`,
  },
];

export default function ReviewerLoopPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-orange)" }}>雙 Agent 評審迴圈</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={36} style={{ color: "var(--accent-orange)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>雙 Agent 評審迴圈</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-orange)" }}>把「做」和「審」拆成兩個角色，讓品質門檻自己執行</p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-orange)" }}>為什麼這招實用</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              你不用再自己扮演 PM、tech lead、reviewer 三種角色。先把評分規則講清楚，ECC 就能自己迴圈修正，而不是半成品就來問你下一步。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Gauge size={20} style={{ color: "var(--accent-blue)" }} /> 評審迴圈流程
          </h2>
          <StepFlow steps={reviewLoopSteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>可直接套用的工作流 Prompt</h2>
          <CommandBlock command={loopPrompt} description="把 reviewer 變成真正的品質門神，而不是禮貌型附和 reviewer" />
          <div className="mt-4">
            <PitfallBox type="warning" title="不要只寫『幫我 review』">
              如果沒有門檻、沒有 rubric、沒有退件條件，reviewer 很容易只給模糊建議，最後還是要你自己判斷到底能不能收工。
            </PitfallBox>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <MessagesSquare size={20} style={{ color: "var(--accent-brand)" }} /> 迴圈示範
          </h2>
          <ChatDemo messages={reviewMessages} title="情境示範 — reviewer 退件直到過線" />
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-green)" }}>最適合用在</p>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 功能要快速做完，但你又不想自己扛最後品質把關。</p>
            <p>2. 多輪修正容易失焦，需要 reviewer 持續抓同一套標準。</p>
            <p>3. 你想把「做到哪裡算完成」變成明確規則，而不是感覺。</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Rocket size={20} style={{ color: "var(--accent-green)" }} /> 快速改寫模板
          </h2>
          <div className="space-y-3">
            <CommandBlock command="把 reviewer 的評分表改成『功能、測試、效能、安全、DX』五項，全部 >= 8 才能結案" description="換成你自己的品質 rubric" />
            <CommandBlock command="reviewer 每輪都要列出『本輪新增發現』與『仍未解決項目』，避免來回鬼打牆" description="減少重複退件與失焦" />
          </div>
        </div>
      </div>
    </div>
  );
}
