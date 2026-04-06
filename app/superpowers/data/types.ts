export type SkillPhase =
  | "planning"
  | "development"
  | "git"
  | "quality"
  | "debugging"
  | "meta";

export interface SkillStep {
  number: number;
  title: string;
  description: string;
  command?: string;
}

export interface SkillChatMessage {
  role: "user" | "claude";
  content: string;
}

export interface SkillData {
  slug: string;
  name: string;
  displayName: string;
  phase: SkillPhase;
  color: string;
  emoji: string;
  shortDesc: string;
  whatItDoes: string;
  whenToUse: string[];
  steps: SkillStep[];
  chatExample: SkillChatMessage[];
  keyPrinciples: string[];
  relatedSlugs: string[];
}

export interface PhaseInfo {
  id: SkillPhase;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export const PHASES: PhaseInfo[] = [
  {
    id: "planning",
    label: "規劃",
    emoji: "📋",
    color: "#60a5fa",
    description: "設計優先，避免浪費",
  },
  {
    id: "development",
    label: "開發",
    emoji: "🤖",
    color: "#7c6aef",
    description: "子代理平行作業",
  },
  {
    id: "git",
    label: "版控",
    emoji: "🌿",
    color: "#34d399",
    description: "隔離工作區管理",
  },
  {
    id: "quality",
    label: "品質",
    emoji: "🔍",
    color: "#f59e0b",
    description: "TDD + 代碼審查",
  },
  {
    id: "debugging",
    label: "除錯",
    emoji: "🐛",
    color: "#f87171",
    description: "根因分析四階段",
  },
  {
    id: "meta",
    label: "Meta",
    emoji: "✨",
    color: "#a78bfa",
    description: "擴展與了解系統",
  },
];
