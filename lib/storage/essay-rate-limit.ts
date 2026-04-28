/**
 * 論述添削の月次レート制限（クライアント側）。
 *
 * Free: 月3回
 * Premium: 無制限
 */

const LS_KEY = "ipa-quiz:essay-grading-usage:v1";

export const FREE_ESSAY_LIMIT_PER_MONTH = 3;

interface MonthlyUsage {
  /** "YYYY-MM" 形式（JST） */
  yearMonth: string;
  count: number;
}

function jstYearMonth(d: Date = new Date()): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 7);
}

export function readEssayUsage(): MonthlyUsage {
  if (typeof window === "undefined") return { yearMonth: jstYearMonth(), count: 0 };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { yearMonth: jstYearMonth(), count: 0 };
    const parsed = JSON.parse(raw) as MonthlyUsage;
    const current = jstYearMonth();
    if (parsed.yearMonth !== current) return { yearMonth: current, count: 0 };
    return parsed;
  } catch {
    return { yearMonth: jstYearMonth(), count: 0 };
  }
}

export function incrementEssayUsage(): MonthlyUsage {
  const current = readEssayUsage();
  const next: MonthlyUsage = { yearMonth: current.yearMonth, count: current.count + 1 };
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function essayUsageRemaining(isPremium: boolean): number {
  if (isPremium) return Infinity;
  const usage = readEssayUsage();
  return Math.max(0, FREE_ESSAY_LIMIT_PER_MONTH - usage.count);
}
