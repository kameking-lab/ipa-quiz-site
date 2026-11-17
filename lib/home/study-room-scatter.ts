import { randomFor } from "./study-room";
import type { RoomSeatPosition } from "./study-room-scenes";

export function roomIdentitySeed(key: string): number {
  let hash = 2166136261;
  for (const char of key) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

/** Continuous best-candidate floor sampling. Squares reserve room for every integrated pose. */
export function scatteredRoomPoints(count: number, width: number, height: number, headWidth: number,
  floor: { backY: number; backLeft: number; backRight: number; vanishingY: number }): RoomSeatPosition[] {
  const random = randomFor(20261117 + count);
  const points: RoomSeatPosition[] = [];
  for (let index = 0; index < count; index++) {
    let best: RoomSeatPosition | undefined, clearance = -1;
    for (let trial = 0; trial < 1600; trial++) {
      const floorY = floor.backY + 35 + random() * (height - floor.backY - 65);
      const size = headWidth * (floorY - floor.vanishingY) / (1500 - floor.vanishingY) * ROOM_ART_EXTENT;
      const depth = (floorY - floor.backY) / (height - floor.backY);
      const left = floor.backLeft * (1 - depth) + size / 2 + 8;
      const right = floor.backRight + (width - floor.backRight) * depth - size / 2 - 8;
      const point = { x: left + random() * (right - left), y: floorY - size / 2, width: size, floorY };
      const distance = points.length ? Math.min(...points.map(other =>
        Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y)) / ((size + other.width) / 2 + 8))) : 1;
      if (distance < 1) continue;
      // Small rooms keep more of the random sample: pure farthest-point selection
      // packs the smallest dogs along the back wall and looks like a row again.
      const score = count <= 12 ? random() : distance;
      if (score > clearance) { best = point; clearance = score; }
    }
    if (!best) throw new Error(`Insufficient floor space for ${count} learners at ${index}`);
    points.push(best);
  }
  // Fill the foreground first in sparsely occupied rooms, while keeping every point fixed.
  return points.sort((a, b) => b.floorY - a.floorY);
}

/** Largest sprite extent divided by its calibrated head width, with transparent padding. */
export const ROOM_ART_EXTENT = 4.1;

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
    let slot = roomIdentitySeed(key) % Math.min(capacity, keys.length);
    while (occupied.has(slot)) slot = (slot + 1) % capacity;
    next.set(key, slot); occupied.add(slot);
  }
  return next;
}
