import { Preferences } from "@capacitor/preferences";
import { PURCHASE_MESSAGES } from "@/lib/billing/purchase-messages";
import { readNativePurchaseHold, recoverNativePurchase, releaseNativePurchase, type PurchaseReservation } from "./purchases";
import type { AppStorePurchaseState } from "@/lib/billing/subscription/domain";

export interface PendingPurchase {
  state: "preparing" | "recheck" | "approval" | "completed" | "release";
  attemptId: string;
  revision?: number;
  reservation?: PurchaseReservation;
  expiresAt?: string;
}
type PendingApproval = { reservationId: string | null };
export type PendingPurchaseStatus = "processing" | { approval: PendingApproval } | null;

const pendingKey = (userId: string) => `kakomon:pending-purchase:${userId}`;
const pendingWrites = new Map<string, Promise<boolean>>();
export const fallbackPurchaseExpiry = (approval = false) => new Date(Date.now() + (approval ? 24 * 60 : 30) * 60000).toISOString();

function replaceMarker(key: string, expected: string | null, next: string | null) {
  // Serialize only the local compare/write, never the network requests. Both
  // the attempt/reservation ID and its revision are part of the compare.
  const write = (pendingWrites.get(key) ?? Promise.resolve()).catch(() => {}).then(async () => {
    if ((await Preferences.get({ key })).value !== expected) return false;
    if (next === null) await Preferences.remove({ key });
    else await Preferences.set({ key, value: next });
    return true;
  });
  pendingWrites.set(key, write);
  const forget = () => { if (pendingWrites.get(key) === write) pendingWrites.delete(key); };
  void write.then(forget, forget);
  return write;
}
export function savePendingPurchase(userId: string, previous: PendingPurchase | undefined, next?: PendingPurchase) {
  return replaceMarker(pendingKey(userId), previous ? JSON.stringify(previous) : null, next ? JSON.stringify(next) : null);
}

function readCurrentMarker(raw: string): PendingPurchase | null {
  try {
    const marker = JSON.parse(raw) as Partial<PendingPurchase> | null;
    return marker && typeof marker.attemptId === "string"
      && ["preparing", "recheck", "approval", "completed", "release"].includes(marker.state ?? "") ? marker as PendingPurchase : null;
  } catch {
    return null;
  }
}

export async function reconcilePendingPurchase(userId: string, appStoreEntitled: boolean, expected?: PendingPurchase): Promise<PendingPurchaseStatus> {
  const key = pendingKey(userId);
  const { value } = await Preferences.get({ key }).catch(() => ({ value: null }));
  const marker = value ? readCurrentMarker(value) : null;
  let state: AppStorePurchaseState = null;
  let recoveryFailed = false;

  try {
    if (value && (!expected || value === JSON.stringify(expected))) {
      if (marker?.reservation && (marker.state === "release" || (appStoreEntitled && marker.state !== "approval"))) {
        // Keep a cancellation intent until the exact reservation is acknowledged.
        await releaseNativePurchase(marker.reservation.id);
      } else if (!appStoreEntitled || marker?.state === "approval" && marker.reservation) {
        const legacyDate = Date.parse(value);
        state = await recoverNativePurchase(marker?.state !== "preparing" && marker?.reservation
          ? { reservationId: marker.reservation.id, ...(marker.state === "approval" ? { action: "approval" } : {}) }
          : marker ? { attemptId: marker.attemptId }
          : Number.isFinite(legacyDate) ? { expiresAt: new Date(legacyDate).toISOString() } : { legacy: true });
      }
    }
  } catch {
    recoveryFailed = true;
  }

  try {
    if (!appStoreEntitled) {
      const { managed, pending } = await readNativePurchaseHold(userId);
      if (pending) return pending;
      // A successful group read supersedes an old local approval, even if the
      // previous release response or the auxiliary marker lookup failed.
      if (managed && marker?.state === "approval" && marker.reservation) recoveryFailed = false;
      if (!managed && marker && !marker.reservation && marker.expiresAt) {
        // Legacy checkout can return no reservation. Preserve its local expiry.
        const adjustment = marker.revision ? 0 : (marker.state === "approval" ? 1 : 24.5) * 3600000;
        if (Date.parse(marker.expiresAt) - adjustment > Date.now()) {
          return marker.state === "approval" ? { approval: { reservationId: null } } : "processing";
        }
      }
      if (recoveryFailed || state) return "processing";
    }
    if (value && !recoveryFailed) {
      if (expected && value !== JSON.stringify(expected)) return "processing";
      if (!await replaceMarker(key, value, null) && (await Preferences.get({ key })).value) return "processing";
    }
    return null;
  } catch {
    return appStoreEntitled ? null : "processing";
  }
}

export async function retryPendingApproval(userId: string, { reservationId }: PendingApproval, checkDevice: () => Promise<boolean>) {
  const recover = (request: Parameters<typeof recoverNativePurchase>[0]) => recoverNativePurchase(request).catch(() => {
    throw new Error(PURCHASE_MESSAGES.purchase_check_unavailable);
  });
  if (reservationId) {
    if (await checkDevice()) return "active";
    return recover({ reservationId, action: "retry-approval" });
  }

  const key = pendingKey(userId);
  const { value } = await Preferences.get({ key });
  const marker = value ? readCurrentMarker(value) : null;
  if (marker?.state !== "approval" || marker.reservation) return;
  if (await checkDevice()) return "active";
  if ((await Preferences.get({ key })).value !== value) return;
  const state = await recover({ legacy: true });
  if (state === null) await replaceMarker(key, value, null);
  return state;
}
