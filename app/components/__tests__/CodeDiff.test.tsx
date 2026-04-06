import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CodeDiff from "../CodeDiff";

describe("CodeDiff", () => {
  it("renders before and after panels", () => {
    render(<CodeDiff before="const x = 1" after="const x = 2" />);
    expect(screen.getByTestId("code-diff-before")).toHaveTextContent("const x = 1");
    expect(screen.getByTestId("code-diff-after")).toHaveTextContent("const x = 2");
  });

  it("renders title when provided", () => {
    render(<CodeDiff before="a" after="b" title="My Diff" />);
    expect(screen.getByText("My Diff")).toBeInTheDocument();
  });

  it("does not render title element when title is omitted", () => {
    render(<CodeDiff before="a" after="b" />);
    expect(screen.queryByText("My Diff")).toBeNull();
  });

  it("renders default labels", () => {
    render(<CodeDiff before="a" after="b" />);
    expect(screen.getByText("❌ 之前")).toBeInTheDocument();
    expect(screen.getByText("✅ 之後")).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    render(<CodeDiff before="a" after="b" beforeLabel="壞" afterLabel="好" />);
    expect(screen.getByText("壞")).toBeInTheDocument();
    expect(screen.getByText("好")).toBeInTheDocument();
  });

  it("shows language badge when language is not 'text'", () => {
    render(<CodeDiff before="a" after="b" language="typescript" />);
    const badges = screen.getAllByText("typescript");
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it("does not show language badge when language is 'text'", () => {
    render(<CodeDiff before="a" after="b" language="text" />);
    expect(screen.queryByText("text")).toBeNull();
  });

  it("includes a CopyButton in the after panel", () => {
    render(<CodeDiff before="a" after="copy me" />);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("has data-testid on the root", () => {
    render(<CodeDiff before="a" after="b" />);
    expect(screen.getByTestId("code-diff")).toBeInTheDocument();
  });
});
