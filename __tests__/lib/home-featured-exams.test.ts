import { describe, expect, it } from "vitest";
import { frequentExamKeys, japanDate, upcomingExamPicks, type FeaturedCalendarExam } from "@/lib/home/featured-exams";

const now = new Date("2026-11-13T12:00:00+09:00");
const keys = ["sc", "nw", "ap", "fp1", "khk-kagaku"];
const entry = (key: string, at = 1) => ({ id: `${key}-2026-spring-am2-q1`, at });
const row = (key: string, candidates: number, ...dates: string[]): FeaturedCalendarExam => ({ key, qualificationId: key, candidates, dates: dates.map(date => ({ date, sourceUrl: "https://example.go.jp/exams" })) });
describe("home pickup selection", () => {
  it("returns no personal cards for zero history or invalid data", () => {
    expect(frequentExamKeys([], keys)).toEqual([]);
    expect(frequentExamKeys(null, keys)).toEqual([]);
    expect(frequentExamKeys([null, {}, { id: "sc-any", at: "wrong" }, entry("unpublished")], keys)).toEqual([]);
  });
  it("returns the one learned qualification without filling empty personal slots", () => {
    expect(frequentExamKeys([entry("sc")], keys)).toEqual(["sc"]);
  });
  it("ranks five qualifications by attempts then latest answer and caps at three", () => {
    expect(frequentExamKeys([entry("sc"), entry("sc"), entry("nw", 2), entry("nw", 4), entry("ap", 3), entry("fp1", 2), entry("khk-kagaku")], keys)).toEqual(["nw", "sc", "ap"]);
  });
  it("recognizes hyphenated qualification codes and automotive period-first IDs", () => {
    expect(frequentExamKeys([entry("khk-kagaku"), { id: "jidosha-2026-first-2-gasoline-q3", at: 3 }], [...keys, "khk", "jidosha-2-gasoline"])).toEqual(["jidosha-2-gasoline", "khk-kagaku"]);
  });
  it("uses Japanese midnight regardless of the browser time zone", () => {
    expect(japanDate(new Date("2026-11-13T14:59:59Z"))).toBe("2026-11-13");
    expect(japanDate(new Date("2026-11-13T15:00:00Z"))).toBe("2026-11-14");
  });
  it("ranks popularity inside 90 days, includes today and fills by next date", () => {
    const rows = [row("sc", 20, "2026-11-13"), row("nw", 50, "2027-02-11"), row("ap", 1000, "2027-02-12"), row("fp1", 5000, "2027-03-01")];
    expect(upcomingExamPicks(keys, [], now, rows).map(pick => pick.key)).toEqual(["nw", "sc", "ap"]);
  });
  it("removes passed exams from dated recommendations and advances to the next session", () => {
    const rows = [row("sc", 999, "2026-11-12"), row("nw", 10, "2026-11-12", "2026-12-01"), row("ap", 9, "2026-12-02"), row("fp1", 8, "2027-01-01")];
    const picks = upcomingExamPicks(keys, [], now, rows);
    expect(picks.map(pick => pick.key)).toEqual(["nw", "ap", "fp1"]);
    expect(picks[0].next?.date).toBe("2026-12-01");
  });
  it("excludes personal cards and fills with the next candidates without duplicate keys", () => {
    const rows = [row("sc", 999, "2026-12-01"), row("nw", 30, "2026-12-01"), row("nw", 30, "2026-12-02"), row("ap", 20, "2026-12-01"), row("fp1", 10, "2026-12-01"), row("not-published", 9999, "2026-12-01")];
    expect(upcomingExamPicks(keys, ["sc"], now, rows).map(pick => pick.key)).toEqual(["nw", "ap", "fp1"]);
  });
  it("fills stale data by popularity with no expired date labels", () => {
    const rows = [row("sc", 10, "2020-01-01"), row("nw", 40), row("ap", 20, "2020-01-01"), row("fp1", 30, "2020-01-01")];
    const picks = upcomingExamPicks(keys, [], now, rows);
    expect(picks.map(pick => pick.key)).toEqual(["nw", "fp1", "ap"]);
    expect(picks.every(pick => !pick.next)).toBe(true);
  });
});
