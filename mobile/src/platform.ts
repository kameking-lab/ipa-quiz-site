import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { Network } from "@capacitor/network";
import { Browser } from "@capacitor/browser";
import { LocalNotifications } from "@capacitor/local-notifications";

export const API_ORIGIN = "https://www.kakomon-ai.jp";

export interface ApiResponse { status: number; data: unknown }
export type Transport = (path: string, body?: unknown) => Promise<ApiResponse>;
export const apiRequest: Transport = async (path, body) => {
  // No arbitrary URL or redirect target can be supplied by a downloaded pack.
  if (!/^\/api\/mobile\/packs\?(pack=ip|pack=fe)&since=\d+$/.test(path) && path !== "/api/copilot")
    throw new Error("許可されていないAPIです。");
  const url = API_ORIGIN + path;
  if (Capacitor.isNativePlatform()) {
    const response = await CapacitorHttp.request({
      url, method: body === undefined ? "GET" : "POST",
      headers: { Accept: path === "/api/copilot" ? "text/plain" : "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
      data: body, responseType: "text", connectTimeout: 15000, readTimeout: 45000,
      disableRedirects: true,
    });
    return { status: response.status, data: response.data };
  }
  // Browser preview needs explicit server CORS. Production iOS uses native HTTP.
  const response = await fetch(url, { method: body === undefined ? "GET" : "POST",
    body: body === undefined ? undefined : JSON.stringify(body), credentials: "omit", redirect: "error",
    headers: body === undefined ? {} : { "Content-Type": "application/json" }, signal: AbortSignal.timeout(45000) });
  return { status: response.status, data: await response.text() };
};
export function parseJson(data: unknown): unknown {
  if (typeof data === "string" && data.length > 4_000_000) throw new Error("更新データが大きすぎるため、現在の問題を保持します。");
  return typeof data === "string" ? JSON.parse(data) as unknown : data;
}
export async function observeConnection(listener: (connected: boolean) => void): Promise<() => void> {
  const handle = await Network.addListener("networkStatusChange", s => listener(s.connected));
  listener((await Network.getStatus()).connected);
  return () => { void handle.remove(); };
}
export async function isOnline(): Promise<boolean> { return (await Network.getStatus()).connected; }

const NOTIFICATION_ID = 11003;
export async function setReminder(time: string | null): Promise<void> {
  if (!Capacitor.isNativePlatform()) throw new Error("リマインダーはiPhoneアプリで設定できます。");
  if (time !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error("時刻が不正です。");
  if (time !== null) {
    let permission = await LocalNotifications.checkPermissions();
    if (permission.display === "prompt") permission = await LocalNotifications.requestPermissions();
    if (permission.display !== "granted") throw new Error("通知が許可されていません。iPhoneの設定で変更できます。");
  }
  if (time === null) {
    await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });
    return;
  }
  // UNUserNotificationCenter replaces a request with the same identifier.
  // Scheduling errors therefore do not first erase the previous reminder.
  const [hour, minute] = time.split(":").map(Number);
  await LocalNotifications.schedule({ notifications: [{
    id: NOTIFICATION_ID, title: "過去問AIでひと問復習", body: "今日の一歩を。間違えた問題から振り返りましょう。",
    schedule: { on: { hour, minute }, repeats: true, allowWhileIdle: false },
    extra: { destination: "review" },
  }] });
}
export async function observeReminderTap(listener: () => void): Promise<() => void> {
  if (!Capacitor.isNativePlatform()) return () => {};
  const handle = await LocalNotifications.addListener("localNotificationActionPerformed", event => {
    if (event.notification.id === NOTIFICATION_ID) listener();
  });
  return () => { void handle.remove(); };
}
export async function openExternal(url: string): Promise<void> {
  const u = new URL(url);
  if (u.protocol !== "https:" || !["www.kakomon-ai.jp", "www.ipa.go.jp", "www.jitec.ipa.go.jp", "www3.jitec.ipa.go.jp"].includes(u.hostname))
    throw new Error("このリンクは開けません。");
  if (Capacitor.isNativePlatform()) await Browser.open({ url });
  else window.open(url, "_blank", "noopener,noreferrer");
}
