import "server-only";
import { createHash } from "node:crypto";
import type { Question } from "@/lib/questions/types";
import { displayQuestionExplanation } from "@/lib/questions/explanation-display";
import { createQuestionReportContext, type QuestionReportContext } from "./question-report-context";

type DisplaySource = Pick<Question,"id"|"exam"|"year"|"season"|"session"|"qNumber"|"part"|"lastUpdated"|"nativeB"|"explanation"|"choices"|"choiceExplanations">;
const DISPLAY_CONTENT_DOMAIN = "question-report-displayed-explanation-v1";
/** Called inside the page's existing showRealExplanation branch. Identifies its
 * formatted main explanation and visible choice-reason block, not the whole page,
 * a formal authored revision, a signature or server authority proof.
 * Nothing other than the opaque digest is added to client metadata. */
export function createQuestionReportContextForDisplay(q: DisplaySource): QuestionReportContext | null {
  const main = displayQuestionExplanation(q.exam,q.explanation);
  const hasReasonBlock = Boolean(q.choiceExplanations && q.choices);
  const reasons = hasReasonBlock ? Object.keys(q.choices!).map(key => [key,
    displayQuestionExplanation(q.exam,q.choiceExplanations?.[key as keyof NonNullable<Question["choiceExplanations"]>])]) : [];
  const canonical = JSON.stringify([DISPLAY_CONTENT_DOMAIN,q.id,q.exam,main,hasReasonBlock,reasons]);
  const id = "sha256:" + createHash("sha256").update(canonical,"utf8").digest("hex");
  return createQuestionReportContext(q,id);
}
