"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { CommandData, CommandCategory } from "../data/types";
import { CATEGORIES } from "../data/types";
import CommandCard from "./CommandCard";

interface SearchFilterProps {
  commands: CommandData[];
}

export default function SearchFilter({ commands }: SearchFilterProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CommandCategory | "all">("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K / Cmd+K keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = useMemo(() => {
    return commands.filter((cmd) => {
      const matchesCategory =
        activeCategory === "all" || cmd.category === activeCategory;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        cmd.name.toLowerCase().includes(q) ||
        cmd.shortDesc.toLowerCase().includes(q) ||
        cmd.whatItDoes.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [commands, query, activeCategory]);

  // Group filtered commands by category
  const groupedByCategory = useMemo(() => {
    const groups: { category: typeof CATEGORIES[number]; commands: CommandData[] }[] = [];
    for (const cat of CATEGORIES) {
      const catCommands = filtered.filter((cmd) => cmd.category === cat.id);
      if (catCommands.length > 0) {
        groups.push({ category: cat, commands: catCommands });
      }
    }
    return groups;
  }, [filtered]);

  const isSearching = query.length > 0 || activeCategory !== "all";

  return (
    <div>
      {/* Search input — command palette style */}
      <div className="relative mb-6 max-w-xl mx-auto">
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-lg"
          style={{ color: "var(--text-tertiary)" }}
        >
          🔍
        </span>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="搜尋指令，例如：測試、安全、部署..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl pl-12 pr-16 py-3.5 text-sm transition-all"
          style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-medium)",
            color: "var(--text-primary)",
          }}
        />
        <kbd
          className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[11px] font-mono"
          style={{
            backgroundColor: "var(--bg-surface-2)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-tertiary)",
          }}
        >
          Ctrl+K
        </kbd>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActiveCategory("all")}
          className="rounded-md px-4 py-1.5 text-xs font-semibold transition-all uppercase tracking-wider"
          style={
            activeCategory === "all"
              ? {
                  backgroundColor: "var(--accent-brand)",
                  color: "#fff",
                }
              : {
                  backgroundColor: "var(--bg-surface-2)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                }
          }
        >
          全部（{commands.length}）
        </button>
        {CATEGORIES.map((cat) => {
          const count = commands.filter((c) => c.category === cat.id).length;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-md px-4 py-1.5 text-xs font-semibold transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: `${cat.color}25`,
                      color: cat.color,
                      border: `1px solid ${cat.color}40`,
                    }
                  : {
                      backgroundColor: "var(--bg-surface-2)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-subtle)",
                    }
              }
            >
              {cat.emoji} {cat.label}（{count}）
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              backgroundColor: "var(--bg-surface-2)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <span className="text-3xl">🔍</span>
          </div>
          <p className="mb-1 font-medium" style={{ color: "var(--text-secondary)" }}>
            找不到符合「{query}」的指令
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>
            試試其他關鍵字，或清除篩選條件
          </p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("all"); }}
            className="text-sm font-medium transition-colors px-4 py-2 rounded-md"
            style={{
              color: "var(--accent-blue)",
              backgroundColor: "rgba(96,165,250,0.08)",
              border: "1px solid rgba(96,165,250,0.15)",
            }}
          >
            清除篩選
          </button>
        </div>
      ) : isSearching ? (
        /* Flat grid when searching/filtering */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cmd) => (
            <CommandCard key={cmd.slug} command={cmd} />
          ))}
        </div>
      ) : (
        /* Category-grouped sections with sticky headers */
        <div className="space-y-10">
          {groupedByCategory.map((group) => (
            <section key={group.category.id}>
              <div
                className="sticky top-[52px] z-10 py-3 mb-4 flex items-center gap-3"
                style={{
                  backgroundColor: "var(--bg-base)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{group.category.emoji}</span>
                  <h3
                    className="font-semibold"
                    style={{ color: group.category.color, fontSize: "0.9375rem" }}
                  >
                    {group.category.label}
                  </h3>
                  <span
                    className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${group.category.color}12`,
                      color: group.category.color,
                    }}
                  >
                    {group.commands.length}
                  </span>
                </div>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "var(--border-subtle)" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.commands.map((cmd) => (
                  <CommandCard key={cmd.slug} command={cmd} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
