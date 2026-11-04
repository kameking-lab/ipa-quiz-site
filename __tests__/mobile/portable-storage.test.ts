import {beforeEach,afterEach,expect,it,vi} from "vitest";
import {LS_KEYS} from "@/lib/storage/keys";
const m=vi.hoisted(()=>({preferences:new Map<string,string>()}));
vi.mock("@/mobile/node_modules/@capacitor/preferences",()=>({Preferences:{
  get:async({key}:{key:string})=>({value:m.preferences.get(key)??null}),
  set:async({key,value}:{key:string;value:string})=>{m.preferences.set(key,value);},
  keys:async()=>({keys:[...m.preferences.keys()]}),
  remove:async({key}:{key:string})=>{m.preferences.delete(key);},
}}));
import {persistStudy,restoreStudy,studyOwner,deleteStudy} from "@/mobile/src/portable-storage";
const WEB="https://www.kakomon-ai.jp",LOCAL="capacitor://localhost";
const ownerKey="kakomon:portable-study:owner:v2";
const history=(value:string)=>localStorage.setItem(LS_KEYS.history,value);
function origin(url:string){vi.stubGlobal("location",{origin:url});}
beforeEach(()=>{m.preferences.clear();localStorage.clear();origin(WEB);});
afterEach(()=>vi.unstubAllGlobals());
it("moves history, bookmarks, essay drafts and study plans across origins without purchase flags or API keys",async()=>{
  await restoreStudy("u1");history("web-history");localStorage.setItem(LS_KEYS.bookmarks,"bookmarks");
  localStorage.setItem("ipa-quiz:essay-draft:essay-1","draft");localStorage.setItem("ipa-quiz:essay-history:v1","grades");
  localStorage.setItem("ipa-quiz:study-plans:v1","plans");localStorage.setItem(LS_KEYS.examLibrarySessionPrefix+"paper","session");
  localStorage.setItem(LS_KEYS.premium,"1");localStorage.setItem("api-key","mock-do-not-transfer");
  await persistStudy("u1");
  expect(JSON.parse(m.preferences.get("kakomon:portable-study:v2:user:u1")!).data[LS_KEYS.history]).toBe("web-history");
  expect(location.origin).toBe(WEB);localStorage.clear();origin(LOCAL);expect(location.origin).toBe(LOCAL);await restoreStudy("u1");
  expect(localStorage.getItem(LS_KEYS.history)).toBe("web-history");expect(localStorage.getItem(LS_KEYS.bookmarks)).toBe("bookmarks");
  expect(localStorage.getItem("ipa-quiz:essay-draft:essay-1")).toBe("draft");expect(localStorage.getItem("ipa-quiz:essay-history:v1")).toBe("grades");
  expect(localStorage.getItem("ipa-quiz:study-plans:v1")).toBe("plans");expect(localStorage.getItem(LS_KEYS.examLibrarySessionPrefix+"paper")).toBe("session");
  expect(localStorage.getItem(LS_KEYS.premium)).toBeNull();expect(localStorage.getItem("api-key")).toBeNull();
  history("offline-answer");await persistStudy("u1");localStorage.clear();origin(WEB);await restoreStudy("u1");
  expect(localStorage.getItem(LS_KEYS.history)).toBe("offline-answer");
});
it("keeps independent guest and member histories through sign-out and account switching",async()=>{
  await restoreStudy(null);history("guest");await persistStudy(null);
  await restoreStudy("u1");expect(localStorage.getItem(LS_KEYS.history)).toBeNull();history("u1");await persistStudy("u1");
  await restoreStudy("u2");expect(localStorage.getItem(LS_KEYS.history)).toBeNull();history("u2");await persistStudy("u2");
  await restoreStudy("u1");expect(localStorage.getItem(LS_KEYS.history)).toBe("u1");
  await expect(persistStudy("u2")).rejects.toThrow("アカウントが変更");
  await restoreStudy(null);expect(localStorage.getItem(LS_KEYS.history)).toBe("guest");
  await restoreStudy("u2");expect(localStorage.getItem(LS_KEYS.history)).toBe("u2");
});
it("does not replace newer data when a same-origin refresh runs twice",async()=>{
  await restoreStudy("u1");history("first");await persistStudy("u1");history("new-answer");
  await Promise.all([restoreStudy("u1"),restoreStudy("u1")]);expect(localStorage.getItem(LS_KEYS.history)).toBe("new-answer");
});
it("remembers the study owner even when the paid download rights have been removed",async()=>{
  await restoreStudy("u1");history("retained-after-expiry");await persistStudy("u1");
  expect(await studyOwner(null)).toBe("u1");
  localStorage.clear();origin(LOCAL);await restoreStudy(await studyOwner(null));
  expect(localStorage.getItem(LS_KEYS.history)).toBe("retained-after-expiry");
});
it("migrates a legacy snapshot and filters unapproved keys rather than trusting all snapshot fields",async()=>{
  m.preferences.set("kakomon:portable-study:v1",JSON.stringify({owner:"u1",source:WEB,data:{[LS_KEYS.history]:"legacy",[LS_KEYS.premium]:"1","api-key":"mock"},at:1}));
  origin(LOCAL);await restoreStudy("u1");expect(localStorage.getItem(LS_KEYS.history)).toBe("legacy");
  expect(localStorage.getItem(LS_KEYS.premium)).toBeNull();expect(localStorage.getItem("api-key")).toBeNull();
  expect(JSON.parse(localStorage.getItem(ownerKey)!)).toEqual({owner:"u1"});
});
it("respects existing web-sync ownership and never carries another account's sync token",async()=>{
  localStorage.setItem(LS_KEYS.syncLocalOwner,JSON.stringify({userId:"old",token:"old-token"}));history("old-account");
  await restoreStudy("new");expect(localStorage.getItem(LS_KEYS.history)).toBeNull();expect(localStorage.getItem(LS_KEYS.syncLocalOwner)).toBeNull();
  await restoreStudy("old");expect(localStorage.getItem(LS_KEYS.history)).toBe("old-account");
  expect(JSON.parse(localStorage.getItem(LS_KEYS.syncLocalOwner)!)).toMatchObject({userId:"old"});
});
it("does not assign an old legacy member's unlabelled data to the next signed-in account",async()=>{
  m.preferences.set("kakomon:portable-study:v1",JSON.stringify({owner:"old",source:WEB,data:{[LS_KEYS.history]:"old-history"},at:1}));
  history("old-local");await restoreStudy("new");expect(localStorage.getItem(LS_KEYS.history)).toBeNull();
  await restoreStudy("old");expect(localStorage.getItem(LS_KEYS.history)).toBe("old-history");
});
it("recovers the current origin's snapshot after WebView local storage was purged",async()=>{
  await restoreStudy("u1");history("preserved");await persistStudy("u1");localStorage.clear();
  await restoreStudy("u1");expect(localStorage.getItem(LS_KEYS.history)).toBe("preserved");
});
it("deletes queued snapshots and prevents the other WKWebView origin restoring deleted data",async()=>{
  await restoreStudy("u1");history("private");await persistStudy("u1");
  const staleLocal=Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)!]));
  await deleteStudy();expect(m.preferences.has("kakomon:portable-study:v2:user:u1")).toBe(false);
  localStorage.clear();for(const [key,value] of Object.entries(staleLocal))localStorage.setItem(key,value);origin(LOCAL);
  await restoreStudy(null);expect(localStorage.getItem(LS_KEYS.history)).toBeNull();
  expect(m.preferences.has("kakomon:portable-study:v2:user:u1")).toBe(false);
});
