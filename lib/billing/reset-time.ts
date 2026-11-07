/** The free quota always resets at 00:00 in Japan (UTC+9, no DST). */
const DAY = 86_400_000, JST = 9 * 3_600_000;
/** The first 00:00 JST strictly after `time`. */
export function nextJstMidnight(time: number): Date {
  return new Date((Math.floor((time + JST) / DAY) + 1) * DAY - JST);
}
/**
 * Display label for a reset time, e.g. "10/31 0:00（日本時間）". The server sends
 * the next JST midnight; any other time of day is snapped to the following
 * 00:00 JST so the screen can never promise a mid-day reset.
 */
export function jstResetLabel(resetAt: string | null | undefined, now = Date.now()): string {
  const parsed = resetAt ? Date.parse(resetAt) : NaN;
  const at = Number.isFinite(parsed) ? nextJstMidnight(parsed - 1) : nextJstMidnight(now);
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit", hourCycle: "h23",
  }).format(at) + "（日本時間）";
}
