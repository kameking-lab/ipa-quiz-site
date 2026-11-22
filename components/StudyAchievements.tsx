"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { StudyShareButton } from "./StudyShareButton";
import { MobileInstallNudge } from "@/components/pwa/MobileInstallNudge";
import { trackEvent } from "@/lib/analytics/events";
import { readSession } from "@/lib/motivation/session";
import { CARD_LABELS, cardImagePath, cardQualification, cardSharePath, type StudyCard } from "@/lib/sharing/card";
import { countGoalDay, initializeStudyMilestones, reserveStudyCard, shownStreakToday } from "@/lib/sharing/milestone-storage";
import { achievementKind, completedDailyGoal, qualifiesForReview, rangeProgress } from "@/lib/sharing/milestones";
import { jstDateString } from "@/lib/streak/core";
import { readStreak, recordStudyToday } from "@/lib/streak/storage";
import { readSettings } from "@/lib/storage/settings";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { loadPlanCatalog, paceAttempts } from "@/lib/study-plan/client";
import { orderedPlanQuestions, planOldestYear, type PacePlan, type PlanQuestion } from "@/lib/study-plan/pace";
import { nativeClient } from "@/mobile/shared/contracts";

export type StudyMoment = { exam: string; at: number; streak: number; id?: string; passed?: boolean };
export type PlanStudyScope = { plan: PacePlan; catalog: readonly PlanQuestion[]; ids: string[]; day: string };
export const PlanStudyContext = createContext<PlanStudyScope | null>(null);
const REVIEW_DELAY_MS = 1500;
const MAX_MOMENT_AGE = 5 * 60_000;

export function useAnswerStudyMoment() {
  const [moment, setMoment] = useState<StudyMoment>();
  const recordMoment = useCallback((exam: string, id: string, correct: boolean, at = Date.now()) => {
    if (!readSettings().recordHistory) { setMoment(undefined); return; }
    const { state } = recordStudyToday();
    setMoment(correct ? { exam, id, at, streak: state.currentStreak } : undefined);
  }, []);
  return { moment, recordMoment };
}

export function AnswerStudyShare({ moment, id, path, title }: { moment?: StudyMoment; id: string; path: string; title: string }) {
  const scope = useContext(PlanStudyContext);
  const deferToResults = scope?.ids.at(-1) === id;
  const questionShare = <StudyShareButton key={id} kind="question" path={path} title={title} />;
  return moment?.id === id && !deferToResults
    ? <StudyAchievement key={moment.at} moment={moment} scope={scope} fallback={questionShare} immediateFallback />
    : questionShare;
}

export function PlanCompletionShare({ answered }: { answered: number }) {
  const scope = useContext(PlanStudyContext);
  const [completion] = useState(() => {
    if (!scope || !answered) return null;
    const answers = readSession()?.answers ?? [];
    const last = answers.at(-1);
    if (!last?.correct || last.id !== scope.ids.at(-1)) return null;
    const day = jstDateString(new Date(last.at));
    if (scope.day !== day) return null;
    return {
      moment: { exam: scope.plan.exam, id: last.id, at: last.at, streak: readStreak().currentStreak },
      goal: completedDailyGoal(answers.filter(answer => scope.ids.includes(answer.id)), scope.ids.length, day),
    };
  });
  if (!completion) return null;
  return <StudyAchievement {...completion} scope={scope} fallback={<MobileInstallNudge placement="plan-complete" />} />;
}

export function StudyAchievement({ moment, scope, goal = false, fallback = null, immediateFallback = false }: {
  moment: StudyMoment; scope?: PlanStudyScope | null; goal?: boolean; fallback?: ReactNode; immediateFallback?: boolean;
}) {
  const [result, setResult] = useState<StudyCard | null>();
  const [review, setReview] = useState(false);
  const exam = moment.exam;
  useEffect(() => {
    const today = jstDateString();
    const goalCount = goal && jstDateString(new Date(moment.at)) === today ? countGoalDay(today) : 0;
    if (Date.now() - moment.at > MAX_MOMENT_AGE || jstDateString(new Date(moment.at)) !== today
      || !initializeStudyMilestones(today)) {
      setResult(null);
      return;
    }
    const controller = new AbortController();
    const streak = shownStreakToday(today) ? 0 : moment.streak;
    const plan = scope?.plan ?? listPacePlans().find(plan => plan.exam === exam && (!plan.result || moment.passed));
    if (qualifiesForReview({ passed: !!moment.passed, streak, goalCount }) && nativeClient()) setReview(true);
    const snapshot = async () => {
      if (!plan && !achievementKind({ passed: !!moment.passed, lap: false, streak, goal })) return null;
      const catalog = scope?.catalog ?? await loadPlanCatalog(exam, controller.signal);
      const oldestYear = plan ? planOldestYear(plan, catalog) : null;
      const range = orderedPlanQuestions(catalog, exam).filter(question => oldestYear === null || question.year >= oldestYear);
      const attempts = paceAttempts();
      const answer = moment.id ? [{ id: moment.id, correct: true, at: moment.at }] : [];
      return rangeProgress(range, attempts.concat(answer), moment.at, plan ? moment.id : undefined);
    };
    void snapshot().catch(() => null).then(progress => {
      if (controller.signal.aborted) return;
      const kind = achievementKind({ passed: !!moment.passed, lap: !!progress?.lap, streak, goal });
      if (!kind || (!progress?.total && kind !== "passed") || !cardQualification(exam)
        || !reserveStudyCard(today, kind === "streak" || [3, 7, 14, 30].includes(streak))) {
        setResult(null);
        return;
      }
      setResult({ kind, mastered: progress?.mastered ?? 0, total: progress?.total ?? 0, streak: moment.streak });
    });
    return () => controller.abort();
  }, [exam, goal, moment, scope]);

  useEffect(() => {
    if (!review) return;
    let active = true;
    const timer = window.setTimeout(() => {
      if (document.visibilityState !== "visible" || location.pathname.startsWith("/billing")
        || document.querySelector("#native-settings, [role=dialog][data-state=open]")) return;
      void import("@/mobile/src/study-review").then(async ({ requestStudyReview }) => {
        if (active && await requestStudyReview()) trackEvent({ name: "review_prompt" });
      }).catch(() => {});
    }, REVIEW_DELAY_MS);
    return () => { active = false; window.clearTimeout(timer); };
  }, [review]);

  if (!result) return result === null || immediateFallback ? fallback : null;
  const qualification = cardQualification(exam)!;
  const title = `${qualification.name}｜${CARD_LABELS[result.kind]}`;
  const imagePath = cardImagePath(exam, result);
  return <section data-study-achievement={result.kind} aria-label={CARD_LABELS[result.kind]} className="my-3 mx-auto max-w-sm text-center">
    <Image unoptimized width={1200} height={630} src={imagePath} className="h-auto w-full rounded-xl border border-border"
      alt={`${title}。正解済み ${result.mastered}/${result.total}問、連続学習 ${result.streak}日`} />
    <StudyShareButton kind="card" path={cardSharePath(qualification.path, result)} title={title} imagePath={imagePath} />
  </section>;
}
