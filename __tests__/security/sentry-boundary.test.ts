// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { init } = vi.hoisted(() => ({ init: vi.fn() }));
vi.mock("@sentry/nextjs", () => ({ init }));
beforeEach(() => { vi.resetModules(); init.mockClear(); vi.stubEnv("SENTRY_DSN", "https://public@monitor.example.invalid/1"); vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "https://public@monitor.example.invalid/1"); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe("telemetry privacy boundaries", () => {
  it.each(["client", "server", "edge"] as const)("%s removes case-insensitive credentials, OAuth codes and request bodies", async side => {
    if (side === "client") await import("@/sentry.client.config");
    else if (side === "server") await import("@/sentry.server.config");
    else await import("@/sentry.edge.config");
    const options = init.mock.calls[0][0];
    const event = { user: { id: "private-user-id", email: "private@example.invalid" }, request: {
      headers: { cookie: "private-session", authorization: "Bearer private-token", "x-real-ip": "private-ip" },
      url: "https://kakomon-ai.jp/auth/callback?code=private-code&email=private%40example.invalid", data: "private-essay", cookies: { session: "private-session" }, query_string: "code=private-code",
    } };
    const serialized = JSON.stringify(options.beforeSend(event, {}));
    expect(serialized).not.toContain("private-");
    expect(serialized).not.toContain("private@");
  });
  it("custom capture never forwards upstream error text to console or Sentry", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("ok")));
    const { captureException } = await import("@/lib/monitoring/sentry");
    await captureException(new Error("private-key private-essay private@example.invalid"), { route: "/api/scoring" });
    expect(JSON.stringify(error.mock.calls)).not.toContain("private-");
    expect(String(vi.mocked(fetch).mock.calls[0][1]?.body)).not.toContain("private-");
  });
});
