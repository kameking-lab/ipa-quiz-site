"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Trophy, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import type { Question, ChoiceKey } from "@/lib/questions/types";
import { ChoiceButton } from "@/components/quiz/ChoiceButton";
import { useQuizChoiceRoving } from "@/lib/a11y/use-quiz-choice-roving";
import { Button } from "@/components/ui/button";
import {
  ensureChallengeForToday,
  completeChallenge,
  readDailyChallenge,
} from "@/lib/gamification/daily-challenge";
import { awardXp, XP_REWARDS, xpProgress, readXp } from "@/lib/gamification/xp";
import { unlockManual } from "@/lib/gamification/achievements";
import { createHistoryStore } from "@/lib/storage/history";
import { recordStudyOnDate } from "@/lib/motivation/heatmap";

interface Props {
  questions: Question[];
  date: string;
}

const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

interface FinalResult {
  correctCount: number;
  total: number;
  perfect: boolean;
  consecutiveDays: number;
  perfectStreak: number;
  alreadyCompleted: boolean;
  xpAwarded: number;
  newLevel: number | null;
}

export function DailyChallengeClient({ questions, date }: Props) {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<ChoiceKey | undefined>(undefined);
  const [revealed, setRevealed] = React.useState(false);
  const [results, setResults] = React.useState<Array<"correct" | "incorrect">>([]);
  const [final, setFinal] = React.useState<FinalResult | null>(null);
  const [alreadyDoneOnLoad, setAlreadyDoneOnLoad] = React.useState(false);
  const history = React.useMemo(() => createHistoryStore(), []);

  React.useEffect(() => {
    const ids = questions.map((q) => q.id);
    ensureChallengeForToday(ids, date);
    const current = readDailyChallenge();
    if (current.date === date && current.completedAt) {
      setAlreadyDoneOnLoad(true);
      const correct = current.answers.filter((a) => a === "correct").length;
      setFinal({
        correctCount: correct,
        total: current.answers.length,
        perfect: current.perfect,
        consecutiveDays: current.consecutiveDays,
        perfectStreak: current.perfectStreak,
        alreadyCompleted: true,
        xpAwarded: 0,
        newLevel: null,
      });
    }
  }, [questions, date]);

  const current = questions[index];
  const total = questions.length;

  // Arrow-key roving for the answer radiogroup (focus-only; Enter/Space/click
  // commits). Unconditional, before the early returns, per the rules of hooks.
  const choiceRoving = useQuizChoiceRoving(
    CHOICE_KEYS.length,
    selected ? CHOICE_KEYS.indexOf(selected) : -1,
    revealed,
    current?.id ?? "",
  );

  const onSelect = React.useCallback(
    (key: ChoiceKey) => {
      if (!current || revealed) return;
      const answerKey = Array.isArray(current.answer)
        ? String(current.answer[0])
        : String(current.answer);
      const correct = key === answerKey;
      setSelected(key);
      setRevealed(true);
      setResults((prev) => [...prev, correct ? "correct" : "incorrect"]);
      history.record({ id: current.id, selected: key, correct, at: Date.now() });
      recordStudyOnDate();
    },
    [current, revealed, history],
  );

  // Number-key (1–4) selection — the ChoiceButton/radiogroup advertise
  // aria-keyshortcuts「数字キーN でも選択できます」, so the keys must actually work
  // (致命傷⑩: the label lied here — /quiz・/q already had this handler, /challenge
  // did not). N maps to CHOICE_KEYS[N-1] (matching shortcutIndex={i+1}); only
  // fires if that choice is rendered. Ignored while typing in a field.
  React.useEffect(() => {
    if (revealed || !current) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      const i = ["1", "2", "3", "4"].indexOf(e.key);
      if (i < 0) return;
      const key = CHOICE_KEYS[i];
      if (current.choices?.[key]) {
        e.preventDefault();
        onSelect(key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [revealed, current, onSelect]);

  const onNext = React.useCallback(() => {
    if (index + 1 < total) {
      setIndex((i) => i + 1);
      setSelected(undefined);
      setRevealed(false);
      return;
    }
    const completion = completeChallenge(results, date);
    let xpAwarded = 0;
    let newLevel: number | null = null;
    if (!completion.alreadyCompleted) {
      const correctXp = completion.correctCount * XP_REWARDS.correct;
      const incorrectXp = (completion.total - completion.correctCount) * XP_REWARDS.incorrect;
      let bonus = XP_REWARDS.challengeComplete;
      if (completion.perfect) bonus += XP_REWARDS.challengeAllCorrect;
      const result = awardXp(correctXp + incorrectXp + bonus);
      xpAwarded = result.awarded;
      if (result.leveledUp) newLevel = result.levelAfter;

      const unlocks: string[] = ["challenge-first"];
      if (completion.perfect) unlocks.push("challenge-perfect");
      if (completion.consecutiveDays >= 3) unlocks.push("challenge-3");
      if (completion.consecutiveDays >= 7) unlocks.push("challenge-7");
      if (completion.consecutiveDays >= 30) unlocks.push("challenge-30");
      if (completion.perfectStreak >= 7) unlocks.push("challenge-perfect-7");
      for (const id of unlocks) unlockManual(id);
    }
    setFinal({
      ...completion,
      xpAwarded,
      newLevel,
    });
  }, [index, total, results, date]);

  if (final) {
    const xp = readXp();
    const progress = xpProgress(xp.total);
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 p-6 text-center shadow-sm dark:from-amber-950/30 dark:via-rose-950/30 dark:to-violet-950/30">
          <Trophy className="mx-auto mb-3 h-12 w-12 text-amber-500" />
          <h2 className="mb-1 text-2xl font-bold tracking-tight">
            {final.perfect ? "完璧！全問正解！" : "デイリーチャレンジ完了"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {date} のチャレンジ
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">スコア</p>
              <p className="text-2xl font-bold">
                {final.correctCount}/{final.total}
              </p>
            </div>
            <div className="rounded-xl bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">連続日数</p>
              <p className="text-2xl font-bold">{final.consecutiveDays}日</p>
            </div>
            <div className="rounded-xl bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">獲得XP</p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                +{final.xpAwarded}
              </p>
            </div>
          </div>
          {final.alreadyCompleted && (
            <p className="mt-3 text-xs text-muted-foreground">
              本日は既に完了済みのため、XP は加算されていません。
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">レベル {progress.level}</span>
            <span className="text-muted-foreground">
              {progress.isMax
                ? "MAX"
                : `${progress.xpIntoLevel} / ${progress.xpForNextLevel} XP`}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all"
              style={{ width: `${Math.min(100, progress.progress * 100)}%` }}
            />
          </div>
          {final.newLevel && (
            <p className="mt-3 flex items-center gap-1 text-sm font-medium text-violet-600 dark:text-violet-400">
              <Sparkles className="h-4 w-4" />
              レベル {final.newLevel} に到達しました！
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild variant="primary" className="flex-1">
            <Link href="/">ホームへ</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/account">アチーブメント確認</Link>
          </Button>
        </div>

        {alreadyDoneOnLoad && (
          <p className="text-center text-xs text-muted-foreground">
            次のチャレンジは JST 0:00 に切り替わります
          </p>
        )}
      </div>
    );
  }

  if (!current) return null;

  const choices = current.choices ?? {};
  const answerKey = Array.isArray(current.answer)
    ? String(current.answer[0])
    : String(current.answer);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          問題 {index + 1} / {total}
        </span>
        <span className="flex items-center gap-1">
          {results.map((r, i) => (
            <span
              key={i}
              className={
                "inline-block h-2 w-2 rounded-full " +
                (r === "correct" ? "bg-emerald-500" : "bg-rose-500")
              }
            />
          ))}
          {Array.from({ length: total - results.length }).map((_, i) => (
            <span key={"p" + i} className="inline-block h-2 w-2 rounded-full bg-muted" />
          ))}
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs">
          <Sparkles className="h-3 w-3" />
          {current.exam.toUpperCase()} · {current.year}{current.season === "spring" ? "春" : current.season === "autumn" ? "秋" : ""}
        </div>
        <p className="text-sm leading-relaxed sm:text-base">{current.question}</p>
      </div>

      <div
        role="radiogroup"
        aria-label="選択肢（矢印キーで移動、数字キー1〜4・Enter/スペースで選択）"
        className="space-y-2"
      >
        {CHOICE_KEYS.map((k, i) => {
          const text = choices[k];
          if (!text) return null;
          return (
            <ChoiceButton
              key={k}
              choiceKey={k}
              text={text}
              revealed={revealed}
              selected={selected === k}
              correct={k === answerKey}
              disabled={revealed}
              onClick={() => onSelect(k)}
              shortcutIndex={i + 1}
              {...choiceRoving.getRadioProps(i)}
            />
          );
        })}
      </div>

      {revealed && (
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start gap-2">
            {selected === answerKey ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
            )}
            <div className="flex-1 text-sm">
              <p className="mb-1 font-semibold">
                {selected === answerKey ? "正解！" : `不正解（正解は ${answerKey}）`}
              </p>
              <p className="leading-relaxed text-muted-foreground">{current.explanation}</p>
            </div>
          </div>
          <Button onClick={onNext} variant="primary" className="w-full">
            {index + 1 < total ? "次の問題" : "結果を見る"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="h-3 w-3" />
          中断してホームへ戻る
        </Link>
      </div>
    </div>
  );
}
