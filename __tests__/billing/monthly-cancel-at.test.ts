import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyStripeFixture } from "./monthly-stripe-fixture";
const wiring=vi.hoisted(()=>({runtime:null as unknown}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>wiring.runtime}));
vi.mock("@/lib/billing/runtime",()=>({json:(v:unknown)=>Response.json(v),billingFailure:(e:{status?:number;code?:string})=>Response.json({error:e.code??"unavailable"},{status:e.status??503})}));
import { POST as webhook } from "@/app/api/billing/webhook/route";
const secret="whsec_public_cancel_at_fixture";
beforeEach(()=>{
 vi.stubGlobal("fetch",()=>{throw new Error("External fetch forbidden");});
 for(const [k,v] of Object.entries({BILLING_PRODUCT:"subscription",BILLING_WEBHOOK_MODE:"stripe-test",BILLING_SOURCE_INSTANCE:"monthly-fixture",BILLING_ORIGIN:"http://localhost:3338",BILLING_STRIPE_TEST_WEBHOOK_SECRET:secret}))vi.stubEnv(k,v);
});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
const account=(f:Awaited<ReturnType<typeof monthlyStripeFixture>>)=>f.store.accounts.get("stripe-test:alice")!;
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
