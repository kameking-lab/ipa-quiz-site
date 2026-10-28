import { z } from "zod";
import { findQuestionById } from "@/lib/questions/pool-server";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { billingConfig, gateReady } from "@/lib/billing/config";
import { BILLING_SAMPLE_ID } from "@/lib/billing/sample";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { BillingError } from "@/lib/billing/domain";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const { id, shuffle } = z.object({ id: z.string().min(1).max(160), shuffle: z.boolean().default(false) }).strict().parse(await request.json());
    const question = await findQuestionById(id);
    if (!question) throw new BillingError("not_found", 404);
    if (!isPracticeReadyQuestion(question)) throw new BillingError("content_under_review", 409);
    const config = billingConfig();
    let access: { kind: string; remaining: number | null } = { kind: "free", remaining: null };
    if (monthlySelected() ? monthlyConfig().enabled : gateReady(config)) {
      sameOrigin(request);
      if (id === BILLING_SAMPLE_ID) access = { kind: "sample", remaining: null };
      else {
        const userId = await billingIdentity();
        access = monthlySelected() ? await (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service.grant(userId, id)
          : await billingRuntime().service.grant(userId, id);
      }
    }
    return json({ question: shuffle ? shuffleChoices(question) : question, access });
  } catch (error) { return billingFailure(error); }
}
