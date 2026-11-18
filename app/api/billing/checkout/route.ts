import { z } from "zod";
import { billingFailure, billingIdentity, billingRuntime, json, sameOrigin } from "@/lib/billing/runtime";
import { checkoutEmail } from "@/lib/billing/checkout-email";
import { monthlySelected } from "@/lib/billing/subscription/config";
import { appStorePurchaseCheck } from "@/mobile/server/revenuecat";
import { BillingError } from "@/lib/billing/domain";
import { recordFunnel, saveOrderAttribution } from "@/lib/billing/funnel";
import { requestAttribution } from "@/lib/billing/attribution";
import { conversionChannel, recordConversion, saveConversionChannel } from "@/lib/billing/conversion";
import { assertNoDuplicatePurchase } from "@/lib/billing/duplicate-purchase-runtime";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const userId = await billingIdentity();
    const { terms } = z.object({ terms: z.string().length(64) }).strict().parse(await request.json());
    let result: { orderId: string; url: string };
    if (monthlySelected()) {
      const { service, provider } = (await import("@/lib/billing/subscription/runtime")).monthlyRuntime(true);
      await assertNoDuplicatePurchase(userId);
      const checkAppStore = await appStorePurchaseCheck(userId);
      result = await service.checkout(userId, terms, provider, await checkoutEmail(), async orderId => {
        const channel = conversionChannel(request);
        await saveConversionChannel(orderId, channel);
        await recordConversion("checkout_created", channel, orderId);
      }, checkAppStore);
    } else {
      const checkAppStore = await appStorePurchaseCheck(userId);
      await checkAppStore();
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
  } catch (error) { return billingFailure(error); }
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
