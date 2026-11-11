import "server-only";
import { z } from "zod";
import { jstDay } from "./domain";
import { JOURNEY_PAGES, JOURNEY_STAGES, journeyQualification, type JourneySnapshot } from "./journey-contract";

const RETENTION = 95 * 86400;
const snapshot = z.object({
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  qualification: z.string().refine(value => journeyQualification(value) === value),
  page: z.enum(JOURNEY_PAGES), offer: z.enum(["none", ...JOURNEY_PAGES]), stage: z.enum(JOURNEY_STAGES),
  answers: z.number().int().min(0).max(10000), outcome: z.enum(["unconfirmed", "purchased"]),
}).strict();
export const journeyBody = z.object({
  changes: z.array(snapshot.extend({ delta: z.union([z.literal(-1), z.literal(1)]) })).min(1).max(24),
  // Used transiently for the existing ownership/status check; never put in KV or logs.
  purchaseOrder: z.string().min(1).max(128).optional(),
}).strict();
export type JourneyBody = z.infer<typeof journeyBody>;
function store() {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, ""), token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}
function key(day: string) { return `funnel:journey:v1:${day}`; }
function field(row: JourneySnapshot) { return [row.qualification, row.outcome, row.page, row.offer, row.stage].join("|"); }

// One atomic aggregate replacement. No per-browser keys, hashes, sets or event log.
const UPDATE = `for i=1,#ARGV-1,3 do
  redis.call('HINCRBY',KEYS[1],ARGV[i]..'|sessions',ARGV[i+1])
  redis.call('HINCRBY',KEYS[1],ARGV[i]..'|answers',ARGV[i+2])
end
redis.call('EXPIRE',KEYS[1],ARGV[#ARGV])
return 1`;

export async function recordJourney(body: JourneyBody, now = Date.now()): Promise<boolean> {
  const kv = store();
  if (!kv) return false;
  const today = jstDay(new Date(now)), yesterday = jstDay(new Date(now - 86400_000));
  if (body.changes.some(row => row.day !== today && row.day !== yesterday)) return false;
  const days = [...new Set(body.changes.map(row => row.day))];
  const commands = days.map(day => ["EVAL", UPDATE, "1", key(day),
    ...body.changes.filter(row => row.day === day).flatMap(row => [field(row), String(row.delta), String(row.delta * row.answers)]), String(RETENTION)]);
  try {
    const response = await fetch(`${kv.url}/pipeline`, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(1500),
      headers: { Authorization: `Bearer ${kv.token}`, "Content-Type": "application/json" }, body: JSON.stringify(commands) });
    if (!response.ok) return false;
    const result: unknown = await response.json();
    return Array.isArray(result) && result.length === commands.length && result.every(row => row?.result === 1 && !row?.error);
  } catch { return false; }
}

export interface JourneyRow extends Omit<JourneySnapshot, "answers"> { sessions: number; answers: number }
export interface JourneyReport { available: boolean; consistent: boolean; rows: JourneyRow[] }
export async function readJourney(days: number, now = Date.now()): Promise<JourneyReport> {
  const unavailable: JourneyReport = { available: false, consistent: true, rows: [] };
  const kv = store();
  if (!kv || !Number.isInteger(days) || days < 1 || days > 90) return unavailable;
  const dates = Array.from({ length: days }, (_, i) => jstDay(new Date(now - i * 86400_000)));
  try {
    const response = await fetch(`${kv.url}/pipeline`, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(3000),
      headers: { Authorization: `Bearer ${kv.token}`, "Content-Type": "application/json" }, body: JSON.stringify(dates.map(day => ["HGETALL", key(day)])) });
    if (!response.ok) return unavailable;
    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || payload.length !== dates.length) return unavailable;
    const rows: JourneyRow[] = [];
    for (let i = 0; i < dates.length; i++) {
      const entry = payload[i];
      if (entry?.error || !Array.isArray(entry?.result) || entry.result.length % 2) return unavailable;
      const grouped = new Map<string, JourneyRow>();
      for (let j = 0; j < entry.result.length; j += 2) {
        const raw = entry.result[j];
        if (typeof raw !== "string") return unavailable;
        const [qualification, outcome, page, offer, stage, metric, extra] = raw.split("|");
        const parsed = snapshot.safeParse({ day: dates[i], qualification, outcome, page, offer, stage, answers: 0 });
        const count = Number(entry.result[j + 1]);
        if (!parsed.success || extra || !["sessions", "answers"].includes(metric) || !Number.isSafeInteger(count)) return unavailable;
        const group = raw.slice(0, raw.lastIndexOf("|"));
        const row = grouped.get(group) ?? { ...parsed.data, sessions: 0 };
        if (metric === "sessions") row.sessions = count; else row.answers = count;
        grouped.set(group, row);
      }
      rows.push(...[...grouped.values()].filter(row => row.sessions !== 0 || row.answers !== 0));
    }
    return { available: true, consistent: rows.every(row => row.sessions >= 0 && row.answers >= 0 && (row.sessions > 0 || row.answers === 0)), rows };
  } catch { return unavailable; }
}
