"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { listExamLearningSummaries, type ExamTabSummary } from "@/lib/exam-library-session";
import { subscribeExamProgress } from "@/lib/exam-library-progress";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { findExamEntry } from "@/lib/exam-library-catalog";
import { groupQualifications, qualificationGroupLabel } from "@/lib/qualifications/groups";

function progressKey(summary: ExamTabSummary) {
  const entry = findExamEntry(summary.examId);
  return entry ? `${entry.group}-${entry.subject}` : summary.examId;
}

function PaperProgress({ summary: s }: { summary: ExamTabSummary }) {
  const review = s.incorrect > 0;
  const query = review ? "?view=results" : s.lastQuestionId ? `?question=${encodeURIComponent(s.lastQuestionId)}` : "";
  return <div className="rounded-xl border border-border p-4">
    <h3 className="font-semibold">{s.examTitle}</h3>
    <p className="mt-2 text-sm">回答 {s.answered}／{s.total}問 · 正解 {s.correct}問 · 不正解 {s.incorrect}問{s.unscored ? ` · 採点なし ${s.unscored}問` : ""}</p>
    <Link className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-primary" href={`/e-learning/exams/${s.examId}${query}`}>
      {review ? "結果・間違いを復習 →" : "続きから解く →"}
    </Link>
  </div>;
}

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
      {!answered ? <p className="text-sm">まだ安全衛生の学習記録がありません。試験を選んで始めましょう。</p> : (
        <ul className="space-y-3">
          {groupQualifications(summaries.filter(s => s.answered > 0), progressKey).map(row => {
            if ("item" in row) return <li key={row.item.examId}><PaperProgress summary={row.item} /></li>;
            const subjects = new Map<string, { label: string; papers: ExamTabSummary[] }>();
            for (const { item, label } of row.children) {
              const key = progressKey(item);
              const subject = subjects.get(key) ?? { label, papers: [] };
              subject.papers.push(item);
              subjects.set(key, subject);
            }
            return <li key={row.group.slug}><details className="rounded-xl border border-border px-4">
              <summary className="min-h-11 cursor-pointer py-3 font-semibold">{qualificationGroupLabel(row.group, subjects.size)}</summary>
              {[...subjects].map(([key, { label, papers }]) => <details key={key} className="border-t border-border">
                <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">{label}</summary>
                <ul className="space-y-2 pb-3">{papers.map(paper => <li key={paper.examId}><PaperProgress summary={paper} /></li>)}</ul>
              </details>)}
            </details></li>;
          })}
        </ul>
      )}
      {!answered && <Link href="/e-learning/exams" className="inline-flex min-h-11 items-center text-sm font-medium text-primary">安全の試験を選ぶ →</Link>}
    </>}
  </section>;
}
