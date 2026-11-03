import { Preferences } from "@capacitor/preferences";
import { LS_KEYS } from "@/lib/storage/keys";
const KEY = "kakomon:portable-study:v1";
const keys: string[] = [LS_KEYS.history, LS_KEYS.bookmarks, LS_KEYS.starred, LS_KEYS.spacedRepetition, LS_KEYS.lastQuestion,
  LS_KEYS.settings, LS_KEYS.customTags, LS_KEYS.mockScores, LS_KEYS.mockExam, LS_KEYS.studyDays, LS_KEYS.xpState,
  LS_KEYS.earnedBadges, LS_KEYS.achievements, LS_KEYS.dailyGoal, LS_KEYS.studyReward];
interface Snapshot { owner: string | null; source: string; data: Record<string,string>; at: number }
function studyKeys() { return [...keys,...Object.keys(localStorage).filter(k=>k.startsWith(LS_KEYS.examLibraryPrefix))]; }
export async function restoreStudy(owner: string | null) {
  const raw = (await Preferences.get({ key:KEY })).value;
  if (!raw) return;
  const snapshot = JSON.parse(raw) as Snapshot;
  if (snapshot.owner !== owner) { studyKeys().forEach(k=>localStorage.removeItem(k)); return; }
  if (snapshot.source !== location.origin) for (const key of new Set([...studyKeys(),...Object.keys(snapshot.data).filter(k=>k.startsWith(LS_KEYS.examLibraryPrefix))])) {
    const value = snapshot.data[key]; if (value !== undefined) localStorage.setItem(key,value); else localStorage.removeItem(key);
  }
  if(snapshot.source!==location.origin)await persistStudy(owner);
}
let writes: Promise<unknown> = Promise.resolve();
export function persistStudy(owner: string | null) {
  const data: Record<string,string> = {};
  studyKeys().forEach(key=>{ const v=localStorage.getItem(key); if (v!==null) data[key]=v; });
  const snapshot: Snapshot = { owner,source:location.origin,data,at:Date.now() };
  const task = writes.then(()=>Preferences.set({ key:KEY,value:JSON.stringify(snapshot) }));
  writes = task.catch(()=>{}); return task;
}
