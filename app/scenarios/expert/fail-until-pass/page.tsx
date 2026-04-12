import Link from "next/link";
import { ChevronRight, RefreshCcw, Rocket, ShieldAlert, TestTube2 } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const retrySteps = [
  { number: 1, title: "定義信號", description: "哪些失敗算要進下一輪：test、build、type-check、review" },
  { number: 2, title: "每輪只做一件事", description: "先定位原因，再最小修復，不要同時亂改多件事" },
  { number: 3, title: "修完立刻再驗證", description: "每輪都要重新跑出失敗信號對應的驗證" },
  { number: 4, title: "設定上限與停止條件", description: "避免無限重試，也避免失控修改" },
  { number: 5, title: "過線才結案", description: "不只『看起來好了』，要真的通過目標驗證" },
];

const retryPrompt = `請進入 fail-until-pass 模式：

規則：
1. 目標是讓這個任務通過指定驗證，不要提早宣布完成
2. 把 test/build/type-check/code-review 的失敗都視為下一輪修復信號
3. 每輪流程：讀取失敗 → 找最可能原因 → 做最小修復 → 重新驗證
4. 最多迭代 5 輪；若仍失敗，再總結卡點與已嘗試方案
5. 除非遇到高風險操作，否則不要中途停下來問我

請持續跑到真的過線，或明確證明被阻塞為止。`;

export default function FailUntilPassPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>失敗就重試到過線</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCcw size={36} style={{ color: "var(--accent-rose)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>失敗就重試到過線</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-rose)" }}>不要只修一次就停，讓 ECC 把失敗當訊號一路迭代到真的過線</p>
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(244,114,182,0.08)", border: "1px solid rgba(244,114,182,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-rose)" }}>這招最像自動駕駛修錯</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              你不是要它「修一個錯」，而是要它「過線為止」。把終點換成明確驗證，模型就比較不會修一點點就回來邀功。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <TestTube2 size={20} style={{ color: "var(--accent-blue)" }} /> 迭代規則
          </h2>
          <StepFlow steps={retrySteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>可直接套用的 Retry Prompt</h2>
          <CommandBlock command={retryPrompt} description="適合 build 爆、test 紅、type-check 壞、review 還沒過的情境" />
        </div>

        <div className="mb-10">
          <PitfallBox type="warning" title="一定要設最大迭代輪數">
            沒有輪數上限時，模型可能會一直做低價值微調。給它 3 到 5 輪通常最實用，超過就該改成輸出卡點與假設。
          </PitfallBox>
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <ShieldAlert size={20} style={{ color: "var(--accent-orange)" }} /> 什麼時候該停止而不是硬修
          </h2>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 發現需求本身矛盾。</p>
            <p>2. 必須做破壞性操作才有可能繼續。</p>
            <p>3. 失敗根因不在目前工作區，而在外部服務或缺失的環境資源。</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Rocket size={20} style={{ color: "var(--accent-green)" }} /> 最好一起加上的要求
          </h2>
          <div className="space-y-3">
            <CommandBlock command="每一輪都要說明『讀到的失敗信號』和『為什麼選這個修法』，避免盲修" description="讓迭代更可追蹤" />
          </div>
        </div>
      </div>
    </div>
  );
}
