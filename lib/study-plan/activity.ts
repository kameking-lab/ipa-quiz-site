import type { QuestionType } from "@/lib/questions/types";

export interface LearningAction {
  id: string;
  questionId: string;
  exam: string;
  at: number;
  kind: "answer" | "ai-question" | "explanation-read";
  /** Visible time on the question. Wall-clock idle time is never used. */
  activeMs?: number;
  questionType?: QuestionType;
  correct?: boolean;
}
/** Product scoring weights, not claimed official exam/study times. Unknown types use 3. */
export const STANDARD_ANSWER_MINUTES: Record<QuestionType, number> = {
  "multiple-choice": 3, ordering: 3, numeric: 3, "native-b": 6, descriptive: 15, essay: 30,
};
export function japanDate(at: number): string {
  return new Date(at + 9 * 3_600_000).toISOString().slice(0, 10);
}
export function mergeLearningActions(...sets: readonly (readonly LearningAction[])[]): LearningAction[] {
  const unique = new Map<string, LearningAction>();
  for (const actions of sets) for (const action of actions) {
    if (!action.id || !action.questionId || !action.exam || !Number.isFinite(action.at)) continue;
    // Immutable event ids: deterministic even if malformed imports reuse one.
    const existing = unique.get(action.id);
    if (!existing || JSON.stringify(action) < JSON.stringify(existing)) unique.set(action.id, action);
  }
  return [...unique.values()].sort((a, b) => a.at - b.at || a.id.localeCompare(b.id));
}
export interface DailyLearningPoints { date: string; minutes: number; answers: number; aiQuestions: number; explanations: number }
export function dailyLearningPoints(actions: readonly LearningAction[], exam?: string): DailyLearningPoints[] {
  const days = new Map<string, DailyLearningPoints>();
  const aiCounts = new Map<string, number>();
  const explanations = new Set<string>();
  for (const action of mergeLearningActions(actions)) {
    if (exam && action.exam !== exam) continue;
    const date = japanDate(action.at);
    let minutes = 0;
    if (action.kind === "answer" && Number.isFinite(action.activeMs) && action.activeMs! >= 5000) {
      minutes = STANDARD_ANSWER_MINUTES[action.questionType ?? "multiple-choice"] ?? 3;
    } else if (action.kind === "ai-question") {
      const count = aiCounts.get(action.questionId) ?? 0;
      aiCounts.set(action.questionId, count + 1);
      if (count < 2) minutes = 2;
    } else if (action.kind === "explanation-read") {
      // Re-opening/scrolling the same explanation cannot farm points that day.
      const key = `${date}:${action.questionId}`;
      if (!explanations.has(key)) minutes = 1;
      explanations.add(key);
    }
    if (!minutes) continue;
    const day = days.get(date) ?? { date, minutes: 0, answers: 0, aiQuestions: 0, explanations: 0 };
    day.minutes += minutes;
    if (action.kind === "answer") day.answers++;
    if (action.kind === "ai-question") day.aiQuestions++;
    if (action.kind === "explanation-read") day.explanations++;
    days.set(date, day);
  }
  return [...days.values()].sort((a, b) => a.date.localeCompare(b.date));
}
/** No timer writes points; only an explicit action consumes this visible-time clock. */
export function createActiveClock(now: () => number, initiallyVisible: boolean) {
  let visible = initiallyVisible, since = now(), elapsed = 0;
  return {
    setVisible(next: boolean) {
      const time = now();
      if (visible) elapsed += Math.max(0, time - since);
      visible = next; since = time;
    },
    milliseconds() { return elapsed + (visible ? Math.max(0, now() - since) : 0); },
  };
}
