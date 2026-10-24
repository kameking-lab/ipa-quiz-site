import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyPresence } from "@/components/StudyPresence";
import { LS_KEYS } from "@/lib/storage/keys";
import { PRESENCE_EVENT } from "@/lib/study-presence";
import { measuredPresence, PRESENCE_STATE_EVENT, type PresenceViewState } from "@/lib/study-presence-contract";
const fetchMock = vi.fn();
const data = { count: 3, exams: [{ exam: "denko2", count: 1 }, { exam: "fe", count: 2 }] };
let states: PresenceViewState[] = [];
const listener = (event: Event) => states.push((event as CustomEvent<PresenceViewState>).detail);
const response = (payload: unknown = measuredPresence(data, Date.now()), status = 200, retryAfter?: string) => ({
  ok: status === 200, status, headers: new Headers(retryAfter ? { "Retry-After": retryAfter } : {}), json: async () => payload,
});
const view = (exam: string | null = "fe", viewer = false) => <>{exam && <div data-study-presence-exam={exam} />}{viewer && <div data-study-presence-viewer />}<StudyPresence /></>;
const advance = (ms: number) => act(() => vi.advanceTimersByTimeAsync(ms));
const activity = async () => { await act(async () => { window.dispatchEvent(new Event("pointerdown")); }); await advance(1); };
async function activeFor(ms: number) {
  while (ms > 0) {
    await act(async () => { window.dispatchEvent(new Event("pointerdown")); });
    const step = Math.min(ms, 60_000); await advance(step); ms -= step;
  }
}
beforeEach(() => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-23T10:00:00Z"));
  localStorage.clear(); states = []; fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  Object.defineProperty(navigator, "locks", { configurable: true, value: { request: async (_key: string, _options: unknown, task: () => Promise<unknown>) => task() } });
  Object.defineProperty(navigator, "webdriver", { configurable: true, value: false });
  fetchMock.mockImplementation(async () => response());
  window.addEventListener(PRESENCE_STATE_EVENT, listener);
});
afterEach(() => { cleanup(); window.removeEventListener(PRESENCE_STATE_EVENT, listener); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("emits validated measured metadata and leaves the old two-minute counter neutral", async () => {
  const old = vi.fn(); window.addEventListener(PRESENCE_EVENT, old);
  try {
    render(view()); await advance(1);
    expect(states[0]).toMatchObject({ mode: "promotion", reason: "initial" });
    expect(states.at(-1)).toMatchObject({ mode: "measured", snapshot: { count: 3, total: 3, windowSeconds: 300, measuredAt: "2026-10-23T10:00:00.000Z" } });
    expect(old.mock.calls.every(([event]) => event.detail === null)).toBe(true);
  } finally { window.removeEventListener(PRESENCE_EVENT, old); }
});
it("only polls an explicit viewer or a visible problem, never unrelated global pages", async () => {
  const mounted = render(view(null)); await advance(1); await activeFor(300_000); expect(fetchMock).not.toHaveBeenCalled();
  mounted.rerender(view(null, true)); await advance(1);
  expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: "GET", body: undefined });
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
  await activeFor(90_000); expect(fetchMock).toHaveBeenCalledTimes(2);
});
it("sends the displayed qualification every 90 seconds and reuses the daily browser ID", async () => {
  const mounted = render(view()); await advance(1);
  const first = JSON.parse(fetchMock.mock.calls[0][1].body);
  expect(Object.keys(first).sort()).toEqual(["exam", "idleMs", "visitorId"]); expect(first.exam).toBe("fe");
  await activeFor(89_998); expect(fetchMock).toHaveBeenCalledOnce();
  mounted.rerender(view("ap")); await advance(1);
  const second = JSON.parse(fetchMock.mock.calls[1][1].body);
  expect(second.exam).toBe("ap"); expect(second.visitorId).toBe(first.visitorId);
  mounted.rerender(view(null)); await activeFor(180_000); expect(fetchMock).toHaveBeenCalledTimes(2);
});
it("stops exactly at two minutes idle independently of the five-minute observation window", async () => {
  render(view()); await advance(120_000);
  expect(fetchMock).toHaveBeenCalledTimes(2); expect(states.at(-1)).toMatchObject({ mode: "stale", snapshot: null, reason: "inactive" });
  await advance(600_000); expect(fetchMock).toHaveBeenCalledTimes(2);
  await activity(); expect(fetchMock).toHaveBeenCalledTimes(3);
});
it("does not count background tabs or WebDriver tests", async () => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  const first = render(view()); await advance(600_000); expect(fetchMock).not.toHaveBeenCalled(); first.unmount();
  Object.defineProperty(navigator, "webdriver", { configurable: true, value: true });
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  render(view()); await advance(600_000); expect(fetchMock).not.toHaveBeenCalled();
});
it("backs off network failures 90 to 180 to 300 to 900 seconds despite activity", async () => {
  const attempts: number[] = []; const start = Date.now();
  fetchMock.mockImplementation(async () => { attempts.push(Date.now() - start); throw new Error("offline"); });
  render(view()); await activeFor(1_470_000);
  expect(attempts).toEqual([0, 90_000, 270_000, 570_000, 1_470_000]);
  expect(states.at(-1)).toMatchObject({ mode: "promotion", snapshot: null, reason: "unavailable" });
});
it("honors Retry-After through hidden-tab stop and visible recovery", async () => {
  fetchMock.mockResolvedValueOnce(response(null, 503, "600")); render(view()); await advance(1);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  await act(async () => { document.dispatchEvent(new Event("visibilitychange")); }); await advance(300_000);
  expect(fetchMock).toHaveBeenCalledOnce();
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
  await activeFor(299_998); expect(fetchMock).toHaveBeenCalledOnce();
  await activeFor(1); expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(states.at(-1)).toMatchObject({ mode: "measured" });
  await activeFor(90_000); expect(fetchMock).toHaveBeenCalledTimes(3);
});
it("moves expired measurements into history during a hanging request, then backs off timeout", async () => {
  render(view()); await advance(1);
  fetchMock.mockImplementation((_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
  }));
  await activeFor(90_000); expect(states.at(-1)).toMatchObject({ mode: "stale", snapshot: null });
  await activeFor(8_000); expect(states.at(-1)).toMatchObject({ mode: "stale", reason: "unavailable" });
  const calls = fetchMock.mock.calls.length; await activeFor(89_000); expect(fetchMock).toHaveBeenCalledTimes(calls);
});
it("keeps error-body counts and old timestamp-free responses out of measured mode", async () => {
  fetchMock.mockResolvedValue(response(data, 200)); render(view()); await advance(1);
  expect(states.at(-1)?.mode).toBe("promotion");
  fetchMock.mockResolvedValue(response(measuredPresence(data, Date.now()), 503)); await activeFor(90_000);
  expect(states.at(-1)?.mode).toBe("promotion");
});
it("preserves legitimate measured zero", async () => {
  fetchMock.mockImplementation(async () => response(measuredPresence({ count: 0, exams: [] }, Date.now())));
  render(view(null, true)); await advance(1);
  expect(states.at(-1)).toMatchObject({ mode: "measured", snapshot: { count: 0, total: 0, exams: [] } });
});
it("retains daily ID rotation retry state until a genuine measurement acknowledges storage", async () => {
  const old = "00000000-0000-4000-8000-000000000099";
  localStorage.setItem(LS_KEYS.studyPresenceVisitor, "2000-01-01|" + old);
  fetchMock.mockRejectedValueOnce(new Error("offline")); render(view()); await advance(1);
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")[2]).toBe(old);
  await activeFor(90_000);
  expect(JSON.parse(fetchMock.mock.calls[1][1].body).previousVisitorId).toBe(old);
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")).toHaveLength(2);
});
it("rechecks qualification after waiting for a browser lock", async () => {
  let send: (() => Promise<unknown>) | undefined; let finish: ((value: unknown) => void) | undefined;
  Object.defineProperty(navigator, "locks", { configurable: true, value: { request: (_key: string, _options: unknown, task: () => Promise<unknown>) => new Promise(resolve => { send = task; finish = resolve; }) } });
  const mounted = render(view()); await advance(1); mounted.rerender(view("ap"));
  await act(async () => { finish?.(await send?.()); });
  expect(JSON.parse(fetchMock.mock.calls[0][1].body).exam).toBe("ap");
});
it("does not mint a second browser ID without cross-tab locks", async () => {
  Object.defineProperty(navigator, "locks", { configurable: true, value: undefined });
  render(view()); await advance(1);
  expect(fetchMock.mock.calls[0][1].method).toBe("GET"); expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
});
it("aborts in-flight requests on hidden tabs and ignores late success", async () => {
  let finish: ((value: ReturnType<typeof response>) => void) | undefined;
  fetchMock.mockImplementation(() => new Promise(resolve => { finish = resolve; })); render(view()); await advance(1);
  const signal = fetchMock.mock.calls[0][1].signal;
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  await act(async () => { document.dispatchEvent(new Event("visibilitychange")); }); expect(signal.aborted).toBe(true);
  await act(async () => { finish?.(response()); });
  expect(states.at(-1)).toMatchObject({ mode: "promotion", reason: "hidden" });
});
