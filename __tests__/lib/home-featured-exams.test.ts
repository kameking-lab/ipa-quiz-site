import { describe, expect, it } from "vitest";
import { HOME_EXAM_CALENDAR, frequentExamKeys, japanDate, upcomingExamPicks, type FeaturedCalendarExam } from "@/lib/home/featured-exams";

const now = new Date("2026-11-13T12:00:00+09:00");
const keys = ["sc", "nw", "ap", "fp1", "khk-kagaku"];
const entry = (key: string, at = 1) => ({ id: `${key}-2026-spring-am2-q1`, at });
const row = (key: string, candidates: number, ...dates: string[]): FeaturedCalendarExam => ({ key, qualificationId: key, candidates, dates: dates.map(date => ({ date, sourceUrl: "https://example.go.jp/exams" })) });
describe("home pickup selection", () => {
  it("selects major published exams by sourced counts, including bounded CBT", () => {
    const picks = upcomingExamPicks(HOME_EXAM_CALENDAR.map(row => row.key), [], now);
    expect(picks.map(pick => [pick.key, pick.next?.date, pick.candidates])).toEqual([
      ["kikenbutsu-otsu4", "2026-11-23", 222545],
      ["ap", "2026-11-24", 82668],
      ["kaigo", "2027-01-31", 78469],
    ]);
  });
  it("returns no personal cards for zero history or invalid data", () => {
    expect(frequentExamKeys([], keys)).toEqual([]);
    expect(frequentExamKeys(null, keys)).toEqual([]);
    expect(frequentExamKeys([null, {}, { id: "sc-any", at: "wrong" }, entry("unpublished")], keys)).toEqual([]);
  });
  it("returns the one learned qualification without filling empty personal slots", () => {
    expect(frequentExamKeys([entry("sc")], keys)).toEqual(["sc"]);
  });
  it("puts the latest qualification first even when it has only one attempt", () => {
    expect(frequentExamKeys([entry("sc"), entry("sc", 2), entry("nw", 3)], keys)).toEqual(["nw", "sc"]);
  });
  it("chooses the two most frequent others, then orders them by recency", () => {
    const entries = [entry("sc", 1), entry("sc", 2), entry("sc", 3), entry("nw", 4), entry("nw", 5), entry("ap", 6), entry("fp1", 7)];
    // AP is newer than SC/NW but does not have enough attempts to be selected.
    expect(frequentExamKeys(entries, keys)).toEqual(["fp1", "nw", "sc"]);
  });
  it("reorders all three cards after each newly learned qualification", () => {
    const entries = [entry("sc", 1), entry("sc", 2), entry("nw", 3), entry("ap", 4)];
    expect(frequentExamKeys(entries, keys)).toEqual(["ap", "nw", "sc"]);
    entries.push(entry("sc", 5));
    expect(frequentExamKeys(entries, keys)).toEqual(["sc", "ap", "nw"]);
    entries.push(entry("nw", 6));
    expect(frequentExamKeys(entries, keys)).toEqual(["nw", "sc", "ap"]);
  });
  it("keeps one card per qualification after consecutive reattempts", () => {
    expect(frequentExamKeys([entry("sc", 1), entry("sc", 2)], keys)).toEqual(["sc"]);
    expect(frequentExamKeys([entry("sc", 1), entry("nw", 2), entry("nw", 3)], keys)).toEqual(["nw", "sc"]);
  });
  it("uses recency to break frequency ties and key order for equal timestamps", () => {
    expect(frequentExamKeys([entry("sc", 1), entry("nw", 2), entry("ap", 3), entry("fp1", 4)], keys)).toEqual(["fp1", "ap", "nw"]);
    expect(frequentExamKeys([entry("sc", 1), entry("nw", 1), entry("ap", 1), entry("fp1", 1)], keys)).toEqual(["ap", "fp1", "nw"]);
  });
  it("reads timestamps rather than assuming the stored array is chronological", () => {
    expect(frequentExamKeys([entry("ap", 3), entry("nw", 2), entry("sc", 1)], keys)).toEqual(["ap", "nw", "sc"]);
  });
  it("recognizes hyphenated qualification codes and automotive period-first IDs", () => {
    expect(frequentExamKeys([entry("khk-kagaku"), { id: "jidosha-2026-first-2-gasoline-q3", at: 3 }], [...keys, "khk", "jidosha-2-gasoline"])).toEqual(["jidosha-2-gasoline", "khk-kagaku"]);
  });
  it("resolves registered question-prefix aliases without treating a legacy prefix as a qualification", () => {
    expect(frequentExamKeys([{ id: "radio21-riku-tech2-2026-01-kogaku-b-q25", at: 3 }], ["riku-tech2"], { "radio21-riku-tech2-2026-01-kogaku-b-q": "riku-tech2" })).toEqual(["riku-tech2"]);
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
  it("does not invent popularity for an exam with an unknown test-taker count", () => {
    const unknown = { ...row("fp1", 100, "2026-11-14"), candidates: null };
    expect(upcomingExamPicks(keys, [], now, [unknown, row("sc", 20, "2027-03-01")]).map(pick => pick.key)).toEqual(["sc"]);
  });
  it("excludes on-demand CBT from dated and undated fallback candidates", () => {
    const onDemand = { ...row("fp1", 99999, "2026-11-14"), scheduleMode: "ondemand" };
    expect(upcomingExamPicks(keys, [], now, [onDemand, row("sc", 10)]).map(pick => pick.key)).toEqual(["sc"]);
  });
  it("keeps a bounded CBT window until its final day and then advances", () => {
    const window = { ...row("ap", 100), dates: [
      { date: "2026-11-11", endDate: "2026-11-23", sourceUrl: "https://www.ipa.go.jp/shiken/" },
      { date: "2027-02-06", endDate: "2027-02-19", sourceUrl: "https://www.ipa.go.jp/shiken/" },
    ] };
    for (const day of ["2026-11-13", "2026-11-23"]) {
      expect(upcomingExamPicks(keys, [], new Date(`${day}T12:00:00+09:00`), [window])[0].next?.endDate).toBe("2026-11-23");
    }
    expect(upcomingExamPicks(keys, [], new Date("2026-11-24T00:00:00+09:00"), [window])[0].next?.date).toBe("2027-02-06");
  });
});
