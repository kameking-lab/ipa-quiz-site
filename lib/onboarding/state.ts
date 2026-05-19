import type { OnboardingState, UserAttribute } from "./types";
import type { ExamCode } from "@/lib/questions/types";

export const ONBOARDING_LS_KEY = "kakomon-ai-onboarding-v1";

// Legacy key from the earlier 2-step WelcomeModal. If set, the user has
// already seen an introduction and we should skip the new tour to avoid
// re-prompting existing users.
const LEGACY_ONBOARDED_KEY = "ipa-quiz:onboarded:v1";

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
    if (!raw) {
      // Migration: if the legacy welcome flag is set, treat the tour as
      // already completed so we don't re-prompt returning users.
      const legacy = window.localStorage.getItem(LEGACY_ONBOARDED_KEY);
      if (legacy === "1") {
        const migrated: OnboardingState = {
          ...EMPTY,
          completedTour: new Date().toISOString(),
        };
        window.localStorage.setItem(ONBOARDING_LS_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return EMPTY;
    }
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
  // Keep the legacy flag in sync so future redesigns can opt-in to skip.
  if (isBrowser()) {
    try {
      window.localStorage.setItem(LEGACY_ONBOARDED_KEY, "1");
    } catch {
      /* ignore */
    }
  }
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
  if (isBrowser()) {
    try {
      window.localStorage.setItem(LEGACY_ONBOARDED_KEY, "1");
    } catch {
      /* ignore */
    }
  }
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
    window.localStorage.removeItem(LEGACY_ONBOARDED_KEY);
  } catch {
    /* ignore */
  }
}
