"use client";
import CopyButton from "./CopyButton";

interface CommandBlockProps {
  command: string;
  description?: string;
  output?: string;
  type?: "command" | "response";
}

export default function CommandBlock({ command, description, output, type = "command" }: CommandBlockProps) {
  // Split command into name and arguments for syntax coloring
  const parts = command.split(" ");
  const cmdName = parts[0];
  const cmdArgs = parts.slice(1).join(" ");

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-surface-2)" }}
    >
      {/* Header — minimal monospace label */}
      <div
        className="flex items-center justify-between px-4 py-1.5"
        style={{ borderBottom: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-surface-3)" }}
      >
        <span
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          {description || "terminal"}
        </span>
        <CopyButton text={command} />
      </div>

      {/* Command line */}
      <div className="px-4 py-3 font-mono text-sm" style={{ color: "var(--text-primary)" }}>
        <span style={{ color: "var(--text-tertiary)" }}>{">"} </span>
        <span style={{ color: type === "command" ? "var(--accent-green)" : "var(--text-primary)" }}>{cmdName}</span>
        {cmdArgs && (
          <span style={{ color: "var(--text-primary)" }}> {cmdArgs}</span>
        )}
      </div>

      {/* Output */}
      {output && (
        <div
          className="px-4 pb-3 font-mono text-sm whitespace-pre-wrap"
          style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="pt-2">{output}</div>
        </div>
      )}
    </div>
  );
}
