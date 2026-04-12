import Link from "next/link";
import { ChevronRight, ClipboardList, FileCheck2, Rocket, Shield } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const sprintSteps = [
  { number: 1, title: "先跑硬驗證", description: "lint、type-check、test、build 先過" },
  { number: 2, title: "再跑軟驗證", description: "code review、安全風險、命名與結構補漏" },
  { number: 3, title: "補文件與說明", description: "README、變更說明、migration note 一起補齊" },
  { number: 4, title: "列殘餘風險", description: "誠實寫出還沒涵蓋的邊界與 follow-up" },
  { number: 5, title: "最後整理 PR 摘要", description: "直接產出可貼上的變更摘要與驗證結果" },
];

const sprintPrompt = `請幫我做一輪 PR 前自動衝刺，不要只說功能已完成。

請你自己完成：
1. 跑 lint / type-check / test / build
2. 再做一輪 code review 與安全性自查
3. 發現缺漏就直接補上
4. 補 README、使用說明或變更摘要（若有需要）
5. 最後給我一份可直接放進 PR 的摘要

如果任何一關失敗，先修好再繼續，不要中途停下來等我指示。`;

export default function PrFinalSprintPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-orange)" }}>PR 前自動衝刺</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck2 size={36} style={{ color: "var(--accent-orange)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>PR 前自動衝刺</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-orange)" }}>讓 ECC 把 PR 前最後一公里自己跑完，不用你手動補 checklist</p>
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-orange)" }}>為什麼實用</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              很多任務其實主功能已經做好，但 PR 還不能送。真正卡住的是測試、文件、review、摘要這些收尾工。這個模式就是把收尾工自動化。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <ClipboardList size={20} style={{ color: "var(--accent-blue)" }} /> 衝刺順序
          </h2>
          <StepFlow steps={sprintSteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>PR 前衝刺 Prompt</h2>
          <CommandBlock command={sprintPrompt} description="適合你已經快完成，但不想再自己扮演 checklist 機器人的時候" />
        </div>

        <div className="mb-10">
          <PitfallBox type="gotcha" title="不要只要求『幫我整理 PR 描述』">
            如果前面的驗證沒跑，它只會幫你寫出一份漂亮但不可靠的 PR 摘要。先把 lint、test、build、review 收進同一輪衝刺才有意義。
          </PitfallBox>
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Shield size={20} style={{ color: "var(--accent-green)" }} /> 最後輸出最好包含
          </h2>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 變更摘要。</p>
            <p>2. 驗證結果與具體指令。</p>
            <p>3. 主動補上的缺口。</p>
            <p>4. 剩餘風險與 follow-up。</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Rocket size={20} style={{ color: "var(--accent-green)" }} /> 搭配建議
          </h2>
          <div className="space-y-3">
            <CommandBlock command="PR 前自動衝刺完成後，再交給 reviewer 打分；低於 8 分就再跑一輪補漏" description="和評審迴圈直接串起來" />
          </div>
        </div>
      </div>
    </div>
  );
}
