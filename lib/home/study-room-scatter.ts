import { randomFor } from "./study-room";
import type { RoomSeatPosition } from "./study-room-scenes";

export function roomIdentitySeed(key: string): number {
  let hash = 2166136261;
  for (const char of key) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

/** Fixed best-candidate points, independent of occupancy. No rows or reflow on arrival. */
export function scatteredRoomPoints(count: number, width: number, height: number, size: number): RoomSeatPosition[] {
  const random = randomFor(20261117 + count);
  const points: RoomSeatPosition[] = [];
  for (let index = 0; index < count; index++) {
    let best = { x: width / 2, y: height * .7, width: size }, clearance = -1;
    for (let trial = 0; trial < 800; trial++) {
      const point = { x: size * .65 + random() * (width - size * 1.3),
        y: height * .47 + size * .65 + random() * (height * .53 - size * 1.3), width: size };
      const distance = Math.min(...points.map(other => Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y))));
      if (distance > clearance) { best = point; clearance = distance; }
    }
    points.push(best);
  }
  return points;
}

/** Retain surviving anonymous identities, then hash newcomers into free points.
 * The aggregate exposes exam + ordinal, not actual learner IDs. */
export function assignRoomPoints(keys: readonly string[], capacity: number, previous: ReadonlyMap<string, number> = new Map()): Map<string, number> {
  const next = new Map<string, number>();
  const occupied = new Set<number>();
  for (const key of keys) {
    const slot = previous.get(key);
    if (slot !== undefined && slot < capacity && !occupied.has(slot)) { next.set(key, slot); occupied.add(slot); }
  }
  for (const key of [...keys].sort()) {
    if (next.has(key)) continue;
    let slot = roomIdentitySeed(key) % capacity;
    while (occupied.has(slot)) slot = (slot + 1) % capacity;
    next.set(key, slot); occupied.add(slot);
  }
  return next;
}
