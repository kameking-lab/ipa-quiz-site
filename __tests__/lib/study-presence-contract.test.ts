import { expect, it } from "vitest";
import { measuredPresence, parseMeasuredPresence, presenceViewState, presenceRetryAfterMs, presenceRetryDelay } from "@/lib/study-presence-contract";
const now = Date.parse("2026-10-23T10:00:00Z");
const zero = measuredPresence({ count: 0, exams: [] }, now);
const measured = measuredPresence({ count: 2, exams: [{ exam: "fe", count: 2 }] }, now);
it("keeps measured zero and preserves server timestamps", () => {
  expect(presenceViewState(zero, true, null, now)).toEqual({ mode: "measured", snapshot: zero, previous: null });
  expect(parseMeasuredPresence(measured, now + 30_000)).toEqual(measured);
});
it.each([
  { count: 2, exams: [{ exam: "fe", count: 2 }] },
  { ...measured, measuredAt: undefined }, { ...measured, measuredAt: "invalid" },
  { ...measured, measuredAt: new Date(now + 20_000).toISOString() },
  { ...measured, validUntil: new Date(now + 300_000).toISOString() },
  { ...measured, windowSeconds: 120 }, { ...measured, total: 99 },
  { ...measured, count: -1 }, { ...measured, count: 1.5 },
  { ...measured, exams: [{ exam: "unknown", count: 2 }] },
  { ...measured, exams: [{ exam: "fe", count: 1 }] },
])("never treats incomplete or invalid payloads as measured", payload => {
  expect(presenceViewState(payload, true, null, now).mode).toBe("promotion");
});
it("never trusts error response counts or calls generic 503 quota exhaustion", () => {
  expect(presenceViewState(measured, false, null, now)).toEqual({ mode: "promotion", snapshot: null, previous: null, reason: "unavailable" });
});
it("expires exactly at validUntil and keeps past numbers only in previous", () => {
  expect(presenceViewState(measured, true, null, now + 90_000)).toEqual({ mode: "stale", snapshot: null, previous: measured, reason: "expired" });
  expect(presenceViewState(null, false, measured, now + 10_000)).toEqual({ mode: "stale", snapshot: null, previous: measured, reason: "unavailable" });
});
it("uses bounded exponential steps and parses both Retry-After forms", () => {
  expect([1, 2, 3, 4, 20].map(presenceRetryDelay)).toEqual([90_000, 180_000, 300_000, 900_000, 900_000]);
  expect(presenceRetryAfterMs("180", now)).toBe(180_000);
  expect(presenceRetryAfterMs(new Date(now + 600_000).toUTCString(), now)).toBe(600_000);
  expect(presenceRetryAfterMs("invalid", now)).toBe(0);
  expect(presenceRetryAfterMs("-1", now)).toBe(0);
});
