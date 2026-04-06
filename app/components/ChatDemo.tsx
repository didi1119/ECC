"use client";

interface Message {
  role: "user" | "claude";
  content: string;
}

interface ChatDemoProps {
  messages: Message[];
  title?: string;
}

export default function ChatDemo({ messages, title }: ChatDemoProps) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-base)" }}
    >
      {/* Header — minimal monospace label */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ backgroundColor: "var(--bg-surface-1)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span
          className="text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "var(--text-tertiary)" }}
        >
          {title || "Claude Code"}
        </span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {/* Claude avatar — left side */}
            {msg.role === "claude" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: "rgba(124,106,239,0.12)",
                  color: "var(--accent-brand)",
                  border: "1px solid rgba(124,106,239,0.25)",
                }}
              >
                C
              </div>
            )}

            {/* Bubble */}
            <div
              className="rounded-lg px-4 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed"
              style={
                msg.role === "user"
                  ? {
                      backgroundColor: "rgba(96,165,250,0.12)",
                      border: "1px solid rgba(96,165,250,0.25)",
                      color: "var(--text-primary)",
                    }
                  : {
                      backgroundColor: "rgba(124,106,239,0.08)",
                      border: "1px solid rgba(124,106,239,0.18)",
                      color: "var(--text-primary)",
                    }
              }
            >
              {msg.content}
            </div>

            {/* User avatar — right side */}
            {msg.role === "user" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: "rgba(96,165,250,0.12)",
                  color: "var(--accent-blue)",
                  border: "1px solid rgba(96,165,250,0.25)",
                }}
              >
                U
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
