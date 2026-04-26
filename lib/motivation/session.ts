"use client";

const SESSION_KEY = "ipa-quiz:session:current:v1";

export interface SessionAnswer {
  id: string;
  correct: boolean;
  category: string;
  at: number;
}

export interface SessionMeta {
  startedAt: number;
  mode: string;
  answers: SessionAnswer[];
}

export interface SessionSummary {
  total: number;
  correct: number;
  accuracyPct: number;
  durationSec: number;
  byCategory: { category: string; total: number; correct: number; accuracyPct: number }[];
  recommendedTomorrow: number;
}

function readMeta(): SessionMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SessionMeta>;
    if (typeof parsed.startedAt !== "number") return null;
    return {
      startedAt: parsed.startedAt,
      mode: typeof parsed.mode === "string" ? parsed.mode : "unknown",
      answers: Array.isArray(parsed.answers) ? (parsed.answers as SessionAnswer[]) : [],
    };
  } catch {
    return null;
  }
}

function writeMeta(meta: SessionMeta): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

export function startSession(mode: string): void {
  writeMeta({ startedAt: Date.now(), mode, answers: [] });
}

export function recordSessionAnswer(answer: SessionAnswer): void {
  const meta = readMeta() ?? { startedAt: Date.now(), mode: "unknown", answers: [] };
  meta.answers.push(answer);
  writeMeta(meta);
}

export function readSession(): SessionMeta | null {
  return readMeta();
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

export function summarizeSession(meta: SessionMeta): SessionSummary {
  const total = meta.answers.length;
  const correct = meta.answers.filter((a) => a.correct).length;
  const accuracyPct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const durationSec = Math.max(1, Math.round((Date.now() - meta.startedAt) / 1000));

  const catAgg = new Map<string, { total: number; correct: number }>();
  for (const a of meta.answers) {
    const cat = a.category || "未分類";
    const cur = catAgg.get(cat) ?? { total: 0, correct: 0 };
    cur.total += 1;
    if (a.correct) cur.correct += 1;
    catAgg.set(cat, cur);
  }
  const byCategory = [...catAgg.entries()]
    .map(([category, c]) => ({
      category,
      total: c.total,
      correct: c.correct,
      accuracyPct: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0,
    }))
    .sort((a, b) => b.total - a.total);

  const baseline = total > 0 ? total : 10;
  const adjusted =
    accuracyPct < 60 ? baseline + 5 : accuracyPct >= 90 ? baseline + 10 : baseline + 3;
  const recommendedTomorrow = Math.min(50, Math.max(10, adjusted));

  return {
    total,
    correct,
    accuracyPct,
    durationSec,
    byCategory,
    recommendedTomorrow,
  };
}
