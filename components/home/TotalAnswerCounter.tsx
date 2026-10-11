"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { parseStudyPresence, presenceExamName, PRESENCE_EVENT, type StudyPresenceSnapshot } from "@/lib/study-presence";

export function TotalAnswerCounter() {
  const [snapshot, setSnapshot] = useState<StudyPresenceSnapshot | null>(null);
  useEffect(() => {
    const update = (event: Event) => setSnapshot(parseStudyPresence((event as CustomEvent<unknown>).detail));
    window.addEventListener(PRESENCE_EVENT, update);
    return () => window.removeEventListener(PRESENCE_EVENT, update);
  }, []);
  if (snapshot === null) return null;
  return (
    <section aria-label="今学んでいる仲間" aria-live="off" className="mb-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 px-3 py-2 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100">
      <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        {snapshot.exams.length ? (
          <ul className="max-h-28 space-y-1 overflow-y-auto overscroll-contain pr-1" aria-label="資格別の学習人数" tabIndex={0}>
            {snapshot.exams.map(row => (
              <li key={row.exam} className="break-words leading-relaxed">
                今<strong className="tabular-nums">{row.count.toLocaleString("ja-JP")}</strong>人が{presenceExamName(row.exam)}を学んでいます。
              </li>
            ))}
          </ul>
        ) : <p>学習中の資格はまだありません。</p>}
        <p className="mt-1 font-medium">一緒に頑張りましょう！</p>
        <p className="mt-1 text-[10px] opacity-75" title="直近2分に操作した、表示中の問題の資格を集計します。同じブラウザは最後に活動した資格で1人。離脱後も最大2分残ります。">直近2分の学習状況・同じブラウザは1人</p>
      </div>
    </section>
  );
}
