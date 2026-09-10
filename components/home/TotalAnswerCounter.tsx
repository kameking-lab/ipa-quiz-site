"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { PRESENCE_EVENT } from "@/lib/study-presence";

export function TotalAnswerCounter() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const update = (event: Event) => setCount((event as CustomEvent<number | null>).detail);
    window.addEventListener(PRESENCE_EVENT, update);
    return () => window.removeEventListener(PRESENCE_EVENT, update);
  }, []);
  if (count === null) return null;
  return (
    <div role="status" aria-live="polite" className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
      <Users className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <span>
        今、<strong className="tabular-nums">{count.toLocaleString("ja-JP")}</strong>人が一緒に勉強しています。
        <span className="ml-2 inline-block text-[10px] opacity-75" title="同じブラウザの複数タブは1人として集計します。">直近2分の利用状況</span>
      </span>
    </div>
  );
}
