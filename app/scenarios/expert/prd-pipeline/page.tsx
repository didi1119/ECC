"use client";
import { useState } from "react";
import Link from "next/link";
import { Settings, Clapperboard, Bot, Clock, Rocket, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import ProgressPipeline, { PipelineStage } from "../../../components/animations/ProgressPipeline";

const stages: PipelineStage[] = [
  { id: "prd", label: "PRD 分析", icon: "📄", duration: 2200, agent: "planner agent" },
  { id: "arch", label: "架構設計", icon: "🏗️", duration: 3000, agent: "architect agent" },
  { id: "tdd", label: "TDD 實作", icon: "🧪", duration: 4500, agent: "tdd-guide agent" },
  { id: "review", label: "Code Review", icon: "🔍", duration: 2000, agent: "code-reviewer agent" },
  { id: "security", label: "安全掃描", icon: "🛡️", duration: 1500, agent: "security-reviewer agent" },
  { id: "deploy", label: "自動部署", icon: "🚀", duration: 2000, agent: "CI/CD pipeline" },
];

export default function PrdPipelinePage() {
  const [key, setKey] = useState(0);
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "var(--text-secondary)" }}>首頁</Link>
            <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
            <span className="text-xs" style={{ color: "var(--accent-rose)" }}>高手情境</span>
            <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
            <span className="text-xs" style={{ color: "var(--accent-brand)" }}>PRD 流水線</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Settings size={36} style={{ color: "var(--accent-brand)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>PRD 到上線全自動</h1>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}
                >
                  高手
                </span>
              </div>
              <p style={{ color: "var(--accent-brand)" }}>PM 丟 PRD，ECC 全自動跑完開發流水線到部署</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(124,106,239,0.06)", border: "1px solid rgba(124,106,239,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-brand)" }}>📖 情境故事</p>
            <p style={{ color: "var(--text-secondary)" }}>
              PM 小美把功能需求文件（PRD）貼給 Claude，用 <code style={{ color: "var(--accent-blue)" }}>/prp-plan</code> 觸發全自動流水線：
              分析需求 → 設計架構 → TDD 實作 → Code Review → 安全掃描 → 自動部署。
              她去開了兩小時的會，回來功能已經在 staging 環境上了。
            </p>
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Clapperboard size={20} style={{ color: "var(--accent-brand)" }} /> 流水線即時進度</h2>
            <button
              onClick={() => { setKey((k: number) => k + 1); setDone(false); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              ↺ 重新播放
            </button>
          </div>

          <ProgressPipeline
            key={key}
            stages={stages}
            autoPlay
            onComplete={() => setDone(true)}
          />

          {done && (
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{ backgroundColor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.3)" }}
            >
              <p className="font-bold text-lg mb-1" style={{ color: "var(--accent-green)" }}>🎉 部署成功！</p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                從 PRD 到上線：6 個階段，全程 0 人工介入
              </p>
            </div>
          )}
        </div>

        {/* What each agent does */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Bot size={20} style={{ color: "var(--accent-blue)" }} /> 各階段使用的 Agent</h2>
          <div className="space-y-2">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
              >
                <span className="text-xl w-8 text-center">{stage.icon}</span>
                <span className="font-semibold text-sm flex-shrink-0 w-32" style={{ color: "var(--text-primary)" }}>{stage.label}</span>
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>→</span>
                <code className="text-sm font-mono" style={{ color: "var(--accent-brand)" }}>{stage.agent}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Time comparison */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Clock size={20} style={{ color: "var(--accent-amber)" }} /> 效率對比</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid rgba(244,114,182,0.2)" }}>
              <p className="text-sm font-bold mb-3" style={{ color: "var(--accent-rose)" }}>❌ 傳統方式</p>
              {[
                { task: "閱讀 PRD + 規劃", time: "2h" },
                { task: "架構設計討論", time: "3h" },
                { task: "TDD 實作", time: "8h" },
                { task: "Code Review", time: "2h" },
                { task: "安全審查", time: "1h" },
                { task: "部署流程", time: "1h" },
              ].map((item) => (
                <div key={item.task} className="flex justify-between text-xs py-1" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span>{item.task}</span>
                  <span style={{ color: "var(--accent-rose)" }}>{item.time}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold mt-2" style={{ color: "var(--text-primary)" }}>
                <span>總計</span>
                <span style={{ color: "var(--accent-rose)" }}>17 小時</span>
              </div>
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <p className="text-sm font-bold mb-3" style={{ color: "var(--accent-green)" }}>✅ ECC 全自動</p>
              {[
                { task: "PRD 分析", time: "5min" },
                { task: "架構設計", time: "8min" },
                { task: "TDD 實作", time: "25min" },
                { task: "Code Review", time: "3min" },
                { task: "安全掃描", time: "2min" },
                { task: "部署", time: "5min" },
              ].map((item) => (
                <div key={item.task} className="flex justify-between text-xs py-1" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span>{item.task}</span>
                  <span style={{ color: "var(--accent-green)" }}>{item.time}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-bold mt-2" style={{ color: "var(--text-primary)" }}>
                <span>總計</span>
                <span style={{ color: "var(--accent-green)" }}>48 分鐘</span>
              </div>
            </div>
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Rocket size={20} style={{ color: "var(--accent-green)" }} /> 試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="/prp-plan 根據以下 PRD 自動規劃並實作..." description="觸發全自動 PRD 流水線" />
            <CommandBlock command="/prp-implement" description="執行已規劃的 PRP 方案" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/expert/self-healing" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>← 自我修復迴圈</Link>
          <Link
            href="/scenarios/expert/multi-agent"
            className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: "var(--accent-rose)", color: "var(--bg-base)" }}
          >
            下一個：多 Agent 協作 →
          </Link>
        </div>
      </div>
    </div>
  );
}
