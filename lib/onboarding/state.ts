import type { OnboardingState, UserAttribute } from "./types";
import type { ExamCode } from "@/lib/questions/types";

export const ONBOARDING_LS_KEY = "kakomon-ai-onboarding-v1";

// Dead key from the long-removed 2-step WelcomeModal. The tour is now opt-in
// (never auto-shows), so there is nothing to "suppress" — this key is no longer
// read or written. cleanupDeadOnboardingKeys() removes it from existing users.
const DEAD_LEGACY_ONBOARDED_KEY = "ipa-quiz:onboarded:v1";

const EMPTY: OnboardingState = {
  firstVisitAt: null,
  completedTour: null,
  dismissedAt: null,
  attribute: null,
  selectedExam: null,
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readOnboardingState(): OnboardingState {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(ONBOARDING_LS_KEY);
    // Pure read — never write on read. (The old legacy-key migration wrote the
    // onboarding key on first load, which is why an empty key appeared even for
    // brand-new visitors. Removed.)
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<OnboardingState>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

function writeOnboardingState(next: OnboardingState): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(ONBOARDING_LS_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

export function markFirstVisit(): OnboardingState {
  const current = readOnboardingState();
  if (current.firstVisitAt) return current;
  const next: OnboardingState = {
    ...current,
    firstVisitAt: new Date().toISOString(),
  };
  writeOnboardingState(next);
  return next;
}

export function markTourCompleted(): OnboardingState {
  const current = readOnboardingState();
  const next: OnboardingState = {
    ...current,
    completedTour: new Date().toISOString(),
    firstVisitAt: current.firstVisitAt ?? new Date().toISOString(),
  };
  writeOnboardingState(next);
  return next;
}

export function markTourDismissed(): OnboardingState {
  const current = readOnboardingState();
  const next: OnboardingState = {
    ...current,
    dismissedAt: new Date().toISOString(),
    firstVisitAt: current.firstVisitAt ?? new Date().toISOString(),
  };
  writeOnboardingState(next);
  return next;
}

export function setAttribute(attribute: UserAttribute): OnboardingState {
  const current = readOnboardingState();
  const next: OnboardingState = { ...current, attribute };
  writeOnboardingState(next);
  return next;
}

export function setSelectedExam(exam: ExamCode): OnboardingState {
  const current = readOnboardingState();
  const next: OnboardingState = { ...current, selectedExam: exam };
  writeOnboardingState(next);
  return next;
}

export function shouldShowTour(state: OnboardingState): boolean {
  return state.completedTour === null && state.dismissedAt === null;
}

export function resetOnboardingForTesting(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(ONBOARDING_LS_KEY);
    window.localStorage.removeItem(DEAD_LEGACY_ONBOARDED_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * One-time removal of the dead legacy onboarding flag from existing users'
 * localStorage. Side-effect-free: deletes a key that no code reads or writes
 * anymore (phase 11 / #9). Called once on app load via DeferredLayoutWidgets.
 */
export function cleanupDeadOnboardingKeys(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(DEAD_LEGACY_ONBOARDED_KEY);
  } catch {
    /* ignore */
  }
}
