import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RelatedCommands from "../RelatedCommands";
import type { CommandData } from "../../data/types";

const makeCmd = (slug: string, name: string, color = "#58a6ff"): CommandData => ({
  slug,
  name,
  emoji: "🔧",
  category: "development",
  color,
  shortDesc: `${name} 說明`,
  whatItDoes: "...",
  whenToUse: [],
  promptExample: name,
  claudeMessages: [],
  pitfalls: [],
  relatedSlugs: [],
});

const allCommands: CommandData[] = [
  makeCmd("plan", "/plan"),
  makeCmd("tdd", "/tdd"),
  makeCmd("verify", "/verify"),
];

describe("RelatedCommands", () => {
  it("renders related commands by slug", () => {
    render(<RelatedCommands slugs={["plan", "tdd"]} allCommands={allCommands} />);
    expect(screen.getByText("/plan")).toBeInTheDocument();
    expect(screen.getByText("/tdd")).toBeInTheDocument();
  });

  it("does not render commands not in slugs", () => {
    render(<RelatedCommands slugs={["plan"]} allCommands={allCommands} />);
    expect(screen.queryByText("/verify")).not.toBeInTheDocument();
  });

  it("renders nothing when slugs array is empty", () => {
    const { container } = render(
      <RelatedCommands slugs={[]} allCommands={allCommands} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("ignores slugs that don't match any command", () => {
    render(<RelatedCommands slugs={["nonexistent"]} allCommands={allCommands} />);
    expect(screen.queryByText("相關指令")).not.toBeInTheDocument();
  });

  it("each related command links to its detail page", () => {
    render(<RelatedCommands slugs={["plan"]} allCommands={allCommands} />);
    const link = screen.getByRole("link", { name: /\/plan/ });
    expect(link).toHaveAttribute("href", "/cheatsheet/commands/plan");
  });

  it("shows section heading when there are related commands", () => {
    render(<RelatedCommands slugs={["plan"]} allCommands={allCommands} />);
    expect(screen.getByText("相關指令")).toBeInTheDocument();
  });
});
