"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { examLabel } from "@/lib/utils";
import {
  getMockScores,
} from "@/lib/learning/mock-scores";
import type { MockScore } from "@/lib/learning/mock-scores";
import type { ExamCode } from "@/lib/questions/types";
import { getMockExamHistory, type MockExamResult } from "@/lib/mock-exam/storage";
import { mockReviewHref } from "@/lib/mock-exam/review";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";

const examOptions = ALL_QUIZ_EXAM_CODES.map(key => ({ key, name: examLabel(key) }));

export function MockScoreHistory() {
  const [exam, setExam] = React.useState<ExamCode | "">("ap");
  const [scores, setScores] = React.useState<MockScore[]>([]);
  const [results, setResults] = React.useState<MockExamResult[]>([]);

  React.useEffect(() => {
    setScores(getMockScores());
    const saved = getMockExamHistory();
    setResults(saved);
    const latest = saved.at(-1);
    if (latest) setExam(latest.exam);
  }, []);

  const examScores = scores.filter((s) => s.exam === exam);
  const latest = examScores[examScores.length - 1];
  const latestPct = latest ? Math.round((latest.score / latest.total) * 100) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">模試記録の表示</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row">
            <QualificationSelect items={examOptions} value={exam} onChange={value => setExam(value as ExamCode | "")}
              label="対象試験" emptyLabel="資格を選ぶ" className="flex-1 text-xs text-zinc-500 dark:text-zinc-400"
              fieldClass="mt-1 block min-h-11 w-full min-w-0 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-zinc-700 dark:bg-zinc-900" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">あなたのスコア</CardTitle>
        </CardHeader>
        <CardContent>
          {latest ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="最新スコア" value={`${latest.score}/${latest.total}`} />
              <Stat
                label="得点率"
                value={`${latestPct}%`}
                highlight={(latestPct ?? 0) >= 60}
              />

            </div>
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              この試験の模試スコアはまだありません。
            </p>
          )}
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            この端末に保存された模試結果です。
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">スコア履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {examScores.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              履歴はまだありません。
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {[...examScores].reverse().map((s) => {
                const pct = Math.round((s.score / s.total) * 100);
                return (
                  <li
                    key={s.id}
                    className="space-y-3 rounded-lg border border-zinc-200 bg-white px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(s.takenAt).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })}
                    </span>
                    <span className="font-medium">
                      {s.score}/{s.total}
                    </span>
                    <Badge variant="outline">{pct}%</Badge>
                    </div>
                    <MockResultDetails result={results.find((result) => result.id === s.id)} />
                  </li>
                );
              })}
            </ul>
          )}
          {exam && <details className="mt-2">
            <summary className="min-h-11 cursor-pointer py-3 text-sm">模試を始める</summary>
            <Link href={`/mock-exam?exam=${exam}`} className="inline-flex min-h-11 items-center text-sm text-primary underline">模試を受ける</Link>
          </details>}
        </CardContent>
      </Card>

    </div>
  );
}

function MockResultDetails({ result }: { result?: MockExamResult }) {
  if (!result) return null;
  const weak = Object.entries(result.byCategory).filter(([, stat]) => stat.total > 0 && stat.correct / stat.total < 0.6);
  return <div className="space-y-2 text-xs">
    <p>未回答 {result.totalQuestions - result.answered}問 ・ 所要 {Math.floor(result.timeUsedSec / 60)}分{result.timeUsedSec % 60}秒</p>
    <p>重点分野: {weak.map(([category]) => category).join("・") || "今回の模試ではありません"}</p>
    <div className="flex flex-wrap gap-3">
      {result.wrongQuestionIds?.length ? <Link href={mockReviewHref(result)} className="inline-flex min-h-11 items-center font-semibold text-primary underline">今回の間違い・未回答を復習</Link> : null}
    </div>
  </div>;
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
      <div
        className={
          highlight
            ? "text-2xl font-bold text-sky-700 dark:text-sky-300"
            : "text-2xl font-bold"
        }
      >
        {value}
      </div>
    </div>
  );
}
