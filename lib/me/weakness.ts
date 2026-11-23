import type { HistoryEntry } from "@/lib/storage/history";
import { dayNumber } from "@/lib/study-plan/pace";
import { jstDateString } from "@/lib/streak/core";
import { encodeExplicitPoolIds } from "@/lib/questions/explicit-pool";

export interface WeaknessQuestionMeta {
  exam: string;
  category: string;
  topicTags: string[];
}

export interface WeaknessTopic {
  name: string;
  total: number;
  correct: number;
  distinctQuestions: number;
  accuracy: number;
  growth: number | null;
  missed: string[];
}

const dateFromDay = (day: number) => new Date(day * 86_400_000).toISOString().slice(0, 10);

export function weaknessTopicNames(question: Pick<WeaknessQuestionMeta, "category" | "topicTags">) {
  const tags = question.topicTags.map(tag => tag.trim()).filter(Boolean);
  return new Set(tags.length ? tags : [question.category.trim() || "その他"]);
}

export const weaknessMinimumQuestions = 5;
export const weaknessPracticeLimit = 730;

export function buildWeaknessTopics(entries: readonly HistoryEntry[], meta: Readonly<Record<string, WeaknessQuestionMeta>>,
  exam: string, now: Date): WeaknessTopic[] {
  const today = dayNumber(jstDateString(now))!;
  const topics = new Map<string, { total: number; correct: number; recent: number[]; prior: number[]; latest: Map<string, HistoryEntry> }>();
  for (const entry of entries) {
    const question = meta[entry.id];
    if (question?.exam !== exam || !Number.isFinite(entry.at) || entry.at < 0 || entry.at > now.getTime()) continue;
    const names = weaknessTopicNames(question);
    const age = today - dayNumber(jstDateString(new Date(entry.at)))!;
    for (const name of names) {
      const counts = topics.get(name) ?? { total: 0, correct: 0, recent: [], prior: [], latest: new Map<string, HistoryEntry>() };
      counts.total++;
      counts.correct += Number(entry.correct);
      if (age < 7) counts.recent.push(Number(entry.correct));
      else if (age < 14) counts.prior.push(Number(entry.correct));
      if ((counts.latest.get(entry.id)?.at ?? -1) <= entry.at) counts.latest.set(entry.id, entry);
      topics.set(name, counts);
    }
  }
  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
  return Array.from(topics, ([name, counts]) => ({
    name, total: counts.total, correct: counts.correct, distinctQuestions: counts.latest.size, accuracy: counts.correct / counts.total,
    growth: counts.recent.length && counts.prior.length ? mean(counts.recent) - mean(counts.prior) : null,
    missed: Array.from(counts.latest.values()).filter(entry => !entry.correct).map(entry => entry.id),
  })).sort((a, b) => a.accuracy - b.accuracy || b.total - a.total || a.name.localeCompare(b.name, "ja"));
}

export interface WeaknessPracticeQuestion { id: string; topic: string }

export function buildWeaknessPlan(topics: readonly WeaknessTopic[], today: string, examDate?: string, extra: readonly WeaknessPracticeQuestion[] = []) {
  const start = dayNumber(today), end = examDate ? dayNumber(examDate) : start === null ? null : start + 6;
  if (start === null || end === null || end < start) return [];
  const unique = new Set<string>();
  const days = end - start + 1;
  const missed = topics.flatMap(topic => topic.missed.map(id => ({ id, topic: topic.name })));
  const work = [...missed, ...extra].filter(question => {
    if (!encodeExplicitPoolIds([question.id]) || unique.has(question.id)) return false;
    unique.add(question.id);
    return true;
  });
  const fullDays = Math.floor(work.length / days), remainder = work.length % days;
  const weeks: { from: string; to: string; daily: number; minDaily?: number; counts: Map<string, number>; questionIds: string[]; questions: WeaknessPracticeQuestion[]; week: number }[] = [];
  const span = Math.ceil(days / 7);
  for (let i = 0; i < work.length; i++) {
    // Fill the earlier days with the remainder. If even one problem per day
    // isn't possible, spread the available problems through the exam week.
    const day = !fullDays
      ? work.length === 1 ? 0 : Math.round(i * (days - 1) / (work.length - 1))
      : i < remainder * (fullDays + 1) ? Math.floor(i / (fullDays + 1))
        : remainder + Math.floor((i - remainder * (fullDays + 1)) / fullDays);
    const week = Math.min(span - 1, Math.floor(day / 7));
    const { id, topic } = work[i];
    let row = weeks.at(-1);
    if (!row || row.week !== week || !encodeExplicitPoolIds([...row.questionIds, id]).split(",").includes(id)) {
      const first = week * 7, last = Math.min(days - 1, first + 6);
      const daily = fullDays + Number(first < remainder && fullDays > 0);
      row = { from: dateFromDay(start + first), to: dateFromDay(start + last),
        counts: new Map(), questionIds: [], questions: [], week, daily, ...(daily > fullDays && last >= remainder ? { minDaily: fullDays } : {}) };
      weeks.push(row);
    }
    row.questionIds.push(id);
    row.questions.push({ id, topic });
    row.counts.set(topic, (row.counts.get(topic) ?? 0) + 1);
  }
  return weeks.map(({ from, to, daily, minDaily, counts, questionIds, questions }) => ({ from, to, daily, ...(minDaily ? { minDaily } : {}), questionIds, questions,
    topics: Array.from(counts, ([name, count]) => ({ name, count })) }));
}
