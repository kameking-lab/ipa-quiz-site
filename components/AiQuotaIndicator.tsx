"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { readAiUsage, effectiveDailyLimit } from "@/lib/storage/rate-limit-client";
import { subscribeCopilotOpen, isCopilotOpen } from "@/lib/copilot/visibility";

const POLL_INTERVAL_MS = 15_000;

export function AiQuotaIndicator() {
  const [snapshot, setSnapshot] = React.useState<{ used: number; limit: number } | null>(null);
  const copilotOpen = React.useSyncExternalStore(
    subscribeCopilotOpen,
    isCopilotOpen,
    () => false,
  );

  React.useEffect(() => {
    const update = () => {
      const usage = readAiUsage();
      const limit = effectiveDailyLimit();
      setSnapshot({ used: usage.count, limit });
    };
    update();
    const id = window.setInterval(update, POLL_INTERVAL_MS);
    const onFocus = () => update();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  // Only surface the quota while the AI copilot is actually open — a fixed
  // badge on every page is noise for the many users who never touch the AI.
  if (!copilotOpen) return null;
  if (!snapshot) return null;
  const remaining = Math.max(0, snapshot.limit - snapshot.used);
  // フィードバック送信後は実質無制限になるため、桁が大きい時は隠す
  if (snapshot.limit > 100) return null;

  const exhausted = remaining === 0;
  const palette = exhausted
    ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200"
    : remaining <= 2
      ? "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
      : "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200";

  return (
    <div
      className="pointer-events-none fixed bottom-3 right-3 z-30"
      role="status"
      aria-live="polite"
      aria-label={`今日のAI上限 ${snapshot.used} / ${snapshot.limit} 回`}
    >
      <div
        className={`pointer-events-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-sm ${palette}`}
      >
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        <span>
          今日のAI上限 {snapshot.used}/{snapshot.limit}回
        </span>
      </div>
    </div>
  );
}
