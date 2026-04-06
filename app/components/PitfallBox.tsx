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
    border: "rgba(251,191,36,0.3)",
    bg: "rgba(251,191,36,0.06)",
    titleColor: "var(--accent-amber)",
  },
  gotcha: {
    icon: "🚨",
    label: "常見陷阱",
    border: "rgba(244,114,182,0.3)",
    bg: "rgba(244,114,182,0.06)",
    titleColor: "var(--accent-rose)",
  },
  tip: {
    icon: "💡",
    label: "小技巧",
    border: "rgba(52,211,153,0.3)",
    bg: "rgba(52,211,153,0.06)",
    titleColor: "var(--accent-green)",
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
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </div>
  );
}
