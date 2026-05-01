"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpenCheck, ChevronRight } from "lucide-react";
import { summarize } from "@/lib/learning/spaced-repetition";

export function ReviewReminder() {
  const [dueNow, setDueNow] = React.useState(0);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    setDueNow(summarize().dueNow);
  }, []);

  if (!hydrated || dueNow === 0) return null;

  return (
    <Link
      href="/quiz/review"
      className="mt-2 mb-2 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 transition-colors hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/30 dark:hover:bg-amber-950/50"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-amber-500 p-2 text-white">
          <BookOpenCheck className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
            復習が {dueNow} 問あります
          </p>
          <p className="text-[11px] text-amber-700 dark:text-amber-300">
            エビングハウス曲線に沿って、いま復習すると記憶定着が最大化します。
          </p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-amber-700 dark:text-amber-300" />
    </Link>
  );
}
