/** Canonical identity also blocks stale/imported answers that predate referenceOnly. */
export const SURVEY_ASSISTANT_REFERENCE_ID = "private-gsi-survey-assistant-20261021-2026-q12";
export const PE_FIRST_REFERENCE_ID = "gijutsushi1-information-2025-annual-senmon-q25";

export function isSurveyAssistantReferenceId(id: string): boolean {
  return id === SURVEY_ASSISTANT_REFERENCE_ID || id === PE_FIRST_REFERENCE_ID;
}

export function isExamReferenceOnly(question: { id: string; referenceOnly?: boolean }): boolean {
  return question.referenceOnly === true || isSurveyAssistantReferenceId(question.id);
}

/** Use at serialization boundaries, including untrusted imports and in-memory commits. */
export function excludeSurveyAssistantReferenceAnswers<T>(answers: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(answers).filter(([id]) => !isSurveyAssistantReferenceId(id)));
}
