import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { qualificationHubForEntry } from "@/lib/exam-qualification-hubs";
import type { HomeDirectoryDomain, HomeDirectoryItem } from "@/lib/home/home-directory";

export interface PersonalStudySignal {
  id: string;
  at: number;
}

export interface PersonalDueSignal {
  id: string;
  dueAt: number;
}

export interface PersonalPaperSignal {
  examId: string;
  answered: number;
  updatedAt: string;
}

export interface PersonalPriority {
  item: HomeDirectoryItem;
  dueCount: number;
  lastStudiedAt: number;
}

const RECENT_DAYS = 30;

/** Match only published directory entries; never infer a qualification from an unknown ID. */
export function buildPersonalPriority(
  domains: readonly HomeDirectoryDomain[],
  signals: {
    history: readonly PersonalStudySignal[];
    due: readonly PersonalDueSignal[];
    papers: readonly PersonalPaperSignal[];
  },
  now: number,
): PersonalPriority[] {
  const items = domains.flatMap((domain) => [...domain.featured, ...domain.compact]);
  const byKey = new Map(items.map((item) => [item.key, item]));
  const paperKeys = new Map(EXAM_CATALOG.map((paper) => {
    const hub = qualificationHubForEntry(paper);
    return [paper.id, hub?.slug ?? `${paper.group}-${paper.subject}`] as const;
  }));
  const prefixes = [
    ...items.map((item) => [item.key, item.key] as const),
    ...[...paperKeys].map(([paperId, key]) => [paperId, key] as const),
  ].filter(([, key]) => byKey.has(key)).sort((a, b) => b[0].length - a[0].length);
  const keyForQuestion = (id: unknown): string | undefined =>
    typeof id === "string" ? prefixes.find(([prefix]) => id.startsWith(`${prefix}-`))?.[1] : undefined;
  const priorities = new Map<string, PersonalPriority>();
  const priorityFor = (key: string): PersonalPriority => {
    const existing = priorities.get(key);
    if (existing) return existing;
    const created = { item: byKey.get(key)!, dueCount: 0, lastStudiedAt: 0 };
    priorities.set(key, created);
    return created;
  };

  for (const entry of signals.history) {
    if (!entry || typeof entry !== "object") continue;
    const key = keyForQuestion(entry.id);
    if (key && Number.isFinite(entry.at) && entry.at > 0 && entry.at <= now) {
      priorityFor(key).lastStudiedAt = Math.max(priorityFor(key).lastStudiedAt, entry.at);
    }
  }
  for (const card of signals.due) {
    if (!card || typeof card !== "object") continue;
    const key = keyForQuestion(card.id);
    if (key && Number.isFinite(card.dueAt) && card.dueAt > 0 && card.dueAt <= now) priorityFor(key).dueCount += 1;
  }
  for (const paper of signals.papers) {
    if (!paper || typeof paper !== "object" || typeof paper.examId !== "string" || typeof paper.updatedAt !== "string") continue;
    const key = paperKeys.get(paper.examId);
    const at = Date.parse(paper.updatedAt);
    if (key && byKey.has(key) && paper.answered > 0 && Number.isFinite(at) && at > 0 && at <= now) {
      priorityFor(key).lastStudiedAt = Math.max(priorityFor(key).lastStudiedAt, at);
    }
  }
  const recentThreshold = now - RECENT_DAYS * 86_400_000;
  return [...priorities.values()]
    .filter((priority) => priority.dueCount > 0 || priority.lastStudiedAt >= recentThreshold)
    .sort((a, b) => Number(b.dueCount > 0) - Number(a.dueCount > 0) ||
      b.dueCount - a.dueCount || b.lastStudiedAt - a.lastStudiedAt || a.item.key.localeCompare(b.item.key));
}
