import { beforeEach, expect, it, vi } from "vitest";
import { BillingError } from "@/lib/billing/domain";
const m=vi.hoisted(()=>({user:null as string|null,webPaid:false,rc:vi.fn(),enabled:false,ids:new Set<string>(),bonus:vi.fn()}));
vi.mock("@/lib/questions/pool-server",()=>({findQuestionById:async(id:string)=>({id,answer:"a"})}));
vi.mock("@/lib/questions/filter",()=>({isPracticeReadyQuestion:()=>true,shuffleChoices:(q:unknown)=>q}));
vi.mock("@/lib/exam-library-papers",()=>({loadExamPaper:(paper:string)=>paper==="test"?[{id:"library-q1",correctChoice:1}]:null}));
vi.mock("@/mobile/server/revenuecat",()=>({revenueCatAccess:m.rc}));
vi.mock("@/lib/billing/config",()=>({billingConfig:()=>({mode:"mock",freeDaily:10}),gateReady:()=>m.enabled}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlySelected:()=>false}));
vi.mock("@/lib/billing/runtime",()=>({optionalBillingIdentity:async()=>m.user,sameOrigin:()=>{},billingRuntime:()=>({service:{status:async()=>({entitled:m.webPaid}),grant:async(_u:string,id:string)=>{
  if(m.webPaid)return {kind:"pass",remaining:null};if(!m.ids.has(id)&&m.ids.size>=10)throw new BillingError("daily_limit",429);m.ids.add(id);return {kind:"trial",remaining:10-m.ids.size};
}}}),json:(v:unknown,status=200)=>Response.json(v,{status,headers:{"Cache-Control":"private, no-store"}})}));
vi.mock("@/lib/billing/guest-practice",()=>({readGuestCookie:()=>"same-web-cookie",guestRealm:()=>"same-web-realm",guestCookie:()=>"cookie",cookieHeader:()=>"cookie",resetAt:()=>"2026-11-03T15:00:00Z",guestClaim:async()=>[],guestGrant:async(_r:string,_g:string,id:string)=>{
  if(!m.ids.has(id)&&m.ids.size>=10)return {status:"limit",used:10};m.ids.add(id);return {status:"ok",used:m.ids.size};
}}));
vi.mock("@/lib/feedback/unlock-runtime",()=>({readFeedbackBrowser:()=>null,feedbackBrowserHeader:()=>"",unlockIdentity:()=>({account:m.user}),feedbackStore:()=>({grant:m.bonus})}));
import { POST } from "@/app/api/billing/question/route";
import { GET } from "@/app/api/questions/next/route";
const req=(id:string,headers:Record<string,string>={})=>new Request("https://site.test/api/billing/question",{method:"POST",headers:{"X-Kakomon-Native":"ios",...headers},body:JSON.stringify({id})});
beforeEach(()=>{vi.resetAllMocks();m.user=null;m.webPaid=false;m.enabled=false;m.ids.clear();m.rc.mockResolvedValue(null);vi.stubEnv("FEEDBACK_UNLOCK_ENABLED","false");vi.stubEnv("MOBILE_IAP_ENABLED","false");});
it("gates native starts even with sales off, across every qualification, and counts unique IDs just like web",async()=>{
  for(let i=0;i<10;i++)expect((await POST(req(`${["ap","ip","fp3","denken3"][i%4]}-${i}`))).status).toBe(200);
  expect((await POST(req("nw-11"))).status).toBe(429);expect((await POST(req("ap-0"))).status).toBe(200);expect(m.ids.size).toBe(10);
});
it("shares one ordinary quota with library questions and takes bonus only after the normal account limit",async()=>{
  m.user="u";for(let i=0;i<9;i++)await POST(req("ip-"+i));expect((await POST(req("library-q1",{"X-Kakomon-Paper":"test"}))).status).toBe(200);
  expect((await POST(req("fp3-11"))).status).toBe(429);vi.stubEnv("FEEDBACK_UNLOCK_ENABLED","true");m.bonus.mockResolvedValue({remaining:9,newlyUsed:true});
  expect((await POST(req("fp3-11"))).status).toBe(200);expect(m.bonus).toHaveBeenCalledTimes(1);
});
it("web paid rights win over RevenueCat outages; verified IAP rights grant unlimited starts",async()=>{
  m.user="u";m.webPaid=true;m.rc.mockRejectedValue(Error("unavailable"));expect((await POST(req("q"))).status).toBe(200);expect(m.rc).not.toHaveBeenCalled();
  m.webPaid=false;m.rc.mockResolvedValue({expiresAt:new Date(Date.now()+10000)});for(let i=0;i<12;i++)expect((await POST(req("q"+i))).status).toBe(200);expect(m.ids.size).toBe(0);
  m.rc.mockResolvedValue(null);for(let i=0;i<10;i++)await POST(req("q"+i));expect((await POST(req("q99"))).status).toBe(429);
});
it("enforces one server quota without native headers, including direct GET, and forbids new anonymous identities",async()=>{
  vi.stubEnv("MOBILE_IAP_ENABLED","true");
  const web=(id:string)=>new Request("https://site.test/api/billing/question",{method:"POST",body:JSON.stringify({id})});
  expect((await POST(web("ip-0"))).status).toBe(401);
  m.user="u";
  for(let i=0;i<10;i++)expect((await POST(web(`ip-${i}`))).status).toBe(200);
  const blocked=await GET(new Request("https://site.test/api/questions/next?id=ip-11"));
  expect(blocked.status).toBe(429);expect(blocked.headers.get("cache-control")).not.toContain("public");
  expect(await blocked.text()).not.toContain('"answer"');
  expect((await POST(web("fp3-11"))).status).toBe(429);
  expect((await GET(new Request("https://site.test/api/questions/next?id=ip-0"))).status).toBe(200);
  vi.stubEnv("FEEDBACK_UNLOCK_ENABLED","true");m.bonus.mockResolvedValue({remaining:10});
  expect((await POST(web("ip-12"))).status).toBe(429);expect(m.bonus).not.toHaveBeenCalled();
});
