"use client";

import * as React from "react";
import { Users } from "lucide-react";

interface AnswerCountResponse {
  count: number;
  source: "db" | "baseline";
}

const COUNTUP_DURATION_MS = 1500;

export function TotalAnswerCounter() {
  const [target, setTarget] = React.useState<number | null>(null);
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/stats/answer-count", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<AnswerCountResponse>) : null))
      .then((data) => {
        if (!cancelled && data) setTarget(data.count);
      })
      .catch(() => {
        // silent fail — counter just won't show
      });
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const startVal = 0;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNTUP_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplayed(Math.round(startVal + (target - startVal) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  if (target === null) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-900 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100"
    >
      <Users className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <span>
        累計{" "}
        <strong className="tabular-nums text-emerald-700 dark:text-emerald-300">
          {displayed.toLocaleString("ja-JP")}
        </strong>
        {" "}回の回答が共有されています
      </span>
    </div>
  );
}
