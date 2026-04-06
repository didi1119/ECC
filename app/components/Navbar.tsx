"use client";

import Link from "next/link";

const navItems = [
  { href: "/scenarios/beginner", label: "新手入門" },
  { href: "/scenarios/feature-dev", label: "功能開發" },
  { href: "/scenarios/code-quality", label: "程式碼品質" },
  { href: "/scenarios/automation", label: "自動化" },
  { href: "/scenarios/advanced", label: "進階編排" },
  { href: "/cheatsheet", label: "速查表" },
];

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 px-6 py-3"
      style={{
        backgroundColor: "rgba(9,9,11,0.7)",
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm group">
          <span
            className="font-mono text-lg transition-colors"
            style={{ color: "var(--accent-brand)" }}
          >
            ⬡
          </span>
          <span
            className="font-mono tracking-tight transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            ECC
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.backgroundColor = "var(--bg-surface-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href="https://github.com/affaan-m/everything-claude-code"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-md font-mono transition-all"
          style={{
            backgroundColor: "var(--bg-surface-2)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          GitHub ↗
        </a>
      </div>
    </nav>
  );
}
