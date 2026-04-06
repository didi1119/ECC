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
      // Silently ignore — button stays in default state
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "已複製" : `複製指令：${text}`}
      suppressHydrationWarning
      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all"
      style={{
        backgroundColor: copied ? "rgba(63,185,80,0.15)" : "rgba(255,255,255,0.05)",
        color: copied ? "#3fb950" : "#8b949e",
        border: `1px solid ${copied ? "rgba(63,185,80,0.3)" : "rgba(48,54,61,0.8)"}`,
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "已複製！" : "複製"}
    </button>
  );
}
