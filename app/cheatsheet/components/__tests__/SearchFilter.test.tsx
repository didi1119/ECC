import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "../SearchFilter";
import type { CommandData } from "../../data/types";

const makeCmd = (overrides: Partial<CommandData>): CommandData => ({
  slug: "cmd-a",
  name: "/cmd-a",
  emoji: "🅰️",
  category: "planning",
  color: "#58a6ff",
  shortDesc: "短說明 A",
  whatItDoes: "詳細說明 A",
  whenToUse: [],
  promptExample: "/cmd-a",
  claudeMessages: [],
  pitfalls: [],
  relatedSlugs: [],
  ...overrides,
});

const commands: CommandData[] = [
  makeCmd({ slug: "plan", name: "/plan", emoji: "📋", category: "planning", shortDesc: "規劃指令" }),
  makeCmd({ slug: "tdd", name: "/tdd", emoji: "🧪", category: "development", shortDesc: "測試驅動開發" }),
  makeCmd({ slug: "loop", name: "/loop", emoji: "🔄", category: "automation", shortDesc: "定時重複執行" }),
];

describe("SearchFilter", () => {
  it("renders all commands by default", () => {
    render(<SearchFilter commands={commands} />);
    expect(screen.getByText("/plan")).toBeInTheDocument();
    expect(screen.getByText("/tdd")).toBeInTheDocument();
    expect(screen.getByText("/loop")).toBeInTheDocument();
  });

  it("filters commands by search query (name match)", async () => {
    render(<SearchFilter commands={commands} />);
    const input = screen.getByPlaceholderText(/搜尋指令/);
    await userEvent.type(input, "tdd");
    expect(screen.getByText("/tdd")).toBeInTheDocument();
    expect(screen.queryByText("/plan")).not.toBeInTheDocument();
    expect(screen.queryByText("/loop")).not.toBeInTheDocument();
  });

  it("filters commands by search query (shortDesc match)", async () => {
    render(<SearchFilter commands={commands} />);
    const input = screen.getByPlaceholderText(/搜尋指令/);
    await userEvent.type(input, "定時");
    expect(screen.getByText("/loop")).toBeInTheDocument();
    expect(screen.queryByText("/plan")).not.toBeInTheDocument();
  });

  it("shows no-results message when nothing matches", async () => {
    render(<SearchFilter commands={commands} />);
    const input = screen.getByPlaceholderText(/搜尋指令/);
    await userEvent.type(input, "xyznotexist");
    expect(screen.getByText(/找不到符合/)).toBeInTheDocument();
  });

  it("filters commands by category button", async () => {
    render(<SearchFilter commands={commands} />);
    const devBtn = screen.getByRole("button", { name: /開發/ });
    await userEvent.click(devBtn);
    expect(screen.getByText("/tdd")).toBeInTheDocument();
    expect(screen.queryByText("/plan")).not.toBeInTheDocument();
    expect(screen.queryByText("/loop")).not.toBeInTheDocument();
  });

  it("shows all commands when '全部' button is clicked", async () => {
    render(<SearchFilter commands={commands} />);
    const devBtn = screen.getByRole("button", { name: /開發/ });
    await userEvent.click(devBtn);
    const allBtn = screen.getByRole("button", { name: /全部/ });
    await userEvent.click(allBtn);
    expect(screen.getByText("/plan")).toBeInTheDocument();
    expect(screen.getByText("/tdd")).toBeInTheDocument();
    expect(screen.getByText("/loop")).toBeInTheDocument();
  });

  it("clear filter button resets search and category", async () => {
    render(<SearchFilter commands={commands} />);
    const input = screen.getByPlaceholderText(/搜尋指令/);
    await userEvent.type(input, "xyznotexist");
    const clearBtn = screen.getByRole("button", { name: /清除篩選/ });
    await userEvent.click(clearBtn);
    expect(screen.getByText("/plan")).toBeInTheDocument();
    expect(screen.getByText("/tdd")).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(<SearchFilter commands={commands} />);
    expect(screen.getByPlaceholderText(/搜尋指令/)).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<SearchFilter commands={commands} />);
    expect(screen.getByRole("button", { name: /全部/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /規劃/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /開發/ })).toBeInTheDocument();
  });
});
