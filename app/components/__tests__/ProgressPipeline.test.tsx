import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ProgressPipeline from "../animations/ProgressPipeline";

const stages = [
  { id: "plan", label: "規劃", icon: "📋", duration: 500 },
  { id: "build", label: "建置", icon: "⚙️", duration: 500, agent: "BuildAgent" },
  { id: "deploy", label: "部署", icon: "🚀", duration: 500 },
];

describe("ProgressPipeline", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all stage labels", () => {
    render(<ProgressPipeline stages={stages} />);
    expect(screen.getByText("規劃")).toBeInTheDocument();
    expect(screen.getByText("建置")).toBeInTheDocument();
    expect(screen.getByText("部署")).toBeInTheDocument();
  });

  it("renders stage icons", () => {
    render(<ProgressPipeline stages={stages} />);
    expect(screen.getByText("📋")).toBeInTheDocument();
    expect(screen.getByText("⚙️")).toBeInTheDocument();
    expect(screen.getByText("🚀")).toBeInTheDocument();
  });

  it("shows correct number of stages", () => {
    render(<ProgressPipeline stages={stages} />);
    const stageEls = screen.getAllByTestId(/^stage-/);
    expect(stageEls).toHaveLength(3);
  });

  it("shows agent name when provided", () => {
    render(<ProgressPipeline stages={stages} />);
    expect(screen.getByText("by BuildAgent")).toBeInTheDocument();
  });

  it("initially shows all stages as 等待中", () => {
    render(<ProgressPipeline stages={stages} />);
    const waitingEls = screen.getAllByText("等待中");
    expect(waitingEls.length).toBeGreaterThan(0);
  });

  it("does not autoPlay when autoPlay=false", () => {
    render(<ProgressPipeline stages={stages} autoPlay={false} />);
    const waitingEls = screen.getAllByText("等待中");
    expect(waitingEls).toHaveLength(3);
  });

  it("transitions to running state after autoPlay starts", async () => {
    render(<ProgressPipeline stages={stages} autoPlay />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    // After all timers, first stage should be done
    expect(screen.getAllByText("ok 完成").length).toBeGreaterThan(0);
  });

  it("calls onComplete after all stages finish", async () => {
    const onComplete = vi.fn();
    render(<ProgressPipeline stages={stages} autoPlay onComplete={onComplete} />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders with an empty stages array without crashing", () => {
    expect(() => render(<ProgressPipeline stages={[]} />)).not.toThrow();
  });
});
