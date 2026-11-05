// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { activateReviewVersion, revokeReviewSessions, REVIEW_REVOCATION_KEY, REVIEW_REVOCATION_LUA } from "@/lib/auth/app-review-revocation";
const transport = vi.fn();
beforeEach(() => {
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.invalid/");
  vi.stubEnv("KV_REST_API_TOKEN", "synthetic-kv-token");
  vi.stubGlobal("fetch", transport); transport.mockReset();
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
it("uses the existing shared KV's atomic persistent ledger for activation and explicit owner revocation", async () => {
  transport.mockImplementation(async () => Response.json({ result: 1 }));
  expect(await activateReviewVersion("a".repeat(64))).toBe(true);
  await revokeReviewSessions();
  expect(transport).toHaveBeenCalledTimes(2);
  for (const [url, init] of transport.mock.calls) {
    expect(url).toBe("https://kv.example.invalid");
    expect(init.cache).toBe("no-store"); expect(init.signal).toBeInstanceOf(AbortSignal);
    const command = JSON.parse(init.body);
    expect(command.slice(0, 4)).toEqual(["EVAL", REVIEW_REVOCATION_LUA, 1, REVIEW_REVOCATION_KEY]);
  }
  expect(JSON.parse(transport.mock.calls[1][1].body)[4]).toBe("");
  transport.mockResolvedValueOnce(Response.json({ result: 0 }));
  expect(await activateReviewVersion("a".repeat(64))).toBe(false);
});
it.each([{ error: "redis unavailable" }, { result: "1" }, { result: 2 }, {}, null])("fails closed for invalid KV response %j", async body => {
  transport.mockResolvedValueOnce(Response.json(body));
  await expect(activateReviewVersion("a".repeat(64))).rejects.toThrow("review_revocation_unavailable");
});
it("fails closed on missing KV, network failure, non-200 response, and malformed versions without exposing transport details", async () => {
  await expect(activateReviewVersion("short")).rejects.toThrow("invalid_review_version");
  expect(transport).not.toHaveBeenCalled();
  vi.stubEnv("KV_REST_API_TOKEN", "");
  await expect(revokeReviewSessions()).rejects.toThrow("review_revocation_unavailable");
  vi.stubEnv("KV_REST_API_TOKEN", "synthetic-kv-token");
  transport.mockRejectedValueOnce(new Error("sensitive transport details"));
  await expect(revokeReviewSessions()).rejects.toThrow("review_revocation_unavailable");
  transport.mockResolvedValueOnce(new Response(null, { status: 503 }));
  await expect(revokeReviewSessions()).rejects.toThrow("review_revocation_unavailable");
});
