import { LS_KEYS } from "./keys";

interface UsageData {
  date: string;
  count: number;
}

function jstDateString(d: Date = new Date()): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

export function readAiUsage(): UsageData {
  if (typeof window === "undefined") return { date: jstDateString(), count: 0 };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.aiUsage);
    if (!raw) return { date: jstDateString(), count: 0 };
    const parsed = JSON.parse(raw) as UsageData;
    const today = jstDateString();
    if (parsed.date !== today) return { date: today, count: 0 };
    return parsed;
  } catch {
    return { date: jstDateString(), count: 0 };
  }
}

export function incrementAiUsage(): UsageData {
  const current = readAiUsage();
  const next: UsageData = { date: current.date, count: current.count + 1 };
  try {
    window.localStorage.setItem(LS_KEYS.aiUsage, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

/**
 * Initial free quota before the feedback gate triggers.
 * After feedback is submitted, the limit effectively becomes unlimited.
 */
export const FREE_DAILY_LIMIT_CLIENT = 10;
export const POST_FEEDBACK_DAILY_LIMIT_CLIENT = 9999;

export function readFeedbackSubmitted(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LS_KEYS.feedbackSubmitted) === "true";
  } catch {
    return false;
  }
}

export function setFeedbackSubmitted(value = true): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.feedbackSubmitted, value ? "true" : "false");
  } catch {
    // ignore
  }
}

export function effectiveDailyLimit(): number {
  return readFeedbackSubmitted() ? POST_FEEDBACK_DAILY_LIMIT_CLIENT : FREE_DAILY_LIMIT_CLIENT;
}
