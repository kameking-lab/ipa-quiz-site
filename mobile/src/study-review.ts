import { Capacitor, registerPlugin } from "@capacitor/core";

interface StudyReviewPlugin {
  requestReview(): Promise<{ requested: boolean }>;
}

let studyReview: StudyReviewPlugin | undefined;
const purchaseKey = "kakomon:study-review:last-purchase";
const purchaseQuietPeriod = 5 * 60_000;

export function rememberStudyReviewPurchase() {
  try { sessionStorage.setItem(purchaseKey, String(Date.now())); } catch { /* optional prompt */ }
}

export async function requestStudyReview() {
  if (Capacitor.getPlatform() !== "ios" || !Capacitor.isPluginAvailable("StudyReview")) return false;
  if (Date.now() - Number(sessionStorage.getItem(purchaseKey)) < purchaseQuietPeriod) return false;
  studyReview ??= registerPlugin<StudyReviewPlugin>("StudyReview");
  return (await studyReview.requestReview()).requested;
}
