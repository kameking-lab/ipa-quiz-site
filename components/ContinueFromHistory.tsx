"use client";

import * as React from "react";
import Link from "next/link";
import { Play, RotateCcw } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

const VALID_EXAM_CODES = Object.keys(EXAM_LABELS) as ExamCode[];

function parseExamFromQuestionId(id: string): ExamCode | null {
  const head = id.split("-")[0]?.toLowerCase();
  if (!head) return null;
  return (VALID_EXAM_CODES as string[]).includes(head) ? (head as ExamCode) : null;
}

interface Resume {
  exam: ExamCode;
  examLabel: string;
  answeredCount: number;
  lastAt: number;
}

export function ContinueFromHistory() {
  const [resume, setResume] = React.useState<Resume | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
    const history = createHistoryStore();
    const entries = history.getAllEntries();
    if (entries.length === 0) return;
    const last = entries[entries.length - 1]!;
    const exam = parseExamFromQuestionId(last.id);
    if (!exam) return;
    setResume({
      exam,
      examLabel: EXAM_LABELS[exam] ?? exam.toUpperCase(),
      answeredCount: entries.length,
      lastAt: last.at,
    });
  }, []);

  if (!hydrated) return null;

  if (!resume) {
    return (
      <Link
        href="/quiz?mode=random&exam=ap"
        className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
      >
        <div className="mb-1.5 flex items-center gap-2">
          <span className="rounded-lg bg-zinc-700 p-2 text-white">
            <RotateCcw className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold">続きから</span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          まずは1問解いてみましょう。続きの再開はここから簡単にできます。
        </p>
      </Link>
    );
  }

  const sinceText = formatSince(resume.lastAt);

  return (
    <Link
      href={`/quiz?mode=random&exam=${resume.exam}`}
      className="group relative overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-sky-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-emerald-800 dark:from-emerald-950/40 dark:to-sky-950/40"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-lg bg-emerald-600 p-2 text-white shadow">
          <RotateCcw className="h-5 w-5" />
        </span>
        <span className="text-base font-semibold">続きから</span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
        前回は <span className="font-semibold">{resume.examLabel}</span> を {resume.answeredCount} 問学習。{sinceText}に再開できます。
      </p>
    </Link>
  );
}

function formatSince(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "ついさっき";
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}日前`;
  return "前回";
}

export function PlayNowCard() {
  return (
    <Link
      href="/quiz?mode=random&exam=ap"
      className="group relative overflow-hidden rounded-2xl border-2 border-sky-400 bg-gradient-to-br from-sky-50 via-violet-50 to-fuchsia-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-sky-600 dark:from-sky-950/40 dark:via-violet-950/40 dark:to-fuchsia-950/40"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-lg bg-sky-600 p-2 text-white shadow">
          <Play className="h-5 w-5" />
        </span>
        <span className="text-base font-semibold">いますぐ解く</span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
        ランダム出題ですぐに学習スタート。試験区分は下の一覧から切り替えられます。
      </p>
    </Link>
  );
}
