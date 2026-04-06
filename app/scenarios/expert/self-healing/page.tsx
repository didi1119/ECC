"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import CommandBlock from "../../../components/CommandBlock";
import AnimatedTerminal, { TerminalLine } from "../../../components/animations/AnimatedTerminal";

const round1Lines: TerminalLine[] = [
  { type: "input", text: "/loop 自動修復直到測試全過", delay: 400 },
  { type: "info", text: "啟動自我修復迴圈...", delay: 500 },
  { type: "output", text: "▶ 執行測試套件", delay: 600 },
  { type: "error", text: "FAIL: cart.test.ts — addItem 應累加數量 (預期 2，實際 1)", delay: 800 },
  { type: "info", text: "偵測到失敗 → 啟動 build-error-resolver agent", delay: 600 },
  { type: "output", text: "分析錯誤原因...", delay: 700 },
  { type: "success", text: "找到問題：cart.ts:18 缺少 quantity 累加邏輯", delay: 500 },
  { type: "info", text: "套用修復...", delay: 400 },
];

const round2Lines: TerminalLine[] = [
  { type: "info", text: "第 2 輪 — 重新執行測試", delay: 300 },
  { type: "output", text: "▶ 執行測試套件", delay: 500 },
  { type: "error", text: "FAIL: cart.test.ts — removeItem 應更新總價", delay: 700 },
  { type: "info", text: "再次偵測到失敗 → 修復中", delay: 500 },
  { type: "success", text: "找到問題：calculateTotal() 未重算移除後的小計", delay: 600 },
  { type: "info", text: "套用修復...", delay: 400 },
];

const round3Lines: TerminalLine[] = [
  { type: "info", text: "第 3 輪 — 重新執行測試", delay: 300 },
  { type: "output", text: "▶ 執行測試套件", delay: 500 },
  { type: "success", text: "PASS: cart.test.ts (8/8 通過)", delay: 600 },
  { type: "success", text: "PASS: checkout.test.ts (5/5 通過)", delay: 400 },
  { type: "success", text: "PASS: payment.test.ts (6/6 通過)", delay: 400 },
  { type: "success", text: "✅ 所有測試通過！共修復 2 個問題，歷時 3 輪迭代", delay: 700 },
];

export default function SelfHealingPage() {
  const [round, setRound] = useState<1 | 2 | 3>(1);

  const linesMap = { 1: round1Lines, 2: round2Lines, 3: round3Lines };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d1117" }}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: "#8b949e" }}>首頁</Link>
            <span style={{ color: "#6e7681" }}>/</span>
            <span className="text-xs" style={{ color: "#f85149" }}>高手情境</span>
            <span style={{ color: "#6e7681" }}>/</span>
            <span className="text-xs" style={{ color: "#ffa657" }}>自我修復迴圈</span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔁</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "#e6edf3" }}>Agent 自我修復迴圈</h1>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: "rgba(248,81,73,0.15)", color: "#f85149", border: "1px solid rgba(248,81,73,0.3)" }}
                >
                  高手
                </span>
              </div>
              <p style={{ color: "#ffa657" }}>讓 Claude 自動跑測試、發現問題、修復、再測試</p>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: "rgba(255,166,87,0.06)", border: "1px solid rgba(255,166,87,0.2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "#ffa657" }}>📖 情境故事</p>
            <p style={{ color: "#8b949e" }}>
              阿強在開發購物車功能，他設定了自我修復迴圈：Claude 自動執行測試 →
              遇到失敗自動分析原因 → 自動修復 → 再測試。
              他去泡咖啡回來，發現 3 個 bug 都被修好了，測試全部通過 ✅
            </p>
          </div>
        </div>

        {/* Concept */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🔄 自我修復迴圈原理</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { step: "執行測試", color: "#58a6ff", icon: "▶" },
              { step: "→", color: "#6e7681", icon: "" },
              { step: "偵測失敗", color: "#f85149", icon: "✗" },
              { step: "→", color: "#6e7681", icon: "" },
              { step: "分析原因", color: "#bc8cff", icon: "🔍" },
              { step: "→", color: "#6e7681", icon: "" },
              { step: "自動修復", color: "#ffa657", icon: "🔧" },
              { step: "→", color: "#6e7681", icon: "" },
              { step: "全部通過", color: "#3fb950", icon: "✓" },
            ].map((item, i) =>
              item.icon === "" ? (
                <span key={i} style={{ color: item.color }} className="font-bold">→</span>
              ) : (
                <span
                  key={i}
                  className="text-sm px-3 py-1.5 rounded-lg font-medium"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.icon} {item.step}
                </span>
              )
            )}
          </div>
        </div>

        {/* Animated Demo */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-2" style={{ color: "#e6edf3" }}>🎬 即時動畫示範</h2>
          <p className="text-sm mb-4" style={{ color: "#8b949e" }}>點擊切換迴圈輪次，看 Agent 如何一步步修復問題</p>

          {/* Round selector */}
          <div className="flex gap-2 mb-4">
            {([1, 2, 3] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRound(r)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: round === r ? (r === 3 ? "rgba(63,185,80,0.15)" : "rgba(88,166,255,0.15)") : "#161b22",
                  color: round === r ? (r === 3 ? "#3fb950" : "#58a6ff") : "#8b949e",
                  border: `1px solid ${round === r ? (r === 3 ? "rgba(63,185,80,0.3)" : "rgba(88,166,255,0.3)") : "#30363d"}`,
                }}
              >
                {r === 3 ? "✅" : r === round ? "🔴" : "○"} 第 {r} 輪
              </button>
            ))}
          </div>

          <AnimatedTerminal
            key={round}
            lines={linesMap[round]}
            title={`自我修復迴圈 — 第 ${round} 輪`}
          />
        </div>

        {/* Stats */}
        <div className="mb-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "發現 Bug", value: "2", color: "#f85149" },
              { label: "自動修復", value: "2", color: "#ffa657" },
              { label: "迭代輪次", value: "3", color: "#3fb950" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: "#161b22", border: `1px solid ${stat.color}25` }}
              >
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs" style={{ color: "#8b949e" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it actually works */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>⚙️ 三種實作方式</h2>
          <div className="space-y-4">
            {/* Method 1 */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(88,166,255,0.15)", color: "#58a6ff" }}>方法 1</span>
                <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>最簡單 — /loop 命令</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#8b949e" }}>每隔指定時間跑一次測試，失敗就自動修復</p>
              <CommandBlock command="/loop 5m npx vitest run" description="每 5 分鐘自動執行測試" />
            </div>

            {/* Method 2 */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,166,87,0.15)", color: "#ffa657" }}>方法 2</span>
                <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>加條件 — 失敗才觸發修復</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#8b949e" }}>讓 Claude 判斷失敗原因，呼叫對應 agent 修復</p>
              <CommandBlock command="/loop 執行 npx vitest run，失敗就用 build-error-resolver 修復，直到全部通過" description="有條件的自我修復迴圈" />
            </div>

            {/* Method 3 */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#161b22", border: "1px solid #30363d" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(63,185,80,0.15)", color: "#3fb950" }}>方法 3</span>
                <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>完整控制 — 自然語言描述迴圈</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#8b949e" }}>直接在對話框描述整個自動化流程（最彈性）</p>
              <div className="rounded-lg p-3 text-xs font-mono" style={{ backgroundColor: "#0d1117", color: "#8b949e", border: "1px solid #30363d", lineHeight: "1.8" }}>
                <span style={{ color: "#3fb950" }}>你：</span>{" "}
                <span style={{ color: "#e6edf3" }}>
                  請建立自我修復迴圈：跑測試 → 失敗就分析修復 → 重複最多 5 輪 → 回報結果
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="mb-10 rounded-xl p-5" style={{ backgroundColor: "rgba(63,185,80,0.06)", border: "1px solid rgba(63,185,80,0.2)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "#3fb950" }}>💡 核心原理</p>
          <p className="text-sm" style={{ color: "#8b949e" }}>
            Claude 把測試輸出當作「外部感測器」，失敗訊息就是信號。
            它會讀取錯誤 → 定位問題 → 最小改動修復 → 重新驗證。
            這個能力來自 <span style={{ color: "#e6edf3" }}>build-error-resolver</span> agent 與 <span style={{ color: "#e6edf3" }}>/loop</span> skill 的組合。
          </p>
        </div>

        {/* Try it */}
        <div className="mb-10">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#e6edf3" }}>🚀 立即試試</h2>
          <div className="space-y-3">
            <CommandBlock command="/loop 執行 npx vitest run，失敗就自動修復直到全過" description="最推薦：有條件自我修復迴圈" />
            <CommandBlock command="/tdd" description="先寫測試再讓 Claude 修復實作" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6" style={{ borderTop: "1px solid #30363d" }}>
          <Link href="/scenarios/advanced" className="text-sm hover:underline" style={{ color: "#8b949e" }}>← 進階編排</Link>
          <Link
            href="/scenarios/expert/prd-pipeline"
            className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            style={{ backgroundColor: "#bc8cff", color: "#0d1117" }}
          >
            下一個：PRD 流水線 →
          </Link>
        </div>
      </div>
    </div>
  );
}
