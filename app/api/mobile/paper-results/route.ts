import { z } from "zod";
import { BillingError } from "@/lib/billing/domain";
import { billingFailure, json, optionalBillingIdentity, sameOrigin } from "@/lib/billing/runtime";
import { loadExamPaper } from "@/lib/exam-library-papers";
import { gradeExamAnswer, isValidChoice } from "@/lib/exam-library-model";
import { isExamReferenceOnly } from "@/lib/exam-library/survey-assistant-reference-policy";
import { historicPaperGrants, validPaperReviewProof } from "@/mobile/server/paper-review";
export const runtime = "nodejs";
const schema = z.object({ paper: z.string().min(1).max(160), answers: z.array(z.object({
  id: z.string().min(1).max(160), choice: z.number().int().nullable(), proof: z.string().max(64).optional(),
}).strict()).max(500) }).strict();
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await optionalBillingIdentity();
    if (!userId) throw new BillingError("sign_in_required", 401);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) throw new BillingError("invalid_answers", 400);
    const {paper, answers} = parsed.data, questions = loadExamPaper(paper);
    if (!questions) throw new BillingError("not_found", 404);
    const byId = new Map(questions.map(q => [q.id, q]));
    if (new Set(answers.map(a => a.id)).size !== answers.length || answers.some(a => {
      const q = byId.get(a.id);
      return !q || isExamReferenceOnly(q) || (q.choiceCount > 0 ? !isValidChoice(q, a.choice) : a.choice !== null);
    })) throw new BillingError("invalid_answers", 400);
    const proven = new Set(answers.filter(a => validPaperReviewProof(a.proof, userId, paper, a.id)).map(a => a.id));
    const historic = await historicPaperGrants(userId, answers.filter(a => !proven.has(a.id)).map(a => a.id));
    // No text, figures, explanations, correct choices, or quota grants leave this endpoint.
    return json({results: answers.filter(a => proven.has(a.id) || historic.has(a.id)).map(a => ({
      id: a.id, choice: a.choice, result: gradeExamAnswer(byId.get(a.id)!, a.choice),
    }))});
  } catch (error) { return billingFailure(error); }
}
