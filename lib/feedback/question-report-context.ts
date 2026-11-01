import { z } from "zod";
import type { Question } from "@/lib/questions/types";

const identifier = z.string().min(1).max(120).regex(/^[A-Za-z0-9][A-Za-z0-9_.:-]*$/);
const code = z.string().min(1).max(64).regex(/^[a-z0-9][a-z0-9-]*$/);
const label = z.string().min(1).max(80).refine(value => !/[\x00-\x1f\x7f]/.test(value));
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const time = Date.parse(value + "T00:00:00Z");
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value;
});
/** Client-reported metadata only: this schema does not certify a server revision.
 * version is the transport shape version, never an explanation version. */
export const QuestionReportContextSchema = z.object({
  version: z.literal(1),
  question: z.object({
    id: identifier, exam: code, year: z.number().int().min(1).max(9999), season: code, session: code,
    number: z.number().int().min(1).max(9999), part: z.enum(["a","b","1","2","3","4","5"]).nullable(),
    displayNumber: label,
  }).strict(),
  explanation: z.object({ revision: z.null(), lastUpdated: date.nullable(), displayContentId: z.string().regex(/^sha256:[a-f0-9]{64}$/).optional() }).strict(),
}).strict();
export type QuestionReportContext = z.infer<typeof QuestionReportContextSchema>;
type Source = Pick<Question,"id"|"exam"|"year"|"season"|"session"|"qNumber"|"part"|"lastUpdated"|"nativeB">;
function frozen(context: QuestionReportContext): QuestionReportContext {
  Object.freeze(context.question); Object.freeze(context.explanation); return Object.freeze(context);
}
export function readQuestionReportContext(value: unknown, questionId: string): QuestionReportContext | null {
  const parsed = QuestionReportContextSchema.safeParse(value);
  return parsed.success && parsed.data.question.id === questionId ? frozen(parsed.data) : null;
}
/** Copy authored question metadata only. Never use getLastUpdatedISO's build fallback,
 * current time, a git hash, URL, account state, answer history or explanation text. */
export function createQuestionReportContext(q: Source, displayContentId?: string): QuestionReportContext | null {
  const explicitDate = date.safeParse(q.lastUpdated);
  return readQuestionReportContext({ version: 1,
    question: { id:q.id,exam:q.exam,year:q.year,season:q.season,session:q.session,number:q.qNumber,
      part:q.part??null,displayNumber:q.nativeB?.officialLabel??String(q.qNumber)+(q.part?"("+q.part+")":"") },
    explanation:{revision:null,lastUpdated:explicitDate.success?explicitDate.data:null,...(displayContentId?{displayContentId}:{})},
  },q.id);
}
export function questionReportContextLines(context: QuestionReportContext | null, questionId: string): string[] {
  if (!context) return ["問題ID: "+questionId,"問題番号: 未取得","解説版: 版番号は未記録","解説の最終更新日: 未記録","表示解説内容ID（正式版番号とは別）: 未取得"];
  return ["問題ID: "+context.question.id,
    "問題番号: "+context.question.exam+" / "+context.question.year+" / "+context.question.season+" / "+context.question.session+" / "+context.question.displayNumber,
    "解説版: 版番号は未記録",
    "解説の最終更新日: "+(context.explanation.lastUpdated??"未記録"),
    "表示解説内容ID（正式版番号とは別）: "+(context.explanation.displayContentId??"未取得")];
}
