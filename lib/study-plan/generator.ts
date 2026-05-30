import { EXAM_CONFIGS } from "@/lib/exam-config";
import {
  LEVEL_MULTIPLIERS,
  MINUTES_PER_BLOG,
  MINUTES_PER_ESSAY,
  MINUTES_PER_MOCK_FULL,
  MINUTES_PER_MOCK_SMALL,
  MINUTES_PER_QUESTION,
  PHASE_RATIOS,
  REQUIRED_HOURS,
} from "./constants";
import type {
  DailyTask,
  StudyPhase,
  StudyPlan,
  StudyPlanInput,
  StudyPlanSummary,
  TaskItem,
  TaskKind,
} from "./types";

/**
 * Returns the inclusive list of ISO date strings from `from` to `to`.
 * Both inputs are interpreted as local-time YYYY-MM-DD.
 */
export function listDates(from: string, to: string): string[] {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  if (end < start) return [];
  const out: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    out.push(formatLocalDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export function formatLocalDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayLocalDate(): string {
  return formatLocalDate(new Date());
}

export function isWeekend(isoDate: string): boolean {
  const d = new Date(`${isoDate}T00:00:00`).getDay();
  return d === 0 || d === 6;
}

function isSaturday(isoDate: string): boolean {
  return new Date(`${isoDate}T00:00:00`).getDay() === 6;
}

/** Determine the phase for `dayIndex` out of `totalDays`. */
function phaseFor(dayIndex: number, totalDays: number): StudyPhase {
  if (totalDays <= 0) return "late";
  const earlyEnd = Math.max(1, Math.floor(totalDays * PHASE_RATIOS.early));
  const middleEnd = Math.max(
    earlyEnd + 1,
    Math.floor(totalDays * (PHASE_RATIOS.early + PHASE_RATIOS.middle)),
  );
  if (dayIndex < earlyEnd) return "early";
  if (dayIndex < middleEnd) return "middle";
  return "late";
}

/**
 * Build the per-day budget (minutes) from weekday/weekend inputs.
 */
function dailyBudget(
  date: string,
  weekdayMinutes: number,
  weekendMinutes: number,
): number {
  return isWeekend(date) ? weekendMinutes : weekdayMinutes;
}

interface CategoryPlan {
  category: string;
  weight: number;
}

/**
 * Build category weighting for the exam.
 * Weak categories get +0.5 extra weight. Returns at least one category.
 */
function buildCategoryPlan(
  input: StudyPlanInput,
): CategoryPlan[] {
  const cfg = EXAM_CONFIGS[input.exam];
  const all = new Set<string>();
  for (const s of cfg.sessions) for (const c of s.categories) all.add(c);
  if (cfg.cbtSessions) {
    for (const s of cfg.cbtSessions) for (const c of s.categories) all.add(c);
  }
  const categories = Array.from(all);
  if (categories.length === 0) return [{ category: "総合演習", weight: 1 }];

  const weakSet = new Set(input.weakCategories);
  return categories.map((c) => ({
    category: c,
    weight: weakSet.has(c) ? 1.5 : 1,
  }));
}

function pickCategoryByPhase(
  categories: CategoryPlan[],
  phase: StudyPhase,
  dayIndex: number,
  weakCategories: string[],
): string {
  if (categories.length === 0) return "総合演習";
  if (phase === "early") {
    // Round-robin through every category for broad coverage.
    return categories[dayIndex % categories.length].category;
  }
  if (phase === "middle" && weakCategories.length > 0) {
    return weakCategories[dayIndex % weakCategories.length];
  }
  // Late phase or no weak categories: weighted round-robin
  const weighted: string[] = [];
  for (const c of categories) {
    const reps = Math.max(1, Math.round(c.weight * 2));
    for (let i = 0; i < reps; i++) weighted.push(c.category);
  }
  return weighted[dayIndex % weighted.length];
}

interface BuildTasksArgs {
  date: string;
  phase: StudyPhase;
  budget: number;
  exam: string;
  category: string;
  examDate: string;
}

/**
 * Build the task list for a single day.
 * Tasks are ordered so the user can stop early without losing the high-value items.
 */
function buildDayTasks(args: BuildTasksArgs): TaskItem[] {
  const { date, phase, budget, exam, category, examDate } = args;
  if (budget < 5) return [];

  const tasks: TaskItem[] = [];
  let remaining = budget;
  let idx = 0;
  const mk = (
    kind: TaskKind,
    title: string,
    estimatedMinutes: number,
    extras: Partial<TaskItem> = {},
  ): TaskItem => ({
    key: `${date}-${idx++}`,
    kind,
    title,
    estimatedMinutes,
    ...extras,
  });

  const daysToExam = daysBetween(date, examDate);

  // Late phase: mock-heavy + final review
  if (phase === "late") {
    const mockMinutes = remaining >= MINUTES_PER_MOCK_FULL
      ? MINUTES_PER_MOCK_FULL
      : MINUTES_PER_MOCK_SMALL;
    if (remaining >= MINUTES_PER_MOCK_SMALL) {
      tasks.push(
        mk(
          "mock",
          mockMinutes >= MINUTES_PER_MOCK_FULL ? "模試（80問・本番形式）" : "ミニ模試（20問）",
          Math.min(remaining, mockMinutes),
          {
            description: "本番想定の時間配分で解く。終了後に解説を必ず確認。",
            link: `/mock-exam?exam=${exam}`,
          },
        ),
      );
      remaining -= mockMinutes;
    }
    if (remaining >= 15) {
      const reviewQs = Math.max(5, Math.floor(remaining / MINUTES_PER_QUESTION));
      tasks.push(
        mk(
          "review",
          `誤答復習 ${reviewQs}問`,
          Math.min(remaining, reviewQs * MINUTES_PER_QUESTION),
          {
            description: "これまで間違えた問題のみを集中復習。",
            link: `/${exam}?mode=review`,
            category,
          },
        ),
      );
      remaining -= reviewQs * MINUTES_PER_QUESTION;
    }
    if (daysToExam <= 7 && remaining >= 10) {
      tasks.push(
        mk("blog", "直前チェックリスト記事", MINUTES_PER_BLOG, {
          description: "本番当日の持ち物・時間配分を最終確認。",
          link: "/blog",
        }),
      );
    }
    return tasks;
  }

  // Early/middle: questions first, then supporting reading
  const targetQuestionMinutes = phase === "early"
    ? Math.min(remaining, Math.floor(remaining * 0.7))
    : Math.min(remaining, Math.floor(remaining * 0.8));
  const questionCount = Math.max(
    1,
    Math.floor(targetQuestionMinutes / MINUTES_PER_QUESTION),
  );
  tasks.push(
    mk(
      "questions",
      `過去問演習 ${questionCount}問（${category}）`,
      questionCount * MINUTES_PER_QUESTION,
      {
        description:
          phase === "early"
            ? "全分野を満遍なくカバー。間違えてもOK、まずは慣れる。"
            : "弱点分野を重点演習。間違いはその場でAIに質問。",
        link: `/${exam}?mode=topic&category=${encodeURIComponent(category)}`,
        category,
      },
    ),
  );
  remaining -= questionCount * MINUTES_PER_QUESTION;

  if (remaining >= MINUTES_PER_BLOG) {
    tasks.push(
      mk("blog", `用語解説記事を1本読む`, MINUTES_PER_BLOG, {
        description: `${category} 分野の解説記事で理解を補強。`,
        link: "/blog",
      }),
    );
    remaining -= MINUTES_PER_BLOG;
  }

  // Essays are most relevant for午後/論文系 (specialist) — include for advanced/specialist exams
  const wantsEssay = ["ap", "st", "sa", "pm", "sm", "au"].includes(exam);
  if (wantsEssay && remaining >= MINUTES_PER_ESSAY) {
    tasks.push(
      mk("essay", "業種別 essay を1本読む", MINUTES_PER_ESSAY, {
        description: "実際の業務シーンを通じて応用力を養う。",
        link: "/essays",
      }),
    );
    remaining -= MINUTES_PER_ESSAY;
  }

  // Weekly mini-mock on Saturdays in the middle phase — once a week, always on a
  // weekend, regardless of which weekday the plan starts on. (The previous
  // `dayIndex % 7 === 0` guard landed on the same weekday as day 0, so the mock
  // only ever appeared when the plan happened to start on a weekend.)
  if (
    phase === "middle" &&
    isSaturday(date) &&
    remaining >= MINUTES_PER_MOCK_SMALL
  ) {
    tasks.push(
      mk("mock", "週末ミニ模試（20問）", MINUTES_PER_MOCK_SMALL, {
        description: "週末の総まとめ。実力推移を可視化。",
        link: `/mock-exam?exam=${exam}`,
      }),
    );
  }

  return tasks;
}

function daysBetween(fromIso: string, toIso: string): number {
  const a = new Date(`${fromIso}T00:00:00`);
  const b = new Date(`${toIso}T00:00:00`);
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function generateStudyPlan(input: StudyPlanInput): StudyPlan {
  const today = todayLocalDate();
  const dates = listDates(today, input.examDate);
  // Drop the exam date itself — it's the test day, not a study day.
  const studyDates = dates.length > 0 ? dates.slice(0, -1) : [];

  const totalDays = studyDates.length;
  const categories = buildCategoryPlan(input);

  const requiredHours =
    REQUIRED_HOURS[input.exam] * LEVEL_MULTIPLIERS[input.level];

  const totalAvailableMinutes = studyDates.reduce(
    (sum, d) => sum + dailyBudget(d, input.weekdayMinutes, input.weekendMinutes),
    0,
  );
  const availableHours = totalAvailableMinutes / 60;
  const coveragePercent =
    requiredHours > 0
      ? Math.round((availableHours / requiredHours) * 100)
      : 100;

  const daily: DailyTask[] = studyDates.map((date, dayIndex) => {
    const phase = phaseFor(dayIndex, totalDays);
    const budget = dailyBudget(date, input.weekdayMinutes, input.weekendMinutes);
    const category = pickCategoryByPhase(
      categories,
      phase,
      dayIndex,
      input.weakCategories,
    );
    const tasks = buildDayTasks({
      date,
      phase,
      budget,
      exam: input.exam,
      category,
      examDate: input.examDate,
    });
    return {
      date,
      phase,
      isWeekend: isWeekend(date),
      budgetMinutes: budget,
      tasks,
    };
  });

  const summary: StudyPlanSummary = {
    totalHoursRequired: Math.round(requiredHours),
    totalHoursAvailable: Math.round(availableHours),
    daysRemaining: totalDays,
    coveragePercent,
    focusedCategories: input.weakCategories,
  };

  return {
    id: generatePlanId(input),
    createdAt: new Date().toISOString(),
    input,
    summary,
    daily,
  };
}

function generatePlanId(input: StudyPlanInput): string {
  const slug = `${input.exam}-${input.examDate}`;
  const rnd = Math.random().toString(36).slice(2, 8);
  return `${slug}-${rnd}`;
}
