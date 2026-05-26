/**
 * Lightweight "user context" stored in LocalStorage to drive the
 * personalised homepage layout. Independent of the larger onboarding /
 * history stores — those remain the source of truth for their own
 * domains. This module only tracks visit recency.
 *
 * Key: ipa-quiz:user-context:v1 (migrated from the legacy kakomon-ai-user-context-v1)
 */

import { migrateLegacyKey } from "@/lib/storage/migrate-key";

export const USER_CONTEXT_LS_KEY = "ipa-quiz:user-context:v1";
const LEGACY_USER_CONTEXT_LS_KEY = "kakomon-ai-user-context-v1";

export interface UserContext {
  /** Number of homepage loads observed so far. */
  visitCount: number;
  /** ISO timestamp of the most recent homepage load. */
  lastVisitAt: string | null;
}

const EMPTY: UserContext = {
  visitCount: 0,
  lastVisitAt: null,
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readUserContext(): UserContext {
  if (!isBrowser()) return EMPTY;
  try {
    migrateLegacyKey(LEGACY_USER_CONTEXT_LS_KEY, USER_CONTEXT_LS_KEY);
    const raw = window.localStorage.getItem(USER_CONTEXT_LS_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<UserContext>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function writeUserContext(next: UserContext): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(USER_CONTEXT_LS_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

/** Increment visit count and stamp lastVisitAt. Returns the post-write state. */
export function recordHomepageVisit(): UserContext {
  const cur = readUserContext();
  const next: UserContext = {
    visitCount: cur.visitCount + 1,
    lastVisitAt: new Date().toISOString(),
  };
  writeUserContext(next);
  return next;
}

export function resetUserContext(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(USER_CONTEXT_LS_KEY);
  } catch {
    /* ignore */
  }
}
