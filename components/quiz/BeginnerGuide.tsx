"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Sparkles, Target, BookOpen, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createHistoryStore } from "@/lib/storage/history";
import type { ExamCode } from "@/lib/questions/types";

interface Milestone {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  reached: (s: { unique: number; accuracy: number; categories: number }) => boolean;
  goal: string;
}

function buildMilestones(): Milestone[] {
  return [
    {
      id: "first-10",
      label: "最初の10問を解く",
      description: "クイズに慣れる第一歩",
      icon: <BookOpen className="h-4 w-4" />,
      reached: (s) => s.unique >= 10,
      goal: "10問",
    },
    {
      id: "first-100",
      label: "100問達成",
      description: "本格的な学習スタート",
      icon: <Target className="h-4 w-4" />,
      reached: (s) => s.unique >= 100,
      goal: "100問",
    },
    {
      id: "all-categories",
      label: "全分野に触れる",
      description: "得意・不得意の把握",
      icon: <Sparkles className="h-4 w-4" />,
      reached: (s) => s.categories >= 9,
      goal: "9分野",
    },
    {
      id: "accuracy-60",
      label: "正答率 60% 突破",
      description: "合格圏内の入口",
      icon: <Trophy className="h-4 w-4" />,
      reached: (s) => s.accuracy >= 0.6 && s.unique >= 50,
      goal: "正答率60%",
    },
    {
      id: "accuracy-70",
      label: "正答率 70% 突破",
      description: "合格圏内に到達",
      icon: <Trophy className="h-4 w-4" />,
      reached: (s) => s.accuracy >= 0.7 && s.unique >= 80,
      goal: "正答率70%",
    },
  ];
}

export function BeginnerGuide({ exam }: { exam: ExamCode }) {
  const [progress, setProgress] = React.useState<{
    unique: number;
    accuracy: number;
    categories: number;
  } | null>(null);

  React.useEffect(() => {
    const history = createHistoryStore();
    const stats = history.getStats();
    const ids = new Set(history.getAnsweredIds());
    setProgress({
      unique: stats.uniqueAnswered,
      accuracy: stats.accuracy,
      categories: ids.size > 0 ? Math.min(9, Math.floor(stats.uniqueAnswered / 10)) : 0,
    });
  }, []);

  const milestones = React.useMemo(() => buildMilestones(), []);
  const isNew = !progress || progress.unique < 5;

  if (!progress) {
    return <div className="h-32 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  return (
    <Card className="border-sky-200 bg-gradient-to-br from-sky-50/50 to-white dark:border-sky-900/40 dark:from-sky-950/20 dark:to-zinc-950">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          {isNew ? "ここから始めよう" : "学習マイルストーン"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isNew && (
          <div className="mb-4 rounded-lg bg-white p-3 text-sm dark:bg-zinc-900">
            <p className="mb-2 font-medium text-zinc-900 dark:text-zinc-100">
              はじめてのあなたへ
            </p>
            <ol className="ml-5 list-decimal space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>まずは「ランダム10問」で力試し</li>
              <li>分からなかったら AI コパイロットに質問</li>
              <li>間違えた問題は「復習モード」で間隔反復学習</li>
            </ol>
            <Button asChild size="sm" variant="primary" className="mt-3">
              <Link href={`/quiz?mode=random&exam=${exam}`}>10問チャレンジを開始</Link>
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {milestones.map((m) => {
            const done = m.reached(progress);
            return (
              <div
                key={m.id}
                className={
                  done
                    ? "flex items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/30"
                    : "flex items-center gap-3 rounded-lg bg-white px-3 py-2 dark:bg-zinc-900"
                }
              >
                <div
                  className={
                    done
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-400 dark:text-zinc-600"
                  }
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div
                    className={
                      done
                        ? "text-sm font-medium text-emerald-800 dark:text-emerald-200"
                        : "text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    {m.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {m.description}
                  </div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{m.goal}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
