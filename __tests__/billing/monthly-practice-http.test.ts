import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { monthlyFixture } from "./monthly-fixture";
import { LuaKv } from "./guest-lua-kv";
const wiring=vi.hoisted(()=>({runtime:null as unknown,user:"alice" as string|null,mobileSession:false,appAccess:vi.fn()}));
vi.mock("@/lib/auth",()=>({auth:async()=>wiring.user?{user:{id:wiring.user},mobileSession:wiring.mobileSession}:null}));
vi.mock("@/mobile/server/revenuecat", () => ({ revenueCatAccess: wiring.appAccess }));
vi.mock("@/lib/db/prisma",()=>({prisma:{}}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>wiring.runtime}));
const questions = vi.hoisted(() => Array.from({ length: 12 }, (_, i) => ({
  id: `q-api-${i}`, type: "multiple-choice", answer: "ア", explanation: "fixture explanation",
})));
vi.mock("@/lib/questions/pool-server",()=>({findQuestionById:async(id:string)=>questions.find(q => q.id === id) ?? {id}}));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam: async () => questions }));
vi.mock("@/lib/api/rate-limit", () => ({
  checkApiRateLimit: async () => ({ ok: true }), buildRateLimitHeaders: () => ({ "X-RateLimit-Remaining": "5" }),
}));
vi.mock("@/lib/questions/filter",()=>({isPracticeReadyQuestion:()=>true,shuffleChoices:(q:unknown)=>q}));
import { POST } from "@/app/api/billing/question/route";
import { guestCookie, guestRealm } from "@/lib/billing/guest-practice";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { GET as listQuestions } from "@/app/api/v1/questions/route";
import { POST as gradeQuestion } from "@/app/api/v1/grade/route";
import { GET as nextQuestion } from "@/app/api/questions/next/route";
import { GET as membershipStatus } from "@/app/api/billing/status/route";
import { streamAccess } from "@/lib/billing/stream-access";
const post=(id="q-practice",cookie="")=>POST(new Request("http://localhost:3338/api/billing/question",{method:"POST",headers:{origin:"http://localhost:3338",cookie},body:JSON.stringify({id})}));
beforeEach(()=>{wiring.user="alice";for(const [k,v] of Object.entries({AUTH_SECRET:"test-only-secret",BILLING_PRODUCT:"subscription",BILLING_MODE:"stripe-test",BILLING_WEBHOOK_MODE:"stripe-test",BILLING_SUBSCRIPTION_ENABLED:"true",BILLING_SOURCE_INSTANCE:"monthly-fixture",BILLING_STRIPE_TEST_PRICE_ID:"price_monthly",BILLING_SUBSCRIPTION_PORTAL_CONFIGURATION_ID:"bpc_fixture",BILLING_ORIGIN:"http://localhost:3338",BILLING_STARTS_AT:"2026-01-02T00:00:00Z",BILLING_NOTICE_AT:"2026-01-01T00:00:00Z",BILLING_LEGAL_REVIEWED:"true",BILLING_SELLER_NAME:"Fixture",BILLING_SELLER_ADDRESS:"Fixture",BILLING_SELLER_PHONE:"000",BILLING_SUPPORT_EMAIL:"fake@example.invalid",BILLING_REFUND_TERMS:"Fixture only"}))vi.stubEnv(k,v);});
beforeEach(() => { wiring.mobileSession = false; wiring.appAccess.mockReset().mockResolvedValue(null); });
afterEach(()=>vi.unstubAllEnvs());
describe("practice gate -> normal Auth identity -> real monthly service (offline memory)",()=>{
 it("shares ten unique IDs with public listing, grading and direct question retrieval without strict mode", async () => {
   vi.stubEnv("WEB_STRICT_CONTENT_GATE", "false");
   wiring.runtime = await monthlyFixture();
   for (let i = 0; i < 8; ++i) expect((await post(`q-api-${i}`)).status).toBe(200);
   const grade = (questionId: string) => gradeQuestion(new Request("http://localhost:3338/api/v1/grade", {
     method: "POST", body: JSON.stringify({ questionId, answer: "ア" }),
   }));
   const listing = await listQuestions(new Request("http://localhost:3338/api/v1/questions?exam=ap&offset=8"));
   expect(listing.status).toBe(200);
   expect(listing.headers.get("Cache-Control")).toBe("private, no-store");
   expect(listing.headers.get("Vary")).toBe("Cookie");
   expect((await listing.json()).questions.map((q: { id: string }) => q.id)).toEqual(["q-api-8", "q-api-9"]);
   expect((await (await grade("q-api-9")).json()).correct).toBe(true);
   for (const denied of [
     await grade("q-api-10"),
     await listQuestions(new Request("http://localhost:3338/api/v1/questions?exam=ap&offset=10")),
     await nextQuestion(new Request("http://localhost:3338/api/questions/next?id=q-api-10")),
     await post("q-api-11"),
   ]) {
     expect(denied.status).toBe(429);
     expect(await denied.json()).toMatchObject({ error: "daily_limit", access: { freeDaily: 10, remaining: 0 } });
   }
 });
 it("keeps same-origin anonymous bootstrap but refuses a cross-site navigation before issuing a cookie", async () => {
   wiring.runtime = await monthlyFixture();
   wiring.user = null;
   const url = "http://localhost:3338/api/v1/questions?exam=ap";
   const denied = await listQuestions(new Request(url, { headers: { "Sec-Fetch-Site": "cross-site" } }));
   expect(denied.status).toBe(403);
   expect(denied.headers.has("Set-Cookie")).toBe(false);
   const bootstrap = await listQuestions(new Request(url));
   expect(bootstrap.status).toBe(428);
   expect(bootstrap.headers.get("Set-Cookie")).toContain("HttpOnly");
   expect(bootstrap.headers.get("X-RateLimit-Remaining")).toBe("5");
   expect(await bootstrap.json()).toMatchObject({ error: "guest_cookie_required", access: { remaining: 10 } });
 });
 it("uses Web membership for public data even when the app is signed in", async () => {
   wiring.runtime = await monthlyFixture();
   wiring.mobileSession = true;
   wiring.appAccess.mockImplementation(async (_user, { scope }) => scope === "app" ? { expiresAt: new Date(Date.now() + 60_000) } : null);
   for (let i = 0; i < 10; ++i) expect((await post(`q-api-${i}`)).status).toBe(200);
   const headers = { "X-Kakomon-Native": "ios" };
   const listing = await listQuestions(new Request("http://localhost:3338/api/v1/questions?exam=ap&offset=10", { headers }));
   expect(listing.status).toBe(429);
   const appPractice = await POST(new Request("http://localhost:3338/api/billing/question", {
     method: "POST", headers: { ...headers, origin: "http://localhost:3338" }, body: JSON.stringify({ id: "q-api-10" }),
   }));
   expect((await appPractice.json()).access.kind).toBe("pass");
 });
 it("shares one signed guest cookie and daily ledger from public listing through practice and grading", async () => {
   wiring.user = null;
   const kv = new LuaKv();
   vi.stubEnv("KV_REST_API_URL", "https://fixture.invalid/kv");
   vi.stubEnv("KV_REST_API_TOKEN", "fixture");
   vi.stubGlobal("fetch", kv.fetch);
   try {
     const url = "http://localhost:3338/api/v1/questions?exam=ap&limit=4";
     const first = await listQuestions(new Request(url));
     expect(first.status).toBe(428);
     const cookie = first.headers.get("Set-Cookie")!.split(";")[0];
     const list = await listQuestions(new Request(url, { headers: { cookie } }));
     expect((await list.json()).questions).toHaveLength(4);
     for (let i = 4; i < 10; i++) expect((await post(`q-api-${i}`, cookie)).status).toBe(200);
     const grade = (id: string) => gradeQuestion(new Request("http://localhost:3338/api/v1/grade", {
       method: "POST", headers: { cookie }, body: JSON.stringify({ questionId: id, answer: "ア" }),
     }));
     expect((await grade("q-api-1")).status).toBe(200);
     const denied = await grade("q-api-10");
     expect(denied.status).toBe(429);
     const body = await denied.json();
     expect(body).toMatchObject({ error: "daily_limit", access: { remaining: 0 } });
     expect(body).not.toHaveProperty("grantedIds");
     expect((await post("q-api-11", cookie)).status).toBe(429);
   } finally { vi.unstubAllGlobals(); }
 });
 it("admits a verified Web member without a second grant transaction under rollout", async () => {
   vi.stubEnv("AI_QUOTA_ROLLOUT", "true");
   const fixture = await monthlyFixture();
   wiring.runtime = fixture;
   await fixture.send();
   const grant = vi.spyOn(fixture.service, "grant").mockRejectedValue(new Error("unavailable"));
   const result = await post();
   expect(result.status).toBe(200);
   expect((await result.json()).access).toMatchObject({ kind: "pass", remaining: null });
   expect(grant).not.toHaveBeenCalled();
 });
 it("checks a paid public page once even when it has more than ten questions", async () => {
   const fixture = await monthlyFixture();
   wiring.runtime = fixture;
   await fixture.send();
   const status = vi.spyOn(fixture.service, "status");
   const res = await listQuestions(new Request("http://localhost:3338/api/v1/questions?exam=ap"));
   expect(res.status).toBe(200);
   expect((await res.json()).questions).toHaveLength(12);
   expect(status).toHaveBeenCalledTimes(1);
 });
 it("returns previously opened IDs later in the page after reaching the daily limit", async () => {
   wiring.runtime = await monthlyFixture();
   for (let i = 2; i < 12; i++) expect((await post(`q-api-${i}`)).status).toBe(200);
   const res = await listQuestions(new Request("http://localhost:3338/api/v1/questions?exam=ap"));
   expect(res.status).toBe(200);
   expect((await res.json()).questions.map((q: { id: string }) => q.id)).toEqual(questions.slice(2).map(q => q.id));
   expect((await post("q-api-1")).status).toBe(429);
 });
 it("does not use a free practice slot when grading an unsupported essay", async () => {
   const fixture = await monthlyFixture();
   wiring.runtime = fixture;
   const grant = vi.spyOn(fixture.service, "grant");
   questions.push({ id: "q-essay", type: "essay", answer: "", explanation: "" });
   try {
     const req = new Request("http://localhost:3338/api/v1/grade", { method: "POST", body: JSON.stringify({ questionId: "q-essay", answer: "answer" }) });
     const result = await gradeQuestion(req);
     expect(result.status).toBe(400);
     expect(await result.json()).toMatchObject({ error: "unsupported" });
     expect(grant).not.toHaveBeenCalled();
   } finally { questions.pop(); }
 });
 it("keeps app membership available for study screens while ordinary Web status stays free", async () => {
   vi.stubEnv("MOBILE_IAP_ENABLED", "true");
   wiring.runtime = await monthlyFixture();
   wiring.appAccess.mockImplementation(async (_id, { scope }) => scope === "app" ? { expiresAt: new Date(Date.now() + 60_000) } : null);
   const view = (native: boolean) => membershipStatus(new Request("http://localhost:3338/api/billing/status", {
     headers: native ? { "X-Kakomon-Native": "ios" } : {},
   }));
   expect((await (await view(true)).json()).entitled).toBe(false);
   expect(await streamAccess()).toBe(false);
   wiring.mobileSession = true;
   expect((await (await view(true)).json()).entitled).toBe(true);
   expect((await (await view(false)).json()).entitled).toBe(false);
   expect(await streamAccess()).toBe(true);
 });
 it("preserves paid access past the exhausted free daily allowance", async () => {
   const f = await monthlyFixture();
   wiring.runtime = f;
   expect(practiceGateEnabled()).toBe(true);
   for (let i = 0; i < 10; i++) {
     const response = await post(`q-free-${i}`);
     expect(response.status).toBe(200);
     expect((await response.json()).access).toMatchObject({ kind: "trial", remaining: 9 - i });
   }
   expect((await post("q-paid-0")).status).toBe(429);
   await f.send();
   for (let i = 0; i < 12; i++) {
     const response = await post(`q-paid-${i}`);
     expect(response.status).toBe(200);
     expect((await response.json()).access).toMatchObject({ kind: "pass", remaining: null });
   }
   expect((await f.service.status("alice")).entitled).toBe(true);
 });
 it("another signed-in identity cannot use Alice's paid entitlement",async()=>{const f=await monthlyFixture();wiring.runtime=f;await f.send();wiring.user="bob";const r=await post();expect((await r.json()).access.kind).toBe("trial");expect((await f.service.status("alice")).entitled).toBe(true);});
 it("anonymous cannot grant or mutate an existing paid account",async()=>{const f=await monthlyFixture();wiring.runtime=f;await f.send();const before=JSON.stringify(f.account());wiring.user=null;expect((await post()).status).toBe(428);expect(JSON.stringify(f.account())).toBe(before);});
 it("missing cookie signing secret lets signed-in users reopen only existing free grants, and keeps paid access",async()=>{
   const f=await monthlyFixture(); wiring.runtime=f;
   expect((await post("q-existing")).status).toBe(200);
   const signed=guestCookie(guestRealm("stripe-test","monthly-fixture")); vi.stubEnv("AUTH_SECRET","");
   const cookie=`practice_guest=${signed}`;
   const reopened=await post("q-existing",cookie); expect(reopened.status).toBe(200); expect((await reopened.json()).access.remaining).toBeNull();
   expect((await post("q-new",cookie)).status).toBe(503);
   await f.send(); expect((await post("q-paid",cookie)).status).toBe(200);
 });
 it("webhook-only mode leaves practice free and retains saved paid rights",async()=>{const f=await monthlyFixture();wiring.runtime=f;await f.send();const before=JSON.stringify(f.account());vi.stubEnv("BILLING_MODE","off");expect(practiceGateEnabled()).toBe(false);const r=await post();expect((await r.json()).access.kind).toBe("free");expect(JSON.stringify(f.account())).toBe(before);expect((await f.service.status("alice")).entitled).toBe(true);});
 it("unconfigured selected monthly fails closed without account mutation",async()=>{const f=await monthlyFixture();wiring.runtime=f;const before=JSON.stringify(f.account());vi.stubEnv("BILLING_SOURCE_INSTANCE","");expect(()=>practiceGateEnabled()).toThrow();expect((await post()).status).toBe(503);expect(JSON.stringify(f.account())).toBe(before);});
});
