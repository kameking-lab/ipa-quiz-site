import { describe, it, expect, beforeEach } from "vitest";
import {
  ONBOARDING_LS_KEY,
  readOnboardingState,
  markFirstVisit,
  markTourCompleted,
  markTourDismissed,
  setAttribute,
  setSelectedExam,
  cleanupDeadOnboardingKeys,
} from "@/lib/onboarding/state";
import type { OnboardingState } from "@/lib/onboarding/types";

const LEGACY_KEY = "kakomon-ai-onboarding-v1";
const DEAD_KEY = "ipa-quiz:onboarded:v1";

function seed(state: Partial<OnboardingState>): void {
  localStorage.setItem(ONBOARDING_LS_KEY, JSON.stringify(state));
}

beforeEach(() => {
  localStorage.clear();
});

describe("readOnboardingState", () => {
  it("returns the all-null EMPTY state when nothing is stored", () => {
    expect(readOnboardingState()).toEqual({
      firstVisitAt: null,
      completedTour: null,
      dismissedAt: null,
      attribute: null,
      selectedExam: null,
    });
  });

  it("returns EMPTY when stored JSON is corrupt", () => {
    localStorage.setItem(ONBOARDING_LS_KEY, "{not json");
    expect(readOnboardingState().firstVisitAt).toBeNull();
  });

  it("fills missing fields from EMPTY when only a partial state is stored", () => {
    seed({ attribute: "beginner" });
    const state = readOnboardingState();
    expect(state.attribute).toBe("beginner");
    expect(state.completedTour).toBeNull();
    expect(state.selectedExam).toBeNull();
  });

  it("migrates the legacy kakomon-ai key onto the ipa-quiz key", () => {
    localStorage.setItem(
      LEGACY_KEY,
      JSON.stringify({ firstVisitAt: "2024-01-01T00:00:00.000Z" }),
    );
    // new key absent -> migration should adopt the legacy data
    const state = readOnboardingState();
    expect(state.firstVisitAt).toBe("2024-01-01T00:00:00.000Z");
    expect(localStorage.getItem(ONBOARDING_LS_KEY)).not.toBeNull();
  });
});

describe("markFirstVisit", () => {
  it("sets firstVisitAt to an ISO timestamp when previously null", () => {
    const state = markFirstVisit();
    expect(state.firstVisitAt).not.toBeNull();
    expect(Number.isNaN(Date.parse(state.firstVisitAt as string))).toBe(false);
  });

  it("is idempotent: does not overwrite an existing firstVisitAt", () => {
    seed({ firstVisitAt: "2020-05-05T00:00:00.000Z" });
    const state = markFirstVisit();
    expect(state.firstVisitAt).toBe("2020-05-05T00:00:00.000Z");
  });
});

describe("markTourCompleted", () => {
  it("records completedTour and backfills firstVisitAt when null", () => {
    const state = markTourCompleted();
    expect(state.completedTour).not.toBeNull();
    expect(state.firstVisitAt).not.toBeNull();
  });

  it("preserves an existing firstVisitAt", () => {
    seed({ firstVisitAt: "2020-05-05T00:00:00.000Z" });
    const state = markTourCompleted();
    expect(state.firstVisitAt).toBe("2020-05-05T00:00:00.000Z");
    expect(readOnboardingState().completedTour).toBe(state.completedTour);
  });
});

describe("markTourDismissed", () => {
  it("records dismissedAt and backfills firstVisitAt when null", () => {
    const state = markTourDismissed();
    expect(state.dismissedAt).not.toBeNull();
    expect(state.firstVisitAt).not.toBeNull();
  });

  it("preserves an existing firstVisitAt", () => {
    seed({ firstVisitAt: "2020-05-05T00:00:00.000Z" });
    expect(markTourDismissed().firstVisitAt).toBe("2020-05-05T00:00:00.000Z");
  });
});

describe("setAttribute / setSelectedExam", () => {
  it("persists the attribute while preserving other fields", () => {
    seed({ firstVisitAt: "2020-05-05T00:00:00.000Z" });
    const state = setAttribute("last-minute");
    expect(state.attribute).toBe("last-minute");
    expect(state.firstVisitAt).toBe("2020-05-05T00:00:00.000Z");
    expect(readOnboardingState().attribute).toBe("last-minute");
  });

  it("persists the selected exam while preserving other fields", () => {
    seed({ attribute: "experienced" });
    const state = setSelectedExam("fe");
    expect(state.selectedExam).toBe("fe");
    expect(state.attribute).toBe("experienced");
    expect(readOnboardingState().selectedExam).toBe("fe");
  });
});

describe("cleanupDeadOnboardingKeys", () => {
  it("removes the dead legacy onboarded key without touching the active state", () => {
    localStorage.setItem(DEAD_KEY, "1");
    seed({ attribute: "beginner" });
    cleanupDeadOnboardingKeys();
    expect(localStorage.getItem(DEAD_KEY)).toBeNull();
    expect(readOnboardingState().attribute).toBe("beginner");
  });
});
