import { afterEach, describe, expect, it, vi } from "vitest";

// Characterization tests for the build-time "current year" SSOT consumed by
// data/blog/generators.ts ("【YYYY年最新】" titles). The contract that matters
// is the JST (UTC+9) rollover: the year must flip at the Japanese new year, not
// at UTC midnight — otherwise blog titles would show the previous year for the
// first 9 hours of Jan 1 JST. Evaluated at module load, so we fake the clock
// before a fresh dynamic import.

async function loadAt(iso: string) {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date(iso));
  const mod = await import("@/lib/constants/current-year");
  vi.useRealTimers();
  return mod;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("CURRENT_YEAR (JST build-time year)", () => {
  it("reports the calendar year for a mid-year instant", async () => {
    // 2025-06-15 12:00 JST
    const { CURRENT_YEAR } = await loadAt("2025-06-15T03:00:00Z");
    expect(CURRENT_YEAR).toBe(2025);
  });

  it("rolls to the next year at JST new year, not UTC (the +9h offset)", async () => {
    // 2025-12-31 20:00 UTC === 2026-01-01 05:00 JST → already 2026 in JST
    const { CURRENT_YEAR } = await loadAt("2025-12-31T20:00:00Z");
    expect(CURRENT_YEAR).toBe(2026);
  });

  it("does NOT roll early — late JST Dec 31 is still the old year", async () => {
    // 2025-12-31 14:00 UTC === 2025-12-31 23:00 JST → still 2025
    const { CURRENT_YEAR } = await loadAt("2025-12-31T14:00:00Z");
    expect(CURRENT_YEAR).toBe(2025);
  });
});

describe("CURRENT_REIWA (令和 era year)", () => {
  it("is exactly CURRENT_YEAR - 2018 (令和1 = 2019)", async () => {
    const { CURRENT_YEAR, CURRENT_REIWA } = await loadAt("2025-06-15T03:00:00Z");
    expect(CURRENT_REIWA).toBe(CURRENT_YEAR - 2018);
    expect(CURRENT_REIWA).toBe(7); // 2025 = 令和7
  });

  it("tracks the year across the JST rollover", async () => {
    const { CURRENT_YEAR, CURRENT_REIWA } = await loadAt("2025-12-31T20:00:00Z");
    expect(CURRENT_YEAR).toBe(2026);
    expect(CURRENT_REIWA).toBe(8); // 2026 = 令和8
  });
});
