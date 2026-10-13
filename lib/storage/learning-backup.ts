import { LS_KEYS } from "./keys";
import type { HistoryData, HistoryEntry } from "./history";
import type { SrsState } from "@/lib/learning/spaced-repetition";

type BackupStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type ReviewSchedule = Record<string, { questionId?: string; level: number; nextReviewAt: string; correctStreak: number }>;
type ManagedKey = typeof LS_KEYS.history | typeof LS_KEYS.spacedRepetition | typeof LS_KEYS.reviewSchedule;
const managedKeys: readonly ManagedKey[] = [LS_KEYS.history, LS_KEYS.spacedRepetition, LS_KEYS.reviewSchedule];
const format = "ipa-quiz-learning-backup";

interface LearningBackup {
  format: typeof format;
  version: 1;
  exportedAt: string;
  history: HistoryData;
  review: { spacedRepetition: SrsState | null; schedule: ReviewSchedule | null };
}
export type BackupImportResult = { ok: true; legacy: boolean } | { ok: false; reason: "invalid" | "storage"; recoveryPending?: boolean };

const object = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
const count = (value: unknown): value is number => finite(value) && Number.isInteger(value);
const id = (value: unknown): value is string => typeof value === "string" && value.length > 0 && value.length <= 120;
const validDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

function history(value: unknown): value is HistoryData {
  return object(value) && Array.isArray(value.entries)
    && value.entries.every((entry: unknown): entry is HistoryEntry => object(entry) && id(entry.id)
      && typeof entry.selected === "string" && typeof entry.correct === "boolean" && finite(entry.at))
    && (value.starredIds === undefined || (Array.isArray(value.starredIds) && value.starredIds.every(id)));
}
function srs(value: unknown): value is SrsState {
  return object(value) && object(value.cards) && Object.entries(value.cards).every(([key, card]) => id(key) && object(card)
    && card.id === key && finite(card.ef) && card.ef >= 1.3 && count(card.reps) && count(card.intervalDays)
    && finite(card.dueAt) && finite(card.lastReviewedAt));
}
function schedule(value: unknown): value is ReviewSchedule {
  return object(value) && Object.entries(value).every(([key, record]) => id(key) && object(record)
    && (record.questionId === undefined || record.questionId === key)
    && count(record.level) && validDate(record.nextReviewAt) && count(record.correctStreak));
}
function normalizeHistory(value: HistoryData): HistoryData {
  return { entries: value.entries, starredIds: value.starredIds ?? [] };
}

/** The original raw values stay in this journal until every write or rollback succeeds. */
export function recoverLearningBackup(storage: BackupStorage): boolean {
  try {
    const raw = storage.getItem(LS_KEYS.learningBackupRecovery);
    if (raw === null) return true;
    const pending: unknown = JSON.parse(raw);
    if (!object(pending) || pending.version !== 1 || !object(pending.originals) || !object(pending.updates)) return false;
    const expectedUpdates = pending.updates;
    const originals = Object.entries(pending.originals);
    if (!originals.length || !originals.every(([key, value]) => managedKeys.includes(key as ManagedKey)
      && (typeof value === "string" || value === null)
      && Object.hasOwn(expectedUpdates, key) && (typeof expectedUpdates[key] === "string" || expectedUpdates[key] === null))) return false;
    // Do not roll back an answer added after the failed import. Keep both the
    // original copy and the newer values; an unresolved recovery is not success.
    const observed = Object.fromEntries(originals.map(([key]) => [key, storage.getItem(key)]));
    if (originals.some(([key, value]) => observed[key] !== value && observed[key] !== expectedUpdates[key])) return false;
    for (const [key, value] of originals) {
      const current = storage.getItem(key);
      if (current !== observed[key]) return false;
      if (current === value) continue;
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value as string);
    }
    storage.removeItem(LS_KEYS.learningBackupRecovery);
    return true;
  } catch {
    return false; // Keep the journal; the next settings visit retries recovery without confirmation.
  }
}

export function exportLearningBackup(storage: BackupStorage, now = new Date()): string {
  if (!recoverLearningBackup(storage)) throw new Error("backup-recovery-unavailable");
  const rawHistory = storage.getItem(LS_KEYS.history);
  const rawSrs = storage.getItem(LS_KEYS.spacedRepetition);
  const rawSchedule = storage.getItem(LS_KEYS.reviewSchedule);
  const savedHistory: unknown = rawHistory === null ? { entries: [], starredIds: [] } : JSON.parse(rawHistory);
  const savedSrs: unknown = rawSrs === null ? null : JSON.parse(rawSrs);
  const savedSchedule: unknown = rawSchedule === null ? null : JSON.parse(rawSchedule);
  if (!history(savedHistory) || (savedSrs !== null && !srs(savedSrs)) || (savedSchedule !== null && !schedule(savedSchedule))) {
    throw new Error("backup-source-invalid");
  }
  const backup: LearningBackup = { format, version: 1, exportedAt: now.toISOString(), history: normalizeHistory(savedHistory),
    review: { spacedRepetition: savedSrs, schedule: savedSchedule } };
  return JSON.stringify(backup);
}

export function importLearningBackup(text: string, storage: BackupStorage): BackupImportResult {
  let updates: Partial<Record<ManagedKey, string | null>>;
  let legacy: boolean;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!object(parsed)) return { ok: false, reason: "invalid" };
    legacy = parsed.format === undefined && parsed.version === undefined;
    if (legacy) {
      if (!history(parsed)) return { ok: false, reason: "invalid" };
      updates = { [LS_KEYS.history]: JSON.stringify(normalizeHistory(parsed)) };
    } else {
      if (parsed.format !== format || parsed.version !== 1 || typeof parsed.exportedAt !== "string"
        || !Number.isFinite(Date.parse(parsed.exportedAt)) || !history(parsed.history) || !object(parsed.review)
        || !Object.hasOwn(parsed.review, "spacedRepetition") || !Object.hasOwn(parsed.review, "schedule")
        || (parsed.review.spacedRepetition !== null && !srs(parsed.review.spacedRepetition))
        || (parsed.review.schedule !== null && !schedule(parsed.review.schedule))) return { ok: false, reason: "invalid" };
      updates = { [LS_KEYS.history]: JSON.stringify(normalizeHistory(parsed.history)),
        [LS_KEYS.spacedRepetition]: parsed.review.spacedRepetition === null ? null : JSON.stringify(parsed.review.spacedRepetition),
        [LS_KEYS.reviewSchedule]: parsed.review.schedule === null ? null : JSON.stringify(parsed.review.schedule) };
    }
  } catch { return { ok: false, reason: "invalid" }; }
  try {
    if (!recoverLearningBackup(storage)) return { ok: false, reason: "storage", recoveryPending: true };
    const originals = Object.fromEntries(Object.keys(updates).map((key) => [key, storage.getItem(key)]));
    // If storage is full or denied, this fails before any saved learning record changes.
    storage.setItem(LS_KEYS.learningBackupRecovery, JSON.stringify({ version: 1, originals, updates }));
    for (const [key, value] of Object.entries(updates)) {
      if (storage.getItem(key) !== originals[key]) throw new Error("backup-concurrent-update");
      if (value === null) storage.removeItem(key);
      else storage.setItem(key, value);
    }
    storage.removeItem(LS_KEYS.learningBackupRecovery);
    return { ok: true, legacy };
  } catch {
    const recovered = recoverLearningBackup(storage);
    return { ok: false, reason: "storage", recoveryPending: !recovered };
  }
}
