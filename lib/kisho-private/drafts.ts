import { KISHO_PRIVATE_QUESTIONS } from "./index";

export const KISHO_PRIVATE_DRAFT_KEY = "private:kisho-65-66:draft:v1";
const validIds = new Set(KISHO_PRIVATE_QUESTIONS.map((question) => question.raw.id));
const fieldIds = new Set(KISHO_PRIVATE_QUESTIONS.flatMap((question) => question.fields.map(({ raw }) => `${raw.questionId}/${raw.field}`)));

export interface KishoDraft {
  schema: "kisho-65-66-private-draft/1";
  publicGo: false;
  selections: Record<string, string>;
  writtenAnswers: Record<string, string>;
  reviewedFields: string[];
}

export function createKishoDraft(selections: Record<string, string>, writtenAnswers: Record<string, string>, reviewedFields: string[] = []): KishoDraft {
  const mc = Object.fromEntries(Object.entries(selections).filter(([id, choice]) => validIds.has(id) && typeof choice === "string"
    && KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.id === id)?.raw.choices?.[choice] !== undefined));
  const practical = Object.fromEntries(Object.entries(writtenAnswers).filter(([id, value]) => fieldIds.has(id) && typeof value === "string"));
  return { schema: "kisho-65-66-private-draft/1", publicGo: false, selections: mc, writtenAnswers: practical,
    reviewedFields: reviewedFields.filter((id) => fieldIds.has(id)) };
}

export function parseKishoDraft(text: string | null): KishoDraft {
  if (!text) return createKishoDraft({}, {});
  try {
    const value: unknown = JSON.parse(text);
    if (!value || typeof value !== "object" || !("schema" in value) || value.schema !== "kisho-65-66-private-draft/1"
      || !("publicGo" in value) || value.publicGo !== false || !("selections" in value) || !("writtenAnswers" in value)
      || !value.selections || typeof value.selections !== "object" || Array.isArray(value.selections)
      || !value.writtenAnswers || typeof value.writtenAnswers !== "object" || Array.isArray(value.writtenAnswers)
      || !("reviewedFields" in value) || !Array.isArray(value.reviewedFields)) return createKishoDraft({}, {});
    return createKishoDraft(value.selections as Record<string, string>, value.writtenAnswers as Record<string, string>, value.reviewedFields as string[]);
  } catch { return createKishoDraft({}, {}); }
}

export function serializeKishoDraft(selections: Record<string, string>, writtenAnswers: Record<string, string>, reviewedFields: string[] = []): string {
  return JSON.stringify(createKishoDraft(selections, writtenAnswers, reviewedFields));
}
