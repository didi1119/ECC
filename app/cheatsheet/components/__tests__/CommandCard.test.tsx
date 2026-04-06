import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CommandCard from "../CommandCard";
import type { CommandData } from "../../data/types";

const mockCommand: CommandData = {
  slug: "test-cmd",
  name: "/test-cmd",
  emoji: "🧪",
  category: "development",
  color: "#3fb950",
  shortDesc: "這是測試指令的簡短說明",
  whatItDoes: "這個指令用來測試。",
  whenToUse: ["開發時使用"],
  promptExample: "/test-cmd 執行測試",
  claudeMessages: [{ role: "user", content: "/test-cmd" }],
  pitfalls: [],
  relatedSlugs: [],
};

describe("CommandCard", () => {
  it("renders the command emoji", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText("🧪")).toBeInTheDocument();
  });

  it("renders the command name", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText("/test-cmd")).toBeInTheDocument();
  });

  it("renders the short description", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText("這是測試指令的簡短說明")).toBeInTheDocument();
  });

  it("links to the correct detail page", () => {
    render(<CommandCard command={mockCommand} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/cheatsheet/commands/test-cmd");
  });

  it("shows a click prompt text", () => {
    render(<CommandCard command={mockCommand} />);
    expect(screen.getByText("點擊看詳細說明")).toBeInTheDocument();
  });
});
