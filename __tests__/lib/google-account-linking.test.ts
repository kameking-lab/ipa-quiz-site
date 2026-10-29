import { afterEach, describe, expect, it, vi } from "vitest";
import { handleLoginOrRegister } from "../../node_modules/@auth/core/lib/actions/callback/handle-login.js";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Google account linking", () => {
  async function setup(linked: boolean) {
    vi.stubEnv("AUTH_GOOGLE_ID", "test-google-client");
    vi.stubEnv("AUTH_GOOGLE_SECRET", "test-google-secret");
    vi.resetModules();
    const { authConfig } = await import("@/lib/auth/config");
    const configured = authConfig.providers
      .map((provider) => typeof provider === "function" ? provider() : provider)
      .find((provider) => provider.id === "google")!;
    const provider = { ...configured, ...configured.options, account: () => ({}) };
    const existing = { id: "existing-user", email: "learner@example.test", emailVerified: null };
    const adapter = {
      getUserByAccount: vi.fn().mockResolvedValue(linked ? existing : null),
      getUserByEmail: vi.fn().mockResolvedValue(existing),
      linkAccount: vi.fn(),
      createUser: vi.fn(),
    };
    const options = { adapter, provider, session: { strategy: "jwt" }, jwt: {}, events: {} } as unknown as Parameters<typeof handleLoginOrRegister>[3];
    const profile = { email: existing.email, emailVerified: null };
    const account = { provider: "google", providerAccountId: "google-subject", type: "oidc" as const };
    return { existing, adapter, login: () => handleLoginOrRegister("", profile, account, options) };
  }

  it("rejects matching-email sign-in without an existing Google account link", async () => {
    const { adapter, login } = await setup(false);
    await expect(login()).rejects.toMatchObject({ type: "OAuthAccountNotLinked" });
    expect(adapter.linkAccount).not.toHaveBeenCalled();
    expect(adapter.createUser).not.toHaveBeenCalled();
  });

  it("continues signing in an already linked Google account", async () => {
    const { existing, adapter, login } = await setup(true);
    await expect(login()).resolves.toMatchObject({ user: existing, isNewUser: false });
    expect(adapter.getUserByEmail).not.toHaveBeenCalled();
    expect(adapter.linkAccount).not.toHaveBeenCalled();
  });
});
