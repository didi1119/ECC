import { ALL_COMMANDS, CATEGORIES } from "./data";
import SearchFilter from "./components/SearchFilter";

export default function CheatsheetPage() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-[72rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className="font-bold mb-4"
            style={{
              fontSize: "clamp(1.75rem, 1rem + 3vw, 2.5rem)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            ECC 指令速查表
          </h1>
          <p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: "1.7" }}
          >
            共 {ALL_COMMANDS.length} 個指令，涵蓋規劃、開發、品質保證、自動化到高手技巧。
            點擊任何指令卡片，查看完整的初學者友善說明。
          </p>

          {/* Category stats */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {CATEGORIES.map((cat) => {
              const count = ALL_COMMANDS.filter(
                (c) => c.category === cat.id
              ).length;
              return (
                <div
                  key={cat.id}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1 text-[11px] uppercase font-semibold tracking-wider"
                  style={{
                    backgroundColor: `${cat.color}10`,
                    color: cat.color,
                    border: `1px solid ${cat.color}20`,
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>
                    {cat.label} {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search + Filter + Grid */}
        <SearchFilter commands={ALL_COMMANDS} />
      </div>
    </main>
  );
}
