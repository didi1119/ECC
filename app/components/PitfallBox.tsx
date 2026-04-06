import { ReactNode } from "react";

interface PitfallBoxProps {
  type: "warning" | "tip" | "gotcha";
  title: string;
  children: ReactNode;
}

const VARIANTS = {
  warning: {
    icon: "⚠️",
    label: "注意",
    border: "rgba(255,166,87,0.3)",
    bg: "rgba(255,166,87,0.06)",
    titleColor: "#ffa657",
  },
  gotcha: {
    icon: "🚨",
    label: "常見陷阱",
    border: "rgba(248,81,73,0.3)",
    bg: "rgba(248,81,73,0.06)",
    titleColor: "#f85149",
  },
  tip: {
    icon: "💡",
    label: "小技巧",
    border: "rgba(63,185,80,0.3)",
    bg: "rgba(63,185,80,0.06)",
    titleColor: "#3fb950",
  },
};

export default function PitfallBox({ type, title, children }: PitfallBoxProps) {
  const v = VARIANTS[type];
  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: v.bg, border: `1px solid ${v.border}` }}
      role="note"
      aria-label={`${v.label}: ${title}`}
      data-testid={`pitfall-${type}`}
    >
      <p className="text-sm font-semibold mb-1.5" style={{ color: v.titleColor }}>
        {v.icon} {title}
      </p>
      <div className="text-sm" style={{ color: "#8b949e" }}>
        {children}
      </div>
    </div>
  );
}
