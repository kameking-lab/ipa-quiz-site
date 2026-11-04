// @vitest-environment node
import {afterEach,beforeEach,expect,it,vi} from "vitest";
import type {ExamQuestion} from "@/lib/exam-library-model";
const m=vi.hoisted(()=>({user:"alice" as string|null,monthly:false,query:vi.fn(),grants:new Map<string,Set<string>>()}));
vi.mock("@/lib/db/prisma",()=>({prisma:{$queryRawUnsafe:m.query}}));
vi.mock("@/lib/billing/runtime",()=>({
  optionalBillingIdentity:async()=>m.user,
  sameOrigin:(request:Request)=>{if(request.headers.get("Origin")!=="https://site.test")throw new BillingError("invalid_origin",403);},
  json:(value:unknown,status=200)=>Response.json(value,{status,headers:{"Cache-Control":"private, no-store"}}),
  billingFailure:(error:unknown)=>Response.json({error:error instanceof BillingError?error.code:"billing_unavailable"},{status:error instanceof BillingError?error.status:503}),
}));
vi.mock("@/lib/billing/config",async importOriginal=>({...await importOriginal<typeof import("@/lib/billing/config")>(),billingConfig:()=>({mode:"mock",sourceInstance:"fixture",freeDaily:10})}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlySelected:()=>m.monthly,monthlyConfig:()=>({mode:"stripe-test",sourceInstance:"fixture"})}));
vi.mock("@/lib/exam-library-papers",()=>({loadExamPaper:(id:string)=>id===paper?questions:null}));
import {BillingError} from "@/lib/billing/domain";
import {BillingService} from "@/lib/billing/service";
import {billingConfig} from "@/lib/billing/config";
import {MemoryStore} from "../billing/memory-store";
import {paperReviewProof,historicPaperGrants} from "@/mobile/server/paper-review";
import {POST} from "@/app/api/mobile/paper-results/route";
const paper="lckohyo-TEST01";
const questions:ExamQuestion[]=Array.from({length:12},(_,i)=>({id:`${paper}-q${i+1}`,number:i+1,text:`PRIVATE BODY ${i}`,images:["/private.png"],choiceCount:3,correctChoice:2,answerAuthority:"official"}));
const answers=questions.slice(0,11).map((q,i)=>({id:q.id,choice:i%2?2:1}));
const request=(value:unknown,origin="https://site.test")=>new Request("https://site.test/api/mobile/paper-results",{method:"POST",headers:{Origin:origin},body:JSON.stringify(value)});
beforeEach(()=>{
  vi.clearAllMocks();m.user="alice";m.monthly=false;m.grants.clear();vi.stubEnv("AUTH_SECRET","local-fixture-secret-never-used-outside-tests");
  m.query.mockImplementation(async(_sql:string,user:string,_mode:string,ids:string[])=>ids.filter(id=>m.grants.get(user)?.has(id)).map(id=>({id})));
});
afterEach(()=>vi.unstubAllEnvs());
it("restores eleven historical results across JST midnight without spending today's ten body grants",async()=>{
  vi.stubEnv("MOBILE_IAP_ENABLED","true");
  const store=new MemoryStore();let now=new Date("2026-11-03T14:59:59Z");
  const service=new BillingService(store,{...billingConfig({}),mode:"mock",freeDaily:10},()=>now);
  for(const q of questions.slice(0,10))await service.grant("alice",q.id);
  now=new Date("2026-11-03T15:00:00Z");await service.grant("alice",questions[10].id);
  m.grants.set("alice",new Set([...store.grants.values()].flatMap(s=>[...s])));
  const before=structuredClone(store.grants);
  const response=await POST(request({paper,answers}));expect(response.status).toBe(200);
  const body=await response.json();expect(body.results).toHaveLength(11);expect(body.results.filter((r:{result:string})=>r.result==="incorrect")).toHaveLength(6);
  expect(store.grants).toEqual(before);expect(response.headers.get("cache-control")).toContain("no-store");
  for(let n=0;n<9;n++)await service.grant("alice",`other-exam-${n}`);
  await expect(service.grant("alice","eleventh-new-body")).rejects.toMatchObject({code:"daily_limit"});
  const serialized=JSON.stringify(body);for(const field of ["PRIVATE BODY","correctChoice","explanation","images"])expect(serialized).not.toContain(field);
});
it("restores paid-to-free results with owner-bound proofs without a body grant or an external entitlement request",async()=>{
  const proofAnswers=answers.map(a=>({...a,proof:paperReviewProof("alice",paper,a.id)}));
  const response=await POST(request({paper,answers:proofAnswers}));
  expect((await response.json()).results).toHaveLength(11);expect(m.query).not.toHaveBeenCalled();
  m.user="bob";expect((await (await POST(request({paper,answers:proofAnswers}))).json()).results).toEqual([]);
});
it("does not trust forged saves, proofs for another paper, or another environment",async()=>{
  expect((await (await POST(request({paper,answers}))).json()).results).toEqual([]);
  for(const proof of ["f".repeat(64),paperReviewProof("alice","different-paper",answers[0].id)]) {
    expect((await (await POST(request({paper,answers:[{...answers[0],proof}]}))).json()).results).toEqual([]);
  }
  const proof=paperReviewProof("alice",paper,answers[0].id);m.monthly=true;
  m.query.mockResolvedValue([]);
  expect((await (await POST(request({paper,answers:[{...answers[0],proof}]}))).json()).results).toEqual([]);
});
it("requires authentication and same origin, and rejects foreign IDs, duplicates, invalid choices and reference-only records",async()=>{
  m.user=null;expect((await POST(request({paper,answers}))).status).toBe(401);m.user="alice";
  expect((await POST(request({paper,answers},"https://attacker.invalid"))).status).toBe(403);
  for(const invalid of [[{id:"other-paper-q1",choice:1}],[answers[0],answers[0]],[{...answers[0],choice:99}],[{...answers[0],choice:null}]])expect((await POST(request({paper,answers:invalid}))).status).toBe(400);
  questions[0].referenceOnly=true;expect((await POST(request({paper,answers:[answers[0]]}))).status).toBe(400);delete questions[0].referenceOnly;
});
it("scopes historic monthly lookups to the authenticated owner, realm and source using parameterized read-only SQL",async()=>{
  m.monthly=true;m.query.mockResolvedValue([{id:answers[0].id}]);
  expect(await historicPaperGrants("alice",[answers[0].id])).toEqual(new Set([answers[0].id]));
  expect(m.query).toHaveBeenCalledWith(expect.stringContaining("a.source_instance=$3"),"alice","stripe-test","fixture",[answers[0].id]);
  expect(m.query.mock.calls[0][0]).not.toMatch(/INSERT|UPDATE|DELETE/);
});
