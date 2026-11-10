import type { SrsCard } from "@/lib/learning/spaced-repetition";
import type { PetProfile, PetProfileDocument } from "./profile";
import { PET_STAGE_GOALS, petGrowthProgress } from "./growth";
import { PET_REVIEW_INTERVAL_MS, petLearningDay } from "./learning";

/** Advice from saved facts and the current SRS schedule; never grants progress. */
export function petNextAction(profile: PetProfile, doc: PetProfileDocument, now: number, cards: readonly SrsCard[] = []) {
  const progress = petGrowthProgress(profile), exam = encodeURIComponent(profile.qualificationId);
  const learn = `/quiz?mode=unanswered&exam=${exam}`;
  if (!profile.unlockedStages.includes("partner")) return { label: `相棒まで あと${Math.max(0, PET_STAGE_GOALS.partner.questions - progress.uniqueQuestions)}問`, action: "新しい問題を解く", href: learn };
  if (profile.unlockedStages.includes("expert")) return { label: "今日も、いっしょに1問。", action: "学習を続ける", href: learn };
  const goal = PET_STAGE_GOALS.expert;
  if (progress.uniqueQuestions < goal.questions) return { label: `専門家へ あと${goal.questions - progress.uniqueQuestions}問`, action: "新しい問題を解く", href: learn };
  if (progress.delayedAnswers < goal.spaced) {
    const candidates = profile.questions.filter(q => q.lastRewardedAt !== null).map(q => {
      const card = cards.find(card => card.id === q.questionId);
      const revealedAt = Math.max(0, ...doc.events.filter(event => event.qualificationId === profile.qualificationId && event.canonicalQuestionId === q.questionId && event.attemptKind === "revealed").map(event => event.occurredAt));
      // Match the existing 24h interval and SRS due-date requirements, including answer reveals.
      const availableAt = Math.max(q.lastRewardedAt! + PET_REVIEW_INTERVAL_MS,
        (q.independentCorrectAts.at(-1) ?? 0) + PET_REVIEW_INTERVAL_MS,
        revealedAt ? revealedAt + PET_REVIEW_INTERVAL_MS : 0,
        card ? Math.max(card.dueAt, card.lastReviewedAt + PET_REVIEW_INTERVAL_MS) : 0);
      return { id: q.questionId, availableAt };
    }).sort((a, b) => a.availableAt - b.availableAt);
    const candidate = candidates[0];
    if (candidate && candidate.availableAt <= now) return { label: `専門家へ 日をあけて自力で正解 ${progress.delayedAnswers}/${goal.spaced}回`, action: "この1問を復習する", href: `/quiz?mode=random&source=search&exam=${exam}&ids=${encodeURIComponent(candidate.id)}&question=${encodeURIComponent(candidate.id)}` };
    if (candidate) {
      const when = new Intl.DateTimeFormat("ja-JP", { timeZone: doc.timeZone, month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(candidate.availableAt);
      return { label: `復習は${when}から。答えを見ずに挑戦しよう。`, action: "新しい問題を解く", href: learn };
    }
  }
  const today = petLearningDay(now, doc.timeZone);
  return { label: profile.learningDays.includes(today) ? `今日は学習済み。明日また1問（${progress.learningDays}/${goal.days}日）` : `専門家へ 今日も1問（${progress.learningDays}/${goal.days}日）`, action: "新しい問題を解く", href: learn };
}
