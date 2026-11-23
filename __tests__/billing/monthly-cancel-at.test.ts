import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
import { projectMonthlyFinanceSnapshot } from "@/lib/billing/subscription/finance";
const wiring=vi.hoisted(()=>({runtime:null as unknown}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>wiring.runtime}));
vi.mock("@/lib/billing/runtime",()=>({json:(v:unknown)=>Response.json(v),billingFailure:(e:{status?:number;code?:string})=>Response.json({error:e.code??"unavailable"},{status:e.status??503})}));
import { POST as webhook } from "@/app/api/billing/webhook/route";
const secret="whsec_public_cancel_at_fixture";
beforeEach(()=>{
 vi.stubGlobal("fetch",()=>{throw new Error("External fetch forbidden");});
 for(const [k,v] of Object.entries({BILLING_PRODUCT:"subscription",BILLING_WEBHOOK_MODE:"stripe-test",BILLING_SOURCE_INSTANCE:"monthly-fixture",BILLING_ORIGIN:"http://localhost:3338",BILLING_STRIPE_TEST_WEBHOOK_SECRET:secret}))vi.stubEnv(k,v);
});

describe("exam cancellation reconciliation", () => {
 const end = Date.parse("2026-02-03T15:00:00Z") / 1000;
 const trialEnd = Date.parse("2026-02-07T00:00:00Z") / 1000;
 async function trialFixture() {
  const f = await monthlyStripeFixture({ trialDays: 7, examEndAt: end, exam: "ip" });
  Object.assign(f.sub, { status: "trialing", trial_end: trialEnd, default_payment_method: "pm_trial" });
  f.sub.items.data[0].current_period_end = trialEnd;
  Object.assign(f.invoice, { total: 0, amount_due: 0, amount_paid: 0 });
  return f;
 }

 it("accepts a shortened flexible trial and reopens purchase after the terminal event", async () => {
  const f = await trialFixture();
  await f.service.receive(f.event(), "trial", f.provider);
  expect(f.sub.items.data[0].current_period_end).toBe(end);
  expect(await f.service.status("alice", f.result.orderId)).toMatchObject({ entitled: true,
   examPlan: { exam: "ip", examDate: "2026-02-03" }, subscription: { examCancelAt: new Date(end * 1000).toISOString() } });
  f.setClock(new Date(end * 1000));
  Object.assign(f.sub, { status: "canceled", cancel_at: null, ended_at: end });
  const deletion = f.event("customer.subscription.deleted", f.sub.id, "evt_exam_end");
  expect(await f.service.receive(deletion, "end", f.provider)).toBe("processed");
  expect(await f.service.receive(deletion, "end", f.provider)).toBe("duplicate");
  expect((await f.service.status("alice")).trialDays).toBe(0);
  const rejoined = await f.service.checkout("alice", account(f).signups[f.result.orderId].terms, f.provider);
  expect(rejoined.orderId).not.toBe(f.result.orderId);
 });

 it("reconciles a completed Checkout after the deadline, without a new invoice or event", async () => {
  const f = await trialFixture();
  f.setClock(new Date((end + 60) * 1000));
  await f.service.reconcileExamEnd("alice", f.result.orderId, f.provider);
  await f.service.reconcileExamEnd("alice", f.result.orderId, f.provider);
  const deletes = vi.mocked(f.fetcher).mock.calls.filter(([, init]) => init?.method === "DELETE");
  expect(deletes).toHaveLength(1);
  expect(String(deletes[0][0])).toContain("invoice_now=false&prorate=false");
  expect(account(f).invoices).toEqual({});
  expect(account(f).events).toEqual({});
  expect((await f.service.status("alice", f.result.orderId)).purchase?.status).toBe("expired");
 });

 it("honors the exam cutoff while Stripe is still applying it", async () => {
  const f = await trialFixture();
  vi.spyOn(f.provider, "scheduleExamEnd").mockRejectedValueOnce(new Error("temporary Stripe failure"));
  await expect(f.service.receive(f.event(), "initial", f.provider)).rejects.toThrow("temporary Stripe failure");
  expect(await f.service.status("alice", f.result.orderId)).toMatchObject({
   entitled: true, expiresAt: new Date(end * 1000).toISOString(), purchase: { examEndPending: true },
  });
  f.setClock(new Date(end * 1000));
  expect((await f.service.status("alice", f.result.orderId)).entitled).toBe(false);
  await f.service.reconcileExamEnd("alice", f.result.orderId, f.provider);
  expect((await f.service.status("alice", f.result.orderId)).purchase?.status).toBe("expired");
 });

 it("grants verified access for a prorated final exam renewal up to the exam cutoff", async () => {
  const cutoff = Date.parse("2026-03-16T15:00:00Z") / 1000;
  const f = await monthlyStripeFixture({ examEndAt: cutoff, exam: "ip" });
  await f.service.receive(f.event(), "first-month", f.provider);
  const start = f.line.period.end, amount = 520;
  f.setClock(new Date((start + 60) * 1000));
  expect((await f.service.status("alice")).entitled).toBe(false);

  Object.assign(f.invoice, { id: "in_final", billing_reason: "subscription_cycle", total: amount, amount_due: amount, amount_paid: amount });
  Object.assign(f.line, { amount, period: { start, end: cutoff } });
  f.line.parent.subscription_item_details.proration = true;
  Object.assign(f.allocation, { id: "inpay_final", invoice: f.invoice.id, payment: { type: "payment_intent", payment_intent: "pi_final" }, amount_paid: amount });
  Object.assign(f.payment, { id: "pi_final", amount, amount_received: amount });
  Object.assign(f.sub.items.data[0], { current_period_start: start, current_period_end: cutoff });
  f.sub.latest_invoice = f.invoice.id;

  const renewal = f.event("invoice.paid", f.invoice.id, "evt_final");
  await expect(f.service.receive(renewal, "final-month", f.provider)).resolves.toBe("processed");
  expect(await f.service.status("alice")).toMatchObject({ entitled: true, expiresAt: new Date(cutoff * 1000).toISOString() });
  f.setClock(new Date(cutoff * 1000));
  expect((await f.service.status("alice")).entitled).toBe(false);
 });

 it.each(["subscription_create", "subscription_cycle"])("rejects a prorated %s invoice outside the final exam renewal", async reason => {
  const f = await monthlyStripeFixture();
  f.invoice.billing_reason = reason;
  f.line.parent.subscription_item_details.proration = true;
  await expect(f.service.receive(f.event(), "unexpected-proration", f.provider)).rejects.toMatchObject({ code: "unsupported_invoice" });
  expect((await f.service.status("alice")).entitled).toBe(false);
 });

 it("recovers an elapsed Web contract before reserving App Store purchase", async () => {
  const f = await trialFixture();
  await f.service.receive(f.event(), "trial", f.provider);
  f.setClock(new Date(end * 1000));
  const promise = f.service.reserveAppStorePurchase("alice", f.provider, async () => {}, async () => {}, {}, Date.now());
  await expect(promise).resolves.toHaveProperty("id");
  expect(account(f).contracts.sub_monthly.status).toBe("canceled");
 });

 it("records and notifies an invoice that arrives after cancellation only once", async () => {
  const review = vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
  const f = await monthlyStripeFixture({ examEndAt: end, reviewExamCharge: review });
  await f.service.receive(f.event(), "paid", f.provider);
  f.setClock(new Date((end + 3600) * 1000));
  await f.service.recoverElapsedExamEnds("alice", f.provider);
  Object.assign(f.invoice, { id: "in_late", billing_reason: "subscription_cycle" });
  f.sub.latest_invoice = f.invoice.id;
  f.line.period = { start: end, end: end + 28 * 86400 };
  Object.assign(f.allocation, { id: "inpay_late", invoice: f.invoice.id, payment: { type: "payment_intent", payment_intent: "pi_late" } });
  f.payment.id = "pi_late";
  const event = f.event("invoice.paid", f.invoice.id, "evt_late");
  expect(await f.service.receive(event, "late", f.provider)).toBe("processed");
  expect(account(f).signups[f.result.orderId].examChargeReviews).toEqual({ in_late: "pending" });
  expect(await f.service.receive(event, "late", f.provider)).toBe("duplicate");
  expect(await f.service.receive(event, "late", f.provider)).toBe("duplicate");
  expect(review.mock.calls).toEqual([[f.result.orderId, "in_late"], [f.result.orderId, "in_late"]]);
  expect(account(f).signups[f.result.orderId].examChargeReviews).toEqual({ in_late: "notified" });
  expect((await f.service.status("alice")).entitled).toBe(false);
 });

 it("keeps refund review eligible when the first observation is already terminal and never scheduled", async () => {
  const review = vi.fn().mockResolvedValue(true);
  const f = await monthlyStripeFixture({ examEndAt: end, reviewExamCharge: review });
  f.setClock(new Date((end + 3600) * 1000));
  Object.assign(f.sub, { status: "canceled", cancel_at: null, ended_at: end + 3600 });
  Object.assign(f.invoice, { billing_reason: "subscription_cycle" });
  f.line.period = { start: end, end: end + 28 * 86400 };
  await f.service.receive(f.event(), "late", f.provider);
  expect(review).toHaveBeenCalledOnce();
  expect(review).toHaveBeenCalledWith(f.result.orderId, f.invoice.id);
 });

 it("clears a verified 32-yen final balance once and prepares a new Checkout at 980 yen", async () => {
  const trial = await monthlyStripeFixture({ examEndAt: end });
  Object.assign(trial.sub, { cancel_at: end });
  trial.sub.items.data[0].current_period_end = end;
  Object.assign(trial.invoice, { billing_reason: "subscription_cycle", total: 32, amount_due: 0, amount_paid: 0 });
  trial.line.amount = 32;
  trial.line.period.end = end;
  await expect(trial.service.receive(trial.event(), "small", trial.provider)).rejects.toMatchObject({ code: "unverified_invoice_balance" });
  trial.invoice.ending_balance = 32;
  trial.addBalance("invoice_too_small", 32, trial.invoice.id);
  const clear = trial.provider.clearSmallExamBalance.bind(trial.provider);
  vi.spyOn(trial.provider, "clearSmallExamBalance").mockImplementationOnce(async (customer, invoice) => {
   expect(account(trial).signups[trial.result.orderId].examWriteOffJobs).toEqual([invoice.id]);
   trial.addBalance("adjustment", -100, null);
   return clear(customer, invoice);
  });
  await trial.service.receive(trial.event(), "small", trial.provider);
  expect(trial.customer.balance).toBe(-100);
  expect(trial.adjustments.size).toBe(1);
  await trial.provider.clearSmallExamBalance(trial.customer.id, account(trial).invoices[trial.invoice.id]);
  expect(trial.adjustments.size).toBe(1);
  expect(await trial.service.status("alice")).toMatchObject({ entitled: true, expiresAt: new Date(end * 1000).toISOString() });
  const cash = (f: typeof trial) => projectMonthlyFinanceSnapshot([account(f)], f.config.sourceInstance, f.config.mode, new Date().toISOString()).totals;
  expect(cash(trial).confirmedGrossJPY).toBe(0);
  trial.setClock(new Date((end + 60) * 1000));
  Object.assign(trial.sub, { status: "canceled", ended_at: end });
  await trial.service.receive(trial.event("customer.subscription.deleted", trial.sub.id, "evt_ended"), "ended", trial.provider);
  expect(trial.adjustments.size).toBe(1);
  const next = await trial.service.checkout("alice", account(trial).signups[trial.result.orderId].terms, trial.provider);
  expect(account(trial).signups[next.orderId].amount).toBe(980);
  expect(trial.customer.balance).toBe(-100);
 });

 it.each(["draft", "open", "paid"])("settles a delayed %s final invoice when the buyer next applies", async status => {
  const f = await monthlyStripeFixture({ examEndAt: end });
  await f.service.receive(f.event(), "initial", f.provider);
  f.setClock(new Date((end + 60) * 1000));
  Object.assign(f.sub, { ended_at: end, status: "canceled" });
  await f.service.receive(f.event("customer.subscription.deleted", f.sub.id, "evt_closed"), "closed", f.provider);
  Object.assign(f.invoice, { id: "in_delayed", billing_reason: "subscription_cycle", total: 32, amount_due: 0, amount_paid: 0,
   status, ending_balance: status === "paid" ? 32 : null });
  f.sub.latest_invoice = f.invoice.id;
  f.line.amount = 32;
  f.line.period.end = end;
  if (status === "paid") f.addBalance("invoice_too_small", 32, f.invoice.id);
  const next = await f.service.checkout("alice", account(f).signups[f.result.orderId].terms, f.provider);
  expect(next.orderId).not.toBe(f.result.orderId);
  expect(f.customer.balance).toBe(0);
  expect(f.invoice.status).toBe(status === "paid" ? "paid" : "void");
  expect(account(f).signups[f.result.orderId].examWriteOffJobs).toEqual([]);
 });

 it("commits the notice even if the balance write fails, then retries on the next application", async () => {
  const reviewPurchase = vi.fn().mockResolvedValue(true);
  const f = await monthlyStripeFixture({ examEndAt: end, reviewPurchase });
  f.setClock(new Date((end + 60) * 1000));
  Object.assign(f.sub, { cancel_at: end, ended_at: end, status: "canceled" });
  Object.assign(f.invoice, { billing_reason: "subscription_cycle", total: 32, amount_due: 0, amount_paid: 0, ending_balance: 32 });
  f.line.amount = 32;
  f.line.period.end = end;
  f.addBalance("invoice_too_small", 32, f.invoice.id);
  f.fail("customers/cus_monthly/balance_transactions");
  expect(await f.service.receive(f.event(), "delayed", f.provider)).toBe("processed");
  expect(account(f).signups[f.result.orderId].examWriteOffJobs).toEqual([f.invoice.id]);
  expect(reviewPurchase).toHaveBeenCalledWith(f.result.orderId, "exam_writeoff");
  f.fail("");
  await f.service.checkout("alice", account(f).signups[f.result.orderId].terms, f.provider);
  expect(f.customer.balance).toBe(0);
  expect(f.adjustments.size).toBe(1);
 });

 it.each([false, true])("reactivates Checkout without visiting the success page (exam end %s)", async automatic => {
  const back = "/quiz?mode=year&question=ip-q1";
  const f = await monthlyStripeFixture({ examEndAt: automatic ? end : undefined, returnTo: back });
  const signup = account(f).signups[f.result.orderId];
  const result = await f.service.checkout("alice", signup.terms, f.provider, undefined, undefined, undefined, automatic ? end : undefined);
  expect(result).toMatchObject({ orderId: signup.id, url: `/billing/success?order=${signup.id}`, recovered: true });
  expect((await f.service.status("alice", signup.id)).purchase).toMatchObject({ status: "paid", returnTo: encodeURI(back) });
  await f.service.receive(f.event("checkout.session.completed", f.session.id), "late", f.provider);
  expect(Object.keys(account(f).contracts)).toHaveLength(1);
  expect(Object.keys(account(f).invoices)).toHaveLength(1);
 });

 it("confirms a completed trial with a delayed webhook, scoped to the buyer", async () => {
  const f = await trialFixture();
  await expect(f.service.confirmCheckout("bob", f.result.orderId, f.provider)).rejects.toMatchObject({ code: "purchase_not_found" });
  expect(await f.service.confirmCheckout("alice", f.result.orderId, f.provider)).toMatchObject({
   entitled: true, purchase: { id: f.result.orderId, status: "paid" }, subscription: { examCancelAt: new Date(end * 1000).toISOString() },
  });
  await f.service.receive(f.event("checkout.session.completed", f.session.id), "delayed", f.provider);
  expect(Object.values(account(f).contracts)).toHaveLength(1);
  expect(account(f).invoices).toEqual({});
 });
});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
const account=(f:Awaited<ReturnType<typeof monthlyStripeFixture>>)=>f.store.accounts.get("stripe-test:alice")!;

it("recovers an attached order before the delayed payment notification arrives", async () => {
  const returnTo = "/me?exam=ip";
  const f = await monthlyStripeFixture({ returnTo });
  Object.assign(f.invoice, { status: "open", amount_paid: 0 });
  await f.service.receive(f.event("customer.subscription.created", f.sub.id, "evt_first"), "attached", f.provider);
  expect(account(f).signups[f.result.orderId].state).toBe("attached");
  await expect(f.service.recoverPendingCheckout("alice", f.provider)).resolves.toBeNull();
  Object.assign(f.invoice, { status: "paid", amount_paid: 980 });
  expect(await f.service.recoverPendingCheckout("alice", f.provider)).toMatchObject({ orderId: f.result.orderId, recovered: true });
  expect((await f.service.status("alice", f.result.orderId)).purchase).toMatchObject({ status: "paid", returnTo });
  expect(Object.keys(account(f).signups)).toEqual([f.result.orderId]);
});

it("uses the latest study target when resuming an open session", async () => {
  const f = await monthlyStripeFixture({ returnTo: "/quiz?question=ip-a" });
  Object.assign(f.session, { status: "open", subscription: null });
  const latest = "/quiz?question=ip-b";
  const signup = account(f).signups[f.result.orderId];
  expect(await f.service.checkout("alice", signup.terms, f.provider, undefined, undefined, undefined, undefined, undefined, latest)).toEqual(f.result);
  expect(account(f).signups[signup.id].returnTo).toBe(latest);
  Object.assign(f.session, { status: "complete", subscription: f.sub.id });
  expect(await f.service.recoverPendingCheckout("alice", f.provider)).toMatchObject({ orderId: signup.id });
  expect((await f.service.status("alice", signup.id)).purchase?.returnTo).toBe(latest);
});

it.each([true, false])("grants access after a 950-yen credit and counts the debit only when collected (application: %s)", async applied => {
  const f = await monthlyStripeFixture();
  Object.assign(f.invoice, { starting_balance: -950, ending_balance: 30, amount_paid: 0, amount_due: 0 });
  f.addBalance("adjustment", -950, null);
  f.addBalance("applied_to_invoice", 950, f.invoice.id);
  await expect(f.service.receive(f.event(), "unconfirmed", f.provider)).rejects.toMatchObject({ code: "unverified_invoice_balance" });
  const deferred = f.addBalance("invoice_too_small", 30, f.invoice.id);
  await f.service.receive(f.event(), "confirmed", f.provider);
  expect((await f.service.status("alice")).entitled).toBe(true);
  const finance = () => projectMonthlyFinanceSnapshot([account(f)], f.config.sourceInstance, f.config.mode, new Date().toISOString());
  expect(finance().invoices[0]).toMatchObject({ confirmedGrossJPY: 0, deferredDebitJPY: 30 });

  f.earlierInvoices.set(f.invoice.id, { invoice: structuredClone(f.invoice), line: structuredClone(f.line) });
  // The renewal also recovers the originating invoice if its notification was missed.
  delete account(f).invoices[f.invoice.id];
  const nextStart = f.line.period.end, nextEnd = nextStart + 31 * 86400;
  f.setClock(new Date((nextStart + 1) * 1000));
  Object.assign(f.invoice, { id: "in_renewal", starting_balance: 30, ending_balance: 0, amount_paid: 1010, amount_due: 1010, billing_reason: "subscription_cycle" });
  Object.assign(f.invoice, { status_transitions: { finalized_at: nextStart } });
  Object.assign(f.line.period, { start: nextStart, end: nextEnd });
  Object.assign(f.sub, { latest_invoice: f.invoice.id });
  Object.assign(f.sub.items.data[0], { current_period_start: nextStart, current_period_end: nextEnd });
  Object.assign(f.allocation, { invoice: f.invoice.id, amount_paid: 1010 });
  Object.assign(f.payment, { amount: 1010, amount_received: 1010 });
  if (applied) f.addBalance("applied_to_invoice", -30, f.invoice.id);
  else f.customer.balance = 0;
  await f.service.receive(f.event("invoice.paid", f.invoice.id, "evt_renewal"), "renewed", f.provider);
  await f.service.receive(f.event("invoice.paid", f.invoice.id, "evt_renewal_late"), "renewed-again", f.provider);
  expect(account(f).invoices[f.invoice.id].carryover).toEqual({ amount: 30, transactionId: deferred.id });
  expect((await f.service.status("alice")).entitled).toBe(true);
  expect(finance().totals).toMatchObject({ confirmedGrossJPY: 1010, netSalesBeforeFeesJPY: 1010 });
});
const request=(event:unknown)=>{const body=JSON.stringify(event),t=Math.floor(Date.now()/1000),sig=createHmac("sha256",secret).update(`${t}.${body}`).digest("hex");return new Request("http://localhost:3338/api/billing/webhook",{method:"POST",body,headers:{"stripe-signature":`t=${t},v1=${sig}`}});};

describe("period-end cancellation expressed by cancel_at",()=>{
 it.each([false,true])("normalizes exact item period end with legacy flag %s and retains paid access",async legacy=>{
  const f=await monthlyStripeFixture();f.sub.cancel_at_period_end=legacy;Object.assign(f.sub,{cancel_at:f.sub.items.data[0].current_period_end});
  await f.service.receive(f.event(),"paid",f.provider);
  expect(await f.service.status("alice",f.result.orderId)).toMatchObject({entitled:true,subscription:{cancelAtPeriodEnd:true,renewalBlocked:false}});
  expect(account(f).renewalStopJobs).toEqual({});expect(vi.mocked(f.fetcher).mock.calls.some(([,o])=>o?.method==="POST"&&new URLSearchParams(o.body as URLSearchParams).get("cancel_at_period_end")==="true")).toBe(false);
 });
 it.each([undefined,null])("preserves an absent/null cancel_at without inventing a reservation (%s)",async value=>{
  const f=await monthlyStripeFixture();Object.assign(f.sub,{cancel_at:value});await f.service.receive(f.event(),"paid",f.provider);
  expect(await f.service.status("alice")).toMatchObject({entitled:true,subscription:{cancelAtPeriodEnd:false}});
 });
 it("keeps legacy cancel_at_period_end support when cancel_at is null",async()=>{
  const f=await monthlyStripeFixture();f.sub.cancel_at_period_end=true;Object.assign(f.sub,{cancel_at:null});await f.service.receive(f.event(),"paid",f.provider);expect((await f.service.status("alice")).subscription?.cancelAtPeriodEnd).toBe(true);
 });
 it("clears the reservation on a fresh withdrawal event and does not block renewal",async()=>{
  const f=await monthlyStripeFixture();Object.assign(f.sub,{cancel_at:f.sub.items.data[0].current_period_end});await f.service.receive(f.event(),"paid",f.provider);
  Object.assign(f.sub,{cancel_at:null});await f.service.receive(f.event("customer.subscription.updated",f.sub.id,"evt_keep"),"keep",f.provider);
  expect(await f.service.status("alice")).toMatchObject({entitled:true,subscription:{cancelAtPeriodEnd:false,renewalBlocked:false}});
 });
 it.each(["future-before-end","future-after-end","now","past"])("rejects unsupported non-terminal cancellation date %s atomically",async kind=>{
  const f=await monthlyStripeFixture();await f.service.receive(f.event(),"paid",f.provider);const before=structuredClone(account(f));
  const end=f.sub.items.data[0].current_period_end,now=Date.parse("2026-02-01T00:00:00Z")/1000;
  Object.assign(f.sub,{cancel_at:kind==="future-before-end"?end-3600:kind==="future-after-end"?end+3600:kind==="now"?now:now-1});
  await expect(f.service.receive(f.event("customer.subscription.updated",f.sub.id,"evt_bad_date"),"bad",f.provider)).rejects.toMatchObject({code:"unsupported_subscription_cancellation",status:503});expect(account(f)).toEqual(before);
 });
 it.each([0,-1,1.5,"2026-02-28",true,{},[]])("rejects malformed cancel_at %j before committing an event",async value=>{
  const f=await monthlyStripeFixture();const before=structuredClone(account(f));Object.assign(f.sub,{cancel_at:value});await expect(f.service.receive(f.event(),"bad",f.provider)).rejects.toThrow();expect(account(f)).toEqual(before);
 });
 it.each(["canceled","incomplete_expired"])("preserves terminal %s with historical cancel_at and never grants access",async status=>{
  const f=await monthlyStripeFixture();await f.service.receive(f.event(),"paid",f.provider);Object.assign(f.sub,{status,cancel_at:Date.parse("2026-02-01T00:00:00Z")/1000});
  await f.service.receive(f.event("customer.subscription.deleted",f.sub.id,"evt_terminal"),"terminal",f.provider);expect((await f.service.status("alice")).entitled).toBe(false);expect(account(f).contracts.sub_monthly.status).toBe(status);
 });
 it("acknowledges signed period-end updates only after normalized state is saved",async()=>{
  const f=await monthlyStripeFixture();wiring.runtime=f;Object.assign(f.sub,{cancel_at:f.sub.items.data[0].current_period_end});
  expect((await webhook(request(f.event("customer.subscription.updated",f.sub.id,"evt_signed_end")))).status).toBe(200);expect(account(f).contracts.sub_monthly.cancelAtPeriodEnd).toBe(true);
 });
 it("returns retryable 503 for a signed unsupported date with no committed event",async()=>{
  const f=await monthlyStripeFixture();wiring.runtime=f;Object.assign(f.sub,{cancel_at:f.sub.items.data[0].current_period_end-1});const before=structuredClone(account(f));
  expect((await webhook(request(f.event("customer.subscription.updated",f.sub.id,"evt_signed_bad")))).status).toBe(503);expect(account(f)).toEqual(before);
 });
 it("a previously acknowledged event remains duplicate; a fresh provider event repairs the old flag",async()=>{
  const f=await monthlyStripeFixture();await f.service.receive(f.event(),"old",f.provider);Object.assign(f.sub,{cancel_at:f.sub.items.data[0].current_period_end});
  expect(await f.service.receive(f.event(),"old",f.provider)).toBe("duplicate");expect(account(f).contracts.sub_monthly.cancelAtPeriodEnd).toBe(false);
  await f.service.receive(f.event("customer.subscription.updated",f.sub.id,"evt_new"),"new",f.provider);expect(account(f).contracts.sub_monthly.cancelAtPeriodEnd).toBe(true);
 });
});
