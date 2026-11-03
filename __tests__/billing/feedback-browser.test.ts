import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { feedbackBrowserHeader, newFeedbackBrowser, readFeedbackBrowser, unlockIdentity } from "@/lib/feedback/unlock-runtime";
beforeEach(() => { vi.stubEnv("AUTH_SECRET", "unit-test-secret-feedback-browser-only"); });
afterEach(() => { vi.unstubAllEnvs(); });
it("keeps a dedicated stable ID through daily cookie expiration and renews it without changing the wallet", () => {
  const id = newFeedbackBrowser();
  const cookie = feedbackBrowserHeader(id, true);
  const request = new Request("https://example.test", { headers: { cookie: cookie.split(";")[0] } });
  expect(readFeedbackBrowser(request)).toBe(id);
  expect(feedbackBrowserHeader(readFeedbackBrowser(request)!, true)).toBe(cookie);
  expect(cookie).toContain("HttpOnly; SameSite=Lax; Max-Age=34560000; Secure");
  expect(cookie).not.toContain("practice_guest");
  const original = unlockIdentity(request, null, "realm");
  const signedIn = unlockIdentity(request, "account-id", "realm");
  expect(signedIn.browser).toBe(original.browser);
  expect(signedIn.account).toBe("account-id");
});
it("rejects forged identifiers and separates browser identity from credential values", () => {
  const id = newFeedbackBrowser();
  const cookie = feedbackBrowserHeader(id, false).split(";")[0];
  const forged = cookie.replace(id, newFeedbackBrowser());
  expect(readFeedbackBrowser(new Request("https://example.test", { headers: { cookie: forged } }))).toBeNull();
  expect(readFeedbackBrowser(new Request("https://example.test", { headers: { cookie: "practice_guest=old" } }))).toBeNull();
});

it("retains the user identity across credential rotation and session renewal", () => {
  const request = new Request("https://example.test");
  const first = unlockIdentity(request, "account-id", "before");
  vi.stubEnv("AUTH_SECRET", "rotated-unit-test-key");
  expect(unlockIdentity(request, "account-id", "after").account).toBe(first.account);
});
