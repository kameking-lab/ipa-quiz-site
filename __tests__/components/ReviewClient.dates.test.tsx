import { describe, it, expect } from "vitest";
import { getTodayStr, getNextReviewDate } from "@/app/review/ReviewClient";

// 復習の「期日」境界は JST 暦日であるべき（streak / daily-challenge と一致）。
// 旧実装は new Date().toISOString().slice(0,10) = UTC 日付だったため、
// JST 00:00〜09:00 の間は前日に化け、その日が期日の復習が 09:00 まで隠れていた。
describe("ReviewClient date helpers (JST calendar boundary)", () => {
  // 2026-05-31 00:30 JST = 2026-05-30 15:30 UTC（UTC だと前日 = 旧実装のバグ窓）
  const jstEarlyMorning = new Date("2026-05-31T00:30:00+09:00");

  it("getTodayStr が JST 早朝でも当日(JST)を返す（旧 UTC 実装なら前日で落ちる）", () => {
    expect(getTodayStr(jstEarlyMorning)).toBe("2026-05-31");
  });

  it("getNextReviewDate(level0=1日後) が JST 早朝でも翌日(JST)を返す", () => {
    // 旧実装は setDate(+1)→toISOString で 2026-05-31 を返していた
    expect(getNextReviewDate(0, jstEarlyMorning)).toBe("2026-06-01");
  });

  it("today と nextReviewDate の差が間隔どおり1日（境界窓でも一貫）", () => {
    const today = getTodayStr(jstEarlyMorning);
    const next = getNextReviewDate(0, jstEarlyMorning);
    const diffDays =
      (Date.parse(`${next}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) /
      86_400_000;
    expect(diffDays).toBe(1);
  });

  it("日中(JST 12:00)では UTC と一致し挙動不変", () => {
    const jstNoon = new Date("2026-05-31T12:00:00+09:00");
    expect(getTodayStr(jstNoon)).toBe("2026-05-31");
    expect(getNextReviewDate(1, jstNoon)).toBe("2026-06-03"); // INTERVALS[1]=3日後
  });
});
