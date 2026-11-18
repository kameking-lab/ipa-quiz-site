import { Preferences } from "@capacitor/preferences";
import { recoverNativePurchase, releaseNativePurchase, type PurchaseReservation } from "./purchases";

export interface PendingPurchase {
  state: "recheck" | "approval" | "completed" | "release";
  attemptId: string;
  reservation?: PurchaseReservation;
  expiresAt?: string;
}

const pendingKey = (userId: string) => `kakomon:pending-purchase:${userId}`;
export const fallbackPurchaseExpiry = () => new Date(Date.now() + 25 * 3600000).toISOString();
export function savePendingPurchase(userId: string, purchase: PendingPurchase) {
  return Preferences.set({ key: pendingKey(userId), value: JSON.stringify(purchase) });
}
export function clearPendingPurchase(userId: string) {
  return Preferences.remove({ key: pendingKey(userId) });
}

function readCurrentMarker(raw: string): PendingPurchase | null {
  try {
    const marker = JSON.parse(raw) as Partial<PendingPurchase> | null;
    return marker && typeof marker.attemptId === "string"
      && ["recheck", "approval", "completed", "release"].includes(marker.state ?? "") ? marker as PendingPurchase : null;
  } catch {
    return null;
  }
}

export async function reconcilePendingPurchase(userId: string, appStoreEntitled: boolean) {
  const key = pendingKey(userId);
  const { value } = await Preferences.get({ key });
  if (!value) return false;
  const marker = readCurrentMarker(value);
  const expiresAt = marker?.reservation?.expiresAt ?? marker?.expiresAt;
  if (!appStoreEntitled && (marker?.state === "approval" || marker?.state === "completed")
    && Date.parse(expiresAt ?? "") > Date.now()) return true;

  try {
    if ((marker?.state === "release" || appStoreEntitled) && marker?.reservation) {
      // Leave the release intent on disk until the exact reservation is acknowledged.
      await releaseNativePurchase(marker.reservation.id);
    } else if (!appStoreEntitled) {
      const legacyDate = Date.parse(value);
      const state = await recoverNativePurchase(marker?.reservation ? { reservationId: marker.reservation.id }
        : marker ? { attemptId: marker.attemptId }
        : Number.isFinite(legacyDate) ? { expiresAt: new Date(legacyDate).toISOString() } : { legacy: true });
      if (state) return true;
    }
    await clearPendingPurchase(userId);
    return false;
  } catch {
    return !appStoreEntitled;
  }
}
