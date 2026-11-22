import { describe, expect, it } from "vitest";
import { getHomeEvent, HOME_EVENTS, HOME_EVENT_TABLE_LAST_YEAR, type HomeEventId } from "@/lib/home/home-events";

type Period = readonly [start: number, end: number, event: HomeEventId];

const fixedPeriods: Period[] = [
  [101, 107, "new-year"],
  [119, 126, "winter"],
  [208, 214, "valentine"],
  [331, 408, "sakura"],
  [429, 505, "children"],
  [522, 529, "green-tea"],
  [609, 617, "hydrangea"],
  [701, 707, "tanabata"],
  [724, 731, "sunflower"],
  [808, 815, "obon"],
  [1016, 1023, "autumn-reading"],
  [1025, 1031, "halloween"],
  [1101, 1103, "culture"],
  [1109, 1115, "shichi-go-san"],
  [1117, 1123, "labor"],
  [1219, 1225, "christmas"],
  [1226, 1231, "new-years-eve"],
];

const variablePeriods: Record<number, Period[]> = {
  2026: [
    [108, 112, "coming-of-age"], [128, 203, "setsubun"], [224, 303, "hinamatsuri"],
    [313, 320, "spring"], [506, 510, "mothers"], [714, 720, "marine"],
    [917, 923, "autumn-equinox"], [924, 925, "moon-viewing"], [1006, 1012, "sports"],
  ],
  2027: [
    [108, 111, "coming-of-age"], [128, 203, "setsubun"], [224, 303, "hinamatsuri"],
    [314, 321, "spring"], [506, 509, "mothers"], [713, 719, "marine"],
    [909, 915, "moon-viewing"], [917, 923, "autumn-equinox"], [1005, 1011, "sports"],
  ],
  2028: [
    [108, 110, "coming-of-age"], [128, 203, "setsubun"], [225, 303, "hinamatsuri"],
    [313, 320, "spring"], [508, 514, "mothers"], [711, 717, "marine"],
    [916, 922, "autumn-equinox"], [927, 1003, "moon-viewing"], [1004, 1009, "sports"],
  ],
  2029: [
    [108, 108, "coming-of-age"], [127, 202, "setsubun"], [224, 303, "hinamatsuri"],
    [313, 320, "spring"], [507, 513, "mothers"], [710, 716, "marine"],
    [916, 916, "moon-viewing"], [917, 917, "autumn-equinox"], [918, 922, "moon-viewing"],
    [923, 923, "autumn-equinox"], [1002, 1008, "sports"],
  ],
  2030: [
    [108, 114, "coming-of-age"], [128, 203, "setsubun"], [224, 303, "hinamatsuri"],
    [313, 320, "spring"], [506, 512, "mothers"], [709, 715, "marine"],
    [906, 912, "moon-viewing"], [916, 923, "autumn-equinox"], [1008, 1014, "sports"],
  ],
};

describe("home event calendar", () => {
  it.each([[2026, 179], [2027, 182], [2028, 183], [2029, 176], [2030, 189]])(
    "matches the effective boundaries and shows a single event per day in %i",
    (year, expectedTotal) => {
      const periods = [...fixedPeriods, ...variablePeriods[year]];
      const seen = new Set<HomeEventId>();
      let total = 0;
      for (let i = 1; ; i++) {
        const date = new Date(year, 0, i, 12);
        if (date.getFullYear() !== year) break;
        const day = (date.getMonth() + 1) * 100 + date.getDate();
        const matches = periods.filter(([start, end]) => start <= day && day <= end);
        expect(matches.length, `${year}/${day}`).toBeLessThanOrEqual(1);
        const event = getHomeEvent(date);
        expect(event, `${year}/${day}`).toBe(matches[0]?.[2] ?? null);
        if (event) {
          seen.add(event);
          total++;
        }
      }
      expect(seen).toEqual(new Set(HOME_EVENTS.map(event => event.id)));
      expect(total).toBe(expectedTotal);
      expect(total).toBeGreaterThanOrEqual(170);
      expect(total).toBeLessThanOrEqual(195);
    },
  );

  it("uses local midnight even when the UTC calendar day is different", () => {
    expect(getHomeEvent(new Date(2026, 11, 25, 23, 59, 59))).toBe("christmas");
    expect(getHomeEvent(new Date(2026, 11, 26, 0))).toBe("new-years-eve");
    expect(getHomeEvent(new Date(2027, 0, 1, 0))).toBe("new-year");
  });

  it("keeps recurring events when astronomical dates are unavailable", () => {
    const year = HOME_EVENT_TABLE_LAST_YEAR + 1;
    expect(getHomeEvent(new Date(year, 1, 3))).toBeNull();
    expect(getHomeEvent(new Date(year, 2, 20))).toBeNull();
    expect(getHomeEvent(new Date(year, 8, 22))).toBeNull();
    expect(getHomeEvent(new Date(year, 9, 31))).toBe("halloween");
    expect(getHomeEvent(new Date(year, 0, 7))).toBe("new-year");
    expect(getHomeEvent(new Date(NaN))).toBeNull();
  });

  it("requires updating the calendar one year before its last year", () => {
    expect(HOME_EVENT_TABLE_LAST_YEAR, "Extend NAOJ dates in lib/home/home-events.ts")
      .toBeGreaterThan(new Date().getFullYear() + 1);
  });
});
