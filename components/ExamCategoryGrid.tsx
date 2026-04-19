"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

interface ExamCardDef {
  id: ExamCode;
  abbr: string;
  name: string;
  sub?: string;
}

const EXAM_CARDS: ExamCardDef[] = [
  { id: "ip", abbr: "IP", name: "ITパスポート" },
  { id: "sg", abbr: "SG", name: "セキュリティ", sub: "マネジメント" },
  { id: "fe", abbr: "FE", name: "基本情報", sub: "技術者" },
  { id: "ap", abbr: "AP", name: "応用情報", sub: "技術者" },
  { id: "sc", abbr: "SC", name: "情報処理", sub: "安全確保支援士" },
  { id: "nw", abbr: "NW", name: "ネットワーク", sub: "スペシャリスト" },
  { id: "db", abbr: "DB", name: "データベース", sub: "スペシャリスト" },
  { id: "es", abbr: "ES", name: "エンベデッド", sub: "システム" },
  { id: "st", abbr: "ST", name: "ITストラテジスト" },
  { id: "sa", abbr: "SA", name: "システム", sub: "アーキテクト" },
  { id: "pm", abbr: "PM", name: "プロジェクト", sub: "マネージャ" },
  { id: "sm", abbr: "SM", name: "ITサービス", sub: "マネージャ" },
  { id: "au", abbr: "AU", name: "システム監査", sub: "技術者" },
];

interface Props {
  /** Question counts per exam code, computed server-side from QUESTIONS_BY_EXAM. */
  questionCounts: Partial<Record<ExamCode, number>>;
}

export function ExamCategoryGrid({ questionCounts }: Props) {
  const [toast, setToast] = React.useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {EXAM_CARDS.map((exam) => {
          const count = questionCounts[exam.id] ?? 0;
          const available = count > 0;
          return available ? (
            <Link
              key={exam.id}
              href="#exam-modes"
              className="group flex flex-col gap-1.5 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow dark:border-sky-700 dark:bg-sky-950/40 dark:hover:border-sky-500 sm:p-4"
            >
              <div className="flex items-start justify-between gap-1">
                <span className="rounded-lg bg-sky-600 px-2 py-0.5 text-sm font-bold text-white">
                  {exam.abbr}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  利用可能
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {exam.name}
                </p>
                {exam.sub && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{exam.sub}</p>
                )}
              </div>
              <p className="text-[11px] text-sky-700 dark:text-sky-300">{count}問収録</p>
            </Link>
          ) : (
            <button
              key={exam.id}
              type="button"
              disabled
              aria-disabled="true"
              tabIndex={-1}
              className="flex cursor-not-allowed flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 text-left opacity-60 dark:border-zinc-800 dark:bg-zinc-900 sm:p-4"
            >
              <div className="flex items-start justify-between gap-1">
                <span className="rounded-lg bg-zinc-400 px-2 py-0.5 text-sm font-bold text-white dark:bg-zinc-600">
                  {exam.abbr}
                </span>
                <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                  近日公開
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {exam.name}
                </p>
                {exam.sub && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">{exam.sub}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white shadow-lg transition-all duration-300 dark:bg-zinc-100 dark:text-zinc-900",
          toast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        近日公開予定です
      </div>
    </>
  );
}
