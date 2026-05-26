"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Flame, Sparkles, Target } from "lucide-react";
import { readUserContext, recordHomepageVisit } from "@/lib/storage/user-context";
import { readLastQuestion, type LastQuestionState } from "@/lib/storage/last-question";
import { readOnboardingState } from "@/lib/onboarding/state";
import { createHistoryStore } from "@/lib/storage/history";
import { readStreak } from "@/lib/streak";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { questionPagePath } from "@/lib/seo/question-url";
import type { ExamCode, Season, Session } from "@/lib/questions/types";

export interface RecommendationItem {
  id: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  category: string;
}

interface Props {
  /**
   * Server-side selected pool. The client picks 5 deterministically per
   * calendar date so the recommendation stays stable across reloads but
   * rotates daily.
   */
  recommendationPool: RecommendationItem[];
}

/**
 * Mulberry32 — small deterministic PRNG so '今日のおすすめ' is the same
 * across reloads but rotates daily.
 */
function dateSeed(): number {
  const d = new Date();
  const ymd = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return ymd >>> 0;
}
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickN<T>(arr: T[], n: number, seed: number): T[] {
  const a = [...arr];
  const rnd = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

type RecommendMode = "target" | "history";

/**
 * Build a 5-item recommendation list weighted ~70% target / ~30% history.
 * With 5 picks that maps to 4 from target + 1 from history exam.
 * Falls back gracefully when either pool is empty.
 */
function buildWeightedRecommendations(
  pool: RecommendationItem[],
  targetExam: ExamCode | null,
  historyExam: ExamCode | null,
  seed: number,
): RecommendationItem[] {
  const TOTAL = 5;
  if (!targetExam && !historyExam) {
    return pickN(pool, TOTAL, seed);
  }
  if (targetExam && historyExam && targetExam !== historyExam) {
    const targetPool = pool.filter((r) => r.exam === targetExam);
    const historyPool = pool.filter((r) => r.exam === historyExam);
    const fromTarget = pickN(targetPool, 4, seed);
    const fromHistory = pickN(historyPool, 1, seed ^ 0x9e3779b1);
    const combined = [...fromTarget, ...fromHistory];
    if (combined.length >= TOTAL) return combined.slice(0, TOTAL);
    // Pad from the other pool first, then from the full pool, to stay relevant.
    const seen = new Set(combined.map((r) => r.id));
    const fillers = [
      ...targetPool,
      ...historyPool,
      ...pool,
    ].filter((r) => !seen.has(r.id));
    return [...combined, ...pickN(fillers, TOTAL - combined.length, seed)].slice(0, TOTAL);
  }
  const primary = targetExam ?? historyExam!;
  const primaryPool = pool.filter((r) => r.exam === primary);
  if (primaryPool.length >= TOTAL) return pickN(primaryPool, TOTAL, seed);
  // primaryPool too small: pad from broader pool.
  const seen = new Set(primaryPool.map((r) => r.id));
  const fillers = pool.filter((r) => !seen.has(r.id));
  return [
    ...primaryPool,
    ...pickN(fillers, TOTAL - primaryPool.length, seed),
  ].slice(0, TOTAL);
}

export function HomeReturningHeader({ recommendationPool }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [lastQuestion, setLastQuestion] = React.useState<LastQuestionState | null>(null);
  const [targetExam, setTargetExam] = React.useState<ExamCode | null>(null);
  const [mode, setMode] = React.useState<RecommendMode>("target");
  const [accuracy, setAccuracy] = React.useState<{ pct: number; total: number } | null>(null);
  const [streak, setStreak] = React.useState(0);

  React.useEffect(() => {
    // Read the existing visit count BEFORE recording the new one so the
    // "show personalised" gate sees the user as returning only from the
    // 2nd load onward (post-merge with onboarding completion).
    const prior = readUserContext();
    const last = readLastQuestion();
    const onboarding = readOnboardingState();
    recordHomepageVisit();
    setMounted(true);

    const isReturning = prior.visitCount >= 1 && last !== null;
    setShow(isReturning);
    setLastQuestion(last);
    setTargetExam(onboarding.selectedExam ?? null);
    setMode(onboarding.selectedExam ? "target" : "history");

    const stats = createHistoryStore().getStats();
    setAccuracy(
      stats.total > 0
        ? { pct: Math.round(stats.accuracy * 100), total: stats.total }
        : null,
    );
    setStreak(readStreak().currentStreak);
  }, []);

  const recommendations = React.useMemo(() => {
    const historyExam = (lastQuestion?.exam ?? null) as ExamCode | null;
    if (mode === "history") {
      return buildWeightedRecommendations(recommendationPool, null, historyExam, dateSeed());
    }
    return buildWeightedRecommendations(recommendationPool, targetExam, historyExam, dateSeed());
  }, [recommendationPool, targetExam, lastQuestion, mode]);

  if (!mounted || !show) return null;

  const hasToggle = targetExam !== null && lastQuestion !== null && targetExam !== lastQuestion.exam;

  return (
    <section
      aria-labelledby="returning-header"
      className="mb-6 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:animate-in motion-safe:fade-in"
    >
      {targetExam && (
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Target className="h-3.5 w-3.5" aria-hidden="true" />
            目標: {examLabel(targetExam)}
          </span>
          {hasToggle && (
            <div
              role="group"
              aria-label="おすすめの基準を切り替え"
              className="inline-flex rounded-full border border-border bg-card p-0.5 text-[11px] font-medium"
            >
              <button
                type="button"
                onClick={() => setMode("target")}
                aria-pressed={mode === "target"}
                className={
                  mode === "target"
                    ? "rounded-full bg-primary px-2.5 py-1 text-primary-foreground"
                    : "rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground"
                }
              >
                目標
              </button>
              <button
                type="button"
                onClick={() => setMode("history")}
                aria-pressed={mode === "history"}
                className={
                  mode === "history"
                    ? "rounded-full bg-primary px-2.5 py-1 text-primary-foreground"
                    : "rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground"
                }
              >
                履歴
              </button>
            </div>
          )}
        </div>
      )}

      {lastQuestion && (
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-card p-5 shadow-sm sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            続きから
          </p>
          <h1
            id="returning-header"
            className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            続きから解く
          </h1>
          <p className="mt-1 text-sm font-medium text-foreground">
            {formatYearSeason(lastQuestion.year, lastQuestion.season)}{" "}
            {examLabel(lastQuestion.exam)} 問 {lastQuestion.qNumber}
          </p>
          {(accuracy || streak > 0) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              {accuracy && (
                <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1 font-medium text-muted-foreground ring-1 ring-border">
                  正答率 <span className="text-foreground">{accuracy.pct}%</span>
                  <span className="text-muted-foreground/70">（{accuracy.total}問）</span>
                </span>
              )}
              {streak > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  {streak}日連続
                </span>
              )}
            </div>
          )}
          <Link
            href={questionPagePath({
              exam: lastQuestion.exam,
              year: lastQuestion.year,
              season: lastQuestion.season,
              session: lastQuestion.session,
              qNumber: lastQuestion.qNumber,
            })}
            className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            前回の続きを解く
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            今日のおすすめ 5 問
          </h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {recommendations.map((r) => (
              <li key={r.id}>
                <Link
                  href={questionPagePath({
                    exam: r.exam,
                    year: r.year,
                    season: r.season,
                    session: r.session,
                    qNumber: r.qNumber,
                  })}
                  className="block rounded-xl border border-border bg-card px-3 py-2.5 text-xs transition-colors hover:bg-muted"
                >
                  <span className="font-semibold uppercase text-muted-foreground">
                    {r.exam}
                  </span>
                  <span className="ml-1 text-foreground">
                    {formatYearSeason(r.year, r.season)} 問 {r.qNumber}
                  </span>
                  <span className="mt-1 block truncate text-[11px] text-muted-foreground">
                    {r.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
