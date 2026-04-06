"use client";
import CopyButton from "./CopyButton";

interface CodeDiffProps {
  before: string;
  after: string;
  language?: string;
  title?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function CodeDiff({
  before,
  after,
  language = "text",
  title,
  beforeLabel = "❌ 之前",
  afterLabel = "✅ 之後",
}: CodeDiffProps) {
  return (
    <div
      className="rounded-xl overflow-hidden text-xs font-mono"
      style={{ border: "1px solid var(--border-subtle)" }}
      data-testid="code-diff"
    >
      {title && (
        <div
          className="px-4 py-2 text-sm font-semibold"
          style={{ backgroundColor: "var(--bg-surface-1)", borderBottom: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
        >
          {title}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Before panel */}
        <div style={{ borderRight: "1px solid var(--border-subtle)" }}>
          <div
            className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(244,114,182,0.08)",
              borderBottom: "1px solid rgba(244,114,182,0.15)",
              color: "var(--accent-rose)",
            }}
          >
            {beforeLabel}
            {language !== "text" && (
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(244,114,182,0.12)", color: "var(--accent-rose)" }}
              >
                {language}
              </span>
            )}
          </div>
          <pre
            className="p-4 overflow-x-auto leading-relaxed"
            style={{ backgroundColor: "var(--bg-base)", color: "var(--text-secondary)", margin: 0, minHeight: "80px" }}
            data-testid="code-diff-before"
          >
            <code>{before}</code>
          </pre>
        </div>

        {/* After panel */}
        <div>
          <div
            className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(52,211,153,0.08)",
              borderBottom: "1px solid rgba(52,211,153,0.15)",
              color: "var(--accent-green)",
            }}
          >
            {afterLabel}
            {language !== "text" && (
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(52,211,153,0.12)", color: "var(--accent-green)" }}
              >
                {language}
              </span>
            )}
          </div>
          <div style={{ position: "relative", backgroundColor: "var(--bg-base)" }}>
            <pre
              className="p-4 overflow-x-auto leading-relaxed"
              style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)", margin: 0, minHeight: "80px" }}
              data-testid="code-diff-after"
            >
              <code>{after}</code>
            </pre>
            <div style={{ position: "absolute", top: "8px", right: "8px" }}>
              <CopyButton text={after} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
