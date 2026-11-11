// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { BillingService } from "@/lib/billing/service";
const wiring = vi.hoisted(() => ({ service: null as BillingService | null }));
vi.mock("@/lib/billing/runtime", () => ({
  billingIdentity: async () => "alice", // Test-only identity double; no real session or auth claim.
  billingRuntime: () => ({ service: wiring.service! }),
  json: (value: unknown) => Response.json(value),
  billingFailure: () => Response.json({ error: "billing_unavailable" }, { status: 503 }),
}));
import CancelPage from "@/app/billing/cancel/page";
import { GET } from "@/app/api/billing/status/route";
import { BillingService as Service } from "@/lib/billing/service";
import { fixture } from "./stripe-fixture";
let f: ReturnType<typeof fixture>;
beforeEach(() => {
  f = fixture(); f.config.sourceInstance = "cancel-return-fixture";
  wiring.service = new Service(f.store, f.config, () => new Date("2026-10-26T14:00:00Z"));
  localStorage.setItem("test-learning-history", "existing-history");
  vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, options?: RequestInit) => {
    if (String(input) === "/api/funnel" || String(input) === "/api/activity") return new Response(null, { status: 204 });
    if (String(input) !== `/api/billing/status?order=${f.purchase.id}` || (options?.method && options.method !== "GET")) {
      throw Error("unexpected_network_or_mutation");
    }
    return GET(new Request(`http://localhost:3328${input}`));
  }));
});
afterEach(() => { cleanup(); localStorage.clear(); wiring.service = null; vi.unstubAllGlobals(); });

describe("cancel return page, real status route/service with memory and identity doubles", () => {
  it.each(["pending", "paid"] as const)("return and refresh preserve %s order, entitlement and history", async state => {
    if (state === "paid") {
      const snapshot = await f.provider.snapshot(f.event(), "offline-paid-fixture");
      await wiring.service!.receive(snapshot!);
    }
    const before = structuredClone({ purchases: f.store.purchases, events: f.store.events, finances: f.store.finances });
    const view = render(await CancelPage({ searchParams: Promise.resolve({ order: f.purchase.id }) }));
    await waitFor(() => expect(screen.getByRole("status").textContent).toContain(state === "paid" ? "プランをご利用いただけます" : "再購入は不要です"));
    if (state === "paid") {
      view.unmount();
      render(await CancelPage({ searchParams: Promise.resolve({ order: f.purchase.id }) }));
    } else {
      fireEvent.click(screen.getByRole("button", { name: "購入状況を再確認" }));
    }
    await waitFor(() => expect(vi.mocked(fetch).mock.calls.filter(([input]) => String(input).startsWith("/api/billing/status?"))).toHaveLength(2));
    expect(await wiring.service!.status("alice", f.purchase.id)).toMatchObject({ entitled: state === "paid", purchase: { status: state } });
    expect({ purchases: f.store.purchases, events: f.store.events, finances: f.store.finances }).toEqual(before);
    expect(localStorage.getItem("test-learning-history")).toBe("existing-history");
    expect(vi.mocked(fetch).mock.calls.filter(([input]) => String(input).startsWith("/api/billing/")).every(([, init]) => !init?.method || init.method === "GET")).toBe(true);
  });
});
