import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createHash, randomBytes } from "node:crypto";
import { decode } from "next-auth/jwt";

const ledger = vi.hoisted(() => ({ active: "", retired: new Set<string>() }));
vi.mock("@/lib/auth/app-review-revocation", () => ({
  activateReviewVersion: async (version: string) => {
    if (ledger.retired.has(version)) return false;
    if (ledger.active && ledger.active !== version) ledger.retired.add(ledger.active);
    ledger.active = version; return true;
  },
  revokeReviewSessions: async () => { if (ledger.active) ledger.retired.add(ledger.active); ledger.active = ""; },
}));
const m=vi.hoisted(()=>({user:"u1" as string|null,rows:new Map<string,{userId:string;challenge:string;expiresAt:Date}>(),profile:vi.fn()}));
vi.mock("@/lib/auth",()=>({auth:async()=>m.user?{user:{id:m.user}}:null}));
vi.mock("@/lib/billing/runtime",()=>({billingFailure:(e:{status?:number;code?:string})=>Response.json({error:e.code??"unavailable"},{status:e.status??503})}));
vi.mock("@/lib/db/prisma",()=>({prisma:{user:{findUnique:m.profile},$executeRawUnsafe:async(sql:string,...values:unknown[])=>{
  if(sql.startsWith("INSERT"))m.rows.set(values[0] as string,{userId:values[1] as string,challenge:values[2] as string,expiresAt:values[3] as Date});return 1;
},$queryRawUnsafe:async(_sql:string,hash:string,challenge:string)=>{const row=m.rows.get(hash);if(!row||row.challenge.split(".")[0]!==challenge||row.expiresAt.getTime()<=Date.now())return [];m.rows.delete(hash);return [{userId:row.userId,challenge:row.challenge}];}}}));
import { complete, exchange } from "@/mobile/server/auth";
import { APP_REVIEW_USER_ID } from "@/lib/auth/app-review-config";
import { reviewSessionClaims, reviewSessionValid } from "@/lib/auth/app-review";
const hash=(s:string)=>createHash("sha256").update(s).digest("base64url");
beforeEach(()=>{ledger.active="";ledger.retired.clear();m.user="u1";m.rows.clear();m.profile.mockReset();m.profile.mockResolvedValue({id:"u1",name:"Mock User",email:"mock@example.test",image:null,plan:"free",createdAt:new Date("2026-11-04T00:00:00Z")});vi.stubEnv("AUTH_SECRET","mock-auth-secret-for-unit-tests-only-32chars");});
afterEach(()=>vi.unstubAllEnvs());
it.each(["valid", "rotated", "expired", "disabled", "removed", "recreated", "reenabled", "rollback"])("binds native review PKCE exchange to the original configuration: %s", async change=>{
  for(const [key,value] of Object.entries({APP_REVIEW_LOGIN_ENABLED:"true",APP_REVIEW_USER_ID:"u1",APP_REVIEW_EMAIL:"mock@example.test",APP_REVIEW_CODE_SHA256:randomBytes(32).toString("hex"),APP_REVIEW_EXPIRES_AT:new Date(Date.now()+3600000).toISOString(),AUTH_URL:"https://site.test",DATABASE_URL:"postgresql://unused.invalid/test",KV_REST_API_URL:"https://kv.example.invalid",KV_REST_API_TOKEN:randomBytes(32).toString("hex")}))vi.stubEnv(key,value);
  m.profile.mockResolvedValue({id:APP_REVIEW_USER_ID,name:"App Review",email:"app-review@accounts.kakomon-ai.invalid",image:null,plan:"free",createdAt:new Date("2026-11-04T00:00:00Z")});
  const code=randomBytes(32).toString("base64url"),verifier=randomBytes(32).toString("base64url");
  const version=(await reviewSessionClaims(APP_REVIEW_USER_ID)).reviewVersion;
  m.rows.set(hash(code),{userId:APP_REVIEW_USER_ID,challenge:`${hash(verifier)}.${version}`,expiresAt:new Date(Date.now()+60000)});
  if(change==="rotated")vi.stubEnv("APP_REVIEW_CODE_SHA256",randomBytes(32).toString("hex"));
  if(change==="expired")vi.stubEnv("APP_REVIEW_EXPIRES_AT",new Date(Date.now()-1).toISOString());
  if(change==="disabled")vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","false");
  if(change==="removed"){vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","");vi.stubEnv("APP_REVIEW_USER_ID","");}
  if(change==="reenabled"){
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","false");
    expect(await reviewSessionValid({id:APP_REVIEW_USER_ID,reviewVersion:version})).toBe(false);
    vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","true");
  }
  if(change==="rollback"){
    const previous=process.env.APP_REVIEW_CODE_SHA256!;
    vi.stubEnv("APP_REVIEW_CODE_SHA256",randomBytes(32).toString("hex"));
    await reviewSessionClaims(APP_REVIEW_USER_ID);
    vi.stubEnv("APP_REVIEW_CODE_SHA256",previous);
  }
  if(change==="recreated")m.profile.mockResolvedValue({id:APP_REVIEW_USER_ID,createdAt:new Date("2026-11-04T01:00:00Z")});
  const response=await exchange(new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code,verifier})}));
  expect(response.status).toBe(change==="valid"?200:401);
  if(change==="valid"){
    const jwt=response.headers.get("set-cookie")!.split(";")[0].split("=")[1];
    expect(await decode({token:jwt,salt:"__Secure-authjs.session-token",secret:process.env.AUTH_SECRET!})).toMatchObject({reviewVersion:version});
  }else expect(response.headers.has("set-cookie")).toBe(false);
  expect(m.rows.size).toBe(0);
});
it("permanently retires old JWT and other pending PKCE codes when only an exchange observes disable",async()=>{
  for(const [key,value] of Object.entries({APP_REVIEW_LOGIN_ENABLED:"true",APP_REVIEW_CODE_SHA256:randomBytes(32).toString("hex"),APP_REVIEW_EXPIRES_AT:new Date(Date.now()+3600000).toISOString(),AUTH_URL:"https://site.test",DATABASE_URL:"postgresql://unused.invalid/test",KV_REST_API_URL:"https://kv.example.invalid",KV_REST_API_TOKEN:"synthetic-kv-token"}))vi.stubEnv(key,value);
  m.profile.mockResolvedValue({id:APP_REVIEW_USER_ID,createdAt:new Date("2026-11-04T00:00:00Z")});
  const token={id:APP_REVIEW_USER_ID,...await reviewSessionClaims(APP_REVIEW_USER_ID)};
  const first=randomBytes(32).toString("base64url"),second=randomBytes(32).toString("base64url"),verifier=randomBytes(32).toString("base64url");
  for(const code of [first,second])m.rows.set(hash(code),{userId:APP_REVIEW_USER_ID,challenge:`${hash(verifier)}.${token.reviewVersion}`,expiresAt:new Date(Date.now()+60000)});
  const request=(code:string)=>new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code,verifier})});
  vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","false");
  expect((await exchange(request(first))).status).toBe(401);
  // No separate JWT probe or owner revocation occurs before re-enable.
  vi.stubEnv("APP_REVIEW_LOGIN_ENABLED","true");
  expect(await reviewSessionValid(token)).toBe(false);
  expect((await exchange(request(second))).status).toBe(401);
  expect(m.rows.size).toBe(0);
});
it("uses a one-use short-lived PKCE code without putting the session token into the app URL",async()=>{
  const verifier=randomBytes(32).toString("base64url"),state=randomBytes(32).toString("base64url");
  const address=`https://site.test/api/mobile/auth/complete?challenge=${hash(verifier)}&state=${state}`;
  const page=await complete(new Request(address));expect(page.status).toBe(200);
  const proof=/name="proof" value="([a-f0-9]+)"/.exec(await page.text())![1];
  const consentCookie=page.headers.get("set-cookie")!.split(";")[0];
  const result=await complete(new Request(address,{method:"POST",headers:{origin:"https://site.test",cookie:consentCookie},body:new URLSearchParams({proof}).toString()}));
  const url=new URL(result.headers.get("location")!);expect(url.protocol).toBe("kakomonai:");expect(url.searchParams.get("state")).toBe(state);expect(url.searchParams.has("token")).toBe(false);
  const code=url.searchParams.get("code")!;expect(m.rows.has(code)).toBe(false);expect(m.rows.has(hash(code))).toBe(true);
  const wrong=await exchange(new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code,verifier:randomBytes(32).toString("base64url")})}));expect(wrong.status).toBe(401);
  const request=()=>new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code,verifier})});
  const response=await exchange(request());expect(response.status).toBe(200);expect((await response.json()).redirectTo).toBe("https://site.test/");
  const cookie=response.headers.get("set-cookie")!;expect(cookie).toContain("HttpOnly");expect(cookie).toContain("Secure");expect(cookie).toContain("SameSite=Lax");
  const jwt=cookie.split(";")[0].split("=")[1];expect(await decode({token:jwt,salt:"__Secure-authjs.session-token",secret:process.env.AUTH_SECRET!})).toMatchObject({id:"u1",sub:"u1",name:"Mock User",email:"mock@example.test",picture:null,plan:"free"});
  expect(m.profile).toHaveBeenCalledWith({where:{id:"u1"},select:{id:true,name:true,email:true,image:true,plan:true}});
  expect((await exchange(request())).status).toBe(401);
});
it("does not mint an authenticated session for a deleted account even with an unexpired PKCE code",async()=>{
  const code=randomBytes(32).toString("base64url"),verifier=randomBytes(32).toString("base64url");
  m.rows.set(hash(code),{userId:"deleted",challenge:hash(verifier),expiresAt:new Date(Date.now()+60000)});m.profile.mockResolvedValue(null);
  const response=await exchange(new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code,verifier})}));
  expect(response.status).toBe(401);expect(response.headers.has("set-cookie")).toBe(false);expect(m.rows.size).toBe(0);
});
it("never issues a code to a signed-out user or accepts unbounded callback input",async()=>{
  m.user=null;expect((await complete(new Request("https://site.test/api/mobile/auth/complete?challenge=x&state=y"))).headers.get("location")).toContain("/auth/signin?");expect(m.rows.size).toBe(0);
  m.user="u1";expect((await complete(new Request("https://site.test/api/mobile/auth/complete?challenge=x&state=y"))).status).toBe(400);
  expect((await exchange(new Request("https://site.test/api/mobile/auth/exchange",{method:"POST",headers:{"X-Kakomon-Native":"ios"},body:JSON.stringify({code:"x",verifier:"y"})}))).status).toBe(400);
});
