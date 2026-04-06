import Link from "next/link";
import type { CommandData } from "../data/types";

interface RelatedCommandsProps {
  slugs: string[];
  allCommands: CommandData[];
}

export default function RelatedCommands({ slugs, allCommands }: RelatedCommandsProps) {
  const related = slugs
    .map((slug) => allCommands.find((c) => c.slug === slug))
    .filter((c): c is CommandData => !!c);

  if (related.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
        相關指令
      </h3>
      <div className="flex flex-wrap gap-2">
        {related.map((cmd) => (
          <Link
            key={cmd.slug}
            href={`/cheatsheet/commands/${cmd.slug}`}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 hover:border-white/20 transition-all"
            style={{ color: cmd.color }}
          >
            <span>{cmd.emoji}</span>
            <span className="font-mono font-medium">{cmd.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
