import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import TypewriterText from "../animations/TypewriterText";

describe("TypewriterText", () => {
  it("renders the full text immediately when reducedMotion is true", () => {
    render(<TypewriterText text="Hello ECC" reducedMotion />);
    expect(screen.getByText("Hello ECC")).toBeInTheDocument();
  });

  it("renders a container element accessible via testId", () => {
    render(<TypewriterText text="Test" reducedMotion />);
    const container = screen.getByTestId("typewriter-container");
    expect(container).toBeInTheDocument();
  });

  it("accepts a className prop", () => {
    render(<TypewriterText text="Test" className="my-class" reducedMotion />);
    const container = screen.getByTestId("typewriter-container");
    expect(container.className).toContain("my-class");
  });

  it("calls onComplete after reducedMotion render", () => {
    const onComplete = vi.fn();
    render(<TypewriterText text="Hi" reducedMotion onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("shows cursor when animation is in progress", () => {
    render(<TypewriterText text="Hello" speed={9999} />);
    const container = screen.getByTestId("typewriter-container");
    // Cursor span (aria-hidden) should be present while typing
    const cursor = container.querySelector("[aria-hidden='true']");
    expect(cursor).not.toBeNull();
  });

  it("hides cursor once animation completes", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<TypewriterText text="Hi" speed={10} />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    const container = screen.getByTestId("typewriter-container");
    const cursor = container.querySelector("[aria-hidden='true']");
    expect(cursor).toBeNull();
    vi.useRealTimers();
  });

  it("renders full text after animation completes", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<TypewriterText text="Done" speed={10} />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText("Done")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("sets aria-label to text when done", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<TypewriterText text="Label me" speed={10} />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    const container = screen.getByTestId("typewriter-container");
    expect(container.getAttribute("aria-label")).toBe("Label me");
    vi.useRealTimers();
  });
});
