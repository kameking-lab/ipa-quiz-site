"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, GraduationCap, Sparkles, BookOpen, Hourglass } from "lucide-react";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import {
  LEVEL_DESCRIPTIONS,
  LEVEL_LABELS,
  REQUIRED_HOURS,
} from "@/lib/study-plan/constants";
import { generateStudyPlan, todayLocalDate } from "@/lib/study-plan/generator";
import { savePlan } from "@/lib/study-plan/storage";
import type { KnowledgeLevel, StudyPlanInput } from "@/lib/study-plan/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ALL_EXAMS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

const LEVELS: KnowledgeLevel[] = [
  "beginner",
  "foundation",
  "learner",
  "final-review",
];

const LEVEL_ICONS: Record<KnowledgeLevel, React.ComponentType<{ className?: string }>> = {
  beginner: BookOpen,
  foundation: GraduationCap,
  learner: Sparkles,
  "final-review": Hourglass,
};

/**
 * The wizard recommends 'foundation' as the default level when entering step 3
 * for the first time, so the level card carries an おすすめ chip.
 */
const RECOMMENDED_LEVEL: KnowledgeLevel = "foundation";

const TOTAL_STEPS = 4;
const STEP_TITLES = [
  "受験予定の試験区分",
  "試験日",
  "現在の知識レベル",
  "1日の学習可能時間",
] as const;

function defaultExamDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().slice(0, 10);
}

function collectCategories(exam: ExamCode): string[] {
  const cfg = EXAM_CONFIGS[exam];
  const set = new Set<string>();
  for (const s of cfg.sessions) for (const c of s.categories) set.add(c);
  if (cfg.cbtSessions) {
    for (const s of cfg.cbtSessions) for (const c of s.categories) set.add(c);
  }
  return Array.from(set);
}

export function SchedulePlanner() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [exam, setExam] = React.useState<ExamCode>("ap");
  const [examDate, setExamDate] = React.useState<string>(defaultExamDate());
  const [level, setLevel] = React.useState<KnowledgeLevel>("foundation");
  const [weekdayMinutes, setWeekdayMinutes] = React.useState<number>(60);
  const [weekendMinutes, setWeekendMinutes] = React.useState<number>(180);
  const [weak, setWeak] = React.useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = React.useState(false);

  const categories = React.useMemo(() => collectCategories(exam), [exam]);

  React.useEffect(() => {
    setWeak(new Set());
  }, [exam]);

  const toggleWeak = (c: string) => {
    setWeak((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const today = todayLocalDate();
  const examDateInvalid = examDate <= today;

  const canAdvance =
    step === 1 ? Boolean(exam) :
    step === 2 ? !examDateInvalid :
    step === 3 ? Boolean(level) :
    step === 4 ? !examDateInvalid : false;

  const handleGenerate = () => {
    if (examDateInvalid || submitting) return;
    setSubmitting(true);
    const input: StudyPlanInput = {
      exam,
      examDate,
      level,
      weekdayMinutes,
      weekendMinutes,
      weakCategories: Array.from(weak),
    };
    const plan = generateStudyPlan(input);
    savePlan(plan);
    router.push(`/study-plan/result/${plan.id}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < TOTAL_STEPS) {
      if (canAdvance) setStep((s) => Math.min(TOTAL_STEPS, s + 1));
      return;
    }
    handleGenerate();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <StepProgress step={step} total={TOTAL_STEPS} title={STEP_TITLES[step - 1]} />

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>受験予定の試験区分</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ALL_EXAMS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setExam(code)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                    exam === code
                      ? "border-primary bg-primary-soft text-primary-soft-foreground"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                  aria-pressed={exam === code}
                >
                  <div className="text-xs font-mono uppercase text-muted-foreground">
                    {code}
                  </div>
                  <div className="font-medium leading-tight">{examLabel(code)}</div>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              目安学習時間: 約 {REQUIRED_HOURS[exam]} 時間（完全初心者の場合）
            </p>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>試験日</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="date"
              value={examDate}
              min={today}
              onChange={(e) => setExamDate(e.target.value)}
              aria-label="試験日"
              aria-required="true"
              aria-invalid={examDateInvalid || undefined}
              aria-describedby={examDateInvalid ? "exam-date-error" : undefined}
              className="h-12 w-full max-w-xs rounded-xl border border-border bg-background px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
            {examDateInvalid && (
              <p id="exam-date-error" role="alert" className="mt-2 text-xs text-destructive">
                試験日は明日以降を指定してください。
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>現在の知識レベル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {LEVELS.map((lv) => {
                const Icon = LEVEL_ICONS[lv];
                const isRecommended = lv === RECOMMENDED_LEVEL;
                const active = level === lv;
                return (
                  <button
                    key={lv}
                    type="button"
                    onClick={() => setLevel(lv)}
                    className={`relative flex items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-primary bg-primary-soft text-primary-soft-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                    aria-pressed={active}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium">{LEVEL_LABELS[lv]}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {LEVEL_DESCRIPTIONS[lv]}
                      </span>
                    </span>
                    {isRecommended && (
                      <span className="absolute right-2 top-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                        おすすめ
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>1日の学習可能時間</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="block">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-sm font-medium">平日</span>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {weekdayMinutes} 分
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={300}
                  step={15}
                  value={weekdayMinutes}
                  onChange={(e) => setWeekdayMinutes(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="平日の学習時間（分）"
                />
              </label>
              <label className="block">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-sm font-medium">休日</span>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {weekendMinutes} 分
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={600}
                  step={15}
                  value={weekendMinutes}
                  onChange={(e) => setWeekendMinutes(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="休日の学習時間（分）"
                />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>苦手分野（任意）</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-muted-foreground">
                選択した分野は中盤フェーズで重点的に演習します。
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = weak.has(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleWeak(c)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                      aria-pressed={active}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="sticky bottom-4 z-10 flex flex-col gap-2 sm:flex-row-reverse sm:items-center sm:justify-between">
        {step < TOTAL_STEPS ? (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            disabled={!canAdvance}
            className="w-full sm:w-auto sm:min-w-[200px]"
          >
            次へ
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            size="xl"
            disabled={examDateInvalid || submitting}
            className="w-full sm:w-auto sm:min-w-[240px]"
          >
            {submitting ? "生成中..." : "学習スケジュールを生成"}
          </Button>
        )}
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="w-full sm:w-auto sm:min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            前に戻る
          </Button>
        )}
      </div>
    </form>
  );
}

function StepProgress({
  step,
  total,
  title,
}: {
  step: number;
  total: number;
  title: string;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        ステップ {step} / {total}
        <span className="ml-2 text-foreground">{title}</span>
      </p>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i + 1 <= step ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
