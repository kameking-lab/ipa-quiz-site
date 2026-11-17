"use client";

import { z } from "zod";
import { LS_KEYS } from "@/lib/storage/keys";
import type { StudyPlanSyncEntry } from "@/lib/sync/types";
import { dayNumber, type PacePlan, type AnswerAttempt } from "./pace";
import { dailyLearningPoints, mergeLearningActions, type LearningAction } from "./activity";

const date = z.string().refine(value => dayNumber(value) !== null);
const timestamp = z.string().refine(value => Number.isFinite(Date.parse(value)));
export const pacePlanSchema = z.object({
  kind: z.literal("exam-pace-v1"), id: z.string().min(1), exam: z.string().min(1), sessionId: z.string().nullable(),
  examDate: date.nullable(), startDate: date, createdAt: timestamp, updatedAt: timestamp,
  range: z.object({ questionIds: z.array(z.string()), years: z.array(z.number().int()), initialCount: z.number().int().nonnegative(),
    capturedOn: date, lastExpansionWeek: date, graceUntil: date.nullable() }),
  registration: z.object({ label: z.string(), start: date.nullable(), deadline: date.nullable(), resultDate: date.nullable(), sourceUrl: z.string().url().nullable(), estimated: z.boolean() }).optional(),
  registered: z.boolean().optional(), result: z.enum(["passed", "failed", "absent"]).optional(),
  studyMinutes: z.object({ weekday: z.number().int().min(1).max(1440), holiday: z.number().int().min(1).max(1440) }).optional(),
});
const actionSchema = z.object({ id: z.string().min(1), questionId: z.string().min(1), exam: z.string().min(1), at: z.number().finite(),
  kind: z.enum(["answer", "ai-question", "explanation-read"]), activeMs: z.number().finite().nonnegative().optional(),
  correct: z.boolean().optional(), questionType: z.enum(["multiple-choice", "ordering", "numeric", "native-b", "descriptive", "essay"]).optional() });
const activitySchema = z.object({ kind: z.literal("study-activity-v1"), id: z.string().min(1), updatedAt: timestamp, actions: z.array(actionSchema) });
type ActivityState = z.infer<typeof activitySchema>;

function read(key: string): unknown {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem(key) ?? "null") as unknown; } catch { return null; }
}
function write(key: string, value: unknown, signal = true): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    if (signal) window.dispatchEvent(new Event("study-plan:changed"));
    return true;
  } catch { return false; }
}
export function listPacePlans(): PacePlan[] {
  const parsed = z.array(pacePlanSchema).safeParse(read(LS_KEYS.pacePlans));
  return parsed.success ? parsed.data : [];
}
export function savePacePlan(plan: PacePlan): boolean {
  const parsed = pacePlanSchema.safeParse(plan);
  return parsed.success && write(LS_KEYS.pacePlans, [parsed.data, ...listPacePlans().filter(p => p.id !== plan.id)].slice(0, 20));
}
export function deletePacePlan(id: string): boolean {
  // A tombstone prevents an old cloud copy from resurrecting a deleted plan.
  const deleted = readDeleted();
  deleted[id] = Date.now();
  if (!write(LS_KEYS.pacePlanDeleted, deleted)) return false;
  return write(LS_KEYS.pacePlans, listPacePlans().filter(p => p.id !== id));
}
function readDeleted(): Record<string, number> {
  const parsed = z.record(z.string(), z.number().finite()).safeParse(read(LS_KEYS.pacePlanDeleted));
  return parsed.success ? parsed.data : {};
}
function activityState(): ActivityState {
  const parsed = activitySchema.safeParse(read(LS_KEYS.learningActivity));
  return parsed.success ? parsed.data : { kind: "study-activity-v1", id: `activity-${globalThis.crypto.randomUUID()}`,
    updatedAt: new Date().toISOString(), actions: [] };
}
export function getLearningActions(): LearningAction[] {
  const parsed = activitySchema.safeParse(read(LS_KEYS.learningActivity));
  return parsed.success ? parsed.data.actions : [];
}
export function getPaceAttempts(legacy: readonly AnswerAttempt[] = []): AnswerAttempt[] {
  return [...legacy, ...getLearningActions().flatMap(action => action.kind === "answer" && typeof action.correct === "boolean"
    ? [{ id: action.questionId, correct: action.correct, at: action.at }] : [])];
}
export function recordLearningAction(action: LearningAction): boolean {
  const parsed = actionSchema.safeParse(action);
  if (!parsed.success) return false;
  const state = activityState();
  state.actions = mergeLearningActions(state.actions, [parsed.data]);
  state.updatedAt = new Date().toISOString();
  if (!write(LS_KEYS.learningActivity, state)) return false;
  return write(LS_KEYS.learningPoints, dailyLearningPoints(state.actions));
}
/** Activity is one JSON StudyPlan row per browser, independent of active qualification. */
export function getPaceSyncEntries(): StudyPlanSyncEntry[] {
  const plans: StudyPlanSyncEntry[] = listPacePlans().filter(p => !readDeleted()[p.id]).map(p => ({ id: p.id,
    payload: p, createdAt: Date.parse(p.createdAt), updatedAt: Date.parse(p.updatedAt) }));
  const state = activitySchema.safeParse(read(LS_KEYS.learningActivity));
  if (state.success) plans.push({ id: state.data.id, payload: { kind: "study-activity-v1" }, progress: state.data,
    updatedAt: Date.parse(state.data.updatedAt) });
  for (const [id, at] of Object.entries(readDeleted())) plans.push({ id, payload: { kind: "deleted-exam-pace-v1" }, updatedAt: at });
  return plans;
}
export function mergePaceSyncEntries(entries: readonly StudyPlanSyncEntry[]): void {
  const plans = new Map(listPacePlans().map(p => [p.id, p]));
  const deleted = readDeleted();
  let activity: ActivityState | null = null;
  for (const entry of entries) {
    if (!Number.isFinite(entry.updatedAt)) continue;
    if (entry.payload && typeof entry.payload === "object" && "kind" in entry.payload && entry.payload.kind === "deleted-exam-pace-v1") {
      deleted[entry.id] = Math.max(deleted[entry.id] ?? 0, entry.updatedAt); continue;
    }
    const plan = pacePlanSchema.safeParse(entry.payload);
    if (plan.success && plan.data.id === entry.id && !deleted[entry.id]) {
      if (entry.updatedAt > Date.parse(plans.get(entry.id)?.updatedAt ?? "") || !plans.has(entry.id)) plans.set(entry.id, plan.data);
    }
    const remote = activitySchema.safeParse(entry.progress);
    if (remote.success) {
      activity ??= activityState();
      const merged = mergeLearningActions(activity.actions, remote.data.actions);
      if (JSON.stringify(merged) !== JSON.stringify(activity.actions)) {
        activity.actions = merged; activity.updatedAt = new Date().toISOString();
      }
    }
  }
  write(LS_KEYS.pacePlanDeleted, deleted, false);
  write(LS_KEYS.pacePlans, [...plans.values()].filter(p => !deleted[p.id]).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 20), false);
  if (activity) {
    write(LS_KEYS.learningActivity, activity, false);
    write(LS_KEYS.learningPoints, dailyLearningPoints(activity.actions), false);
  }
}
