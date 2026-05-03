"use client";

import * as React from "react";
import Link from "next/link";
import { PlayCircle, ArrowRight } from "lucide-react";
import { readLastQuestion, type LastQuestionState } from "@/lib/storage/last-question";
import { examLabel, formatYearSeason } from "@/lib/utils";

const SESSION_LABEL: Record<string, string> = {
  am: "午前",
  am1: "午前I",
  am2: "午前II",
  pm: "午後",
  pm1: "午後I",
  pm2: "午後II",
  "kamoku-a": "科目A",
  "kamoku-b": "科目B",
};

function sessionLabel(session: string): string {
  return SESSION_LABEL[session] ?? session;
}

function formatRelative(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "たった今";
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}日前`;
  return `${Math.floor(days / 7)}週間前`;
}

export function ContinueFromLast() {
  const [last, setLast] = React.useState<LastQuestionState | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLast(readLastQuestion());
  }, []);

  if (!last) return null;

  const nextQNumber = last.qNumber + 1;
  const continueHref = `/q/${last.exam}/${last.year}-${last.season}/${last.session}/q${nextQNumber}`;
  const lastHref = `/q/${last.exam}/${last.year}-${last.season}/${last.session}/q${last.qNumber}`;

  return (
    <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/30">
      <Link
        href={continueHref}
        aria-label={`続きから: ${examLabel(last.exam)} ${formatYearSeason(last.year, last.season)} ${sessionLabel(last.session)} 問${nextQNumber}へ進む`}
        className="group flex items-center gap-3 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
          <PlayCircle className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            続きから 問{nextQNumber} へ進む
          </p>
          <p className="mt-0.5 truncate text-xs text-emerald-700 dark:text-emerald-300">
            前回: {examLabel(last.exam)} {formatYearSeason(last.year, last.season)} {sessionLabel(last.session)} 問{last.qNumber}
            <span className="ml-1.5 text-emerald-600/80 dark:text-emerald-400/80">
              · {formatRelative(last.answeredAt)}
            </span>
          </p>
        </div>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-emerald-700 transition-transform group-hover:translate-x-0.5 dark:text-emerald-300"
          aria-hidden="true"
        />
      </Link>
      <details className="mt-2 text-[11px] text-emerald-700 dark:text-emerald-400">
        <summary className="cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1">
          別のオプション
        </summary>
        <div className="mt-1.5 flex flex-col gap-1 pl-1">
          <Link
            href={lastHref}
            className="inline-flex w-fit items-center gap-1 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900 dark:decoration-emerald-700 dark:hover:text-emerald-100"
          >
            前回の問{last.qNumber} をもう一度見る
          </Link>
          <Link
            href={`/quiz?mode=year&exam=${last.exam}&year=${last.year}&season=${last.season}`}
            className="inline-flex w-fit items-center gap-1 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900 dark:decoration-emerald-700 dark:hover:text-emerald-100"
          >
            この年度をクイズモードで開く
          </Link>
        </div>
      </details>
    </div>
  );
}
