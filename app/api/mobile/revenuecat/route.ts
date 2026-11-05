import { z } from "zod";
import { BillingError } from "@/lib/billing/domain";
import { billingFailure, json } from "@/lib/billing/runtime";
import { requireMobileReady } from "@/mobile/server/config";
import { refreshRevenueCat, validWebhookAuthorization } from "@/mobile/server/revenuecat";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const c = requireMobileReady();
    if (!validWebhookAuthorization(request.headers.get("authorization"), c.webhookAuthorization)) throw new BillingError("invalid_signature", 401);
    if (Number(request.headers.get("content-length") ?? "0") > 64000) throw new BillingError("too_large", 413);
    const body = await request.text();
    if (body.length > 64000) throw new BillingError("too_large", 413);
    const { event } = z.object({ event: z.object({ id: z.string(), app_id: z.string(), environment: z.string().optional(), app_user_id: z.string().optional(),
      transferred_from: z.array(z.string()).optional(), transferred_to: z.array(z.string()).optional() }) }).parse(JSON.parse(body));
    if (event.app_id !== c.appId || event.environment && !(c.environment === "APP_STORE" ? ["PRODUCTION", "SANDBOX"].includes(event.environment) : event.environment === c.environment)) return json({ ignored: true });
    const identities = [...new Set([event.app_user_id, ...event.transferred_from ?? [], ...event.transferred_to ?? []].filter((x): x is string => !!x))];
    if (identities.length > 20) throw new BillingError("invalid_event", 400);
    for (const id of identities) await refreshRevenueCat(id);
    return json({ ok: true });
  } catch (error) { return billingFailure(error); }
}
