import type { CardKind } from "./card";
import { dayNumber, latestAnswers, type AnswerAttempt, type PlanQuestion } from "@/lib/study-plan/pace";

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
  const previous = currentId ? latestAnswers(attempts, at - 1) : undefined;
  const around = scope.reduce((count, question) => {
    const answer = current.get(question.id);
    if (answer) count.answered++;
    if (answer?.correct) count.mastered++;
    if (previous?.has(question.id)) count.previous++;
    return count;
  }, { answered: 0, mastered: 0, previous: 0 });
  return {
    mastered: around.mastered,
    total: scope.length,
    lap: !!currentId && around.answered === scope.length && around.previous === scope.length - 1
      && scope.some(question => question.id === currentId) && !previous?.has(currentId),
  };
}

export function canOfferAchievement(firstDay: string, today: string) {
  const first = dayNumber(firstDay);
  const current = dayNumber(today);
  return first !== null && current !== null && first < current;
}
