"use client";

import * as React from "react";
import { isAcceptedAnswer, formatAcceptedAnswers, CHOICE_SHORTCUTS, getChoiceKeys, requiredSelectionCount, isCompleteSelectionCorrect, formatSelection } from "@/lib/questions/answers";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { Question, ChoiceKey, ExamCode } from "@/lib/questions/types";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { ChihuahuaMascot } from "@/components/ChihuahuaMascot";
import { QuestionCard } from "./QuestionCard";
import { ChoiceButton } from "./ChoiceButton";
import { AfternoonEssayHint } from "./AfternoonEssayHint";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { ExplanationCard } from "./ExplanationCard";
import { GenerateSimilar } from "./GenerateSimilar";
import {
  CopilotMobileSheet,
  CopilotDesktopFloating,
} from "@/components/copilot/CopilotPanel";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { QuestionCommentBox } from "./QuestionCommentBox";
import { ExamNoteGuide } from "@/components/exam/ExamNoteGuide";

const FeedbackGateModal = dynamic(
  () => import("@/components/FeedbackGateModal").then((m) => m.FeedbackGateModal),
  { ssr: false },
);
import { recordReview } from "@/lib/learning/spaced-repetition";
import { LS_KEYS } from "@/lib/storage/keys";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Timer, Share2, Check, Copy } from "lucide-react";
import { examLabel } from "@/lib/utils";
import { FireworksBurst } from "@/components/motivation/FireworksBurst";
import { ComboCounter } from "@/components/motivation/ComboCounter";
import { comboLevel, readMotivationSettings } from "@/lib/motivation/combo";
import { playPiroro } from "@/lib/motivation/sound";
import { recordSessionAnswer } from "@/lib/motivation/session";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { posthogCapture } from "@/lib/posthog";
import { readSettings } from "@/lib/storage/settings";
import { evaluateAchievementsAfterAnswer } from "@/lib/gamification/achievements";
import { AchievementToast } from "@/components/motivation/AchievementToast";

export function quizModeLabel(mode: string): string {
  const labels: Record<string, string> = { random: "ランダム", year: "年度別", topic: "分野別", review: "復習", starred: "あとで復習", mock: "模試", sequential: "順番に解く", unanswered: "未回答" };
  return labels[mode] ?? "過去問演習";
}

function formatElapsed(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface Props {
  question: Question | null;
  index: number;
  total: number;
  mode: string;
  backHref?: string;
  backLabel?: string;
  exam?: string;
  completionLabel?: string;
  completionShareHref?: string;
  onNext: () => void;
}


export function QuizPlayer({
  question,
  index,
  total,
  mode,
  backHref = "/",
  backLabel = "モード選択に戻る",
  exam = "ap",
  completionLabel,
  completionShareHref,
  onNext,
}: Props) {
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  // 「二つとも答えなさい」形式で選択中の肢。規定数そろった時点で採点する。
  const [picked, setPicked] = React.useState<ChoiceKey[]>([]);
  const [revealed, setRevealed] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const questionStartRef = React.useRef<HTMLDivElement>(null);
  const [upsellOpen, setUpsellOpen] = React.useState(false);
  const [copilotQuery, setCopilotQuery] = React.useState<"why-wrong" | "open" | null>(null);
  const [starred, setStarred] = React.useState(false);
  const [stats, setStats] = React.useState({ answered: 0, correct: 0 });
  const [showSwipeHint, setShowSwipeHint] = React.useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [burst, setBurst] = React.useState<{ level: "small" | "big"; nonce: number } | null>(null);
  const [pendingAchievement, setPendingAchievement] = React.useState<string | null>(null);
  const motivationSettingsRef = React.useRef(readMotivationSettings());
  const quizStartedFiredRef = React.useRef(false);

  React.useEffect(() => {
    motivationSettingsRef.current = readMotivationSettings();
    const alreadyShown = localStorage.getItem(LS_KEYS.swipeHintShown) === "true";
    if (!alreadyShown) {
      setShowSwipeHint(true);
      localStorage.setItem(LS_KEYS.swipeHintShown, "true");
    }
  }, []);

  // 最初の問題がロードされた瞬間に quiz_started を一度だけ送信
  React.useEffect(() => {
    if (quizStartedFiredRef.current || !question) return;
    quizStartedFiredRef.current = true;
    posthogCapture("quiz_started", {
      exam: question.exam,
      mode,
      total,
    });
  }, [question, mode, total]);

  React.useEffect(() => {
    if (completed) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [completed]);

  React.useEffect(() => {
    if (!question) return;
     
    setSelected(undefined);
    setPicked([]);
    setRevealed(false);
    setCopilotQuery(null);
    setStarred(history.isStarred(question.id));
  }, [question, history]);

  // Arrow-key roving for the answer radiogroup (focus-only; Enter/Space/click
  // commits via ChoiceButton's native activation). Called unconditionally before
  // the early returns below to respect the rules of hooks.
  const choiceRoving = useQuizChoiceRoving(
    getChoiceKeys(question?.choices).length,
    selected ? getChoiceKeys(question?.choices).indexOf(selected) : -1,
    revealed,
    question?.id ?? "",
  );
  const choiceCount = getChoiceKeys(question?.choices).length;

  const goNext = React.useCallback(() => {
    setCopilotQuery(null);
    if (index + 1 >= total) {
      setCompleted(true);
      window.scrollTo?.({ top: 0, behavior: "instant" });
      return;
    }
    onNext();
    requestAnimationFrame(() => {
      questionStartRef.current?.focus({ preventScroll: true });
      questionStartRef.current?.scrollIntoView?.({ block: "start", behavior: "instant" });
    });
  }, [index, total, onNext]);

  const commitAnswer = React.useCallback(
    (selection: string, correct: boolean) => {
      if (!question) return;
      setRevealed(true);
      posthogCapture("question_answered", {
        questionId: question.id,
        exam: question.exam,
        correct,
      });
      const now = Date.now();
      if (readSettings().recordHistory) {
        history.record({ id: question.id, selected: selection, correct, at: now });
      }
      writeLastQuestion({
        exam: question.exam,
        year: question.year,
        season: question.season,
        session: question.session,
        qNumber: question.qNumber,
        part: question.part,
        answeredAt: now,
      });
      recordSessionAnswer({
        id: question.id,
        correct,
        category: question.category ?? "未分類",
        at: now,
      });
      recordStudyOnDate();
      recordReview(question.id, correct);
      setStats((s) => {
        const next = { answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) };
        if (next.answered === 10) {
          try {
            const alreadyShown = localStorage.getItem(LS_KEYS.feedbackGateShown) === "true";
            const alreadySubmitted = localStorage.getItem(LS_KEYS.feedbackSubmitted) === "true";
            if (!alreadyShown && !alreadySubmitted) {
              localStorage.setItem(LS_KEYS.feedbackGateShown, "true");
              setUpsellOpen(true);
            }
          } catch {
            // ignore
          }
        }
        const allStats = history.getStats();
        const newlyUnlocked = evaluateAchievementsAfterAnswer(
          allStats.total,
          allStats.correct,
          correct ? combo + 1 : 0,
        );
        if (newlyUnlocked.length > 0 && !pendingAchievement) {
          setPendingAchievement(newlyUnlocked[0].id);
        }
        return next;
      });

      const nextCombo = correct ? combo + 1 : 0;
      setCombo(nextCombo);
      if (correct) {
        const level = comboLevel(nextCombo);
        const reduceMotion = motivationSettingsRef.current.reduceMotion;
        if (level !== "none" && !reduceMotion) {
          setBurst({ level, nonce: Date.now() });
          if (motivationSettingsRef.current.soundEnabled) {
            playPiroro(level);
          }
        }
      }
    },
    [question, history, combo, pendingAchievement],
  );

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (!question || revealed) return;
      const required = requiredSelectionCount(question);
      if (required > 1) {
        const next = picked.includes(key) ? picked.filter((k) => k !== key) : [...picked, key];
        setPicked(next);
        if (next.length === required) commitAnswer(formatSelection(next), isCompleteSelectionCorrect(question.answer, next));
        return;
      }
      setSelected(key);
      commitAnswer(key, isAcceptedAnswer(question.answer, key));
    },
    [question, revealed, picked, commitAnswer],
  );

  const toggleStar = React.useCallback(() => {
    if (!question) return;
    const nowStarred = history.toggleStar(question.id);
    setStarred(nowStarred);
  }, [question, history]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!question) return;
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      // Don't hijack browser/OS shortcuts: Ctrl/Cmd+R reloads, Ctrl/Cmd+1–4
      // switches tabs, etc. Shift is allowed (no modifier-less "?" conflict).
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!revealed) {
        const i = CHOICE_SHORTCUTS.indexOf(e.key);
        if (i >= 0 && i < getChoiceKeys(question.choices).length) {
          e.preventDefault();
          onSelect(getChoiceKeys(question.choices)[i]);
          return;
        }
      } else {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          goNext();
          return;
        }
      }
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        toggleStar();
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setShowKeyboardHelp((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        } else if (upsellOpen) {
          setUpsellOpen(false);
        } else if (copilotQuery) {
          setCopilotQuery(null);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, revealed, onSelect, goNext, toggleStar, upsellOpen, copilotQuery, showKeyboardHelp]);

  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !revealed) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && dx < 0) {
      // Suppress the synthetic click the browser fires after touchend. Without
      // it, a left-swipe that began on a choice both advances to the next
      // question AND lets the simulated click land on the next question's
      // (now-enabled) choice — selecting an answer the user never intended.
      e.preventDefault();
      goNext();
    }
    touchStart.current = null;
  };

  if (total === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            該当する問題がありませんでした。
          </p>
          <Button variant="outline" onClick={() => router.push(backHref)}>
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Button>
        </div>
      </div>
    );
  }

  if (completed || (!question && index >= total && total > 0)) {
    return (
      <QuizCompleteScreen
        stats={stats}
        elapsed={elapsed}
        exam={exam}
        mode={mode}
        labelOverride={completionLabel}
        shareHref={completionShareHref}
        onRetry={() => {
          setStats({ answered: 0, correct: 0 });
          setElapsed(0);
          setSelected(undefined);
          setRevealed(false);
          router.push(backHref);
        }}
        onBack={() => router.push(backHref)}
        backLabel={backLabel}
      />
    );
  }

  if (!question) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
      </div>
    );
  }

  const answerKey = question.exam === "denken3"
    ? (Array.isArray(question.answer) ? question.answer : [question.answer]).map((key) => choiceDisplayLabel(question.exam, key as ChoiceKey)).join("・")
    : formatAcceptedAnswers(question.answer);
  const requiredSelections = requiredSelectionCount(question);
  const multiSelect = requiredSelections > 1;
  const isCorrect = multiSelect
    ? isCompleteSelectionCorrect(question.answer, picked)
    : isAcceptedAnswer(question.answer, selected);
  const selectionLabel = multiSelect ? (picked.length > 0 ? formatSelection(picked) : undefined) : selected;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-50 dark:bg-zinc-950">
      <div role="region" aria-label="クイズナビゲーション" className="sticky top-0 z-20 flex flex-col border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex items-center gap-2 px-3 py-2 sm:py-2.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backHref)}
            aria-label={backLabel}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">モード: {quizModeLabel(mode)}</div>
          <div className="ml-auto flex items-center gap-2 text-sm font-medium text-zinc-700 sm:gap-3 dark:text-zinc-300">
            <ComboCounter combo={combo} />
            <span
              className="flex items-center gap-1"
              aria-label={`経過時間 ${formatElapsed(elapsed)}`}
            >
              <Timer aria-hidden="true" className="h-4 w-4" />
              <span aria-hidden="true" className="tabular-nums">{formatElapsed(elapsed)}</span>
            </span>
            <span
              aria-label={`正答 ${stats.correct} / 回答済み ${stats.answered}${
                stats.answered > 0
                  ? `（正答率 ${Math.round((stats.correct / stats.answered) * 100)}%）`
                  : ""
              }`}
              className="tabular-nums"
            >
              <span aria-hidden="true">
                正答 {stats.correct}/{stats.answered}
                {stats.answered > 0 && (
                  <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    ({Math.round((stats.correct / stats.answered) * 100)}%)
                  </span>
                )}
              </span>
            </span>
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="クイズ進捗"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuetext={`${index + 1}問目 / 全${total}問`}
          className="h-1 bg-zinc-100 dark:bg-zinc-800"
        >
          <div
            className="h-full bg-sky-600 motion-safe:transition-all motion-safe:duration-300 dark:bg-sky-400"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1">
        <main
          className="flex-1 px-3 pb-8 pt-4 sm:px-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div ref={questionStartRef} tabIndex={-1} className="mx-auto max-w-2xl scroll-mt-24 space-y-4 outline-none">
            <QuestionCard
              question={question}
              progress={{ current: index, total }}
            />

            {multiSelect && !revealed && (
              <p className="rounded-xl border border-amber-300/60 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-100" data-testid="multi-select-hint">
                正解は{requiredSelections}つあります。{requiredSelections}つ選ぶと採点します（選択中 {picked.length}/{requiredSelections}）
              </p>
            )}
            <div
              role={multiSelect ? "group" : "radiogroup"}
              aria-label={multiSelect ? `選択肢（${requiredSelections}つ選ぶ。数字キー1〜9・0・Enter/スペースで選択・解除）` : "選択肢（矢印キーで移動、数字キー1〜9・0・Enter/スペースで選択）"}
              className="space-y-2"
            >
              {question.choices &&
                getChoiceKeys(question.choices).map((key, idx) => (
                  <ChoiceButton
                    key={key}
                    choiceKey={key}
                    displayLabel={choiceDisplayLabel(question.exam, key)}
                    text={question.choices![key]!}
                    imageUrl={question.choiceImageUrls?.[key]}
                    revealed={revealed}
                    selected={multiSelect ? picked.includes(key) : selected === key}
                    correct={isAcceptedAnswer(question.answer, key)}
                    disabled={revealed}
                    onClick={() => onSelect(key)}
                    shortcutIndex={(idx + 1) % 10}
                    multiSelect={multiSelect}
                    {...choiceRoving.getRadioProps(idx)}
                  />
                ))}
            </div>

            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {revealed
                ? isCorrect
                  ? `正解です。解説が表示されました。`
                  : `不正解です。正解は ${answerKey} です。解説が表示されました。`
                : ""}
            </div>

            {revealed && (
              <>
                <ExplanationCard
                  question={question}
                  selected={selectionLabel}
                  isCorrect={isCorrect}
                  starred={starred}
                  onToggleStar={toggleStar}
                  onNext={goNext}
                  nextLabel={index + 1 >= total ? "結果を見る" : "次の問題へ"}
                  onAskAI={() => setCopilotQuery("open")}
                  onAnalyzeWrong={
                    !isCorrect ? () => setCopilotQuery("why-wrong") : undefined
                  }
                />
                <ExamNoteGuide exam={question.exam as ExamCode} />
                <GenerateSimilar baseQuestion={question} />
                <QuestionCommentBox questionId={question.id} />
              </>
            )}

            <div className="mt-4 hidden rounded-xl bg-zinc-100 p-3 text-xs text-zinc-500 [@media(hover:hover)_and_(pointer:fine)]:block dark:bg-zinc-900 dark:text-zinc-400">
              {revealed
                ? "Enter / → で次の問題へ / R でスター / ? でヘルプ"
                : `キーボード: ${choiceCount <= 9 ? `1〜${choiceCount}` : "1〜9・0"} で選択 / R でスター / ? でヘルプ`}
            </div>
            {!revealed && showSwipeHint && (
              <div className="mt-4 rounded-xl bg-sky-50 p-3 text-xs text-sky-700 [@media(hover:hover)_and_(pointer:fine)]:hidden dark:bg-sky-950/30 dark:text-sky-300">
                解答後、左スワイプで次の問題へ進めます
              </div>
            )}
            {showKeyboardHelp && (
              <KeyboardShortcutHelp onClose={() => setShowKeyboardHelp(false)} />
            )}
          </div>

        </main>

      </div>

      <CopilotDesktopFloating
        question={question}
        selectedChoice={selectionLabel}
        isCorrect={revealed ? isCorrect : undefined}
        onRateLimitHit={() => setUpsellOpen(true)}
        defaultOpen={copilotQuery !== null}
        headerRight={
          copilotQuery === "why-wrong" ? (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-700 dark:bg-red-900 dark:text-red-200">
              誤答分析待機
            </span>
          ) : null
        }
        key={`desktop-${question.id}-${copilotQuery ?? ""}`}
      />

      <CopilotMobileSheet
        question={question}
        selectedChoice={selectionLabel}
        isCorrect={revealed ? isCorrect : undefined}
        onRateLimitHit={() => setUpsellOpen(true)}
        defaultOpen={copilotQuery !== null}
        key={`mobile-${question.id}-${copilotQuery ?? ""}`}
      />


      {upsellOpen && (
        <FeedbackGateModal
          open={upsellOpen}
          onClose={() => setUpsellOpen(false)}
          source="ai-limit"
        />
      )}

      <FireworksBurst
        active={burst !== null}
        level={burst?.level ?? "small"}
        onDone={() => setBurst(null)}
        key={burst?.nonce ?? 0}
      />

      {pendingAchievement && (
        <AchievementToast
          achievementId={pendingAchievement}
          onClose={() => setPendingAchievement(null)}
        />
      )}
    </div>
  );
}

function KeyboardShortcutHelp({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="キーボードショートカット一覧"
      aria-modal="false"
      className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          キーボードショートカット
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="ショートカット一覧を閉じる"
          className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          ✕
        </button>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          1 / 2 / 3 / 4
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">選択肢を選ぶ</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Enter / →
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">次の問題へ（解答後）</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          R
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">スターをつける / 外す</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Esc
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">ダイアログを閉じる</dd>
        <dt className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          ?
        </dt>
        <dd className="self-center text-zinc-600 dark:text-zinc-400">このヘルプを表示 / 非表示</dd>
      </dl>
    </div>
  );
}

const QUIZ_ORIGIN =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://www.kakomon-ai.jp";

export function QuizCompleteScreen({
  stats,
  elapsed,
  exam,
  mode,
  onRetry,
  onBack,
  backLabel = "モード選択に戻る",
  labelOverride,
  shareHref,
}: {
  stats: { answered: number; correct: number };
  elapsed: number;
  exam: string;
  mode: string;
  onRetry: () => void;
  onBack: () => void;
  backLabel?: string;
  labelOverride?: string;
  shareHref?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;

  React.useEffect(() => {
    posthogCapture("quiz_completed", {
      exam,
      mode,
      total: stats.answered,
      correct: stats.correct,
      accuracy,
      elapsed_seconds: elapsed,
    });
    // fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const label = labelOverride ?? examLabel(exam);
  const safeShareHref = shareHref && /^\/(?!\/)/.test(shareHref) ? shareHref : undefined;
  const shareUrl = safeShareHref
    ? `${QUIZ_ORIGIN}${safeShareHref}`
    : `${QUIZ_ORIGIN}/quiz?mode=${encodeURIComponent(mode)}&exam=${encodeURIComponent(exam)}`;
  const shareText = `${label}の過去問で正答率${accuracy}%でした！ AIコパイロット付き無料学習 #過去問AI #IPA試験`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`${shareUrl}\n${shareText}`)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };


  const btnClass =
    "inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <ChihuahuaMascot pose="celebrate" size={100} className="mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">クイズ完了！</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {accuracy >= 80 ? "素晴らしい！" : accuracy >= 60 ? "いい調子です！" : "次は満点を狙おう！"}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-sky-50 p-3 dark:bg-sky-950/30">
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">{accuracy}%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">正答率</div>
          </div>
          <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
            <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{stats.correct}/{stats.answered}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">正解数</div>
          </div>
          <div className="rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-800">
            <div className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">{`${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">経過時間</div>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">結果をシェアする</p>
          <div className="flex flex-wrap gap-2">
            <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="X でシェア（結果・新しいタブで開く）" className={btnClass}>
              <Share2 className="h-4 w-4" aria-hidden="true" /> X でシェア
            </a>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer" aria-label="LINEで結果をシェア（新しいタブで開く）" className={btnClass}>
              LINE
            </a>
            <button type="button" onClick={handleCopy} className={btnClass}>
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "コピーしました" : "URLコピー"}
            </button>
          </div>
          {/* コピー成功はボタン文言変更だけでは SR に告知されない(WCAG 4.1.3)。
              polite live region で告知する。 */}
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "結果 URL をコピーしました" : ""}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={onRetry} className="w-full">
            もう一度挑戦
          </Button>
          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Button>
        </div>

        {/* 旗艦＝午後II論述AI採点への導線。論述区分 (ST/SA/PM/SM/AU) を解き終えた
            読者にだけ 1 回だけ提示する（解説カードと違い問題ごとに繰り返さない）。
            ゲートは AfternoonEssayHint 内の ESSAY_EXAM_CODES 単一情報源。 */}
        <AfternoonEssayHint exam={exam as ExamCode} />
      </div>
    </div>
  );
}
