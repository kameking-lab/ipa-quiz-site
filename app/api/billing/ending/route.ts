import { z } from "zod";
import { BillingError } from "@/lib/billing/domain";
import { memberExamEndTimestamp } from "@/lib/billing/exam-end";
import { billingFailure, billingIdentity, json, sameOrigin } from "@/lib/billing/runtime";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { monthlyRuntime } from "@/lib/billing/subscription/runtime";
import { appStorePurchaseCheck } from "@/mobile/server/revenuecat";

export const runtime = "nodejs";

const requestSchema = z.discriminatedUnion("kind", [
  z.strictObject({ orderId: z.uuid(), kind: z.literal("cancel") }),
  z.strictObject({ orderId: z.uuid(), kind: z.literal("renew") }),
  z.strictObject({ orderId: z.uuid(), kind: z.literal("exam"), examDate: z.string().length(10) }),
]);

export async function PATCH(request: Request) {
  try {
    sameOrigin(request);
    if (!monthlySelected()) throw new BillingError("subscription_missing", 404);
    const userId = await billingIdentity();
    const parsed = requestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    const { config, service, provider } = monthlyRuntime(false, AbortSignal.timeout(15_000));
    const verify = (id: string) => appStorePurchaseCheck(id, undefined, config.mode);
    const change = parsed.data;
    if (change.kind !== "exam") return json(await service.changeEnding(userId, change.orderId, change, provider, verify));
    const at = memberExamEndTimestamp(change.examDate, new Date());
    if (at === null) throw new BillingError("invalid_exam_date", 400);
    return json(await service.changeEnding(userId, change.orderId, { kind: "exam", at }, provider, verify));
  } catch (error) {
    return billingFailure(error);
  }
}
