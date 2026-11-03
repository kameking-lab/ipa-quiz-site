"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { subscribeCopilotOpen, isCopilotOpen } from "@/lib/copilot/visibility";

export function AiQuotaIndicator() {
  const copilotOpen = React.useSyncExternalStore(
    subscribeCopilotOpen,
    isCopilotOpen,
    () => false,
  );

  // Only surface the AI hint while the copilot is open.
  if (!copilotOpen) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-3 right-3 z-30"
      role="status"
      aria-label="AI コパイロットは無料で質問できます。連続利用には制限があります"
    >
      <div
        className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-800 shadow-sm backdrop-blur-sm dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200"
      >
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        <span>
          AI に無料で質問
        </span>
      </div>
    </div>
  );
}
