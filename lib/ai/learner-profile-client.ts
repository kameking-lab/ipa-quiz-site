"use client";

import type { LearnerProfile } from "@/lib/ai/prompts";
import { createHistoryStore } from "@/lib/storage/history";

/**
 * Build a lightweight learner profile from localStorage history. The current
 * question's category is already in the system prompt so we don't need to
 * pull the full question pool here — keeping this client-cheap matters
 * because the panel is on the critical path of every quiz answer.
 */
export function buildLearnerProfileFromHistory(): LearnerProfile | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const store = createHistoryStore();
    const stats = store.getStats();
    if (stats.total < 5) return undefined;
    return {
      totalAnswered: stats.total,
      uniqueAnswered: stats.uniqueAnswered,
      accuracy: stats.accuracy,
      weakCategories: [],
    };
  } catch {
    return undefined;
  }
}
