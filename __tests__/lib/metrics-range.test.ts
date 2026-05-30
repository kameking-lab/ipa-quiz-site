import { describe, it, expect } from "vitest";
import { resolveRange, rangeSpanDays, dateSeries } from "@/lib/admin/metrics/range";

// range.ts は /admin/metrics の集計期間と「前期間比較」窓を決める日付演算。
// 比較窓（comparedFrom/comparedTo）は対象期間の直前に隣接する同日数窓であるべきで、
// off-by-one が混入すると KPI の前期間比が静かにズレる。now を注入して決定的に固定する。

const NOW = new Date("2026-05-15T12:00:00Z");

describe("resolveRange", () => {
  it("today: 当日のみ・比較は前日1日", () => {
    const m = resolveRange("today", undefined, undefined, NOW);
    expect([m.from, m.to]).toEqual(["2026-05-15", "2026-05-15"]);
    expect([m.comparedFrom, m.comparedTo]).toEqual(["2026-05-14", "2026-05-14"]);
    expect(m.label).toBe("今日");
  });

  it("7d: 直近7日・比較は直前に隣接する7日窓", () => {
    const m = resolveRange("7d", undefined, undefined, NOW);
    expect([m.from, m.to]).toEqual(["2026-05-09", "2026-05-15"]);
    expect([m.comparedFrom, m.comparedTo]).toEqual(["2026-05-02", "2026-05-08"]);
  });

  it("30d: 直近30日・比較は直前に隣接する30日窓", () => {
    const m = resolveRange("30d", undefined, undefined, NOW);
    expect([m.from, m.to]).toEqual(["2026-04-16", "2026-05-15"]);
    expect([m.comparedFrom, m.comparedTo]).toEqual(["2026-03-17", "2026-04-15"]);
  });

  it("mtd: 月初〜当日・比較は直前の同日数窓", () => {
    const m = resolveRange("mtd", undefined, undefined, NOW);
    expect([m.from, m.to]).toEqual(["2026-05-01", "2026-05-15"]);
    expect([m.comparedFrom, m.comparedTo]).toEqual(["2026-04-16", "2026-04-30"]);
    expect(m.label).toBe("今月");
  });

  it("custom: from>to を渡しても昇順に正規化しラベルへ反映する", () => {
    const m = resolveRange("custom", "2026-05-20", "2026-05-10", NOW);
    expect([m.from, m.to]).toEqual(["2026-05-10", "2026-05-20"]);
    expect(m.label).toBe("2026-05-10 〜 2026-05-20");
  });

  it("custom: 不正な日付文字列は当日へフォールバックする", () => {
    const m = resolveRange("custom", "bad-date", undefined, NOW);
    expect([m.from, m.to]).toEqual(["2026-05-15", "2026-05-15"]);
  });
});

describe("rangeSpanDays", () => {
  it("from..to の両端含む日数を返す", () => {
    expect(rangeSpanDays(resolveRange("7d", undefined, undefined, NOW))).toBe(7);
    expect(
      rangeSpanDays({
        range: "custom",
        from: "2026-05-01",
        to: "2026-05-01",
        label: "",
        comparedFrom: "",
        comparedTo: "",
      }),
    ).toBe(1);
  });
});

describe("dateSeries", () => {
  it("from..to を1日刻みの両端含む連続列に展開する", () => {
    expect(dateSeries("2026-05-01", "2026-05-03")).toEqual([
      "2026-05-01",
      "2026-05-02",
      "2026-05-03",
    ]);
  });

  it("from===to は単一要素", () => {
    expect(dateSeries("2026-05-01", "2026-05-01")).toEqual(["2026-05-01"]);
  });
});
