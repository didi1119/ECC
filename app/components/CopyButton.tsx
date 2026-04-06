"use client";
import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard write failed (permissions denied, HTTP context, etc.)
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "已複製" : `複製指令：${text}`}
      suppressHydrationWarning
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all"
      style={{
        backgroundColor: copied ? "rgba(52,211,153,0.12)" : "var(--bg-surface-1)",
        color: copied ? "var(--accent-green)" : "var(--text-tertiary)",
        border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "var(--border-subtle)"}`,
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "已複製！" : "複製"}
    </button>
  );
}
