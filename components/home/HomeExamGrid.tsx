"use client";

import * as React from "react";
import Link from "next/link";
import { Shuffle } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import type { ExamCode } from "@/lib/questions/types";

type DifficultyTier = "beginner" | "standard" | "advanced";

interface ExamCardDef {
  id: ExamCode;
  abbr: string;
  name: string;
  sub?: string;
  tier: DifficultyTier;
}

const EXAM_CARDS: ExamCardDef[] = [
  { id: "ip", abbr: "IP", name: "ITパスポート", tier: "beginner" },
  { id: "sg", abbr: "SG", name: "セキュリティ", sub: "マネジメント", tier: "beginner" },
  { id: "fe", abbr: "FE", name: "基本情報", sub: "技術者", tier: "standard" },
  { id: "ap", abbr: "AP", name: "応用情報", sub: "技術者", tier: "standard" },
  { id: "sc", abbr: "SC", name: "情報処理", sub: "安全確保支援士", tier: "advanced" },
  { id: "nw", abbr: "NW", name: "ネットワーク", sub: "スペシャリスト", tier: "advanced" },
  { id: "db", abbr: "DB", name: "データベース", sub: "スペシャリスト", tier: "advanced" },
  { id: "es", abbr: "ES", name: "エンベデッド", sub: "システム", tier: "advanced" },
  { id: "st", abbr: "ST", name: "ITストラテジスト", tier: "advanced" },
  { id: "sa", abbr: "SA", name: "システム", sub: "アーキテクト", tier: "advanced" },
  { id: "pm", abbr: "PM", name: "プロジェクト", sub: "マネージャ", tier: "advanced" },
  { id: "sm", abbr: "SM", name: "ITサービス", sub: "マネージャ", tier: "advanced" },
  { id: "au", abbr: "AU", name: "システム監査", sub: "技術者", tier: "advanced" },
];

const TIER_LABEL: Record<DifficultyTier, { label: string; className: string }> = {
  beginner: {
    label: "初心者おすすめ",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  standard: {
    label: "定番",
    className:
      "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  },
  advanced: {
    label: "上級",
    className:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
};

const VALID_EXAM_IDS = new Set<string>(EXAM_CARDS.map((e) => e.id));

type ProgressLevel = "untouched" | "in-progress" | "passing";

interface ExamProgress {
  uniqueAnswered: number;
  correct: number;
  total: number;
  level: ProgressLevel;
}

const PASSING_MIN_ANSWERS = 30;
const PASSING_ACCURACY = 0.6;

function computeExamProgress(): Partial<Record<ExamCode, ExamProgress>> {
  const store = createHistoryStore();
  const entries = store.getAllEntries();
  const byExam = new Map<ExamCode, { unique: Set<string>; correct: number; total: number }>();
  for (const entry of entries) {
    const head = entry.id.split("-")[0]?.toLowerCase();
    if (!head || !VALID_EXAM_IDS.has(head)) continue;
    const exam = head as ExamCode;
    const bucket = byExam.get(exam) ?? { unique: new Set<string>(), correct: 0, total: 0 };
    bucket.unique.add(entry.id);
    bucket.total += 1;
    if (entry.correct) bucket.correct += 1;
    byExam.set(exam, bucket);
  }
  const result: Partial<Record<ExamCode, ExamProgress>> = {};
  for (const [exam, b] of byExam.entries()) {
    const accuracy = b.total ? b.correct / b.total : 0;
    let level: ProgressLevel = "in-progress";
    if (b.unique.size === 0) level = "untouched";
    else if (b.unique.size >= PASSING_MIN_ANSWERS && accuracy >= PASSING_ACCURACY) {
      level = "passing";
    }
    result[exam] = {
      uniqueAnswered: b.unique.size,
      correct: b.correct,
      total: b.total,
      level,
    };
  }
  return result;
}

interface Props {
  questionCounts: Partial<Record<ExamCode, number>>;
}

export function HomeExamGrid({ questionCounts }: Props) {
  const [progress, setProgress] = React.useState<Partial<Record<ExamCode, ExamProgress>>>({});
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
     
    setProgress(computeExamProgress());
    setHydrated(true);
  }, []);

  const availableExams = EXAM_CARDS.filter((e) => (questionCounts[e.id] ?? 0) > 0);
  const comingSoonExams = EXAM_CARDS.filter((e) => (questionCounts[e.id] ?? 0) === 0);

  return (
    <>
      {availableExams.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {availableExams.map((exam) => {
            const count = questionCounts[exam.id] ?? 0;
            const p = hydrated ? progress[exam.id] : undefined;
            const level: ProgressLevel = p?.level ?? "untouched";
            const accuracy = p && p.total > 0 ? Math.round((p.correct / p.total) * 100) : null;
            return (
              <ExamCard
                key={exam.id}
                exam={exam}
                count={count}
                level={level}
                uniqueAnswered={p?.uniqueAnswered ?? 0}
                accuracy={accuracy}
              />
            );
          })}
        </div>
      )}

      {comingSoonExams.length > 0 && (
        <>
          <p className="mb-2 mt-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            近日公開
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {comingSoonExams.map((exam) => (
              <div
                key={exam.id}
                aria-disabled="true"
                className="flex flex-col gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5 opacity-55 dark:border-zinc-800 dark:bg-zinc-900 sm:p-4"
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
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

const LEVEL_BADGE: Record<
  ProgressLevel,
  { label: string; className: string; cardBorder: string; cardBg: string }
> = {
  untouched: {
    label: "未回答",
    className:
      "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
    cardBorder: "border-sky-300 dark:border-sky-700",
    cardBg: "bg-sky-50 dark:bg-sky-950/40",
  },
  "in-progress": {
    label: "解答中",
    className:
      "bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-200",
    cardBorder: "border-sky-400 dark:border-sky-600",
    cardBg: "bg-sky-50 dark:bg-sky-950/40",
  },
  passing: {
    label: "合格圏",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    cardBorder: "border-emerald-400 dark:border-emerald-600",
    cardBg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
};

function ExamCard({
  exam,
  count,
  level,
  uniqueAnswered,
  accuracy,
}: {
  exam: ExamCardDef;
  count: number;
  level: ProgressLevel;
  uniqueAnswered: number;
  accuracy: number | null;
}) {
  const v = LEVEL_BADGE[level];
  const tier = TIER_LABEL[exam.tier];
  return (
    <div
      className={`group relative flex flex-col gap-1.5 rounded-2xl border-2 p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow sm:p-4 ${v.cardBorder} ${v.cardBg}`}
    >
      <Link
        href={`/${exam.id}`}
        aria-label={`${exam.name}の詳細を開く${level === "in-progress" ? `（解答中・${uniqueAnswered}問解答済み・正答率${accuracy ?? "—"}%）` : level === "passing" ? "（合格圏）" : "（未挑戦）"}`}
        className="flex flex-col gap-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex items-start justify-between gap-1">
          <span className="rounded-lg bg-sky-600 px-2 py-0.5 text-sm font-bold text-white">
            {exam.abbr}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${v.className}`}
          >
            {level === "untouched"
              ? "未挑戦"
              : accuracy !== null
                ? `正答率 ${accuracy}%`
                : v.label}
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
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tier.className}`}
          >
            {tier.label}
          </span>
          <span className="text-[11px] text-sky-700 dark:text-sky-300">
            {uniqueAnswered > 0 ? `${uniqueAnswered}/${count}問` : `${count}問`}
          </span>
        </div>
      </Link>
      <Link
        href={`/quiz?mode=random&exam=${exam.id}`}
        aria-label={`${exam.name}をランダム出題で開始`}
        className="absolute bottom-1.5 right-1.5 z-10 flex h-11 w-11 items-center justify-center rounded-md bg-white/90 text-sky-700 shadow-sm ring-1 ring-sky-200 transition hover:bg-sky-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-zinc-900/90 dark:text-sky-300 dark:ring-sky-800 dark:hover:bg-sky-600 dark:hover:text-white"
      >
        <Shuffle className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
