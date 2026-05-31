import { describe, it, expect } from "vitest";
import { buildFunnelSteps } from "@/lib/admin/funnel/posthog";

/**
 * Characterization tests for buildFunnelSteps — the per-step drop-off rate
 * computation rendered on /admin/funnel. Pure function; source unchanged
 * except `buildFunnelSteps` was newly exported. Key contracts: the first step
 * has a null drop_pct, missing events count as 0, a zero previous count guards
 * against division-by-zero (null), and drop_pct is rounded to 1 decimal.
 */

const STEPS = [
  { event: "a", label: "A" },
  { event: "b", label: "B" },
  { event: "c", label: "C" },
];

describe("buildFunnelSteps", () => {
  it("maps event/label and counts in order, first step drop_pct is null", () => {
    const out = buildFunnelSteps(STEPS, { a: 100, b: 60, c: 30 });
    expect(out).toEqual([
      { event: "a", label: "A", count: 100, drop_pct: null },
      { event: "b", label: "B", count: 60, drop_pct: 40 },
      { event: "c", label: "C", count: 30, drop_pct: 50 },
    ]);
  });

  it("treats missing events as count 0", () => {
    const out = buildFunnelSteps(STEPS, { a: 100 });
    expect(out.map((s) => s.count)).toEqual([100, 0, 0]);
    // b drops from 100 → 0 = 100%, c drops from 0 → 0 (prev 0 → null guard)
    expect(out.map((s) => s.drop_pct)).toEqual([null, 100, null]);
  });

  it("guards against division by zero when previous count is 0", () => {
    const out = buildFunnelSteps(STEPS, { a: 0, b: 0, c: 0 });
    expect(out.map((s) => s.drop_pct)).toEqual([null, null, null]);
  });

  it("rounds drop_pct to one decimal place", () => {
    const out = buildFunnelSteps(
      [
        { event: "a", label: "A" },
        { event: "b", label: "B" },
      ],
      { a: 3, b: 1 },
    );
    // (3 - 1) / 3 * 100 = 66.666... → 66.7
    expect(out[1].drop_pct).toBe(66.7);
  });

  it("produces a negative drop_pct when a later step out-counts the previous", () => {
    const out = buildFunnelSteps(
      [
        { event: "a", label: "A" },
        { event: "b", label: "B" },
      ],
      { a: 50, b: 80 },
    );
    // (50 - 80) / 50 * 100 = -60
    expect(out[1].drop_pct).toBe(-60);
  });

  it("returns an empty array for no step definitions", () => {
    expect(buildFunnelSteps([], { a: 10 })).toEqual([]);
  });
});
