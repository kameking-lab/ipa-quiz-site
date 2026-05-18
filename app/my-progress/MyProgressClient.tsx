"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  Medal,
  Settings,
  Star,
  Target,
  TrendingDown,
  Trash2,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createHistoryStore } from "@/lib/storage/history";
import {
  computeCategoryStats,
  computeExamProbabilities,
  topWeakCategories,
  type CategoryStat,
} from "@/lib/dashboard/analytics";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { readStreak } from "@/lib/streak/storage";
import type { StreakState } from "@/lib/streak/core";
import { getDailyProgress, readDailyGoalTarget, writeDailyGoalTarget, DEFAULT_DAILY_GOAL } from "@/lib/motivation/daily-goal";
import { getEarnedBadges, BADGES, BADGE_THRESHOLDS } from "@/lib/motivation/badges";
import { BadgeMedallion } from "@/components/motivation/BadgeMedallion";

interface QuestionMeta {
  id: string;
  category: string;
  exam: ExamCode;
}

interface Props {
  questions: QuestionMeta[];
}

interface Stats {
  total: number;
  correct: number;
  accuracy: number;
  uniqueAnswered: number;
}

interface ExamRow {
  exam: ExamCode;
  answered: number;
  accuracy: number;
}

interface RecentEntry {
  id: string;
  correct: boolean;
  at: number;
  exam: string;
  category: string;
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}時間前`;
  const d = Math.floor(hr / 24);
  return `${d}日前`;
}

function AccuracyBar({ accuracy, answered }: { accuracy: number; answered: number }) {
  const pctNum = Math.round(accuracy * 100);
  const color =
    pctNum >= 80
      ? "bg-emerald-500"
      : pctNum >= 60
        ? "bg-amber-500"
        : "bg-rose-500";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
        <div
          className={`h-full ${color} rounded-full transition-all`}
          style={{ width: `${pctNum}%` }}
        />
      </div>
      <span className="tabular-nums text-xs text-muted-foreground">
        {pct(accuracy)} ({answered}問)
      </span>
    </div>
  );
}

function StreakSection({ streak }: { streak: StreakState }) {
  const atRisk = streak.currentStreak > 0 && !streak.todayCompleted;
  return (
    <section className="mb-6">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Flame className="h-4 w-4 text-orange-500" />
        学習ストリーク
      </h2>
      <div className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="flex flex-col items-center py-5">
            <div className="flex items-center gap-1.5">
              <Flame
                className={`h-5 w-5 ${streak.todayCompleted ? "text-orange-500" : "text-zinc-400"}`}
                aria-hidden="true"
              />
              <span className="text-3xl font-bold tabular-nums text-foreground">
                {streak.currentStreak}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">現在の連続日数</p>
          </div>
          <div className="flex flex-col items-center py-5">
            <div className="flex items-center gap-1.5">
              <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
              <span className="text-3xl font-bold tabular-nums text-foreground">
                {streak.longestStreak}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">最長連続日数</p>
          </div>
        </div>
        {atRisk && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-b-2xl border-t border-orange-200 bg-orange-50 px-4 py-3 text-xs text-orange-800 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-200"
          >
            <Flame className="h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden="true" />
            今日1問解答するとストリークが継続します
          </div>
        )}
        {streak.currentStreak > 0 && streak.todayCompleted && (
          <div className="flex items-center gap-2 rounded-b-2xl border-t border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            今日の学習済み — ストリーク継続中
          </div>
        )}
      </div>
    </section>
  );
}

interface DailyGoalSectionProps {
  count: number;
  target: number;
  pct: number;
  completed: boolean;
  onTargetChange: (n: number) => void;
}

function DailyGoalSection({ count, target, pct: pctVal, completed, onTargetChange }: DailyGoalSectionProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(target));

  const handleSave = () => {
    const n = parseInt(draft, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 100) {
      onTargetChange(n);
    }
    setEditing(false);
  };

  return (
    <section className="mb-6">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Target className="h-4 w-4 text-primary" />
        今日の目標
      </h2>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums text-foreground">{count}</span>
            <span className="text-sm text-muted-foreground">/ {target} 問</span>
          </div>
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={100}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); }}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center text-sm tabular-nums text-foreground focus:outline-none focus:ring-2 focus:ring-primary/60"
                aria-label="1日の目標問題数"
                autoFocus
              />
              <Button size="sm" onClick={handleSave} className="h-7 px-2 text-xs">保存</Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="h-7 px-2 text-xs">取消</Button>
            </div>
          ) : (
            <button
              onClick={() => { setDraft(String(target)); setEditing(true); }}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              type="button"
            >
              変更
            </button>
          )}
        </div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={Math.min(count, target)}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-label={`今日の学習進捗: ${count}/${target}問`}
        >
          <div
            className={`h-full rounded-full transition-all ${completed ? "bg-emerald-500" : "bg-primary"}`}
            style={{ width: `${pctVal}%` }}
          />
        </div>
        {completed && (
          <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            今日の目標達成！お疲れ様でした
          </p>
        )}
        {!completed && count > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            残り {target - count} 問で目標達成
          </p>
        )}
        {count === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            今日はまだ解答していません
          </p>
        )}
      </div>
    </section>
  );
}

function BadgesSection({ earnedSet }: { earnedSet: Set<number> }) {
  if (earnedSet.size === 0) return null;
  return (
    <section className="mb-6">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Medal className="h-4 w-4 text-amber-500" />
        獲得バッジ（連続学習）
      </h2>
      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
        {BADGE_THRESHOLDS.map((threshold) => {
          const badge = BADGES[threshold];
          const earned = earnedSet.has(threshold);
          return (
            <div key={threshold} className="flex flex-col items-center gap-2">
              <BadgeMedallion badge={badge} earned={earned} size="sm" />
              <div className="text-center">
                <p className={`text-xs font-medium ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                  {badge.name}
                </p>
                <p className="text-[10px] text-muted-foreground">{badge.tagline}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MotivationNudge({ stats }: { stats: Stats }) {
  if (stats.total < 10) return null;
  const acc = stats.accuracy;

  if (acc >= 0.6) {
    if (acc >= 0.8) return null;
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/30">
        <Star className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <p className="text-emerald-800 dark:text-emerald-200">
          正答率 {Math.round(acc * 100)}% — 合格圏内です。このまま続けましょう！
        </p>
      </div>
    );
  }

  const neededCorrect = Math.ceil((0.6 * stats.total - stats.correct) / 0.4);
  if (neededCorrect <= 0) return null;

  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-900/40 dark:bg-amber-950/30">
      <Target className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      <p className="text-amber-800 dark:text-amber-200">
        合格圏（60%）まであと約 <strong>{neededCorrect} 問</strong> 連続正解が必要です
      </p>
    </div>
  );
}

export function MyProgressClient({ questions }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [examRows, setExamRows] = useState<ExamRow[]>([]);
  const [weakCats, setWeakCats] = useState<CategoryStat[]>([]);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [cleared, setCleared] = useState(false);
  const [streak, setStreak] = useState<StreakState | null>(null);
  const [dailyGoal, setDailyGoal] = useState<{ count: number; target: number; pct: number; completed: boolean } | null>(null);
  const [earnedBadges, setEarnedBadges] = useState<Set<number>>(new Set());

  const loadData = useCallback(() => {
    const store = createHistoryStore();
    const s = store.getStats();
    setStats(s);

    const entries = store.getAllEntries();
    const qMeta = questions;

    const catStats = computeCategoryStats(entries, qMeta);
    setWeakCats(topWeakCategories(catStats, 5, 5).filter((c) => c.accuracy < 0.7));

    const examProbs = computeExamProbabilities(entries, qMeta);
    const active = examProbs
      .filter((e) => e.answered > 0)
      .sort((a, b) => b.answered - a.answered);
    setExamRows(active.map((e) => ({ exam: e.exam, answered: e.answered, accuracy: e.accuracy })));

    const qById = new Map(qMeta.map((q) => [q.id, q]));
    const recentEntries = entries
      .slice(-20)
      .reverse()
      .map((e) => {
        const q = qById.get(e.id);
        return {
          id: e.id,
          correct: e.correct,
          at: e.at,
          exam: q ? examLabel(q.exam) : "不明",
          category: q?.category ?? "不明",
        };
      });
    setRecent(recentEntries);

    setStreak(readStreak());
    setDailyGoal(getDailyProgress());
    const badges = getEarnedBadges();
    setEarnedBadges(new Set(badges.earned));
  }, [questions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleTargetChange = useCallback((n: number) => {
    writeDailyGoalTarget(n);
    setDailyGoal(getDailyProgress());
  }, []);

  function handleClear() {
    if (!window.confirm("学習履歴をすべて削除しますか？この操作は取り消せません。")) return;
    createHistoryStore().reset();
    setStats({ total: 0, correct: 0, accuracy: 0, uniqueAnswered: 0 });
    setExamRows([]);
    setWeakCats([]);
    setRecent([]);
    setCleared(true);
  }

  const hasHistory = (stats?.total ?? 0) > 0;

  return (
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />

      <div className="relative mx-auto w-full max-w-2xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            ホーム
          </Link>
        </Button>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-4">
            <BarChart2 className="h-3 w-3" />
            学習レポート
          </Badge>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            マイ進捗
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            履歴はこの端末のブラウザにのみ保存されています。サーバーには送信されません。
          </p>
        </header>

        {cleared && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
            履歴を削除しました。
          </div>
        )}

        {/* Streak */}
        {streak && <StreakSection streak={streak} />}

        {/* Daily goal */}
        {dailyGoal && (
          <DailyGoalSection
            count={dailyGoal.count}
            target={dailyGoal.target}
            pct={dailyGoal.pct}
            completed={dailyGoal.completed}
            onTargetChange={handleTargetChange}
          />
        )}

        {/* Overall stats */}
        {stats !== null && (
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {stats.total.toLocaleString("ja-JP")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">総回答数</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-2xl font-bold tabular-nums text-foreground">
                  {stats.uniqueAnswered.toLocaleString("ja-JP")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">問題数</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                <p
                  className={`text-2xl font-bold tabular-nums ${
                    stats.total > 0
                      ? stats.accuracy >= 0.6
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                      : "text-foreground"
                  }`}
                >
                  {stats.total > 0 ? pct(stats.accuracy) : "--"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">正答率</p>
              </div>
            </div>
          </section>
        )}

        {/* Motivation nudge */}
        {stats && hasHistory && <MotivationNudge stats={stats} />}

        {/* Actions */}
        {hasHistory && (
          <section className="mb-6 flex flex-wrap gap-2">
            <Button asChild size="sm" className="gap-2">
              <Link href="/quiz?mode=review&exam=ap">
                <BookOpen className="h-4 w-4" />
                間違えた問題を復習
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/account/dashboard">
                <Target className="h-4 w-4" />
                詳細ダッシュボード
              </Link>
            </Button>
          </section>
        )}

        {!hasHistory && !cleared && stats !== null && (
          <section className="mb-6 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="font-medium text-foreground">まだ履歴がありません</p>
            <p className="mt-1 text-sm text-muted-foreground">
              クイズを解くと自動で記録されます
            </p>
            <Button asChild className="mt-4">
              <Link href="/">クイズを始める</Link>
            </Button>
          </section>
        )}

        {/* Streak badges */}
        <BadgesSection earnedSet={earnedBadges} />

        {/* Exam breakdown */}
        {examRows.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <BarChart2 className="h-4 w-4 text-primary" />
              試験区分別
            </h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              {examRows.map((row) => (
                <div
                  key={row.exam}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {examLabel(row.exam)}
                  </span>
                  <AccuracyBar accuracy={row.accuracy} answered={row.answered} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Weak categories */}
        {weakCats.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingDown className="h-4 w-4 text-rose-500" />
              苦手分野（正答率70%未満）
            </h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              {weakCats.map((cat) => (
                <div
                  key={cat.category}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-foreground">{cat.category}</span>
                  <AccuracyBar accuracy={cat.accuracy} answered={cat.answered} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent activity */}
        {recent.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              最近の回答
            </h2>
            <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
              {recent.map((e, i) => (
                <div key={`${e.id}-${i}`} className="flex items-center gap-3 px-4 py-3">
                  <CheckCircle2
                    className={`h-4 w-4 shrink-0 ${
                      e.correct ? "text-emerald-500" : "text-rose-500"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{e.category}</p>
                    <p className="text-xs text-muted-foreground">{e.exam}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {relativeTime(e.at)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Data management */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">データ管理</h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
            <Link
              href="/settings#history"
              className="flex items-center justify-between px-4 py-3 text-sm transition hover:bg-muted/50"
            >
              <span className="flex items-center gap-2 text-foreground">
                <Settings className="h-4 w-4 text-muted-foreground" />
                設定（エクスポート・インポート）
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <button
              onClick={handleClear}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-destructive transition hover:bg-destructive/5"
              aria-label="学習履歴を全件削除する"
            >
              <Trash2 className="h-4 w-4" />
              履歴を削除（ブラウザから完全消去）
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            データはこの端末のブラウザ（localStorage）にのみ保存されており、
            サーバーには送信されません。削除は即時かつ不可逆です。
            詳細は
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
        </section>
      </div>
    </main>
  );
}
