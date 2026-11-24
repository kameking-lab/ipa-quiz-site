import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { StudyRoomSummary } from "@/components/home/StudyRoomSummary";
import { measuredPresence, PRESENCE_STATE_EVENT } from "@/lib/study-presence-contract";

const emit = (detail: unknown) => act(() => { window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail })); });
const sample = (count: number) => measuredPresence({ count, exams: count ? [{ exam: "fe", count }] : [] }, Date.now());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("server-renders a room without fabricated learners and ignores legacy/unverified counts", () => {
  expect(renderToString(<TotalAnswerCounter />)).toContain("席について解く");
  render(<TotalAnswerCounter />);
  for (const detail of [null, { count: 99 }, { mode: "measured", snapshot: { count: 99 } }, { mode: "demo", snapshot: sample(99) }]) {
    emit(detail);
    expect(screen.queryByTestId("study-room-total")).not.toBeInTheDocument();
    expect(screen.queryAllByTestId("study-room-seat")).toHaveLength(0);
  }
});

it("keeps a validated historical sample with its original timestamp and real zero", () => {
  vi.useFakeTimers(); render(<TotalAnswerCounter />);
  emit({ mode: "measured", snapshot: sample(0), previous: null });
  expect(screen.getByTestId("study-room-total")).toHaveTextContent("いま0人が勉強");
  const snapshot = sample(25);
  emit({ mode: "measured", snapshot, previous: null });
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(12);
  act(() => vi.advanceTimersByTime(90_000));
  expect(screen.getByTestId("study-room-total")).toHaveTextContent("前回25人");
  expect(document.querySelector("time")).toHaveAttribute("datetime", snapshot.measuredAt);
  emit({ mode: "stale", previous: snapshot, reason: "unavailable" });
  expect(screen.getAllByTestId("study-room-seat")).toHaveLength(12);
  expect(document.querySelector("time")).toHaveAttribute("datetime", snapshot.measuredAt);
});

it("offers kp one live summary line, never labels stale numbers as now, and adds no fetch", () => {
  vi.useFakeTimers(); const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
  render(<StudyRoomSummary />);
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(screen.queryByText("自習室をのぞく")).not.toBeInTheDocument();
  emit({ mode: "measured", snapshot: sample(25), previous: null });
  expect(screen.getByText("いま25人が勉強中")).toBeVisible();
  act(() => vi.advanceTimersByTime(90_000));
  expect(screen.queryByText("いま25人が勉強中")).not.toBeInTheDocument();
  expect(screen.queryByRole("link")).not.toBeInTheDocument();
  expect(fetcher).not.toHaveBeenCalled();
});
