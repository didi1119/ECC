"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon, ChevronDown, Zap, Sparkles } from "lucide-react";
import { expertScenarioNavItems } from "../scenarios/expert/data";

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
  const [expertOpen, setExpertOpen] = useState(false);
  const [mobileExpertOpen, setMobileExpertOpen] = useState(false);
  const [superpowersOpen, setSuperpowersOpen] = useState(false);
  const [mobileSuperpowersOpen, setMobileSuperpowersOpen] = useState(false);
  const expertRef = useRef<HTMLDivElement>(null);
  const superpowersRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setExpertOpen(false);
    setMobileExpertOpen(false);
    setSuperpowersOpen(false);
    setMobileSuperpowersOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (expertRef.current && !expertRef.current.contains(e.target as Node)) {
        setExpertOpen(false);
      }
      if (superpowersRef.current && !superpowersRef.current.contains(e.target as Node)) {
        setSuperpowersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) => {
    if (href === "/cheatsheet") return pathname.startsWith("/cheatsheet");
    return pathname.startsWith(href);
  };

  const isExpertActive = expertScenarioNavItems.some((item) => pathname.startsWith(item.href));
  const isSuperpowersActive = pathname.startsWith("/superpowers");

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
          <Hexagon
            size={20}
            strokeWidth={2}
            className="transition-colors"
            style={{ color: "var(--accent-brand)" }}
          />
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

          {/* Expert dropdown */}
          <div ref={expertRef} className="relative">
            <button
              className="nav-link px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1"
              style={{
                color: isExpertActive ? "var(--text-primary)" : "var(--accent-rose)",
                backgroundColor: isExpertActive ? "var(--bg-surface-2)" : "transparent",
                borderBottom: isExpertActive ? "2px solid var(--accent-rose)" : "2px solid transparent",
              }}
              onMouseEnter={() => setExpertOpen(true)}
              onClick={() => setExpertOpen((prev) => !prev)}
              aria-expanded={expertOpen}
              aria-haspopup="menu"
            >
              <Zap size={12} style={{ color: "var(--accent-rose)" }} />
              <span>高手</span>
              <ChevronDown
                size={12}
                className="transition-transform"
                style={{ transform: expertOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* Dropdown panel */}
            <div
              className="absolute top-full right-0 mt-1 py-1 rounded-lg min-w-[180px]"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-medium)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                opacity: expertOpen ? 1 : 0,
                transform: expertOpen ? "translateY(0)" : "translateY(-4px)",
                pointerEvents: expertOpen ? "auto" : "none",
                transition: "opacity 200ms ease, transform 200ms ease",
              }}
              onMouseEnter={() => setExpertOpen(true)}
              onMouseLeave={() => setExpertOpen(false)}
            >
              {expertScenarioNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-xs font-medium transition-all nav-link"
                  style={{
                    color: isActive(item.href) ? "var(--accent-rose)" : "var(--text-secondary)",
                    backgroundColor: isActive(item.href) ? "rgba(244,114,182,0.08)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Superpowers dropdown */}
          <div ref={superpowersRef} className="relative">
            <button
              className="nav-link px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1"
              style={{
                color: isSuperpowersActive ? "var(--text-primary)" : "var(--accent-brand)",
                backgroundColor: isSuperpowersActive ? "var(--bg-surface-2)" : "transparent",
                borderBottom: isSuperpowersActive ? "2px solid var(--accent-brand)" : "2px solid transparent",
              }}
              onMouseEnter={() => setSuperpowersOpen(true)}
              onClick={() => setSuperpowersOpen((prev) => !prev)}
              aria-expanded={superpowersOpen}
              aria-haspopup="menu"
            >
              <Sparkles size={12} style={{ color: "var(--accent-brand)" }} />
              <span>Superpowers</span>
              <ChevronDown
                size={12}
                className="transition-transform"
                style={{ transform: superpowersOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {/* Superpowers dropdown panel */}
            <div
              className="absolute top-full right-0 mt-1 py-1 rounded-lg min-w-[200px]"
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-medium)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                opacity: superpowersOpen ? 1 : 0,
                transform: superpowersOpen ? "translateY(0)" : "translateY(-4px)",
                pointerEvents: superpowersOpen ? "auto" : "none",
                transition: "opacity 200ms ease, transform 200ms ease",
              }}
              onMouseEnter={() => setSuperpowersOpen(true)}
              onMouseLeave={() => setSuperpowersOpen(false)}
            >
              <Link
                href="/superpowers"
                className="block px-4 py-2 text-xs font-medium transition-all nav-link"
                style={{
                  color: pathname === "/superpowers" ? "var(--accent-brand)" : "var(--text-secondary)",
                  backgroundColor: pathname === "/superpowers" ? "rgba(124,106,239,0.08)" : "transparent",
                }}
              >
                ⚡ 總覽 &amp; 安裝
              </Link>
              <Link
                href="/superpowers/workflow"
                className="block px-4 py-2 text-xs font-medium transition-all nav-link"
                style={{
                  color: pathname === "/superpowers/workflow" ? "var(--accent-brand)" : "var(--text-secondary)",
                  backgroundColor: pathname === "/superpowers/workflow" ? "rgba(124,106,239,0.08)" : "transparent",
                }}
              >
                🔢 7 步驟工作流程
              </Link>
              <div
                className="my-1 mx-3"
                style={{ height: "1px", backgroundColor: "var(--border-subtle)" }}
              />
              <p className="px-4 py-1 text-xs" style={{ color: "var(--text-tertiary)" }}>
                14 個技能
              </p>
              {[
                { slug: "brainstorming", label: "Brainstorming", color: "#60a5fa" },
                { slug: "test-driven-development", label: "TDD", color: "#f59e0b" },
                { slug: "systematic-debugging", label: "Systematic Debugging", color: "#f87171" },
                { slug: "subagent-driven-development", label: "Subagent Dev", color: "#7c6aef" },
              ].map((item) => (
                <Link
                  key={item.slug}
                  href={`/superpowers/skills/${item.slug}`}
                  className="block px-4 py-1.5 text-xs transition-all nav-link"
                  style={{
                    color: pathname.includes(item.slug) ? item.color : "var(--text-tertiary)",
                  }}
                >
                  → {item.label}
                </Link>
              ))}
              <Link
                href="/superpowers"
                className="block px-4 py-1.5 text-xs transition-all nav-link"
                style={{ color: "var(--accent-brand)" }}
              >
                全部技能 →
              </Link>
            </div>
          </div>
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

          {/* Mobile hamburger — 44px touch target */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-md transition-all nav-link"
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

      {/* Mobile menu panel — animated */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "600px" : "0",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 300ms ease, opacity 200ms ease",
        }}
      >
        <div
          className="mt-3 rounded-lg p-2 space-y-1"
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

          {/* Superpowers section in mobile */}
          <div>
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all nav-link"
              style={{
                color: isSuperpowersActive ? "var(--accent-brand)" : "var(--text-secondary)",
                backgroundColor: isSuperpowersActive ? "rgba(124,106,239,0.08)" : "transparent",
                borderLeft: isSuperpowersActive ? "3px solid var(--accent-brand)" : "3px solid transparent",
              }}
              onClick={() => setMobileSuperpowersOpen((prev) => !prev)}
              aria-expanded={mobileSuperpowersOpen}
            >
              <span className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: "var(--accent-brand)" }} />
                Superpowers
              </span>
              <ChevronDown
                size={14}
                className="transition-transform"
                style={{ transform: mobileSuperpowersOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            <div
              className="overflow-hidden"
              style={{
                maxHeight: mobileSuperpowersOpen ? "400px" : "0",
                opacity: mobileSuperpowersOpen ? 1 : 0,
                transition: "max-height 250ms ease, opacity 150ms ease",
              }}
            >
              <div className="pl-4 space-y-0.5 py-1">
                <Link
                  href="/superpowers"
                  className="block px-4 py-2 rounded-md text-sm transition-all nav-link"
                  style={{
                    color: pathname === "/superpowers" ? "var(--accent-brand)" : "var(--text-tertiary)",
                    backgroundColor: pathname === "/superpowers" ? "rgba(124,106,239,0.06)" : "transparent",
                  }}
                >
                  總覽 &amp; 安裝
                </Link>
                <Link
                  href="/superpowers/workflow"
                  className="block px-4 py-2 rounded-md text-sm transition-all nav-link"
                  style={{
                    color: pathname === "/superpowers/workflow" ? "var(--accent-brand)" : "var(--text-tertiary)",
                    backgroundColor: pathname === "/superpowers/workflow" ? "rgba(124,106,239,0.06)" : "transparent",
                  }}
                >
                  7 步驟工作流程
                </Link>
              </div>
            </div>
          </div>

          {/* Expert section in mobile */}
          <div>
            <button
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium transition-all nav-link"
              style={{
                color: isExpertActive ? "var(--accent-rose)" : "var(--text-secondary)",
                backgroundColor: isExpertActive ? "rgba(244,114,182,0.08)" : "transparent",
                borderLeft: isExpertActive ? "3px solid var(--accent-rose)" : "3px solid transparent",
              }}
              onClick={() => setMobileExpertOpen((prev) => !prev)}
              aria-expanded={mobileExpertOpen}
            >
              <span className="flex items-center gap-2">
                <Zap size={14} style={{ color: "var(--accent-rose)" }} />
                高手情境
              </span>
              <ChevronDown
                size={14}
                className="transition-transform"
                style={{ transform: mobileExpertOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            <div
              className="overflow-hidden"
              style={{
                maxHeight: mobileExpertOpen ? "400px" : "0",
                opacity: mobileExpertOpen ? 1 : 0,
                transition: "max-height 250ms ease, opacity 150ms ease",
              }}
            >
              <div className="pl-4 space-y-0.5 py-1">
                {expertScenarioNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 rounded-md text-sm transition-all nav-link"
                    style={{
                      color: isActive(item.href) ? "var(--accent-rose)" : "var(--text-tertiary)",
                      backgroundColor: isActive(item.href) ? "rgba(244,114,182,0.06)" : "transparent",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
