import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ redirect: vi.fn(() => { throw new Error("redirect"); }) }));
vi.mock("next/navigation", () => ({ redirect: m.redirect }));
vi.mock("@/lib/auth", () => ({ auth: async () => ({ user: { id: "already-signed-in" } }) }));
vi.mock("@/lib/auth/config", () => ({ authConfig: { providers: [] } }));
import SignInPage from "@/app/auth/signin/page";
beforeEach(() => vi.clearAllMocks());
it.each(["/a/..//evil.invalid", "/%2e//evil.invalid", "/\t/evil.invalid", "/\\evil.invalid"])("keeps authenticated users on site for callback %j", async callbackUrl => {
  await expect(SignInPage({ searchParams: Promise.resolve({ callbackUrl }) })).rejects.toThrow("redirect");
  expect(m.redirect).toHaveBeenCalledWith("/");
});
