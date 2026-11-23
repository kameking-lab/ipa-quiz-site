import type { CardKind } from "./card";
import { dayNumber, latestAnswers, type AnswerAttempt, type PlanQuestion } from "@/lib/study-plan/pace";
import { jstDateString } from "@/lib/streak/core";

export function achievementKind({ passed, lap, streak, goal }: {
  passed: boolean; lap: boolean; streak: number; goal: boolean;
}): CardKind | null {
  if (passed) return "passed";
  if (lap) return "lap";
  if ([3, 7, 14, 30].includes(streak)) return "streak";
  return goal ? "goal" : null;
}

export function qualifiesForReview({ passed, streak, goalCount }: {
  passed: boolean; streak: number; goalCount: number;
}) {
  return passed || streak === 7 || goalCount >= 3;
}

export function completedDailyGoal(answers: readonly AnswerAttempt[], goal: number, today: string): boolean {
  const start = Date.parse(`${today}T00:00:00+09:00`);
  return goal > 0 && new Set(answers.filter(answer => answer.correct && answer.at >= start
    && answer.at < start + 86_400_000).map(answer => answer.id)).size >= goal;
}

export function rangeProgress(scope: readonly PlanQuestion[], attempts: readonly AnswerAttempt[], at: number, currentId?: string) {
  const current = latestAnswers(attempts, at);
  const progress = scope.reduce((count, question) => {
    const answer = current.get(question.id);
    if (answer) count.answered++;
    if (answer?.correct) count.mastered++;
    return count;
  }, { answered: 0, mastered: 0 });
  const result = { mastered: progress.mastered, total: scope.length, lap: false };
  if (!currentId || progress.answered !== scope.length || !current.get(currentId)?.correct) return result;
  const ids = new Set(scope.map(question => question.id));
  if (!ids.has(currentId)) return result;
  const firstAttempts = new Map<string, number>();
  let previousCorrect = -Infinity;
  for (const answer of attempts) {
    if (!ids.has(answer.id) || !Number.isFinite(answer.at) || answer.at > at || typeof answer.correct !== "boolean") continue;
    firstAttempts.set(answer.id, Math.min(firstAttempts.get(answer.id) ?? Infinity, answer.at));
    if (answer.correct && answer.at < at) previousCorrect = Math.max(previousCorrect, answer.at);
  }
  let completedAt = -Infinity;
  for (const first of firstAttempts.values()) completedAt = Math.max(completedAt, first);
  // A wrong answer can complete the range. Wait for the next correct answer that day.
  const start = Date.parse(`${jstDateString(new Date(at))}T00:00:00+09:00`);
  return { ...result, lap: completedAt >= start && previousCorrect < completedAt };
}

export function canOfferAchievement(firstDay: string, today: string) {
  const first = dayNumber(firstDay);
  const current = dayNumber(today);
  return first !== null && current !== null && first < current;
}
