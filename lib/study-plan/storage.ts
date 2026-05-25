"use client";

import type { ProgressMap, StoredProgress, StudyPlan } from "./types";

/**
 * LocalStorage keys for the study planner. Kept inside lib/study-plan to
 * stay self-contained — this feature does not yet depend on the global
 * lib/storage/keys registry, and isolation makes it easy to migrate later.
 */
const PLANS_KEY = "ipa-quiz:study-plans:v1";
const PROGRESS_KEY = "ipa-quiz:study-plan-progress:v1";

/** Maximum number of plans we retain. Older plans are evicted on save. */
const MAX_PLANS = 20;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function listPlans(): StudyPlan[] {
  if (typeof window === "undefined") return [];
  const plans = safeParse<StudyPlan[]>(localStorage.getItem(PLANS_KEY), []);
  return plans.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPlan(id: string): StudyPlan | null {
  if (typeof window === "undefined") return null;
  const plans = listPlans();
  return plans.find((p) => p.id === id) ?? null;
}

export function savePlan(plan: StudyPlan): void {
  if (typeof window === "undefined") return;
  const existing = listPlans().filter((p) => p.id !== plan.id);
  const next = [plan, ...existing].slice(0, MAX_PLANS);
  localStorage.setItem(PLANS_KEY, JSON.stringify(next));
}

export function deletePlan(id: string): void {
  if (typeof window === "undefined") return;
  const next = listPlans().filter((p) => p.id !== id);
  localStorage.setItem(PLANS_KEY, JSON.stringify(next));
  const allProgress = readAllProgress();
  delete allProgress[id];
  writeAllProgress(allProgress);
}

type AllProgress = Record<string, StoredProgress>;

function readAllProgress(): AllProgress {
  if (typeof window === "undefined") return {};
  return safeParse<AllProgress>(localStorage.getItem(PROGRESS_KEY), {});
}

function writeAllProgress(all: AllProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
}

export function getProgress(planId: string): ProgressMap {
  const all = readAllProgress();
  return all[planId]?.progress ?? {};
}

export function setTaskDone(
  planId: string,
  taskKey: string,
  done: boolean,
): ProgressMap {
  const all = readAllProgress();
  const entry: StoredProgress = all[planId] ?? {
    planId,
    progress: {},
    updatedAt: new Date().toISOString(),
  };
  if (done) {
    entry.progress[taskKey] = { done: true, doneAt: new Date().toISOString() };
  } else {
    delete entry.progress[taskKey];
  }
  entry.updatedAt = new Date().toISOString();
  all[planId] = entry;
  writeAllProgress(all);
  return entry.progress;
}

/** A plan + its progress packaged for cloud sync. updatedAt = newest of the
 * plan's createdAt and its progress.updatedAt (epoch ms). */
export interface PlanSyncEntry {
  id: string;
  payload: StudyPlan;
  progress: ProgressMap;
  createdAt: number;
  updatedAt: number;
}

export function getPlanSyncEntries(): PlanSyncEntry[] {
  if (typeof window === "undefined") return [];
  const allProgress = readAllProgress();
  return listPlans().map((plan) => {
    const created = Date.parse(plan.createdAt) || Date.now();
    const progUpdated = Date.parse(allProgress[plan.id]?.updatedAt ?? "") || 0;
    return {
      id: plan.id,
      payload: plan,
      progress: allProgress[plan.id]?.progress ?? {},
      createdAt: created,
      updatedAt: Math.max(created, progUpdated),
    };
  });
}

/** Merge an authoritative server set of plans into LocalStorage (LWW). */
export function mergeServerPlans(
  serverEntries: Array<{ id: string; payload: StudyPlan; progress?: ProgressMap; updatedAt: number }>,
): void {
  if (typeof window === "undefined") return;
  const localPlans = listPlans();
  const localById = new Map(localPlans.map((p) => [p.id, p]));
  const allProgress = readAllProgress();

  for (const s of serverEntries) {
    if (!s.payload || typeof s.payload !== "object") continue;
    const localUpdated = Math.max(
      Date.parse(localById.get(s.id)?.createdAt ?? "") || 0,
      Date.parse(allProgress[s.id]?.updatedAt ?? "") || 0,
    );
    if (localById.has(s.id) && localUpdated >= s.updatedAt) continue;
    localById.set(s.id, s.payload);
    if (s.progress) {
      allProgress[s.id] = {
        planId: s.id,
        progress: s.progress,
        updatedAt: new Date(s.updatedAt).toISOString(),
      };
    }
  }

  const merged = [...localById.values()].slice(0, MAX_PLANS);
  localStorage.setItem(PLANS_KEY, JSON.stringify(merged));
  writeAllProgress(allProgress);
}

export function computeCompletionStats(
  plan: StudyPlan,
  progress: ProgressMap,
): { total: number; done: number; percent: number } {
  let total = 0;
  let done = 0;
  for (const day of plan.daily) {
    for (const t of day.tasks) {
      total += 1;
      if (progress[t.key]?.done) done += 1;
    }
  }
  return {
    total,
    done,
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
  };
}
