import Link from "next/link";
import { BookOpenCheck, ChevronRight, Compass, Rocket, Search } from "lucide-react";

import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import PitfallBox from "../../../components/PitfallBox";
import StepFlow from "../../../components/StepFlow";

const onboardingSteps = [
  { number: 1, title: "先找入口", description: "辨認 app 入口、主要資料流、關鍵設定與測試位置" },
  { number: 2, title: "畫出地圖", description: "整理模組分工、依賴關係、最危險的改動點" },
  { number: 3, title: "列出風險", description: "先說清楚哪裡容易踩到 auth、data、deployment" },
  { number: 4, title: "再提開工順序", description: "確認先讀哪些檔、先驗證哪些假設、先動哪一層" },
  { number: 5, title: "最後才開始改", description: "避免你還沒看懂 repo 就進場瞎修" },
];

const onboardingPrompt = `你現在接手一個陌生 repo，先不要急著實作。

請先自己完成這輪 onboarding：
1. 找出主要入口檔、核心模組、重要設定、測試位置
2. 用簡潔方式整理出架構地圖
3. 列出這個 repo 最可能出問題的 3-5 個風險點
4. 告訴我如果要開始改功能，合理的切入順序是什麼

除非遇到缺檔或需求不明，不要中途停下來問我。
你先把 repo 摸清楚，再進入下一步。`;

export default function RepoOnboardingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
          <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
          <span className="text-xs" style={{ color: "var(--accent-brand)" }}>陌生 Repo 接手模式</span>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Compass size={36} style={{ color: "var(--accent-brand)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>陌生 Repo 接手模式</h1>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}>高手</span>
              </div>
              <p style={{ color: "var(--accent-brand)" }}>先讓 ECC 自己畫地圖，再開始工作，不要你親自帶路</p>
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(124,106,239,0.08)", border: "1px solid rgba(124,106,239,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-brand)" }}>這頁解的痛點</p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              很多 agent 一進陌生專案就開始亂改，真正缺的是先理解 repo。這個模式是先把探索、架構盤點、風險辨識交給 ECC 自己做完。
            </p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <BookOpenCheck size={20} style={{ color: "var(--accent-blue)" }} /> 接手流程
          </h2>
          <StepFlow steps={onboardingSteps} />
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>接手陌生 Repo Prompt</h2>
          <CommandBlock command={onboardingPrompt} description="很適合新 repo、舊專案、別人交接下來的 codebase" />
        </div>

        <div className="mb-10">
          <PitfallBox type="warning" title="不要一開始就叫它『直接修』">
            對陌生 repo 直接進實作，通常會花更多時間在後面返工。先讓 ECC 產出地圖與風險，再開始改，反而更快。
          </PitfallBox>
        </div>

        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Search size={20} style={{ color: "var(--accent-green)" }} /> 最值得它先找的東西
          </h2>
          <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <p>1. 真正的入口頁面與主要路由。</p>
            <p>2. 設定檔、環境變數、build 指令。</p>
            <p>3. 關鍵資料模型或 API 邊界。</p>
            <p>4. 測試在哪裡、目前 coverage 大概怎樣。</p>
            <p>5. 哪些地方一改就可能牽連很多模組。</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Rocket size={20} style={{ color: "var(--accent-orange)" }} /> 進一步搭配
          </h2>
          <div className="space-y-3">
            <CommandBlock command="接手完 repo 後，下一步請進入不中斷交付模式，自己接管後續流程" description="從摸清專案直接接到執行" />
          </div>
        </div>
      </div>
    </div>
  );
}
