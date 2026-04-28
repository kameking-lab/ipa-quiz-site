import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { jstChallengeDate, dateSeed, pickDeterministic, DAILY_CHALLENGE_SIZE } from "@/lib/gamification/daily-challenge";
import { DailyChallengeClient } from "./DailyChallengeClient";
import type { Question } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "デイリーチャレンジ",
  description: "毎日 5 問の出題に挑戦してXPを獲得しよう。",
};

function isPlaceholderExplanation(q: Question): boolean {
  return /^正解は[アイウエ]です[。.]/.test(q.explanation) || q.explanation.trim() === "";
}

function isQualified(q: Question): boolean {
  if (q.type !== "multiple-choice") return false;
  if (q.hasImage) return false;
  if (q.needsReview) return false;
  if (!q.choices?.ア || !q.choices?.イ || !q.choices?.ウ || !q.choices?.エ) return false;
  if (isPlaceholderExplanation(q)) return false;
  if (/次の表|以下の表|下の表|次の図|以下の図|下の図/.test(q.question)) return false;
  return true;
}

export default function DailyChallengePage() {
  const date = jstChallengeDate();
  const seed = dateSeed(date);
  const pool = ALL_QUESTIONS.filter(isQualified);
  const picks = pickDeterministic(pool, DAILY_CHALLENGE_SIZE, seed);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6">
      <Link
        href="/"
        className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        ホームへ戻る
      </Link>
      <header className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Calendar className="h-6 w-6 text-violet-500" />
          デイリーチャレンジ
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {date} の問題 — 全問正解でボーナスXP獲得！
        </p>
      </header>
      {picks.length === DAILY_CHALLENGE_SIZE ? (
        <DailyChallengeClient questions={picks} date={date} />
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            出題候補が不足しているため、本日のチャレンジを生成できません。
          </p>
        </div>
      )}
    </main>
  );
}
