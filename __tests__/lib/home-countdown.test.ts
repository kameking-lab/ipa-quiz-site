import { describe, expect, it } from "vitest";
import { deadlineWarning, homeCountdowns } from "@/lib/study-plan/home";
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

describe("home study plan countdowns", () => {
  it("counts calendar days and shows opening before the registration deadline", () => {
    expect(homeCountdowns(plan, today)).toMatchObject({
      exam: { days: 30 }, registration: { kind: "start", days: 3 },
    });
    expect(homeCountdowns(plan, "2026-11-20").registration).toMatchObject({ kind: "deadline", days: 20 });
    expect(deadlineWarning(plan, "2026-11-20")).toBeNull();
    expect(deadlineWarning(plan, "2026-12-09")).toEqual({ remaining: 1, urgency: "urgent" });
  });
  it("keeps the deadline through that day and hides it after closing or after registration", () => {
    expect(homeCountdowns(plan, "2026-12-10").registration).toMatchObject({ days: 0 });
    expect(homeCountdowns(plan, "2026-12-11").registration).toBeNull();
    expect(homeCountdowns({ ...plan, registered: true }, today).registration).toBeNull();
    expect(homeCountdowns(plan, "2026-12-17").exam).toMatchObject({ days: 0 });
    expect(homeCountdowns(plan, "2026-12-18").exam).toBeNull();
  });
  it.each([
    next, { ...next, scheduleStatus: "tentative", datePrecision: "month", examDate: "2027-02-01", sourceUrl },
  ])("estimates $datePrecision from the same round in the preceding fiscal year", current => {
    const sessions = parse(current, { ...prior, id: "wrong-round", label: "2025年度前期", examDate: "2025-10-20" }, prior);
    expect(homeCountdowns(plan, today, sessions)).toMatchObject({
      exam: { date: "2027-02-16", days: 91, basisYear: 2025 },
      registration: { kind: "start", days: 30, basisYear: 2025 },
    });
  });
  it("requires a unique, sourced prior round and omits an unavailable estimate", () => {
    for (const sessions of [
      parse(next),
      parse(next, { ...prior, label: "前期" }),
      parse(next, prior, { ...prior, id: "ambiguous" }),
      parse(next, { ...prior, fiscalYear: "2024" }),
    ]) expect(homeCountdowns(plan, today, sessions)).toEqual({ exam: null, registration: null });
  });
  it("can use a single annual round with an annual summary in the current year", () => {
    const sessions = parse(
      { ...next, label: "令和8年度（日程未発表）" },
      { ...next, id: "ap:estimate-2026", label: "2026年ごろ［目安］", scheduleStatus: "tentative" },
      { ...prior, label: "2025年度 宅建" },
    );
    expect(homeCountdowns(plan, today, sessions).exam).toMatchObject({ date: "2027-02-16", basisYear: 2025 });
  });
  it("uses the saved appointment for on-demand exams and skips an estimate when scheduling data is absent", () => {
    expect(homeCountdowns(plan, today, parse({ ...next, scheduleStatus: "ondemand" }))).toMatchObject({
      exam: { days: 30 }, registration: null,
    });
    const estimated = { ...plan, registration: { ...plan.registration!, estimated: true } };
    expect(homeCountdowns(estimated, today)).toEqual({ exam: null, registration: null });
  });
});
