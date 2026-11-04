import { expect, it } from "vitest";
import { safeAuthCallback } from "@/lib/auth/redirect";
it.each([undefined, null, ["/"], "https://evil.invalid/", "//evil.invalid", "/\t/evil.invalid", "/\n/evil.invalid", "/\r/evil.invalid", "/\\evil.invalid", "/ \\evil.invalid", "/a/..//evil.invalid", "/%2e//evil.invalid", "javascript:alert(1)"])("rejects unsafe callback %j", value => {
  expect(safeAuthCallback(value)).toBe("/");
});
it("normalizes local paths while preserving the PKCE challenge and state query", () => {
  expect(safeAuthCallback("/a/../settings?tab=account#sync")).toBe("/settings?tab=account#sync");
  expect(safeAuthCallback("/api/mobile/auth/complete?challenge=abc&state=def")).toBe("/api/mobile/auth/complete?challenge=abc&state=def");
});
