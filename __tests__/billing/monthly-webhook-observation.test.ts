// @vitest-environment node
import { createHash, createHmac } from "node:crypto";
import { performance } from "node:perf_hooks";
import { setTimeout as delay } from "node:timers/promises";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { eventDigest } from "@/lib/billing/signature";
import { emptyAccount, type MonthlyStore } from "@/lib/billing/subscription/domain";
import { MonthlyService } from "@/lib/billing/subscription/service";
import { MonthlyMemoryStore } from "./monthly-fixture";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";

const wiring = vi.hoisted(() => ({ runtime: {} as unknown, telemetry: vi.fn<(action: string, key: string) => Promise<void>>() }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => wiring.runtime }));
vi.mock("@/lib/billing/runtime", () => ({
  json: (value: unknown) => Response.json(value),
  billingFailure: (error: { code?: string; status?: number }) =>
    Response.json({ error: error.code ?? "billing_unavailable" }, { status: error.status ?? 503 }),
}));
vi.mock("@/lib/billing/funnel", () => ({
  readOrderAttribution: async (order: string) => { await wiring.telemetry("attribution", order); return null; },
  recordFunnel: (action: string, key: string) => wiring.telemetry(action, key),
}));
vi.mock("@/lib/billing/conversion", () => ({
  readConversionChannel: async (order: string) => { await wiring.telemetry("channel", order); return "unknown"; },
  recordConversion: (action: string, _channel: string, key: string) => wiring.telemetry(action, key),
}));
import { POST } from "@/app/api/billing/webhook/route";

const fixtureSecret = "whsec_public_fixture_only";
const clock = () => new Date("2026-02-01T00:00:00Z");
type Fixture = Awaited<ReturnType<typeof monthlyStripeFixture>>;

beforeEach(() => {
  vi.stubGlobal("fetch", () => { throw new Error("External fetch forbidden"); });
  for (const [name, value] of Object.entries({
    BILLING_PRODUCT: "subscription", BILLING_WEBHOOK_MODE: "stripe-test", BILLING_SOURCE_INSTANCE: "monthly-fixture",
    BILLING_ORIGIN: "http://localhost:3338", BILLING_STRIPE_TEST_WEBHOOK_SECRET: fixtureSecret,
  })) vi.stubEnv(name, value);
  wiring.telemetry.mockReset().mockResolvedValue(undefined);
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

function signedRequest(event: unknown, { valid = true, age = 0, contentLength = 0 } = {}) {
  const body = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000) - age;
  const digest = createHmac("sha256", fixtureSecret).update(`${timestamp}.${body}`).digest("hex");
  const headers = new Headers({ "stripe-signature": `t=${timestamp},v1=${valid ? digest : "0".repeat(64)}` });
  if (contentLength) headers.set("content-length", String(contentLength));
  return new Request("http://localhost/api/billing/webhook", { method: "POST", body, headers });
}

function wire(f: Fixture, store: MonthlyStore = f.store, audit?: () => Promise<void>) {
  const service = new MonthlyService(store, f.config, clock, audit, async () => true);
  wiring.runtime = { service, provider: f.provider };
  return service;
}

function invoiceEvent(f: Fixture, eventId = "evt_monthly") {
  const event = f.event("invoice.paid", f.invoice.id, eventId);
  Object.assign(event.data.object, { customer: f.customer.id });
  return event;
}

function account(f: Fixture) { return f.store.accounts.get("stripe-test:alice")!; }

function fixtureFetch(f: Fixture) {
  const fetch = vi.mocked(f.fetcher);
  const original = fetch.getMockImplementation()!;
  fetch.mockClear();
  return { fetch, original };
}

const cases = ["checkout", "subscription", "invoice", "refund", "unallocated", "dispute", "duplicate", "ignored", "invalid"] as const;
type Case = typeof cases[number];

async function measure(kind: Case, injectDelay: boolean) {
  const f = await monthlyStripeFixture();
  const refund = { id: "re_profile", amount: 100, payment_intent: f.payment.id, currency: "jpy", status: "succeeded" };
  const dispute = { id: "du_profile", payment_intent: f.payment.id, livemode: false, status: "needs_response" };
  const metrics = { owner: 0, readTx: 0, writeTx: 0, audit: 0, kv: 0 };
  const paths: string[] = [];
  const { fetch, original } = fixtureFetch(f);
  fetch.mockImplementation(async (input, init) => {
    const key = init?.method === "POST" ? new Headers(init.headers).get("idempotency-key") : null;
    paths.push(`${init?.method} ${new URL(String(input)).pathname}${key ? ` (${key})` : ""}`);
    if (injectDelay) await delay(20);
    return original(input, init);
  });
  const store: MonthlyStore = {
    async owner(...args) { metrics.owner++; if (injectDelay) await delay(5); return f.store.owner(...args); },
    async transaction(id, mode, source, fn, readOnly) {
      if (readOnly) metrics.readTx++;
      else metrics.writeTx++;
      if (injectDelay) await delay(5);
      return f.store.transaction(id, mode, source, fn, readOnly);
    },
    trialCardOwner: f.store.trialCardOwner.bind(f.store),
    purchaseTransaction: f.store.purchaseTransaction.bind(f.store),
  };
  wiring.telemetry.mockClear().mockImplementation(async () => { metrics.kv++; if (injectDelay) await delay(5); });
  const service = wire(f, store, async () => { metrics.audit++; if (injectDelay) await delay(5); });
  let event = invoiceEvent(f);
  if (kind === "checkout") {
    event = f.event("checkout.session.completed", f.session.id);
    Object.assign(event.data.object, { customer: f.customer.id, mode: "subscription", status: "complete",
      payment_status: "paid", client_reference_id: f.result.orderId });
  } else if (kind === "subscription") {
    event = f.event("customer.subscription.updated", f.sub.id);
    Object.assign(event.data.object, { customer: f.customer.id });
  } else if (kind === "refund" || kind === "unallocated") {
    f.refunds.push(refund);
    f.allocationsVisible(kind !== "unallocated");
    event = f.event("refund.updated", refund.id);
  } else if (kind === "dispute") {
    f.disputes.push(dispute);
    event = f.event("charge.dispute.created", dispute.id);
  } else if (kind === "ignored") {
    event = f.event("customer.updated", f.customer.id);
  }

  if (kind === "duplicate") {
    const first = await POST(signedRequest({ ...event, pending_webhooks: 2 }));
    expect(first.status).toBe(200);
    for (const key of Object.keys(metrics) as (keyof typeof metrics)[]) metrics[key] = 0;
    paths.length = 0;
  }
  const delivered = { ...event, pending_webhooks: 1 };
  const request = signedRequest(delivered, { valid: kind !== "invalid" });
  const started = performance.now();
  const response = await POST(request);
  const ms = Math.round(performance.now() - started);
  const body = await response.json();
  const result = kind === "duplicate" || kind === "ignored" ? kind : "processed";
  expect(response.status).toBe(kind === "invalid" ? 400 : 200);
  expect(body).toEqual(kind === "invalid" ? { error: "invalid_signature" } : { received: true, result });
  const saved = structuredClone(account(f));
  if (kind === "ignored" || kind === "invalid") expect(saved.events).toEqual({});
  else {
    expect(saved.events).toEqual({ [event.id]: eventDigest(Buffer.from(JSON.stringify(delivered))) });
    // The digest includes the random fixture signup ID for Checkout.
    saved.events[event.id] = "verified-digest";
  }
  const normalize = (value: unknown) => JSON.stringify(value)
    .replaceAll(f.result.orderId, "fixture-order").replaceAll(saved.customer!.attemptId, "fixture-attempt");
  const status = await service.status("alice", f.result.orderId);
  // The status read is outside the measured route, so exclude it from the counters.
  metrics.readTx--;
  const state = createHash("sha256").update(normalize({ saved, status, telemetry: wiring.telemetry.mock.calls })).digest("hex");
  return { ms, http: response.status, body, state, metrics, paths };
}

it.runIf(process.env.STRIPEPERF24_PROFILE === "1")("profiles signed deliveries with fixed local I/O delays", async () => {
  for (const kind of cases) {
    const samples = [];
    for (let i = 0; i < 3; i++) samples.push(await measure(kind, true));
    const [{ metrics, paths, http, body, state }] = samples;
    for (const row of samples) expect(row).toMatchObject({ metrics, paths, http, body, state });
    const times = samples.map(row => row.ms).sort((a, b) => a - b);
    console.info(JSON.stringify({ kind, medianMs: times[1], times, http, body, state, ...metrics, paths }));
  }
}, 30_000);

it.each([
  ["checkout", "/v1/checkout/sessions/cs_test_monthly", 8],
  ["subscription", "/v1/subscriptions/sub_monthly", 7],
  ["invoice", "/v1/invoices/in_monthly", 7],
] as const)("reads the %s entry once in the successful delivery", async (kind, entry, apiCount) => {
  const { paths, metrics } = await measure(kind, false);
  expect(paths).toHaveLength(apiCount);
  expect(paths.filter(path => path === `GET ${entry}`)).toHaveLength(1);
  expect(metrics).toMatchObject({ owner: 1, readTx: 8, writeTx: 1, audit: 1, kv: kind === "checkout" ? 4 : 0 });
});

it.each([
  [{ valid: false }, 400, "invalid_signature"],
  [{ age: 301 }, 400, "stale_signature"],
  [{ contentLength: 262145 }, 413, "event_too_large"],
] as const)("rejects an invalid delivery before Stripe or the store", async (options, status, code) => {
  const f = await monthlyStripeFixture();
  wire(f);
  const { fetch } = fixtureFetch(f);
  const owner = vi.spyOn(f.store, "owner");
  const tx = vi.spyOn(f.store, "transaction");
  const response = await POST(signedRequest(invoiceEvent(f), options));
  expect(response.status).toBe(status);
  expect(await response.json()).toEqual({ error: code });
  expect(fetch).not.toHaveBeenCalled();
  expect(owner).not.toHaveBeenCalled();
  expect(tx).not.toHaveBeenCalled();
});

it.each(["different customer", "different event", "old policy"] as const)("checks the authoritative owner for a hint with a %s", async wrongHint => {
  const f = await monthlyStripeFixture();
  const bob = emptyAccount("bob", f.config.mode, f.config.sourceInstance);
  bob.customer = { ...account(f).customer!, id: "cus_bob" };
  if (wrongHint === "different event") bob.events.evt_monthly = `v2:${"0".repeat(64)}`;
  if (wrongHint === "old policy") bob.renewalStopJobs.sub_legacy = { token: "evt_legacy" };
  f.store.accounts.set("stripe-test:bob", bob);
  wire(f);
  const event = invoiceEvent(f);
  Object.assign(event.data.object, { customer: bob.customer.id });
  const response = await POST(signedRequest(event));
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ result: "processed" });
  expect(account(f).invoices[f.invoice.id].paid).toBe(true);
  expect(f.store.accounts.get("stripe-test:bob")).toEqual(bob);
});

it.each(["expanded", "unknown"] as const)("uses canonical resolution for an %s customer", async shape => {
  const f = await monthlyStripeFixture();
  wire(f);
  const { fetch } = fixtureFetch(f);
  const event = invoiceEvent(f);
  if (shape === "unknown") f.invoice.customer = "cus_unknown";
  Object.assign(event.data.object, { customer: shape === "expanded" ? { id: f.customer.id } : f.invoice.customer });
  const response = await POST(signedRequest(event));
  expect(response.status).toBe(shape === "expanded" ? 200 : 503);
  expect(await response.json()).toEqual(shape === "expanded" ? { received: true, result: "processed" } : { error: "subscription_customer_missing" });
  expect(fetch.mock.calls.filter(([input]) => new URL(String(input)).pathname === `/v1/invoices/${f.invoice.id}`))
    .toHaveLength(shape === "expanded" ? 2 : 1);
  expect(!!account(f).events[event.id]).toBe(shape === "expanded");
});

it("does not use signed paid claims to grant access", async () => {
  const f = await monthlyStripeFixture();
  const service = wire(f);
  Object.assign(f.invoice, { status: "open", amount_paid: 0, amount_remaining: f.invoice.total });
  const event = invoiceEvent(f);
  Object.assign(event.data.object, { status: "paid", amount_paid: f.invoice.total });
  expect((await POST(signedRequest(event))).status).toBe(200);
  expect(account(f).invoices[f.invoice.id].paid).toBe(false);
  expect((await service.status("alice")).entitled).toBe(false);
});

it.each(["provider", "commit", "audit"] as const)("recovers after a %s failure using a new service", async failure => {
  const f = await monthlyStripeFixture();
  const event = invoiceEvent(f);
  if (failure === "provider") f.fail(`invoices/${f.invoice.id}`);
  if (failure === "commit") f.store.fail = true;
  wire(f, f.store, async () => { if (failure === "audit") throw new Error("Fixture audit failure"); });
  expect((await POST(signedRequest(event))).status).toBe(503);
  expect(!!account(f).events[event.id]).toBe(failure === "audit");
  expect(!!account(f).invoices[f.invoice.id]?.paid).toBe(failure === "audit");

  f.fail("");
  const restored = new MonthlyMemoryStore();
  restored.accounts = structuredClone(f.store.accounts);
  const audited = vi.fn(async () => {});
  const service = wire(f, restored, audited);
  const response = await POST(signedRequest({ ...event, pending_webhooks: 0 }));
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ result: failure === "audit" ? "duplicate" : "processed" });
  expect(audited).toHaveBeenCalledOnce();
  expect(Object.keys(restored.accounts.get("stripe-test:alice")!.events)).toEqual([event.id]);
  expect((await service.status("alice")).entitled).toBe(true);
});

function pauseResponse(f: Fixture, path: string) {
  const captured = Promise.withResolvers<void>();
  const resume = Promise.withResolvers<void>();
  const { fetch, original } = fixtureFetch(f);
  let paused = false;
  fetch.mockImplementation(async (input, init) => {
    const response = await original(input, init);
    if (!paused && new URL(String(input)).pathname === path) {
      paused = true;
      captured.resolve();
      await resume.promise;
    }
    return response;
  });
  return { fetch, captured: captured.promise, resume: resume.resolve };
}

it("commits a single copy of overlapping deliveries and checks a real digest conflict", async () => {
  const f = await monthlyStripeFixture();
  wire(f);
  const event = invoiceEvent(f);
  const barrier = pauseResponse(f, `/v1/invoices/${f.invoice.id}`);
  const first = POST(signedRequest({ ...event, pending_webhooks: 2 }));
  await barrier.captured;
  try {
    const second = await POST(signedRequest({ ...event, pending_webhooks: 1 }));
    expect(second.status).toBe(200);
    expect(await second.json()).toMatchObject({ result: "processed" });
  } finally { barrier.resume(); }
  const retry = await first;
  expect(retry.status).toBe(200);
  expect(await retry.json()).toMatchObject({ result: "duplicate" });
  const saved = structuredClone(account(f));
  expect(Object.keys(saved.events)).toEqual([event.id]);
  expect(saved.invoices[f.invoice.id].payments).toHaveLength(1);
  const conflicting = await POST(signedRequest({ ...event, created: 42 }));
  expect(conflicting.status).toBe(400);
  expect(await conflicting.json()).toEqual({ error: "event_conflict" });
  expect(account(f)).toEqual(saved);

  const legacy = createHash("sha256").update(JSON.stringify({ ...event, pending_webhooks: 2 })).digest("hex");
  account(f).events[event.id] = legacy;
  const legacyRetry = await POST(signedRequest({ ...event, pending_webhooks: 0 }));
  expect(legacyRetry.status).toBe(200);
  expect(await legacyRetry.json()).toMatchObject({ result: "duplicate" });
  expect(account(f).events[event.id]).toBe(legacy);
});

it("refetches a stale entry after a newer cancellation commits", async () => {
  const f = await monthlyStripeFixture();
  wire(f);
  const old = f.event("customer.subscription.updated", f.sub.id, "evt_before_cancel");
  const canceled = f.event("customer.subscription.deleted", f.sub.id, "evt_canceled");
  Object.assign(old.data.object, { customer: f.customer.id, status: "active" });
  Object.assign(canceled.data.object, { customer: f.customer.id, status: "canceled" });
  const path = `/v1/subscriptions/${f.sub.id}`;
  const barrier = pauseResponse(f, `/v1/invoices/${f.invoice.id}/lines`);
  const subscriptionReads = () => barrier.fetch.mock.calls.filter(([input]) => new URL(String(input)).pathname === path).length;
  const first = POST(signedRequest({ ...old, created: 42 }));
  await barrier.captured;
  let readsBeforeRetry = 0;
  try {
    f.sub.status = "canceled";
    const second = await POST(signedRequest({ ...canceled, created: 42 }));
    expect(second.status).toBe(200);
    expect(await second.json()).toMatchObject({ result: "processed" });
    expect(account(f).contracts[f.sub.id].status).toBe("canceled");
    readsBeforeRetry = subscriptionReads();
  } finally { barrier.resume(); }
  const response = await first;
  expect(response.status).toBe(200);
  expect(await response.json()).toMatchObject({ result: "processed" });
  expect(subscriptionReads()).toBe(readsBeforeRetry + 1);
  expect(account(f).contracts[f.sub.id].status).toBe("canceled");
  expect(account(f).invoices[f.invoice.id].paid).toBe(true);
  expect(Object.keys(account(f).events)).toEqual([canceled.id, old.id]);
});

it("returns a retryable failure if all four revisions change during observation", async () => {
  const f = await monthlyStripeFixture();
  const event = invoiceEvent(f);
  wire(f);
  const { fetch, original } = fixtureFetch(f);
  let competingWrites = 0;
  fetch.mockImplementation(async (input, init) => {
    if (new URL(String(input)).pathname === `/v1/invoices/${f.invoice.id}/lines`) {
      await f.store.transaction("alice", f.config.mode, f.config.sourceInstance, async a => {
        a.events[`evt_competing_${++competingWrites}`] = "fixture-revision";
      });
    }
    return original(input, init);
  });
  const response = await POST(signedRequest(event));
  expect(response.status).toBe(503);
  expect(await response.json()).toEqual({ error: "subscription_observation_conflict" });
  expect(competingWrites).toBe(4);
  expect(account(f).events[event.id]).toBeUndefined();
  expect(account(f).invoices[f.invoice.id]).toBeUndefined();
});

it("retries a committed renewal stop with the same token after losing the Stripe response", async () => {
  const f = await monthlyStripeFixture();
  const dispute = { id: "du_restart", payment_intent: f.payment.id, livemode: false, status: "needs_response" };
  f.disputes.push(dispute);
  const event = f.event("charge.dispute.created", dispute.id);
  const originalStop = f.provider.stopRenewal.bind(f.provider);
  const stop = vi.spyOn(f.provider, "stopRenewal").mockImplementationOnce(async (...args) => {
    await originalStop(...args);
    throw new Error("Fixture dropped the response after the provider write");
  });
  wire(f);
  expect((await POST(signedRequest(event))).status).toBe(503);
  expect(f.sub.cancel_at_period_end).toBe(true);
  expect(account(f).events[event.id]).toMatch(/^v2:/);
  expect(account(f).renewalStopJobs[f.sub.id].token).toBe(event.id);

  const restored = new MonthlyMemoryStore();
  restored.accounts = structuredClone(f.store.accounts);
  const service = wire(f, restored);
  const retry = await POST(signedRequest({ ...event, pending_webhooks: 0 }));
  expect(retry.status).toBe(200);
  expect(await retry.json()).toMatchObject({ result: "duplicate" });
  expect(stop.mock.calls).toEqual([[f.sub.id, event.id], [f.sub.id, event.id]]);
  const saved = restored.accounts.get("stripe-test:alice")!;
  expect(Object.keys(saved.events)).toEqual([event.id]);
  expect(saved.renewalStopJobs).toEqual({});
  expect(saved.contracts[f.sub.id].cancelAtPeriodEnd).toBe(true);
  expect((await service.status("alice")).entitled).toBe(false);
});
