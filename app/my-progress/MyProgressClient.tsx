"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Settings,
  Target,
  TrendingDown,
  Trash2,
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

export function MyProgressClient({ questions }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [examRows, setExamRows] = useState<ExamRow[]>([]);
  const [weakCats, setWeakCats] = useState<CategoryStat[]>([]);
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
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
  }, [questions]);

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
