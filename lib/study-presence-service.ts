import "server-only";
import { PRESENCE_POLL_MS, type StudyPresenceSnapshot } from "@/lib/study-presence";
import { measuredPresence, presenceRetryDelay, unavailablePresence, type MeasuredPresence, type PresenceResponse } from "@/lib/study-presence-contract";

interface PresenceStore {
  read: () => Promise<StudyPresenceSnapshot>;
  record: (id: string, idleMs: number, exam: string, previousId?: string) => Promise<StudyPresenceSnapshot>;
  legacy: (id: string, idleMs: number, previousId?: string) => Promise<number>;
}

/** Instance-local only: cold starts/other instances have separate caches and breakers.
 * No credentials, new shared service, background timer or changes to auth/save flows.
 */
export function createPresenceService(store: PresenceStore, now: () => number = Date.now) {
  let cached: MeasuredPresence | null = null;
  let readInFlight: Promise<PresenceResponse> | null = null;
  let failures = 0, retryAt = 0, generation = 0;
  let probing = false;
  const blocked = () => unavailablePresence("circuit_open", Math.max(PRESENCE_POLL_MS, retryAt - now()));

  async function attempt<T>(operation: () => Promise<T>): Promise<T | ReturnType<typeof unavailablePresence>> {
    if (now() < retryAt || probing) return blocked();
    const version = generation;
    const probe = failures > 0;
    if (probe) probing = true;
    try {
      const result = await operation();
      if (version === generation) { failures = 0; retryAt = 0; }
      return result;
    } catch {
      generation++;
      retryAt = now() + presenceRetryDelay(++failures);
      cached = null;
      return unavailablePresence("unavailable", retryAt - now());
    } finally { if (probe) probing = false; }
  }

  async function measure(operation: () => Promise<StudyPresenceSnapshot>): Promise<MeasuredPresence> {
    const measuredAt = now();
    const version = generation;
    const result = measuredPresence(await operation(), measuredAt);
    // An older in-flight success cannot erase a failure or overwrite a newer snapshot.
    if (version === generation && (!cached || Date.parse(cached.measuredAt) <= measuredAt)) cached = result;
    return result;
  }

  return {
    async read(): Promise<PresenceResponse> {
      if (now() < retryAt || probing) return blocked();
      if (cached && now() < Date.parse(cached.validUntil)) return cached;
      if (readInFlight) return readInFlight;
      const operation = attempt(() => measure(store.read));
      readInFlight = operation;
      try { return await operation; } finally { readInFlight = null; }
    },
    record: (id: string, idleMs: number, exam: string, previousId?: string) =>
      attempt(() => measure(() => store.record(id, idleMs, exam, previousId))),
    async legacy(id: string, idleMs: number, previousId?: string) {
      return attempt(async () => {
        const count = await store.legacy(id, idleMs, previousId);
        cached = null; // Unknown activity can change qualified totals; don't retimestamp an old snapshot.
        return { count };
      });
    },
  };
}
