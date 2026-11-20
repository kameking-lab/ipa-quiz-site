import { describe, expect, it, vi } from "vitest";
import { defaultPublishedExamDate, examEndTimestamp, publishedExamSessions } from "@/lib/billing/exam-end";
import { buildWeaknessPlan, buildWeaknessTopics } from "@/lib/me/weakness";
import { parseRegistration } from "@/lib/study-plan/schedule";
import { monthlyStripeFixture } from "../billing/monthly-stripe-fixture";

describe("study plan checkout", () => {
  it("normalizes the next midnight in Japan across the year boundary", () => {
    const now = new Date("2026-12-31T00:00:00+09:00");
    expect(examEndTimestamp("2026-12-31", now)).toBe(Date.parse("2027-01-01T00:00:00+09:00") / 1000);
    expect(examEndTimestamp("2026-12-30", now)).toBeNull();
    expect(examEndTimestamp("2026-02-30", now)).toBeNull();
  });

  it("uses verified single dates and leaves a CBT range for manual entry", () => {
    const sessions = parseRegistration({ id: "fixture", sessions: [
      { id: "future", label: "第2回", examDate: "2026-12-20", scheduleStatus: "official", sourceUrl: "https://example.com/official" },
      { id: "tentative", label: "予定", examDate: "2026-12-05", scheduleStatus: "tentative", sourceUrl: "https://example.com/official" },
      { id: "range", label: "CBT", examDate: "2026-12-01", examDateEnd: "2026-12-15", scheduleStatus: "official", sourceUrl: "https://example.com/official" },
    ] }, "fixture");
    expect(publishedExamSessions(sessions, "2026-11-19").map(session => session.date)).toEqual(["2026-12-20"]);
    const choices = publishedExamSessions(sessions, "2026-11-19");
    expect(defaultPublishedExamDate(choices)?.date).toBe("2026-12-20");
    expect(defaultPublishedExamDate([...choices, { ...choices[0], key: "second-site", date: "2026-12-21" }])).toBeUndefined();
  });

  it("covers distinct venue dates with titles ending in each date from the schedule API", () => {
    const sessions = parseRegistration({ id: "denko2", sessions: [
      { id: "first-site", label: "2026年度 下期・技能（試験地指定日：12月12日）", examDate: "2026-12-12", scheduleStatus: "official", sourceUrl: "https://example.com/official" },
      { id: "second-site", label: "2026年度 下期・技能（試験地指定日：12月13日）", examDate: "2026-12-13", scheduleStatus: "official", sourceUrl: "https://example.com/official" },
    ] }, "denko2");
    const choices = publishedExamSessions(sessions, "2026-11-19", "denko2");
    expect(choices.map(choice => [choice.label, choice.date])).toEqual([
      ["2026年度 下期・技能", "2026-12-12"], ["2026年度 下期・技能", "2026-12-13"],
    ]);
    expect(defaultPublishedExamDate(choices)).toBeUndefined();
    expect(defaultPublishedExamDate(publishedExamSessions(sessions, "2026-12-13", "denko2"))?.date).toBe("2026-12-13");
  });

  it("schedules once after a verified Stripe event and retains existing access and 980-yen pricing", async () => {
    const examEndAt = Date.parse("2026-03-14T00:00:00+09:00") / 1000;
    const f = await monthlyStripeFixture({ examEndAt });
    const posts = () => vi.mocked(f.fetcher).mock.calls.filter(([, init]) => init?.method === "POST")
      .map(([, init]) => init?.body as URLSearchParams);
    expect(posts().find(body => body.has("line_items[0][price]"))?.get("subscription_data[metadata][exam_end_at]")).toBe(String(examEndAt));
    expect(await f.service.receive(f.event(), "paid", f.provider)).toBe("processed");
    expect(await f.service.receive(f.event(), "paid", f.provider)).toBe("duplicate");
    expect(posts().filter(body => body.get("cancel_at") === String(examEndAt))).toHaveLength(1);
    expect(await f.service.status("alice", f.result.orderId)).toMatchObject({
      entitled: true, subscription: { examCancelAt: "2026-03-13T15:00:00.000Z" }, purchase: { amount: 980 },
    });
  });
});

describe("weakness report", () => {
  it("orders domains by accuracy, compares two weeks, and schedules each remaining miss once", () => {
    const entries = [
      { id: "a", at: Date.parse("2026-11-08T15:00:00Z"), correct: false, selected: "イ" },
      { id: "a", at: Date.parse("2026-11-18T08:00:00Z"), correct: true, selected: "ア" },
      { id: "b", at: Date.parse("2026-11-18T08:02:00Z"), correct: false, selected: "ウ" },
    ];
    const topics = buildWeaknessTopics(entries, {
      a: { exam: "ip", topicTags: [], category: "基礎" },
      b: { exam: "ip", topicTags: ["ネットワーク", "通信"], category: "テクノロジ" },
    }, "ip", new Date("2026-11-19T10:00:00+09:00"));
    expect(topics.map(({ accuracy }) => accuracy)).toEqual([0, 0, 0.5]);
    expect(topics[2]).toMatchObject({ name: "基礎", total: 2, growth: 1, missed: [] });
    expect(buildWeaknessPlan(topics, "2026-11-19", "2026-11-19")).toEqual([{
      from: "2026-11-19", to: "2026-11-19", daily: 1, questionIds: ["b"], questions: [{ id: "b", topic: topics[0].name }],
      topics: [{ name: topics[0].name, count: 1 }],
    }]);
  });

  it("counts repeated answers once for ranking, and schedules a light review through the exam week", () => {
    const now = new Date("2026-11-19T10:00:00+09:00");
    const entries = Array.from({ length: 5 }, (_, i) => ({ id: "a", at: now.getTime() - i, correct: false, selected: "イ" }));
    const topics = buildWeaknessTopics(entries, { a: { exam: "ip", topicTags: ["通信"], category: "テクノロジ" } }, "ip", now);
    expect(topics[0]).toMatchObject({ distinctQuestions: 1, total: 5 });
    expect(buildWeaknessPlan(topics, "2026-11-19")[0]).toMatchObject({ questionIds: ["a"] });
    const longPlan = buildWeaknessPlan(topics, "2026-11-19", "2026-12-20", [{ id: "b", topic: "通信" }]);
    expect(longPlan.at(-1)).toMatchObject({ to: "2026-12-20", questionIds: ["b"] });
    const mixed = buildWeaknessPlan(topics, "2026-11-19", "2026-11-20", [{ id: "b", topic: "通信" }, { id: "c", topic: "通信" }]);
    expect(mixed[0]).toMatchObject({ minDaily: 1, daily: 2 });
  });
});
