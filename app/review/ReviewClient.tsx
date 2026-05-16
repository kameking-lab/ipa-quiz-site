"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LS_KEYS } from "@/lib/storage/keys";
import type { Question } from "@/lib/questions/types";

const REVIEW_KEY = "ipa-quiz:review:v1";

// エビングハウス曲線ベースの復習間隔（日数）
const INTERVALS = [1, 3, 7, 14, 30, 60, 120];

interface ReviewRecord {
  questionId: string;
  level: number; // 0 = 初回, 1 = 1日後, ...
  nextReviewAt: string; // ISO date string
  correctStreak: number;
}

type ReviewStore = Record<string, ReviewRecord>;

function getNextReviewDate(level: number): string {
  const days = INTERVALS[Math.min(level, INTERVALS.length - 1)] ?? 120;
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function ReviewClient() {
  const [store, setStore] = useState<ReviewStore>({});
  const [dueQuestions, setDueQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [done, setDone] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [emptyMeta, setEmptyMeta] = useState<{
    seenCount: number;
    scheduledCount: number;
    nextReviewDate: string | null;
  }>({ seenCount: 0, scheduledCount: 0, nextReviewDate: null });

  // localStorageから復習データを収集し、サーバーAPIで本日の復習問題を取得
  useEffect(() => {
    void (async () => {
      try {
        const raw = localStorage.getItem(REVIEW_KEY);
        const loaded: ReviewStore = raw ? (JSON.parse(raw) as ReviewStore) : {};
        setStore(loaded);

        const today = getTodayStr();
        const historyRaw = localStorage.getItem(LS_KEYS.history);
        const history: Array<{ questionId: string }> = historyRaw
          ? (JSON.parse(historyRaw) as Array<{ questionId: string }>)
          : [];
        const historyIds = [...new Set(history.map((h) => h.questionId))];

        const reviewStore = Object.fromEntries(
          Object.entries(loaded).map(([id, r]) => [id, { nextReviewAt: r.nextReviewAt }]),
        );

        const res = await fetch("/api/review/due", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ historyIds, reviewStore, today }),
        });

        if (res.ok) {
          const data = (await res.json()) as {
            questions: Question[];
            seenCount: number;
            scheduledCount: number;
            nextReviewDate: string | null;
          };
          setDueQuestions(data.questions);
          setEmptyMeta({
            seenCount: data.seenCount,
            scheduledCount: data.scheduledCount,
            nextReviewDate: data.nextReviewDate,
          });
        }

        setInitialized(true);
      } catch {
        setInitialized(true);
      }
    })();
  }, []);

  const saveStore = useCallback((newStore: ReviewStore) => {
    setStore(newStore);
    try {
      localStorage.setItem(REVIEW_KEY, JSON.stringify(newStore));
    } catch { /* ignore */ }
  }, []);

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      const q = dueQuestions[currentIndex];
      if (!q) return;

      const current = store[q.id] ?? { questionId: q.id, level: 0, nextReviewAt: getTodayStr(), correctStreak: 0 };
      const newLevel = isCorrect ? Math.min(current.level + 1, INTERVALS.length - 1) : 0;
      const newRecord: ReviewRecord = {
        questionId: q.id,
        level: newLevel,
        nextReviewAt: getNextReviewDate(newLevel),
        correctStreak: isCorrect ? current.correctStreak + 1 : 0,
      };

      saveStore({ ...store, [q.id]: newRecord });
      setSessionStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      if (currentIndex + 1 >= dueQuestions.length) {
        setDone(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setShowAnswer(false);
      }
    },
    [currentIndex, dueQuestions, store, saveStore],
  );

  if (!initialized) {
    return (
      <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        読み込み中...
      </div>
    );
  }

  if (dueQuestions.length === 0) {
    const isFreshUser = emptyMeta.seenCount === 0;
    const nextDateLabel = emptyMeta.nextReviewDate
      ? new Date(emptyMeta.nextReviewDate).toLocaleDateString("ja-JP", {
          month: "long",
          day: "numeric",
          weekday: "short",
        })
      : null;

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-10 text-center">
            <div className="text-3xl">{isFreshUser ? "📚" : "🎉"}</div>
            <p className="mt-3 font-medium">
              {isFreshUser ? "復習キューはまだ空です" : "今日の復習は完了です"}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {isFreshUser
                ? "問題を解くと自動で復習スケジュールに追加されます。"
                : "良いペースです。次回までゆっくり休みましょう。"}
            </p>

            {!isFreshUser && (
              <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">学習済み問題</div>
                  <div className="mt-0.5 text-lg font-semibold tabular-nums">
                    {emptyMeta.seenCount.toLocaleString()} 問
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">復習スケジュール済</div>
                  <div className="mt-0.5 text-lg font-semibold tabular-nums">
                    {emptyMeta.scheduledCount.toLocaleString()} 問
                  </div>
                </div>
              </div>
            )}

            {nextDateLabel && (
              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                次回復習予定: <span className="font-medium text-zinc-700 dark:text-zinc-300">{nextDateLabel}</span>
              </p>
            )}
          </CardContent>
        </Card>

        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm dark:border-sky-900 dark:bg-sky-950/30">
          <p className="font-medium text-sky-800 dark:text-sky-300">間隔反復学習とは</p>
          <p className="mt-1 text-sky-700 dark:text-sky-400">
            エビングハウスの忘却曲線に基づき、1日→3日→7日→14日→30日と
            復習間隔を伸ばすことで、効率的に長期記憶に定着させます。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button asChild variant="primary" className="w-full">
            <Link href="/ap">{isFreshUser ? "問題を解き始める" : "新しい問題を解く"}</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/mock-exam">模試で実力チェック</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (done) {
    const total = sessionStats.correct + sessionStats.incorrect;
    const score = total > 0 ? Math.round((sessionStats.correct / total) * 100) : 0;

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-8 text-center">
            <div className="text-3xl font-bold tabular-nums text-sky-600 dark:text-sky-400">
              {score}%
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {sessionStats.correct} / {total} 問正解
            </div>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              次回の復習スケジュールが更新されました
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => { setCurrentIndex(0); setShowAnswer(false); setDone(false); setSessionStats({ correct: 0, incorrect: 0 }); }}
            className="flex-1"
          >
            もう一度
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </div>
    );
  }

  const q = dueQuestions[currentIndex]!;
  const correctAnswer = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const record = store[q.id];
  const nextInterval = INTERVALS[Math.min((record?.level ?? 0) + 1, INTERVALS.length - 1)];

  return (
    <div className="space-y-4">
      {/* プログレス */}
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>{currentIndex + 1} / {dueQuestions.length}</span>
        <span>✓ {sessionStats.correct} ✗ {sessionStats.incorrect}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentIndex) / dueQuestions.length) * 100}%` }}
        />
      </div>

      {/* 問題 */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-3 flex gap-2">
            <Badge variant="outline" className="text-xs">{q.exam.toUpperCase()}</Badge>
            <Badge variant="outline" className="text-xs">{q.category}</Badge>
            {record && (
              <Badge variant="outline" className="text-xs">Lv.{record.level}</Badge>
            )}
          </div>
          <p className="text-sm leading-relaxed">{q.question}</p>
        </CardContent>
      </Card>

      {/* 選択肢 */}
      {!showAnswer && (
        <div className="space-y-2">
          {Object.entries(q.choices ?? {}).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setShowAnswer(true)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-left text-sm hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-700 dark:hover:border-sky-600 dark:hover:bg-sky-950/30"
            >
              <span className="font-medium">{key}</span>
              <span className="ml-2">{value}</span>
            </button>
          ))}
        </div>
      )}

      {showAnswer && (
        <>
          <Card className="border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30">
            <CardContent className="p-4">
              <div className="mb-2 font-medium text-emerald-800 dark:text-emerald-300">
                正解: {correctAnswer}
              </div>
              <p className="text-sm leading-relaxed text-emerald-700 dark:text-emerald-400">
                {q.explanation}
              </p>
              {nextInterval && (
                <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-500">
                  正解すると次回は {nextInterval} 日後
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleAnswer(false)}
              className="border-rose-300 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/30"
            >
              ✗ 間違えた
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAnswer(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
            >
              ✓ 正解した
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
