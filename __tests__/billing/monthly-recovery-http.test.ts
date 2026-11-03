import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { MonthlyService } from "@/lib/billing/subscription/service";
import { StripeMonthlyProvider } from "@/lib/billing/subscription/stripe";

const wiring = vi.hoisted(() => ({ runtime: null as unknown }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/runtime", () => ({
  json: (value: unknown) => Response.json(value),
  billingFailure: (error: { status?: number; code?: string }) => Response.json({ error: error.code ?? "unavailable" }, { status: error.status ?? 503 }),
}));
import { POST as webhook } from "@/app/api/billing/webhook/route";

const secret = "whsec_public_recovery_fixture_only";
function request(event: unknown) {
  const body = JSON.stringify(event), time = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`${time}.${body}`).digest("hex");
  return new Request("http://localhost:3338/api/billing/webhook", { method: "POST", body,
    headers: { "stripe-signature": `t=${time},v1=${signature}` } });
}
beforeEach(() => {
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); });
  for (const [key, value] of Object.entries({ BILLING_PRODUCT: "subscription", BILLING_WEBHOOK_MODE: "stripe-test",
    BILLING_SOURCE_INSTANCE: "monthly-fixture", BILLING_ORIGIN: "http://localhost:3338", BILLING_STRIPE_TEST_WEBHOOK_SECRET: secret })) vi.stubEnv(key, value);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("monthly signed HTTP recovery across runtime reconstruction (offline memory/API fixtures)", () => {
  it.each(["http-500", "response-lost-after-provider-success"] as const)("keeps the committed hold and safely retries after %s", async failure => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    expect((await webhook(request(f.event()))).status).toBe(200);
    expect((await f.service.status("alice")).entitled).toBe(true);
    const realFixtureFetch = vi.mocked(f.fetcher).getMockImplementation()!;
    let inject = true;
    vi.mocked(f.fetcher).mockImplementation(async (input, options) => {
      if (inject && String(input).endsWith("/subscriptions/sub_monthly") && options?.method === "POST") {
        inject = false;
        if (failure === "http-500") return new Response("fixture outage", { status: 500 });
        await realFixtureFetch(input, options);
        throw new Error("fixture response lost after successful remote mutation");
      }
      return realFixtureFetch(input, options);
    });
    f.disputes.push({ id: "du_recovery", payment_intent: f.payment.id, livemode: false, status: "needs_response" });
    const event = f.event("charge.dispute.created", "du_recovery", "evt_recovery");
    expect((await webhook(request(event))).status).toBe(503);
    const saved = JSON.parse(JSON.stringify(f.store.accounts.get("stripe-test:alice")));
    expect(saved.renewalStopJobs.sub_monthly.token).toBe(event.id);
    expect(saved.events[event.id]).toBeDefined();
    expect((await f.service.status("alice")).entitled).toBe(false);
    expect(f.sub.cancel_at_period_end).toBe(failure === "response-lost-after-provider-success");

    // JSON round-trip plus new objects models loss of runtime state, not a real process/DB restart.
    f.store.accounts.set("stripe-test:alice", saved);
    const service = new MonthlyService(f.store, f.config, () => new Date("2026-02-01T00:00:00Z"));
    const provider = new StripeMonthlyProvider(f.config, "rk_test_public_fixture_not_a_key", f.fetcher);
    wiring.runtime = { ...f, service, provider };
    expect((await webhook(request(event))).status).toBe(200);
    expect((await service.status("alice")).entitled).toBe(false);
    const recovered = f.store.accounts.get("stripe-test:alice")!;
    expect(recovered.renewalStopJobs).toEqual({});
    expect(f.sub.cancel_at_period_end).toBe(true);
    expect(Object.keys(recovered.invoices)).toHaveLength(1);
    expect(Object.keys(recovered.payments)).toHaveLength(1);
    expect(Object.keys(recovered.events)).toHaveLength(2);
    const stopCalls = vi.mocked(f.fetcher).mock.calls.filter(([url, options]) => String(url).endsWith("/subscriptions/sub_monthly") && options?.method === "POST");
    expect(stopCalls).toHaveLength(2);
    const keys = stopCalls.map(([, options]) => (options!.headers as Record<string, string>)["Idempotency-Key"]);
    expect(keys[0]).toBeTruthy(); expect(keys[0]).toBe(keys[1]);
  });
});
