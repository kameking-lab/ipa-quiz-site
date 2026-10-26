// @vitest-environment node
import { Auth, skipCSRFCheck } from "@auth/core";
import type { Adapter } from "@auth/core/adapters";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No external requests in auth tests")));
  vi.stubEnv("AUTH_SECRET", "");
  for (const suffix of [1, 2, 3]) vi.stubEnv(`AUTH_SECRET_${suffix}`, "");
  vi.stubEnv("NEXTAUTH_SECRET", "");
  vi.stubEnv("AUTH_URL", "");
  vi.stubEnv("NEXTAUTH_URL", "");
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("patched Auth.js behavior with local mocks", () => {
  it("does not expose a truthy auth object after a configuration error", async () => {
    const { auth } = NextAuth({ providers: [], trustHost: true, logger: { error: vi.fn() } });
    const handler = auth((req) => Response.json({ authenticated: Boolean(req.auth) }));
    const response = await handler(new NextRequest("https://auth.example.invalid/account"), {} as never);

    if (!response) throw new Error("Auth wrapper did not return a response");
    expect(await response.json()).toEqual({ authenticated: false });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    ["  Learner@example.invalid  ", "learner@example.invalid"],
    ["learner@@example.invalid", null],
    ["learner\uFF20other@example.invalid", null],
  ])("normalizes or rejects %s before any mocked email delivery", async (email, expected) => {
    const sendVerificationRequest = vi.fn().mockResolvedValue(undefined);
    const getUserByEmail = vi.fn().mockResolvedValue(null);
    const createVerificationToken = vi.fn().mockResolvedValue(undefined);
    const adapter: Adapter = {
      getUserByEmail,
      createVerificationToken,
      useVerificationToken: vi.fn().mockResolvedValue(null),
    };
    await Auth(new Request("https://auth.example.invalid/auth/signin/nodemailer", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }),
    }), {
      basePath: "/auth",
      trustHost: true,
      secret: "synthetic-unit-test-secret-not-a-deployment-secret",
      session: { strategy: "jwt" },
      // Only this isolated test skips CSRF to exercise the sign-in action;
      // production configuration and routes are imported nowhere in this test.
      skipCSRFCheck,
      adapter,
      providers: [{
        id: "nodemailer",
        name: "Mock email provider",
        type: "email",
        from: "no-reply@example.invalid",
        maxAge: 86400,
        sendVerificationRequest,
      }],
      logger: { error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
    });

    if (expected) {
      expect(getUserByEmail).toHaveBeenCalledWith(expected);
      expect(sendVerificationRequest).toHaveBeenCalledTimes(1);
      expect(sendVerificationRequest.mock.calls[0][0].identifier).toBe(expected);
      expect(createVerificationToken).toHaveBeenCalledTimes(1);
    } else {
      expect(getUserByEmail).not.toHaveBeenCalled();
      expect(sendVerificationRequest).not.toHaveBeenCalled();
      expect(createVerificationToken).not.toHaveBeenCalled();
    }
    expect(fetch).not.toHaveBeenCalled();
  });
});
