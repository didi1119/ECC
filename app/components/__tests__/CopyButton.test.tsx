import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyButton from "../CopyButton";

const mockWriteText = vi.fn();

beforeEach(() => {
  mockWriteText.mockReset();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: mockWriteText },
    configurable: true,
  });
});

describe("CopyButton", () => {
  it("renders with '複製' label by default", () => {
    render(<CopyButton text="test command" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("複製")).toBeInTheDocument();
  });

  it("shows '已複製！' after successful copy", async () => {
    mockWriteText.mockResolvedValue(undefined);
    render(<CopyButton text="/plan hello" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(screen.getByText("已複製！")).toBeInTheDocument());
  });

  it("copies the correct text to clipboard", async () => {
    mockWriteText.mockResolvedValue(undefined);
    render(<CopyButton text="/plan 我的任務" />);
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() => expect(mockWriteText).toHaveBeenCalledWith("/plan 我的任務"));
  });

  it("does not throw when clipboard write fails", async () => {
    mockWriteText.mockRejectedValue(new Error("Permission denied"));
    render(<CopyButton text="test" />);
    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
    // Still shows '複製' (not crashed)
    await waitFor(() => expect(screen.getByText("複製")).toBeInTheDocument());
  });

  it("resets back to '複製' after 2 seconds", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    mockWriteText.mockResolvedValue(undefined);
    render(<CopyButton text="test" />);
    fireEvent.click(screen.getByRole("button"));
    await vi.runAllTimersAsync();
    await waitFor(() => expect(screen.getByText("複製")).toBeInTheDocument());
    vi.useRealTimers();
  }, 10000);
});
