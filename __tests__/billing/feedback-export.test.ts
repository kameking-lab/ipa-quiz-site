import { createHash } from "node:crypto";
import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ page: vi.fn() }));
vi.mock("@/lib/feedback/unlock-runtime", () => ({ feedbackRealm: () => "realm", feedbackStore: () => ({ page: m.page }) }));
vi.mock("@/lib/billing/runtime", () => ({ json: (v: unknown, status = 200) => Response.json(v, { status, headers: { "cache-control": "private, no-store" } }) }));
import { GET } from "@/app/api/integrations/note/feedback/route";
const token = "test-token-0000000000000000000000000";
beforeEach(() => { vi.clearAllMocks(); vi.stubEnv("KAKOMON_FEEDBACK_READ_TOKEN_SHA256", createHash("sha256").update(token).digest("hex")); m.page.mockResolvedValue({ events: [], nextCursor: "0", hasMore: false }); });
it("denies missing/wrong credentials before DB access", async () => {
  expect((await GET(new Request("https://example.test/api/integrations/note/feedback"))).status).toBe(401);
  expect(m.page).not.toHaveBeenCalled();
});
it("accepts only bounded numeric cursors and never exposes a shared cache", async () => {
  const request = (after: string) => new Request(`https://example.test/api/integrations/note/feedback?after=${after}`, { headers: { authorization: `Bearer ${token}` } });
  expect((await GET(request("-1"))).status).toBe(400);
  const res = await GET(request("100")); expect(res.status).toBe(200); expect(res.headers.get("cache-control")).toContain("no-store");
  expect(m.page).toHaveBeenCalledWith("realm", "100");
});
