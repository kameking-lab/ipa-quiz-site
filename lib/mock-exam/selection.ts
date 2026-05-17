import type { Question } from "@/lib/questions/types";
import { shuffle } from "@/lib/questions/filter";

export type SelectionMode = "random" | "balanced";

export interface SelectionInput {
  pool: Question[];
  target: number;
  mode?: SelectionMode;
}

/**
 * Pick `target` questions from `pool` according to the chosen strategy.
 *
 * - "random": uniform shuffle, take first N.
 * - "balanced": preserve the pool's category proportions, then shuffle the
 *   final list so order within the mock is still random.
 *
 * Always returns up to `target` questions; if the pool is smaller, returns
 * the entire pool shuffled.
 */
export function selectMockExamQuestions({
  pool,
  target,
  mode = "balanced",
}: SelectionInput): Question[] {
  if (pool.length === 0) return [];
  if (pool.length <= target) {
    const all = [...pool];
    shuffle(all);
    return all;
  }
  if (mode === "random") {
    const shuffled = [...pool];
    shuffle(shuffled);
    return shuffled.slice(0, target);
  }
  return pickBalanced(pool, target);
}

/**
 * Stratified sampling by `category`: allocate per-category seats proportional
 * to the pool composition, then distribute leftover seats by largest
 * fractional remainder (Hamilton method) so totals always equal `target`.
 */
function pickBalanced(pool: Question[], target: number): Question[] {
  const byCategory = new Map<string, Question[]>();
  for (const q of pool) {
    const key = q.category || "その他";
    const list = byCategory.get(key);
    if (list) list.push(q);
    else byCategory.set(key, [q]);
  }

  type Bucket = {
    key: string;
    items: Question[];
    quota: number;
    floor: number;
    frac: number;
  };
  const buckets: Bucket[] = [];
  let floorSum = 0;
  for (const [key, items] of byCategory) {
    const quota = (items.length / pool.length) * target;
    const floor = Math.floor(quota);
    buckets.push({ key, items, quota, floor, frac: quota - floor });
    floorSum += floor;
  }

  let remaining = target - floorSum;
  buckets.sort((a, b) => b.frac - a.frac);
  for (const b of buckets) {
    if (remaining <= 0) break;
    b.floor += 1;
    remaining -= 1;
  }

  const picked: Question[] = [];
  for (const b of buckets) {
    const take = Math.min(b.floor, b.items.length);
    if (take <= 0) continue;
    const shuffled = [...b.items];
    shuffle(shuffled);
    picked.push(...shuffled.slice(0, take));
  }

  if (picked.length < target) {
    const used = new Set(picked.map((q) => q.id));
    const leftover = pool.filter((q) => !used.has(q.id));
    shuffle(leftover);
    picked.push(...leftover.slice(0, target - picked.length));
  }

  shuffle(picked);
  return picked.slice(0, target);
}
