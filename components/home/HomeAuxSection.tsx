"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarClock, MessageCircleQuestion, RotateCcw } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import { daysUntilNextExam } from "@/lib/dashboard/analytics";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

const VALID_EXAM_IDS = new Set<string>(Object.keys(EXAM_LABELS));

interface Resume {
  exam: ExamCode;
  examLabel: string;
}

export function HomeAuxSection() {
  const [resume, setResume] = React.useState<Resume | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const store = createHistoryStore();
    const entries = store.getAllEntries();
    if (entries.length > 0) {
      const last = entries[entries.length - 1]!;
      const head = last.id.split("-")[0]?.toLowerCase();
      if (head && VALID_EXAM_IDS.has(head)) {
        const exam = head as ExamCode;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResume({ exam, examLabel: EXAM_LABELS[exam] ?? exam.toUpperCase() });
      }
    }
    setHydrated(true);
  }, []);

  const next = daysUntilNextExam();

  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white open:shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 [&::-webkit-details-marker]:hidden">
        <span>その他</span>
        <span className="text-xs text-zinc-400 transition group-open:rotate-180">▾</span>
      </summary>
      <div className="space-y-2 border-t border-zinc-100 px-4 py-3 dark:border-zinc-900">
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-lg bg-amber-100 p-1.5 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">次回試験</p>
            <p className="text-zinc-800 dark:text-zinc-200">
              {next.label}まで <strong>{next.days}</strong> 日
            </p>
          </div>
        </div>

        {hydrated && resume && (
          <Link
            href={`/quiz?mode=random&exam=${resume.exam}`}
            className="flex items-center gap-3 rounded-lg px-1 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <span className="rounded-lg bg-emerald-100 p-1.5 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">続きから</p>
              <p className="truncate text-zinc-800 dark:text-zinc-200">
                {resume.examLabel} を再開
              </p>
            </div>
          </Link>
        )}

        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-lg px-1 py-1 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900"
        >
          <span className="rounded-lg bg-sky-100 p-1.5 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
            <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">フィードバック</p>
            <p className="text-zinc-800 dark:text-zinc-200">改善要望・不具合報告</p>
          </div>
        </Link>
      </div>
    </details>
  );
}
