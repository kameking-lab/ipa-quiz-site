// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { checkMonthlyCostCap, recordAiCost } from "@/lib/ai/cost-guard";
const budget = { tier: "flash-lite" as const, inputTokens: 0, outputTokens: 100000, label: "test" }; // ¥6
let total: number;
let receipts: Map<string, number>;
beforeEach(() => {
  total = 49990; receipts = new Map();
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "synthetic-kv-token");
  vi.stubEnv("SLACK_WEBHOOK_URL", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    if (url.includes("/get/")) return Response.json({ result: String(total) });
    if (!init?.body) return Response.json({ result: 1 });
    const command = JSON.parse(String(init.body));
    if (command[0] !== "EVAL") throw new Error("Unexpected command");
    const [, script, , , receipt, amount, cap] = command;
    // The fake remote serializes admission/settlement like Redis, independent of caller interleaving.
    if (script.includes("SEC1_RESERVE")) {
      if (total + Number(amount) > Number(cap)) return Response.json({ result: [0, String(total)] });
      total += Number(amount); receipts.set(receipt, Number(amount));
      return Response.json({ result: [1, String(total)] });
    }
    if (script.includes("SEC1_SETTLE")) {
      const reserved = receipts.get(receipt);
      if (reserved !== undefined) { total += Number(amount) - reserved; receipts.delete(receipt); }
      return Response.json({ result: String(total) });
    }
    throw new Error("Unexpected script");
  }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.restoreAllMocks(); });
describe("shared monthly budget admission", () => {
  it("admits only one parallel request when the remainder covers only one worst-case call", async () => {
    const results = await Promise.all(Array.from({ length: 20 }, () => checkMonthlyCostCap("gemini", budget)));
    expect(results.filter(r => r.allowed)).toHaveLength(1);
    expect(total).toBeLessThanOrEqual(50000);
  });
  it("settles a reservation exactly once, including duplicate accounting callbacks", async () => {
    const result = await checkMonthlyCostCap("gemini", budget);
    expect(result).toHaveProperty("reservation");
    const cost = { ...budget, outputTokens: 1000, reservation: result.reservation };
    expect(await recordAiCost(cost)).toBe("recorded"); const once = total;
    expect(await recordAiCost(cost)).toBe("recorded");
    expect(total).toBe(once);
    expect(total).toBeCloseTo(49990.06);
  });
  it("does not start real work on an ambiguous/malformed store reply", async () => {
    vi.mocked(fetch).mockResolvedValue(Response.json({ result: [1, "NaN"] }));
    expect((await checkMonthlyCostCap("gemini", budget)).allowed).toBe(false);
  });
});
