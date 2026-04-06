"use client";
import { useState } from "react";
import Link from "next/link";
import { Users, Clapperboard, Settings, Rocket, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import ParallelAgentViz, { AgentTask } from "../../../components/animations/ParallelAgentViz";

const agents: AgentTask[] = [
  {
    id: "frontend",
    name: "前端 Agent",
    emoji: "🎨",
    color: "var(--accent-blue)",
    duration: 6000,
    tasks: ["分析 React 元件", "重構 UI 層", "更新 Storybook", "跑 E2E 測試"],
  },
  {
    id: "backend",
    name: "後端 Agent",
    emoji: "⚙️",
    color: "var(--accent-brand)",
    duration: 8000,
    tasks: ["重寫 API 端點", "更新資料庫 Schema", "撰寫整合測試", "更新 API 文件"],
  },
  {
    id: "infra",
    name: "基礎設施 Agent",
    emoji: "🏗️",
    color: "var(--accent-orange)",
    duration: 4500,
    tasks: ["更新 Docker 配置", "調整 CI/CD 流程", "設定監控告警"],
  },
];

export default function MultiAgentPage() {
  const [key, setKey] = useState(0);

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
            <span className="text-xs" style={{ color: "var(--accent-blue)" }}>多 Agent 協作</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Users size={36} style={{ color: "var(--accent-blue)" }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>多 Agent 即時協作</h1>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: "rgba(244,114,182,0.15)", color: "var(--accent-rose)", border: "1px solid rgba(244,114,182,0.3)" }}
                >
                  高手
                </span>
              </div>
              <p style={{ color: "var(--accent-blue)" }}>前端、後端、基礎設施三個 Agent 同時出動，互不等待</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-blue)" }}>📖 情境故事</p>
            <p style={{ color: "var(--text-secondary)" }}>
              技術主管阿強要在這週完成整個電商平台的重構。
              他用 <code style={{ color: "var(--accent-blue)" }}>/multi-plan</code> 啟動三個並行 Agent：
              前端 Agent 重構 React 元件、後端 Agent 重寫 API、基礎設施 Agent 更新部署配置。
              三個 Agent 同時跑，互不阻塞，原本需要 18 小時的工作，8 小時完成。
            </p>
          </div>
        </div>

        {/* Time saving highlight */}
        <div className="mb-10">
          <div
            className="rounded-xl p-5 flex items-center gap-6"
            style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="text-center flex-1">
              <div className="text-4xl font-bold mb-1" style={{ color: "var(--accent-rose)" }}>18h</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>串行執行</div>
            </div>
            <div style={{ color: "var(--border-subtle)", fontSize: "2rem" }}>→</div>
            <div className="text-center flex-1">
              <div className="text-4xl font-bold mb-1" style={{ color: "var(--accent-green)" }}>8h</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>並行執行</div>
            </div>
            <div style={{ color: "var(--border-subtle)", fontSize: "2rem" }}>＝</div>
            <div className="text-center flex-1">
              <div className="text-4xl font-bold mb-1" style={{ color: "var(--accent-orange)" }}>55%</div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>節省時間</div>
            </div>
          </div>
        </div>

        {/* Live visualization */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Clapperboard size={20} style={{ color: "var(--accent-brand)" }} /> 多 Agent 即時協作視覺化</h2>
            <button
              onClick={() => setKey((k: number) => k + 1)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: "var(--bg-surface-1)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
            >
              ↺ 重新播放
            </button>
          </div>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            觀察三個 Agent 如何同時執行各自的任務，互不等待
          </p>

          <ParallelAgentViz key={key} agents={agents} autoPlay />
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Settings size={20} style={{ color: "var(--accent-orange)" }} /> 運作原理</h2>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "/multi-plan 分析任務",
                desc: "Claude 自動分析任務依賴關係，找出哪些子任務可以並行",
                color: "var(--accent-blue)",
              },
              {
                step: "2",
                title: "啟動多個 worktree",
                desc: "每個 Agent 在獨立的 git worktree 中工作，互不干擾",
                color: "var(--accent-brand)",
              },
              {
                step: "3",
                title: "並行執行",
                desc: "Agent 們同時進行，各自負責自己的領域",
                color: "var(--accent-orange)",
              },
              {
                step: "4",
                title: "整合與 Code Review",
                desc: "所有 Agent 完成後，自動整合並執行整體 code review",
                color: "var(--accent-green)",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: "var(--bg-surface-1)", border: `1px solid ${item.color}25` }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20`, color: item.color, border: `2px solid ${item.color}40` }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: "var(--text-primary)" }}><Rocket size={20} style={{ color: "var(--accent-green)" }} /> 試試看</h2>
          <div className="space-y-3">
            <CommandBlock command="/multi-plan 重構整個電商平台的前後端" description="啟動多 Agent 並行計劃" />
            <CommandBlock command="/multi-execute 前端測試 後端測試 e2e測試" description="同時執行多個獨立任務" />
            <CommandBlock command="/devfleet 部署完整開發艦隊" description="最高階：全自動多 Agent 艦隊" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <Link href="/scenarios/expert/prd-pipeline" className="text-sm hover:underline" style={{ color: "var(--text-secondary)" }}>← PRD 流水線</Link>
          <Link
            href="/scenarios/expert/hooks-setup"
            className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: "var(--accent-green)", color: "var(--bg-base)" }}
          >
            下一個：Hooks 設定 →
          </Link>
        </div>
      </div>
    </div>
  );
}
