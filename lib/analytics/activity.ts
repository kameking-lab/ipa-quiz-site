import "server-only";
import { z } from "zod";
import { jstDay } from "@/lib/billing/domain";
import { JOURNEY_QUALIFICATIONS } from "@/lib/billing/journey-contract";
import { ACTIVITY_EVENTS, ACTIVITY_PAGES, type ActivityData, type ActivityEvent, type ActivityRow } from "./activity-contract";

const eventSchema = z.object({ event: z.enum(ACTIVITY_EVENTS), qualification: z.string().refine(v => JOURNEY_QUALIFICATIONS.includes(v)), page: z.enum(ACTIVITY_PAGES) }).strict();
export const activityBody = z.object({ events: z.array(eventSchema).min(1).max(32) }).strict();
const key = (day: string) => `activity:v1:${day}`;
const field = (event: ActivityEvent) => `${event.event}|${event.qualification}|${event.page}`;
function store() {
  const url = process.env.KV_REST_API_URL?.replace(/\/+$/, ""), token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}
async function pipeline(commands: string[][]): Promise<unknown[] | null> {
  const kv = store();
  if (!kv) return null;
  try {
    const response = await fetch(`${kv.url}/pipeline`, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(3000), headers: { Authorization: `Bearer ${kv.token}`, "Content-Type": "application/json" }, body: JSON.stringify(commands) });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    return Array.isArray(payload) && payload.length === commands.length && payload.every(row => row && typeof row === "object" && !("error" in row) && "result" in row) ? payload : null;
  } catch { return null; }
}
export async function recordActivity(events: ActivityEvent[], now = Date.now()): Promise<boolean> {
  const parsed = activityBody.safeParse({ events });
  if (!parsed.success) return false;
  const counts = new Map<string, number>();
  for (const event of parsed.data.events) counts.set(field(event), (counts.get(field(event)) ?? 0) + 1);
  const dayKey = key(jstDay(new Date(now)));
  const commands = [...counts].map(([f, count]) => ["HINCRBY", dayKey, f, String(count)]);
  commands.push(["EXPIRE", dayKey, String(95 * 86400)]);
  // Await every write and validate Redis command errors, even on HTTP 200.
  return (await pipeline(commands)) !== null;
}
export async function readActivity(from: string, to: string): Promise<ActivityData> {
  const unavailable: ActivityData = { available: false, rows: [] };
  const start = Date.parse(`${from}T00:00:00Z`), end = Date.parse(`${to}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || !Number.isFinite(start) || !Number.isFinite(end) || start > end || end - start >= 95 * 86400000) return unavailable;
  const dates = Array.from({ length: (end - start) / 86400000 + 1 }, (_, i) => new Date(start + i * 86400000).toISOString().slice(0, 10));
  const payload = await pipeline(dates.map(day => ["HGETALL", key(day)]));
  if (!payload) return unavailable;
  const rows: ActivityRow[] = [];
  for (let i = 0; i < dates.length; i++) {
    const entry = payload[i] as { result: unknown };
    if (!Array.isArray(entry.result) || entry.result.length % 2) return unavailable;
    for (let j = 0; j < entry.result.length; j += 2) {
      if (typeof entry.result[j] !== "string") return unavailable;
      const [event, qualification, page, extra] = entry.result[j].split("|");
      const parsed = eventSchema.safeParse({ event, qualification, page });
      const rawCount = entry.result[j + 1];
      const count = typeof rawCount === "string" && /^\d+$/.test(rawCount) ? Number(rawCount) : typeof rawCount === "number" ? rawCount : NaN;
      if (!parsed.success || extra !== undefined || !Number.isSafeInteger(count) || count < 0) return unavailable;
      rows.push({ ...parsed.data, day: dates[i], count });
    }
  }
  return { available: true, rows };
}
