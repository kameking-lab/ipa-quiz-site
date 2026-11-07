// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { auth } = vi.hoisted(() => ({ auth: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth }));
import { POST } from "@/app/api/email/route";
const origin = "https://kakomon-ai.jp";
function request(value: object, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/email`, { method: "POST", headers: { origin, "content-type": "application/json", ...headers }, body: JSON.stringify(value) });
}
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "synthetic-resend-test-key");
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ id: "test-delivery" })));
  auth.mockResolvedValue(null);
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe("email delivery is a self-addressed server template", () => {
  it("rejects unauthenticated arbitrary delivery before contacting Resend", async () => {
    const response = await POST(request({ to: "victim@example.invalid", subject: "impersonation", text: "phishing", html: "<a>phishing</a>" }));
    expect(response.status).toBe(401);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("does not let a member choose a victim or custom HTML", async () => {
    auth.mockResolvedValue({ user: { id: "learner-a", email: "learner@example.invalid" } });
    const response = await POST(request({ to: "victim@example.invalid", subject: "impersonation", text: "phishing", html: "<a>phishing</a>", type: "test" }));
    expect(response.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejects cross-origin requests even with a member session", async () => {
    auth.mockResolvedValue({ user: { id: "learner-a", email: "learner@example.invalid" } });
    expect((await POST(request({ type: "test" }, { origin: "https://attacker.invalid" }))).status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("sends the fixed test message only to the session email", async () => {
    auth.mockResolvedValue({ user: { id: "learner-b", email: "learner@example.invalid" } });
    const response = await POST(request({ type: "test" }));
    expect(response.status).toBe(200);
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body.to).toBe("learner@example.invalid");
    expect(body.subject).toContain("過去問AI");
    expect(body.html).toBeUndefined();
  });
});
