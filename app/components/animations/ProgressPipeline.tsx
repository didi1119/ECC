"use client";
import { useEffect, useState, useRef } from "react";

export interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  duration: number;
  agent?: string;
}

interface ProgressPipelineProps {
  stages: PipelineStage[];
  autoPlay?: boolean;
  onComplete?: () => void;
}

type StageStatus = "pending" | "running" | "done";

export default function ProgressPipeline({
  stages,
  autoPlay = true,
  onComplete,
}: ProgressPipelineProps) {
  const [statuses, setStatuses] = useState<StageStatus[]>(stages.map(() => "pending"));
  const [progresses, setProgresses] = useState<number[]>(stages.map(() => 0));
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    setStatuses(stages.map(() => "pending"));
    setProgresses(stages.map(() => 0));

    let cumulativeDelay = 300;

    stages.forEach((stage, idx) => {
      const startT = setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[idx] = "running";
          return next;
        });

        const steps = 20;
        for (let step = 1; step <= steps; step++) {
          const t = setTimeout(() => {
            setProgresses((prev) => {
              const next = [...prev];
              next[idx] = Math.round((step / steps) * 100);
              return next;
            });
          }, (stage.duration / steps) * step);
          timeoutsRef.current.push(t);
        }
      }, cumulativeDelay);
      timeoutsRef.current.push(startT);

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
        if (idx === stages.length - 1) onComplete?.();
      }, cumulativeDelay + stage.duration);
      timeoutsRef.current.push(doneT);

      cumulativeDelay += stage.duration + 200;
    });

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [stages, autoPlay, onComplete]);

  return (
    <div className="space-y-3">
      {stages.map((stage, idx) => {
        const status = statuses[idx];
        const progress = progresses[idx];
        return (
          <div
            key={stage.id}
            data-testid={`stage-${stage.id}`}
            role="status"
            aria-label={`${stage.label}：${status === "done" ? "完成" : status === "running" ? `執行中 ${progress}%` : "等待中"}`}
            aria-live="polite"
            className="rounded-lg p-3"
            style={{
              backgroundColor: status === "done" ? "rgba(52,211,153,0.06)" : "var(--bg-surface-1)",
              border: `1px solid ${
                status === "done"
                  ? "rgba(52,211,153,0.25)"
                  : status === "running"
                  ? "rgba(96,165,250,0.35)"
                  : "var(--border-subtle)"
              }`,
              transition: "border-color 0.3s ease, background-color 0.3s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">{stage.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold text-sm"
                    style={{
                      color:
                        status === "done"
                          ? "var(--accent-green)"
                          : status === "running"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {stage.label}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                    {status === "done" ? "ok 完成" : status === "running" ? `${progress}%` : "等待中"}
                  </span>
                </div>
                {stage.agent && (
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    by {stage.agent}
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-surface-2)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: status === "done" ? "var(--accent-green)" : "var(--accent-blue)",
                  transition: "width 0.15s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
