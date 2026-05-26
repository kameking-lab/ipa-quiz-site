"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import {
  ATTRIBUTE_OPTIONS,
  markFirstVisit,
  markTourCompleted,
  markTourDismissed,
  setAttribute,
  setSelectedExam,
} from "@/lib/onboarding";
import type { UserAttribute } from "@/lib/onboarding";
import { useRovingRadioGroup } from "@/lib/a11y/use-roving-radio";
import { ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";

/**
 * Goal-setting flow ("目標を決めて始める").
 *
 * Phase 10 (即修正③ / A-1): this no longer auto-opens on landing. The forced
 * 4-step modal was what made the first-question path 7 clicks. It now opens
 * only when something dispatches the `OPEN_ONBOARDING_EVENT` (the home hero's
 * "目標を決めて始める" route), and is trimmed to 2 steps: pick exam, pick style.
 */
export const OPEN_ONBOARDING_EVENT = "kakomon:open-onboarding";

const TOTAL_STEPS = 2;

type ExamDifficulty = { level: 1 | 2 | 3 | 4 | 5; label: string };

const EXAM_DIFFICULTY: Record<string, ExamDifficulty> = {
  ip: { level: 1, label: "入門" },
  sg: { level: 2, label: "初級" },
  fe: { level: 2, label: "初級" },
  ap: { level: 3, label: "中級" },
  sc: { level: 4, label: "上級" },
  nw: { level: 4, label: "上級" },
  db: { level: 4, label: "上級" },
  es: { level: 4, label: "上級" },
  st: { level: 5, label: "最上級" },
  sa: { level: 5, label: "最上級" },
  pm: { level: 5, label: "最上級" },
  sm: { level: 5, label: "最上級" },
  au: { level: 5, label: "最上級" },
};

const POPULAR_EXAMS: ExamCode[] = ["ip", "sg", "fe", "ap", "sc"];

export function OnboardingTour() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [attribute, setLocalAttribute] = React.useState<UserAttribute | null>(null);
  const [selectedExam, setLocalSelectedExam] = React.useState<ExamCode | null>(null);
  const [showAllExams, setShowAllExams] = React.useState(false);

  React.useEffect(() => {
    // Opt-in only: open when the home hero's "目標を決めて始める" route fires the
    // event. No auto-open on landing (A-1).
    const openTour = () => {
      markFirstVisit();
      setStep(1);
      setOpen(true);
    };
    window.addEventListener(OPEN_ONBOARDING_EVENT, openTour);
    return () => window.removeEventListener(OPEN_ONBOARDING_EVENT, openTour);
  }, []);

  const handleSkip = React.useCallback(() => {
    markTourDismissed();
    setOpen(false);
  }, []);

  const handleClose = React.useCallback(() => {
    markTourDismissed();
    setOpen(false);
  }, []);

  const handleSelectAttribute = (value: UserAttribute) => {
    setLocalAttribute(value);
    setAttribute(value);
  };

  const handleSelectExam = (code: ExamCode) => {
    setLocalSelectedExam(code);
    setSelectedExam(code);
  };

  const handleFinish = () => {
    const exam = selectedExam ?? "ap";
    markTourCompleted();
    setOpen(false);
    router.push(`/quiz?mode=random&exam=${exam}&limit=3`);
  };

  const examsToShow: ExamCode[] = showAllExams
    ? (Object.keys(EXAM_LABELS) as ExamCode[])
    : POPULAR_EXAMS;

  const { getRadioProps: getExamRadioProps } = useRovingRadioGroup(
    examsToShow,
    selectedExam,
    handleSelectExam,
  );
  const { getRadioProps: getStyleRadioProps } = useRovingRadioGroup(
    ATTRIBUTE_OPTIONS.map((o) => o.value),
    attribute,
    handleSelectAttribute,
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent
        className="max-w-lg"
        aria-modal="true"
        aria-label="学習の目標を決める"
      >
        {/* Progress indicator */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          ステップ {step} / {TOTAL_STEPS}
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
              目標の試験区分を選ぶ
            </DialogTitle>
            <DialogDescription>
              受験予定の試験を選んでください。あとから <strong className="text-foreground">/settings</strong> で変更できます。
            </DialogDescription>
            <div
              role="radiogroup"
              aria-label="試験区分"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {examsToShow.map((code, index) => {
                const diff = EXAM_DIFFICULTY[code] ?? { level: 3, label: "中級" };
                const isSelected = selectedExam === code;
                return (
                  <button
                    key={code}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectExam(code)}
                    {...getExamRadioProps(index)}
                    className={`relative rounded-xl border px-3 py-2.5 text-left transition-colors min-h-[64px] ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    <div className="text-[11px] font-bold uppercase text-muted-foreground">
                      {code}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-foreground leading-snug">
                      {EXAM_LABELS[code]}
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-3 rounded-full ${
                            i < diff.level
                              ? "bg-primary"
                              : "bg-zinc-200 dark:bg-zinc-800"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-1 text-[10px] text-muted-foreground">
                        {diff.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {!showAllExams && (
              <button
                type="button"
                onClick={() => setShowAllExams(true)}
                className="w-full rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground hover:bg-muted"
              >
                高度試験を含む全13区分を表示
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <DialogTitle className="text-xl">学習スタイルを教えてください</DialogTitle>
            <DialogDescription>
              あなたに合った導線をご案内します（任意・後から変更可）。
            </DialogDescription>
            <div role="radiogroup" aria-label="学習スタイル" className="space-y-2">
              {ATTRIBUTE_OPTIONS.map((opt, index) => {
                const isSelected = attribute === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectAttribute(opt.value)}
                    {...getStyleRadioProps(index)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition-colors min-h-[64px] ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    <div className="text-sm font-semibold text-foreground">
                      {opt.label}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {opt.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleSkip}
            className="order-2 min-h-[44px] text-xs text-muted-foreground hover:text-foreground sm:order-1"
          >
            スキップして閉じる
          </button>
          <div className="order-1 flex items-center justify-end gap-2 sm:order-2">
            {step > 1 && (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                aria-label="前のステップへ"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                戻る
              </Button>
            )}
            {step < TOTAL_STEPS && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                aria-label="次のステップへ"
              >
                次へ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            {step === TOTAL_STEPS && (
              <Button variant="primary" size="md" onClick={handleFinish}>
                3問で始める
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
