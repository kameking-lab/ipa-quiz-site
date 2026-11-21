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
  registration?: { label: string; start: string | null; deadline: string | null; resultDate: string | null; sourceUrl: string | null; estimated: boolean };
  registered?: boolean;
  result?: "passed" | "failed" | "absent";
  studyWeekdays?: number[];
  studyMinutes?: { weekday: number; holiday: number };
}
const DAY = 86_400_000;
const JST_OFFSET = 9 * 3_600_000;
export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6] as const;

export function dayNumber(date: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const ms = Date.parse(date + "T00:00:00Z");
  return Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 10) === date ? ms / DAY : null;
}

export function orderedPlanQuestions<T extends PlanQuestion>(questions: readonly T[], exam: string): T[] {
  const sorted = questions.filter(q => q.exam === exam).sort((a, b) => b.year - a.year);
  const seen = new Set<string>();
  return sorted.filter(q => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}

export function rangeOptions(catalog: readonly PlanQuestion[], exam: string) {
  const questions = orderedPlanQuestions(catalog, exam);
  const years = [...new Set(questions.map(q => q.year))];
  if (!years.length) return [];
  return [...new Set([Math.min(5, years.length), Math.min(10, years.length)])].map(count => {
    const oldestYear = years[count - 1];
    return { oldestYear, count, total: questions.filter(q => q.year >= oldestYear).length,
      all: count === years.length && years.length < 10,
      recommended: count === (years.length < 10 ? years.length : 5) };
  });
}

export function planOldestYear(plan: PacePlan, catalog: readonly PlanQuestion[]): number | null {
  if (plan.range.years.length) return Math.min(...plan.range.years);
  const previousIds = new Set(plan.range.questionIds);
  const matching = catalog.filter(q => q.exam === plan.exam && previousIds.has(q.id));
  return matching.length ? Math.min(...matching.map(q => q.year)) : null;
}

export function createPacePlan(
  input: Pick<PacePlan, "id" | "exam" | "examDate" | "sessionId" | "startDate" | "studyWeekdays">,
  catalog: readonly PlanQuestion[], now: string, oldestYear = rangeOptions(catalog, input.exam).find(option => option.recommended)?.oldestYear,
): PacePlan {
  if (!input.id || !input.exam || dayNumber(input.startDate) === null ||
    (input.examDate !== null && dayNumber(input.examDate) === null) || !Number.isFinite(Date.parse(now))) {
    throw new Error("invalid_plan");
  }
  const capturedOn = new Date(Date.parse(now) + JST_OFFSET).toISOString().slice(0, 10);
  // This shape is still read by older clients. The current range depends on the lower year only.
  const questions = orderedPlanQuestions(catalog, input.exam).filter(q => oldestYear !== undefined && q.year >= oldestYear);
  const years = [...new Set(questions.map(q => q.year))];
  if (oldestYear !== undefined && !years.includes(oldestYear)) years.push(oldestYear);
  return { ...input, kind: "exam-pace-v1", createdAt: now, updatedAt: now,
    range: { questionIds: questions.map(q => q.id), years, initialCount: questions.length,
      capturedOn, lastExpansionWeek: capturedOn, graceUntil: null } };
}

export function latestAnswers(attempts: readonly AnswerAttempt[], before = Date.now()): Map<string, AnswerAttempt> {
  const latest = new Map<string, AnswerAttempt>();
  for (const entry of attempts) {
    if (!Number.isFinite(entry.at) || entry.at > before || typeof entry.correct !== "boolean") continue;
    const previous = latest.get(entry.id);
    if (!previous || entry.at > previous.at || (entry.at === previous.at && !entry.correct)) latest.set(entry.id, entry);
  }
  return latest;
}

export function weakQuestionStatus(id: string, latest: ReadonlyMap<string, AnswerAttempt>, starred: ReadonlySet<string>) {
  const incorrect = latest.get(id)?.correct === false;
  const marked = starred.has(id);
  return { incorrect, marked, weak: incorrect || marked };
}

export function weakQuestions<T extends PlanQuestion>(catalog: readonly T[], exam: string,
  attempts: readonly AnswerAttempt[], starred: readonly string[], now = Date.now()) {
  const latest = latestAnswers(attempts, now);
  const marks = new Set(starred);
  return orderedPlanQuestions(catalog, exam).flatMap(question => {
    const status = weakQuestionStatus(question.id, latest, marks);
    return status.weak ? [{ question, ...status }] : [];
  });
}

function weekday(day: number) { return ((day + 4) % 7 + 7) % 7; }

export function calculatePace(plan: PacePlan, catalog: readonly PlanQuestion[], attempts: readonly AnswerAttempt[],
  today: string, now = Date.now()) {
  const day = dayNumber(today);
  if (day === null) throw new Error("invalid_date");
  const oldestYear = planOldestYear(plan, catalog);
  const questions = oldestYear === null ? [] : orderedPlanQuestions(catalog, plan.exam).filter(q => q.year >= oldestYear);
  const latest = latestAnswers(attempts, now);
  const incorrect: string[] = [], unanswered: string[] = [];
  for (const q of questions) {
    const answer = latest.get(q.id);
    if (!answer) unanswered.push(q.id);
    else if (!answer.correct) incorrect.push(q.id);
  }
  const remainingIds = incorrect.concat(unanswered);
  const total = questions.length;
  const remaining = remainingIds.length;
  const mastered = total - remaining;
  const exam = plan.examDate === null ? null : dayNumber(plan.examDate);
  const daysRemaining = exam === null ? null : exam - day;
  const weekdays = plan.studyWeekdays ?? EVERY_DAY;
  let studyDays = 0, nextWeekday: number | null = null;
  if (daysRemaining !== null && daysRemaining > 0) {
    studyDays = Math.floor(daysRemaining / 7) * weekdays.length;
    for (let offset = 0; offset < Math.min(7, daysRemaining); offset++) {
      const currentWeekday = weekday(day + offset);
      if (!weekdays.includes(currentWeekday)) continue;
      if (nextWeekday === null) nextWeekday = currentWeekday;
      if (offset < daysRemaining % 7) studyDays++;
    }
  }
  return { oldestYear, total, mastered, remaining, remainingIds, daysRemaining, studyDays, nextWeekday,
    scheduledToday: weekdays.includes(weekday(day)), complete: total > 0 && remaining === 0,
    target: remaining > 0 && studyDays > 0 ? Math.ceil(remaining / studyDays) : null };
}
