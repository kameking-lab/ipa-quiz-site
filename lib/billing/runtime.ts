import "server-only";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/lib/auth";
import { billingConfig, billingWebhookConfig, gateReady, type BillingConfig } from "./config";
import { BillingError, type CheckoutProvider } from "./domain";
import { PostgresBillingStore, type SqlSession } from "./postgres-store";
import { BillingService } from "./service";
import { StripeCheckoutProvider } from "./stripe";
import { monthlyConfig, monthlySelected } from "./subscription/config";

export async function optionalBillingIdentity() {
  const session = await auth(); // An auth exception is a dependency failure, not an anonymous session.
  return session?.user?.id ?? null;
}
export async function billingIdentity() {
  const id = await optionalBillingIdentity();
  if (!id) throw new BillingError("sign_in_required", 401);
  return id; // Never trust a request-supplied buyer ID.
}
export function billingRuntime() {
  const config = billingConfig();
  if (!gateReady(config)) throw new BillingError("billing_unavailable", 503);
  if (config.mode !== "mock" && billingWebhookConfig().mode !== config.mode) throw new BillingError("webhook_mode_mismatch", 503);
  return runtimeFor(config);
}
export function billingWebhookRuntime() { return runtimeFor(billingWebhookConfig()); }
function runtimeFor(config: BillingConfig) {
  if (!process.env.DATABASE_URL) throw new BillingError("billing_unavailable", 503);
  if (config.mode !== "mock" && !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,99}$/.test(config.sourceInstance ?? "")) throw new BillingError("finance_configuration_missing", 503);
  const session = (client: Pick<typeof prisma, "$queryRawUnsafe">): SqlSession => ({ query: (sql, values) => client.$queryRawUnsafe(sql, ...values) });
  const store = new PostgresBillingStore({ ...session(prisma),
    transaction: fn => prisma.$transaction(tx => fn(session(tx)), { maxWait: 5000, timeout: 10000 }),
  });
  const service = new BillingService(store, config);
  const provider: CheckoutProvider = config.mode === "stripe-test" || config.mode === "stripe-live"
    ? new StripeCheckoutProvider(config, (config.mode === "stripe-live" ? process.env.BILLING_STRIPE_LIVE_SECRET_KEY : process.env.BILLING_STRIPE_TEST_SECRET_KEY) ?? "", store)
    : { create: async p => ({ id: `mock_${p.id}`, url: `${config.origin}/billing/mock?order=${p.id}` }) };
  return { service, provider, store, config };
}

export function sameOrigin(request: Request) {
  const c = monthlySelected() ? monthlyConfig() : billingConfig();
  if (request.headers.get("origin") !== c.origin) throw new BillingError("invalid_origin", 403);
}
export function json(value: unknown, status = 200) {
  return Response.json(value, { status, headers: { "Cache-Control": "private, no-store", Vary: "Cookie", "X-Content-Type-Options": "nosniff" } });
}
export function billingFailure(error: unknown) {
  return json({ error: error instanceof BillingError ? error.code : "billing_unavailable" }, error instanceof BillingError ? error.status : 503);
}
