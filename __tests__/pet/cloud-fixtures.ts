import { applyPetLearningFact } from "@/lib/pet/v1/learning";
import { emptyPetProfiles } from "@/lib/pet/v1/profile";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { PetCloudLimiter } from "@/lib/pet/server/cloud-profile";
import type { PetCloudDeps, PetCloudRepository, PetCloudRow } from "@/lib/pet/server/cloud-profile";

export const ZONE = "Asia/Tokyo";
export const T0 = Date.parse("2026-11-01T09:00:00+09:00");
export const DAY = 86_400_000;
let sequence = 0;

/** One graded answer through the real learning policy. */
export function answer(document: PetProfileDocument, qualificationId: string, questionId: string, occurredAt: number,
  grade: "correct" | "incorrect" = "correct"): PetProfileDocument {
  const result = applyPetLearningFact(document, {
    eventId: `event-${++sequence}`, ownerScope: document.ownerScope, qualificationId, canonicalQuestionId: questionId,
    contentVersion: "v1", sessionId: `session-${occurredAt}`, attemptKind: "answer", grade, reviewCycleId: null,
    reviewBefore: null, fieldId: "field-a", occurredAt, policyVersion: 1,
  });
  if (result.outcome !== "applied") throw new Error(result.outcome);
  return result.document;
}
export function studied(ownerScope: string, qualificationId: string, questions: string[], start = T0): PetProfileDocument {
  let document = emptyPetProfiles(ownerScope, ZONE);
  questions.forEach((question, index) => { document = answer(document, qualificationId, question, start + index * 1000); });
  return document;
}
export function profileOf(document: PetProfileDocument, qualificationId: string) {
  const profile = document.profiles.find(item => item.qualificationId === qualificationId);
  if (!profile) throw new Error(`missing ${qualificationId}`);
  return profile;
}

export function memoryStorage() {
  const data = new Map<string, string>();
  return { data, getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value); },
    removeItem: (key: string) => { data.delete(key); } };
}
export function serialExclusive() {
  const tails = new Map<string, Promise<void>>();
  return { async run<T>(key: string, operation: () => Promise<T>): Promise<T> {
    const prior = tails.get(key) ?? Promise.resolve();
    let release!: () => void;
    tails.set(key, new Promise<void>(resolve => { release = resolve; }));
    await prior;
    try { return await operation(); } finally { release(); }
  } };
}
export function deviceStore(storage = memoryStorage(), now = () => T0) {
  return { storage, store: new PetProfileStore({ storage, exclusive: serialExclusive(), now }) };
}

/** In-memory Postgres stand-in with the same compare-and-set semantics. */
export function memoryRepository(): PetCloudRepository & { rows: Map<string, PetCloudRow>; writes: number } {
  const rows = new Map<string, PetCloudRow>();
  const repo = {
    rows, writes: 0,
    async findVersion(userId: string) { return rows.get(userId)?.version ?? null; },
    async find(userId: string) { const row = rows.get(userId); return row ? structuredClone(row) : null; },
    async create(userId: string, document: unknown) {
      if (rows.has(userId)) return false;
      rows.set(userId, { document: structuredClone(document), version: 1 }); repo.writes++; return true;
    },
    async update(userId: string, expected: number, document: unknown) {
      const row = rows.get(userId);
      if (!row || row.version !== expected) return false;
      rows.set(userId, { document: structuredClone(document), version: expected + 1 }); repo.writes++; return true;
    },
  };
  return repo;
}
export function serverDeps(repository: PetCloudRepository | null, user: () => string | null, now = () => T0): PetCloudDeps {
  return { userId: async () => user(), repository: () => repository, now, limiter: new PetCloudLimiter({ read: 1000, write: 1000, windowMs: 60_000 }) };
}
export const ORIGIN = "https://www.kakomon-ai.jp";
export function sameOriginInit(init: RequestInit = {}): RequestInit {
  return { ...init, headers: { origin: ORIGIN, "sec-fetch-site": "same-origin", ...(init.headers as Record<string, string> | undefined) } };
}
