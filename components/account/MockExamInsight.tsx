"use client";

import * as React from "react";
import Link from "next/link";
import { getMockExamHistory, type MockExamResult } from "@/lib/mock-exam/storage";
import { mockReviewHref } from "@/lib/mock-exam/review";
import { examLabel } from "@/lib/utils";

export function MockExamInsight() {
  const [result, setResult] = React.useState<MockExamResult | null>(null);
  React.useEffect(() => { setResult(getMockExamHistory().at(-1) ?? null); }, []);
  if (!result) return null;
  const weak = Object.entries(result.byCategory)
    .filter(([, stat]) => stat.total > 0 && stat.correct / stat.total < 0.6)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);
  return <section aria-label="直近の模試からの学習" className="mb-6 space-y-3 rounded-2xl border border-border bg-card p-4">
    <h2 className="font-semibold">直近の模試: {examLabel(result.exam)} {result.scorePct}%</h2>
    <p className="text-sm">{result.correct}/{result.totalQuestions}問正解 ・ 未回答 {result.totalQuestions - result.answered}問</p>
    <p className="text-sm">重点分野: {weak.map(([category, stat]) => `${category}（${stat.correct}/${stat.total}）`).join("・") || "今回の模試ではありません"}</p>
    <div className="flex flex-wrap gap-3 text-sm font-semibold text-primary">
      {result.wrongQuestionIds?.length ? <Link href={mockReviewHref(result)} className="inline-flex min-h-11 items-center underline">今回の間違い・未回答を復習</Link> : null}
      <Link href="/account/dashboard#mock-scores" className="inline-flex min-h-11 items-center underline">模試記録の詳細</Link>
    </div>
  </section>;
}
