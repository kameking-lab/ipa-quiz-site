import { describe, it, expect, vi } from "vitest";
import { fixture } from "./stripe-fixture";

describe("provider finance extraction with synthetic HTTP only", () => {
  it("gets confirmed gross and a null paid date from refund-first, never Charge/Refund.created", async () => {
    const f = fixture(); f.refund.status = "succeeded"; f.purchase.sessionId = null;
    Object.assign(f.refund, { created: 100 }); Object.assign(f.intent.latest_charge, { created: 200 });
    const event = { ...f.event("refund.updated"), created: 300 };
    const s = await f.provider.snapshot(event, "hash");
    expect(s?.finance?.grossJPY).toBe(980); expect(s?.finance?.paidTime.at).toBeNull();
    expect(s?.finance?.refunds[0].successTime?.at).toBeNull();
  });
  it.each(["payment_intent.succeeded", "checkout.session.completed", "checkout.session.async_payment_succeeded"])("dates %s only from matching signed success payload", async type => {
    const f = fixture(); const e = { ...f.event(type), created: 1792886400,
      data: { object: type === "payment_intent.succeeded" ? { ...f.intent } : { ...f.session, payment_intent: f.intent.id } } };
    const s = await f.provider.snapshot(e, "hash");
    expect(s?.finance?.paidTime).toEqual({ at: "2026-10-25T00:00:00.000Z", provenance: {
      kind: "stripe_success_event_created", eventId: e.id, eventType: type, providerCreatedSeconds: e.created } });
    Object.assign(e.data.object, { status: "processing", payment_status: "unpaid" });
    expect((await f.provider.snapshot(e, "hash"))?.finance?.paidTime.at).toBeNull();
  });
  it("a historical pending event cannot acquire success time from today's provider status", async () => {
    const f = fixture(); f.refund.status = "succeeded";
    const e = { ...f.event("refund.created"), created: 100, data: { object: { ...f.refund, status: "pending", created: 50 } } };
    const s = await f.provider.snapshot(e, "hash");
    expect(s?.finance?.refunds[0].state).toBe("succeeded"); expect(s?.finance?.refunds[0].successTime?.at).toBeNull();
  });
  it("failed now plus old signed success keeps historical success evidence without effective refund", async () => {
    const f = fixture(); f.refund.status = "failed";
    const e = { ...f.event("refund.updated"), created: 100, data: { object: { ...f.refund, status: "succeeded" } } };
    const s = await f.provider.snapshot(e, "hash");
    expect(s?.state).toBe("paid"); expect(s?.finance?.refunds[0].state).toBe("failed");
    expect(s?.finance?.refunds[0].successTime?.at).toBe("1970-01-01T00:01:40.000Z");
  });
  it("signed failure corrects a stale successful API read; charge aggregate is not invented refund money", async () => {
    const f = fixture(); f.refund.status = "succeeded"; f.intent.latest_charge.amount_refunded = 980;
    const e = { ...f.event("refund.failed"), data: { object: { ...f.refund, status: "failed" } } };
    const s = await f.provider.snapshot(e, "hash");
    expect(s?.state).toBe("paid"); expect(s?.finance?.refunds[0].state).toBe("failed");
    expect(s?.finance?.refunds[0].amountJPY).toBe(100); expect(s?.finance?.refunds[0].successTime?.at).toBeNull();
  });
  it("retrieves every refund page and fails without acknowledging a partial or repeated page", async () => {
    for (const failure of [false, true, "duplicate"] as const) {
      const f = fixture(); const original = vi.mocked(f.fetcher).getMockImplementation()!;
      vi.mocked(f.fetcher).mockImplementation(async (url, init) => {
        if (!String(url).includes("/refunds?")) return original(url, init);
        if (!String(url).includes("starting_after=")) return Response.json({ data: [{ ...f.refund, id: "re_first", status: "succeeded" }], has_more: true });
        if (failure === true) return new Response("private", { status: 500 });
        return Response.json({ data: [{ ...f.refund, id: failure ? "re_first" : "re_second", status: "succeeded", amount: 200 }], has_more: false });
      });
      if (failure) await expect(f.provider.snapshot(f.event(), "hash")).rejects.toThrow();
      else {
        const s = await f.provider.snapshot(f.event(), "hash");
        expect(s?.finance?.refunds.map(r => r.refundId)).toEqual(["re_first", "re_second"]);
        expect(vi.mocked(f.fetcher).mock.calls.some(([url]) => String(url).includes("starting_after=re_first"))).toBe(true);
      }
    }
  });
  it("rejects unrelated refund payment/currency/amount and mismatched PI or metadata", async () => {
    for (const patch of [{ payment_intent: "pi_other" }, { currency: "usd" }, { amount: 0 }, { amount: 0.5 }]) {
      const f = fixture(); Object.assign(f.refund, patch);
      await expect(f.provider.snapshot(f.event("refund.updated"), "hash")).rejects.toThrow();
    }
    const f = fixture(); f.intent.amount_received = 100;
    await expect(f.provider.snapshot(f.event(), "hash")).rejects.toThrow();
  });
  it("accepts non-card provider refund IDs without losing the whole list", async () => {
    const f = fixture(); f.refunds.push({ ...f.refund, id: "pyr_fixture", status: "succeeded" });
    const s = await f.provider.snapshot(f.event(), "hash");
    expect(s?.finance?.refunds[0].refundId).toBe("pyr_fixture");
  });
  it("chargeback restricts entitlement but creates no refund IDs or refund amount", async () => {
    const f = fixture(); f.intent.latest_charge.disputed = true;
    const s = await f.provider.snapshot(f.event("charge.dispute.created"), "hash");
    expect(s?.state).toBe("refunded"); expect(s?.finance?.disputeObserved).toBe(true);
    expect(s?.finance?.refunds).toEqual([]); expect(s?.finance?.grossJPY).toBe(980);
  });
});
