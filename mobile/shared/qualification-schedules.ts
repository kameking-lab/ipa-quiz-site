import links from "./qualification-links.json";
export const QUALIFICATION_ORIGIN = "https://tsugino-shikaku.jp";
export interface QualificationTarget { id: string; name: string; calendarScope: string }
export function qualificationTargets(code: string): QualificationTarget[] {
  return (links as Record<string, QualificationTarget[]>)[code] ?? [];
}
export function qualificationUrl(id: string): string {
  if (!/^[a-z0-9][a-z0-9-]{0,99}$/.test(id)) throw new Error("資格IDが不正です。");
  return `${QUALIFICATION_ORIGIN}/shikaku/${id}`;
}
export function isQualificationUrl(value: string): boolean {
  try { const u = new URL(value); return u.origin === QUALIFICATION_ORIGIN && !u.username && !u.password && !u.search && !u.hash && /^\/shikaku\/[a-z0-9][a-z0-9-]{0,99}$/.test(u.pathname); } catch { return false; }
}
export function validDay(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
}
export function todayJst(now = new Date()): string { return new Date(now.getTime()+9*3600000).toISOString().slice(0,10); }
function nextDay(day: string): string { return new Date(Date.parse(day)+86400000).toISOString().slice(0,10); }
function object(v: unknown): Record<string, unknown> { return v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {}; }
function safeSource(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try { const u = new URL(value); return u.protocol === "https:" && !!u.hostname && !u.username && !u.password && !u.port; } catch { return false; }
}
export interface CalendarDraft {
  id: string; qualificationId: string; title: string; startDay: string; endDay: string;
  sourceUrl: string; verifiedAt: string; validUntil: string; notes: string;
}
/** Only source-backed, published, future, exact dates; never infer dates from cadence. */
export function confirmedSchedules(value: unknown, target: QualificationTarget, today = todayJst()): CalendarDraft[] {
  const items = object(value).items;
  if (!Array.isArray(items) || target.calendarScope !== "specific") return [];
  const item = items.map(object).find(i => i.id === target.id);
  if (!item || item.publicationStatus !== "active") return [];
  const sessions = object(item.scheduleClock).schedules;
  if (!Array.isArray(sessions)) return [];
  const events: CalendarDraft[] = [];
  for (const s of sessions.map(object)) {
    if (s.qualificationId !== target.id || typeof s.id !== "string" || s.status !== "published" ||
        (s.sourceStatus !== undefined && s.sourceStatus !== "available") ||
        !safeSource(s.officialUrl) || !validDay(s.sourceVerifiedAt) || s.sourceVerifiedAt > today ||
        !validDay(s.sourceValidUntil) || s.sourceValidUntil < today || s.timezone !== "Asia/Tokyo" ||
        !Array.isArray(s.estimatedEventTypes) || s.venueDependent === true ||
        !["fixed", "annual", "semiannual"].includes(String(s.cadence))) continue;
    const estimated = s.estimatedEventTypes as unknown[];
    if (validDay(s.applicationOpenAt) && validDay(s.applicationDeadlineAt) && s.applicationOpenAt > s.applicationDeadlineAt) continue;
    if (validDay(s.examStartAt) && validDay(s.applicationDeadlineAt) && s.applicationDeadlineAt > s.examStartAt) continue;
    const add = (kind: string, label: string, day: unknown, end: unknown, source = s.officialUrl, verified = s.sourceVerifiedAt, suffix = "") => {
      if (!validDay(day) || day < today || !safeSource(source) || !validDay(verified) || verified > today) return;
      if (end != null && (!validDay(end) || end < day)) return;
      const last = validDay(end) ? end : day;
      const title = `${target.name} ${String(s.sessionLabel ?? "")} ${label}${suffix}`.trim();
      events.push({ id: `${s.id}:${kind}:${suffix}`, qualificationId: target.id, title, startDay: day, endDay: nextDay(last),
        sourceUrl: source, verifiedAt: verified, validUntil: s.sourceValidUntil as string,
        notes: `出典：${source}\n情報提供：${qualificationUrl(target.id)}\n出典確認日：${verified}\n日程確認期限：${s.sourceValidUntil}\n${kind === "exam" ? "試験日" : "申込締切"}。終日の予定です。締切時刻・申込方法・会場は出典で確認してください。` });
    };
    if (!estimated.some(k => ["exam", "exam_period_start", "exam_period_end"].includes(String(k)))) {
      // Date ranges/individual CBT reservations are not a person's confirmed exam date.
      if (s.examEndAt == null || s.examEndAt === s.examStartAt) add("exam", "試験日", s.examStartAt, null);
    }
    if (!estimated.some(k => ["application_open", "application_deadline"].includes(String(k)))) {
      if (Array.isArray(s.applicationMethods) && s.applicationMethods.length) {
        for (const method of s.applicationMethods.map(object)) {
          const deadline = typeof method.deadlineAt === "string" && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/.test(method.deadlineAt) ? method.deadlineAt.slice(0,10) : null;
          add("deadline", "申込締切", deadline, null, method.officialUrl, method.verifiedAt,
            `（${String(method.label ?? "申込方法")}・${method.deadlineRule === "postmark" ? "消印有効" : "必着／受付期限"}）`);
        }
      } else add("deadline", "申込締切", s.applicationDeadlineAt, null);
    }
  }
  return [...new Map(events.map(e => [e.id,e])).values()].sort((a,b) => a.startDay.localeCompare(b.startDay));
}
