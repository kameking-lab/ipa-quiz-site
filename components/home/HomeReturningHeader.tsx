"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { readUserContext, recordHomepageVisit } from "@/lib/storage/user-context";
import { readLastQuestion, type LastQuestionState } from "@/lib/storage/last-question";
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

export function HomeReturningHeader({ recommendationPool }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [lastQuestion, setLastQuestion] = React.useState<LastQuestionState | null>(null);
  const [recommendations, setRecommendations] = React.useState<RecommendationItem[]>([]);

  React.useEffect(() => {
    // Read the existing visit count BEFORE recording the new one so the
    // "show personalised" gate sees the user as returning only from the
    // 2nd load onward (post-merge with onboarding completion).
    const prior = readUserContext();
    const last = readLastQuestion();
    recordHomepageVisit();
    setMounted(true);

    const isReturning = prior.visitCount >= 1 && last !== null;
    setShow(isReturning);
    setLastQuestion(last);

    const exam = (last?.exam ?? "ap") as ExamCode;
    const examPool = recommendationPool.filter((r) => r.exam === exam);
    const pool = examPool.length >= 5 ? examPool : recommendationPool;
    setRecommendations(pickN(pool, 5, dateSeed()));
  }, [recommendationPool]);

  if (!mounted || !show) return null;

  return (
    <section
      aria-labelledby="returning-header"
      className="mb-6 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:animate-in motion-safe:fade-in"
    >
      <h2 id="returning-header" className="sr-only">
        おかえりなさい
      </h2>

      {lastQuestion && (
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                続きから
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground sm:text-base">
                {formatYearSeason(lastQuestion.year, lastQuestion.season)}{" "}
                {examLabel(lastQuestion.exam)} 問 {lastQuestion.qNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                最後に解いた問題から再開できます
              </p>
            </div>
            <Link
              href={questionPagePath({
                exam: lastQuestion.exam,
                year: lastQuestion.year,
                season: lastQuestion.season,
                session: lastQuestion.session,
                qNumber: lastQuestion.qNumber,
              })}
              className="inline-flex min-h-[44px] items-center gap-1.5 self-start rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:self-auto"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              前回の続きを解く
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
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
