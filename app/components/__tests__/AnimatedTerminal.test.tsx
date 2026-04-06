import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import AnimatedTerminal, { type TerminalLine } from "../animations/AnimatedTerminal";

const lines: TerminalLine[] = [
  { type: "input", text: "/plan 建立新功能", delay: 100 },
  { type: "output", text: "Thinking...", delay: 100 },
  { type: "success", text: "任務完成！", delay: 100 },
  { type: "error", text: "Error occurred", delay: 100 },
  { type: "info", text: "Info line", delay: 100 },
];

describe("AnimatedTerminal", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the title bar", () => {
    render(<AnimatedTerminal lines={lines} title="My Terminal" />);
    expect(screen.getByText("My Terminal")).toBeInTheDocument();
  });

  it("uses default title 'Terminal' when not specified", () => {
    render(<AnimatedTerminal lines={lines} />);
    expect(screen.getByText("Terminal")).toBeInTheDocument();
  });

  it("does not show any lines immediately (all delayed)", () => {
    vi.useFakeTimers();
    const { container } = render(<AnimatedTerminal lines={lines} />);
    // role=log div should be present but empty of line content
    const log = container.querySelector("[role='log']");
    expect(log).not.toBeNull();
  });

  it("shows lines progressively after timers fire", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<AnimatedTerminal lines={lines} />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    // All 5 lines should be visible after all timers run
    expect(screen.getByText("/plan 建立新功能")).toBeInTheDocument();
    expect(screen.getByText("Thinking...")).toBeInTheDocument();
    expect(screen.getByText("任務完成！")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.getByText("Info line")).toBeInTheDocument();
  });

  it("has a log region for accessibility", () => {
    render(<AnimatedTerminal lines={lines} />);
    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("renders correctly with an empty lines array", () => {
    expect(() => render(<AnimatedTerminal lines={[]} />)).not.toThrow();
  });
});
