import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SkillCard from "../SkillCard";
import type { SkillData } from "../../data/types";

// Mock next/link
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

const makeSkill = (overrides: Partial<SkillData> = {}): SkillData => ({
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

describe("SkillCard", () => {
  it("renders the skill name", () => {
    render(<SkillCard skill={makeSkill()} />);
    expect(screen.getByText("superpowers:brainstorming")).toBeInTheDocument();
  });

  it("renders the short description", () => {
    render(<SkillCard skill={makeSkill()} />);
    expect(screen.getByText("透過對話精煉設計")).toBeInTheDocument();
  });

  it("renders the emoji", () => {
    render(<SkillCard skill={makeSkill()} />);
    expect(screen.getByText("💡")).toBeInTheDocument();
  });

  it("links to /superpowers/skills/[slug]", () => {
    render(<SkillCard skill={makeSkill()} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/superpowers/skills/brainstorming");
  });

  it("does not show phase badge by default", () => {
    render(<SkillCard skill={makeSkill()} />);
    expect(screen.queryByText("planning")).not.toBeInTheDocument();
  });

  it("shows phase badge when showPhase=true", () => {
    render(<SkillCard skill={makeSkill()} showPhase />);
    expect(screen.getByText("planning")).toBeInTheDocument();
  });

  it("applies the skill color to the name", () => {
    render(<SkillCard skill={makeSkill({ color: "#f87171" })} />);
    const nameEl = screen.getByText("superpowers:brainstorming");
    expect(nameEl).toHaveStyle({ color: "#f87171" });
  });

  it("renders correctly for a different skill", () => {
    const tdd = makeSkill({
      slug: "test-driven-development",
      name: "superpowers:test-driven-development",
      displayName: "Test-Driven Development",
      emoji: "🔴",
      shortDesc: "RED-GREEN-REFACTOR 循環",
      color: "#f59e0b",
    });
    render(<SkillCard skill={tdd} />);
    expect(screen.getByText("superpowers:test-driven-development")).toBeInTheDocument();
    expect(screen.getByText("RED-GREEN-REFACTOR 循環")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/superpowers/skills/test-driven-development");
  });
});
