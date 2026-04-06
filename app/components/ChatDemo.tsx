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
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #30363d", backgroundColor: "#0d1117" }}>
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: "#161b22", borderBottom: "1px solid #30363d" }}>
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#f85149" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffa657" }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3fb950" }} />
        <span className="ml-2 text-xs" style={{ color: "#8b949e" }}>
          {title || "Claude Code — 對話示範"}
        </span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "claude" ? "" : "flex-row-reverse"}`}>
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{
                backgroundColor: msg.role === "claude" ? "rgba(88,166,255,0.2)" : "rgba(63,185,80,0.2)",
                color: msg.role === "claude" ? "#58a6ff" : "#3fb950",
                border: `1px solid ${msg.role === "claude" ? "rgba(88,166,255,0.3)" : "rgba(63,185,80,0.3)"}`,
              }}
            >
              {msg.role === "claude" ? "C" : "你"}
            </div>

            {/* Bubble */}
            <div
              className="rounded-lg px-4 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed"
              style={{
                backgroundColor: msg.role === "claude" ? "#1c2128" : "rgba(63,185,80,0.08)",
                border: `1px solid ${msg.role === "claude" ? "#30363d" : "rgba(63,185,80,0.2)"}`,
                color: "#e6edf3",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
