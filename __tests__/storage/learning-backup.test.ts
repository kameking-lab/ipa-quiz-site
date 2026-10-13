import { beforeEach, describe, expect, it } from "vitest";
import { exportLearningBackup, importLearningBackup, recoverLearningBackup } from "@/lib/storage/learning-backup";
import { LS_KEYS } from "@/lib/storage/keys";
import { createHistoryStore } from "@/lib/storage/history";

const ids = ["fp3-2026-published-gakka-q11", "fp3-2026-published-gakka-q12"] as const;
const values = {
  [LS_KEYS.history]: JSON.stringify({ entries: [{ id: ids[0], selected: "イ", correct: true, at: 1791800000000 }, { id: ids[1], selected: "ア", correct: false, at: 1791800000100 }], starredIds: [ids[1]] }),
  [LS_KEYS.spacedRepetition]: JSON.stringify({ cards: { [ids[0]]: { id: ids[0], ef: 2.5, reps: 3, intervalDays: 15, dueAt: 1792000000000, lastReviewedAt: 1791800000000 } } }),
  [LS_KEYS.reviewSchedule]: JSON.stringify({ [ids[1]]: { questionId: ids[1], level: 2, nextReviewAt: "2026-10-17", correctStreak: 2 } }),
};
const keys = Object.keys(values);
function seed() { for (const [key, value] of Object.entries(values)) localStorage.setItem(key, value); }
function snapshot() { return Object.fromEntries(keys.map((key) => [key, localStorage.getItem(key)])); }
beforeEach(() => { localStorage.clear(); seed(); });

describe("learning backup transfers existing answer and review state", () => {
  it("round-trips history, stars, SRS and review schedules into empty storage without account or settings data", () => {
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
    localStorage.setItem(LS_KEYS.syncMeta, "private-sync-marker");
    const text = exportLearningBackup(localStorage, new Date("2026-10-13T00:00:00Z"));
    expect(text).not.toContain("private-sync-marker"); expect(text).not.toContain("recordHistory");
    localStorage.clear();
    expect(importLearningBackup(text, localStorage)).toEqual({ ok: true, legacy: false });
    expect(snapshot()).toEqual(values); expect(localStorage.getItem(LS_KEYS.learningBackupRecovery)).toBeNull();
  });
  it("keeps current review state when a legacy history-only file is restored", () => {
    const legacy = JSON.stringify({ entries: [{ id: ids[0], selected: "ア", correct: false, at: 1 }] });
    expect(importLearningBackup(legacy, localStorage)).toEqual({ ok: true, legacy: true });
    expect(JSON.parse(localStorage.getItem(LS_KEYS.history)!)).toEqual({ entries: [{ id: ids[0], selected: "ア", correct: false, at: 1 }], starredIds: [] });
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toBe(values[LS_KEYS.spacedRepetition]);
    expect(localStorage.getItem(LS_KEYS.reviewSchedule)).toBe(values[LS_KEYS.reviewSchedule]);
  });
  it("restores an empty new-format backup exactly while leaving settings, bookmarks and cloud metadata alone", () => {
    localStorage.clear(); const empty = exportLearningBackup(localStorage); seed();
    for (const key of [LS_KEYS.settings, LS_KEYS.bookmarks, LS_KEYS.syncMeta]) localStorage.setItem(key, "untouched");
    expect(importLearningBackup(empty, localStorage).ok).toBe(true);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.history)!)).toEqual({ entries: [], starredIds: [] });
    expect(localStorage.getItem(LS_KEYS.spacedRepetition)).toBeNull(); expect(localStorage.getItem(LS_KEYS.reviewSchedule)).toBeNull();
    for (const key of [LS_KEYS.settings, LS_KEYS.bookmarks, LS_KEYS.syncMeta]) expect(localStorage.getItem(key)).toBe("untouched");
  });
  it.each(["}{", '{"entries":[null]}', '{"entries":[{"id":"q","selected":"ア","correct":"yes","at":1}]}', '{"entries":[],"starredIds":[null]}'])
    ("rejects malformed legacy data before changing original records: %s", (text) => {
      expect(importLearningBackup(text, localStorage)).toEqual({ ok: false, reason: "invalid" }); expect(snapshot()).toEqual(values);
    });
  it.each(["version", "srs", "schedule", "missing"])("rejects malformed new-format %s without partial restoration", (kind) => {
    const backup = JSON.parse(exportLearningBackup(localStorage));
    if (kind === "version") backup.version = 99;
    if (kind === "srs") backup.review.spacedRepetition.cards[ids[0]].reps = -1;
    if (kind === "schedule") backup.review.schedule[ids[1]].nextReviewAt = "2026-02-31";
    if (kind === "missing") delete backup.review.schedule;
    expect(importLearningBackup(JSON.stringify(backup), localStorage)).toEqual({ ok: false, reason: "invalid" }); expect(snapshot()).toEqual(values);
  });
  it("does not silently export a corrupted stored history as an empty successful backup", () => {
    localStorage.setItem(LS_KEYS.history, '{"entries":[null]}');
    expect(() => exportLearningBackup(localStorage)).toThrow("backup-source-invalid");
    expect(localStorage.getItem(LS_KEYS.history)).toBe('{"entries":[null]}');
  });
});

describe("failed storage writes retain original values", () => {
  it("never removes a new answer recorded after an interrupted import", () => {
    const original = snapshot();
    const partial = JSON.stringify({ entries: [], starredIds: [] });
    localStorage.setItem(LS_KEYS.learningBackupRecovery, JSON.stringify({ version: 1, originals: original, updates: { ...original, [LS_KEYS.history]: partial } }));
    localStorage.setItem(LS_KEYS.history, partial);
    createHistoryStore().record({ id: ids[1], selected: "イ", correct: true, at: 1791800000200 });
    const newer = snapshot();
    expect(recoverLearningBackup(localStorage)).toBe(false);
    expect(snapshot()).toEqual(newer);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.learningBackupRecovery)!).originals).toEqual(original);
    expect(importLearningBackup('{"entries":[],"starredIds":[]}', localStorage)).toMatchObject({ ok: false, reason: "storage", recoveryPending: true });
    expect(snapshot()).toEqual(newer);
  });

  it("fails before any record changes when the recovery copy cannot be saved", () => {
    const storage = { getItem: (key: string) => localStorage.getItem(key), removeItem: (key: string) => localStorage.removeItem(key), setItem: () => { throw new DOMException("Full", "QuotaExceededError"); } };
    expect(importLearningBackup('{"entries":[],"starredIds":[]}', storage).ok).toBe(false); expect(snapshot()).toEqual(values);
  });
  it("rolls back a partial import if a later review write fails", () => {
    const text = exportLearningBackup(localStorage); localStorage.setItem(LS_KEYS.history, '{"entries":[],"starredIds":[]}');
    localStorage.setItem(LS_KEYS.spacedRepetition, '{"cards":{}}'); const original = snapshot(); let failed = false;
    const storage = { getItem: (key: string) => localStorage.getItem(key), removeItem: (key: string) => localStorage.removeItem(key), setItem: (key: string, value: string) => {
      if (key === LS_KEYS.spacedRepetition && !failed) { failed = true; throw new DOMException("Full", "QuotaExceededError"); }
      localStorage.setItem(key, value);
    } };
    expect(importLearningBackup(text, storage)).toEqual({ ok: false, reason: "storage", recoveryPending: false });
    expect(snapshot()).toEqual(original); expect(localStorage.getItem(LS_KEYS.learningBackupRecovery)).toBeNull();
  });
  it("retains the original raw copy through a prolonged write failure and recovers when storage works again", () => {
    const text = exportLearningBackup(localStorage); localStorage.setItem(LS_KEYS.history, '{"entries":[],"starredIds":[]}'); const original = snapshot(); let deny = false;
    const storage = { getItem: (key: string) => localStorage.getItem(key), removeItem: (key: string) => localStorage.removeItem(key), setItem: (key: string, value: string) => {
      if (key === LS_KEYS.spacedRepetition) deny = true;
      if (deny) throw new DOMException("Denied", "SecurityError");
      localStorage.setItem(key, value);
    } };
    expect(importLearningBackup(text, storage)).toEqual({ ok: false, reason: "storage", recoveryPending: true });
    expect(JSON.parse(localStorage.getItem(LS_KEYS.learningBackupRecovery)!).originals).toEqual(original);
    expect(recoverLearningBackup(localStorage)).toBe(true); expect(snapshot()).toEqual(original);
    expect(localStorage.getItem(LS_KEYS.learningBackupRecovery)).toBeNull();
  });
});
