/** The v2 meter is mastery, independent of activity minutes and study-hour estimates. */
export interface PlanQuestion { id: string; exam: string; year: number }
export interface AnswerAttempt { id: string; correct: boolean; at: number }
export interface RangeSnapshot {
  questionIds: string[];
  years: number[];
  initialCount: number;
  capturedOn: string;
  lastExpansionWeek: string;
  graceUntil: string | null;
}
export interface PacePlan {
  kind: "exam-pace-v1";
  id: string;
  exam: string;
  sessionId: string | null;
  examDate: string | null;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  range: RangeSnapshot;
}
const DAY = 86_400_000;
export function dayNumber(date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const ms = Date.parse(`${date}T00:00:00Z`);
  return Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 10) === date ? ms / DAY : null;
}
export function weekStart(date: string): string {
  const day = dayNumber(date);
  if (day === null) throw new Error("invalid_date");
  return new Date((day - ((new Date(day * DAY).getUTCDay() + 6) % 7)) * DAY).toISOString().slice(0, 10);
}
/** <=500: all available years; otherwise latest five distinct publication/exam years. */
export function recommendedRange(questions: readonly PlanQuestion[], exam: string): PlanQuestion[] {
  const unique = [...new Map(questions.filter(q => q.exam === exam).map(q => [q.id, q])).values()];
  const years = [...new Set(unique.map(q => q.year))].sort((a, b) => b - a);
  const selected = new Set(unique.length <= 500 ? years : years.slice(0, 5));
  return unique.filter(q => selected.has(q.year));
}
export function createPacePlan(
  input: Pick<PacePlan, "id" | "exam" | "examDate" | "sessionId" | "startDate">,
  questions: readonly PlanQuestion[], now: string,
): PacePlan {
  if (!input.id || !input.exam || dayNumber(input.startDate) === null ||
    (input.examDate !== null && dayNumber(input.examDate) === null) || !Number.isFinite(Date.parse(now))) {
    throw new Error("invalid_plan");
  }
  const range = recommendedRange(questions, input.exam);
  const capturedOn = new Date(Date.parse(now) + 9 * 3_600_000).toISOString().slice(0, 10);
  return { ...input, kind: "exam-pace-v1", createdAt: now, updatedAt: now,
    range: { questionIds: range.map(q => q.id), years: [...new Set(range.map(q => q.year))].sort((a, b) => b - a),
      initialCount: range.length, capturedOn, lastExpansionWeek: weekStart(capturedOn), graceUntil: null } };
}
/** Only initially thin plans expand, at most once per calendar week. No removals. */
export function refreshThinRange(plan: PacePlan, questions: readonly PlanQuestion[], today: string): PacePlan {
  const week = weekStart(today);
  if (plan.range.initialCount >= 200 || week <= plan.range.lastExpansionWeek) return plan;
  const ids = [...new Set([...plan.range.questionIds, ...recommendedRange(questions, plan.exam).map(q => q.id)])];
  const added = ids.length > plan.range.questionIds.length;
  return { ...plan, updatedAt: `${today}T00:00:00+09:00`, range: { ...plan.range, questionIds: ids,
    lastExpansionWeek: week, graceUntil: added ? new Date((dayNumber(week)! + 7) * DAY).toISOString().slice(0, 10) : plan.range.graceUntil } };
}
export function latestAnswers(attempts: readonly AnswerAttempt[], before = Infinity): Map<string, AnswerAttempt> {
  const latest = new Map<string, AnswerAttempt>();
  for (const entry of attempts) {
    if (!Number.isFinite(entry.at) || entry.at > before) continue;
    const previous = latest.get(entry.id);
    if (!previous || entry.at >= previous.at) latest.set(entry.id, entry);
  }
  return latest;
}
export function mastery(questionIds: readonly string[], attempts: readonly AnswerAttempt[], before = Infinity) {
  const latest = latestAnswers(attempts, before);
  const ids = new Set(questionIds);
  const mastered = [...ids].filter(id => latest.get(id)?.correct).length;
  return { mastered, total: ids.size, percent: ids.size ? mastered * 100 / ids.size : 0 };
}
export function calculatePace(plan: PacePlan, attempts: readonly AnswerAttempt[], today: string) {
  const day = dayNumber(today), start = dayNumber(plan.startDate);
  if (day === null || start === null) throw new Error("invalid_date");
  // End of the Japanese calendar day; future-dated imported records do not count.
  const cutoff = (day + 1) * DAY - 9 * 3_600_000 - 1;
  const actual = mastery(plan.range.questionIds, attempts, cutoff);
  const exam = plan.examDate === null ? null : dayNumber(plan.examDate);
  const daysRemaining = exam === null ? null : exam - day;
  const idealPercent = exam === null ? null : exam <= start ? (day >= exam ? 100 : 0)
    : Math.max(0, Math.min(100, (day - start) / (exam - start) * 100));
  const differencePoints = idealPercent === null ? null : actual.percent - idealPercent;
  const grace = plan.range.graceUntil !== null && today < plan.range.graceUntil && today >= plan.range.lastExpansionWeek;
  const judgment = differencePoints === null ? "unscheduled" : differencePoints > 5 + 1e-9 ? "ahead"
    : differencePoints < -5 - 1e-9 && !grace ? "behind" : "on-track";
  const windowDays = Math.max(0, Math.min(14, day - start));
  const baseline = mastery(plan.range.questionIds, attempts, cutoff - windowDays * DAY);
  const gainPerDay = windowDays ? (actual.mastered - baseline.mastered) / windowDays : null;
  const forecastPercent = exam === null || daysRemaining! < 0 || actual.total === 0 ? null
    : daysRemaining === 0 ? actual.percent : gainPerDay === null ? null
    : Math.max(0, Math.min(100, (actual.mastered + gainPerDay * daysRemaining!) / actual.total * 100));
  const remaining = actual.total - actual.mastered;
  const requiredQuestionsPerDay = remaining === 0 ? 0 : daysRemaining === null || daysRemaining < 0 ? null
    : Math.ceil(remaining / Math.max(1, daysRemaining));
  return { ...actual, daysRemaining, idealPercent, differencePoints, judgment, forecastPercent,
    requiredQuestionsPerDay, gainPerDay, grace };
}
/** Caller supplies its already-authorized daily allowance; this never changes quotas. */
export function selectTodayQuestions(plan: PacePlan, catalog: readonly PlanQuestion[], attempts: readonly AnswerAttempt[],
  limit: number, dueIds: readonly string[] = [], resumeId?: string): string[] {
  const count = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 0;
  if (!count) return [];
  const available = catalog.filter(q => q.exam === plan.exam);
  const allowed = new Set([...plan.range.questionIds, ...recommendedRange(available, plan.exam).map(q => q.id)]);
  const ids = [...new Set(available.filter(q => allowed.has(q.id)).map(q => q.id))];
  const latest = latestAnswers(attempts);
  const solved = ids.filter(id => latest.get(id)?.correct);
  const unsolved = new Set(ids.filter(id => !latest.get(id)?.correct));
  const work = [...new Set([...dueIds, ...(resumeId ? [resumeId] : []), ...ids])].filter(id => unsolved.has(id));
  // Keep the batch full for all-correct banks, while preserving the 10% mix when work remains.
  const confirmations = Math.min(solved.length, Math.max(Math.round(count / 10), count - work.length));
  const checks = solved.sort((a, b) => (latest.get(a)?.at ?? 0) - (latest.get(b)?.at ?? 0)).slice(0, confirmations);
  const result = work.slice(0, count - checks.length);
  checks.forEach((id, index) => result.splice(Math.min((index + 1) * 10 - 1, result.length), 0, id));
  return result;
}
