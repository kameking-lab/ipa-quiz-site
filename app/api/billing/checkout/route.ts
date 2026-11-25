import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { checkoutEmail } from "@/lib/billing/checkout-email";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { appStorePurchaseCheck } from "@/mobile/server/revenuecat";
import { mobileConfig } from "@/mobile/server/config";
import { BillingError } from "@/lib/billing/domain";
import { recordFunnel, saveOrderAttribution } from "@/lib/billing/funnel";
import { requestAttribution } from "@/lib/billing/attribution";
import { conversionChannel, recordConversion, saveConversionChannel } from "@/lib/billing/conversion";
import { assertNoDuplicatePurchase } from "@/lib/billing/duplicate-purchase-runtime";
import { examEndTimestamp, firstCheckoutExamDate } from "@/lib/billing/exam-end";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const { terms, examDate, exam, returnTo } = z.object({ terms: z.string().length(64), examDate: z.string().length(10).nullish(), returnTo: z.string().max(8192).nullish(),
      exam: z.enum(ALL_QUIZ_EXAM_CODES).nullish() }).strict().parse(await request.json());
    let result: { orderId: string; url: string };
    if (monthlySelected()) {
      const { config, service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(true);
      const examEndAt = examDate ? examEndTimestamp(examDate, new Date()) : null;
      if (examDate && !examEndAt) throw new BillingError("invalid_exam_date", 400);
      await assertNoDuplicatePurchase(userId);
      // Check for duplicate purchases in the same payment environment as this checkout.
      const purchaseRealm = mobileConfig().enabled ? config.mode : undefined;
      result = await service.checkout(userId, terms, provider, await checkoutEmail(), async orderId => {
        const channel = conversionChannel(request);
        await saveConversionChannel(orderId, channel);
        await recordConversion("checkout_created", channel, orderId);
      }, memberId => appStorePurchaseCheck(memberId, memberId === userId ? undefined : "duplicate_purchase", purchaseRealm), examEndAt ?? undefined, exam ?? undefined, returnTo);
      if ("recovered" in result) return json(result);
    } else {
      await appStorePurchaseCheck(userId);
      const { service, provider } = billingRuntime();
      result = await service.checkout(userId, terms, provider);
    }
    // Awaited: the function is frozen once the response is sent.
    const attribution = requestAttribution(request);
    if (attribution) {
      await saveOrderAttribution(result.orderId, attribution);
      await recordFunnel("checkout_started", `user:${userId}`, Date.now(), attribution);
    } else await recordFunnel("checkout_started", `user:${userId}`);
    return json(result);
  } catch (error) {
    if (error instanceof BillingError && error.code === "invalid_exam_date")
      return json({ error: error.code, firstExamDate: firstCheckoutExamDate(new Date()) }, 400);
    return billingFailure(error);
  }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const body: unknown = await request.json().catch(() => null);
    const parsed = z.object({ orderId: z.uuid() }).strict().safeParse(body);
    if (!parsed.success) throw new BillingError("invalid_request", 400);
    if (monthlySelected()) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime();
      await service.cancelCheckout(userId, parsed.data.orderId, provider);
    }
    return json({ closed: true });
  } catch (error) { return billingFailure(error); }
}
