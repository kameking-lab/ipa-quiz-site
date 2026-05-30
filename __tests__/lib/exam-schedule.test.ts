import { describe, it, expect } from "vitest";

import { nextExamSitting } from "@/lib/constants/exam-schedule";

// 「次回試験まで N 日」カウントダウン（ホーム HomeAuxSection / account ダッシュボード）。
// 旧実装は 試験日(00:00Z) と 生の now を Math.ceil で比較していたため、
// JST 00:00〜09:00 の時間帯に残り日数が1多く出て、さらに試験当日の JST 09:00 以降は
// 次回開催へ繰り上がっていた。JST 暦日ベースで数える＝旧実装ではこのテストが落ちる。
describe("nextExamSitting — JST 暦日カウントダウン", () => {
  it("JST 早朝（00:00〜09:00）でも残り日数は暦日で正しい（旧実装は+1）", () => {
    // 2026-04-15T20:00:00Z = JST 2026-04-16 05:00。春期(4/21)まで JST 暦日で5日。
    const r = nextExamSitting(new Date("2026-04-15T20:00:00Z"));
    expect(r.days).toBe(5);
    expect(r.label).toBe("2026年 春期");
  });

  it("試験当日（JST）は残り0日で、次回へ繰り上がらない（旧実装は当日朝=1日/当日昼=次回）", () => {
    // JST 2026-04-21 05:00（早朝）— 春期は当日。
    expect(nextExamSitting(new Date("2026-04-20T20:00:00Z")).days).toBe(0);
    // JST 2026-04-21 11:00（昼）— まだ当日なので 0、秋期に飛ばない。
    const noon = nextExamSitting(new Date("2026-04-21T02:00:00Z"));
    expect(noon.days).toBe(0);
    expect(noon.label).toBe("2026年 春期");
  });

  it("通常の昼間ケースは暦日どおり", () => {
    // JST 2026-04-10 12:00。春期(4/21)まで 11日。
    expect(nextExamSitting(new Date("2026-04-10T03:00:00Z")).days).toBe(11);
  });

  it("試験翌日（JST）は次回開催へ繰り上がる", () => {
    // JST 2026-10-15 12:00 — 秋期(10/14)の翌日。次は 2027 春期。
    const r = nextExamSitting(new Date("2026-10-15T03:00:00Z"));
    expect(r.label).toBe("2027年 春期");
    expect(r.days).toBeGreaterThan(0);
  });
});
