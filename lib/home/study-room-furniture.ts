import catalog from "./study-room-furniture.json";
import { roomIdentitySeed } from "./study-room-scatter";
import type { RoomSeatPosition } from "./study-room-scenes";
import type { SeatMascot } from "./study-room";

export type FurnitureArt = typeof catalog[number];
export interface FurnitureMascot extends SeatMascot { art: FurnitureArt }
export const FURNITURE_ART: readonly FurnitureArt[] = catalog;

/** Exact whole-person quotas; anonymous exam + ordinal is the identity available in presence data. */
export function furnitureRoomMascots(keys: readonly string[], points: ReadonlyMap<string, number>, slots: readonly RoomSeatPosition[]): Map<string, FurnitureMascot> {
  const ranked = [...keys].sort((a, b) => roomIdentitySeed(`moment:${a}`) - roomIdentitySeed(`moment:${b}`) || a.localeCompare(b));
  const rests = Math.floor(keys.length * .07), naps = Math.round(keys.length * .14);
  const states = new Map(ranked.map((key, i) => [key, i < rests ? "rest" : i < rests + naps ? "nap" : "study"]));
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
    result.set(key, { art, src: `/images/home/study-room-v3/${art.id}.webp`,
      state: category === "study" ? "study" : category === "nap" ? "break" : "away",
      stateLabel: art.label, mirrored: false });
  }
  return result;
}
