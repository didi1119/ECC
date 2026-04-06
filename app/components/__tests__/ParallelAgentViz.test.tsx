import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import ParallelAgentViz, { type AgentTask } from "../animations/ParallelAgentViz";

const agents: AgentTask[] = [
  {
    id: "frontend",
    name: "前端 Agent",
    emoji: "🎨",
    color: "#58a6ff",
    tasks: ["分析設計", "建立元件"],
    duration: 300,
  },
  {
    id: "backend",
    name: "後端 Agent",
    emoji: "⚙️",
    color: "#3fb950",
    tasks: ["設計 API", "實作邏輯"],
    duration: 400,
  },
];

describe("ParallelAgentViz", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all agent names", () => {
    render(<ParallelAgentViz agents={agents} />);
    expect(screen.getByText("前端 Agent")).toBeInTheDocument();
    expect(screen.getByText("後端 Agent")).toBeInTheDocument();
  });

  it("renders agent emojis", () => {
    render(<ParallelAgentViz agents={agents} />);
    expect(screen.getByText("🎨")).toBeInTheDocument();
    expect(screen.getByText("⚙️")).toBeInTheDocument();
  });

  it("renders correct number of status regions", () => {
    render(<ParallelAgentViz agents={agents} />);
    const statusEls = screen.getAllByRole("status");
    expect(statusEls).toHaveLength(agents.length);
  });

  it("initially shows agents as 等待 state", () => {
    render(<ParallelAgentViz agents={agents} autoPlay={false} />);
    const waitingBadges = screen.getAllByText("等待");
    expect(waitingBadges).toHaveLength(2);
  });

  it("shows all done banner after all agents complete", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<ParallelAgentViz agents={agents} autoPlay />);
    await act(async () => {
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText(/所有 Agent 完成/)).toBeInTheDocument();
  });

  it("does not autoPlay when autoPlay=false", () => {
    render(<ParallelAgentViz agents={agents} autoPlay={false} />);
    expect(screen.queryByText(/所有 Agent 完成/)).toBeNull();
  });

  it("renders with empty agents array without crashing", () => {
    expect(() => render(<ParallelAgentViz agents={[]} />)).not.toThrow();
  });
});
