// @vitest-environment node
import { createServer, type Server } from "node:http";
import { once } from "node:events";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/activity/route";
import { GET } from "@/app/api/admin/metrics/route";
import { ActivityReport } from "@/components/admin/ActivityReport";
import { readActivity, recordActivity } from "@/lib/analytics/activity";
import type { MetricsResponse } from "@/lib/admin/metrics/types";

vi.mock("@/lib/rate-limit/server", () => ({ getClientIp: () => "local-fixture" }));
const NOW = new Date("2026-11-10T15:30:00Z"); // Nov 11 in JST
let server: Server;
let commands: string[][];
let hashes: Map<string, Map<string, number>>;
let failCommand = false;

beforeEach(async () => {
  commands = []; hashes = new Map(); failCommand = false;
  vi.spyOn(Date, "now").mockReturnValue(NOW.getTime());
  server = createServer(async (req, res) => {
    let raw = "";
    for await (const part of req) raw += part;
    const batch = JSON.parse(raw) as string[][];
    commands.push(...batch);
    const result = batch.map(([command, key, field, increment]) => {
      if (failCommand) return { error: "ERR fixture write failure" };
      const hash = hashes.get(key) ?? new Map<string, number>();
      if (command === "HINCRBY") {
        hash.set(field, (hash.get(field) ?? 0) + Number(increment));
        hashes.set(key, hash);
        return { result: hash.get(field) };
      }
      if (command === "HGETALL") return { result: [...hash].flatMap(([f, n]) => [f, String(n)]) };
      if (command === "EXPIRE") return { result: 1 };
      return { error: "unsupported fixture command" };
    });
    res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(result));
  });
  server.listen(0, "127.0.0.1"); await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("fixture address missing");
  vi.stubEnv("KV_REST_API_URL", `http://127.0.0.1:${address.port}`);
  vi.stubEnv("KV_REST_API_TOKEN", "local-dummy-token");
  vi.stubEnv("POSTHOG_API_KEY", ""); vi.stubEnv("POSTHOG_PROJECT_ID", "");
});
afterEach(async () => { await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve())); vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

function request(body: unknown, extra: Record<string, string> = {}) {
  return new Request("http://localhost/api/activity", { method: "POST", headers: { "user-agent": "Mozilla/5.0", origin: "http://localhost", "sec-fetch-site": "same-origin", ...extra }, body: JSON.stringify(body) });
}

describe("local event → HTTP KV → admin aggregate → rendered dashboard", () => {
  it("displays a page view, repeated answers and an offer with no PostHog configuration", async () => {
    const event = (event: string) => ({ event, qualification: "sc", page: "question" });
    const response = await POST(request({ events: [event("page_view"), ...Array.from({ length: 10 }, () => event("question_answered")), event("practice_limit_viewed")] }));
    expect(response.status).toBe(204);
    expect(commands.filter(c => c[0] === "HINCRBY")).toHaveLength(3);
    expect(commands).toContainEqual(["HINCRBY", "activity:v1:2026-11-11", "question_answered|sc|question", "10"]);
    expect(commands).toContainEqual(["EXPIRE", "activity:v1:2026-11-11", String(95 * 86400)]);
    const admin = await GET(new Request("http://localhost/api/admin/metrics?range=custom&from=2026-11-11&to=2026-11-11"));
    const payload = await admin.json() as MetricsResponse;
    expect(payload.source).toBe("kv");
    if (payload.source !== "kv") throw new Error("aggregate unavailable");
    expect(payload.activity.rows).toEqual(expect.arrayContaining([expect.objectContaining({ event: "question_answered", count: 10, qualification: "sc", day: "2026-11-11" })]));
    const html = renderToStaticMarkup(<ActivityReport data={payload.activity} period="今日" />);
    expect(html).toContain("匿名アクセス集計"); expect(html).toContain("無料上限の案内表示"); expect(html).toContain("sc"); expect(html).toContain(">10<");
    const written = JSON.stringify(commands);
    for (const privateValue of ["Mozilla", "local-fixture", "local-dummy-token", "localhost", "email", "questionId", "userId"]) expect(written).not.toContain(privateValue);
  });
  it("keeps qualifiers separate and sums both standard and library answers", async () => {
    expect(await recordActivity([{ event: "question_answered", qualification: "ap", page: "quiz" }, { event: "exam_library_answered", qualification: "sagyo-kankyo-sokuteishi", page: "exam_library" }], NOW.getTime())).toBe(true);
    const data = await readActivity("2026-11-11", "2026-11-11");
    expect(data.rows.map(r => r.qualification).sort()).toEqual(["ap", "sagyo-kankyo-sokuteishi"]);
    expect(renderToStaticMarkup(<ActivityReport data={data} period="今日" />)).toContain(">2<");
  });
  it("rejects arbitrary identifiers, raw URLs, unknown labels and oversized batches", async () => {
    const valid = { event: "page_view", qualification: "unknown", page: "other" };
    for (const body of [{ events: [{ ...valid, email: "private@example.invalid" }] }, { events: [{ ...valid, qualification: "private-user" }] }, { events: [{ ...valid, page: "/account?token=private" }] }, { events: [{ ...valid, event: "checkout_completed" }] }, { events: Array(33).fill(valid) }]) expect((await POST(request(body))).status).toBe(400);
    expect(commands).toEqual([]);
  });
  it("excludes bots and cross-site submissions", async () => {
    const body = { events: [{ event: "page_view", qualification: "sc", page: "question" }] };
    expect((await POST(request(body, { "user-agent": "Googlebot" }))).status).toBe(204);
    expect((await POST(request(body, { origin: "https://elsewhere.invalid" }))).status).toBe(403);
    expect((await POST(request(body, { "sec-fetch-site": "cross-site" }))).status).toBe(403);
    expect(commands).toEqual([]);
  });
  it("does not acknowledge Redis command errors hidden inside HTTP 200", async () => {
    failCommand = true;
    expect((await POST(request({ events: [{ event: "page_view", qualification: "sc", page: "question" }] }))).status).toBe(503);
    expect((await readActivity("2026-11-11", "2026-11-11")).available).toBe(false);
  });
  it("distinguishes an empty period from missing storage and rejects unbounded ranges", async () => {
    expect(await readActivity("2026-11-11", "2026-11-11")).toEqual({ available: true, rows: [] });
    vi.stubEnv("KV_REST_API_TOKEN", "");
    expect(await readActivity("2026-11-11", "2026-11-11")).toEqual({ available: false, rows: [] });
    expect((await readActivity("2020-01-01", "2026-11-11")).available).toBe(false);
  });
});
