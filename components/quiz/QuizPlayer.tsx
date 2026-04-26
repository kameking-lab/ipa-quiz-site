"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Question, ChoiceKey } from "@/lib/questions/types";
import { QuestionCard } from "./QuestionCard";
import { ChoiceButton } from "./ChoiceButton";
import { ExplanationCard } from "./ExplanationCard";
import { CopilotPanel, CopilotMobileSheet } from "@/components/copilot/CopilotPanel";
import { PremiumUpsellDialog } from "@/components/PremiumUpsellDialog";
import { createHistoryStore, getPremiumFlag } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Timer } from "lucide-react";
import { FireworksBurst } from "@/components/motivation/FireworksBurst";
import { ComboCounter } from "@/components/motivation/ComboCounter";
import { comboLevel, readMotivationSettings } from "@/lib/motivation/combo";
import { playPiroro } from "@/lib/motivation/sound";
import { recordSessionAnswer } from "@/lib/motivation/session";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";

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
  onNext: () => void;
}

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

export function QuizPlayer({
  question,
  index,
  total,
  mode,
  backHref = "/",
  onNext,
}: Props) {
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [premium, setPremium] = React.useState(false);
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

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPremium(getPremiumFlag());
    motivationSettingsRef.current = readMotivationSettings();
    const alreadyShown = localStorage.getItem(LS_KEYS.swipeHintShown) === "true";
    if (!alreadyShown) {
      setShowSwipeHint(true);
      localStorage.setItem(LS_KEYS.swipeHintShown, "true");
    }
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (!question) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      history.record({ id: question.id, selected: key, correct, at: Date.now() });
      recordSessionAnswer({
        id: question.id,
        correct,
        category: question.category ?? "未分類",
        at: Date.now(),
      });
      recordStudyOnDate();
      setStats((s) => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));

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
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [question, revealed, onSelect, goNext, toggleStar]);

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
      <header className="sticky top-0 z-20 flex flex-col border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex items-center gap-2 px-3 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(backHref)}
            aria-label="戻る"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">モード: {mode}</div>
          <div className="ml-auto flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <ComboCounter combo={combo} />
            <span className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              {formatElapsed(elapsed)}
            </span>
            <span>正答 {stats.correct}/{stats.answered}</span>
          </div>
        </div>
        <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full bg-sky-500 transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </header>

      <div className="flex flex-1">
        <main
          className="flex-1 px-3 pb-32 pt-4 sm:px-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <QuestionCard
              question={question}
              progress={{ current: index, total }}
            />

            <div className="space-y-2">
              {question.choices &&
                CHOICE_KEYS.map((key) => (
                  <ChoiceButton
                    key={key}
                    choiceKey={key}
                    text={question.choices![key]!}
                    revealed={revealed}
                    selected={selected === key}
                    correct={answerKey === key}
                    disabled={revealed}
                    onClick={() => onSelect(key)}
                  />
                ))}
            </div>

            {revealed && (
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

        <aside className="hidden shrink-0 border-l border-zinc-200 sm:block sm:w-[40%] lg:w-[380px] dark:border-zinc-800">
          <div className="sticky top-[52px] h-[calc(100dvh-52px)]">
            <CopilotPanel
              question={question}
              selectedChoice={selected}
              isCorrect={revealed ? isCorrect : undefined}
              premium={premium}
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
        premium={premium}
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

      <PremiumUpsellDialog open={upsellOpen} onClose={() => setUpsellOpen(false)} />

      <FireworksBurst
        active={burst !== null}
        level={burst?.level ?? "small"}
        onDone={() => setBurst(null)}
        key={burst?.nonce ?? 0}
      />
    </div>
  );
}
