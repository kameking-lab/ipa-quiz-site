import { newPetProfile, petLearningFactSchema, petProfileDocumentSchema, petLearningDaySchema, petQuestionSchema } from "./profile";
import type { PetLearningFact, PetProfileDocument } from "./profile";
import { advancePetGrowth } from "./growth";
import { advancePetRoomDay } from "./room";

export interface PetLearningResult {
  outcome: "applied" | "duplicate" | "event_conflict" | "invalid_event" | "owner_mismatch";
  document: PetProfileDocument;
  reward: { growth: number; bond: number };
  reaction: "correct" | "incorrect" | "read" | null;
  comboMilestone: 3 | 5 | null;
  overcame: boolean;
}
export const PET_REVIEW_INTERVAL_MS = 86_400_000;
export function petReviewCycleId(before: { lastReviewedAt: number; dueAt: number }): string {
  return JSON.stringify([before.lastReviewedAt, before.dueAt]);
}
/** A saved study timezone, never the device's current timezone or a UTC slice. */
export function petLearningDay(occurredAt: number, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA-u-ca-gregory-nu-latn", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(occurredAt);
  const part = (type: string) => parts.find(value => value.type === type)!.value;
  return petLearningDaySchema.parse(`${part("year").padStart(4, "0")}-${part("month")}-${part("day")}`);
}
/** P03/P04 pure learning policy, including pre-answer SRS snapshots.
 * Explicit facts only: no display/load/history replay calls this function. */
export function applyPetLearningFact(document: PetProfileDocument, input: unknown): PetLearningResult {
  const unchanged = (outcome: PetLearningResult["outcome"]): PetLearningResult => ({
    outcome, document, reward: { growth: 0, bond: 0 }, reaction: null, comboMilestone: null, overcame: false,
  });
  const parsed = petLearningFactSchema.safeParse(input);
  if (!parsed.success) return unchanged("invalid_event");
  const event = parsed.data;
  if (event.ownerScope !== document.ownerScope) return unchanged("owner_mismatch");
  let day: string;
  // UTC year 9999 can already be local year 10000. Validate every fact,
  // including reveals, before it reaches the durable ledger.
  try { day = petLearningDay(event.occurredAt, document.timeZone); }
  catch { return unchanged("invalid_event"); }
  const existing = document.events.find(previous => previous.eventId === event.eventId);
  if (existing) return unchanged(JSON.stringify(existing) === JSON.stringify(event) ? "duplicate" : "event_conflict");
  const next = petProfileDocumentSchema.parse(document);
  let profile = next.profiles.find(item => item.qualificationId === event.qualificationId);
  if (!profile) { profile = newPetProfile(next.ownerScope, event.qualificationId); next.profiles.push(profile); }
  const revealedInSession = next.events.some(previous => previous.qualificationId === event.qualificationId &&
    previous.canonicalQuestionId === event.canonicalQuestionId && previous.sessionId === event.sessionId && previous.attemptKind === "revealed");
  const recentlyRevealed = next.events.some(previous => previous.qualificationId === event.qualificationId &&
    previous.canonicalQuestionId === event.canonicalQuestionId && previous.attemptKind === "revealed" &&
    event.occurredAt >= previous.occurredAt && event.occurredAt - previous.occurredAt < PET_REVIEW_INTERVAL_MS);
  const reward = { growth: 0, bond: 0 };
  let comboMilestone: 3 | 5 | null = null;
  let overcame = false;
  const reading = event.attemptKind === "revealed" || revealedInSession || recentlyRevealed;
  const reaction = reading ? "read" : event.grade as "correct" | "incorrect";
  if (reading) profile.combo = null;
  if (event.attemptKind === "answer" && !reading) {
    let question = profile.questions.find(item => item.questionId === event.canonicalQuestionId);
    if (!question) {
      question = petQuestionSchema.parse({ questionId: event.canonicalQuestionId, legacy: false, firstRewarded: false });
      profile.questions.push(question);
    }
    const previousRewardAt = question.lastRewardedAt;
    const separated = previousRewardAt !== null && event.occurredAt - previousRewardAt >= PET_REVIEW_INTERVAL_MS;
    const before = event.reviewBefore;
    const due = before !== null && before.lastReviewedAt > 0 && before.dueAt <= event.occurredAt &&
      event.occurredAt - before.lastReviewedAt >= PET_REVIEW_INTERVAL_MS &&
      (previousRewardAt === null || before.lastReviewedAt >= previousRewardAt);
    const spentCycle = event.reviewCycleId !== null && question.rewardedReviewCycles.includes(event.reviewCycleId);
    // A stale or replayed SRS snapshot cannot bypass the local reward interval.
    const effective = !spentCycle && (!question.firstRewarded ||
      (before !== null ? due && (previousRewardAt === null || separated) : separated));
    if (event.grade === "incorrect") {
      question.lastIncorrectAt = Math.max(question.lastIncorrectAt ?? 0, event.occurredAt);
      profile.combo = null;
    }
    // Semantic dedupe is question-based, not event/session/content-version based.
    // Known legacy answers already have firstRewarded=true and cannot farm anew.
    if (effective) {
      reward.growth = (event.grade === "correct" ? 3 : 2) + (due ? 2 : 0);
      question.firstRewarded = true;
      question.lastRewardedAt = event.occurredAt;
      if (due && event.reviewCycleId !== null) question.rewardedReviewCycles.push(event.reviewCycleId);
      if (!profile.learningDays.includes(day)) { profile.learningDays.push(day); reward.bond = 1; }
      profile.growth += reward.growth; profile.bond += reward.bond;
      profile.recentAnswers = profile.recentAnswers.filter(answer => answer.questionId !== question!.questionId);
      profile.recentAnswers.push({ questionId: question.questionId, correct: event.grade === "correct" });
      profile.recentAnswers = profile.recentAnswers.slice(-20);
      if (event.grade === "correct") {
        question.independentlyCorrect = true;
        // A missing category in old facts remains unknown; never infer from IDs.
        if (event.fieldId !== null) question.fieldId = event.fieldId;
      }
      if (!profile.care.meals.some(meal => meal.rewardId === day)) {
        // Forgotten treats are enjoyed automatically on the next learning day.
        for (const meal of profile.care.meals) if (meal.consumedAt === null && meal.rewardId < day)
          meal.consumedAt = Math.max(event.occurredAt, meal.earnedAt);
        profile.care.meals.push({ rewardId: day, earnedAt: event.occurredAt,
          consumedAt: profile.care.autoFeed ? event.occurredAt : null });
      }
      if (event.grade === "correct") {
        if (separated || due) {
          const lastCorrect = question.independentCorrectAts.at(-1);
          if (lastCorrect === undefined || event.occurredAt - lastCorrect >= PET_REVIEW_INTERVAL_MS)
            question.independentCorrectAts.push(event.occurredAt);
          const afterError = question.lastIncorrectAt === null ? [] : question.independentCorrectAts
            .filter(time => time - question.lastIncorrectAt! >= PET_REVIEW_INTERVAL_MS);
          if (question.overcomeAt === null && afterError.length >= 2) {
            question.overcomeAt = event.occurredAt; overcame = true;
            profile.memories.push({ kind: "overcome", questionId: question.questionId, occurredAt: event.occurredAt });
          }
        }
        if (!profile.combo || profile.combo.sessionId !== event.sessionId)
          profile.combo = { sessionId: event.sessionId, questionIds: [] };
        if (!profile.combo.questionIds.includes(question.questionId)) {
          profile.combo.questionIds.push(question.questionId);
          const length = profile.combo.questionIds.length;
          if (length === 3 || length === 5) comboMilestone = length;
        }
      }
      advancePetGrowth(profile, event.occurredAt);
      if (reward.bond > 0) advancePetRoomDay(profile, day, event.occurredAt);
    }
  }
  next.events.push(event);
  next.events = prunePetEvents(next.events, event.occurredAt);
  return { outcome: "applied", document: petProfileDocumentSchema.parse(next), reward, reaction, comboMilestone, overcame };
}

/** Raw facts only guard retries and the 24h "read the answer" window. Semantic
 * reward dedupe lives on each question, so the ledger stays bounded instead of
 * growing (and being reparsed) on every answer for the lifetime of the pet. */
export const PET_EVENT_LEDGER_LIMIT = 200;
function prunePetEvents(events: PetProfileDocument["events"], now: number): PetProfileDocument["events"] {
  if (events.length <= PET_EVENT_LEDGER_LIMIT) return events;
  const recent = new Set(events.slice(-PET_EVENT_LEDGER_LIMIT));
  return events.filter(event => recent.has(event) ||
    (event.attemptKind === "revealed" && now - event.occurredAt < PET_REVIEW_INTERVAL_MS));
}

/** A stable identity within the local document; it includes the active exam,
 * so a shared question benefits only the child studying that qualification. */
export function petFactQuestionKey(event: Pick<PetLearningFact, "qualificationId" | "canonicalQuestionId">) {
  return JSON.stringify([event.qualificationId, event.canonicalQuestionId]);
}
