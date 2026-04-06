"use client";
import CopyButton from "./CopyButton";

interface CommandBlockProps {
  command: string;
  description?: string;
  output?: string;
  type?: "command" | "response";
}

export default function CommandBlock({ command, description, output, type = "command" }: CommandBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #30363d", backgroundColor: "#161b22" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid #30363d", backgroundColor: "#1c2128" }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f85149" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffa657" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3fb950" }} />
          {description && (
            <span className="ml-2 text-xs" style={{ color: "#8b949e" }}>{description}</span>
          )}
        </div>
        <CopyButton text={command} />
      </div>

      {/* Command line */}
      <div className="px-4 py-3 font-mono text-sm" style={{ color: "#e6edf3" }}>
        <span style={{ color: "#3fb950" }}>❯ </span>
        <span style={{ color: type === "command" ? "#58a6ff" : "#e6edf3" }}>{command}</span>
      </div>

      {/* Output */}
      {output && (
        <div className="px-4 pb-3 font-mono text-sm whitespace-pre-wrap" style={{ color: "#8b949e", borderTop: "1px solid #21262d" }}>
          <div className="pt-2">{output}</div>
        </div>
      )}
    </div>
  );
}
