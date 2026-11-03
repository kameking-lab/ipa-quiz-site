import type { RawField, RawQuestion } from "./types";
import q04Acceptance from "@/data/qualification-staging/kisho-65-66-private/q04-overlay-accepted.json";

/** No practical-field correction is currently authorized. Q04 academic overlay follows below. */
export const KISHO_PRIVATE_FIELD_HOLDS: readonly { questionId: string; field: string; expectedOfficialAnswer: string; reason: string }[] = [];

export function correctedField(field: RawField): RawField {
  const hold = KISHO_PRIVATE_FIELD_HOLDS.find((item) => item.questionId === field.questionId && item.field === field.field);
  if (hold && field.officialAnswer !== hold.expectedOfficialAnswer) {
    throw new Error(`Kisho overlay source changed: ${field.questionId}/${field.field}`);
  }
  return field;
}

export function correctedQuestion(question: RawQuestion): RawQuestion {
  if (question.id !== "kisho-65-senmon-q04") return question;
  const expectedFields = ["explanation", "choiceExplanations.ア", "choiceExplanations.イ", "choiceExplanations.ウ", "choiceExplanations.エ", "choiceExplanations.オ"];
  if (q04Acceptance.questionId !== question.id || q04Acceptance.decision !== "ACCEPT_EXACT_SIX_FIELD_OVERLAY_FOR_PRIVATE_READER"
    || q04Acceptance.publicGo !== false || q04Acceptance.approvedEdits.length !== 6
    || q04Acceptance.approvedEdits.some((edit, index) => edit.field !== expectedFields[index])) {
    throw new Error("Kisho academic overlay approval changed");
  }
  const choiceExplanations = { ...question.choiceExplanations };
  let explanation = question.explanation;
  for (const edit of q04Acceptance.approvedEdits) {
    if (edit.field === "explanation") {
      if (explanation !== edit.oldExact) throw new Error("Kisho academic explanation source changed");
      explanation = edit.newExact;
    } else {
      const symbol = edit.field.slice("choiceExplanations.".length);
      if (choiceExplanations[symbol] !== edit.oldExact) throw new Error(`Kisho academic choice source changed: ${symbol}`);
      choiceExplanations[symbol] = edit.newExact;
    }
  }
  return Object.freeze({ ...question, explanation, choiceExplanations: Object.freeze(choiceExplanations) });
}
