import { KISHO_STUDY_QUESTIONS } from './kisho-study';

export const KISHO_STUDY_DRAFT_KEY = 'kisho-65-66:study-draft:v1';
const questions = new Map(KISHO_STUDY_QUESTIONS.map(q => [q.raw.id, q]));
const fields = new Set(KISHO_STUDY_QUESTIONS.flatMap(q => q.fields.map(f => `${f.raw.questionId}/${f.raw.field}`)));
interface Draft { schema: 'kisho-study/1'; selections: Record<string, string>; writtenAnswers: Record<string, string>; reviewedFields: string[] }
function draft(selections: Record<string, string> = {}, writtenAnswers: Record<string, string> = {}, reviewedFields: unknown[] = []): Draft {
  return {
    schema: 'kisho-study/1',
    selections: Object.fromEntries(Object.entries(selections).filter(([id, value]) => typeof value === 'string' && Object.hasOwn(questions.get(id)?.raw.choices ?? {}, value))),
    writtenAnswers: Object.fromEntries(Object.entries(writtenAnswers).filter(([id, value]) => fields.has(id) && typeof value === 'string')),
    reviewedFields: [...new Set(reviewedFields.filter((id): id is string => typeof id === 'string' && fields.has(id) && Boolean(writtenAnswers[id]?.trim())))],
  };
}
export function parseKishoDraft(text: string | null): Draft {
  try {
    const data = JSON.parse(text ?? 'null');
    if (data?.schema !== 'kisho-study/1' || !data.selections || typeof data.selections !== 'object' || Array.isArray(data.selections)
      || !data.writtenAnswers || typeof data.writtenAnswers !== 'object' || Array.isArray(data.writtenAnswers) || !Array.isArray(data.reviewedFields)) return draft();
    return draft(data.selections, data.writtenAnswers, data.reviewedFields);
  } catch { return draft(); }
}
export function serializeKishoDraft(selections: Record<string, string>, writtenAnswers: Record<string, string>, reviewedFields: string[]): string {
  return JSON.stringify(draft(selections, writtenAnswers, reviewedFields));
}
