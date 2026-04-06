import { vi } from "vitest";
import type { SkillData } from "../../data/types";

// Shared Next.js Link mock for all superpowers component tests
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

export const makeSkill = (overrides: Partial<SkillData> = {}): SkillData => ({
  slug: "brainstorming",
  name: "superpowers:brainstorming",
  displayName: "Brainstorming",
  phase: "planning",
  color: "#60a5fa",
  emoji: "💡",
  shortDesc: "透過對話精煉設計",
  whatItDoes: "詳細說明",
  whenToUse: ["開始新功能前"],
  steps: [],
  chatExample: [],
  keyPrinciples: [],
  relatedSlugs: [],
  ...overrides,
});
