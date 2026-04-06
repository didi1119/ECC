import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PitfallBox from "../PitfallBox";

describe("PitfallBox", () => {
  it("renders warning variant with correct icon", () => {
    render(<PitfallBox type="warning" title="小心這個">注意內容</PitfallBox>);
    expect(screen.getByTestId("pitfall-warning")).toBeInTheDocument();
    expect(screen.getByText(/小心這個/)).toBeInTheDocument();
    expect(screen.getByText("注意內容")).toBeInTheDocument();
  });

  it("renders gotcha variant", () => {
    render(<PitfallBox type="gotcha" title="常見錯誤">錯誤說明</PitfallBox>);
    expect(screen.getByTestId("pitfall-gotcha")).toBeInTheDocument();
    expect(screen.getByText(/常見錯誤/)).toBeInTheDocument();
  });

  it("renders tip variant", () => {
    render(<PitfallBox type="tip" title="好用技巧">技巧內容</PitfallBox>);
    expect(screen.getByTestId("pitfall-tip")).toBeInTheDocument();
    expect(screen.getByText(/好用技巧/)).toBeInTheDocument();
    expect(screen.getByText("技巧內容")).toBeInTheDocument();
  });

  it("has correct role and aria-label", () => {
    render(<PitfallBox type="tip" title="測試標題">內容</PitfallBox>);
    const el = screen.getByRole("note");
    expect(el.getAttribute("aria-label")).toContain("測試標題");
  });

  it("renders children as ReactNode", () => {
    render(
      <PitfallBox type="warning" title="Title">
        <span data-testid="child-node">子節點</span>
      </PitfallBox>
    );
    expect(screen.getByTestId("child-node")).toBeInTheDocument();
  });
});
