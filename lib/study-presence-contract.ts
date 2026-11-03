import { parseStudyPresence, PRESENCE_POLL_MS, PRESENCE_WINDOW_MS, type StudyPresenceSnapshot } from "@/lib/study-presence";

export const PRESENCE_STATE_EVENT = "study-presence-state";
export const PRESENCE_RETRY_MS = [90_000, 180_000, 300_000, 900_000] as const;
export const presenceRetryDelay = (failures: number) => PRESENCE_RETRY_MS[Math.min(Math.max(failures - 1, 0), PRESENCE_RETRY_MS.length - 1)];

export interface MeasuredPresence extends StudyPresenceSnapshot {
  status: "measured";
  /** count is retained for old clients; total is the room UI contract. */
  total: number;
  measuredAt: string;
  validUntil: string;
  windowSeconds: number;
}
export type PresenceUnavailableReason = "unavailable" | "disabled" | "circuit_open";
export interface UnavailablePresence {
  status: "unavailable";
  count: null;
  total: null;
  exams: null;
  measuredAt: null;
  validUntil: null;
  windowSeconds: number;
  reason: PresenceUnavailableReason;
  retryAfterSeconds: number;
}
export type PresenceResponse = MeasuredPresence | UnavailablePresence;
export type PresenceViewReason = PresenceUnavailableReason | "initial" | "inactive" | "hidden" | "expired";
export type PresenceViewState =
  | { mode: "measured"; snapshot: MeasuredPresence; previous: null }
  | { mode: "stale"; snapshot: null; previous: MeasuredPresence; reason: PresenceViewReason }
  | { mode: "promotion"; snapshot: null; previous: null; reason: PresenceViewReason };
// Demo is an explicit UI-only mode. Neither API responses nor failures create it.
export type PresenceRoomMode = PresenceViewState["mode"] | "demo";

export function measuredPresence(snapshot: StudyPresenceSnapshot, measuredAt: number): MeasuredPresence {
  return { ...snapshot, status: "measured", total: snapshot.count,
    measuredAt: new Date(measuredAt).toISOString(), validUntil: new Date(measuredAt + PRESENCE_POLL_MS).toISOString(),
    windowSeconds: PRESENCE_WINDOW_MS / 1000 };
}

/** Never manufacture a measurement timestamp from receipt time or old count-only payloads. */
export function parseMeasuredPresence(value: unknown, now = Date.now()): MeasuredPresence | null {
  const snapshot = parseStudyPresence(value);
  if (!snapshot || !value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  if (data.status !== "measured" || data.total !== snapshot.count || data.windowSeconds !== PRESENCE_WINDOW_MS / 1000 ||
      typeof data.measuredAt !== "string" || typeof data.validUntil !== "string") return null;
  const measuredAt = Date.parse(data.measuredAt), validUntil = Date.parse(data.validUntil);
  if (!Number.isFinite(measuredAt) || !Number.isFinite(validUntil) || measuredAt > now + 5_000 ||
      validUntil - measuredAt !== PRESENCE_POLL_MS) return null;
  if (new Date(measuredAt).toISOString() !== data.measuredAt || new Date(validUntil).toISOString() !== data.validUntil) return null;
  return { ...snapshot, status: "measured", total: snapshot.count, measuredAt: data.measuredAt,
    validUntil: data.validUntil, windowSeconds: PRESENCE_WINDOW_MS / 1000 };
}

export function unavailablePresence(reason: PresenceUnavailableReason, retryMs: number): UnavailablePresence {
  return { status: "unavailable", count: null, total: null, exams: null, measuredAt: null, validUntil: null,
    windowSeconds: PRESENCE_WINDOW_MS / 1000, reason, retryAfterSeconds: Math.max(1, Math.ceil(retryMs / 1000)) };
}

export function presenceFallback(previous: MeasuredPresence | null, reason: PresenceViewReason): PresenceViewState {
  return previous ? { mode: "stale", snapshot: null, previous, reason } : { mode: "promotion", snapshot: null, previous: null, reason };
}

export function presenceViewState(payload: unknown, httpOk: boolean, previous: MeasuredPresence | null, now = Date.now()): PresenceViewState {
  const snapshot = httpOk ? parseMeasuredPresence(payload, now) : null;
  if (snapshot) return Date.parse(snapshot.validUntil) > now
    ? { mode: "measured", snapshot, previous: null } : presenceFallback(snapshot, "expired");
  // A generic 503 or timeout never proves quota exhaustion.
  return presenceFallback(previous, "unavailable");
}

export function presenceRetryAfterMs(header: string | null | undefined, now = Date.now()): number {
  if (!header?.trim()) return 0;
  const value = header.trim();
  if (/^[+-]/.test(value)) return 0;
  const milliseconds = /^\d+$/.test(value) ? Number(value) * 1000 : Date.parse(value) - now;
  return Number.isFinite(milliseconds) && milliseconds > 0 ? Math.min(milliseconds, Number.MAX_SAFE_INTEGER - now) : 0;
}
