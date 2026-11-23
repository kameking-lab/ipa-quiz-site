import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";

vi.mock("@/lib/billing/conversion-client", () => ({ sendConversion: vi.fn() }));
vi.mock("@/lib/analytics/activity-client", () => ({ captureActivity: vi.fn() }));
const fetchMock = vi.fn();
const now = Date.parse("2026-11-18T15:27:00Z");
const browser = "Mozilla/5.0 Chrome/130";
const flushPromises = () => vi.advanceTimersByTimeAsync(0);
const setNavigator = (key: string, value: unknown) => Object.defineProperty(navigator, key, { configurable: true, value });
const body = (index = 0) => JSON.parse(fetchMock.mock.calls[index][1].body);
let reportStudyAnswer: typeof import("@/lib/study-presence-client").reportStudyAnswer;

beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(now);
  localStorage.clear();
  setNavigator("userAgent", browser);
  setNavigator("webdriver", false);
  setNavigator("locks", { request: async (_key: string, _options: unknown, task: () => Promise<unknown>) => task() });
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  fetchMock.mockReset().mockResolvedValue(new Response(null, { status: 204 }));
  vi.stubGlobal("fetch", fetchMock);
  ({ reportStudyAnswer } = await import("@/lib/study-presence-client"));
});
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it("uses the existing answer event while page views and revealing a solution produce no report", async () => {
  const { posthogCapture } = await import("@/lib/posthog");
  posthogCapture("page_view");
  posthogCapture("quiz_started", { exam: "civil1" });
  await flushPromises();
  expect(fetchMock).not.toHaveBeenCalled();
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();

  posthogCapture("question_answered", { exam: "civil1", questionId: "not-sent", correct: false });
  await flushPromises();
  expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/stats/study-presence", expect.objectContaining({ method: "POST", keepalive: true, credentials: "omit" }));
  expect(body()).toEqual({ visitorId: expect.any(String), exam: "civil1", answeredAgoMs: 0 });
});

it("sends the first answer immediately and coalesces later answers with the original answer time", async () => {
  reportStudyAnswer("civil1");
  await vi.advanceTimersByTimeAsync(10_000);
  reportStudyAnswer("civil1");
  await vi.advanceTimersByTimeAsync(10_000);
  reportStudyAnswer("tsushin1");
  await vi.advanceTimersByTimeAsync(69_999);
  expect(fetchMock).toHaveBeenCalledOnce();
  await vi.advanceTimersByTimeAsync(1);
  expect(body(1)).toEqual({ visitorId: body().visitorId, exam: "tsushin1", answeredAgoMs: 70_000 });
  await vi.advanceTimersByTimeAsync(600_000);
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it("sends a queued last answer on leave and honors Retry-After", async () => {
  fetchMock.mockResolvedValueOnce(new Response(null, { status: 503, headers: { "Retry-After": "120" } }));
  reportStudyAnswer("civil1");
  await vi.advanceTimersByTimeAsync(100_000);
  reportStudyAnswer("tsushin1");
  window.dispatchEvent(new Event("pagehide"));
  expect(fetchMock).toHaveBeenCalledOnce();
  await vi.advanceTimersByTimeAsync(20_000);
  expect(body(1)).toMatchObject({ exam: "tsushin1", answeredAgoMs: 20_000 });
  await vi.advanceTimersByTimeAsync(1_000);
  reportStudyAnswer("fe");
  window.dispatchEvent(new Event("pagehide"));
  await flushPromises();
  expect(body(2)).toMatchObject({ exam: "fe", answeredAgoMs: 0 });
});

it("skips bot UA, webdriver and hidden-page answer signals", async () => {
  setNavigator("userAgent", "HeadlessChrome"); reportStudyAnswer("civil1");
  setNavigator("userAgent", browser); setNavigator("webdriver", true); reportStudyAnswer("civil1");
  setNavigator("webdriver", false);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  reportStudyAnswer("civil1");
  await flushPromises();
  expect(fetchMock).not.toHaveBeenCalled();
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
});

it("keeps the previous ID until the rotated answer has been acknowledged", async () => {
  const old = "00000000-0000-4000-8000-000000000099";
  localStorage.setItem(LS_KEYS.studyPresenceVisitor, `2000-01-01|${old}`);
  fetchMock.mockRejectedValueOnce(new Error("offline"));
  reportStudyAnswer("civil1");
  await vi.advanceTimersByTimeAsync(90_000);
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")[2]).toBe(old);
  reportStudyAnswer("tsushin1");
  await flushPromises();
  expect(body(1)).toMatchObject({ visitorId: body().visitorId, previousVisitorId: old, exam: "tsushin1" });
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|")).toHaveLength(2);
});

it("avoids minting a second ID if Web Locks is unavailable", async () => {
  setNavigator("locks", undefined);
  reportStudyAnswer("fe");
  await flushPromises();
  expect(fetchMock).not.toHaveBeenCalled();
  expect(localStorage.getItem(LS_KEYS.studyPresenceVisitor)).toBeNull();
});
