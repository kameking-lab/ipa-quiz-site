import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { emptyPetProfiles, petProfileStorageKey, petLearningFactSchema } from "@/lib/pet/v1/profile";
import { applyPetLearningFact } from "@/lib/pet/v1/learning";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { browserPetSubmissions, petSubmissionPaintDelay } from "@/lib/pet/v1/submission-order";
const state=vi.hoisted(()=>({preferences:new Map<string,string>()}));
vi.mock("@capacitor/preferences",()=>({Preferences:{
  get:async({key}:{key:string})=>({value:state.preferences.get(key)??null}),
  set:async({key,value}:{key:string;value:string})=>{state.preferences.set(key,value);},
  keys:async()=>({keys:[...state.preferences.keys()]}),remove:async({key}:{key:string})=>{state.preferences.delete(key);},
}}));
import { restoreStudy, persistStudy, portablePetOwner, deleteStudy } from "@/mobile/src/portable-storage";
import { persistStudyAfterPets } from "@/mobile/src/pet-support";
const WEB="https://www.kakomon-ai.jp", LOCAL="capacitor://localhost", ACTIVE="kakomon:portable-study:active:v2";
const guest=petProfileStorageKey("guest"), a=petProfileStorageKey("user:a"), b=petProfileStorageKey("user:b");
function snapshot(owner:string|null) {return JSON.parse(state.preferences.get(`kakomon:portable-study:v2:${owner===null?"guest":`user:${owner}`}`)!).data;}
beforeEach(()=>{state.preferences.clear();localStorage.clear();vi.stubGlobal("location",{origin:WEB});});
afterEach(()=>{vi.unstubAllGlobals();vi.useRealTimers();});
it("moves only the chosen owner's pet, keeps other local partitions, and preserves the exact old guest source",async()=>{
  await restoreStudy(null);localStorage.setItem(guest,"guest-pet");localStorage.setItem(a,"a-private");localStorage.setItem(LS_KEYS.petLearning,"old-guest-source");await persistStudy(null);
  expect(snapshot(null)[guest]).toBe("guest-pet");expect(snapshot(null)[a]).toBeUndefined();
  localStorage.clear();vi.stubGlobal("location",{origin:LOCAL});await restoreStudy(null);
  expect(localStorage.getItem(guest)).toBe("guest-pet");expect(localStorage.getItem(LS_KEYS.petLearning)).toBe("old-guest-source");expect(localStorage.getItem(a)).toBeNull();
  await restoreStudy("a");localStorage.setItem(a,"a-pet");localStorage.setItem(b,"b-private");await persistStudy("a");
  expect(snapshot("a")[a]).toBe("a-pet");expect(snapshot("a")[b]).toBeUndefined();expect(snapshot("a")[guest]).toBeUndefined();expect(snapshot("a")[LS_KEYS.petLearning]).toBeUndefined();
  expect(localStorage.getItem(guest)).toBe("guest-pet");expect(localStorage.getItem(LS_KEYS.petLearning)).toBe("old-guest-source");
  await restoreStudy("b");expect(localStorage.getItem(a)).toBe("a-pet");expect(localStorage.getItem(b)).toBe("b-private");
});
it("filters foreign-owner keys in a saved snapshot, and old snapshots cannot erase retained local pet data",async()=>{
  state.preferences.set("kakomon:portable-study:v2:user:a",JSON.stringify({owner:"a",source:WEB,data:{[a]:"a-good",[b]:"b-secret",[guest]:"guest-secret",[LS_KEYS.petLearning]:"legacy-secret"},at:1}));
  vi.stubGlobal("location",{origin:LOCAL});await restoreStudy("a");
  expect(localStorage.getItem(a)).toBe("a-good");expect(localStorage.getItem(b)).toBeNull();expect(localStorage.getItem(guest)).toBeNull();expect(localStorage.getItem(LS_KEYS.petLearning)).toBeNull();
  localStorage.setItem(b,"local-b");await restoreStudy("b");expect(localStorage.getItem(b)).toBe("local-b");
  state.preferences.set("kakomon:portable-study:v2:user:a",JSON.stringify({owner:"a",source:WEB,data:{[LS_KEYS.history]:"old-no-pet"},at:1}));
  await restoreStudy("a");expect(localStorage.getItem(a)).toBe("a-good");expect(localStorage.getItem(b)).toBe("local-b");
});
it("requires agreement of restored local marker and active Preferences, revoking old leases on switch and deletion",async()=>{
  expect(await portablePetOwner(()=>true)).toBeNull();
  await restoreStudy("a");const first=await portablePetOwner(()=>true);expect(first?.ownerScope).toBe("user:a");expect(await first?.revalidate()).toBe(true);
  await restoreStudy("b");expect(first?.isCurrent()).toBe(false);expect(await first?.revalidate()).toBe(false);
  await restoreStudy("a");expect(first?.isCurrent()).toBe(false);
  const second=await portablePetOwner(()=>true);state.preferences.set(ACTIVE,JSON.stringify({owner:"b"}));expect(await second?.revalidate()).toBe(false);expect(await portablePetOwner(()=>true)).toBeNull();
  state.preferences.set(ACTIVE,JSON.stringify({owner:"a"}));const deleted=await portablePetOwner(()=>true);await deleteStudy();expect(deleted?.isCurrent()).toBe(false);expect(await portablePetOwner(()=>true)).toBeNull();
});
it("explicit device deletion removes all pet scopes and the old source, and prevents other-origin resurrection",async()=>{
  await restoreStudy(null);for(const key of [guest,a,b,LS_KEYS.petLearning])localStorage.setItem(key,"private");await persistStudy(null);
  const stale=Object.fromEntries(Object.keys(localStorage).map(key=>[key,localStorage.getItem(key)!]));await deleteStudy();
  for(const key of [guest,a,b,LS_KEYS.petLearning])expect(localStorage.getItem(key)).toBeNull();
  localStorage.clear();for(const [key,value]of Object.entries(stale))localStorage.setItem(key,value);vi.stubGlobal("location",{origin:LOCAL});await restoreStudy(null);
  for(const key of [guest,a,b,LS_KEYS.petLearning])expect(localStorage.getItem(key)).toBeNull();
});
it("rejects a save queued after deletion and a stale-origin save before restore, including epoch-tagged snapshots",async()=>{
  await restoreStudy(null);localStorage.setItem(guest,"private");await persistStudy(null);
  const stale=Object.fromEntries(Object.keys(localStorage).map(key=>[key,localStorage.getItem(key)!]));
  const deletion=deleteStudy(),late=expect(persistStudy(null)).rejects.toThrow();await deletion;await late;
  expect(state.preferences.has("kakomon:portable-study:v2:guest")).toBe(false);
  localStorage.clear();for(const [key,value]of Object.entries(stale))localStorage.setItem(key,value);vi.stubGlobal("location",{origin:LOCAL});
  await expect(persistStudy(null)).rejects.toThrow();expect(state.preferences.has("kakomon:portable-study:v2:guest")).toBe(false);
  state.preferences.set("kakomon:portable-study:v2:guest",stale["CapacitorStorage.kakomon:portable-study:v2:guest"]??JSON.stringify({owner:null,source:WEB,data:{[guest]:"stale-private"},at:1,epoch:null}));
  await restoreStudy(null);expect(localStorage.getItem(guest)).toBeNull();
});
it("preserves malformed, future-version and wrong-owner raw bytes instead of replacing them from the other origin",async()=>{
  const valid=JSON.stringify(emptyPetProfiles("user:a","Asia/Tokyo"));
  for(const raw of ["{",JSON.stringify({...emptyPetProfiles("user:a","Asia/Tokyo"),version:99}),JSON.stringify(emptyPetProfiles("user:b","Asia/Tokyo"))]) {
    localStorage.clear();state.preferences.clear();await restoreStudy("b");localStorage.setItem(a,raw);
    state.preferences.set("kakomon:portable-study:v2:user:a",JSON.stringify({owner:"a",source:WEB,data:{[a]:valid},at:1}));
    vi.stubGlobal("location",{origin:LOCAL});await expect(restoreStudy("a")).rejects.toThrow("上書きせず保持");expect(localStorage.getItem(a)).toBe(raw);
    expect(snapshot("a")[a]).toBe(valid);
  }
});
it("flushes a captured pre-paint learning event before background Preferences backup and restores it offline",async()=>{
  await restoreStudy(null);const owner=(await portablePetOwner(()=>true))!;vi.useFakeTimers();
  const store=new PetProfileStore({storage:localStorage,now:Date.now,exclusive:{run:async(_key,work)=>work()}});
  const event=petLearningFactSchema.parse({eventId:"background-one",ownerScope:"guest",qualificationId:"ap",canonicalQuestionId:"q1",contentVersion:"v1",sessionId:"s1",attemptKind:"answer",grade:"correct",reviewCycleId:null,occurredAt:Date.parse("2026-11-05T12:00:00+09:00"),policyVersion:1});
  const ready=petSubmissionPaintDelay();
  const pending=browserPetSubmissions.enqueue(async()=>{await ready;await store.update({...owner,verifyCurrent:()=>owner.revalidate()},"Asia/Tokyo",doc=>applyPetLearningFact(doc,event).document);});
  expect(localStorage.getItem(guest)).toBeNull();await persistStudyAfterPets(null);await pending;
  expect(JSON.parse(snapshot(null)[guest]).profiles[0].growth).toBe(3);
  vi.useRealTimers();localStorage.clear();vi.stubGlobal("location",{origin:LOCAL});await restoreStudy(null);
  const restored=await store.load((await portablePetOwner(()=>true))!,"UTC");expect(restored).toMatchObject({status:"ready",document:{timeZone:"Asia/Tokyo",profiles:[{growth:3,roomEvents:[{scene:"first-meeting"}]}]}});
  expect(emptyPetProfiles("user:unrelated","UTC").profiles).toEqual([]);
});
