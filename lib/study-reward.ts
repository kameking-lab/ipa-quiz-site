import { LS_KEYS } from "@/lib/storage/keys";

export type RewardTheme = "swim" | "code" | "coins" | "light" | "rest";
export interface StudyReward {
  id: string;
  scope: string;
  questionId: string;
  label: string;
  theme: RewardTheme;
}

// These are exact, verified qualification codes; never infer from a partial name.
export function rewardTheme(exam: string): RewardTheme {
  if (exam === "library:潜水士") return "swim";
  if (["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"].includes(exam)) return "code";
  if (["fp1", "fp2", "fp3"].includes(exam)) return "coins";
  if (["denko1", "denko2", "denken1", "denken2", "denken3"].includes(exam)) return "light";
  return "rest";
}

const listeners = new Set<() => void>();
let latest: StudyReward | null = null;
let loaded = false;
const seen = new Set<string>();
const themes: RewardTheme[] = ["swim", "code", "coins", "light", "rest"];
function valid(value: unknown): value is StudyReward {
  if (!value || typeof value !== "object") return false;
  const item = value as StudyReward;
  return [item.id, item.scope, item.questionId, item.label].every(v => typeof v === "string" && v.length > 0 && v.length <= 300) && themes.includes(item.theme);
}
function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const stored = JSON.parse(sessionStorage.getItem(LS_KEYS.studyReward) ?? "null");
    if (stored && valid(stored.latest) && Array.isArray(stored.seen)) {
      latest = stored.latest;
      for (const key of stored.seen) if (typeof key === "string") seen.add(key);
    }
  } catch { /* Optional decoration must never interrupt study. */ }
}

/** Call only from a successful, explicit choice submission, never view/navigation/restore. */
export function recordStudyReward(input: Omit<StudyReward, "id" | "theme"> & { exam: string }): boolean {
  load();
  const id = JSON.stringify([input.scope, input.questionId]);
  if (seen.has(id) || !input.questionId || !input.scope || !input.label) return false;
  seen.add(id);
  latest = { id, scope: input.scope, questionId: input.questionId, label: input.label, theme: rewardTheme(input.exam) };
  try { sessionStorage.setItem(LS_KEYS.studyReward, JSON.stringify({ latest, seen: [...seen] })); } catch { /* in-memory fallback */ }
  listeners.forEach(notify => notify());
  return true;
}
export function getStudyReward() { load(); return latest; }
export function subscribeStudyReward(notify: () => void) { listeners.add(notify); return () => { listeners.delete(notify); }; }
