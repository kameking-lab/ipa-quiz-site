import { describe, expect, it } from "vitest";
import { homeCalendar } from "@/lib/study-plan/home";
import { registrationTiming } from "@/lib/study-plan/countdown";
import { createPacePlan, type PacePlan } from "@/lib/study-plan/pace";
import { parseRegistration } from "@/lib/study-plan/schedule";

const today = "2026-11-17";
const sourceUrl = "https://www.ipa.go.jp/shiken/";
const plan: PacePlan = {
  ...createPacePlan({ id: "countdown", exam: "ap", sessionId: "next", examDate: "2026-12-17",
    startDate: today }, [], "2026-11-17T00:00:00+09:00"),
  registration: { label: "受験回", start: "2026-11-20", deadline: "2026-12-10",
    resultDate: null, sourceUrl, estimated: false },
};
const prior = { id: "previous", label: "2025年度 後期（CBT方式）", fiscalYear: "2025",
  scheduleStatus: "official", datePrecision: "date", examDate: "2026-02-16",
  applicationStart: "2025-12-17", applicationDeadline: "2026-01-15", sourceUrl };
const next = { id: "next", label: "令和8年度後期（日程未発表）", fiscalYear: "2026",
  scheduleStatus: "missing", datePrecision: "unknown", sourceUrl: null };
const parse = (...sessions: object[]) => parseRegistration({ id: "ap", sessions }, "ap");

describe("registration status", () => {
  it.each([
    ["2026-11-19", "before", { kind: "start", days: 1 }],
    ["2026-11-20", "open", { kind: "deadline", days: 20 }],
    ["2026-12-10", "open", { kind: "deadline", days: 0 }],
    ["2026-12-11", "closed", null],
  ])("uses inclusive registration dates on %s", (date, state, countdown) => {
    expect(registrationTiming("2026-11-20", "2026-12-10", date)).toMatchObject({ state, countdown });
  });

  it("counts down to a known deadline without assuming registration has opened", () => {
    expect(registrationTiming(null, "2026-12-10", today)).toMatchObject({
      state: "unknown", countdown: { kind: "deadline", days: 23 },
    });
    expect(registrationTiming(null, null, today)).toEqual({ state: "unknown", countdown: null });
    expect(registrationTiming("2026-11-16", null, today)).toEqual({ state: "unknown", countdown: null });
  });
});

describe("home study plan calendar", () => {
  it.each([
    [today, "start", "2026-11-20", 3, "exam", "2026-12-17"],
    ["2026-11-20", "deadline", "2026-12-10", 20, "exam", "2026-12-17"],
    ["2026-12-10", "deadline", "2026-12-10", 0, "exam", "2026-12-17"],
    ["2026-12-11", "exam", "2026-12-17", 6, "deadline", "2026-12-10"],
    ["2026-12-17", "exam", "2026-12-17", 0, "deadline", "2026-12-10"],
  ])("prioritizes the relevant date on %s and labels the other date separately", (date, kind, primaryDate, days, otherKind, otherDate) => {
    expect(homeCalendar(plan, date)).toMatchObject({
      primary: { kind, date: primaryDate, days }, secondary: { kind: otherKind, date: otherDate },
    });
  });
  it("switches to the exam when registered and keeps the deadline as a reference", () => {
    expect(homeCalendar({ ...plan, registered: true }, today)).toMatchObject({
      primary: { kind: "exam", days: 30 }, secondary: { kind: "deadline", date: "2026-12-10" },
    });
  });
  it("prioritizes a confirmed exam on its day even if registration closes that day", () => {
    expect(homeCalendar({ ...plan, examDate: "2026-12-10" }, "2026-12-10")?.primary)
      .toMatchObject({ kind: "exam", days: 0 });
  });
  it("omits the calendar after the exam or when a result is recorded", () => {
    expect(homeCalendar(plan, "2026-12-18")).toBeNull();
    expect(homeCalendar({ ...plan, result: "passed" }, today)).toBeNull();
  });
  it("uses only known dates when a date is missing", () => {
    expect(homeCalendar({ ...plan, examDate: null, registration: undefined }, today)).toBeNull();
    expect(homeCalendar({ ...plan, registration: undefined }, today)).toMatchObject({
      primary: { kind: "exam", days: 30 }, secondary: null,
    });
    expect(homeCalendar({ ...plan, examDate: null }, today)).toMatchObject({
      primary: { kind: "start", days: 3 }, secondary: { kind: "deadline", date: "2026-12-10" },
    });
    expect(homeCalendar({ ...plan, examDate: null }, "2026-11-20")).toMatchObject({
      primary: { kind: "deadline", days: 20 }, secondary: null,
    });
  });
  it.each([
    next, { ...next, scheduleStatus: "tentative", datePrecision: "month", examDate: "2027-02-01", sourceUrl },
  ])("estimates $datePrecision from the same round in the preceding fiscal year", current => {
    const sessions = parse(current, { ...prior, id: "wrong-round", label: "2025年度前期", examDate: "2025-10-20" }, prior);
    expect(homeCalendar(plan, today, sessions)).toMatchObject({
      primary: { kind: "start", days: 30, basisYear: 2025 },
      secondary: { kind: "exam", date: "2027-02-16", basisYear: 2025 },
    });
  });
  it("requires a unique, sourced prior round and omits an unavailable estimate", () => {
    for (const sessions of [
      parse(next),
      parse(next, { ...prior, label: "前期" }),
      parse(next, prior, { ...prior, id: "ambiguous" }),
      parse(next, { ...prior, fiscalYear: "2024" }),
    ]) expect(homeCalendar(plan, today, sessions)).toBeNull();
  });
  it("can use a single annual round with an annual summary in the current year", () => {
    const sessions = parse(
      { ...next, label: "令和8年度（日程未発表）" },
      { ...next, id: "ap:estimate-2026", label: "2026年ごろ［目安］", scheduleStatus: "tentative" },
      { ...prior, label: "2025年度 宅建" },
    );
    expect(homeCalendar(plan, today, sessions)?.secondary).toMatchObject({ date: "2027-02-16", basisYear: 2025 });
  });
  it("uses the saved appointment for on-demand exams and skips an estimate when scheduling data is absent", () => {
    expect(homeCalendar(plan, today, parse({ ...next, scheduleStatus: "ondemand" }))).toMatchObject({
      primary: { kind: "exam", days: 30 }, secondary: null,
    });
    const estimated = { ...plan, registration: { ...plan.registration!, estimated: true } };
    expect(homeCalendar(estimated, today)).toBeNull();
  });
});
