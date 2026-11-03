import { createHmac } from "node:crypto";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
const wiring = vi.hoisted(() => ({ runtime: null as unknown, user: "alice" }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/runtime", () => ({
  billingIdentity: async () => wiring.user, sameOrigin: (request: Request) => { if (request.headers.get("origin") !== "http://localhost:3338") throw Object.assign(new Error(), { status: 403 }); },
  json: (value: unknown) => Response.json(value), billingFailure: (error: { status?: number; code?: string }) => Response.json({ error: error.code ?? "unavailable" }, { status: error.status ?? 503 }),
}));
import { POST as webhook } from "@/app/api/billing/webhook/route";
import { POST as portal } from "@/app/api/billing/portal/route";
import { POST as checkout } from "@/app/api/billing/checkout/route";
import { GET as status } from "@/app/api/billing/status/route";
import { monthlyTerms } from "@/lib/billing/subscription/service";
const secret = "whsec_public_fixture_only";
function request(event: unknown, valid = true) {
  const body = JSON.stringify(event), time = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`${time}.${body}`).digest("hex");
  return new Request("http://localhost:3338/api/billing/webhook", { method: "POST", body, headers: { "stripe-signature": `t=${time},v1=${valid ? signature : "0".repeat(64)}` } });
}
beforeEach(() => {
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); }); wiring.user = "alice";
  for (const [key, value] of Object.entries({ BILLING_PRODUCT: "subscription", BILLING_WEBHOOK_MODE: "stripe-test", BILLING_SOURCE_INSTANCE: "monthly-fixture", BILLING_ORIGIN: "http://localhost:3338", BILLING_STRIPE_TEST_WEBHOOK_SECRET: secret })) vi.stubEnv(key, value);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("signed monthly HTTP handler -> adapter -> service -> transactional memory (offline)", () => {
  it("receives and replays a signed paid invoice without duplicating rights or money", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f;
    expect((await webhook(request(f.event()))).status).toBe(200); expect((await webhook(request(f.event()))).status).toBe(200);
    const response = await status(new Request(`http://localhost:3338/api/billing/status?order=${f.result.orderId}`));
    expect((await response.json()).entitled).toBe(true); expect(Object.keys(f.store.accounts.get("stripe-test:alice")!.events)).toHaveLength(1);
  });
  it("rejects invalid signatures before provider reads or any state changes", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f; const count = vi.mocked(f.fetcher).mock.calls.length;
    expect((await webhook(request(f.event(), false))).status).toBe(400); expect(vi.mocked(f.fetcher).mock.calls).toHaveLength(count);
  });
  it("returns retryable failure on DB commit error and succeeds on the same event later", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f; f.store.fail = true;
    expect((await webhook(request(f.event()))).status).toBe(503); f.store.fail = false;
    expect((await webhook(request(f.event()))).status).toBe(200); expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("sales-off blocks new checkout but existing billing and portal stay operable", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f; f.config.enabled = false;
    const post = (body: unknown) => new Request("http://localhost:3338/api/billing", { method: "POST", headers: { origin: "http://localhost:3338" }, body: JSON.stringify(body) });
    expect((await checkout(post({ terms: monthlyTerms(f.config) }))).status).toBe(503);
    expect((await webhook(request(f.event()))).status).toBe(200); expect((await portal(post({}))).status).toBe(200);
    wiring.user = "bob"; expect((await portal(post({}))).status).toBe(404); expect((await portal(post({ customer: "cus_monthly" }))).status).not.toBe(200);
  });
  it("GET status is a read: it leaves persisted state byte-for-byte unchanged", async () => {
    const f = await monthlyStripeFixture(); wiring.runtime = f; await webhook(request(f.event()));
    const before = JSON.stringify([...f.store.accounts]); await status(new Request("http://localhost:3338/api/billing/status"));
    expect(JSON.stringify([...f.store.accounts])).toBe(before);
  });
});
