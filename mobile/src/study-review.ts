import { Capacitor, registerPlugin } from "@capacitor/core";

const StudyReview = registerPlugin<{ requestReview(): Promise<{ requested: boolean }> }>("StudyReview");
const purchaseKey = "kakomon:study-review:last-purchase";
const purchaseQuietPeriod = 5 * 60_000;

export function rememberStudyReviewPurchase() {
  try { sessionStorage.setItem(purchaseKey, String(Date.now())); } catch { /* optional prompt */ }
}

export async function requestStudyReview() {
  if (Capacitor.getPlatform() !== "ios" || !Capacitor.isPluginAvailable("StudyReview")) return false;
  if (Date.now() - Number(sessionStorage.getItem(purchaseKey)) < purchaseQuietPeriod) return false;
  return (await StudyReview.requestReview()).requested;
}
