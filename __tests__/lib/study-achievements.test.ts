import { beforeEach, describe, expect, it } from "vitest";
import { parseStudyCard, cardImagePath, cardQualification } from "@/lib/sharing/card";
import { studyCardDetails, studyCardMetadata } from "@/lib/sharing/card-metadata";
import { questionShareTitle, shareLink } from "@/lib/sharing/links";
import { achievementKind, canOfferAchievement, completedDailyGoal, qualifiesForReview, rangeProgress } from "@/lib/sharing/milestones";
import { countGoalDay, hasCardToday, reserveStudyCard } from "@/lib/sharing/milestone-storage";
import { LS_KEYS } from "@/lib/storage/keys";

const day = "2026-11-22";
const now = Date.parse(`${day}T00:00:00+09:00`);
const answer = (id: string, correct: boolean, offset = 0) => ({ id, correct, at: now + offset });
const candidate = { passed: true, lap: true, streak: 7, goal: true };
const counts = { card: "streak", mastered: "120", total: "233", streak: "7" };

beforeEach(() => localStorage.clear());

describe("milestone scheduling", () => {
  it("chooses a single milestone by priority", () => {
    expect(achievementKind(candidate)).toBe("passed");
    expect(achievementKind({ ...candidate, passed: false })).toBe("lap");
    expect(achievementKind({ ...candidate, passed: false, lap: false })).toBe("streak");
    expect(achievementKind({ ...candidate, passed: false, lap: false, streak: 100 })).toBe("goal");
    expect(achievementKind({ ...candidate, passed: false, lap: false, goal: false, streak: 6 })).toBeNull();
    for (const streak of [3, 7, 14, 30]) {
      expect(achievementKind({ passed: false, lap: false, goal: false, streak })).toBe("streak");
    }
  });

  it("counts distinct correct answers for the JST goal and detects a first lap", () => {
    const attempts = [answer("a", false, -1), answer("b", true), answer("b", true, 1)];
    expect(completedDailyGoal(attempts, 2, day)).toBe(false);
    expect(completedDailyGoal([...attempts, answer("a", true, 2)], 2, day)).toBe(true);
    const scope = ["a", "b"].map(id => ({ id, exam: "fe", year: 2026 }));
    expect(rangeProgress(scope, attempts, now, "b")).toEqual({ lap: true, mastered: 1, total: 2 });
    expect(rangeProgress(scope, attempts, now + 1, "b")).toEqual({ lap: false, mastered: 1, total: 2 });
  });

  it("waits for the next correct answer if an incorrect answer completes the lap", () => {
    const scope = ["a", "b"].map(id => ({ id, exam: "fe", year: 2026 }));
    const completed = [answer("a", true, -1), answer("b", false)];
    expect(rangeProgress(scope, completed, now, "b").lap).toBe(false);
    const retry = [...completed, answer("b", true, 1)];
    expect(rangeProgress(scope, retry, now + 1, "b").lap).toBe(true);
    expect(rangeProgress(scope, [...retry, answer("a", true, 2)], now + 2, "a").lap).toBe(false);
  });

  it("excludes the first day and counts the third daily goal only after different dates", () => {
    expect(canOfferAchievement(day, day)).toBe(false);
    expect(canOfferAchievement("2026-11-21", day)).toBe(true);
    expect(canOfferAchievement("2026-02-30", day)).toBe(false);
    expect(countGoalDay("2026-11-20")).toBe(1);
    expect(countGoalDay("2026-11-20")).toBe(1);
    expect(qualifiesForReview({ passed: false, streak: 6, goalCount: countGoalDay("2026-11-21") })).toBe(false);
    expect(qualifiesForReview({ passed: false, streak: 0, goalCount: countGoalDay(day) })).toBe(true);
    expect(qualifiesForReview({ passed: true, streak: 0, goalCount: 0 })).toBe(true);
    expect(qualifiesForReview({ passed: false, streak: 7, goalCount: 0 })).toBe(true);
    expect(qualifiesForReview({ passed: false, streak: 14, goalCount: 0 })).toBe(false);
  });

  it("suppresses a card after an install invitation and reserves the opposite order", () => {
    localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify({ shownDay: day }));
    expect(reserveStudyCard(day, true)).toBe(false);
    expect(hasCardToday(day)).toBe(false);
    localStorage.removeItem(LS_KEYS.mobileInstallNudge);
    expect(reserveStudyCard(day, true)).toBe(true);
    expect(hasCardToday(day)).toBe(true);
    expect(reserveStudyCard(day, true)).toBe(false);
    expect(hasCardToday("2026-11-23")).toBe(false);
  });
});

describe("shared card validation and links", () => {
  it("uses the qualification's canonical path and a bounded image query", () => {
    const card = parseStudyCard(new URLSearchParams(counts));
    expect(card).toEqual({ kind: "streak", mastered: 120, total: 233, streak: 7 });
    expect(cardImagePath("fe", card!)).toBe("/api/og?card=streak&mastered=120&total=233&streak=7&type=study-card&exam=fe");
    const metadata = studyCardMetadata("fe", studyCardDetails("fe", counts)!);
    expect(metadata.alternates?.canonical).toBe("/fe");
    expect(metadata.openGraph?.url?.toString()).toMatch(/\/share\/study\/fe\?card=streak&mastered=120&total=233&streak=7&utm_source=share&utm_medium=card$/);
    expect(cardQualification("survey-assistant")?.path).toBe("/e-learning/exams/qualifications/survey-assistant");
    expect(cardQualification("../fe")).toBeNull();
    expect(cardQualification("constructor")).toBeNull();
  });

  it.each([
    { total: "050" }, { total: "1e3" }, { total: "50001" }, { mastered: "234" },
    { streak: "-7" }, { streak: "8" }, { streak: "7.0" }, { card: "任意の文字列" },
  ])("rejects invalid values %j", values => {
    expect(parseStudyCard(new URLSearchParams({ ...counts, ...values }))).toBeNull();
  });

  it("rejects duplicate fields and keeps a question share title spoiler-free", () => {
    const query = new URLSearchParams(counts);
    query.append("streak", "7");
    expect(parseStudyCard(query)).toBeNull();
    expect(questionShareTitle("情報の　管理について。")).toBe("情報の 管理について。｜答えと解説");
    const url = shareLink("/e-learning/exams/test?question=2", "question");
    expect([...url.searchParams]).toEqual([["question", "2"], ["utm_source", "share"], ["utm_medium", "question"]]);
  });
});
