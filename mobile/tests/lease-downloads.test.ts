import { beforeEach, expect, it, vi } from "vitest";
import { generateKeyPairSync, sign, webcrypto } from "node:crypto";
import { verifyLease } from "../src/lease";
import { Downloads, hex } from "../src/downloads";
import type { MobileEntitlement, CatalogEntry } from "../shared/contracts";
import { Preferences } from "@capacitor/preferences";
const memory=vi.hoisted(()=>({ preferences:new Map<string,string>(),files:new Map<string,string>(),failWrite:false }));
vi.mock("@capacitor/preferences",()=>({ Preferences:{ get:async({key}:{key:string})=>({value:memory.preferences.get(key)??null}),set:async({key,value}:{key:string;value:string})=>{memory.preferences.set(key,value);},remove:async({key}:{key:string})=>{memory.preferences.delete(key);} } }));
vi.mock("@capacitor/filesystem",()=>({ Directory:{Data:"DATA"},Encoding:{UTF8:"utf8"},Filesystem:{ readFile:async({path}:{path:string})=>({data:memory.files.get(path)}),writeFile:async({path,data}:{path:string;data:string})=>{if(memory.failWrite)throw new Error("disk full");memory.files.set(path,data);},deleteFile:async({path}:{path:string})=>{memory.files.delete(path);} } }));
const pair=generateKeyPairSync("ec",{namedCurve:"prime256v1"}),publicKey=pair.publicKey.export({type:"spki",format:"pem"}).toString();
function token(owner="u1",issued=Date.now(),expires=issued+3600000) {const p=Buffer.from(JSON.stringify({version:1,userId:owner,entitlement:"kakomon_pro",issuedAt:issued,expiresAt:expires})).toString("base64url");return `${p}.${sign("sha256",Buffer.from(p),{key:pair.privateKey,dsaEncoding:"ieee-p1363"}).toString("base64url")}`;}
const rights=(lease=token()):MobileEntitlement=>({userId:"u1",appUserId:"rc1",entitled:true,source:"app-store",expiresAt:new Date(Date.now()+3600000).toISOString(),checkedAt:new Date().toISOString(),lease});
beforeEach(()=>{vi.stubGlobal("crypto",webcrypto);memory.preferences.clear();memory.files.clear();memory.failWrite=false;});
it("verifies owner, signature, expiry, maximum offline period and clock rollback",async()=>{
  await expect(verifyLease(token(),publicKey,"u1")).resolves.toMatchObject({userId:"u1"});
  await expect(verifyLease(token(),publicKey,"other")).rejects.toThrow();
  await expect(verifyLease(token()+"x",publicKey,"u1")).rejects.toThrow();
  await expect(verifyLease(token("u1",Date.now()-2000,Date.now()-1),publicKey,"u1")).rejects.toThrow();
  await expect(verifyLease(token("u1",Date.now(),Date.now()+86400001),publicKey,"u1")).rejects.toThrow();
  await expect(verifyLease(token(),publicKey,"u1",Date.now(),Date.now()+120000)).rejects.toThrow();
});
it("does not accept an attacker-supplied public key from preferences",async()=>{
  const d=new Downloads();await expect(d.updateRights(rights(),publicKey)).rejects.toThrow("未設定");
});
async function fixture() {
  const d=new Downloads(publicKey);await d.updateRights(rights(),publicKey);
  const questions=[{id:"ip-1"},{id:"ip-2"}];
  const revision=hex(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(JSON.stringify(questions))));
  const entry:CatalogEntry={code:"ip",name:"IP",count:2,years:[],categories:[],sessions:[],bytes:42,revision};
  const request=vi.fn(async()=>Response.json({entry,questions,nextOffset:null,entitlement:rights()}));
  return {d,questions,entry,request};
}
it("publishes only a complete hash-verified qualification and reads it after restart",async()=>{
  const {d,questions,request}=await fixture();await d.download("ip",request,()=>{},new AbortController().signal);
  expect(await new Downloads(publicKey).load("ip")).toEqual(questions);
  expect((await d.list()).ip.entry.count).toBe(2);
});
it("removes every saved format for one qualification",async()=>{
  const {d,request,entry,questions}=await fixture();entry.qualification="ip";
  await d.download("ip",request,()=>{},new AbortController().signal);
  const materialEntry={...entry,code:"material.ip",material:true};
  await d.download("material.ip",async()=>Response.json({entry:materialEntry,questions,nextOffset:null,entitlement:rights()}),()=>{},new AbortController().signal);
  expect(Object.keys(await d.list())).toHaveLength(2);await d.removeQualification("ip");expect(await d.list()).toEqual({});expect(memory.files.size).toBe(0);
});
it("a free user cannot even request a download",async()=>{
  const d=new Downloads(publicKey),request=vi.fn();await expect(d.download("ip",request,()=>{},new AbortController().signal)).rejects.toThrow("有料");expect(request).not.toHaveBeenCalled();
});
it("preserves the old download on corrupt content, cancellation and disk failure",async()=>{
  const {d,entry,request}=await fixture();await d.download("ip",request,()=>{},new AbortController().signal);const old=await d.list();
  await expect(d.download("ip",async()=>Response.json({entry,questions:[{id:"bad"},{id:"bad2"}],nextOffset:null,entitlement:rights()}),()=>{},new AbortController().signal)).rejects.toThrow("検証");
  const a=new AbortController();a.abort();await expect(d.download("ip",request,()=>{},a.signal)).rejects.toThrow();
  memory.failWrite=true;await expect(d.download("ip",request,()=>{},new AbortController().signal)).rejects.toThrow("disk full");expect(await d.list()).toEqual(old);
});
it("expiry, sign-out and an online 403 disable already downloaded questions",async()=>{
  const {d,request}=await fixture();await d.download("ip",request,()=>{},new AbortController().signal);
  await d.updateRights({...rights(),entitled:false,lease:null},publicKey);await expect(d.load("ip")).rejects.toThrow();
  await d.updateRights(rights(),publicKey);await expect(d.download("ip",async()=>new Response(null,{status:403}),()=>{},new AbortController().signal)).rejects.toThrow();await expect(d.load("ip")).rejects.toThrow();
  await d.updateRights(rights(),publicKey);vi.spyOn(Date,"now").mockReturnValue(Date.now()+7200000);await expect(d.load("ip")).rejects.toThrow("期限");vi.restoreAllMocks();
});
it("invalidation wins over an authorization write already in flight",async()=>{
  const {d}=await fixture();
  let release!:()=>void,started!:()=>void;
  const blocked=new Promise<void>(resolve=>{release=resolve;});
  const writing=new Promise<void>(resolve=>{started=resolve;});
  const original=Preferences.set;
  const spy=vi.spyOn(Preferences,"set").mockImplementation(async options=>{
    if(options.key==="kakomon:rights:v2"){started();await blocked;}
    return original(options);
  });
  try {
    const authorizing=d.authorize();await writing;
    const invalidating=d.invalidate();release();
    await authorizing;await invalidating;
    expect(await d.rights()).toBeNull();
    await expect(d.authorize()).rejects.toThrow("有料会員専用");
  }finally{release();spy.mockRestore();}
});
it("a rejected refreshed lease revokes a previously valid download permit",async()=>{
  const {d,request}=await fixture();await d.download("ip",request,()=>{},new AbortController().signal);
  await expect(d.updateRights(rights(token()+"tampered"),publicKey)).rejects.toThrow();
  await expect(d.load("ip")).rejects.toThrow("有料会員専用");
});
