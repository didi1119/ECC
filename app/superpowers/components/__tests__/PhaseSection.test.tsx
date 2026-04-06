import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PhaseSection from "../PhaseSection";
import type { PhaseInfo, SkillData } from "../../data/types";

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

const makePhasePlanning: PhaseInfo = {
  id: "planning",
  label: "規劃",
  emoji: "📋",
  color: "#60a5fa",
  description: "設計優先，避免浪費",
};

const makeSkill = (overrides: Partial<SkillData> = {}): SkillData => ({
  slug: "brainstorming",
  name: "superpowers:brainstorming",
  displayName: "Brainstorming",
  phase: "planning",
  color: "#60a5fa",
  emoji: "💡",
  shortDesc: "透過對話精煉設計",
  whatItDoes: "詳細說明",
  whenToUse: [],
  steps: [],
  chatExample: [],
  keyPrinciples: [],
  relatedSlugs: [],
  ...overrides,
});

describe("PhaseSection", () => {
  it("renders the phase label", () => {
    render(<PhaseSection phase={makePhasePlanning} skills={[makeSkill()]} />);
    expect(screen.getByText("規劃")).toBeInTheDocument();
  });

  it("renders the phase description", () => {
    render(<PhaseSection phase={makePhasePlanning} skills={[makeSkill()]} />);
    expect(screen.getByText("設計優先，避免浪費")).toBeInTheDocument();
  });

  it("renders the phase emoji", () => {
    render(<PhaseSection phase={makePhasePlanning} skills={[makeSkill()]} />);
    expect(screen.getByText("📋")).toBeInTheDocument();
  });

  it("shows skill count pill", () => {
    const skills = [
      makeSkill({ slug: "brainstorming", name: "superpowers:brainstorming" }),
      makeSkill({ slug: "writing-plans", name: "superpowers:writing-plans", shortDesc: "計畫技能" }),
    ];
    render(<PhaseSection phase={makePhasePlanning} skills={skills} />);
    expect(screen.getByText("2 個技能")).toBeInTheDocument();
  });

  it("renders a SkillCard for each skill", () => {
    const skills = [
      makeSkill({ slug: "brainstorming", name: "superpowers:brainstorming", shortDesc: "短說明 A" }),
      makeSkill({ slug: "writing-plans", name: "superpowers:writing-plans", shortDesc: "短說明 B" }),
    ];
    render(<PhaseSection phase={makePhasePlanning} skills={skills} />);
    expect(screen.getByText("superpowers:brainstorming")).toBeInTheDocument();
    expect(screen.getByText("superpowers:writing-plans")).toBeInTheDocument();
  });

  it("returns null when skills array is empty", () => {
    const { container } = render(
      <PhaseSection phase={makePhasePlanning} skills={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders 1-skill phase with singular count", () => {
    render(<PhaseSection phase={makePhasePlanning} skills={[makeSkill()]} />);
    expect(screen.getByText("1 個技能")).toBeInTheDocument();
  });
});
