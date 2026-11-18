export function roomIdentitySeed(key: string): number {
  let hash = 2166136261;
  for (const char of key) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
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
