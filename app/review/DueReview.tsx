"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { advanceAppointment, buildReviewRequest, readLegacyAppointments } from "@/lib/learning/review-queue";
import { startSession } from "@/lib/motivation/session";
import { quizBackHref } from "@/lib/questions/practice-session";
import type { Question } from "@/lib/questions/types";
import { readSettings } from "@/lib/storage/settings";
import { EXAM_LABELS, examLabel } from "@/lib/utils";

type DueQueue = { questions: Question[]; seenCount: number; nextReviewDate: string | null };

export function DueReview({ initialExam, returnTo }: { initialExam: string; returnTo?: string }) {
  const [exam, setExam] = useState(initialExam);
  const [choices, setChoices] = useState<string[]>([]);
  const [revision, setRevision] = useState(0);
  const [queue, setQueue] = useState<DueQueue | null>();
  const [index, setIndex] = useState(0);
  const reviewed = useRef(new Set<string>());
  const knownExam = !exam || Object.hasOwn(EXAM_LABELS, exam);
  useEffect(() => {
    if (!knownExam) return;
    const controller = new AbortController();
    setQueue(undefined);
    setIndex(0);
    reviewed.current.clear();
    const load = async () => {
      const request = buildReviewRequest(readLegacyAppointments());
      const response = await fetch("/api/review/due", {
        method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, ...(exam ? { exam } : {}) }),
      });
      if (!response.ok) throw new Error("review_unavailable");
      const result: DueQueue = await response.json();
      if (controller.signal.aborted) return;
      if (!exam) setChoices([...new Set(result.questions.map(q => q.exam))]);
      if (result.questions.length) startSession("review");
      setQueue(result);
    };
    void load().catch(() => { if (!controller.signal.aborted) setQueue(null); });
    return () => controller.abort();
  }, [exam, knownExam, revision]);

  const backHref = quizBackHref({ exam: exam || "search", returnTo });
  return <div className="space-y-4">
    <Link className="study-link" href={"/review?" + new URLSearchParams({ mode: "weak", ...(exam && knownExam ? { exam } : {}) })}>苦手リスト</Link>
    {(choices.length > 1 || !knownExam || exam) && <label className="block">復習する資格
      <select value={exam} className="ml-2 min-h-11 rounded border px-2" onChange={event => { setQueue(undefined); setExam(event.target.value); }}>
        <option value="">すべての資格</option>
        {[...new Set([...choices, ...(exam && knownExam ? [exam] : [])])].map(code => <option key={code} value={code}>{examLabel(code)}</option>)}
      </select>
    </label>}
    {!knownExam ? <p role="alert">指定された資格を確認できません。復習する資格を選んでください。</p>
      : queue === undefined ? <p role="status">復習問題を読み込み中…</p>
      : queue === null ? <><p role="alert">復習問題を読み込めませんでした</p><button className="study-link" onClick={() => setRevision(n => n + 1)}>再読み込み</button></>
      : queue.questions.length ? <QuizPlayer key={exam} quiet mode="review" exam={exam || queue.questions[index].exam}
          question={queue.questions[index]} index={index} total={queue.questions.length}
          backHref={backHref} backLabel={exam ? examLabel(exam) + "に戻る" : "試験選択に戻る"}
          onNext={() => setIndex(index + 1)} onReviewed={(id, correct) => {
            if (reviewed.current.has(id) || !readSettings().recordHistory) return;
            reviewed.current.add(id);
            advanceAppointment(id, correct);
          }} />
      : <><p>{queue.seenCount ? "今日の復習は完了です" : "復習キューはまだ空です"}</p>
          {queue.nextReviewDate && <p>次回復習予定　<time dateTime={queue.nextReviewDate}>{queue.nextReviewDate}</time></p>}
          <Link className="study-link" href={backHref}>{exam ? examLabel(exam) + "に戻る" : "資格を選ぶ"}</Link></>}
  </div>;
}
