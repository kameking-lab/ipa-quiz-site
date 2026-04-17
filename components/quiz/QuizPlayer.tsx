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
import { ArrowLeft, Sparkles } from "lucide-react";

interface Props {
  questions: Question[];
  mode: string;
  backHref?: string;
}

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

export function QuizPlayer({ questions, mode, backHref = "/" }: Props) {
  const router = useRouter();
  const history = React.useMemo(() => createHistoryStore(), []);
  const [premium, setPremium] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const [upsellOpen, setUpsellOpen] = React.useState(false);
  const [copilotQuery, setCopilotQuery] = React.useState<"why-wrong" | "open" | null>(null);
  const [starred, setStarred] = React.useState(false);
  const [stats, setStats] = React.useState({ answered: 0, correct: 0 });
  const [showSwipeHint, setShowSwipeHint] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPremium(getPremiumFlag());
    const alreadyShown = localStorage.getItem(LS_KEYS.swipeHintShown) === "true";
    if (!alreadyShown) {
      setShowSwipeHint(true);
      localStorage.setItem(LS_KEYS.swipeHintShown, "true");
    }
  }, []);

  const question = questions[index];

  React.useEffect(() => {
    if (!question) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(undefined);
    setRevealed(false);
    setCopilotQuery(null);
    setStarred(history.isStarred(question.id));
  }, [question, history]);

  const goNext = React.useCallback(() => {
    setCopilotQuery(null);
    if (index + 1 >= questions.length) {
      router.push(`${backHref}?done=1`);
      return;
    }
    setIndex(index + 1);
  }, [index, questions.length, router, backHref]);

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
      setStats((s) => ({ answered: s.answered + 1, correct: s.correct + (correct ? 1 : 0) }));
    },
    [question, revealed, history],
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

  if (!question) {
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

  const answerKey = Array.isArray(question.answer)
    ? (question.answer[0] as string)
    : String(question.answer);
  const isCorrect = selected === answerKey;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-zinc-200 bg-white/90 px-3 py-2 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(backHref)}
          aria-label="戻る"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">モード: {mode}</div>
        <div className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
          正答 {stats.correct}/{stats.answered}
        </div>
      </header>

      <div className="flex flex-1">
        <main
          className="flex-1 px-3 pb-32 pt-4 sm:px-6 md:max-w-[calc(100%-380px)]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="mx-auto max-w-2xl space-y-4">
            <QuestionCard
              question={question}
              progress={{ current: index, total: questions.length }}
            />

            <div className="space-y-2">
              {question.choices &&
                CHOICE_KEYS.map((key) => (
                  <ChoiceButton
                    key={key}
                    choiceKey={key}
                    text={question.choices![key]}
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
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 p-3 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-950/95">
              <Button variant="primary" size="xl" onClick={goNext} className="w-full">
                次の問題へ
              </Button>
            </div>
          )}
        </main>

        <aside className="hidden w-[380px] shrink-0 border-l border-zinc-200 md:block dark:border-zinc-800">
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
        <div className="fixed bottom-24 right-4 z-30 hidden md:block">
          <div className="rounded-full bg-sky-600 px-3 py-1 text-xs text-white shadow">
            <Sparkles className="mr-1 inline h-3 w-3" />
            右パネルでAIが待機中
          </div>
        </div>
      )}

      <PremiumUpsellDialog open={upsellOpen} onClose={() => setUpsellOpen(false)} />
    </div>
  );
}
