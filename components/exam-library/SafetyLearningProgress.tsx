"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listExamLearningSummaries, type ExamTabSummary } from "@/lib/exam-library-session";
import { subscribeExamProgress } from "@/lib/exam-library-progress";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
export function SafetyLearningProgress({ compact = false }: { compact?: boolean }) {
  const [summaries, setSummaries] = useState<ExamTabSummary[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { const refresh = () => { setSummaries(listExamLearningSummaries()); setReady(true); }; refresh(); return subscribeExamProgress(refresh); }, []);
  const answered = summaries.reduce((n,s) => n+s.answered,0);
  const correct = summaries.reduce((n,s) => n+s.correct,0);
  if (compact && !answered) return null;
  return <section aria-label="安全衛生の学習進捗" className="space-y-4">
    {compact ? <h2 className="text-lg font-semibold">安全衛生の学習進捗</h2> : null}
    {!ready ? <p role="status">進捗を読み込んでいます。</p> : <>
      <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4"><ChihuahuaMascot pose={answered ? "celebrate" : "study"} size={64} /><div><p className="font-semibold">回答 {answered}問 · 正解 {correct}問</p><p className="mt-1 text-xs text-muted-foreground">このタブの学習と、端末に保存した学習を表示しています。</p></div></div>
      {!answered ? <p className="text-sm">まだ安全衛生の学習記録がありません。試験を選んで始めましょう。</p> : <ul className="space-y-3">{summaries.filter(s => s.answered > 0).map(s => <li key={s.examId} className="rounded-xl border border-border p-4"><h3 className="font-semibold">{s.examTitle}</h3><p className="mt-2 text-sm">回答 {s.answered}／{s.total}問 · 正解 {s.correct}問 · 不正解 {s.incorrect}問{s.unscored ? ` · 採点なし ${s.unscored}問` : ""}</p><div className="mt-3 flex flex-wrap gap-4"><Link className="inline-flex min-h-11 items-center text-sm font-medium text-primary" href={`/e-learning/exams/${s.examId}${s.lastQuestionId ? `?question=${encodeURIComponent(s.lastQuestionId)}` : ""}`}>続きから解く →</Link><Link className="inline-flex min-h-11 items-center text-sm font-medium text-primary" href={`/e-learning/exams/${s.examId}?view=results`}>結果・間違いを復習 →</Link></div></li>)}</ul>}
      <Link href="/e-learning/exams" className="inline-flex min-h-11 items-center text-sm font-medium text-primary">安全の試験を選ぶ →</Link>
    </>}
  </section>;
}
