import { Preferences } from "@capacitor/preferences";
import { recoverNativePurchase, releaseNativePurchase, type PurchaseReservation } from "./purchases";

export interface PendingPurchase {
  state: "preparing" | "recheck" | "approval" | "completed" | "release";
  attemptId: string;
  revision?: number;
  reservation?: PurchaseReservation;
  expiresAt?: string;
}

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

export async function reconcilePendingPurchase(userId: string, appStoreEntitled: boolean, expected?: PendingPurchase) {
  const key = pendingKey(userId);
  const { value } = await Preferences.get({ key });
  if (!value) return false;
  if (expected && value !== JSON.stringify(expected)) return true;
  const marker = readCurrentMarker(value);

  try {
    if ((marker?.state === "release" || appStoreEntitled) && marker?.reservation) {
      // Leave the release intent on disk until the exact reservation is acknowledged.
      await releaseNativePurchase(marker.reservation.id);
    } else if (!appStoreEntitled) {
      const legacyDate = Date.parse(value);
      const state = await recoverNativePurchase(marker?.state !== "preparing" && marker?.reservation
        ? { reservationId: marker.reservation.id, ...(marker.state === "approval" ? { action: "approval" } : {}) }
        : marker ? { attemptId: marker.attemptId }
        : Number.isFinite(legacyDate) ? { expiresAt: new Date(legacyDate).toISOString() } : { legacy: true });
      if (state) return true;
      // Older/non-monthly servers may return no reservation at checkout.
      if (!marker?.reservation && marker?.expiresAt) {
        const legacyAdjustment = marker.revision ? 0 : (marker.state === "approval" ? 1 : 24.5) * 3600000;
        if (Date.parse(marker.expiresAt) - legacyAdjustment > Date.now()) return true;
      }
    }
    const cleared = await replaceMarker(key, value, null);
    return !cleared && (await Preferences.get({ key })).value !== null;
  } catch {
    return !appStoreEntitled;
  }
}
