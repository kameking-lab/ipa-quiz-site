import { describe, expect, it } from "vitest";
import { applyPetLearningFact, petReviewCycleId, PET_REVIEW_INTERVAL_MS as DAY } from "@/lib/pet/v1/learning";
import { emptyPetProfiles, petProfileDocumentSchema } from "@/lib/pet/v1/profile";
import type { PetLearningFact, PetProfileDocument } from "@/lib/pet/v1/profile";
import { migrateLegacyPetProfiles } from "@/lib/pet/v1/migration";

const at = Date.parse("2026-11-05T12:00:00+09:00");
const fresh = () => emptyPetProfiles("guest", "Asia/Tokyo");
function fact(patch: Partial<PetLearningFact> = {}): PetLearningFact {
  return { eventId: "initial", ownerScope: "guest", qualificationId: "ap", canonicalQuestionId: "q1",
    contentVersion: "v1", sessionId: "session-1", attemptKind: "answer", grade: "correct",
    reviewCycleId: null, reviewBefore: null, fieldId: null, occurredAt: at, policyVersion: 1, ...patch };
}
function review(patch: Partial<PetLearningFact> = {}, lastReviewedAt = at, dueAt = at + DAY): PetLearningFact {
  const before = { lastReviewedAt, dueAt };
  return fact({ eventId: "review-1", sessionId: "session-2", occurredAt: at + DAY,
    reviewBefore: before, reviewCycleId: petReviewCycleId(before), ...patch });
}
function first(grade: "correct" | "incorrect" = "correct") { return applyPetLearningFact(fresh(), fact({ grade })).document; }

describe("P04 pre-answer SRS and useful spacing", () => {
  it("grants due review base +2 bonus from the captured prior schedule, not the updated one", () => {
    const result = applyPetLearningFact(first(), review());
    expect(result.reward).toEqual({ growth: 5, bond: 1 });
    expect(result.document.profiles[0].questions[0].rewardedReviewCycles).toEqual([petReviewCycleId({ lastReviewedAt: at, dueAt: at + DAY })]);
    const updatedAfterAnswer = review({}, at + DAY, at + 7 * DAY);
    expect(applyPetLearningFact(first(), updatedAfterAnswer).reward.growth).toBe(0);
  });
  it("separates event retransmission from a genuinely new due review cycle", () => {
    const input = review(), firstReview = applyPetLearningFact(first(), input);
    expect(applyPetLearningFact(firstReview.document, input).outcome).toBe("duplicate");
    expect(applyPetLearningFact(firstReview.document, { ...input, eventId: "other-device", occurredAt: at + 2 * DAY }).reward.growth).toBe(0);
    const secondCycle = review({ eventId: "review-2", sessionId: "session-3", occurredAt: at + 2 * DAY }, at + DAY, at + 2 * DAY);
    expect(applyPetLearningFact(firstReview.document, secondCycle).reward.growth).toBe(5);
  });
  it("does not reward same-day loops, pre-deadline practice, stale snapshots or forged cycle IDs", () => {
    const doc = first();
    for (const elapsed of [0, DAY - 1]) {
      expect(applyPetLearningFact(doc, fact({ eventId: `loop-${elapsed}`, occurredAt: at + elapsed })).reward.growth).toBe(0);
      expect(applyPetLearningFact(doc, review({ eventId: `early-${elapsed}`, occurredAt: at + elapsed })).reward.growth).toBe(0);
    }
    expect(applyPetLearningFact(doc, review({}, at, at + 6 * DAY)).reward.growth).toBe(0);
    const after = applyPetLearningFact(doc, review()).document;
    const stale = review({ eventId: "stale", occurredAt: at + 3 * DAY }, at - DAY, at);
    expect(applyPetLearningFact(after, stale).reward.growth).toBe(0);
    expect(applyPetLearningFact(doc, review({ reviewCycleId: "invented" })).outcome).toBe("invalid_event");
  });
  it("uses 24h as a conservative fallback when no SRS evidence exists", () => {
    expect(applyPetLearningFact(first(), fact({ eventId: "later", occurredAt: at + DAY, sessionId: "session-2" })).reward.growth).toBe(3);
    const raw = JSON.stringify({ version: 1, ownership: "device-guest", answers: [JSON.stringify(["ap", "q1"])], food: 1, meals: 0, outfit: "none" });
    const legacy = migrateLegacyPetProfiles(fresh(), raw, at);
    expect(applyPetLearningFact(legacy, fact({ eventId: "unknown-time", occurredAt: at + 2 * DAY })).reward.growth).toBe(0);
    expect(applyPetLearningFact(legacy, review()).reward.growth).toBe(5);
  });
  it("does not treat an unreviewed default SRS card as due evidence", () => {
    expect(applyPetLearningFact(first(), review({}, 0, at)).reward.growth).toBe(0);
  });
  it("retains cycle dedupe after serialization/reload and original event replay", () => {
    const result = applyPetLearningFact(first(), review());
    const loaded = petProfileDocumentSchema.parse(JSON.parse(JSON.stringify(result.document)));
    expect(applyPetLearningFact(loaded, review()).outcome).toBe("duplicate");
    expect(applyPetLearningFact(loaded, review({ eventId: "new-id", occurredAt: at + 5 * DAY })).reward.growth).toBe(0);
  });
});

describe("P04 overcoming without incentivizing intentional errors", () => {
  it("requires two independent correct answers, each separated by 24h, after the error", () => {
    let doc = first("incorrect");
    const early = applyPetLearningFact(doc, fact({ eventId: "early-correct", occurredAt: at + DAY - 1, sessionId: "s2" }));
    expect(early.overcame).toBe(false); expect(early.reward.growth).toBe(0); doc = early.document;
    const dayOne = applyPetLearningFact(doc, review());
    expect(dayOne.overcame).toBe(false); expect(dayOne.document.profiles[0].memories).toEqual([]);
    const repeat = applyPetLearningFact(dayOne.document, fact({ eventId: "same-day-correct", occurredAt: at + DAY + 1000, sessionId: "s3" }));
    expect(repeat.overcame).toBe(false); expect(repeat.reward.growth).toBe(0);
    const dayTwo = applyPetLearningFact(repeat.document, review({ eventId: "day-two", occurredAt: at + 2 * DAY, sessionId: "s4" }, at + DAY, at + 2 * DAY));
    expect(dayTwo.overcame).toBe(true); expect(dayTwo.reward.growth).toBe(5);
    expect(dayTwo.document.profiles[0].memories).toEqual([{ kind: "overcome", questionId: "q1", occurredAt: at + 2 * DAY }]);
  });
  it("never reissues an overcoming memory after another deliberate error", () => {
    let doc = first("incorrect");
    for (let day = 1; day <= 6; day++) {
      const result = applyPetLearningFact(doc, review({ eventId: `day-${day}`, sessionId: `s-${day}`, occurredAt: at + day * DAY,
        grade: day === 3 ? "incorrect" : "correct" }, at + (day - 1) * DAY, at + day * DAY));
      if (day !== 2) expect(result.overcame).toBe(false);
      expect(result.reward.growth).toBe(day === 3 ? 4 : 5); doc = result.document;
    }
    expect(doc.profiles[0].memories.filter(memory => memory.kind === "overcome")).toHaveLength(1);
  });
  it("makes intentional wrong answers yield no more growth than all-correct study", () => {
    function run(wrong: boolean) {
      let doc = first(wrong ? "incorrect" : "correct");
      for (let day = 1; day <= 3; day++) doc = applyPetLearningFact(doc, review({ eventId: `d${day}`, occurredAt: at + day * DAY,
        sessionId: `s${day}`, grade: wrong && day === 1 ? "incorrect" : "correct" }, at + (day - 1) * DAY, at + day * DAY)).document;
      return doc.profiles[0];
    }
    const intentional = run(true), correct = run(false);
    expect(intentional.growth).toBeLessThan(correct.growth); expect(correct.memories.filter(memory => memory.kind === "overcome")).toEqual([]);
  });
  it("blocks revealing then opening a new session until 24h; never treats it as self-correct", () => {
    const reveal = fact({ eventId: "reveal", attemptKind: "revealed", grade: "ungraded", occurredAt: at + DAY - 1000 });
    let doc = applyPetLearningFact(first("incorrect"), reveal).document;
    const blocked = applyPetLearningFact(doc, review());
    expect(blocked.reward.growth).toBe(0); expect(blocked.reaction).toBe("read");
    expect(blocked.document.profiles[0].questions[0].independentCorrectAts).toEqual([]); doc = blocked.document;
    const later = applyPetLearningFact(doc, review({ eventId: "genuine", sessionId: "s3", occurredAt: at + 2 * DAY }));
    expect(later.reward.growth).toBe(5); expect(later.overcame).toBe(false);
  });
});

describe("P04 distinct-question combos", () => {
  it("announces only 3 and 5, without a growth multiplier or duplicate-question increment", () => {
    let doc: PetProfileDocument = fresh();
    for (let i = 1; i <= 6; i++) {
      const result = applyPetLearningFact(doc, fact({ eventId: `q${i}`, canonicalQuestionId: `q${i}` }));
      expect(result.comboMilestone).toBe(i === 3 || i === 5 ? i : null);
      expect(result.reward.growth).toBe(3); doc = result.document;
      const duplicate = applyPetLearningFact(doc, fact({ eventId: `retry-q${i}`, canonicalQuestionId: `q${i}` }));
      expect(duplicate.comboMilestone).toBeNull(); expect(duplicate.document.profiles[0].combo?.questionIds).toHaveLength(i);
      doc = duplicate.document;
    }
    expect(doc.profiles[0].growth).toBe(18);
  });
  it("resets on incorrect/revealed answers and keeps qualifications/sessions separate", () => {
    let doc = fresh();
    for (let i = 1; i <= 2; i++) doc = applyPetLearningFact(doc, fact({ eventId: `q${i}`, canonicalQuestionId: `q${i}` })).document;
    const wrong = applyPetLearningFact(doc, fact({ eventId: "wrong", canonicalQuestionId: "q3", grade: "incorrect" }));
    expect(wrong.document.profiles[0].combo).toBeNull();
    const read = applyPetLearningFact(doc, fact({ eventId: "read", canonicalQuestionId: "q3", attemptKind: "revealed", grade: "ungraded" }));
    expect(read.document.profiles[0].combo).toBeNull();
    const other = applyPetLearningFact(doc, fact({ eventId: "other", qualificationId: "takken", canonicalQuestionId: "q3" }));
    expect(other.comboMilestone).toBeNull(); expect(other.document.profiles[0].combo?.questionIds).toHaveLength(2);
    const session = applyPetLearningFact(doc, fact({ eventId: "session", canonicalQuestionId: "q3", sessionId: "session-2" }));
    expect(session.comboMilestone).toBeNull(); expect(session.document.profiles[0].combo?.questionIds).toEqual(["q3"]);
  });
});
