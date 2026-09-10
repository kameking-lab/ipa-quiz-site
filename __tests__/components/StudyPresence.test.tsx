import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyPresence } from "@/components/StudyPresence";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";

const fetchMock = vi.fn();
beforeEach(() => {
  vi.useFakeTimers(); localStorage.clear(); fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ count: 2 }) });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
it("shows actual presence and reuses the browser ID on another mount", async () => {
  const first = render(<><StudyPresence /><TotalAnswerCounter /></>);
  await act(() => vi.advanceTimersByTimeAsync(1));
  expect(screen.getByRole("status").textContent).toContain("今、2人が一緒に勉強しています。");
  const id = JSON.parse(fetchMock.mock.calls[0][1].body).visitorId;
  first.unmount(); render(<StudyPresence />);
  await act(() => vi.advanceTimersByTimeAsync(1));
  expect(JSON.parse(fetchMock.mock.calls[1][1].body).visitorId).toBe(id);
});
it("stops heartbeats and hides the counter after two minutes without activity", async () => {
  render(<><StudyPresence /><TotalAnswerCounter /></>);
  await act(() => vi.advanceTimersByTimeAsync(120_001));
  expect(fetchMock).toHaveBeenCalledTimes(4);
  expect(screen.queryByRole("status")).toBeNull();
  await act(async () => window.dispatchEvent(new Event("pointerdown")));
  expect(fetchMock).toHaveBeenCalledTimes(5);
});
it("does not count a background tab", async () => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  render(<StudyPresence />); await act(() => vi.advanceTimersByTimeAsync(60_000));
  expect(fetchMock).not.toHaveBeenCalled();
});
it("clears the last count after a network failure", async () => {
  render(<><StudyPresence /><TotalAnswerCounter /></>);
  await act(() => vi.advanceTimersByTimeAsync(1));
  fetchMock.mockRejectedValue(new Error("offline"));
  await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(screen.queryByRole("status")).toBeNull();
});
