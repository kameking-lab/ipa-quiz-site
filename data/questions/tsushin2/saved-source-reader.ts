import type { JctcFirstSource } from "./jctc-first";

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function strings(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === "string");
}

function answers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length > 0 &&
    value.every((item: unknown) => typeof item === "number" && Number.isInteger(item) && item >= 1 && item <= 4) &&
    new Set(value).size === value.length;
}

export function readSavedSource(raw: unknown): JctcFirstSource {
  if (!record(raw)) throw new Error("Invalid saved source");
  const { exam, year, season, session, officialQuestionCount, questionUrl, answerUrl, questions } = raw;
  if ((exam !== "tsushin2" && exam !== "zoen2") ||
      (year !== 2025 && year !== 2026) ||
      (season !== "early" && season !== "late") ||
      session !== "gakka" ||
      typeof officialQuestionCount !== "number" ||
      typeof questionUrl !== "string" || typeof answerUrl !== "string" ||
      !Array.isArray(questions)) {
    throw new Error("Invalid saved source header");
  }
  if (raw.publishedCount !== undefined && raw.publishedCount !== questions.length) {
    throw new Error("Invalid saved published count");
  }
  const checked: JctcFirstSource["questions"] = questions.map((item: unknown) => {
    if (!record(item)) throw new Error("Invalid saved question");
    const {
      number, pdfPage, category, topic, officialAnswerNumbers, question,
      questionNotice, assessmentMode,
      choices, explanation, choiceExplanations, officialReferenceUrls,
      imageUrl, reusePermissionVerified, lastUpdated,
    } = item;
    if (typeof number !== "number" || !Number.isInteger(number) ||
        typeof pdfPage !== "number" || !Number.isInteger(pdfPage) ||
        typeof category !== "string" || typeof topic !== "string" ||
        !answers(officialAnswerNumbers) || typeof question !== "string" ||
        (questionNotice !== undefined && typeof questionNotice !== "string") ||
        (assessmentMode !== undefined && assessmentMode !== "reference-only") ||
        (assessmentMode === "reference-only" && (typeof questionNotice !== "string" || !questionNotice.trim())) ||
        !strings(choices) || choices.length !== 4 ||
        typeof explanation !== "string" ||
        !strings(choiceExplanations) || choiceExplanations.length !== 4 ||
        (officialReferenceUrls !== undefined && !strings(officialReferenceUrls)) ||
        (imageUrl !== undefined && typeof imageUrl !== "string") ||
        (reusePermissionVerified !== undefined && typeof reusePermissionVerified !== "boolean") ||
        (lastUpdated !== undefined && typeof lastUpdated !== "string")) {
      throw new Error("Invalid saved question fields");
    }
    return {
      number, pdfPage, category, topic, officialAnswerNumbers, question,
      choices, explanation, choiceExplanations,
      ...(questionNotice === undefined ? {} : { questionNotice }),
      ...(assessmentMode === undefined ? {} : { assessmentMode }),
      ...(officialReferenceUrls === undefined ? {} : { officialReferenceUrls }),
      ...(imageUrl === undefined ? {} : { imageUrl }),
      ...(reusePermissionVerified === undefined ? {} : { reusePermissionVerified }),
      ...(lastUpdated === undefined ? {} : { lastUpdated }),
    };
  });
  return {
    exam, year, season, session, officialQuestionCount,
    publishedCount: checked.length, questionUrl, answerUrl, questions: checked,
  };
}
