import { canonicalPresenceExam, type StudyPresenceSnapshot } from "@/lib/study-presence";
import catalog from "./study-room-mascots.generated.json";
import variety from "./study-room-variety.json";

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

/** Deterministic per-visit random source (the same visit draws the same room). */
export function randomFor(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = Math.imul(value ^ value >>> 15, 1 | value);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export interface SeatMascot { src: string; state: "study" | "break" | "away" | "idle"; stateLabel: string; mirrored: boolean; vacantSrc?: string }
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

/** Qualification > domain > existing generic pose. Never borrow another qualification's outfit.
 * A studying seat may show one of its character's idle moments instead (same character, same desk framing). */
export function qualificationMascot(exam: string, slot: SeatMascot, idle: IdleVariant | null = null): SeatMascot {
  const code = canonicalPresenceExam(exam) ?? exam;
  const idleSrc = idle && slot.state === "study" ? idleArt(code, idle) : null;
  if (idle && idleSrc) return { ...slot, state: "idle", src: idleSrc, stateLabel: `ひと休み：${IDLE_LABELS[idle]}` };
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

/** Idle moments every character can show at its desk (studying stays the default). */
export const IDLE_VARIANTS = ["stretch", "yawn", "book", "tea", "nap", "pencil", "wave"] as const;
export type IdleVariant = typeof IDLE_VARIANTS[number];
export const IDLE_LABELS: Record<IdleVariant, string> = {
  stretch: "のび", yawn: "あくび", book: "別の本を読む", tea: "お茶", nap: "うたた寝", pencil: "えんぴつと遊ぶ", wave: "こちらに手をふる",
};
const idleCatalog = variety as { idle: Record<string, string[]> };
/** Dedicated qualifications have their own character; the rest share their field's character. */
export function roomCharacter(exam: string): string {
  const code = canonicalPresenceExam(exam) ?? exam;
  const field = awayCatalog.away?.examFields[code];
  return field ? `field-${field}` : code;
}
export function idleArt(exam: string, idle: IdleVariant): string | null {
  return characterIdleArt(roomCharacter(exam), idle);
}
function characterIdleArt(character: string, idle: IdleVariant): string | null {
  return Object.hasOwn(idleCatalog.idle, character) && idleCatalog.idle[character].includes(idle)
    ? `/images/home/study-room-mascots/idle/${character}-${idle}.webp` : null;
}

export interface SeatIdle { idle: IdleVariant | null; last: IdleVariant | null }
/** At most this many seats are on an idle moment at once, so the room still mostly studies. */
export const MAX_IDLE_SEATS = 3;
function idleChoices(index: number, poses: SeatIdle[], characters: string[]) {
  // Never the same moment back to back, and never the same picture twice in the room.
  const shown = new Set(poses.flatMap((pose, i) => i !== index && characters[i] === characters[index] && pose.idle ? [pose.idle] : []));
  return IDLE_VARIANTS.filter(idle => idle !== poses[index].last && !shown.has(idle) && characterIdleArt(characters[index], idle));
}
/** Opening poses: a seat that repeats an earlier seat's character starts on a different moment. */
export function initialSeatIdles(characters: (string | null)[], random: () => number): SeatIdle[] {
  const poses: SeatIdle[] = characters.map(() => ({ idle: null, last: null }));
  characters.forEach((character, index) => {
    if (!character || !characters.slice(0, index).includes(character)) return;
    if (poses.filter(pose => pose.idle).length >= MAX_IDLE_SEATS) return;
    const choices = idleChoices(index, poses, characters as string[]);
    if (choices.length) poses[index] = { idle: choices[Math.floor(random() * choices.length)], last: null };
  });
  return poses;
}
/** One tick: one seat either returns to studying or starts a new idle moment. Null characters never change. */
export function nextSeatIdles(poses: SeatIdle[], characters: (string | null)[], random: () => number): SeatIdle[] {
  const eligible = characters.flatMap((character, i) => character ? [i] : []);
  if (!eligible.length) return poses;
  let index = eligible[Math.floor(random() * eligible.length)];
  const active = eligible.filter(i => poses[i].idle);
  if (!poses[index].idle && active.length >= MAX_IDLE_SEATS) index = active[Math.floor(random() * active.length)];
  const next = poses.slice();
  const current = poses[index];
  if (current.idle) { next[index] = { idle: null, last: current.idle }; return next; }
  const choices = idleChoices(index, poses, characters as string[]);
  if (!choices.length) return poses;
  next[index] = { idle: choices[Math.floor(random() * choices.length)], last: current.last };
  return next;
}

/** Fewer learners than this: everyone studies at their desk (no break, idle moment or playing dog). */
export const QUIET_ROOM_BELOW = 4;
export function quietRoomMascots(slots: SeatMascot[], learners: number): SeatMascot[] & { quiet: boolean } {
  const quiet = learners < QUIET_ROOM_BELOW;
  const result = (quiet ? slots.map(slot => slot.state === "study" ? slot : { ...slot, state: "study" as const, stateLabel: "勉強中", vacantSrc: undefined }) : slots.slice()) as SeatMascot[] & { quiet: boolean };
  result.quiet = quiet;
  return result;
}
