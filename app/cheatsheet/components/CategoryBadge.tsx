import type { CommandCategory } from "../data/types";
import { CATEGORIES } from "../data/types";

interface CategoryBadgeProps {
  category: CommandCategory;
  size?: "sm" | "md";
}

export default function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const info = CATEGORIES.find((c) => c.id === category);
  if (!info) return null;

  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold uppercase tracking-wider ${
        isSmall ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{
        backgroundColor: `${info.color}15`,
        color: info.color,
        border: `1px solid ${info.color}25`,
        letterSpacing: "0.05em",
        fontSize: isSmall ? "11px" : "0.75rem",
      }}
    >
      <span>{info.emoji}</span>
      <span>{info.label}</span>
    </span>
  );
}
