import "server-only";
import { PRESENCE_POLL_MS, type StudyPresenceSnapshot, type StudyPresenceToday } from "@/lib/study-presence";
import { measuredPresence, presenceRetryDelay, unavailablePresence, type MeasuredPresence, type PresenceResponse } from "@/lib/study-presence-contract";

interface PresenceStore {
  read: (measuredAt: number) => Promise<{ snapshot: StudyPresenceSnapshot; today?: StudyPresenceToday; expiresAt?: number; yesterdayCount?: number }>;
  record: (id: string, answeredAt: number, exam: string, previousId?: string) => Promise<void>;
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

  async function measure(): Promise<MeasuredPresence> {
    const measuredAt = now();
    const version = generation;
    const { snapshot, today, expiresAt, yesterdayCount } = await store.read(measuredAt);
    const result = measuredPresence(snapshot, measuredAt, expiresAt, today, yesterdayCount);
    // An older in-flight success cannot erase a failure or overwrite a newer snapshot.
    if (version === generation && (!cached || Date.parse(cached.measuredAt) <= measuredAt)) cached = result;
    return result;
  }

  return {
    async read(): Promise<PresenceResponse> {
      if (now() < retryAt || probing) return blocked();
      if (cached && now() < Date.parse(cached.validUntil)) return cached;
      if (readInFlight) return readInFlight;
      const operation = attempt(measure);
      readInFlight = operation;
      try { return await operation; } finally { if (readInFlight === operation) readInFlight = null; }
    },
    async record(id: string, answeredAt: number, exam: string, previousId?: string) {
      const failure = await attempt(() => store.record(id, answeredAt, exam, previousId));
      if (failure) return failure;
      // A read started before this write cannot be reused for later readers.
      generation++;
      cached = null;
      readInFlight = null;
    },
  };
}
