import { describe, expect, it } from "vitest";
import {
  HOME_EXAM_EVENTS,
  formatMonthDay,
  getUpcomingExamEvents,
  jstDateString,
  type HomeExamEvent,
} from "@/lib/home/exam-schedule";

const at = (iso: string) => new Date(iso);

describe("home exam schedule", () => {
  it("uses the JST calendar day, not UTC", () => {
    // 2026-10-16 15:30Z is already 10/17 00:30 in JST.
    expect(jstDateString(at("2026-10-16T15:30:00Z"))).toBe("2026-10-17");
    expect(jstDateString(at("2026-10-16T14:59:00Z"))).toBe("2026-10-16");
  });

  it("counts down whole JST days to the start date", () => {
    const events = getUpcomingExamEvents(at("2026-09-26T03:00:00Z"));
    const koudo = events.find((e) => e.id === "ipa-koudo-2026-zenki");
    expect(koudo?.status).toEqual({ phase: "upcoming", daysLeft: 21 });
    const civil = events.find((e) => e.id === "civil2-2026-kouki");
    expect(civil?.status).toEqual({ phase: "upcoming", daysLeft: 29 });
  });

  it("marks a multi-day window as ongoing and hides it after the last day", () => {
    const during = getUpcomingExamEvents(at("2026-10-20T03:00:00Z")).find((e) => e.id === "ipa-koudo-2026-zenki");
    expect(during?.status).toEqual({ phase: "ongoing" });
    const lastDay = getUpcomingExamEvents(at("2026-10-27T14:00:00Z")).find((e) => e.id === "ipa-koudo-2026-zenki");
    expect(lastDay?.status).toEqual({ phase: "ongoing" });
    const after = getUpcomingExamEvents(at("2026-10-27T15:00:00Z")).find((e) => e.id === "ipa-koudo-2026-zenki");
    expect(after).toBeUndefined();
  });

  it("drops a single-day exam the day after, and a stop notice once it starts", () => {
    expect(getUpcomingExamEvents(at("2026-10-25T03:00:00Z")).some((e) => e.id === "civil2-2026-kouki")).toBe(true);
    expect(getUpcomingExamEvents(at("2026-10-26T03:00:00Z")).some((e) => e.id === "civil2-2026-kouki")).toBe(false);
    expect(getUpcomingExamEvents(at("2026-12-27T03:00:00Z")).some((e) => e.id === "ipa-cbt-2026-pause")).toBe(true);
    expect(getUpcomingExamEvents(at("2026-12-28T03:00:00Z")).some((e) => e.id === "ipa-cbt-2026-pause")).toBe(false);
  });

  it("renders nothing once every verified date has passed", () => {
    expect(getUpcomingExamEvents(at("2027-01-01T00:00:00Z"))).toEqual([]);
  });

  it("sorts by start date", () => {
    const shuffled: HomeExamEvent[] = [...HOME_EXAM_EVENTS].reverse();
    const ids = getUpcomingExamEvents(at("2026-09-26T00:00:00Z"), shuffled).map((e) => e.id);
    expect(ids).toEqual(["ipa-koudo-2026-zenki", "civil2-2026-kouki", "ipa-ap-2026-zenki", "ipa-cbt-2026-pause"]);
  });

  it("only cites official first-party schedule pages", () => {
    const officialHosts = new Set(["www.ipa.go.jp", "www.jctc.jp"]);
    for (const event of HOME_EXAM_EVENTS) {
      expect(officialHosts.has(new URL(event.sourceUrl).hostname), event.id).toBe(true);
      expect(event.links.length).toBeGreaterThan(0);
      for (const link of event.links) expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("formats month/day without leading zeros", () => {
    expect(formatMonthDay("2026-10-06")).toBe("10月6日");
  });
});
