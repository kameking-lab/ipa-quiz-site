import { LS_KEYS } from "@/lib/storage/keys";

export interface SrsCard {
  id: string;
  /** SM-2 ease factor, starts at 2.5 */
  ef: number;
  /** Number of consecutive correct reviews */
  reps: number;
  /** Current interval in days */
  intervalDays: number;
  /** Next review timestamp (ms) */
  dueAt: number;
  /** Last review timestamp (ms) */
  lastReviewedAt: number;
}

export interface SrsState {
  cards: Record<string, SrsCard>;
}

const DAY_MS = 86_400_000;

// Factory (not a shared const): recordReview mutates the returned object in
// place (state.cards[id] = ...), so a shared empty constant would be
// permanently corrupted on the empty-storage path — and resetSrs() would then
// write that corrupted copy back, failing to clear. Same footgun fixed in
// history.ts / achievements.ts / bookmarks.ts.
function emptyState(): SrsState {
  return { cards: {} };
}

function read(): SrsState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(LS_KEYS.spacedRepetition);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as SrsState;
    return { cards: parsed.cards && typeof parsed.cards === "object" ? parsed.cards : {} };
  } catch {
    return emptyState();
  }
}

function write(state: SrsState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.spacedRepetition, JSON.stringify(state));
  } catch {
    // ignore
  }
}

/**
 * SM-2 grade scale: 0-2 = "wrong", 3-5 = "right".
 * We accept a binary signal (correct/incorrect) plus an ease quality.
 */
export type SrsGrade = 0 | 1 | 2 | 3 | 4 | 5;

function defaultCard(id: string): SrsCard {
  return {
    id,
    ef: 2.5,
    reps: 0,
    intervalDays: 0,
    dueAt: Date.now(),
    lastReviewedAt: 0,
  };
}

/**
 * Apply the SM-2 algorithm to a card. Returns the updated card.
 * https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm
 */
export function applyGrade(card: SrsCard, grade: SrsGrade, now = Date.now()): SrsCard {
  const updated: SrsCard = { ...card, lastReviewedAt: now };
  if (grade < 3) {
    updated.reps = 0;
    updated.intervalDays = 1;
  } else {
    updated.reps = card.reps + 1;
    if (updated.reps === 1) {
      updated.intervalDays = 1;
    } else if (updated.reps === 2) {
      updated.intervalDays = 6;
    } else {
      updated.intervalDays = Math.round(card.intervalDays * card.ef);
    }
    const newEf = card.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    updated.ef = Math.max(1.3, newEf);
  }
  updated.dueAt = now + updated.intervalDays * DAY_MS;
  return updated;
}

/** Convert a binary correct/wrong signal into an SM-2 grade. */
export function gradeFromCorrect(correct: boolean, accuracyHint?: number): SrsGrade {
  if (!correct) {
    if (accuracyHint !== undefined && accuracyHint < 0.3) return 0;
    return 2;
  }
  if (accuracyHint !== undefined && accuracyHint > 0.85) return 5;
  return 4;
}

export function recordReview(id: string, correct: boolean, accuracyHint?: number): SrsCard {
  const state = read();
  const existing = state.cards[id] ?? defaultCard(id);
  const grade = gradeFromCorrect(correct, accuracyHint);
  const updated = applyGrade(existing, grade);
  state.cards[id] = updated;
  write(state);
  return updated;
}

export function getCards(): SrsCard[] {
  return Object.values(read().cards);
}

export function getDueCards(now = Date.now()): SrsCard[] {
  return getCards().filter((c) => c.dueAt <= now);
}

/**
 * Order question IDs by SRS priority:
 * 1. Cards that are most overdue (lowest dueAt) come first.
 * 2. Cards never reviewed (not in state) go to the end of due-soon.
 */
export function orderByPriority(ids: string[], now = Date.now()): string[] {
  const state = read();
  const decorated = ids.map((id) => {
    const card = state.cards[id];
    if (!card) return { id, key: now, hasCard: false };
    return { id, key: card.dueAt, hasCard: true };
  });
  decorated.sort((a, b) => a.key - b.key);
  return decorated.map((d) => d.id);
}

export function resetSrs(): void {
  write(emptyState());
}

export interface SrsSummary {
  total: number;
  dueNow: number;
  dueIn24h: number;
  averageEf: number;
  matureCount: number;
}

export function summarize(now = Date.now()): SrsSummary {
  const cards = getCards();
  const total = cards.length;
  const dueNow = cards.filter((c) => c.dueAt <= now).length;
  const dueIn24h = cards.filter((c) => c.dueAt <= now + DAY_MS).length;
  const averageEf =
    total === 0 ? 2.5 : cards.reduce((sum, c) => sum + c.ef, 0) / total;
  const matureCount = cards.filter((c) => c.intervalDays >= 21).length;
  return { total, dueNow, dueIn24h, averageEf, matureCount };
}
