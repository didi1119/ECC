export type CommandCategory =
  | "planning"
  | "development"
  | "quality"
  | "automation"
  | "advanced"
  | "learning"
  | "language"
  | "tools";

export interface Pitfall {
  type: "warning" | "gotcha" | "tip";
  title: string;
  content: string;
}

export interface ChatMessage {
  role: "user" | "claude";
  content: string;
}

export interface CommandData {
  slug: string;
  name: string;
  emoji: string;
  category: CommandCategory;
  shortDesc: string;
  color: string;
  /** 2-3 paragraphs, plain-language explanation with analogy */
  whatItDoes: string;
  /** 3-5 concrete scenarios when to use this command */
  whenToUse: string[];
  /** A realistic prompt the user would type */
  promptExample: string;
  /** ChatDemo messages showing the interaction */
  claudeMessages: ChatMessage[];
  pitfalls: Pitfall[];
  relatedSlugs: string[];
}

export interface CategoryInfo {
  id: CommandCategory;
  label: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: "planning",    label: "規劃",   emoji: "📋", color: "#58a6ff" },
  { id: "development", label: "開發",   emoji: "🔨", color: "#3fb950" },
  { id: "quality",     label: "品質",   emoji: "🔍", color: "#bc8cff" },
  { id: "automation",  label: "自動化", emoji: "⚡", color: "#ffa657" },
  { id: "advanced",    label: "高手",   emoji: "🚀", color: "#f85149" },
  { id: "learning",    label: "學習",   emoji: "🧠", color: "#e3b341" },
  { id: "language",    label: "語言",   emoji: "💻", color: "#79c0ff" },
  { id: "tools",       label: "工具",   emoji: "🔧", color: "#56d364" },
];
