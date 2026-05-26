"use client";

import * as React from "react";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";
import { readLastQuestion } from "@/lib/storage/last-question";

// First-time visitors (no answer history yet) get a single, low-friction
// "try 3 questions" entry point right above the 13 exam-category cards —
// folding in the old /quickstart flow so trying the product is one tap, not
// a multi-step detour. Returning users already see the continue-from-last
// card (HomeReturningHeader), so this retracts for them. SSR renders the CTA
// (the first-time assumption) and it only hides after hydration once a
// last-question record is found, keeping layout shift minimal.
export function HomeQuickTrialCta() {
  const [mounted, setMounted] = React.useState(false);
  const [hasHistory, setHasHistory] = React.useState(false);

  React.useEffect(() => {
    setHasHistory(readLastQuestion() !== null);
    setMounted(true);
  }, []);

  if (mounted && hasHistory) return null;

  return (
    <div className="mb-4">
      <Link
        href="/quiz?mode=random&exam=ap&limit=3"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
      >
        <Rocket className="h-5 w-5" aria-hidden="true" />
        まずは応用情報を3問だけ試す
        <ArrowRight
          className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
