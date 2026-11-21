import { act, cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HomeStudyRoom } from "@/components/home/pace/HomeStudyRoom";
import { measuredPresence, PRESENCE_STATE_EVENT } from "@/lib/study-presence-contract";
import type { StudyPresenceTodayCount } from "@/lib/study-presence";

afterEach(() => { cleanup(); vi.useRealTimers(); });

function show(exams: StudyPresenceTodayCount[]) {
  const activeCount = exams.reduce((n, row) => n + row.activeCount, 0);
  const count = exams.reduce((n, row) => n + row.count, 0);
  const recent = exams.filter(row => row.activeCount > 0).map(row => ({ exam: row.exam, count: row.activeCount }));
  const snapshot = measuredPresence({ count: activeCount, exams: recent }, Date.now(), Infinity, { count, activeCount, exams });
  act(() => window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail: { mode: "measured", snapshot } })));
}

it("shows one chip per qualification, in descending order, with one dog per learner", () => {
  render(<HomeStudyRoom />);
  show([{ exam: "civil2", count: 2, activeCount: 1 }, { exam: "civil1", count: 10, activeCount: 2 }]);
  const room = screen.getByRole("link", { name: "チワワの自習室" });
  expect(room).toHaveAttribute("href", "/study-room");
  expect(room).toHaveTextContent("今日 12人が勉強（うち3人がいま勉強中）");
  const chips = within(screen.getByRole("list", { name: "自習室の資格" })).getAllByRole("listitem");
  expect(chips.map(chip => chip.textContent)).toEqual(["1級土木施工管理10人", "2級土木施工管理2人"]);
  expect(screen.getAllByTestId("home-study-room-seat")).toHaveLength(12);
  expect(room.querySelectorAll('[data-studying-now="true"]')).toHaveLength(3);
  expect(room.querySelector('[data-exam="civil1"][data-studying-now="true"] img')).toHaveAttribute("src", expect.stringContaining("civil1-study"));
  expect(room.querySelector('[data-exam="civil1"][data-studying-now="false"] img')).toBeInTheDocument();
});

it("caps the picture at 30 dogs and lists at most six qualifications", () => {
  render(<HomeStudyRoom />);
  show(["civil1", "civil2", "fe", "ap", "ip", "sc", "fp2", "fp3"].map(exam => ({ exam, count: 6, activeCount: 1 })));
  expect(screen.getAllByTestId("home-study-room-seat")).toHaveLength(30);
  expect(screen.getByText("＋18人")).toBeVisible();
  expect(screen.getByText("ほか2資格")).toBeVisible();
  expect(screen.getAllByRole("listitem")).toHaveLength(7);
});

it("reports only the five-minute count when the daily count is missing", () => {
  render(<HomeStudyRoom />);
  const snapshot = measuredPresence({ count: 0, exams: [] }, Date.now());
  act(() => window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail: { mode: "measured", snapshot } })));
  expect(screen.getByTestId("study-room-total")).toHaveTextContent("いま0人が勉強");
  expect(screen.queryByText(/一番乗り/)).not.toBeInTheDocument();
});

it("shows one sleeping dog at measured zero and retires a daily snapshot at JST midnight", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-21T23:59:30+09:00"));
  render(<HomeStudyRoom />);
  expect(screen.queryByText("まだ誰もいません。一番乗りしよう")).not.toBeInTheDocument();
  show([]);
  expect(screen.getByText("まだ誰もいません。一番乗りしよう")).toBeVisible();
  expect(screen.getAllByTestId("home-study-room-sleeper")).toHaveLength(1);
  expect(screen.queryAllByTestId("home-study-room-seat")).toHaveLength(0);
  act(() => vi.advanceTimersByTime(30_000));
  expect(screen.getByTestId("home-study-room-scene")).toHaveAttribute("data-room", "p2");
  expect(screen.queryByText("まだ誰もいません。一番乗りしよう")).not.toBeInTheDocument();
  expect(screen.queryByText("いま 0人")).not.toBeInTheDocument();
});
