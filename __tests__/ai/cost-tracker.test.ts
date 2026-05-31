import { describe, it, expect } from "vitest";
import { costJpy, CostTracker } from "@/lib/ai/cost-tracker";

describe("costJpy (pricing single source of truth)", () => {
  it("prices 1M input tokens per the flash-lite / flash table (×150 JPY)", () => {
    // flash-lite: $0.10 / 1M input, $0.40 / 1M output
    expect(costJpy("flash-lite", 1_000_000, 0)).toBeCloseTo(15, 6); // 0.10 * 150
    expect(costJpy("flash-lite", 0, 1_000_000)).toBeCloseTo(60, 6); // 0.40 * 150
    // flash: $0.30 / 1M input, $2.50 / 1M output
    expect(costJpy("flash", 1_000_000, 0)).toBeCloseTo(45, 6); // 0.30 * 150
    expect(costJpy("flash", 0, 1_000_000)).toBeCloseTo(375, 6); // 2.50 * 150
  });

  it("returns 0 for zero tokens", () => {
    expect(costJpy("flash-lite", 0, 0)).toBe(0);
    expect(costJpy("flash", 0, 0)).toBe(0);
  });

  it("scales linearly with token counts", () => {
    const one = costJpy("flash-lite", 1000, 500);
    const ten = costJpy("flash-lite", 10_000, 5000);
    expect(ten).toBeCloseTo(one * 10, 9);
  });

  it("charges more for output than the same volume of input within a tier", () => {
    expect(costJpy("flash", 0, 100_000)).toBeGreaterThan(
      costJpy("flash", 100_000, 0),
    );
  });

  it("flash is more expensive than flash-lite for identical usage", () => {
    expect(costJpy("flash", 1200, 600)).toBeGreaterThan(
      costJpy("flash-lite", 1200, 600),
    );
  });
});

describe("CostTracker", () => {
  it("estimate() matches costJpy and does not record a call", () => {
    const t = new CostTracker("test-session");
    expect(t.estimate("flash-lite", 1200, 600)).toBeCloseTo(
      costJpy("flash-lite", 1200, 600),
      9,
    );
    expect(t.callCount).toBe(0);
    expect(t.totalJpy).toBe(0);
  });

  it("record() accumulates totals and increments the call count", () => {
    const t = new CostTracker("test-session");
    const a = t.record("flash-lite", 1000, 500, "first");
    const b = t.record("flash", 2000, 1000, "second");

    expect(t.callCount).toBe(2);
    expect(a.costJpy).toBeCloseTo(costJpy("flash-lite", 1000, 500), 9);
    expect(b.costJpy).toBeCloseTo(costJpy("flash", 2000, 1000), 9);
    expect(t.totalJpy).toBeCloseTo(a.costJpy + b.costJpy, 9);
    expect(t.totalUsd).toBeCloseTo(a.costUsd + b.costUsd, 9);
  });

  it("returns an ApiCall echoing the input tokens and label", () => {
    const t = new CostTracker("test-session");
    const call = t.record("flash", 1234, 567, "label-x");
    expect(call.tier).toBe("flash");
    expect(call.label).toBe("label-x");
    expect(call.inputTokens).toBe(1234);
    expect(call.outputTokens).toBe(567);
  });
});
