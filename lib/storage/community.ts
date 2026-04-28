import type { CommunityQuestionDraft } from "@/data/community";

const KEY = "ipa-quiz:community-questions:v1";
const MAX_DRAFTS = 50;

export function readCommunityDrafts(): CommunityQuestionDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CommunityQuestionDraft[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((d) => d && typeof d.id === "string");
  } catch {
    return [];
  }
}

export function appendCommunityDraft(draft: CommunityQuestionDraft): CommunityQuestionDraft[] {
  if (typeof window === "undefined") return [];
  const current = readCommunityDrafts();
  const next = [draft, ...current].slice(0, MAX_DRAFTS);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // quota exceeded — silently ignore
  }
  return next;
}

export function deleteCommunityDraft(id: string): CommunityQuestionDraft[] {
  if (typeof window === "undefined") return [];
  const next = readCommunityDrafts().filter((d) => d.id !== id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}
