import { canonicalPresenceExam, type StudyPresenceSnapshot } from "@/lib/study-presence";
import catalog from "./study-room-mascots.generated.json";

/** Maximum illustrations, not a room capacity. */
export const STUDY_ROOM_VISIBLE_LIMIT = 12;
export function roomStage(count: number) {
  return count >= 49 ? 4 : count >= 25 ? 3 : count >= 13 ? 2 : count >= 6 ? 1 : 0;
}
export function measuredRoom(snapshot: StudyPresenceSnapshot) {
  const seats: { exam: string; index: number }[] = [];
  for (const row of snapshot.exams) {
    const remaining = Math.min(row.count, STUDY_ROOM_VISIBLE_LIMIT - seats.length);
    for (let i = 0; i < remaining; i++) seats.push({ exam: row.exam, index: seats.length });
    if (seats.length === STUDY_ROOM_VISIBLE_LIMIT) break;
  }
  return { seats, hidden: snapshot.count - seats.length, stage: roomStage(snapshot.count) };
}

export const MASCOT_VISIT_KEY = "study-room-mascot-visit:v1";
let memorySeed: number | undefined;
/** Per-tab visit seed; storage-denied browsers retain it across room remounts. */
export function mascotVisitSeed() {
  try {
    const stored = sessionStorage.getItem(MASCOT_VISIT_KEY);
    if (stored !== null && /^\d+$/.test(stored) && Number(stored) <= 0xffffffff) return Number(stored);
  } catch { /* Private mode can deny storage. */ }
  memorySeed ??= crypto.getRandomValues(new Uint32Array(1))[0];
  try { sessionStorage.setItem(MASCOT_VISIT_KEY, String(memorySeed)); } catch { /* Memory fallback. */ }
  return memorySeed;
}

function randomFor(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export interface SeatMascot { src: string; state: "study" | "break" | "away"; stateLabel: string; mirrored: boolean; vacantSrc?: string }
type Pair = { study: string; break: string; breakLabel: string };
type AwayArt = { src: string; label: string };
const awayCatalog = catalog as typeof catalog & {
  away?: { exams: Record<string, AwayArt>; fields: Record<string, AwayArt>; examFields: Record<string, string> };
  vacant?: string;
};
/** Mean over 12 slots: 80% study, 15% desk antics, 5% away. Never more than one away. */
export function roomMascots(seed: number): SeatMascot[] {
  const random = randomFor(seed);
  const slots = Array.from({ length: STUDY_ROOM_VISIBLE_LIMIT }, (_, i) => i);
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  const breakCount = random() < 0.8 ? 2 : 1;
  const breaks = new Set(slots.slice(0, breakCount));
  const awaySlot = random() < 0.6 ? slots[breakCount] : -1;
  const hasAwayArt = Boolean(awayCatalog.vacant && (Object.keys(awayCatalog.away?.exams ?? {}).length || Object.keys(awayCatalog.away?.fields ?? {}).length));
  const studying = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11];
  return slots.map((_, index) => {
    const mirrored = random() < 0.5;
    const state = index === awaySlot && hasAwayArt ? "away" : breaks.has(index) ? "break" : "study";
    const pose = state === "break" ? 9 : studying[Math.floor(random() * studying.length)];
    return { src: `/images/home/study-room-mascots/generic-${pose}.webp`, state,
      stateLabel: state === "away" ? "席を立って遊んでいる" : state === "break" ? "あるある：うたた寝" : "勉強中", mirrored,
      ...(state === "away" ? { vacantSrc: awayCatalog.vacant } : {}) };
  });
}

/** Qualification > domain > existing generic pose. Never borrow another qualification's outfit. */
export function qualificationMascot(exam: string, slot: SeatMascot): SeatMascot {
  const code = canonicalPresenceExam(exam) ?? exam;
  if (slot.state === "away") {
    const away = awayCatalog.away;
    const art = away?.exams[code] ?? away?.fields[away.examFields[code]];
    if (art) return { ...slot, src: art.src, stateLabel: `席を立って遊んでいる：${art.label}` };
  }
  // An unfinished away outfit must not borrow another qualification's dog.
  const state = slot.state === "break" ? "break" : "study";
  const seated: SeatMascot = slot.state === "away" ? { ...slot, state, stateLabel: "勉強中", vacantSrc: undefined } : slot;
  const domain = (catalog.examDomains as Record<string, string>)[code];
  const pair = (catalog.exams as Record<string, Pair>)[code] ?? (catalog.domains as Record<string, Pair>)[domain];
  return pair ? { ...seated, src: pair[state], stateLabel: state === "study" ? "勉強中" : `あるある：${pair.breakLabel}` } : seated;
}

/** The qualification's own studying chihuahua (its outfit, no headband) for cards outside the room. */
export function qualificationStudyArt(exam: string): string {
  const code = canonicalPresenceExam(exam) ?? exam;
  const domain = (catalog.examDomains as Record<string, string>)[code];
  const pair = (catalog.exams as Record<string, Pair>)[code] ?? (catalog.domains as Record<string, Pair>)[domain];
  return pair?.study ?? "/images/home/study-room-mascots/generic-8.webp";
}
