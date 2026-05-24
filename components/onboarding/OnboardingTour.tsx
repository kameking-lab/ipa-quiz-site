"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import {
  ATTRIBUTE_OPTIONS,
  QUICKSTART_EXAMS,
  markFirstVisit,
  markTourCompleted,
  markTourDismissed,
  readOnboardingState,
  setAttribute,
  setSelectedExam,
  shouldShowTour,
} from "@/lib/onboarding";
import type { UserAttribute } from "@/lib/onboarding";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Bot,
  ListChecks,
  Target,
} from "lucide-react";

const TOTAL_STEPS = 4;

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  blurb: string;
  href: string;
}

const FEATURES: Feature[] = [
  {
    icon: Bot,
    title: "AIコパイロット常駐",
    blurb: "選択肢ごとに『なぜ違うか』まで解説。分からなければ無制限で質問できる。",
    href: "/features",
  },
  {
    icon: ListChecks,
    title: "模試モード",
    blurb: "本番と同じ問題数・時間配分で実戦演習。結果は分野別に自動分析。",
    href: "/mock-exam",
  },
  {
    icon: Target,
    title: "学習プラン自動生成",
    blurb: "試験日から逆算して1日の目標を提示。LocalStorage 完結で登録不要。",
    href: "/study-plan",
  },
];

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
    // Read once at mount. The state is permanent in LocalStorage, so the
    // modal can only appear during this single mount on the very first visit
    // (or until the user completes / dismisses it). Opening synchronously
    // here means the dialog is committed before the user has a chance to
    // start scrolling, instead of popping up mid-scroll after a delay.
    const state = readOnboardingState();
    if (shouldShowTour(state)) {
      markFirstVisit();
      setOpen(true);
    }
  }, []);

  const handleSkip = React.useCallback(() => {
    markTourDismissed();
    setOpen(false);
  }, []);

  const handleClose = React.useCallback(() => {
    // Treat closing without finishing as dismissal so we don't re-prompt.
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
    router.push(`/quickstart/${exam}`);
  };

  const canAdvance =
    step === 1 ? true :
    step === 2 ? true :
    step === 3 ? true : // 試験区分は任意。後から /settings で変更可。
    step === 4 ? attribute !== null :
    false;

  const examsToShow: ExamCode[] = showAllExams
    ? (Object.keys(EXAM_LABELS) as ExamCode[])
    : POPULAR_EXAMS;

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
        aria-label="過去問AIの初回ガイド"
      >
        {/* Prominent top-right skip — visible from step 1 so users who came */}
        {/* in for the problem can opt out of the 4-step tour immediately. */}
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-12 top-3 z-10 inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="ガイドをスキップして始める"
        >
          スキップ →
        </button>
        {/* Progress indicator */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i + 1 <= step
                  ? "bg-primary"
                  : "bg-zinc-200 dark:bg-zinc-800"
              }`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          ステップ {step} / {TOTAL_STEPS}
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="success">教育貢献プロジェクト</Badge>
              <Badge variant="outline">無料・登録不要</Badge>
            </div>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              過去問AIへようこそ
            </DialogTitle>
            <DialogDescription>
              IPA 情報処理技術者試験 全13区分の過去問を、AI 解説付きで誰でも無料で学べるサイトです。
              ログイン不要・広告控えめ・履歴はあなたのブラウザだけに保存します。
            </DialogDescription>
            <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              IPA 公式 PDF を一次情報として参照し、各問題の出典 URL を必ず保持しています。
              本サービスは IPA 非公式の学習支援プロジェクトです。
            </div>
            <p className="text-xs text-muted-foreground">
              所要時間: 約 1 分（途中スキップ可）
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <DialogTitle className="text-xl">過去問AIの 3 つの軸</DialogTitle>
            <DialogDescription>
              競合と最も違うのはこの 3 点です。
            </DialogDescription>
            <ul className="space-y-2.5">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <li
                    key={f.title}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">
                        {f.title}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {f.blurb}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
              目標の試験区分を選ぶ
            </DialogTitle>
            <DialogDescription>
              受験予定の試験を選んでください。途中で変更できます。
            </DialogDescription>
            <div
              role="radiogroup"
              aria-label="試験区分"
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {examsToShow.map((code) => {
                const diff = EXAM_DIFFICULTY[code] ?? { level: 3, label: "中級" };
                const isSelected = selectedExam === code;
                const isQuickstart = QUICKSTART_EXAMS.includes(code);
                return (
                  <button
                    key={code}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectExam(code)}
                    className={`relative rounded-xl border px-3 py-2.5 text-left transition-colors min-h-[64px] ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    {isQuickstart && (
                      <span className="absolute right-2 top-2 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                        3分体験あり
                      </span>
                    )}
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
            {!selectedExam && (
              <p
                aria-live="polite"
                className="text-xs text-muted-foreground"
              >
                試験区分は任意です。あとから <strong className="text-foreground">/settings</strong> で変更できます。
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  className="ml-1 underline underline-offset-2 hover:text-foreground"
                >
                  あとで設定する →
                </button>
              </p>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <DialogTitle className="text-xl">学習スタイルを教えてください</DialogTitle>
            <DialogDescription>
              あなたに合った導線をご案内します。後からいつでも変更できます。
            </DialogDescription>
            <div role="radiogroup" aria-label="学習スタイル" className="space-y-2">
              {ATTRIBUTE_OPTIONS.map((opt) => {
                const isSelected = attribute === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectAttribute(opt.value)}
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
              <span
                className={
                  canAdvance
                    ? undefined
                    : "inline-flex cursor-not-allowed rounded-xl ring-1 ring-dashed ring-border"
                }
                title={
                  canAdvance
                    ? undefined
                    : step === 3
                      ? "受験予定の試験区分を選んでください"
                      : "選択肢から1つお選びください"
                }
              >
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                  disabled={!canAdvance}
                  aria-label={
                    canAdvance
                      ? "次のステップへ"
                      : step === 3
                        ? "次のステップへ進むには試験区分を選択してください"
                        : "次のステップへ進むには選択肢を選んでください"
                  }
                >
                  次へ
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </span>
            )}
            {step === TOTAL_STEPS && (
              <Button
                variant="primary"
                size="md"
                onClick={handleFinish}
                disabled={!attribute}
              >
                3分体験を始める
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {step === TOTAL_STEPS && attribute && selectedExam && (
          <p className="text-center text-[11px] text-muted-foreground">
            <Link
              href={`/quickstart/${selectedExam}`}
              className="underline decoration-border hover:text-foreground"
            >
              スタートページを先に見る
            </Link>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
