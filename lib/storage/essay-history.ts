import type { EssayHistoryEntry } from "@/lib/essay/types";

const LS_KEY = "ipa-quiz:essay-history:v1";
const MAX_ENTRIES = 50;

export function readEssayHistory(): EssayHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as EssayHistoryEntry[];
  } catch {
    return [];
  }
}

export function appendEssayHistory(entry: EssayHistoryEntry): void {
  if (typeof window === "undefined") return;
  try {
    const all = readEssayHistory();
    const next = [entry, ...all].slice(0, MAX_ENTRIES);
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function clearEssayHistory(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEY);
  } catch {
    // ignore
  }
}

const DRAFT_PREFIX = "ipa-quiz:essay-draft:";

export interface EssayDraft {
  industry: string;
  ア: string;
  イ: string;
  ウ: string;
  updatedAt: string;
}

export function readEssayDraft(questionId: string): EssayDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_PREFIX + questionId);
    if (!raw) return null;
    return JSON.parse(raw) as EssayDraft;
  } catch {
    return null;
  }
}

export function writeEssayDraft(questionId: string, draft: EssayDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DRAFT_PREFIX + questionId, JSON.stringify(draft));
  } catch {
    // ignore
  }
}

export function clearEssayDraft(questionId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_PREFIX + questionId);
  } catch {
    // ignore
  }
}
