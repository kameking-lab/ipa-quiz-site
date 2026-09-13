"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  MinusCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { TrackedNoteLink, deriveNoteAccountFromUrl } from "@/components/analytics/TrackedNoteLink";
import Image from "next/image";
import answerFiguresJson from "@/data/exam-library/answer-figures.json";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { readExamTabProgress, writeExamTabProgress } from "@/lib/exam-library-session";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { buttonVariants } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { extractExamChoices } from "@/lib/exam-library-choices";
import { ExamQuestionFigure } from "@/components/exam-library/exam-question-figure";
import { ExamDeviceSavePanel } from "@/components/exam-library/exam-device-save-panel";
import {
  boilerAnswerPage,
  isScorableQuestion,
  officialPdfPageUrl,
  type ExamNoteLink,
  type ExamQuestion,
} from "@/lib/exam-library-model";
import {
  EXAM_PROGRESS_MEMO_MAX_LENGTH,
  answerResult,
  clearExamProgress,
  createExamProgress,
  getBrowserStorage,
  parseExamProgress,
  readExamProgressRaw,
  resetAnswers,
  saveExamProgress,
  subscribeExamProgress,
  summarizeExamProgress,
  wrongQuestionIds,
  type ExamSessionAnswers,
} from "@/lib/exam-library-progress";

type AnswerFigure = { src: string; alt: string; width: number; height: number; official?: boolean };
const answerFigures: Record<string, AnswerFigure[]> = answerFiguresJson;

interface ExamQuestionPlayerProps {
  initialQuestionId?: string;
  initialView?: "question" | "summary";
  examId: string;
  examTitle: string;
  pdfUrl: string;
  indexUrl: string;
  questions: readonly ExamQuestion[];
  /** 出典: ExamCatalogEntry.noteLinks。存在すれば解答後(submitted)のみ表示する。 */
  noteLinks?: readonly ExamNoteLink[];
}

type AnswerStatus = ReturnType<typeof answerResult>;

const STATUS_LABEL: Record<AnswerStatus, string> = {
  correct: "正解",
  incorrect: "不正解",
  unscored: "回答済み・採点なし",
  unanswered: "未回答",
};

const STATUS_MARK: Record<AnswerStatus, string> = {
  correct: "正",
  incorrect: "誤",
  unscored: "済",
  unanswered: "",
};

const STATUS_CELL_CLASS: Record<AnswerStatus, string> = {
  correct:
    "border-emerald-800 bg-emerald-50 text-emerald-950 dark:border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-50",
  incorrect:
    "border-red-800 bg-red-50 text-red-950 dark:border-red-300 dark:bg-red-950/50 dark:text-red-50",
  unscored:
    "border-slate-600 bg-slate-100 text-slate-950 dark:border-slate-300 dark:bg-slate-800 dark:text-white",
  unanswered:
    "border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100",
};

const primaryButton = buttonVariants({ variant: "primary", size: "lg" });
const secondaryButton = buttonVariants({ variant: "outline", size: "lg" });
const linkClass =
  "inline-flex min-h-11 items-center gap-1 font-semibold text-sky-900 underline decoration-2 underline-offset-4 [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:text-sky-200 forced-colors:text-[LinkText]";

function choiceText(choice: number | null | undefined): string {
  return typeof choice === "number" ? `（${choice}）` : "なし";
}

function authorityBadge(question: ExamQuestion): string {
  if (isScorableQuestion(question)) return "公式正答で採点";
  if (question.answerAuthority === "descriptive") return "記述・自己確認";
  return "採点なし（公式正答未登録）";
}

function focusLater(ref: { readonly current: HTMLElement | null }) {
  requestAnimationFrame(() => {
    ref.current?.focus({ preventScroll: true });
    ref.current?.scrollIntoView?.({ block: "start", behavior: "instant" });
  });
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  if (target.isContentEditable || tag === "textarea" || tag === "select") return true;
  return tag === "input" && (target as HTMLInputElement).type !== "radio";
}

export function ExamQuestionPlayer({
  initialQuestionId,
  initialView = "question",
  examId,
  examTitle,
  pdfUrl,
  indexUrl,
  questions,
  noteLinks,
}: ExamQuestionPlayerProps) {
  const allIds = useMemo(() => questions.map((question) => question.id), [questions]);
  const byId = useMemo(
    () => new Map(questions.map((question) => [question.id, question])),
    [questions],
  );
  const [answers, setAnswers] = useState<ExamSessionAnswers>({});
  const [roundIds, setRoundIds] = useState<string[]>(allIds);
  const [retryRound, setRetryRound] = useState(false);
  const [index, setIndex] = useState(Math.max(0, allIds.indexOf(initialQuestionId ?? "")));
  const [view, setView] = useState<"question" | "summary">(initialView);
  const [draftChoice, setDraftChoice] = useState<number | null>(null);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [restoreHandled, setRestoreHandled] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const feedbackRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const tabRestoredRef = useRef(false);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);

  // 端末内の保存データはマウント後だけ読む（サーバー描画では常に「なし」）
  const savedRaw = useSyncExternalStore(
    subscribeExamProgress,
    () => {
      const storage = getBrowserStorage();
      return storage ? readExamProgressRaw(storage, examId) : null;
    },
    () => null,
  );
  const saved = useMemo(
    () => parseExamProgress(savedRaw, examId, questions),
    [examId, questions, savedRaw],
  );
  const savedSubmittedCount = saved
    ? Object.values(saved.answers).filter((answer) => answer.submitted).length
    : 0;

  const currentId = roundIds[index];
  const current = currentId ? byId.get(currentId) : undefined;
  const currentAnswer = currentId ? answers[currentId] : undefined;
  const submitted = Boolean(currentAnswer?.submitted);
  const status: AnswerStatus = current ? answerResult(current, currentAnswer) : "unanswered";
  const summary = useMemo(() => summarizeExamProgress(questions, answers), [answers, questions]);
  const wrongIds = useMemo(() => wrongQuestionIds(questions, answers), [answers, questions]);
  const firstUnansweredIndex = allIds.findIndex((id) => !answers[id]?.submitted);

  useEffect(() => {
    if (tabRestoredRef.current) return;
    tabRestoredRef.current = true;
    const disk = getBrowserStorage();
    const diskProgress = disk ? parseExamProgress(readExamProgressRaw(disk, examId), examId, questions) : null;
    const progress = readExamTabProgress(examId, questions) ?? (initialView === "summary" ? diskProgress : null);
    if (!progress) return;
    // Browser tab state is unavailable during server rendering; restore after hydration.
    setAnswers(progress.answers);
    setSaveEnabled(Boolean(diskProgress));
    const lastIndex = allIds.indexOf(initialQuestionId ?? progress.lastQuestionId ?? "");
    setIndex(Math.max(0, lastIndex));
    setRestoreHandled(true);
  }, [allIds, examId, initialQuestionId, initialView, questions]);

  /** 状態更新と（オン時のみ）端末保存を同時に行う */
  const commit = useCallback(
    (next: ExamSessionAnswers, lastQuestionId: string | null) => {
      setAnswers(next);
      writeExamTabProgress(createExamProgress(examId, next, lastQuestionId), questions, examTitle);
      if (!saveEnabled) return;
      const storage = getBrowserStorage();
      const ok =
        storage !== null &&
        saveExamProgress(storage, { ...createExamProgress(examId, next, lastQuestionId), summary: { ...summarizeExamProgress(questions, next), examTitle } });
      if (!ok) {
        setSaveEnabled(false);
        setSaveStatus("端末への保存に失敗したため、保存をオフにしました。回答はこの画面では続けられます。");
      }
    },
    [examId, examTitle, questions, saveEnabled],
  );

  const showQuestion = useCallback(
    (nextIndex: number, ids: readonly string[], source: ExamSessionAnswers) => {
      const id = ids[nextIndex];
      setIndex(nextIndex);
      setDraftChoice(id ? (source[id]?.choice ?? null) : null);
      setView("question");
      focusLater(headingRef);
    },
    [],
  );

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= roundIds.length) return;
      showQuestion(nextIndex, roundIds, answers);
      commit(answers, roundIds[nextIndex] ?? null);
    },
    [answers, commit, roundIds, showQuestion],
  );

  const showSummary = useCallback(() => {
    setView("summary");
    focusLater(summaryRef);
  }, []);

  const moveNext = useCallback(() => {
    if (index >= roundIds.length - 1) showSummary();
    else goTo(index + 1);
  }, [goTo, index, roundIds.length, showSummary]);

  const selectChoice = useCallback(
    (choice: number) => {
      if (!current || submitted || choice < 1 || choice > current.choiceCount) return;
      setDraftChoice(choice);
      commit({
        ...answers,
        [current.id]: { choice, memo: currentAnswer?.memo ?? "", submitted: true },
      }, current.id);
      focusLater(feedbackRef);
    },
    [answers, commit, current, currentAnswer?.memo, submitted],
  );

  const submitAnswer = useCallback(() => {
    if (!current || submitted) return;
    if (current.choiceCount > 0 && draftChoice === null) {
      firstChoiceRef.current?.focus();
      return;
    }
    commit(
      {
        ...answers,
        [current.id]: {
          choice: current.choiceCount > 0 ? draftChoice : null,
          memo: currentAnswer?.memo ?? "",
          submitted: true,
        },
      },
      current.id,
    );
    focusLater(feedbackRef);
  }, [answers, commit, current, currentAnswer?.memo, draftChoice, submitted]);

  const retryCurrent = useCallback(() => {
    if (!current) return;
    commit(resetAnswers(answers, [current.id]), current.id);
    setDraftChoice(null);
    if (current.choiceCount > 0) focusLater(firstChoiceRef);
    else focusLater(headingRef);
  }, [answers, commit, current]);

  const updateMemo = (value: string) => {
    if (!current) return;
    commit(
      {
        ...answers,
        [current.id]: {
          choice: currentAnswer?.choice ?? null,
          memo: value.slice(0, EXAM_PROGRESS_MEMO_MAX_LENGTH),
          submitted: currentAnswer?.submitted ?? false,
        },
      },
      current.id,
    );
  };

  const startRound = (ids: string[], retry: boolean, source: ExamSessionAnswers, startIndex = 0) => {
    setRoundIds(ids);
    setRetryRound(retry);
    showQuestion(startIndex, ids, source);
  };

  const retryWrong = () => {
    if (wrongIds.length === 0) return;
    const next = resetAnswers(answers, wrongIds);
    commit(next, wrongIds[0] ?? null);
    startRound(wrongIds, true, next);
  };

  const continueUnanswered = () => {
    if (firstUnansweredIndex < 0) return;
    startRound(allIds, false, answers, firstUnansweredIndex);
  };

  const restartAll = () => {
    commit({}, allIds[0] ?? null);
    startRound(allIds, false, {});
  };

  const openFromReview = (id: string) => {
    const target = allIds.indexOf(id);
    if (target >= 0) startRound(allIds, false, answers, target);
  };

  const restoreSaved = () => {
    if (!saved) return;
    const lastIndex = saved.lastQuestionId ? allIds.indexOf(saved.lastQuestionId) : -1;
    const unanswered = allIds.findIndex((id) => !saved.answers[id]?.submitted);
    const startIndex = lastIndex >= 0 ? lastIndex : Math.max(unanswered, 0);
    setAnswers(saved.answers);
    writeExamTabProgress(saved, questions, examTitle);
    setSaveEnabled(true);
    setRestoreHandled(true);
    setSaveStatus("保存した進捗を読み込みました。以降の回答もこの端末に保存します。");
    startRound(allIds, false, saved.answers, startIndex);
  };

  const discardSaved = () => {
    const storage = getBrowserStorage();
    if (storage) clearExamProgress(storage, examId);
    setRestoreHandled(true);
    setSaveStatus("この端末の保存データを削除しました。");
  };

  const toggleSave = (enabled: boolean) => {
    const storage = getBrowserStorage();
    if (enabled) {
      const ok =
        storage !== null &&
        saveExamProgress(storage, { ...createExamProgress(examId, answers, currentId ?? null), summary: { ...summary, examTitle } });
      if (ok) {
        const overwrote = saved !== null && savedSubmittedCount > 0 && !restoreHandled;
        setSaveEnabled(true);
        setRestoreHandled(true);
        setSaveStatus(
          overwrote
            ? "以前の保存データを現在の回答で上書きし、この端末への保存を始めました。"
            : "この端末に進捗を保存しています。",
        );
      } else {
        setSaveStatus("このブラウザでは端末内に保存できませんでした。");
      }
      return;
    }
    setSaveEnabled(false);
    if (storage) clearExamProgress(storage, examId);
    setSaveStatus("保存をオフにし、この端末の保存データを削除しました。");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (view !== "question" || !current) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || event.isComposing) {
        return;
      }
      if (isEditableTarget(event.target)) return;
      if (/^[1-9]$/u.test(event.key) && !submitted) {
        const choice = Number(event.key);
        if (choice > current.choiceCount) return;
        event.preventDefault();
        selectChoice(choice);
        return;
      }
      if (event.key !== "Enter" && event.key !== "ArrowRight") return;
      if (event.key === "ArrowRight" && !submitted) return;
      const tag = event.target instanceof HTMLElement ? event.target.tagName.toLowerCase() : "";
      if (tag === "button" || tag === "a" || tag === "summary") return;
      event.preventDefault();
      if (submitted) moveNext();

    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, moveNext, selectChoice, submitAnswer, submitted, view]);

  if (questions.length === 0) return null;

  const scoredAnswered = summary.correct + summary.incorrect;
  const shownChoice = submitted ? (currentAnswer?.choice ?? null) : draftChoice;
  const scorable = current ? isScorableQuestion(current) : false;
  const parsedChoices = current ? (current.presentation ?? extractExamChoices(current.text, current.choiceCount)) : null;
  const sourcePage = current?.sourcePages?.[0];
  const answerPage = current ? boilerAnswerPage(examId, current.number) : undefined;
  const showRestore =
    saved !== null && savedSubmittedCount > 0 && !saveEnabled && !restoreHandled;

  return (
    <div className="grid gap-6">
      <div className="min-w-0">
        {showRestore && saved ? (
          <div
            role="region"
            aria-labelledby="exam-restore-title"
            className="mb-5 rounded-2xl border-2 border-sky-800 bg-sky-50 p-4 text-sky-950 dark:border-sky-300 dark:bg-sky-950/40 dark:text-sky-50 forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]"
          >
            <h2 id="exam-restore-title" className="font-semibold">
              この端末に保存した進捗があります
            </h2>
            <p className="mt-1 text-sm leading-6">
              {savedSubmittedCount}問回答済み
              {saved.updatedAt
                ? `（${new Date(saved.updatedAt).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" })}保存）`
                : ""}
              。再開すると、以降の回答もこの端末に保存します。
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <button type="button" onClick={restoreSaved} className={primaryButton}>
                続きから再開
              </button>
              <button type="button" onClick={discardSaved} className={secondaryButton}>
                保存データを削除
              </button>
            </div>
          </div>
        ) : null}

        {view === "summary" ? (
          <section
            aria-labelledby="exam-summary-title"
            className="rounded-3xl border-2 border-slate-800 bg-white p-5 text-slate-950 dark:border-slate-300 dark:bg-slate-950 dark:text-white forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] sm:p-7"
          >
            <ChihuahuaMascot pose="celebrate" size={80} className="mb-2" />
            <h2
              ref={summaryRef}
              id="exam-summary-title"
              tabIndex={-1}
              className="text-2xl font-semibold outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {retryRound ? "解き直しの結果" : "結果と見直し"}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["回答", `${summary.answered}／${summary.total}問`],
                ["正解", `${summary.correct}問`],
                ["不正解", `${summary.incorrect}問`],
                ["採点なし", `${summary.unscored}問`],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="rounded-2xl border-2 border-slate-300 p-3 dark:border-slate-600 forced-colors:border-[CanvasText]"
                >
                  <dt className="text-xs font-semibold text-slate-600 dark:text-slate-300">{term}</dt>
                  <dd className="mt-1 text-xl font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm font-bold leading-6">
              {scoredAnswered > 0
                ? `公式正答で採点した${scoredAnswered}問のうち${summary.correct}問が正解（${Math.round((summary.correct / scoredAnswered) * 100)}%）。`
                : "公式正答で採点した問題はまだありません。"}
              {summary.scorable < summary.total
                ? ` 全${summary.total}問のうち${summary.total - summary.scorable}問は公式正答が未登録または記述式のため採点しません。`
                : ""}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {wrongIds.length > 0 ? (
                <button type="button" onClick={retryWrong} className={primaryButton}>
                  <RotateCcw className="h-5 w-5" aria-hidden="true" />
                  間違えた{wrongIds.length}問を解き直す
                </button>
              ) : null}
              {firstUnansweredIndex >= 0 ? (
                <button type="button" onClick={continueUnanswered} className={secondaryButton}>
                  未回答の問題から続ける
                </button>
              ) : null}
              <button type="button" onClick={restartAll} className={secondaryButton}>
                すべての回答を消して最初から
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
              {saveEnabled
                ? "この結果はこの端末（ブラウザ）に保存されています。"
                : "このタブで結果を保持しています。タブを閉じた後も残すには「この端末に保存する」をオンにしてください。"}
            </p>

            <h3 className="mt-7 text-lg font-semibold">回答の見直し</h3>
            <ol className="mt-3 divide-y divide-slate-200 rounded-2xl border-2 border-slate-300 dark:divide-slate-700 dark:border-slate-600 forced-colors:border-[CanvasText]">
              {questions.map((question) => {
                const answer = answers[question.id];
                const itemStatus = answerResult(question, answer);
                return (
                  <li
                    key={question.id}
                    className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold">
                        問{question.number}
                        <span
                          className={`ml-2 inline-block rounded-full border px-2 py-0.5 text-xs ${STATUS_CELL_CLASS[itemStatus]}`}
                        >
                          {STATUS_LABEL[itemStatus]}
                        </span>
                      </p>
                      <p className="text-xs leading-5 text-slate-700 dark:text-slate-200">
                        {question.choiceCount > 0 ? `あなたの回答 ${choiceText(answer?.submitted ? answer.choice : null)}` : "記述・メモ"}
                        {isScorableQuestion(question) && answer?.submitted
                          ? ` ／ 公式正答 ${choiceText(question.correctChoice)}`
                          : ""}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openFromReview(question.id)}
                      aria-label={`問${question.number}を開く`}
                      className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-sky-900 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:text-sky-200 forced-colors:text-[LinkText]"
                    >
                      開く
                    </button>
                  </li>
                );
              })}
            </ol>
          </section>
        ) : current ? (
          <section
            aria-labelledby="exam-question-heading"
            className="rounded-2xl border border-border bg-card p-4 text-foreground shadow-sm forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] sm:p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p id="exam-progress-text" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {retryRound ? "解き直し " : ""}
                {index + 1}問目／{roundIds.length}問
              </p>
              <span className="rounded-full border border-slate-500 px-3 py-1 text-xs font-semibold">
                {authorityBadge(current)}
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 forced-colors:border forced-colors:border-[CanvasText]"
              aria-hidden="true"
            >
              <div
                className="h-full bg-primary forced-colors:bg-[Highlight]"
                style={{ width: `${Math.round(((index + 1) / roundIds.length) * 100)}%` }}
              />
            </div>
            <h2
              ref={headingRef}
              id="exam-question-heading"
              tabIndex={-1}
              aria-describedby="exam-progress-text"
              className="mt-3 scroll-mt-24 text-2xl font-semibold outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              問{current.number}
              {current.sourceQuestionNumber && current.sourceQuestionNumber !== current.number ? <span className="ml-2 text-sm font-normal">（原文の問{current.sourceQuestionNumber}）</span> : null}
              <span className="sr-only">（{examTitle}）</span>
            </h2>

            <div className="mt-3">
              <ExamQuestionFigure question={current} prompt={parsedChoices?.prompt} />
            </div>

            {current.choiceCount > 0 ? (
              <fieldset className="mt-5" aria-describedby="exam-answer-help">
                <legend className="text-base font-semibold">選択肢を選んで解答</legend>
                <p id="exam-answer-help" className="mt-1 text-sm leading-6 text-muted-foreground">
                  {scorable ? "選ぶと正解と解説を表示します。" : "選ぶと回答を記録します。この問題は採点しません。"}
                  <span className="hidden sm:inline"> 数字キー1〜{current.choiceCount}でも選べます。</span>
                </p>
                <div className="mt-3 grid gap-3" role="radiogroup" aria-label="選択肢">
                  {Array.from({ length: current.choiceCount }, (_, offset) => offset + 1).map((choice) => (
                    <ChoiceButton
                      key={choice}
                      ref={choice === 1 ? firstChoiceRef : undefined}
                      choiceKey={`${choice}`}
                      text={parsedChoices?.choices[choice - 1]?.text ?? `図の（${choice}）`}
                      selected={shownChoice === choice}
                      correct={scorable && current.correctChoice === choice}
                      revealed={submitted && scorable}
                      disabled={submitted}
                      shortcutIndex={choice}
                      onClick={() => selectChoice(choice)}
                      onKeyDown={(event) => {
                        if (submitted || !["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
                        event.preventDefault();
                        event.stopPropagation();
                        const radios = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
                        const offset = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
                        radios?.[(choice - 1 + offset + current.choiceCount) % current.choiceCount]?.focus();
                      }}
                    />
                  ))}
                </div>
              </fieldset>
            ) : (
              <div className="mt-5">
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                  {current.answerAuthority === "descriptive"
                    ? "記述・複数選択式の問題です。自動採点はしません。自分の解答を考えたら、模範解答と照らし合わせましょう。メモを書かずに読むこともできます。"
                    : "この問題は解答番号ボタンを用意できていません。画像で問題を確認してください。採点はしません。"}
                </p>
                <label htmlFor={`exam-memo-${current.id}`} className="mt-3 block font-semibold">
                  解答メモ（下書き・任意）
                </label>
                <textarea
                  id={`exam-memo-${current.id}`}
                  value={currentAnswer?.memo ?? ""}
                  onChange={(event) => updateMemo(event.target.value)}
                  maxLength={EXAM_PROGRESS_MEMO_MAX_LENGTH}
                  rows={6}
                  aria-describedby={`exam-memo-help-${current.id}`}
                  className="mt-2 w-full rounded-xl border-2 border-slate-400 bg-white p-3 text-base leading-7 text-slate-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 dark:border-slate-500 dark:bg-slate-900 dark:text-white forced-colors:border-[CanvasText]"
                />
                <p id={`exam-memo-help-${current.id}`} className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  {saveEnabled
                    ? "メモはこの端末（ブラウザ）に保存されます。送信はしません。"
                    : "長期保存はオフです。同じタブ内の移動ではメモを保持し、タブを閉じると消えます。"}
                </p>
                {!submitted ? (
                  <button type="button" onClick={submitAnswer} className={`${primaryButton} mt-3 w-full sm:w-auto`}>
                    模範解答を見る
                  </button>
                ) : null}
              </div>
            )}

            {submitted ? (
              <div
                data-answer-state={status}
                className={`mt-6 rounded-2xl border-2 p-4 forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText] ${
                  status === "correct"
                    ? "border-emerald-800 bg-emerald-50 text-emerald-950 dark:border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-50"
                    : status === "incorrect"
                      ? "border-red-800 bg-red-50 text-red-950 dark:border-red-300 dark:bg-red-950/40 dark:text-red-50"
                      : "border-slate-600 bg-slate-50 text-slate-950 dark:border-slate-300 dark:bg-slate-900 dark:text-white"
                }`}
              >
                <h3
                  ref={feedbackRef}
                  tabIndex={-1}
                  className="flex items-center gap-2 text-lg font-semibold outline-none focus-visible:ring-4 focus-visible:ring-current"
                >
                  {status === "correct" ? (
                    <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                  ) : status === "incorrect" ? (
                    <XCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
                  ) : (
                    <MinusCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
                  )}
                  {status === "correct"
                    ? "正解"
                    : status === "incorrect"
                      ? "不正解"
                      : current.choiceCount > 0
                        ? "回答を記録しました（採点なし）"
                        : "確認済み（採点なし）"}
                </h3>
                <div role="status" aria-live="polite" aria-atomic="true" className="mt-1 text-sm leading-6">
                  {current.choiceCount > 0 ? (
                    <p className="font-bold">
                      あなたの回答 {choiceText(currentAnswer?.choice)}
                      {scorable ? ` ／ 公式正答 ${choiceText(current.correctChoice)}` : ""}
                    </p>
                  ) : null}
                  {!scorable ? (
                    <p className="mt-1">
                      {current.answerAuthority === "descriptive"
                        ? "記述式のため、このサイトでは正誤を判定しません。"
                        : "この問題は公式正答が未登録のため、正誤を表示しません。正答は公表元の資料で確認してください。"}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4 border-t border-current/25 pt-3">
                  <h4 className="font-semibold">{current.answerAuthority === "descriptive" ? "模範解答・解説（学習用）" : scorable ? "AIによる学習用解説" : "参考解説（採点なし）"}</h4>
                  {current.explanation ? <p className="mt-1 text-xs leading-5">{answerPage ? "公式の正答・正答例を参照して、このサイトが学習用に整理した解答と解説です。公式原文とは表現や計算の丸め方が異なる場合があります。" : current.answerAuthority === "descriptive" ? "このサイトが作成した模範解答例です。公式の正答例ではありません。別の適切な答え方もあり、法令は出題時点で確認してください。" : "公式解説ではありません。法令の時点や出典も確認しながら学習してください。"}</p> : null}
                  {current.explanation ? (
                    <Markdown className="mt-1 min-w-0 [overflow-wrap:anywhere] leading-7 [&_p]:whitespace-pre-line [&_a]:text-blue-700 [&_a]:underline dark:[&_a]:text-blue-300">{current.explanation}</Markdown>
                  ) : (
                    <p className="mt-1 text-sm leading-6">
                      この問題の解説は準備中です。出典は公式PDF
                      {sourcePage ? `（${sourcePage}ページ）` : ""}で確認できます。
                    </p>
                  )}
                  {answerFigures[current.id]?.length ? (
                    <div className="mt-4 grid gap-4">
                      {answerFigures[current.id]!.map((figure) => (
                        <figure key={figure.src}>
                          <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`${figure.alt}を拡大（新しいタブ）`}>
                            <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} className="h-auto max-w-full rounded-lg bg-white" />
                          </a>
                          <figcaption className="mt-1 text-xs">{figure.alt}：{figure.official ? "公式の正答例から抜粋" : "模範解答用の模式図（独自作成）"}。図を押すと拡大できます。</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-1 flex flex-wrap gap-x-4">
                    {answerPage ? (
                      <a href={officialPdfPageUrl(pdfUrl, answerPage)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        公式の正答・正答例を確認（PDF {answerPage}ページ）
                        <span className="sr-only">（新しいタブで開きます）</span>
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    ) : null}
                    <a
                      href={officialPdfPageUrl(pdfUrl, sourcePage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      公式PDFで問{current.sourceQuestionNumber ?? current.number}を確認
                      <span className="sr-only">（新しいタブで開きます）</span>
                      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                    {!scorable && current.answerAuthority !== "descriptive" ? (
                      <a href={indexUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        公表ページを開く
                        <span className="sr-only">（新しいタブで開きます）</span>
                        <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </div>

                {current.choiceCount > 0 && status !== "correct" ? (
                  <button type="button" onClick={retryCurrent} className={`${secondaryButton} mt-4`}>
                    <RotateCcw className="h-5 w-5" aria-hidden="true" />
                    {status === "incorrect" ? "この問題をもう一度解く" : "選び直す"}
                  </button>
                ) : null}

                {noteLinks && noteLinks.length > 0 ? (
                  <div className="mt-4 border-t border-current/25 pt-3">
                    <h4 className="font-semibold">関連する解説記事</h4>
                    <ul className="mt-1 grid gap-1">
                      {noteLinks.map((link) => {
                        const account = deriveNoteAccountFromUrl(link.url);
                        const linkBody = (
                          <>
                            {link.title}
                            <span className="sr-only">（新しいタブで開きます）</span>
                            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                          </>
                        );
                        return (
                          <li key={link.url}>
                            {link.kind ? (
                              <span
                                className="mr-1.5 inline-block rounded px-1.5 py-0.5 text-xs font-bold text-white forced-colors:border forced-colors:border-[CanvasText] forced-colors:bg-[Canvas] forced-colors:text-[CanvasText]"
                                style={{ backgroundColor: link.kind === "free" ? "#0284c7" : "#a16207" }}
                              >
                                {link.kind === "free" ? "無料" : "有料"}
                              </span>
                            ) : null}
                            {account ? (
                              <TrackedNoteLink href={link.url} source="exam_library" account={account} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                {linkBody}
                              </TrackedNoteLink>
                            ) : (
                              <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                {linkBody}
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                className={secondaryButton}
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                前へ
              </button>
              <button type="button" onClick={moveNext} className={`${submitted ? primaryButton : secondaryButton} flex-1`}>
                {index >= roundIds.length - 1 ? "結果を見る" : submitted ? "次の問題へ" : "スキップして次へ"}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </section>
        ) : null}
      </div>

      <aside className="grid min-w-0 gap-4" aria-label="演習の進み具合">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={showSummary} className={secondaryButton}>結果を見る</button>
          <button type="button" onClick={retryWrong} disabled={wrongIds.length === 0} className={secondaryButton}>間違えた問題を復習（{wrongIds.length}問）</button>
        </div>
        <details className="rounded-2xl border border-border bg-card p-4">
          <summary className="cursor-pointer py-2 text-sm font-medium">問題一覧・進捗（回答 {summary.answered}／{summary.total}）</summary>
        <nav
          aria-labelledby="exam-navigator-title"
          className="mt-3"
        >
          <h2 id="exam-navigator-title" className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            {retryRound ? "解き直す問題" : "問題一覧"}
          </h2>
          <p className="mt-1 text-xs font-bold text-slate-700 dark:text-slate-200">
            回答 {summary.answered}／{summary.total}　正解 {summary.correct}　不正解 {summary.incorrect}
          </p>
          <ol className="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-10">
            {roundIds.map((id, position) => {
              const question = byId.get(id);
              if (!question) return null;
              const cellStatus = answerResult(question, answers[id]);
              const active = view === "question" && position === index;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => goTo(position)}
                    aria-current={active ? "step" : undefined}
                    aria-label={`問${question.number}（${STATUS_LABEL[cellStatus]}）`}
                    className={`flex min-h-11 w-full flex-col items-center justify-center rounded-lg border-2 text-sm font-semibold leading-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 forced-colors:border-[ButtonText] ${STATUS_CELL_CLASS[cellStatus]} ${
                      active ? "ring-4 ring-sky-500 forced-colors:ring-[Highlight]" : ""
                    }`}
                  >
                    {question.number}
                    <span className="text-[10px]" aria-hidden="true">
                      {STATUS_MARK[cellStatus]}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-2 text-[11px] leading-4 text-slate-600 dark:text-slate-300">
            正＝正解、誤＝不正解、済＝回答済み（採点なし）
          </p>

        </nav>
        </details>

        <ExamDeviceSavePanel enabled={saveEnabled} status={saveStatus} onToggle={toggleSave} />
      </aside>
    </div>
  );
}
