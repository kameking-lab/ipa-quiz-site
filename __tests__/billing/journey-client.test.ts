import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Blob as NodeBlob } from "node:buffer";
import { flushJourney, observeJourney, purchaseJourney } from "@/lib/billing/journey-client";
import { journeyPage, journeyQualification, type JourneyChange } from "@/lib/billing/journey-contract";
import { EXAM_CONFIGS } from "@/lib/exam-config";

const beacon = vi.fn();
beforeEach(() => {
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-11T03:00:00Z"));
  sessionStorage.clear(); window.history.replaceState({}, "", "/quiz?exam=ap&email=private@example.test");
  beacon.mockReset().mockReturnValue(true);
  vi.stubGlobal("Blob", NodeBlob);
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
async function payloads() {
  return Promise.all(beacon.mock.calls.map(async call => JSON.parse(await (call[1] as NodeBlob).text()) as { changes: JourneyChange[]; purchaseOrder?: string }));
}
describe("aggregate-only purchase learning journey", () => {
  it("replaces the unpaid contribution with confirmed purchase and preserves ten answers across a reload", async () => {
    observeJourney();
    for (let i = 0; i < 10; i++) observeJourney({ qualification: "ap", answer: true });
    vi.advanceTimersByTime(5000);
    window.history.replaceState({}, "", "/q/ap/2024/spring/1");
    observeJourney({ stage: "offer", offer: true }); flushJourney();
    observeJourney({ stage: "plan_click" }); flushJourney();
    window.history.replaceState({}, "", "/billing/start");
    observeJourney({ stage: "checkout" }); flushJourney();
    vi.advanceTimersByTime(40 * 60000); // same tab survives a slow checkout
    window.history.replaceState({}, "", "/billing/success?order=fixture-order");
    purchaseJourney("fixture-order"); purchaseJourney("fixture-order"); flushJourney();
    observeJourney({ qualification: "ap", answer: true }); flushJourney();
    const bodies = await payloads();
    const totals = new Map<string, { sessions: number; answers: number }>();
    for (const body of bodies) for (const change of body.changes) {
      const key = [change.qualification, change.outcome, change.offer, change.page, change.stage].join("|");
      const total = totals.get(key) ?? { sessions: 0, answers: 0 };
      total.sessions += change.delta; total.answers += change.delta * change.answers; totals.set(key, total);
    }
    expect([...totals.values()].reduce((s, x) => s + x.sessions, 0)).toBe(1);
    expect(totals.get("ap|purchased|question|billing_success|purchased")).toEqual({ sessions: 1, answers: 10 });
    expect([...totals].filter(([key]) => key.includes("unconfirmed")).every(([, x]) => x.sessions === 0 && x.answers === 0)).toBe(true);
    expect(bodies.filter(body => body.purchaseOrder)).toHaveLength(1);
    expect(JSON.stringify(bodies)).not.toMatch(/private@example|2024|spring|questionId|visitorId|sessionId/);
  });
  it("does not advance the baseline when beacon queueing fails", async () => {
    observeJourney({ qualification: "ap", answer: true }); beacon.mockReturnValueOnce(false);
    flushJourney(); flushJourney(); flushJourney();
    const bodies = await payloads();
    expect(bodies).toHaveLength(2); expect(bodies[0]).toEqual(bodies[1]);
  });
  it("starts a new session after 30 minutes and on a new JST day", async () => {
    observeJourney({ answer: true }); flushJourney();
    vi.advanceTimersByTime(31 * 60000); observeJourney({ answer: true }); flushJourney();
    vi.setSystemTime(new Date("2026-11-11T15:01:00Z")); observeJourney(); flushJourney();
    const bodies = await payloads();
    expect(bodies.map(b => b.changes[0].delta)).toEqual([1, 1, 1]);
    expect(bodies[2].changes[0].day).toBe("2026-11-12");
  });
  it("keeps qualification cohorts separate and removes unknown when an exam becomes known", async () => {
    window.history.replaceState({}, "", "/"); observeJourney(); flushJourney();
    observeJourney({ qualification: "ap", answer: true }); flushJourney();
    observeJourney({ qualification: "fe", answer: true }); flushJourney();
    const bodies = await payloads();
    expect(bodies[1].changes.map(c => [c.qualification, c.delta])).toEqual([["unknown", -1], ["ap", 1]]);
    expect(bodies[2].changes).toMatchObject([{ qualification: "fe", delta: 1, answers: 1 }]);
  });
  it("keeps URLs and arbitrary qualification labels out of the contract", () => {
    expect(journeyPage("/auth/signin?email=private@example.test")).toBe("signin");
    expect(journeyQualification("private@example.test")).toBe("unknown");
    expect(journeyQualification("dai-1-shu-eisei-kanrisha")).toBe("dai-1-shu-eisei-kanrisha");
    for (const code of Object.keys(EXAM_CONFIGS)) expect(journeyQualification(code), code).toBe(code);
  });
  it("keeps the original study day when checkout returns across midnight JST", async () => {
    vi.setSystemTime(new Date("2026-11-11T14:55:00Z"));
    observeJourney({ answer: true }); observeJourney({ stage: "checkout" }); flushJourney();
    vi.setSystemTime(new Date("2026-11-11T15:05:00Z"));
    observeJourney(); purchaseJourney("fixture-order");
    const bodies = await payloads();
    expect(bodies.at(-1)?.changes).toEqual(expect.arrayContaining([expect.objectContaining({ day: "2026-11-11", outcome: "purchased", answers: 1, delta: 1 })]));
  });
  it("expires a checkout cohort after 24 hours even if its page was revisited", async () => {
    observeJourney({ stage: "checkout", answer: true }); flushJourney();
    vi.setSystemTime(new Date("2026-11-12T02:00:00Z")); observeJourney(); flushJourney();
    vi.setSystemTime(new Date("2026-11-12T03:01:00Z")); observeJourney(); flushJourney();
    const last = (await payloads()).at(-1)!;
    expect(last.changes).toEqual([expect.objectContaining({ day: "2026-11-12", answers: 0, delta: 1 })]);
  });
  it("can queue a verified purchase again on pagehide when the first queue attempt failed", async () => {
    observeJourney({ answer: true }); flushJourney();
    window.history.replaceState({}, "", "/billing/cancel?order=fixture-order");
    beacon.mockReturnValueOnce(false); purchaseJourney("fixture-order"); flushJourney();
    const bodies = await payloads();
    expect(bodies.at(-1)?.purchaseOrder).toBe("fixture-order");
    expect(bodies.at(-1)?.changes).toEqual(expect.arrayContaining([expect.objectContaining({ page: "billing_cancel", outcome: "purchased" })]));
    expect(bodies.at(-1)).toEqual(bodies.at(-2));
  });
});
