import { Capacitor, CapacitorHttp, registerPlugin } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { confirmedSchedules, isQualificationUrl, QUALIFICATION_ORIGIN, qualificationUrl, todayJst, type CalendarDraft, type QualificationTarget } from "../shared/qualification-schedules";
interface QualificationBridge {
  openUniversalLink(options: { url: string }): Promise<{ opened: boolean }>;
  presentCalendar(options: CalendarDraft): Promise<{ saved: boolean }>;
}
const bridge = registerPlugin<QualificationBridge>("QualificationBridge");
export async function fetchQualificationSchedules(target: QualificationTarget): Promise<CalendarDraft[]> {
  qualificationUrl(target.id);
  if (!Capacitor.isNativePlatform()) throw new Error("日程の取得はiPhoneアプリで利用できます。");
  const url = `${QUALIFICATION_ORIGIN}/api/qualification-summaries?ids=${target.id}&schedules=1`;
  const response = await CapacitorHttp.get({ url, responseType: "json", headers: { Accept: "application/json" }, connectTimeout: 10000, readTimeout: 15000, disableRedirects: true });
  if (response.status !== 200) throw new Error("日程を取得できません。通信を確認して再取得してください。");
  if (typeof response.data === "string" && response.data.length > 500000) throw new Error("日程データの形式を確認できません。");
  return confirmedSchedules(typeof response.data === "string" ? JSON.parse(response.data) : response.data, target);
}
export async function openQualificationUrl(url: string, native = bridge, browser = Browser): Promise<void> {
  if (!isQualificationUrl(url)) throw new Error("資格の情報ページだけを開けます。");
  const { opened } = await native.openUniversalLink({ url });
  if (!opened) await browser.open({ url, presentationStyle: "fullscreen" });
}
export async function addQualificationEvent(event: CalendarDraft, target: QualificationTarget, request = fetchQualificationSchedules, native = bridge): Promise<boolean> {
  // Re-fetch on every tap so an old open screen cannot authorize a changed/withdrawn date.
  const fresh = (await request(target)).find(e => e.id === event.id);
  if (!fresh || fresh.startDay !== event.startDay || fresh.endDay !== event.endDay || fresh.sourceUrl !== event.sourceUrl || fresh.startDay < todayJst() || fresh.validUntil < todayJst()) throw new Error("日程が変更されたか、確定情報の確認期限を過ぎました。再取得してください。");
  return (await native.presentCalendar(fresh)).saved;
}
