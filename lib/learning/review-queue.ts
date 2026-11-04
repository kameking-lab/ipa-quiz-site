import { createHistoryStore } from "@/lib/storage/history";
import { getCards } from "./spaced-repetition";
import { jstDateString } from "@/lib/streak/core";

/** Read both legacy schedules and SRS without rewriting either saved format. */
export function buildReviewRequest(legacy: Record<string, { nextReviewAt: string; lastReviewedAt?: number }>, now = Date.now()) {
  const history = createHistoryStore();
  const cards = getCards();
  const today = jstDateString(new Date(now));
  const reviewStore = { ...legacy };
  const latest = new Map(history.getAllEntries().map((entry) => [entry.id, entry]));
  for (const card of cards) {
    const saved = legacy[card.id];
    // Old schedules have no recency metadata. Preserve those appointments;
    // new reviews write a timestamp so later answers can be reconciled safely.
    if (saved && (!saved.lastReviewedAt || saved.lastReviewedAt >= card.lastReviewedAt)) continue;
    reviewStore[card.id] = { nextReviewAt: jstDateString(new Date(card.dueAt)) };
  }
  const cardsById = new Map(cards.map((card) => [card.id, card]));
  for (const id of history.getWrongIds()) {
    const card = cardsById.get(id);
    const entry = latest.get(id);
    // A later successful review can defer a previous wrong answer.
    if (card && card.reps > 0 && entry && card.lastReviewedAt >= entry.at) continue;
    const saved = legacy[id];
    if (!saved || (card && saved.lastReviewedAt && card.lastReviewedAt > saved.lastReviewedAt)) reviewStore[id] = { nextReviewAt: today };
  }
  for (const id of history.getStarredIds()) {
    if (!reviewStore[id]) reviewStore[id] = { nextReviewAt: today };
  }
  return {
    historyIds: [...new Set([...history.getAnsweredIds(), ...history.getStarredIds(), ...cards.map((card) => card.id), ...Object.keys(legacy)])],
    reviewStore, today,
  };
}
