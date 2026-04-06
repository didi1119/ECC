"use client";
import { useEffect, useState, useRef } from "react";

export interface AgentTask {
  id: string;
  name: string;
  emoji: string;
  color: string;
  tasks: string[];
  duration: number; // ms total
}

interface ParallelAgentVizProps {
  agents: AgentTask[];
  autoPlay?: boolean;
}

type AgentStatus = "idle" | "running" | "done";

export default function ParallelAgentViz({ agents, autoPlay = true }: ParallelAgentVizProps) {
  const [statuses, setStatuses] = useState<AgentStatus[]>(agents.map(() => "idle"));
  const [progresses, setProgresses] = useState<number[]>(agents.map(() => 0));
  const [currentTasks, setCurrentTasks] = useState<number[]>(agents.map(() => 0));
  const [allDone, setAllDone] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setStatuses(agents.map(() => "idle"));
    setProgresses(agents.map(() => 0));
    setCurrentTasks(agents.map(() => 0));
    setAllDone(false);

    // Launch all agents simultaneously after a short stagger
    agents.forEach((agent, idx) => {
      const startDelay = idx * 200;

      const startT = setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[idx] = "running";
          return next;
        });

        // Cycle through tasks
        agent.tasks.forEach((_, tIdx) => {
          const taskT = setTimeout(() => {
            setCurrentTasks((prev) => {
              const next = [...prev];
              next[idx] = tIdx;
              return next;
            });
          }, (agent.duration / agent.tasks.length) * tIdx);
          timersRef.current.push(taskT);
        });

        // Animate progress
        const steps = 30;
        for (let s = 1; s <= steps; s++) {
          const pt = setTimeout(
            () =>
              setProgresses((prev) => {
                const next = [...prev];
                next[idx] = Math.round((s / steps) * 100);
                return next;
              }),
            (agent.duration / steps) * s,
          );
          timersRef.current.push(pt);
        }
      }, startDelay);
      timersRef.current.push(startT);

      // Complete agent — single status update, no side effects inside updater
      const doneT = setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[idx] = "done";
          return next;
        });
        setProgresses((prev) => {
          const next = [...prev];
          next[idx] = 100;
          return next;
        });
      }, startDelay + agent.duration);
      timersRef.current.push(doneT);
    });

    return () => timersRef.current.forEach(clearTimeout);
  }, [agents, autoPlay]);

  // Single source of truth: detect all done via useEffect (not inside updater)
  useEffect(() => {
    if (statuses.length > 0 && statuses.every((s) => s === "done")) {
      setAllDone(true);
    }
  }, [statuses]);

  return (
    <div className="space-y-3">
      {/* Agents grid */}
      <div className="grid grid-cols-1 gap-3">
        {agents.map((agent, idx) => {
          const status = statuses[idx];
          const progress = progresses[idx];
          const taskIdx = currentTasks[idx];
          return (
            <div
              key={agent.id}
              role="status"
              aria-label={`${agent.name}：${status === "done" ? "完成" : status === "running" ? "執行中" : "等待中"}`}
              aria-live="polite"
              className="rounded-xl p-4"
              style={{
                backgroundColor:
                  status === "done"
                    ? `${agent.color}08`
                    : status === "running"
                    ? `${agent.color}06`
                    : "#161b22",
                border: `1px solid ${
                  status === "done"
                    ? `${agent.color}40`
                    : status === "running"
                    ? `${agent.color}30`
                    : "#30363d"
                }`,
                transition: "all 0.4s ease",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${agent.color}15`,
                    border: `2px solid ${status === "idle" ? "#30363d" : agent.color}`,
                    transition: "border-color 0.3s",
                  }}
                >
                  {agent.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm truncate" style={{ color: "#e6edf3" }}>
                      {agent.name}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          status === "done"
                            ? "rgba(63,185,80,0.15)"
                            : status === "running"
                            ? `${agent.color}15`
                            : "rgba(255,255,255,0.05)",
                        color:
                          status === "done" ? "#3fb950" : status === "running" ? agent.color : "#6e7681",
                      }}
                    >
                      {status === "done" ? "✓ 完成" : status === "running" ? "執行中..." : "等待"}
                    </span>
                  </div>
                  {status === "running" && agent.tasks[taskIdx] && (
                    <p className="text-xs mt-0.5 truncate" style={{ color: "#8b949e" }}>
                      {agent.tasks[taskIdx]}
                    </p>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#21262d" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: status === "done" ? "#3fb950" : agent.color,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>

              {/* Sub-tasks */}
              {status !== "idle" && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agent.tasks.map((task, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor:
                          status === "done" || taskIdx > tIdx
                            ? "rgba(63,185,80,0.1)"
                            : taskIdx === tIdx
                            ? `${agent.color}15`
                            : "rgba(255,255,255,0.03)",
                        color:
                          status === "done" || taskIdx > tIdx
                            ? "#3fb950"
                            : taskIdx === tIdx
                            ? agent.color
                            : "#6e7681",
                        border: `1px solid ${
                          status === "done" || taskIdx > tIdx
                            ? "rgba(63,185,80,0.2)"
                            : taskIdx === tIdx
                            ? `${agent.color}30`
                            : "#21262d"
                        }`,
                      }}
                    >
                      {status === "done" || taskIdx > tIdx ? "✓ " : taskIdx === tIdx ? "→ " : "○ "}
                      {task}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All done banner */}
      {allDone && (
        <div
          className="rounded-xl p-4 text-center"
          style={{
            backgroundColor: "rgba(63,185,80,0.08)",
            border: "1px solid rgba(63,185,80,0.3)",
            animation: "fadeInUp 0.4s ease",
          }}
        >
          <p className="font-bold" style={{ color: "#3fb950" }}>
            🎉 所有 Agent 完成！進入整合測試...
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
