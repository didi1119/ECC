"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/scenarios/beginner", label: "新手入門" },
  { href: "/scenarios/feature-dev", label: "功能開發" },
  { href: "/scenarios/code-quality", label: "程式碼品質" },
  { href: "/scenarios/automation", label: "自動化" },
  { href: "/scenarios/advanced", label: "進階編排" },
  { href: "/cheatsheet", label: "速查表" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/cheatsheet") return pathname.startsWith("/cheatsheet");
    return pathname.startsWith(href);
  };

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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                color: isActive(item.href) ? "var(--text-primary)" : "var(--text-secondary)",
                backgroundColor: isActive(item.href) ? "var(--bg-surface-2)" : "transparent",
                borderBottom: isActive(item.href) ? "2px solid var(--accent-brand)" : "2px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/affaan-m/everything-claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-xs px-3 py-1.5 rounded-md font-mono transition-all"
            style={{
              backgroundColor: "var(--bg-surface-2)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            GitHub ↗
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md transition-all nav-link"
            style={{
              backgroundColor: mobileOpen ? "var(--bg-surface-2)" : "transparent",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={mobileOpen}
          >
            <span className="text-lg leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="md:hidden mt-3 rounded-lg p-2 space-y-1"
          style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 rounded-md text-sm font-medium transition-all nav-link"
              style={{
                color: isActive(item.href) ? "var(--text-primary)" : "var(--text-secondary)",
                backgroundColor: isActive(item.href) ? "var(--bg-surface-2)" : "transparent",
                borderLeft: isActive(item.href) ? "3px solid var(--accent-brand)" : "3px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
