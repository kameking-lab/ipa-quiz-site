import { describe, expect, it, vi } from "vitest";
import { monthlyFixture, MonthlyMemoryStore, monthlyFixtureConfig } from "./monthly-fixture";
import { MonthlyService, monthlyTerms } from "@/lib/billing/subscription/service";

describe("monthly contract and invoice lifecycle (offline transactional fixture)", () => {
  it("returns pending status before any contract is attached and expired status after abandoning Checkout", async () => {
    const f = await monthlyFixture(); expect((await f.service.status("alice", f.checkout.orderId)).purchase).toMatchObject({ status: "pending", expiresAt: null });
    f.account().signups[f.checkout.orderId].state = "expired";
    expect((await f.service.status("alice", f.checkout.orderId)).purchase).toMatchObject({ status: "expired", expiresAt: null });
  });
  it("accepts unchanged allocations after JSONB changes object key order", async () => {
    const f = await monthlyFixture(); await f.send();
    f.account().invoices.in_jan.payments = f.account().invoices.in_jan.payments.map(p => ({ amount: p.amount, paymentId: p.paymentId, id: p.id }));
    await expect(f.send("evt_jsonb")).resolves.toBe("processed");
  });
  it("uses the paid monthly interval, never receipt time plus 30 days", async () => {
    const f = await monthlyFixture(); f.setNow("2026-02-10T00:00:00Z"); await f.send();
    expect((await f.service.status("alice")).expiresAt).toBe("2026-02-28T00:00:00.000Z");
    f.setNow("2026-02-28T00:00:00Z"); expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("does not grant from active status without a confirmed invoice", async () => {
    const f = await monthlyFixture(); f.observation.invoices[0].paid = false; f.observation.invoices[0].payments = []; await f.send();
    expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it("deduplicates receipts and rejects changed bodies", async () => {
    const f = await monthlyFixture(); await f.send(); expect(await f.send()).toBe("duplicate");
    await expect(f.send("evt_monthly", "different")).rejects.toMatchObject({ code: "event_conflict" });
    expect(Object.keys(f.account().invoices)).toEqual(["in_jan"]);
  });
  it("retains paid history when an older failed invoice observation arrives", async () => {
    const f = await monthlyFixture(); await f.send(); f.observation.invoices[0].paid = false; f.observation.invoices[0].payments = [];
    await f.send("evt_old_failure"); expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("keeps access until period end after cancellation is scheduled", async () => {
    const f = await monthlyFixture(); f.observation.contracts[0].cancelAtPeriodEnd = true; await f.send();
    expect((await f.service.status("alice")).entitled).toBe(true);
    f.setNow("2026-02-28T00:00:00Z"); f.observation.contracts[0].status = "canceled"; await f.send("evt_deleted");
    expect((await f.service.status("alice")).entitled).toBe(false);
  });
  it.each(["incomplete", "past_due", "unpaid", "paused"] as const)("prevents a second contract while %s", async status => {
    const f = await monthlyFixture(); f.observation.contracts[0].status = status; await f.send();
    await expect(f.service.checkout("alice", monthlyTerms(f.config), f.provider)).rejects.toMatchObject({ code: "subscription_exists" });
  });
  it("uses the same durable signup under concurrent retries and times out conservatively", async () => {
    const f = await monthlyFixture(); const results = await Promise.all([1, 2, 3].map(() => f.service.checkout("alice", monthlyTerms(f.config), f.provider)));
    expect(new Set(results.map(r => r.orderId)).size).toBe(1); expect(f.provider.checkout).toHaveBeenCalledTimes(1);
    f.setNow("2026-02-01T00:00:00Z"); await expect(f.service.checkout("alice", monthlyTerms(f.config), f.provider)).rejects.toMatchObject({ code: "pending_subscription_contact_support" });
  });
  it("partial refund preserves the paid period and renewal", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].refunds.re_one = { id: "re_one", amount: 100, state: "succeeded" }; await f.send();
    expect((await f.service.status("alice")).entitled).toBe(true); expect(f.provider.stopRenewal).not.toHaveBeenCalled();
  });
  it("pending refund does not withhold paid access and terminal correction cannot regress", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].refunds.re_one = { id: "re_one", amount: 100, state: "pending" }; await f.send();
    expect((await f.service.status("alice")).entitled).toBe(true);
    f.observation.payments[0].refunds.re_one.state = "canceled"; await f.send("evt_refund_canceled");
    f.observation.payments[0].refunds.re_one.state = "pending"; await f.send("evt_stale_pending");
    expect((await f.service.status("alice")).expiresAt).toBe("2026-02-28T00:00:00.000Z");
  });
  it("durably revokes already-paid access even when stopping future billing fails; duplicate retries the outbox", async () => {
    const f = await monthlyFixture(); await f.send("evt_paid"); expect((await f.service.status("alice")).entitled).toBe(true);
    f.observation.payments[0].disputes.du_one = "open";
    vi.mocked(f.provider.stopRenewal).mockRejectedValueOnce(new Error("provider failure"));
    await expect(f.send()).rejects.toThrow(); expect((await f.service.status("alice")).entitled).toBe(false);
    expect(f.account().renewalStopJobs.sub_monthly.token).toBe("evt_monthly");
    expect(await f.send()).toBe("duplicate"); expect(f.account().contracts.sub_monthly.renewalBlocked).toBe(true);
    expect(f.account().renewalStopJobs).toEqual({});
  });
  it("rolls back a persistence failure and uses the same event on recovery", async () => {
    const f = await monthlyFixture(); f.store.fail = true; await expect(f.send()).rejects.toThrow("commit failed");
    expect(f.account().invoices).toEqual({}); f.store.fail = false; await f.send(); expect((await f.service.status("alice")).entitled).toBe(true);
  });
  it("rejects a contract that belongs to another signup/customer", async () => {
    const f = await monthlyFixture(); f.observation.contracts[0].customerId = "cus_bob";
    await expect(f.send()).rejects.toMatchObject({ code: "subscription_owner_mismatch" }); expect(f.account().events).toEqual({});
  });
  it("free quota is 10 distinct questions per JST day, preserving account identity", async () => {
    const f = await monthlyFixture(); for (let n = 0; n < 10; n++) await f.service.grant("alice", `q${n}`);
    expect((await f.service.grant("alice", "q0")).remaining).toBe(0);
    await expect(f.service.grant("alice", "q10")).rejects.toMatchObject({ code: "daily_limit" });
    f.setNow("2026-01-31T15:00:00Z"); expect((await f.service.grant("alice", "q10")).remaining).toBe(9); expect(f.account().userId).toBe("alice");
  });
  it("portal uses the persisted owner, never a caller supplied customer", async () => {
    const f = await monthlyFixture(); await f.service.portal("alice", f.provider);
    expect(f.provider.portal).toHaveBeenCalledWith("cus_alice", "bpc_fixture");
    await expect(f.service.portal("bob", f.provider)).rejects.toMatchObject({ code: "subscription_missing" });
  });
  it("serializes simultaneous FIRST signups around one customer and idempotency identity", async () => {
    const f = await monthlyFixture(), store = new MonthlyMemoryStore(), service = new MonthlyService(store, monthlyFixtureConfig);
    vi.mocked(f.provider.checkout).mockClear();
    const result = await Promise.all([0, 1, 2].map(() => service.checkout("alice", monthlyTerms(monthlyFixtureConfig), f.provider)));
    expect(new Set(result.map(r => r.orderId)).size).toBe(1);
    const calls = vi.mocked(f.provider.checkout).mock.calls;
    expect(new Set(calls.map(([customer, signup]) => `${customer}:${signup.id}`)).size).toBe(1);
    expect(Object.keys(store.accounts.get("stripe-test:alice")!.signups)).toHaveLength(1);
  });
  it("renews for a distinct invoice, suspends at its unpaid boundary, then recovers only that period", async () => {
    const f = await monthlyFixture(); await f.send("evt_jan"); f.setNow("2026-02-28T00:00:00Z");
    const nextStart = f.observation.invoices[0].periodEnd, nextEnd = Date.parse("2026-03-31T00:00:00Z") / 1000;
    Object.assign(f.observation.contracts[0], { status: "past_due", periodStart: nextStart, periodEnd: nextEnd });
    Object.assign(f.observation.invoices[0], { id: "in_feb", periodStart: nextStart, periodEnd: nextEnd, paid: false, payments: [] });
    f.observation.payments = []; await f.send("evt_update_failed"); expect((await f.service.status("alice")).entitled).toBe(false);
    f.setNow("2026-03-04T00:00:00Z"); f.observation.contracts[0].status = "active";
    f.observation.invoices[0].paid = true; f.observation.invoices[0].payments = [{ id: "inpay_feb", paymentId: "pi_feb", amount: 980 }];
    f.observation.payments = [{ id: "pi_feb", customerId: "cus_alice", amount: 980, refunds: {}, disputes: {} }];
    await f.send("evt_recovered"); expect((await f.service.status("alice")).expiresAt).toBe("2026-03-31T00:00:00.000Z");
    expect(Object.keys(f.account().invoices)).toHaveLength(2); expect(Object.keys(f.account().payments)).toHaveLength(2);
  });
  it("permits cancellation withdrawal without changing invoice entitlement", async () => {
    const f = await monthlyFixture(); f.observation.contracts[0].cancelAtPeriodEnd = true; await f.send("evt_cancel");
    f.observation.contracts[0].cancelAtPeriodEnd = false; await f.send("evt_resume");
    expect((await f.service.status("alice")).subscription?.cancelAtPeriodEnd).toBe(false);
    expect((await f.service.status("alice")).expiresAt).toBe("2026-02-28T00:00:00.000Z");
  });
  it("rejoins after completed cancellation; old deleted notifications cannot revoke the new contract", async () => {
    const f = await monthlyFixture(); await f.send("evt_first");
    f.observation.contracts[0].status = "canceled"; await f.send("evt_deleted");
    vi.mocked(f.provider.checkout).mockResolvedValue({ id: "cs_test_rejoin", url: "https://checkout.stripe.com/c/pay/rejoin" });
    const rejoin = await f.service.checkout("alice", monthlyTerms(f.config), f.provider);
    const oldContract = structuredClone(f.observation.contracts[0]);
    Object.assign(f.observation.contracts[0], { id: "sub_rejoin", signupId: rejoin.orderId, status: "active" });
    Object.assign(f.observation.invoices[0], { id: "in_rejoin", subscriptionId: "sub_rejoin", payments: [{ id: "inpay_rejoin", paymentId: "pi_rejoin", amount: 980 }] });
    f.observation.payments[0].id = "pi_rejoin"; await f.send("evt_new_paid");
    f.observation.contracts = [oldContract]; f.observation.invoices = []; f.observation.payments = [];
    await f.send("evt_old_deleted_again"); expect((await f.service.status("alice")).entitled).toBe(true);
    expect(f.account().contracts.sub_rejoin.status).toBe("active");
  });
  it("rejects over-allocation of one payment and reassignment of an invoice-payment ID", async () => {
    const f = await monthlyFixture(); const duplicate = structuredClone(f.observation.invoices[0]); duplicate.id = "in_second";
    duplicate.payments[0].id = "inpay_second"; f.observation.invoices.push(duplicate);
    await expect(f.send()).rejects.toMatchObject({ code: "payment_allocation_overflow" });
    f.observation.payments[0].amount = 1960; await f.send("evt_valid_split");
    expect(Object.keys(f.account().invoices)).toHaveLength(2);
    f.observation.invoices[1].payments[0].id = "inpay_jan";
    await expect(f.send("evt_reassign")).rejects.toMatchObject({ code: "invoice_allocation_changed" });
  });
  it("does not erase a newer renewal-stop job when an older provider request completes", async () => {
    const f = await monthlyFixture(); f.observation.payments[0].disputes.du_one = "open";
    vi.mocked(f.provider.stopRenewal).mockImplementationOnce(async () => {
      await f.store.transaction("alice", "stripe-test", f.config.sourceInstance, async a => { a.renewalStopJobs.sub_monthly = { token: "evt_newer", reason: "dispute" }; });
    });
    await expect(f.send()).rejects.toMatchObject({ code: "renewal_stop_pending" });
    expect(f.account().renewalStopJobs.sub_monthly.token).toBe("evt_newer"); await f.send(); expect(f.account().renewalStopJobs).toEqual({});
  });
  it("reports paid while pending and refunded only after a full refund succeeds", async () => {
    const f = await monthlyFixture(); await f.send("evt_paid"); f.observation.payments[0].refunds.re_one = { id: "re_one", amount: 980, state: "pending" };
    await f.send("evt_pending"); expect((await f.service.status("alice", f.checkout.orderId)).purchase?.status).toBe("paid");
    f.observation.payments[0].refunds.re_one.state = "succeeded"; await f.send("evt_refunded");
    expect((await f.service.status("alice", f.checkout.orderId)).purchase?.status).toBe("refunded");
  });
});
