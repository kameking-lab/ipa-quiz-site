import { describe, expect, it, vi } from "vitest";
import { memberExamEndTimestamp } from "@/lib/billing/exam-end";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { monthlyTerms } from "@/lib/billing/subscription/service";

const seconds = (value: string) => Date.parse(value) / 1000;
const cutoff = (day: string) => memberExamEndTimestamp(day, new Date("2026-02-01T00:00:00Z"))!;

async function paidFixture(original?: string) {
  const fixture = await monthlyStripeFixture(original ? { examEndAt: cutoff(original), exam: "ap" } : {});
  await fixture.service.receive(fixture.event(), "paid", fixture.provider);
  return {
    ...fixture,
    state: () => fixture.service.status("alice", fixture.result.orderId),
    clock: (value: number) => fixture.setClock(new Date(value * 1000)),
    change: (kind: "cancel" | "renew" | "exam", day?: string) => fixture.service.changeEnding("alice", fixture.result.orderId,
      kind === "exam" ? { kind, at: cutoff(day!) } : { kind }, fixture.provider),
    writes: () => vi.mocked(fixture.fetcher).mock.calls.filter(([, request]) => request?.method && request.method !== "GET")
      .filter(([url]) => String(url).includes("/subscriptions/")),
  };
}

describe("member controls for an existing Stripe subscription", () => {
  it("stops an ordinary monthly contract at its period end and retains access until then", async () => {
    const f = await paidFixture();
    const periodEnd = f.line.period.end;
    const before = await f.state();
    await expect(f.change("cancel")).resolves.toMatchObject({ management: { cancelAtPeriodEnd: true, examDate: null, periodEnd: before.expiresAt } });
    await f.change("cancel");
    expect(f.writes()).toHaveLength(1);
    expect(new URLSearchParams(f.writes()[0][1]?.body as URLSearchParams).get("cancel_at")).toBe(String(periodEnd));
    f.clock(periodEnd - 1);
    expect((await f.state()).entitled).toBe(true);
    f.clock(periodEnd);
    expect((await f.state()).entitled).toBe(false);
    Object.assign(f.sub, { status: "canceled", cancel_at: null, ended_at: periodEnd });
    await f.service.receive(f.event("customer.subscription.deleted", f.sub.id, "evt_member_cancel"), "ended", f.provider);
    expect(await f.state()).toMatchObject({ entitled: false, management: null, subscription: { status: "canceled" } });
  });

  it("sets, moves earlier, extends and removes the exam cutoff without touching the paid invoice", async () => {
    const f = await paidFixture();
    for (const day of ["2026-02-20", "2026-02-12", "2026-03-14"]) {
      await expect(f.change("exam", day)).resolves.toMatchObject({ management: { examDate: day, cancelAtPeriodEnd: false } });
    }
    const body = f.writes().map(([, request]) => new URLSearchParams(request?.body as URLSearchParams));
    expect(body.slice(0, 3).map(p => p.get("cancel_at"))).toEqual([String(f.line.period.end), null, String(seconds("2026-03-31T00:00:00Z"))]);
    await expect(f.change("renew")).resolves.toMatchObject({ management: { examDate: null, cancelAtPeriodEnd: false } });
    expect(f.sub).toMatchObject({ cancel_at: null, billing_cycle_anchor: f.line.period.start, latest_invoice: f.invoice.id });
    expect(f.payment.amount).toBe(980);
    expect(f.refunds).toEqual([]);
    expect(f.ledger).toEqual([]);
  });

  it("ends at midnight JST and clears Stripe without an invoice even when the funded period runs later", async () => {
    const f = await paidFixture();
    const date = "2026-02-15", end = cutoff(date);
    await f.change("exam", date);
    f.clock(end - 1);
    expect((await f.state()).entitled).toBe(true);
    f.clock(end);
    expect((await f.state()).entitled).toBe(false);
    await f.service.runExamEndCheck("alice", f.result.orderId, f.provider);
    expect(f.writes().filter(([, request]) => request?.method === "DELETE").map(([url]) => new URL(String(url)).search))
      .toEqual(["?invoice_now=false&prorate=false"]);
    expect((await f.state()).subscription?.status).toBe("canceled");
  });

  it("can cancel before a later exam and does not reopen the duplicate purchase path", async () => {
    const f = await paidFixture("2026-04-15");
    await expect(f.change("cancel")).resolves.toMatchObject({ management: { cancelAtPeriodEnd: true, examDate: null } });
    await expect(f.change("exam", "2026-05-15")).rejects.toMatchObject({ code: "subscription_ending_conflict" });
    await expect(f.service.checkout("alice", monthlyTerms(f.config), f.provider)).rejects.toMatchObject({ code: "subscription_exists" });
    f.clock(cutoff("2026-04-15"));
    await f.service.reconcileExamEnd("alice", f.result.orderId, f.provider);
    expect(f.writes().some(([, request]) => request?.method === "DELETE")).toBe(false);
  });

  it("disarms the original checkout cutoff and keeps the new date after a delayed notification", async () => {
    const f = await paidFixture("2026-02-11");
    const prior = cutoff("2026-02-11");
    await f.change("exam", "2026-02-21");
    f.clock(prior);
    await f.service.receive(f.event("customer.subscription.updated", f.sub.id, "evt_late_original"), "late", f.provider);
    await f.service.recoverElapsedExamEnds("alice", f.provider);
    expect(await f.state()).toMatchObject({ entitled: true, examPlan: { examDate: "2026-02-21" } });
    expect(f.writes().some(([, request]) => request?.method === "DELETE")).toBe(false);
  });

  it("recovers a saved Stripe change after the local transaction fails", async () => {
    const f = await paidFixture();
    f.store.fail = true;
    await expect(f.change("exam", "2026-02-12")).rejects.toThrow("commit failed");
    f.store.fail = false;
    await expect(f.change("exam", "2026-02-12")).resolves.toMatchObject({ management: { examDate: "2026-02-12" } });
    expect(f.writes()).toHaveLength(1);
  });

  it("keeps access through the restored period after a legacy shortened invoice was paid", async () => {
    const day = "2026-02-11";
    const f = await paidFixture(day);
    // Simulate a previously reconciled final cycle at the same original cutoff.
    const a = f.store.accounts.get("stripe-test:alice")!;
    a.invoices[f.invoice.id].examFinalCycle = true;
    a.invoices[f.invoice.id].periodEnd = cutoff(day);
    Object.assign(f.invoice, { billing_reason: "subscription_cycle" });
    f.line.period.end = cutoff(day);
    await f.change("exam", "2026-02-21");
    f.clock(cutoff(day));
    expect(await f.state()).toMatchObject({ entitled: true, expiresAt: new Date(cutoff("2026-02-21") * 1000).toISOString() });
    expect(f.payment.amount).toBe(980);
    expect(f.writes()).toHaveLength(2);
  });

  it("rejects other accounts and allows today's date right up to JST midnight", async () => {
    const f = await paidFixture();
    await expect(f.service.changeEnding("bob", f.result.orderId, { kind: "cancel" }, f.provider)).rejects.toMatchObject({ code: "subscription_missing" });
    expect(f.writes()).toHaveLength(0);
    const now = new Date("2026-02-01T14:59:59Z");
    expect(memberExamEndTimestamp("2026-01-31", now)).toBeNull();
    expect(memberExamEndTimestamp("2026-02-01", now)).toBe(seconds("2026-02-01T15:00:00Z"));
  });
});
