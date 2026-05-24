"use client";

import * as React from "react";
import type { QuickActionId } from "@/lib/ai/prompts";

const PINNED_ACTIONS_LS_KEY = "kakomon-ai-copilot-pinned-actions-v1";

/** Maximum quick actions a user may pin. Caps at half of the default-visible
 * 6 so non-pinned actions can never be fully crowded out. */
export const MAX_PINNED_ACTIONS = 3;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read(): QuickActionId[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(PINNED_ACTIONS_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is QuickActionId => typeof v === "string");
  } catch {
    return [];
  }
}

function write(ids: QuickActionId[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(PINNED_ACTIONS_LS_KEY, JSON.stringify(ids));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

/**
 * Hook backing the pinned-quick-actions LocalStorage record. Reads on mount,
 * keeps the in-memory list in sync with persistence. Pinning is capped at
 * MAX_PINNED_ACTIONS so non-pinned actions always have room in the default
 * collapsed view.
 */
export function usePinnedQuickActions() {
  const [pinned, setPinned] = React.useState<QuickActionId[]>([]);

  React.useEffect(() => {
    setPinned(read());
  }, []);

  const isPinned = React.useCallback(
    (id: QuickActionId) => pinned.includes(id),
    [pinned],
  );

  const togglePin = React.useCallback((id: QuickActionId) => {
    setPinned((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length >= MAX_PINNED_ACTIONS
          ? prev
          : [...prev, id];
      write(next);
      return next;
    });
  }, []);

  const canPinMore = pinned.length < MAX_PINNED_ACTIONS;

  return { pinned, isPinned, togglePin, canPinMore };
}
