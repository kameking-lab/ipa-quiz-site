import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "./spaced-repetition";
import { jstDateString } from "@/lib/streak/core";
import { LS_KEYS } from "@/lib/storage/keys";
import { dayNumber, latestAnswers } from "@/lib/study-plan/pace";
import { getPaceAttempts } from "@/lib/study-plan/pace-storage";

type Appointment = { nextReviewAt: string; lastReviewedAt?: number; level?: number; correctStreak?: number };
const intervals = [1, 3, 7, 14, 30, 60, 120];
const validCount = (value: unknown) => value === undefined || (typeof value === "number" && Number.isInteger(value) && value >= 0);

export function readLegacyAppointments(): Record<string, Appointment> {
  try {
    const parsed = JSON.parse(localStorage.getItem(LS_KEYS.reviewSchedule) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]) => {
      const entry = value as Partial<Appointment> | null;
      return typeof entry?.nextReviewAt === "string" && dayNumber(entry.nextReviewAt) !== null &&
        validCount(entry.level) && validCount(entry.correctStreak);
    })) as Record<string, Appointment>;
  } catch { return {}; }
}

/** Only the due-review screen reschedules appointments. Its existing on-device format is shared with older clients. */
export function advanceAppointment(id: string, correct: boolean, now = Date.now()) {
  const appointments = readLegacyAppointments();
  const previous = appointments[id];
  const level = correct ? Math.min((previous?.level ?? 0) + 1, intervals.length - 1) : 0;
  const nextReviewAt = jstDateString(new Date(now + intervals[level] * 86_400_000));
  try {
    localStorage.setItem(LS_KEYS.reviewSchedule, JSON.stringify({ ...appointments,
      [id]: { questionId: id, level, correctStreak: correct ? (previous?.correctStreak ?? 0) + 1 : 0, nextReviewAt, lastReviewedAt: now },
    }));
  } catch { /* Keep practice available if the device cannot save. */ }
}

/** Read both legacy schedules and SRS without rewriting either saved format. */
export function buildReviewRequest(legacy: Record<string, { nextReviewAt: string; lastReviewedAt?: number }>, now = Date.now()) {
  const history = createHistoryStore();
  const cards = getCards();
  const today = jstDateString(new Date(now));
  const reviewStore = { ...legacy };
  const latest = latestAnswers(getPaceAttempts(history.getAllEntries()), now);
  for (const card of cards) {
    const saved = legacy[card.id];
    // Old schedules have no recency metadata. Preserve those appointments;
    // new reviews write a timestamp so later answers can be reconciled safely.
    if (saved && (!saved.lastReviewedAt || saved.lastReviewedAt >= card.lastReviewedAt)) continue;
    reviewStore[card.id] = { nextReviewAt: jstDateString(new Date(card.dueAt)) };
  }
  const cardsById = new Map(cards.map((card) => [card.id, card]));
  for (const [id, entry] of latest) {
    if (entry.correct) continue;
    const card = cardsById.get(id);
    // A later successful review can defer a previous wrong answer.
    if (card && card.reps > 0 && card.lastReviewedAt >= entry.at) continue;
    const saved = legacy[id];
    if (!saved || (card && saved.lastReviewedAt && card.lastReviewedAt > saved.lastReviewedAt)) reviewStore[id] = { nextReviewAt: today };
  }
  for (const id of history.getStarredIds()) {
    if (!reviewStore[id]) reviewStore[id] = { nextReviewAt: today };
  }
  return {
    historyIds: [...new Set([...latest.keys(), ...history.getStarredIds(), ...cards.map((card) => card.id), ...Object.keys(legacy)])],
    reviewStore, today,
  };
}
