// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";

const m = vi.hoisted(() => ({ auth: vi.fn(), remove: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth: m.auth }));
vi.mock("@/lib/auth/delete-account", () => ({ deleteAccount: m.remove }));
import { authConfig } from "@/lib/auth/config";
import { POST } from "@/app/api/account/delete/route";

afterEach(() => { vi.clearAllMocks(); vi.unstubAllEnvs(); });

it.each(["google", "apple"])("requires a completed server sign-in for %s before deleting an expired session", async provider => {
  vi.stubEnv("DATABASE_URL", "postgresql://mock.invalid/mock");
  const oldTime = Date.now() - 600000;
  const jwt = authConfig.callbacks!.jwt!;
  const session = authConfig.callbacks!.session!;
  const oldToken = { id: "owner", authenticatedAt: oldTime };
  // Session refresh/client update cannot manufacture recent authentication.
  // Auth.js types require user even though JWT refreshes omit it at runtime.
  const unchanged = await jwt({ token: oldToken, trigger: "update", session: { authenticatedAt: Date.now() } } as unknown as Parameters<typeof jwt>[0]);
  expect(unchanged?.authenticatedAt).toBe(oldTime);
  const request = () => new Request("https://site.test/api/account/delete", {
    method: "POST", headers: { origin: "https://site.test" }, body: JSON.stringify({ confirmation: "DELETE" }),
  });
  m.auth.mockResolvedValue({ user: { id: "owner" }, authenticatedAt: unchanged?.authenticatedAt });
  expect((await POST(request())).status).toBe(401);
  expect(m.remove).not.toHaveBeenCalled();

  const before = Date.now();
  const renewed = await jwt({ token: oldToken, user: { id: "owner" }, account: { provider, type: "oidc", providerAccountId: "owner-subject" }, trigger: "signIn", isNewUser: false });
  expect(renewed?.authenticatedAt).toBeGreaterThanOrEqual(before);
  // Supply the JWT-session runtime shape (the callback type also intersects
  // database-session fields, including Date & string for expires).
  const authenticated = await session({
    session: { user: { id: "owner", email: "owner@example.invalid", plan: "free" }, expires: new Date(Date.now() + 3600000).toISOString() },
    token: renewed!, newSession: undefined, trigger: "update",
  } as Parameters<typeof session>[0]);
  m.auth.mockResolvedValue(authenticated);
  expect((await POST(request())).status).toBe(200);
  expect(m.remove).toHaveBeenCalledWith("owner");
});
