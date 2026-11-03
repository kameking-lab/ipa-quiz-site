import { beforeEach, expect, it, vi } from "vitest";
const m=vi.hoisted(()=>({access:vi.fn(),user:"u" as string|null,refresh:vi.fn(),entry:{code:"ip",name:"IP",count:21,revision:"abc",bytes:42,years:[],categories:[],sessions:[]}}));
vi.mock("@/lib/billing/runtime",()=>({optionalBillingIdentity:async()=>m.user,sameOrigin:()=>{},json:(v:unknown,status=200)=>Response.json(v,{status,headers:{"Cache-Control":"private, no-store"}}),billingFailure:(e:{status?:number;code?:string})=>Response.json({error:e.code??"unavailable"},{status:e.status??503})}));
vi.mock("@/mobile/server/entitlement",()=>({mobileEntitlement:m.access}));
vi.mock("@/mobile/server/config",()=>({mobileConfig:()=>({}),requireMobileReady:()=>({webhookAuthorization:"Bearer "+"x".repeat(32),appId:"app-test",environment:"SANDBOX"})}));
vi.mock("@/mobile/server/catalog",()=>({catalogCodes:()=>["ip"],examCatalog:async()=>m.entry,examContent:async()=>Array.from({length:21},(_,i)=>({id:`q${i}`}))}));
vi.mock("@/mobile/server/revenuecat",async importOriginal=>({...await importOriginal<typeof import("@/mobile/server/revenuecat")>(),refreshRevenueCat:m.refresh}));
import { download, catalog } from "@/mobile/server/routes";
import { POST as webhook } from "@/app/api/mobile/revenuecat/route";
import { GET as retired } from "@/app/api/mobile/packs/route";
beforeEach(()=>{vi.resetAllMocks();m.user="u";m.access.mockResolvedValue({userId:"u",entitled:true,lease:"signed"});});
it("exposes metadata to everyone but rejects unauthenticated, free and unsigned downloads",async()=>{
  expect((await catalog()).status).toBe(200);
  for(const access of [{userId:null,entitled:false,lease:null},{userId:"u",entitled:false,lease:null},{userId:"u",entitled:true,lease:null}]) {m.access.mockResolvedValue(access);expect((await download(new Request("https://site.test/api/mobile/download?exam=ip"))).status).toBe(403);}
});
it("paginates complete qualifications, enforces revision consistency and prevents negative offsets",async()=>{
  const res=await download(new Request("https://site.test/api/mobile/download?exam=ip&offset=10&revision=abc"));expect(res.headers.get("cache-control")).toContain("no-store");const data=await res.json();expect(data.questions).toHaveLength(10);expect(data.nextOffset).toBe(20);
  expect((await download(new Request("https://site.test/api/mobile/download?exam=ip&revision=old"))).status).toBe(409);expect((await download(new Request("https://site.test/api/mobile/download?exam=ip&offset=-1"))).status).toBe(400);
});
function event(body:unknown,authorization="Bearer "+"x".repeat(32)){return new Request("https://site.test/api/mobile/revenuecat",{method:"POST",headers:{authorization},body:JSON.stringify({event:body})});}
it("rejects spoofed webhook auth and isolates app IDs and sandbox/live environments",async()=>{
  const e={id:"e",app_id:"app-test",environment:"SANDBOX",app_user_id:"opaque"};expect((await webhook(event(e,"wrong"))).status).toBe(401);expect(m.refresh).not.toHaveBeenCalled();
  expect((await webhook(event({...e,environment:"PRODUCTION"}))).status).toBe(200);expect((await webhook(event({...e,app_id:"wrong"}))).status).toBe(200);expect(m.refresh).not.toHaveBeenCalled();
  expect((await webhook(event(e))).status).toBe(200);expect(m.refresh).toHaveBeenCalledWith("opaque");
});
it("reconciles both sides of transfers and returns non-200 for retryable provider failures",async()=>{
  expect((await webhook(event({id:"e",app_id:"app-test",environment:"SANDBOX",transferred_from:["old"],transferred_to:["new"]}))).status).toBe(200);expect(m.refresh.mock.calls.map(x=>x[0])).toEqual(["old","new"]);
  m.refresh.mockRejectedValue(Error("provider timeout"));expect((await webhook(event({id:"e2",app_id:"app-test",environment:"SANDBOX",app_user_id:"new"}))).status).toBe(503);
});
it("retires the 36-question public pack instead of returning a free offline pack",async()=>{expect((await retired()).status).toBe(410);});
