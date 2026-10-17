import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { beginCopilotRequest, completeCopilotRequest, releaseCopilotRequest } from "@/lib/copilot/request-cache";

const request = new Request("https://example.test/api/copilot", {
  headers: { "x-forwarded-for": "203.0.113.7" },
});
const input = {
  request,
  model: "test-model",
  system: "private system prompt",
  userMessages: [{ role: "user" as const, content: "private user question" }],
};

function mockKv() {
  const store = new Map<string, string>();
  const calls: (string | number)[][] = [];
  const fetchMock = vi.fn(async (_url: string, init: RequestInit) => {
    const commands: unknown = JSON.parse(String(init.body));
    if (!Array.isArray(commands) || !Array.isArray(commands[0])) throw new Error("bad test command");
    const args = commands[0] as (string | number)[];
    calls.push(args);
    const key = String(args[1]);
    let result: string | number | null = null;
    if (args[0] === "SET") {
      expect(args.slice(3)).toEqual(["EX", 90, "NX"]);
      if (!store.has(key)) { store.set(key, String(args[2])); result = "OK"; }
    } else if (args[0] === "GET") {
      result = store.get(key) ?? null;
    } else if (args[0] === "EVAL") {
      const evalKey = String(args[3]);
      if (store.get(evalKey) === args[4]) {
        if (String(args[1]).includes("redis.call('DEL'")) {
          store.delete(evalKey);
          result = 1;
        } else {
          store.set(evalKey, String(args[5]));
          result = "OK";
        }
      } else result = 0;
    } else throw new Error("unknown command");
    return Response.json([{ result }]);
  });
  vi.stubGlobal("fetch", fetchMock);
  return { store, calls, fetchMock };
}

beforeEach(() => {
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.test");
  vi.stubEnv("KV_REST_API_TOKEN", "test-token");
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Copilot request cache", () => {
  it("atomically claims once, returns pending to a concurrent duplicate, then a cached body", async () => {
    const kv = mockKv();
    const [first, second] = await Promise.all([beginCopilotRequest(input), beginCopilotRequest(input)]);
    expect(first.kind).toBe("claimed");
    expect(second).toEqual({ kind: "pending" });
    if (first.kind !== "claimed") throw new Error("expected claim");
    const key = first.ticket.key;
    expect(key).toMatch(/^copilot:request:v1:[a-f0-9]{64}$/u);
    expect(key).not.toContain("203.0.113.7");
    expect(key).not.toContain(input.userMessages[0].content);
    expect(kv.store.get(key)).not.toContain(input.userMessages[0].content);
    expect(await completeCopilotRequest(first.ticket, "answer text")).toBe(true);
    expect(await beginCopilotRequest(input)).toEqual({ kind: "cached", text: "answer text" });
    expect(kv.calls.filter((call) => call[0] === "SET")).toHaveLength(3);
  });

  it("rejects a stale or mismatched ticket with a compare-and-set operation", async () => {
    const kv = mockKv();
    const claim = await beginCopilotRequest(input);
    if (claim.kind !== "claimed") throw new Error("expected claim");
    const wrong = { ...claim.ticket, token: "0".repeat(64) };
    expect(await completeCopilotRequest(wrong, "wrong answer")).toBe(false);
    expect(await beginCopilotRequest(input)).toEqual({ kind: "pending" });
    expect(kv.store.get(claim.ticket.key)).toContain('"state":"pending"');
    expect(await completeCopilotRequest(claim.ticket, "correct answer")).toBe(true);
  });

  it("keeps pending on oversize output and fails closed on malformed or unavailable KV", async () => {
    const kv = mockKv();
    const claim = await beginCopilotRequest(input);
    if (claim.kind !== "claimed") throw new Error("expected claim");
    expect(await completeCopilotRequest(claim.ticket, "x".repeat(32 * 1024 + 1))).toBe(false);
    expect(await beginCopilotRequest(input)).toEqual({ kind: "pending" });
    kv.store.set(claim.ticket.key, '{"state":"ready","text":42}');
    expect(await beginCopilotRequest(input)).toEqual({ kind: "unavailable" });
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await beginCopilotRequest(input)).toEqual({ kind: "unavailable" });
  });

  it("stops before provider when credentials or client IP are missing", async () => {
    const kv = mockKv();
    vi.stubEnv("KV_REST_API_TOKEN", "");
    expect(await beginCopilotRequest(input)).toEqual({ kind: "unavailable" });
    vi.stubEnv("KV_REST_API_TOKEN", "test-token");
    expect(await beginCopilotRequest({ ...input, request: new Request(request.url) })).toEqual({ kind: "unavailable" });
    expect(kv.fetchMock).not.toHaveBeenCalled();
  });
});


it("releases only the matching pending lease before provider dispatch", async () => {
  const kv = mockKv();
  const first = await beginCopilotRequest(input);
  if (first.kind !== "claimed") throw new Error("expected claim");
  kv.store.set(first.ticket.key, JSON.stringify({ state: "pending", token: "a".repeat(64) }));
  expect(await releaseCopilotRequest(first.ticket)).toBe(false);
  expect(kv.store.has(first.ticket.key)).toBe(true);
  kv.store.set(first.ticket.key, first.ticket.value);
  expect(await releaseCopilotRequest(first.ticket)).toBe(true);
  expect(kv.store.has(first.ticket.key)).toBe(false);
  expect((await beginCopilotRequest(input)).kind).toBe("claimed");
});
