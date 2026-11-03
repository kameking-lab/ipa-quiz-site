import { Preferences } from "@capacitor/preferences";
import { LS_KEYS } from "@/lib/storage/keys";
const LEGACY = "kakomon:portable-study:v1";
const PREFIX = "kakomon:portable-study:v2:";
const ACTIVE = "kakomon:portable-study:active:v2";
const LOCAL_OWNER = "kakomon:portable-study:owner:v2";
const DELETION_EPOCH = "kakomon:deletion-epoch:v1";
// Only study data moves between the site's origin and the bundled origin.
// Purchase flags, API credentials, cookies and server quota are never imported.
const keys: string[] = [LS_KEYS.history, LS_KEYS.bookmarks, LS_KEYS.starred, LS_KEYS.spacedRepetition, LS_KEYS.lastQuestion,
  LS_KEYS.settings, LS_KEYS.customTags, LS_KEYS.mockScores, LS_KEYS.mockExam, LS_KEYS.studyDays, LS_KEYS.xpState,
  LS_KEYS.earnedBadges, LS_KEYS.achievements, LS_KEYS.dailyGoal, LS_KEYS.studyReward, LS_KEYS.studyRewardPreferences,
  LS_KEYS.dailyChallenge, LS_KEYS.dailyMissions, LS_KEYS.gold, LS_KEYS.motivation, LS_KEYS.reviewSchedule,
  LS_KEYS.reviewSeen, LS_KEYS.examDate, LS_KEYS.theme, LS_KEYS.character, LS_KEYS.characterEnabled,
  LS_KEYS.syncLocalOwner, "ipa-quiz:essay-history:v1", "ipa-quiz:study-plans:v1", "ipa-quiz:study-plan-progress:v1"];
const prefixes = [LS_KEYS.examLibraryPrefix, LS_KEYS.examLibrarySessionPrefix, "ipa-quiz:essay-draft:"];
interface Snapshot { owner: string | null; source: string; data: Record<string,string>; at: number }
const snapshotKey = (owner:string|null) => PREFIX + (owner === null ? "guest" : `user:${encodeURIComponent(owner)}`);
function isStudyKey(key:string) { return keys.includes(key) || prefixes.some(prefix=>key.startsWith(prefix)); }
function studyKeys() { return Object.keys(localStorage).filter(isStudyKey); }
function capture(owner:string|null):Snapshot {
  const data:Record<string,string> = {};
  for(const key of studyKeys()) {
    const value=localStorage.getItem(key);
    if(value!==null)data[key]=value;
  }
  return {owner,source:location.origin,data,at:Date.now()};
}
function localOwner():string|null|undefined {
  const raw=localStorage.getItem(LOCAL_OWNER);
  if(raw) return parseOwner(raw);
  // Respect the web sync's existing account boundary on first migration.
  const sync=localStorage.getItem(LS_KEYS.syncLocalOwner);
  if(sync) {
    const value=JSON.parse(sync) as {userId?:unknown};
    if(typeof value.userId!=="string")throw new Error("端末の学習履歴の所有者を確認できません。");
    return value.userId;
  }
  return undefined;
}
function parseOwner(raw:string):string|null {
  const value=JSON.parse(raw) as {owner?:unknown};
  if(value.owner!==null&&typeof value.owner!=="string")throw new Error("端末の学習履歴の所有者を確認できません。");
  return value.owner;
}
function parseSnapshot(raw:string,owner:string|null):Snapshot {
  const value=JSON.parse(raw) as Snapshot;
  if(value.owner!==owner || typeof value.source!=="string" || !value.data || typeof value.data!=="object" || Array.isArray(value.data)
    || !Object.values(value.data).every(v=>typeof v==="string"))throw new Error("保存した学習履歴を確認できません。");
  return value;
}
let operations:Promise<unknown>=Promise.resolve();
function serialize<T>(fn:()=>Promise<T>) {
  const task=operations.then(fn);operations=task.catch(()=>{});return task;
}
async function save(snapshot:Snapshot) { await Preferences.set({key:snapshotKey(snapshot.owner),value:JSON.stringify(snapshot)}); }
/** Account ownership persists independently of a paid/offline lease. */
export async function studyOwner(fallback:string|null=null):Promise<string|null> {
  await operations;
  const raw=(await Preferences.get({key:ACTIVE})).value;
  return raw ? parseOwner(raw) : fallback;
}
export function restoreStudy(owner:string|null) { return serialize(async()=>{
  const epoch=(await Preferences.get({key:DELETION_EPOCH})).value;
  // Both WKWebView origins share Preferences but have separate localStorage.
  // The other origin must discard its old snapshot before saving anything.
  if(epoch && localStorage.getItem(DELETION_EPOCH)!==epoch){
    studyKeys().forEach(key=>localStorage.removeItem(key));localStorage.removeItem(LOCAL_OWNER);
    localStorage.setItem(DELETION_EPOCH,epoch);
  }
  const previous=localOwner();
  let raw=(await Preferences.get({key:snapshotKey(owner)})).value;
  const legacy=(await Preferences.get({key:LEGACY})).value;
  if(!raw) {
    if(legacy && (JSON.parse(legacy) as Snapshot).owner===owner)raw=legacy;
  }
  const snapshot=raw?parseSnapshot(raw,owner):null;
  if(previous!==undefined && previous!==owner)await save(capture(previous));
  const legacyOwnerMismatch=previous===undefined && legacy && (JSON.parse(legacy) as Snapshot).owner!==owner;
  if(previous!==undefined && previous!==owner || legacyOwnerMismatch || snapshot && (snapshot.source!==location.origin || previous===undefined && !studyKeys().length)) {
    studyKeys().forEach(key=>localStorage.removeItem(key));
    for(const [key,value] of Object.entries(snapshot?.data??{}))if(isStudyKey(key))localStorage.setItem(key,value);
  }
  // A sync ownership token is valid only for its original account.
  const sync=localStorage.getItem(LS_KEYS.syncLocalOwner);
  if(sync && (JSON.parse(sync) as {userId?:string}).userId!==owner)localStorage.removeItem(LS_KEYS.syncLocalOwner);
  localStorage.setItem(LOCAL_OWNER,JSON.stringify({owner}));
  await save(capture(owner));
  await Preferences.set({key:ACTIVE,value:JSON.stringify({owner})});
}); }
export function persistStudy(owner:string|null) {
  if(localOwner()!==owner)return Promise.reject(new Error("アカウントが変更されたため学習履歴の保存を中止しました。"));
  const snapshot=capture(owner);
  return serialize(()=>save(snapshot));
}
/** Queued after in-flight snapshots; deletion cannot race a mirror write. */
export function deleteStudy() { return serialize(async()=>{
  const epoch=String(Date.now());await Preferences.set({key:DELETION_EPOCH,value:epoch});localStorage.setItem(DELETION_EPOCH,epoch);
  studyKeys().forEach(key=>localStorage.removeItem(key));
  localStorage.removeItem(LOCAL_OWNER);
  const {keys:stored}=await Preferences.keys();
  for(const key of stored)if(key.startsWith(PREFIX)||[LEGACY,ACTIVE].includes(key))await Preferences.remove({key});
}); }
