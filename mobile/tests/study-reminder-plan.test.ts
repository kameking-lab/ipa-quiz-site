import { describe, expect, it } from "vitest";
import { createPacePlan, latestAnswers } from "@/lib/study-plan/pace";
import {
  canRemindForPlan, studyReminderNotifications, studyReminderPlan, studyReminderTap,
  type StudyReminderPlan, type StudyReminderSetting,
} from "../shared/study-reminder-plan";

const now = new Date(2026, 10, 23, 10); // Monday, in the device's timezone.
const plan: StudyReminderPlan = { id: "example", examDate: "2026-12-14", startDate: "2026-11-23", weekdays: [1, 3], remaining: 60 };
const setting = (changes: Partial<StudyReminderPlan> = {}): StudyReminderSetting => ({ id: plan.id, time: "20:00", plan: { ...plan, ...changes } });

describe("study reminder schedule", () => {
  it("schedules the selected weekdays at the chosen local time within 14 days", () => {
    const notifications = studyReminderNotifications([setting()], now);
    expect(notifications.map(item => [item.id, item.schedule.at])).toEqual([
      [12000, new Date(2026, 10, 23, 20)], [12001, new Date(2026, 10, 25, 20)],
      [12002, new Date(2026, 10, 30, 20)], [12003, new Date(2026, 11, 2, 20)],
    ]);
    expect(notifications[0]).toEqual({
      id: 12000, title: "過去問AIの学習計画", body: "今日の目安 10問。チワワが待ってます",
      schedule: { at: new Date(2026, 10, 23, 20), repeats: false }, extra: { kind: "study-plan", planId: "example" },
    });
  });

  it("rolls the window forward when today's notification time has passed", () => {
    const everyDay = setting({ weekdays: [0, 1, 2, 3, 4, 5, 6], examDate: "2026-12-21" });
    const notifications = studyReminderNotifications([everyDay], new Date(2026, 10, 23, 20));
    expect(notifications).toHaveLength(14);
    expect(notifications[0].schedule.at).toEqual(new Date(2026, 10, 24, 20));
    expect(notifications.at(-1)?.schedule.at).toEqual(new Date(2026, 11, 7, 20));
  });

  it("adds one reminder on each exam milestone even on non-study days", () => {
    const notifications = studyReminderNotifications([setting({ examDate: "2026-12-06", weekdays: [1] })], now);
    expect(notifications.map(({ body, schedule }) => [schedule.at, body])).toEqual([
      [new Date(2026, 10, 23, 20), "今日の目安 30問。チワワが待ってます"],
      [new Date(2026, 10, 29, 20), "試験まであと7日。"],
      [new Date(2026, 10, 30, 20), "今日の目安 30問。チワワが待ってます"],
      [new Date(2026, 11, 5, 20), "明日は試験です。"],
    ]);
  });

  it("honors the plan start and excludes exam day, expired, disabled, and absent plans", () => {
    const startsLater = setting({ startDate: "2026-11-25", examDate: "2026-11-30" });
    expect(studyReminderNotifications([startsLater], now).map(item => item.schedule.at)).toEqual([
      new Date(2026, 10, 23, 20), new Date(2026, 10, 25, 20), new Date(2026, 10, 29, 20),
    ]); // The first date is the 7-day milestone, outside the study dates.
    expect(studyReminderNotifications([setting({ examDate: "2026-11-23" }), setting({ examDate: "2026-11-22" }),
      { id: "off", time: "20:00", plan: null }], now)).toEqual([]);
    expect(studyReminderNotifications([], now)).toEqual([]);
    expect(canRemindForPlan({ examDate: null }, now)).toBe(false);
  });

  it("fits the device's pending notification limit and keeps earliest dates first", () => {
    const settings = Array.from({ length: 10 }, (_, index) => {
      const id = `plan-${index}`;
      return { id, time: "20:00", plan: { ...plan, id, weekdays: [0, 1, 2, 3, 4, 5, 6] } };
    });
    const notifications = studyReminderNotifications(settings, now, 3);
    expect(notifications).toHaveLength(61);
    expect(notifications.at(-1)?.id).toBe(12060);
    expect(notifications.at(-1)?.schedule.at).toEqual(new Date(2026, 10, 29, 20));
    expect(studyReminderNotifications(settings, now)).toHaveLength(63);
  });

  it("uses the last answer for each saved question and preserves every-day legacy plans", () => {
    const pacePlan = createPacePlan({ id: "example", exam: "ap", examDate: plan.examDate, startDate: plan.startDate, sessionId: null },
      [{ id: "a", exam: "ap", year: 2026 }, { id: "b", exam: "ap", year: 2026 }], now.toISOString());
    const answers = latestAnswers([
      { id: "a", at: now.getTime() - 5, correct: false }, { id: "a", at: now.getTime(), correct: true },
    ], now.getTime());
    const snapshot = studyReminderPlan(pacePlan, answers, now);
    expect(snapshot).toMatchObject({ weekdays: [0, 1, 2, 3, 4, 5, 6], remaining: 1 });
    expect(studyReminderPlan({ ...pacePlan, examDate: null }, answers, now)).toBeNull();
    expect(studyReminderPlan({ ...pacePlan, result: "passed" }, answers, now)).toBeNull();
  });
});

it("makes an internal plan quiz route only for a tap on a study notification", () => {
  const extra = { kind: "study-plan", planId: "a#b&c" };
  expect(studyReminderTap("tap", { id: 12000, extra })).toEqual({ planId: "a#b&c", path: "/quiz/today?plan=a%23b%26c" });
  expect(studyReminderTap("dismiss", { id: 12000, extra })).toBeNull();
  expect(studyReminderTap("tap", { id: 11003, extra })).toBeNull();
  expect(studyReminderTap("tap", { id: 12000, extra: { destination: "https://example.test" } })).toBeNull();
});
