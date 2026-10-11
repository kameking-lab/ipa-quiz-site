import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyPresence } from "@/components/StudyPresence";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { LS_KEYS } from "@/lib/storage/keys";
import { PRESENCE_EVENT } from "@/lib/study-presence";
const fetchMock = vi.fn();
const data = { count: 3, exams: [{ exam: "denko2", count: 1 }, { exam: "fe", count: 2 }] };
const view = (exam: string | null = "fe") => <>{exam && <div data-study-presence-exam={exam} />}<StudyPresence /><TotalAnswerCounter /></>;
beforeEach(() => {
  vi.useFakeTimers(); localStorage.clear(); fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  Object.defineProperty(navigator, "locks", { configurable: true, value: { request: async (_key: string, _options: unknown, task: () => Promise<unknown>) => task() } });
  Object.defineProperty(navigator, "webdriver", { configurable: true, value: false });
  fetchMock.mockResolvedValue({ ok: true, json: async () => data });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
it("shows Japanese qualification lines, encouragement and the time window without live announcements", async () => {
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(screen.getAllByRole("listitem").map(row => row.textContent)).toEqual(["今2人が基本情報技術者を学んでいます。", "今1人が第二種電気工事士を学んでいます。"]);
  expect(screen.getByText("一緒に頑張りましょう！")).toBeVisible();
  expect(screen.getByText(/直近2分の学習状況/)).toBeVisible();
  expect(screen.getByRole("region", { name: "今学んでいる仲間" })).toHaveAttribute("aria-live", "off");
});
it("sends the displayed question qualification and reuses the daily browser ID", async () => {
  const first = render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  const firstBody = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(firstBody.exam).toBe("fe"); expect(Object.keys(firstBody).sort()).toEqual(["exam", "idleMs", "visitorId"]);
  first.unmount(); render(view("denko2")); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toMatchObject({ visitorId: firstBody.visitorId, exam: "denko2" });
});
it("reads on home/selection pages without creating an ID or recording a learner", async () => {
  render(view(null)); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "GET", body: undefined });
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
});
it("uses the current question in mixed-exam sessions and stops recording on departure", async () => {
  const mounted = render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  mounted.rerender(view("ap")); await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(JSON.parse(fetchMock.mock.calls[1][1].body).exam).toBe("ap");
  mounted.rerender(view(null)); await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(fetchMock.mock.calls[2][1].method).toBe("GET");
});
it("stops heartbeats after two minutes without activity; activity resumes", async () => {
  render(view()); await act(() => vi.advanceTimersByTimeAsync(120_001));
  expect(fetchMock).toHaveBeenCalledTimes(4); expect(screen.queryByRole("region")).toBeNull();
  await act(async () => window.dispatchEvent(new Event("pointerdown")));
  expect(fetchMock).toHaveBeenCalledTimes(5);
});
it("does not count background tabs or WebDriver tests", async () => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  const first = render(view()); await act(() => vi.advanceTimersByTimeAsync(60_000)); expect(fetchMock).not.toHaveBeenCalled();
  first.unmount(); Object.defineProperty(navigator, "webdriver", { configurable: true, value: true });
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  render(view()); await act(() => vi.advanceTimersByTimeAsync(60_000)); expect(fetchMock).not.toHaveBeenCalled();
});
it("clears stale data on network failure and recovers", async () => {
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  fetchMock.mockRejectedValue(new Error("offline")); await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(screen.queryByRole("region")).toBeNull();
  fetchMock.mockResolvedValue({ ok: true, json: async () => data }); await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});
it("consumes error bodies and never displays their counts", async () => {
  const json = vi.fn().mockResolvedValue(data); fetchMock.mockResolvedValue({ ok: false, json });
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(json).toHaveBeenCalledOnce(); expect(screen.queryByRole("region")).toBeNull();
});
it("shows a natural empty state only for measured zero", async () => {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ count: 0, exams: [] }) });
  render(view(null)); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(screen.getByText("学習中の資格はまだありません。")).toBeVisible(); expect(screen.queryByRole("list")).toBeNull();
});
it("keeps row elements on count updates and bounds long lists", async () => {
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  const firstRow = screen.getAllByRole("listitem")[0];
  await act(async () => window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail: { count: 4, exams: [{ exam: "fe", count: 3 }, { exam: "denko2", count: 1 }] } })));
  expect(screen.getAllByRole("listitem")[0]).toBe(firstRow);
  expect(screen.getByRole("list")).toHaveClass("max-h-28", "overflow-y-auto");
});

it("rotates the existing daily ID with atomic old-row removal and clears retry state after success", async () => {
  const old = "00000000-0000-4000-8000-000000000099";
  localStorage.setItem(LS_KEYS.studyPresenceVisitor, "2000-01-01|" + old);
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  const body = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(body.previousVisitorId).toBe(old); expect(body.visitorId).not.toBe(old);
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")).toHaveLength(2);
});
it("retains daily rotation retry state on failure until storage acknowledges it", async () => {
  const old = "00000000-0000-4000-8000-000000000099";
  localStorage.setItem(LS_KEYS.studyPresenceVisitor, "2000-01-01|" + old);
  fetchMock.mockRejectedValueOnce(new Error("offline")); render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")[2]).toBe(old);
  await act(() => vi.advanceTimersByTimeAsync(30_000));
  expect(JSON.parse(fetchMock.mock.calls[1][1].body).previousVisitorId).toBe(old);
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")).toHaveLength(2);
});
it("rechecks the current qualification after waiting for another tab's lock", async () => {
  let send: (() => Promise<unknown>) | undefined;
  let finish: ((value: unknown) => void) | undefined;
  Object.defineProperty(navigator, "locks", { configurable: true, value: { request: (_key: string, _options: unknown, task: () => Promise<unknown>) => new Promise(resolve => { send = task; finish = resolve; }) } });
  const mounted = render(view("fe")); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(fetchMock).not.toHaveBeenCalled(); mounted.rerender(view("ap"));
  await act(async () => { finish?.(await send?.()); });
  expect(JSON.parse(fetchMock.mock.calls[0][1].body).exam).toBe("ap");
});
it("does not mint a second browser ID without cross-tab locks", async () => {
  Object.defineProperty(navigator, "locks", { configurable: true, value: undefined });
  render(view()); await act(() => vi.advanceTimersByTimeAsync(1));
  expect(fetchMock.mock.calls[0][1].method).toBe("GET"); expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
});
