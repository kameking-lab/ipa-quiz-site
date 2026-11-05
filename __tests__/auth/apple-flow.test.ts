// @vitest-environment node
import { generateKeyPairSync, sign } from "node:crypto";
import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const m = vi.hoisted(() => ({ create: vi.fn(), link: vi.fn(), find: vi.fn() }));
vi.mock("@/lib/db/prisma", () => ({ prisma: {
  user: { create: m.create, findUnique: m.find },
  account: { findUnique: vi.fn(async () => null), create: m.link },
} }));

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.resetModules(); vi.clearAllMocks(); });

const nativeDestination = "/api/mobile/auth/complete?challenge=" + "a".repeat(43) + "&state=" + "b".repeat(43);
it.each([["/account", "success"], [nativeDestination, "success"], ["/account", "wrong-state"], ["/account", "wrong-nonce"], ["/account", "email-collision"]])(
  "completes Apple's real Auth.js form_post with a private relay email and keeps destination %s (%s)", async (destination, scenario) => {
    vi.resetModules();
    for (const [key, value] of Object.entries({ AUTH_SECRET: "synthetic-apple-flow-secret-at-least-32chars", AUTH_URL: "https://auth.example.invalid",
      DATABASE_URL: "postgresql://unused.invalid/test", AUTH_APPLE_ID: "synthetic.services.id", AUTH_APPLE_SECRET: "synthetic.client.secret",
      AUTH_GOOGLE_ID: "", AUTH_GITHUB_ID: "", AUTH_EMAIL_SERVER: "", APP_REVIEW_LOGIN_ENABLED: "false" })) vi.stubEnv(key, value);
    const { publicKey, privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    let nonce = "";
    const profile = { id: "apple-member", email: "private-user@privaterelay.appleid.com", name: "Private User", image: null, plan: "free" };
    m.create.mockResolvedValue(profile); m.link.mockResolvedValue({}); m.find.mockImplementation(async (query: { where: { id?: string } }) => query.where.id || scenario === "email-collision" ? profile : null);
    const transport = vi.fn(async (input: string | URL | Request) => {
      const url = new URL(input instanceof Request ? input.url : input);
      if (url.pathname.endsWith("openid-configuration")) return Response.json({
        issuer: "https://appleid.apple.com", authorization_endpoint: "https://appleid.apple.com/auth/authorize",
        token_endpoint: "https://appleid.apple.com/auth/token", jwks_uri: "https://appleid.apple.com/auth/keys",
        response_types_supported: ["code"], subject_types_supported: ["public"], id_token_signing_alg_values_supported: ["RS256"],
      });
      if (url.pathname === "/auth/keys") return Response.json({ keys: [{ ...publicKey.export({ format: "jwk" }), kid: "synthetic-key", alg: "RS256", use: "sig" }] });
      if (url.pathname === "/auth/token") {
        const b64 = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
        const now = Math.floor(Date.now() / 1000);
        const content = `${b64({ alg: "RS256", kid: "synthetic-key" })}.${b64({ iss: "https://appleid.apple.com", aud: "synthetic.services.id",
          sub: "synthetic-apple-subject", nonce: scenario === "wrong-nonce" ? "invalid-nonce" : nonce, email: profile.email, email_verified: true, iat: now, exp: now + 300 })}`;
        return Response.json({ access_token: "synthetic-access", refresh_token: "synthetic-refresh", token_type: "Bearer", expires_in: 3600,
          id_token: `${content}.${sign("RSA-SHA256", Buffer.from(content), privateKey).toString("base64url")}` });
      }
      throw new Error(`Unexpected test endpoint ${url.pathname}`);
    });
    vi.stubGlobal("fetch", transport);
    const { handlers } = await import("@/lib/auth");
    const csrfResponse = await handlers.GET(new NextRequest("https://auth.example.invalid/api/auth/csrf"));
    const { csrfToken } = await csrfResponse.json();
    const initialCookies = csrfResponse.headers.getSetCookie().map(c => c.split(";")[0]).join("; ");
    const started = await handlers.POST(new NextRequest("https://auth.example.invalid/api/auth/signin/apple", {
      method: "POST", headers: { cookie: initialCookies, "content-type": "application/x-www-form-urlencoded", origin: "https://auth.example.invalid" },
      body: new URLSearchParams({ csrfToken, callbackUrl: `https://auth.example.invalid${destination}` }),
    }));
    const authorization = new URL(started.headers.get("location")!);
    expect(authorization.origin).toBe("https://appleid.apple.com");
    expect(authorization.searchParams.get("scope")).toBe("name email");
    expect(authorization.searchParams.get("response_mode")).toBe("form_post");
    expect(authorization.searchParams.get("redirect_uri")).toBe("https://auth.example.invalid/api/auth/callback/apple");
    nonce = authorization.searchParams.get("nonce")!; expect(nonce).toBeTruthy();
    const state = authorization.searchParams.get("state")!; expect(state).toBeTruthy();
    // Model an actual cross-site POST: SameSite=Lax cookies are omitted.
    const postCookies = started.headers.getSetCookie().filter(c => /SameSite=None/i.test(c));
    for (const name of ["callback-url", "state", "nonce"]) {
      expect(postCookies.some(c => c.includes(`authjs.${name}=`) && /Secure/i.test(c) && /HttpOnly/i.test(c))).toBe(true);
    }
    const completed = await handlers.POST(new NextRequest("https://auth.example.invalid/api/auth/callback/apple", {
      method: "POST", headers: { cookie: postCookies.map(c => c.split(";")[0]).join("; "), "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code: "synthetic-authorization-code", state: scenario === "wrong-state" ? "invalid-state" : state,
        user: JSON.stringify({ name: { firstName: "Private", lastName: "User" } }) }),
    }));
    if (scenario !== "success") {
      expect(completed.headers.get("location")).toContain("error=");
      expect(completed.headers.getSetCookie().some(c => c.includes("authjs.session-token="))).toBe(false);
      expect(m.create).not.toHaveBeenCalled(); expect(m.link).not.toHaveBeenCalled();
      return;
    }
    expect(completed.headers.get("location")).toBe(`https://auth.example.invalid${destination}`);
    expect(m.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ email: profile.email }) }));
    expect(m.link).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ provider: "apple", refresh_token: "synthetic-refresh" }) }));
    const sessionCookies = completed.headers.getSetCookie().filter(c => c.includes("authjs.session-token=")).map(c => c.split(";")[0]).join("; ");
    expect(sessionCookies).not.toBe("");
    const session = await handlers.GET(new NextRequest("https://auth.example.invalid/api/auth/session", { headers: { cookie: sessionCookies } }));
    expect((await session.json()).user).toMatchObject({ id: profile.id, email: profile.email, plan: "free" });
  });

it("registers Apple only with both credentials and rejects other providers for the reserved review identity", async () => {
  vi.resetModules(); vi.stubEnv("AUTH_APPLE_ID", "synthetic.services.id"); vi.stubEnv("AUTH_APPLE_SECRET", "");
  const { authConfig } = await import("@/lib/auth/config");
  expect(authConfig.providers.some(p => typeof p !== "function" && p.id === "apple")).toBe(false);
  const { APP_REVIEW_USER_ID, APP_REVIEW_EMAIL } = await import("@/lib/auth/app-review-config");
  const signIn = authConfig.callbacks!.signIn!;
  expect(await signIn({ user: { id: APP_REVIEW_USER_ID }, account: { provider: "google", type: "oidc", providerAccountId: "subject" } })).toBe(false);
  expect(await signIn({ user: { id: "unrelated", email: APP_REVIEW_EMAIL }, account: { provider: "github", type: "oauth", providerAccountId: "subject" } })).toBe(false);
});
