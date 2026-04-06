import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryBadge from "../CategoryBadge";

describe("CategoryBadge", () => {
  it("renders the correct emoji and label for 'planning'", () => {
    render(<CategoryBadge category="planning" />);
    expect(screen.getByText("📋")).toBeInTheDocument();
    expect(screen.getByText("規劃")).toBeInTheDocument();
  });

  it("renders the correct emoji and label for 'development'", () => {
    render(<CategoryBadge category="development" />);
    expect(screen.getByText("🔨")).toBeInTheDocument();
    expect(screen.getByText("開發")).toBeInTheDocument();
  });

  it("renders the correct emoji and label for 'quality'", () => {
    render(<CategoryBadge category="quality" />);
    expect(screen.getByText("🔍")).toBeInTheDocument();
    expect(screen.getByText("品質")).toBeInTheDocument();
  });

  it("renders the correct emoji and label for 'automation'", () => {
    render(<CategoryBadge category="automation" />);
    expect(screen.getByText("⚡")).toBeInTheDocument();
    expect(screen.getByText("自動化")).toBeInTheDocument();
  });

  it("renders the correct emoji and label for 'advanced'", () => {
    render(<CategoryBadge category="advanced" />);
    expect(screen.getByText("🚀")).toBeInTheDocument();
    expect(screen.getByText("高手")).toBeInTheDocument();
  });

  it("applies smaller padding when size='sm'", () => {
    const { container } = render(<CategoryBadge category="planning" size="sm" />);
    const span = container.querySelector("span");
    expect(span?.className).toContain("text-xs");
  });

  it("applies default (md) padding when size not specified", () => {
    const { container } = render(<CategoryBadge category="planning" />);
    const span = container.querySelector("span");
    expect(span?.className).toContain("text-sm");
  });
});
