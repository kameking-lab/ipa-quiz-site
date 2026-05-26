"use client";

import * as React from "react";
import Link from "next/link";
import { Rocket, ArrowRight, Zap, Target } from "lucide-react";
import { readLastQuestion } from "@/lib/storage/last-question";
import { OPEN_ONBOARDING_EVENT } from "@/components/onboarding/OnboardingTour";

// First-time visitors (no answer history yet) get three low-friction entry
// points instead of a forced onboarding modal (即修正③ / A-1, A-3):
//   1. 3問で試す       — the recommended quick taste (folds in old /quickstart)
//   2. いきなり1問     — zero commitment, one tap to a single question
//   3. 目標を決めて始める — opens the opt-in goal-setting flow (OnboardingTour)
// Returning users already see continue-from-last (HomeReturningHeader), so this
// retracts for them. SSR renders it (the first-time assumption); it hides after
// hydration once a last-question record is found, keeping layout shift minimal.
export function HomeQuickTrialCta() {
  const [mounted, setMounted] = React.useState(false);
  const [hasHistory, setHasHistory] = React.useState(false);

  React.useEffect(() => {
    setHasHistory(readLastQuestion() !== null);
    setMounted(true);
  }, []);

  if (mounted && hasHistory) return null;

  const openGoalFlow = () => {
    window.dispatchEvent(new CustomEvent(OPEN_ONBOARDING_EVENT));
  };

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
      {/* Primary: recommended quick taste */}
      <Link
        href="/quiz?mode=random&exam=ap&limit=3"
        className="group inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Rocket className="h-5 w-5" aria-hidden="true" />
        まずは3問で試す
        <ArrowRight
          className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>

      {/* Secondary: single-question, zero commitment */}
      <Link
        href="/quiz?mode=random&exam=ap&limit=1"
        className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
        いきなり1問
      </Link>

      {/* Tertiary: opt-in goal-setting flow */}
      <button
        type="button"
        onClick={openGoalFlow}
        className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Target className="h-4 w-4 text-primary" aria-hidden="true" />
        目標を決めて始める
      </button>
    </div>
  );
}
