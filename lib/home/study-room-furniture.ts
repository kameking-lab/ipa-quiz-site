import catalog from "./study-room-furniture.json";
import qualificationCatalog from "./study-room-mascots.generated.json";
import { roomIdentitySeed } from "./study-room-scatter";
import type { RoomSeatPosition } from "./study-room-scenes";
import type { SeatMascot } from "./study-room";
import { idleArt, qualificationMascot, qualificationStudyArt } from "./study-room";

export type FurnitureArt = typeof catalog[number];
export interface FurnitureMascot extends SeatMascot { art: FurnitureArt; qualification: boolean; turn: number }
export const FURNITURE_ART: readonly FurnitureArt[] = catalog;

/** Exact whole-person quotas; anonymous exam + ordinal is the identity available in presence data. */
export function furnitureRoomMascots(keys: readonly string[], points: ReadonlyMap<string, number>, slots: readonly RoomSeatPosition[]): Map<string, FurnitureMascot> {
  const ranked = [...keys].sort((a, b) => roomIdentitySeed(`moment:${a}`) - roomIdentitySeed(`moment:${b}`) || a.localeCompare(b));
  const examOf = (key: string) => key.slice(0, key.lastIndexOf(":"));
  const ownNap = (key: string) => {
    const src = idleArt(examOf(key), "nap");
    return src && !src.includes("/field-") ? src : null;
  };
  const ownAway = (key: string) => (qualificationCatalog.away.exams as Record<string, { src: string; label: string }>)[examOf(key)];
  const resting = Math.round(keys.length * .2);
  const rests = keys.length >= 10 ? Math.max(1, Math.round(keys.length * .06)) : 0;
  const states = new Map(keys.map(key => [key, "study"]));
  // Prefer real sleeping/playing artwork over labelling an awake study pose as a nap.
  // Shared qualifications keep their own clothes and tools when no dedicated pose exists.
  const playOrder = [...ranked].sort((a, b) => Number(Boolean(ownAway(b))) - Number(Boolean(ownAway(a))));
  for (const key of playOrder.slice(0, rests)) states.set(key, "rest");
  const napOrder = ranked.filter(key => states.get(key) === "study").sort((a, b) => Number(Boolean(ownNap(b))) - Number(Boolean(ownNap(a))));
  for (const key of napOrder.slice(0, resting - rests)) states.set(key, "nap");
  const result = new Map<string, FurnitureMascot>();
  // Stable spatial order makes visual choices independent of the server's exam order.
  for (const key of [...keys].sort((a, b) => points.get(a)! - points.get(b)!)) {
    const point = slots[points.get(key)!];
    const neighbours = [...result].sort(([a], [b]) => {
      const distance = (other: string) => { const p = slots[points.get(other)!]; return Math.hypot(p.x - point.x, p.y - point.y); };
      return distance(a) - distance(b);
    }).slice(0, 3).map(([, mascot]) => mascot.art);
    const category = states.get(key)!;
    const candidates = catalog.filter(art => art.category === category);
    const penalty = (art: FurnitureArt) => neighbours.reduce((sum, other, i) => sum +
      ((art.pose === other.pose ? 8 : 0) + (art.direction === other.direction ? 4 : 0) +
        (art.direction.endsWith("left") === other.direction.endsWith("left") ? 1 : 0)) / (i + 1), 0);
    candidates.sort((a, b) => penalty(a) - penalty(b) || roomIdentitySeed(`${key}:${a.id}`) - roomIdentitySeed(`${key}:${b.id}`));
    const art = candidates[0];
    const seed = roomIdentitySeed(key);
    const exam = key.slice(0, key.lastIndexOf(":"));
    const qualification = !qualificationStudyArt(exam).includes("/generic-");
    const generic: SeatMascot = { src: `/images/home/study-room-v3/${art.id}.webp`,
      state: category === "study" ? "study" : category === "nap" ? "break" : "away",
      stateLabel: art.label, mirrored: false };
    let mascot = generic;
    if (qualification) {
      // Never put the generic ar-4 dog underneath a qualification's outfit.
      // Missing nap/book poses use this qualification's existing study/break pair.
      // Shared field idle art has no qualification-specific props. Keep the
      // qualification's own study/break composite rather than dropping its tools.
      const ownIdle = (pose: "nap" | "book") => {
        const src = idleArt(exam, pose);
        return src && !src.includes("/field-") ? src : null;
      };
      const nap = category === "nap" && ownNap(key);
      const away = category === "rest" && ownAway(key);
      mascot = qualificationMascot(exam, { ...generic, state: category === "study" ? "study" : "break" });
      if (away) mascot = { ...mascot, src: away.src, state: "away", stateLabel: `席を立って遊んでいる：${away.label}` };
      else if (nap) mascot = { ...mascot, src: nap, state: "break", stateLabel: "机でうたた寝" };
      else if (category === "study" && seed % 3 === 0) {
        const book = ownIdle("book");
        if (book) mascot = { ...mascot, src: book, stateLabel: "本で勉強中" };
      }
      mascot = { ...mascot, mirrored: art.direction.endsWith("left") };
    }
    result.set(key, { ...mascot, art, qualification, turn: seed % 5 - 2 });
  }
  return result;
}
