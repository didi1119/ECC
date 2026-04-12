import Link from "next/link";
import { ChevronRight, Milestone, Plane, Rocket, TriangleAlert } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const autopilotSteps = [
  { number: 1, title: "先宣告完整流程", description: "規劃、實作、測試、review、驗證，各階段先講清楚" },
  { number: 2, title: "限定中止條件", description: "只有需求衝突、資料風險、破壞性操作才准停下" },
  { number: 3, title: "要求主動推進", description: "每完成一關就直接進下一關，不要等人發命令" },
  { number: 4, title: "要求最後才總結", description: "不要每做一小步就報告，只在關鍵節點同步" },
  { number: 5, title: "交付 Done 狀態", description: "最後交付結果、驗證證據、風險與後續建議" },
];

const autopilotPrompt = `請用不中斷交付模式處理這個任務：

工作原則：
- 你要自己接管流程，從規劃一路推進到驗證，不要每個小步驟都停下來問我
- 預設流程：理解需求 → 規劃 → 實作 → 測試/驗證 → 自我 review → 整理結果
- 每完成一階段後，直接進下一階段

只有以下情況才可以中止並問我：
1. 需求本身互相衝突
2. 存在破壞性操作風險（刪資料、重設、覆蓋大量內容）
3. 有兩條成本差很多的方案，需要我選

除此之外請持續推進，直到真的完成。
最後再給我：
- 完成了什麼
- 怎麼驗證
- 還有哪些風險或可再加強的地方`;

export default function AutopilotDeliveryPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-blue)" }}>不中斷交付模式</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Plane size={36} style={{ color: "var(--accent-blue)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>不中斷交付模式</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-blue)" }}>讓 ECC 自己知道下一步，不要做到一半一直把流程丟回你</p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-blue)" }}>核心觀念</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              很多中斷不是因為模型不會做，而是它不知道你允許它推進到哪。把流程和停損條件明講，它就比較能自己一路做到收尾。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Milestone size={20} style={{ color: "var(--accent-orange)" }} /> 流程接管模板
          </h2>
          <StepFlow steps={autopilotSteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>可直接貼上的 Prompt</h2>
          <CommandBlock command={autopilotPrompt} description="適合你已經很清楚要『把事情做完』，不想一直擔任流程導演的情境" />
        </div>

        <div className="mb-10">
          <PitfallBox type="gotcha" title="不要把『請多回報進度』和『不要打斷我』同時寫進去">
            這兩個指令互相衝突。比較好的做法是要求「只在關鍵節點同步」，例如規劃完成、實作完成、驗證完成三次就夠了。
          </PitfallBox>
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <TriangleAlert size={20} style={{ color: "var(--accent-rose)" }} /> 最重要的中止條件
          </h2>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 會刪資料、覆蓋大範圍內容、改變 git 歷史的操作。</p>
            <p>2. 要在兩條代價差很大的方案中選一條。</p>
            <p>3. 發現原需求本身不一致，繼續做只會越做越偏。</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Rocket size={20} style={{ color: "var(--accent-green)" }} /> 常見變體
          </h2>
          <div className="space-y-3">
            <CommandBlock command="把『最後再總結』改成『每完成一個 major phase 才同步一次』" description="適合長任務，但又不想完全黑盒" />
            <CommandBlock command="除了高風險決策外，一律不要問我要不要繼續，請預設繼續直到 Done" description="最強硬的自動推進版本" />
          </div>
        </div>
      </div>
    </div>
  );
}
