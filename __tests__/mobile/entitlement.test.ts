import { beforeEach, expect, it, vi } from "vitest";
import { generateKeyPairSync, webcrypto } from "node:crypto";
import { verifyLease } from "@/mobile/src/lease";
const m=vi.hoisted(()=>({web:vi.fn(),rc:vi.fn(),identity:vi.fn(),privateKey:"",publicKey:""}));
vi.mock("@/lib/billing/runtime",()=>({billingRuntime:()=>({service:{status:m.web}})}));
vi.mock("@/lib/billing/subscription/config",()=>({monthlySelected:()=>false}));
vi.mock("@/lib/billing/subscription/runtime",()=>({monthlyRuntime:()=>({service:{status:m.web}})}));
vi.mock("@/mobile/server/revenuecat",()=>({ensureRevenueCatAccount:m.identity,revenueCatAccess:m.rc}));
vi.mock("@/mobile/server/config",()=>({mobileConfig:()=>({enabled:true,leasePrivateKey:m.privateKey,leasePublicKey:m.publicKey})}));
import { mobileEntitlement } from "@/mobile/server/entitlement";
const keys=generateKeyPairSync("ec",{namedCurve:"prime256v1"});
beforeEach(()=>{vi.resetAllMocks();vi.stubGlobal("crypto",webcrypto);m.privateKey=keys.privateKey.export({type:"pkcs8",format:"pem"}).toString();m.publicKey="";m.web.mockResolvedValue({entitled:false,expiresAt:null});m.identity.mockResolvedValue({appUserId:"opaque"});m.rc.mockResolvedValue(null);});
it("supports anonymous free users without DB, login, RevenueCat or offline rights",async()=>{expect(await mobileEntitlement(null)).toMatchObject({entitled:false,source:"free",lease:null});expect(m.web).not.toHaveBeenCalled();expect(m.rc).not.toHaveBeenCalled();});
it("prioritizes web membership and never consults RevenueCat to offer a second purchase",async()=>{
  const expiresAt=new Date(Date.now()+2*86400000).toISOString();m.web.mockResolvedValue({entitled:true,expiresAt});
  const r=await mobileEntitlement("u");expect(r).toMatchObject({source:"web",entitled:true,appUserId:"opaque"});expect(m.rc).not.toHaveBeenCalled();
  const verified=await verifyLease(r.lease,keys.publicKey.export({type:"spki",format:"pem"}).toString(),"u");expect(verified.expiresAt-verified.issuedAt).toBeLessThanOrEqual(86400000);
});
it("connects only server-verified RevenueCat rights and caps offline time at paid expiry",async()=>{
  const expiresAt=new Date(Date.now()+3600000);m.rc.mockResolvedValue({expiresAt});const r=await mobileEntitlement("u",true);expect(r).toMatchObject({source:"app-store",entitled:true,expiresAt:expiresAt.toISOString()});expect(m.rc).toHaveBeenCalledWith("u",true);
  const lease=await verifyLease(r.lease,keys.publicKey.export({type:"spki",format:"pem"}).toString(),"u");expect(lease.expiresAt).toBe(expiresAt.getTime());
});
it("a failed web identity lookup never becomes a purchase-eligible free account",async()=>{m.web.mockRejectedValue(Error("database offline"));await expect(mobileEntitlement("u")).rejects.toThrow("database offline");expect(m.rc).not.toHaveBeenCalled();});
it("signs with the bare base64 DER key form that production stores, and checks it against the public key",async()=>{
  // Production keeps both keys as bare base64 (no PEM header); sign() used to throw on that.
  m.privateKey=keys.privateKey.export({type:"pkcs8",format:"der"}).toString("base64");
  m.publicKey=keys.publicKey.export({type:"spki",format:"der"}).toString("base64");
  m.rc.mockResolvedValue({expiresAt:new Date(Date.now()+3600000)});
  const r=await mobileEntitlement("u",true);
  expect(r).toMatchObject({entitled:true,source:"app-store"});expect(r.leaseError).toBeUndefined();
  await expect(verifyLease(r.lease,m.publicKey,"u")).resolves.toMatchObject({userId:"u"});
  // Escaped-newline PEM (common in dashboard env vars) also works.
  m.privateKey=keys.privateKey.export({type:"pkcs8",format:"pem"}).toString().replace(/\n/g,"\\n");
  expect((await mobileEntitlement("u",true)).lease).toBeTruthy();
});
it("a broken or mismatched lease key never turns a paid member into an error",async()=>{
  m.rc.mockResolvedValue({expiresAt:new Date(Date.now()+3600000)});
  const error=vi.spyOn(console,"error").mockImplementation(()=>{});
  m.privateKey="not-a-key";
  expect(await mobileEntitlement("u",true)).toMatchObject({entitled:true,source:"app-store",lease:null,leaseError:"lease_key_invalid"});
  m.privateKey=keys.privateKey.export({type:"pkcs8",format:"pem"}).toString();
  m.publicKey=generateKeyPairSync("ec",{namedCurve:"prime256v1"}).publicKey.export({type:"spki",format:"der"}).toString("base64");
  expect(await mobileEntitlement("u",true)).toMatchObject({entitled:true,lease:null,leaseError:"lease_key_invalid"});
  expect(error).toHaveBeenCalled();error.mockRestore();
});
