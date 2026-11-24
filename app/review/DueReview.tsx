"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import Link from "next/link";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import { advanceAppointment, buildReviewRequest, readLegacyAppointments } from "@/lib/learning/review-queue";
import { startSession } from "@/lib/motivation/session";
import { quizBackHref } from "@/lib/questions/practice-session";
import type { Question } from "@/lib/questions/types";
import { readSettings } from "@/lib/storage/settings";
import { EXAM_LABELS, examLabel } from "@/lib/utils";
import { fetchPracticeBatch, fetchPracticeQuestion, PracticeRequestError } from "@/lib/billing/guest-client";

type DueEntry = Pick<Question, "id" | "exam"> | Question;
type DueQueue = { questions: DueEntry[]; seenCount: number; nextReviewDate: string | null };

function DueQuestion({ entry, ...player }: { entry: DueEntry } & Omit<ComponentProps<typeof QuizPlayer>, "question">) {
  const [loaded, setLoaded] = useState<{ id: string; value: Question | "daily_limit" | "unavailable" }>();
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if ("question" in entry) return;
    const controller = new AbortController();
    void fetchPracticeQuestion(entry.id, false, controller.signal)
      .then(({ question }) => { if (!controller.signal.aborted) setLoaded({ id: entry.id, value: question }); })
      .catch(error => {
        if (!controller.signal.aborted) setLoaded({ id: entry.id, value: error instanceof PracticeRequestError && error.code === "daily_limit" ? "daily_limit" : "unavailable" });
      });
    return () => controller.abort();
  }, [entry, retry]);
  const value = "question" in entry ? entry : loaded?.id === entry.id ? loaded.value : undefined;
  return <>
    <div hidden={typeof value === "string"}>
      <QuizPlayer {...player} question={typeof value === "object" ? value : null} managesPracticeGrant={!("question" in entry)} />
    </div>
    {value === "daily_limit" && <><p role="alert">今日の無料演習の上限に達しました。</p>
      {player.index + 1 < player.total && <button className="study-link" onClick={player.onNext}>次の復習問題へ</button>}</>}
    {value === "unavailable" && <><p role="alert">復習問題を読み込めませんでした</p>
      <button className="study-link" onClick={() => { setLoaded(undefined); setRetry(n => n + 1); }}>再読み込み</button></>}
  </>;
}

export function DueReview({ initialExam, returnTo }: { initialExam: string; returnTo?: string }) {
  const [exam, setExam] = useState(initialExam);
  const [choices, setChoices] = useState<string[]>([]);
  const [revision, setRevision] = useState(0);
  const [queue, setQueue] = useState<DueQueue | "daily_limit" | null>();
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
      const response = await fetchPracticeBatch("/api/review/due", {
        method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...request, view: "queue", ...(exam ? { exam } : {}) }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        if (body?.error !== "daily_limit") throw new Error("review_unavailable");
        if (!controller.signal.aborted) setQueue("daily_limit");
        return;
      }
      const result: DueQueue = await response.json();
      if (controller.signal.aborted) return;
      if (!exam) setChoices([...new Set(result.questions.map(q => q.exam))]);
      if (result.questions.length) startSession("review");
      setQueue(result);
    };
    void load().catch(() => { if (!controller.signal.aborted) setQueue(null); });
    return () => controller.abort();
  }, [exam, knownExam, revision]);

  const backHref = quizBackHref({ exam: exam || "search", returnTo: exam === initialExam ? returnTo : undefined });
  const options = [...new Set([...choices, ...(knownExam && exam ? [exam] : [])])]
    .map(key => ({ key, name: examLabel(key) }));
  return <div className="space-y-4">
    <Link className="study-link" href={"/review?" + new URLSearchParams({ mode: "weak", ...(exam && knownExam ? { exam } : {}) })}>苦手リスト</Link>
    {(choices.length > 1 || !knownExam || exam) && <QualificationSelect items={options}
      value={exam} label="復習する資格" emptyLabel="すべての資格" fieldClass="mt-1 block min-h-11 w-full rounded border px-2"
      onChange={next => {
        if (next === exam) return;
        setQueue(undefined);
        setExam(next);
      }} />}
    {!knownExam ? <p role="alert">指定された資格を確認できません。復習する資格を選んでください。</p>
      : queue === undefined ? <p role="status">復習問題を読み込み中…</p>
      : queue === "daily_limit" ? <p role="alert">今日の無料演習の上限に達しました。</p>
      : queue === null ? <><p role="alert">復習問題を読み込めませんでした</p><button className="study-link" onClick={() => setRevision(n => n + 1)}>再読み込み</button></>
      : queue.questions.length ? <DueQuestion key={exam} quiet mode="review" exam={exam || queue.questions[index].exam}
          entry={queue.questions[index]} index={index} total={queue.questions.length}
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
