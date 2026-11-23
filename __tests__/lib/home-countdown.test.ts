import { describe, expect, it } from "vitest";
import { homeCalendar } from "@/lib/study-plan/home";
import { planCountdownDates, registrationTiming, withConfirmedExamDay } from "@/lib/study-plan/countdown";
import { createPacePlan, type PacePlan } from "@/lib/study-plan/pace";
import { parseRegistration } from "@/lib/study-plan/schedule";

const today = "2026-11-17";
const sourceUrl = "https://www.ipa.go.jp/shiken/";
const plan: PacePlan = {
  ...createPacePlan({ id: "countdown", exam: "ap", sessionId: "next", examDate: "2026-12-17",
    examDateSource: "manual", startDate: today }, [], "2026-11-17T00:00:00+09:00"),
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
  it("switches to the exam and marks registration complete", () => {
    expect(homeCalendar({ ...plan, registered: true }, today)).toMatchObject({
      primary: { kind: "exam", days: 30 }, secondary: { kind: "registered" },
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
    expect(homeCalendar({ ...plan, examDate: null }, today, sessions)).toMatchObject({
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
    ]) expect(homeCalendar({ ...plan, examDate: null }, today, sessions)).toBeNull();
  });
  it("can use a single annual round with an annual summary in the current year", () => {
    const sessions = parse(
      { ...next, label: "令和8年度（日程未発表）" },
      { ...next, id: "ap:estimate-2026", label: "2026年ごろ［目安］", scheduleStatus: "tentative" },
      { ...prior, label: "2025年度 宅建" },
    );
    expect(homeCalendar({ ...plan, examDate: null }, today, sessions)?.secondary)
      .toMatchObject({ date: "2027-02-16", basisYear: 2025 });
  });
  it("marks only the registration date as estimated when an exam date is saved", () => {
    const sessions = parse(next, prior);
    const examDate = "2027-01-15";
    expect(homeCalendar({ ...plan, examDate }, "2027-01-14", sessions)).toEqual({
      primary: { kind: "deadline", date: examDate, days: 1, basisYear: 2025 },
      secondary: { kind: "exam", date: examDate, days: 1, basisYear: undefined, examDateSource: "manual" },
    });
    expect(homeCalendar({ ...plan, examDate }, examDate, sessions)).toEqual({
      primary: { kind: "exam", date: examDate, days: 0, basisYear: undefined, examDateSource: "manual" },
      secondary: { kind: "deadline", date: examDate, basisYear: 2025 },
    });
  });
  it("uses the saved appointment for on-demand exams", () => {
    expect(homeCalendar(plan, today, parse({ ...next, scheduleStatus: "ondemand" }))).toMatchObject({
      primary: { kind: "exam", days: 30 }, secondary: null,
    });
  });
  it("uses the saved exam even when it cannot estimate the registration dates", () => {
    const saved = { ...plan, registration: { ...plan.registration!, estimated: true } };
    const examEve = "2026-12-16";
    for (const sessions of [[], parse(next)]) {
      expect(homeCalendar(saved, examEve, sessions)).toEqual({
        primary: { kind: "exam", date: saved.examDate, days: 1, basisYear: undefined, examDateSource: "manual" }, secondary: null,
      });
      expect(homeCalendar(saved, saved.examDate!, sessions)).toEqual({
        primary: { kind: "exam", date: saved.examDate, days: 0, basisYear: undefined, examDateSource: "manual" }, secondary: null,
      });
    }
  });
  it("keeps a copied tentative date distinct from both an application estimate and a legacy date", () => {
    const sessions = parse({ ...next, scheduleStatus: "tentative", datePrecision: "date", examDate: plan.examDate, sourceUrl }, prior);
    const tentative = { ...plan, examDateSource: "tentative" as const };
    expect(homeCalendar(tentative, "2026-12-17", sessions)).toMatchObject({
      primary: { kind: "exam", date: "2026-12-17", days: 0, examDateSource: "tentative", basisYear: undefined },
      secondary: { kind: "deadline", date: "2027-01-15", basisYear: 2025 },
    });
    expect(homeCalendar({ ...tentative, examDateSource: undefined }, "2026-12-17", sessions)?.primary)
      .toMatchObject({ kind: "exam", date: "2026-12-17", days: 0, examDateSource: undefined });
  });
});

describe("dates shared by the home and plan details", () => {
  it("estimates an application date independently of a confirmed exam and leaves the missing field blank", () => {
    const sessions = parse({ ...next, scheduleStatus: "official", datePrecision: "date", examDate: plan.examDate,
      applicationEstimated: true, sourceUrl }, { ...prior, applicationStart: null });
    const saved = { ...plan, examDateSource: "official" as const };
    expect(planCountdownDates(saved, sessions[0], sessions)).toMatchObject({
      examDate: plan.examDate, examDateSource: "official", examBasisYear: undefined,
      applicationStart: null, applicationDeadline: "2027-01-15", applicationBasisYear: 2025,
    });
    expect(planCountdownDates(saved, sessions[0], sessions.slice(0, 1))).toMatchObject({
      applicationStart: undefined, applicationDeadline: undefined, applicationBasisYear: undefined,
    });
  });
});

describe("a saved plan without an exam date", () => {
  const saved = { ...plan, examDate: null };
  const fixed = { ...prior, id: plan.sessionId, examDate: "2026-12-17" };

  it("uses a sourced single official exam day for the selected round", () => {
    const [session] = parse(fixed);
    expect(withConfirmedExamDay(saved, today, session)).toMatchObject({ examDate: fixed.examDate, examDateSource: "official" });
    expect(withConfirmedExamDay(plan, today, { ...session, examDate: "2026-12-18" })).toBe(plan);
  });

  it.each([
    { id: "another-round" },
    { datePrecision: "month" },
    { examDateEnd: "2026-12-18" },
    { examPhaseWindows: [{ label: "試験", start: "2026-12-17", end: "2026-12-17" }] },
    { scheduleStatus: "ondemand" },
    { scheduleStatus: "tentative" },
    { examDate: "2026-11-16" },
  ])("leaves the date unset for %j", patch => {
    const [session] = parse({ ...fixed, ...patch });
    expect(withConfirmedExamDay(saved, today, session)).toBe(saved);
  });
});

describe("a saved plan with a provisional exam date", () => {
  const [session] = parse({ ...prior, id: plan.sessionId, examDate: "2026-12-05" });

  it.each(["tentative", "estimated"] as const)("uses the official day after the saved %s date has passed", source => {
    const saved = { ...plan, examDate: "2026-11-28", examDateSource: source };
    expect(withConfirmedExamDay(saved, "2026-11-29", session)).toMatchObject({ examDate: "2026-12-05", examDateSource: "official" });
    expect(withConfirmedExamDay(saved, "2026-12-06", session)).toMatchObject({ examDate: "2026-12-05", examDateSource: "official" });
    expect(saved.examDate).toBe("2026-11-28");
  });

  it("keeps saved dates with protected sources and plans with recorded results", () => {
    const saved = { ...plan, examDate: "2026-11-28" };
    for (const candidate of [saved, { ...saved, examDateSource: "official" as const }, { ...saved, examDateSource: undefined },
      { ...saved, examDateSource: "tentative" as const, result: "passed" as const }]) {
      expect(withConfirmedExamDay(candidate, "2026-11-29", session)).toBe(candidate);
    }
  });

  it("requires the same round and a single sourced official day", () => {
    const saved = { ...plan, examDateSource: "tentative" as const };
    for (const candidate of [undefined, { ...session, id: "another-round" }, { ...session, sourceUrl: null },
      { ...session, scheduleStatus: "tentative" as const }, { ...session, examDateEnd: "2026-12-06" }]) {
      expect(withConfirmedExamDay(saved, today, candidate)).toBe(saved);
    }
  });
});
