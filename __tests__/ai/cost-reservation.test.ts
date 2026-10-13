import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { estimatePromptTokenBudget, monthlyCostKey, recordAiCost, reserveAiCost } from "@/lib/ai/cost-guard";

const requestBudget = { tier: "flash-lite" as const, inputTokens: 100_000, outputTokens: 0, label: "copilot" };
let amounts: Map<string, number>;
let commands: { name: string; key: string; amount: number }[];
let fail: ((name: string, amount: number) => "before" | "after" | undefined) | undefined;

// Implements the existing KV command contract, not the reservation algorithm.
// Each INCRBYFLOAT is one atomic backend operation; GET snapshots can all be stale.
function backend() {
  return vi.fn(async (input: string | URL | Request) => {
    const parts = new URL(String(input)).pathname.split("/").slice(1).map(decodeURIComponent);
    const name = parts[0] ?? "";
    const key = parts[1] ?? "";
    const amount = Number(parts[2] ?? 0);
    commands.push({ name, key, amount });
    if (fail?.(name, amount) === "before") throw new Error("KV write unavailable");
    let result: string | number | null;
    if (name === "get") result = amounts.has(key) ? String(amounts.get(key)) : null;
    else if (name === "incrbyfloat") {
      const total = (amounts.get(key) ?? 0) + amount;
      amounts.set(key, total);
      result = String(total);
    } else if (name === "incr") {
      const total = (amounts.get(key) ?? 0) + 1;
      amounts.set(key, total);
      result = total;
    } else result = 1;
    if (fail?.(name, amount) === "after") throw new Error("KV reply lost after commit");
    return new Response(JSON.stringify({ result }), { status: 200 });
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-13T10:00:00Z"));
  vi.stubEnv("KV_REST_API_URL", "https://local-kv.test");
  vi.stubEnv("KV_REST_API_TOKEN", "test-only");
  vi.stubEnv("SLACK_WEBHOOK_URL", "");
  amounts = new Map();
  commands = [];
  fail = undefined;
  vi.stubGlobal("fetch", backend());
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("atomic admission of existing monthly estimated budget", () => {
  it("permits only funded calls even when every concurrent read sees spare capacity", async () => {
    const key = monthlyCostKey();
    amounts.set(key, 49_997);
    const results = await Promise.all(Array.from({ length: 20 }, () => reserveAiCost(requestBudget)));
    const funded = results.filter((result) => result.allowed);
    expect(funded).toHaveLength(2);
    expect(results.filter((result) => !result.allowed && result.reason === "cap")).toHaveLength(18);
    expect(amounts.get(key)).toBe(50_000);
    expect(funded.reduce((sum, result) => sum + (result.allowed ? result.reservation.reservedJpy : 0), 0)).toBe(3);
  });

  it("refunds confirmed unused tokens once, including simultaneous completion callbacks", async () => {
    const result = await reserveAiCost(requestBudget);
    expect(result.allowed).toBe(true);
    if (!result.allowed) throw new Error("reservation missing");
    const usage = { ...requestBudget, inputTokens: 50_000, reservation: result.reservation };
    await Promise.all([recordAiCost(usage), recordAiCost(usage)]);
    expect(amounts.get(monthlyCostKey())).toBe(0.75);
    expect(commands.filter((command) => command.name === "incrbyfloat" && command.amount < 0)).toHaveLength(1);
  });

  it("blocks dispatch when the precharge succeeded but its reply was lost", async () => {
    fail = (name, amount) => name === "incrbyfloat" && amount > 0 ? "after" : undefined;
    const result = await reserveAiCost(requestBudget);
    expect(result).toMatchObject({ allowed: false, reason: "unavailable" });
    expect(amounts.get(monthlyCostKey())).toBe(1.5);
    expect(commands.filter((command) => command.name === "incrbyfloat")).toHaveLength(1);
  });

  it.each(["before", "after"] as const)("does not retry an uncertain settlement (%s commit)", async (stage) => {
    const result = await reserveAiCost(requestBudget);
    if (!result.allowed) throw new Error("reservation missing");
    fail = (name, amount) => name === "incrbyfloat" && amount < 0 ? stage : undefined;
    const usage = { ...requestBudget, inputTokens: 50_000, reservation: result.reservation };
    await recordAiCost(usage);
    await recordAiCost(usage);
    expect(amounts.get(monthlyCostKey())).toBe(stage === "before" ? 1.5 : 0.75);
    expect(commands.filter((command) => command.name === "incrbyfloat" && command.amount < 0)).toHaveLength(1);
  });

  it("retains funds after an unconfirmed denial rollback and blocks the next call", async () => {
    amounts.set(monthlyCostKey(), 49_999);
    fail = (name, amount) => name === "incrbyfloat" && amount < 0 ? "before" : undefined;
    expect(await reserveAiCost(requestBudget)).toMatchObject({ allowed: false, reason: "cap" });
    expect(amounts.get(monthlyCostKey())).toBe(50_000.5);
    expect(await reserveAiCost(requestBudget)).toMatchObject({ allowed: false, reason: "cap" });
    expect(commands.filter((command) => command.name === "incrbyfloat" && command.amount > 0)).toHaveLength(1);
  });

  it("keeps the original month key when a stream completes across JST midnight", async () => {
    vi.setSystemTime(new Date("2026-10-31T14:59:50Z"));
    const result = await reserveAiCost(requestBudget);
    if (!result.allowed) throw new Error("reservation missing");
    vi.setSystemTime(new Date("2026-10-31T15:00:01Z"));
    await recordAiCost({ ...requestBudget, inputTokens: 50_000, reservation: result.reservation });
    expect(amounts.get("ai_cost:2026-10")).toBe(0.75);
    expect(amounts.has("ai_cost:2026-11")).toBe(false);
  });

  it("does not refund invalid usage or an unrecognized reservation", async () => {
    const result = await reserveAiCost(requestBudget);
    if (!result.allowed) throw new Error("reservation missing");
    await recordAiCost({ ...requestBudget, inputTokens: Number.NaN, reservation: result.reservation });
    await recordAiCost({ ...requestBudget, inputTokens: 0, reservation: { ...result.reservation } });
    expect(amounts.get(monthlyCostKey())).toBe(1.5);
  });

  it("reserves text bytes and framing rather than undercounting Japanese as half a token", () => {
    const system = "資格試験の学習支援";
    const messages = [{ content: "選択肢の違いを説明して" }];
    expect(estimatePromptTokenBudget(system, messages)).toBe(
      Buffer.byteLength(system) + Buffer.byteLength(messages[0]!.content) + 1024 + 64,
    );
  });
});
