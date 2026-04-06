import type { CommandData } from "../data/types";
import CategoryBadge from "./CategoryBadge";
import RelatedCommands from "./RelatedCommands";

const PITFALL_CONFIG = {
  warning: { icon: "⚠️", label: "注意", bg: "bg-yellow-500/10 border-yellow-500/30" },
  gotcha: { icon: "💡", label: "常見誤解", bg: "bg-orange-500/10 border-orange-500/30" },
  tip: { icon: "✨", label: "小技巧", bg: "bg-blue-500/10 border-blue-500/30" },
};

interface CommandDetailProps {
  command: CommandData;
  allCommands: CommandData[];
}

export default function CommandDetail({ command, allCommands }: CommandDetailProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{command.emoji}</span>
          <div>
            <h1
              className="text-3xl font-bold font-mono"
              style={{ color: command.color }}
            >
              {command.name}
            </h1>
            <div className="mt-1">
              <CategoryBadge category={command.category} />
            </div>
          </div>
        </div>
        <p className="text-lg text-white/80 leading-relaxed">{command.shortDesc}</p>
      </div>

      {/* What it does */}
      <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📖</span> 這個指令在做什麼？
        </h2>
        <div className="space-y-3">
          {command.whatItDoes.split("\n\n").map((para, i) => (
            <p key={i} className="text-white/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* When to use */}
      <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🕐</span> 什麼時候用？
        </h2>
        <ul className="space-y-2">
          {command.whenToUse.map((scenario, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-green-400 mt-0.5 shrink-0">✓</span>
              <span className="text-white/80">{scenario}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Prompt example */}
      <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>💬</span> 實際輸入範例
        </h2>
        <div
          className="rounded-lg p-4 font-mono text-sm whitespace-pre-wrap"
          style={{ backgroundColor: `${command.color}11`, border: `1px solid ${command.color}33` }}
        >
          <span className="text-white/40 select-none mr-2">$</span>
          <span style={{ color: command.color }}>{command.promptExample}</span>
        </div>
      </section>

      {/* Claude conversation demo */}
      <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🤖</span> Claude 會怎麼回應？
        </h2>
        <div className="space-y-4">
          {command.claudeMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "claude" && (
                <div className="shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-sm">
                  🤖
                </div>
              )}
              <div
                className={`rounded-xl px-4 py-3 text-sm max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-600/30 border border-blue-500/30 text-white/90"
                    : "bg-white/5 border border-white/10 text-white/80"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans leading-relaxed">
                  {msg.content}
                </pre>
              </div>
              {msg.role === "user" && (
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">
                  👤
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pitfalls */}
      {command.pitfalls.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⚡</span> 注意事項 &amp; 小技巧
          </h2>
          <div className="space-y-3">
            {command.pitfalls.map((pitfall, i) => {
              const config = PITFALL_CONFIG[pitfall.type];
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${config.bg}`}
                  role="note"
                  aria-label={config.label}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{config.icon}</span>
                    <span className="font-semibold text-sm">{pitfall.title}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed pl-6">
                    {pitfall.content}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related commands */}
      {command.relatedSlugs.length > 0 && (
        <section className="mb-8">
          <RelatedCommands slugs={command.relatedSlugs} allCommands={allCommands} />
        </section>
      )}
    </article>
  );
}
