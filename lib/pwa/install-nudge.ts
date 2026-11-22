import { LS_KEYS } from "@/lib/storage/keys";

export const INSTALL_DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
export interface InstallNudgeRecord { shownDay?: string; dismissedAt?: number }

/** Match the practice quota's Japan-time day boundary. */
export function installDay(now: number): string {
  return new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function canShowInstallNudge(record: InstallNudgeRecord, now: number): boolean {
  return record.shownDay !== installDay(now)
    && !(record.dismissedAt !== undefined && now - record.dismissedAt < INSTALL_DISMISS_MS);
}

/** Unavailable or malformed storage suppresses optional promotion. */
export function readInstallNudge(): InstallNudgeRecord | null {
  try {
    const raw = localStorage.getItem(LS_KEYS.mobileInstallNudge);
    const value: unknown = raw ? JSON.parse(raw) : {};
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as InstallNudgeRecord;
    if (record.shownDay !== undefined && (typeof record.shownDay !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(record.shownDay))) return null;
    if (record.dismissedAt !== undefined && (typeof record.dismissedAt !== "number" || !Number.isFinite(record.dismissedAt) || record.dismissedAt < 0)) return null;
    return record;
  } catch { return null; }
}

export function writeInstallNudge(record: InstallNudgeRecord): boolean {
  try { localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify(record)); return true; }
  catch { return false; }
}
