"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { Question, ChoiceKey } from "@/lib/questions/types";
import { QuestionCard } from "./QuestionCard";
import { ChoiceButton } from "./ChoiceButton";
import { ExplanationCard } from "./ExplanationCard";
import { GenerateSimilar } from "./GenerateSimilar";
import { TtsControls } from "./TtsControls";
import { CopilotPanel, CopilotMobileSheet } from "@/components/copilot/CopilotPanel";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { QuestionCommentBox } from "./QuestionCommentBox";

const FeedbackGateModal = dynamic(
  () => import("@/components/FeedbackGateModal").then((m) => m.FeedbackGateModal),
  { ssr: false },
);
import { recordReview } from "@/lib/learning/spaced-repetition";
import { LS_KEYS } from "@/lib/storage/keys";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Timer, Share2, Check, Copy } from "lucide-react";
import { examLabel } from "@/lib/utils";
import { FireworksBurst } from "@/components/motivation/FireworksBurst";
import { ComboCounter } from "@/components/motivation/ComboCounter";
import { comboLevel, readMotivationSettings } from "@/lib/motivation/combo";
import { playPiroro } from "@/lib/motivation/sound";
import { recordSessionAnswer } from "@/lib/motivation/session";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";
import { posthogCapture } from "@/lib/posthog";

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
  exam?: string;
  onNext: () => void;
}

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

export function QuizPlayer({
  question,
  index,
  total,
  mode,
  backHref = "/",
  exam = "ap",
  onNext,
}: Props) {
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const [upsellOpen, setUpsellOpen] = React.useState(false);
  const [copilotQuery, setCopilotQuery] = React.useState<"why-wrong" | "open" | null>(null);
  const [starred, setStarred] = React.useState(false);
  const [stats, setStats] = React.useState({ answered: 0, correct: 0 });
  const [showSwipeHint, setShowSwipeHint] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  const [burst, setBurst] = React.useState<{ level: "small" | "big"; nonce: number } | null>(null);
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
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (!question) return;
     
    setSelected(undefined);
    setRevealed(false);
    setCopilotQuery(null);
    setStarred(history.isStarred(question.id));
  }, [question, history]);

  // When the session runs out of questions, send the user back with ?done=1.
  React.useEffect(() => {
    if (total > 0 && index >= total) {
      router.push(`${backHref}?done=1`);
    }
  }, [index, total, router, backHref]);

  const goNext = React.useCallback(() => {
    setCopilotQuery(null);
    if (index + 1 >= total) {
      router.push(`${backHref}?done=1`);
      return;
    }
    onNext();
  }, [index, total, router, backHref, onNext]);

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (!question || revealed) return;
      setSelected(key);
      setRevealed(true);
      const answerKey = Array.isArray(question.answer)
        ? (question.answer[0] as string)
        : String(question.answer);
      const correct = key === answerKey;
      posthogCapture("question_answered", {
        questionId: question.id,
        exam: question.exam,
        correct,
      });
      const now = Date.now();
      history.record({ id: question.id, selected: key, correct, at: now });
      writeLastQuestion({
        exam: question.exam,
        year: question.year,
        season: question.season,
        session: question.session,
        qNumber: question.qNumber,
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
    [question, revealed, history, combo],
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
      if (!revealed) {
        const i = ["1", "2", "3", "4"].indexOf(e.key);
        if (i >= 0) {
          e.preventDefault();
          onSelect(CHOICE_KEYS[i]);
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
      }
      if (e.key === "Escape") {
        if (upsellOpen) {
          setUpsellOpen(false);
        } else if (copilotQuery) {
          setCopilotQuery(null);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, revealed, onSelect, goNext, toggleStar, upsellOpen, copilotQuery]);

  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !revealed) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2 && dx < 0) {
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
            <ArrowLeft className="h-4 w-4" /> モード選択に戻る
          </Button>
        </div>
      </div>
    );
  }

  if (!question && index >= total && total > 0) {
    return (
      <QuizCompleteScreen
        stats={stats}
        elapsed={elapsed}
        exam={exam}
        mode={mode}
        onRetry={() => {
          setStats({ answered: 0, correct: 0 });
          setElapsed(0);
          setSelected(undefined);
          setRevealed(false);
          router.push(backHref);
        }}
        onBack={() => router.push(backHref)}
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

  const answerKey = Array.isArray(question.answer)
    ? (question.answer[0] as string)
    : String(question.answer);
  const isCorrect = selected === answerKey;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-50 dark:bg-zinc-950">
      <div role="region" aria-label="クイズナビゲーション" className="sticky top-0 z-20 flex flex-col border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex items-center gap-2 px-3 py-2 sm:py-2.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backHref)}
            aria-label="モード選択に戻る"
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">モード: {mode}</div>
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
          className="flex-1 px-3 pb-32 pt-4 sm:px-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <TtsControls text={question.question} />
            <QuestionCard
              question={question}
              progress={{ current: index, total }}
            />

            <div
              role="group"
              aria-label="選択肢（数字キー1〜4で選択可能）"
              className="space-y-2"
            >
              {question.choices &&
                CHOICE_KEYS.map((key, idx) => (
                  <ChoiceButton
                    key={key}
                    choiceKey={key}
                    text={question.choices![key]!}
                    revealed={revealed}
                    selected={selected === key}
                    correct={answerKey === key}
                    disabled={revealed}
                    onClick={() => onSelect(key)}
                    shortcutIndex={idx + 1}
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
                  selected={selected}
                  isCorrect={isCorrect}
                  starred={starred}
                  onToggleStar={toggleStar}
                  onNext={goNext}
                  onAskAI={() => setCopilotQuery("open")}
                  onAnalyzeWrong={
                    !isCorrect ? () => setCopilotQuery("why-wrong") : undefined
                  }
                />
                <GenerateSimilar baseQuestion={question} />
                <QuestionCommentBox questionId={question.id} />
              </>
            )}

            {!revealed && (
              <>
                <div className="mt-4 hidden rounded-xl bg-zinc-100 p-3 text-xs text-zinc-500 [@media(hover:hover)_and_(pointer:fine)]:block dark:bg-zinc-900 dark:text-zinc-400">
                  キーボード: 1〜4 で選択 / R であとで復習
                </div>
                {showSwipeHint && (
                  <div className="mt-4 rounded-xl bg-sky-50 p-3 text-xs text-sky-700 [@media(hover:hover)_and_(pointer:fine)]:hidden dark:bg-sky-950/30 dark:text-sky-300">
                    解答後、左スワイプで次の問題へ進めます
                  </div>
                )}
              </>
            )}
          </div>

          {revealed && (
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur sm:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
              <Button variant="primary" size="xl" onClick={goNext} className="w-full">
                次の問題へ
              </Button>
            </div>
          )}
        </main>

        <aside aria-label="AI コパイロット" className="hidden shrink-0 border-l border-zinc-200 sm:block sm:w-[40%] lg:w-[380px] dark:border-zinc-800">
          <div className="sticky top-[52px] h-[calc(100dvh-52px)]">
            <CopilotPanel
              question={question}
              selectedChoice={selected}
              isCorrect={revealed ? isCorrect : undefined}
              onRateLimitHit={() => setUpsellOpen(true)}
              headerRight={
                copilotQuery === "why-wrong" ? (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-700 dark:bg-red-900 dark:text-red-200">
                    誤答分析待機
                  </span>
                ) : null
              }
              key={question.id + (copilotQuery ?? "")}
            />
          </div>
        </aside>
      </div>

      <CopilotMobileSheet
        question={question}
        selectedChoice={selected}
        isCorrect={revealed ? isCorrect : undefined}
        onRateLimitHit={() => setUpsellOpen(true)}
        key={`mobile-${question.id}-${copilotQuery ?? ""}`}
      />

      {copilotQuery === "open" && (
        <div className="fixed bottom-24 right-4 z-30 hidden sm:block">
          <div className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white shadow">
            <Sparkles className="mr-1 inline h-3 w-3" />
            右パネルでAIが待機中
          </div>
        </div>
      )}

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
    </div>
  );
}

const QUIZ_ORIGIN =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://kakomon-ai.jp";

function QuizCompleteScreen({
  stats,
  elapsed,
  exam,
  mode,
  onRetry,
  onBack,
}: {
  stats: { answered: number; correct: number };
  elapsed: number;
  exam: string;
  mode: string;
  onRetry: () => void;
  onBack: () => void;
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
  const label = examLabel(exam);
  const shareUrl = `${QUIZ_ORIGIN}/quiz?mode=${encodeURIComponent(mode)}&exam=${encodeURIComponent(exam)}`;
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

  const emoji = accuracy >= 80 ? "🎉" : accuracy >= 60 ? "👍" : "💪";

  const btnClass =
    "inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800";

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <div className="mb-2 text-5xl" aria-hidden="true">{emoji}</div>
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
            <a href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="X（Twitter）で結果をシェア（新しいタブで開く）" className={btnClass}>
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
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="primary" onClick={onRetry} className="w-full">
            もう一度挑戦
          </Button>
          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="h-4 w-4" /> モード選択に戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
