import Link from "next/link";
import { ChevronRight, ClipboardCheck, SearchCheck, Sparkles, Wrench } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const qaSteps = [
  { number: 1, title: "列出完成定義", description: "功能、測試、review、文件、風險都要有明確標準" },
  { number: 2, title: "自己先找缺口", description: "主動檢查沒測到的 case、沒跑的驗證、沒更新的文件" },
  { number: 3, title: "補完再驗證", description: "把缺口補齊後重新跑 lint / test / build / review" },
  { number: 4, title: "整理殘餘風險", description: "誠實列出還沒做與為什麼先不做" },
  { number: 5, title: "最後才宣稱完成", description: "避免半成品過早結案" },
];

const qaPrompt = `在你宣稱完成之前，先執行一輪自我驗收補漏：

請自己檢查：
1. 功能需求是否全部覆蓋
2. 有沒有少掉的 edge case 或錯誤處理
3. 有沒有沒跑的 lint / test / build / type-check
4. 有沒有 reviewer 很可能會挑的結構或命名問題
5. 有沒有需要一起更新的文件、註解或使用說明

如果發現缺口，不要先回報我，先直接補上再重新驗證。
只有在你完成補漏後，再給我最終結果：
- 你主動補了哪些東西
- 驗證結果
- 剩餘風險
- 後續可優化項目`;

export default function SelfQaSprintPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-green)" }}>自我驗收補漏衝刺</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck size={36} style={{ color: "var(--accent-green)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>自我驗收補漏衝刺</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-green)" }}>讓 ECC 在結案前先自己挑毛病、自己補洞、自己再驗證一次</p>
            </div>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-green)" }}>你真正想要的不是『完成』，而是『可交付』</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              很多任務卡在最後 10%，不是因為主功能沒做好，而是缺驗證、缺文件、缺邊界條件。這一招是把那 10% 變成自動收尾流程。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <SearchCheck size={20} style={{ color: "var(--accent-blue)" }} /> 補漏衝刺流程
          </h2>
          <StepFlow steps={qaSteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>補漏 Prompt 模板</h2>
          <CommandBlock command={qaPrompt} description="適合功能已經大致完成，但你不想自己一項項追問『有沒有測試？有沒有文件？』" />
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Wrench size={20} style={{ color: "var(--accent-orange)" }} /> 最常見的自動補漏項目
          </h2>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 補 loading、empty、error state。</p>
            <p>2. 補失敗路徑與 edge case 測試。</p>
            <p>3. 補 README、使用方式或 migration 說明。</p>
            <p>4. 補 lint、type-check、build 驗證。</p>
            <p>5. 補 reviewer 一眼就會看到的命名、拆分、風險註記。</p>
          </div>
        </div>

        <div className="mb-10">
          <PitfallBox type="tip" title="要求它列出『主動補了哪些東西』">
            這一行很有用。因為它會迫使 ECC 不只是說「我檢查過了」，而是真的把補漏動作具體化，讓你一眼看出它有沒有認真做收尾。
          </PitfallBox>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Sparkles size={20} style={{ color: "var(--accent-brand)" }} /> 進一步搭配
          </h2>
          <div className="space-y-3">
            <CommandBlock command="把這輪自我驗收結果交給 reviewer 再打一次分，低於 8 分就繼續補漏" description="和雙 Agent 評審迴圈疊加" />
            <CommandBlock command="完成前必須通過 lint、test、build，否則不准宣稱完成" description="把完成定義變成硬門檻" />
          </div>
        </div>
      </div>
    </div>
  );
}
