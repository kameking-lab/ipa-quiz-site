// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { DuplicatePurchaseGuard } from "@/lib/billing/duplicate-purchase";
import { rememberVerifiedPurchaseEmail } from "@/lib/auth/purchase-email";

const member = (id = "current", providers = ["apple"], email = "owner@example.invalid", emailVerified: Date | null = new Date()) => ({ id, providers, email, emailVerified });
function fixture(others = [member("paid", ["google"])]) {
  const current = member();
  const query = vi.fn().mockResolvedValueOnce([current]).mockResolvedValue([current, ...others]);
  const rights = vi.fn<(id: string) => Promise<{ stripe: boolean; appStore: boolean }>>().mockResolvedValue({ stripe: true, appStore: false });
  return { current, query, rights, guard: new DuplicatePurchaseGuard({ query }, rights) };
}
afterEach(() => vi.restoreAllMocks());

it.each(["stripe", "appStore"])("blocks another account's active %s and returns only the login provider", async source => {
  const f = fixture(); f.rights.mockResolvedValue({ stripe: source === "stripe", appStore: source === "appStore" });
  await expect(f.guard.assertCanPurchase("current")).rejects.toMatchObject({ code: "duplicate_purchase_google", status: 409 });
  expect(f.rights).toHaveBeenCalledExactlyOnceWith("paid");
});
it("allows a different email, expired memberships and the current account without granting or transferring rights", async () => {
  const f = fixture([]); await expect(f.guard.assertCanPurchase("current")).resolves.toBeUndefined(); expect(f.rights).not.toHaveBeenCalled();
  const expired = fixture(); expired.rights.mockResolvedValue({ stripe: false, appStore: false });
  await expect(expired.guard.assertCanPurchase("current")).resolves.toBeUndefined();
});
it("normalizes only whitespace/case and uses a parameterized lookup", async () => {
  const f = fixture([]); f.current.email = "  Owner+tag@Example.Invalid  ";
  await f.guard.assertCanPurchase("current");
  expect(f.query.mock.calls[1][1][0]).toBe("owner+tag@example.invalid");
  expect(f.query.mock.calls[1][0]).not.toContain("owner+tag");
});
it("excludes Apple relay addresses before verification or a cross-account lookup", async () => {
  const f = fixture(); f.current.email = " SAME@PRIVATERELAY.APPLEID.COM "; f.current.emailVerified = null;
  await expect(f.guard.assertCanPurchase("current")).resolves.toBeUndefined();
  expect(f.query).toHaveBeenCalledTimes(1); expect(f.rights).not.toHaveBeenCalled();
});
it("only requests reauthentication for a legacy email on a paid match", async () => {
  const f = fixture(); f.current.emailVerified = null;
  await expect(f.guard.assertCanPurchase("current")).rejects.toMatchObject({ code: "purchase_email_unverified" });
  expect(f.rights).toHaveBeenCalledExactlyOnceWith("paid");
  f.rights.mockResolvedValue({ stripe: false, appStore: false });
  await expect(f.guard.assertCanPurchase("current")).resolves.toBeUndefined();
});
it("stops an active duplicate with no Google or Apple account and uses generic guidance", async () => {
  const f = fixture([member("paid", [])]);
  await expect(f.guard.assertCanPurchase("current")).rejects.toMatchObject({ code: "duplicate_purchase", status: 409 });
});
it.each(["db", "provider"])("fails closed on %s failure without printing personal data", async failure => {
  const warn = vi.spyOn(console, "warn").mockImplementation(()=>{}), f = fixture();
  if (failure === "db") f.query.mockRejectedValue(Error("private@example.invalid")); else f.rights.mockRejectedValue(Error("private@example.invalid"));
  await expect(f.guard.assertCanPurchase("current")).rejects.toMatchObject({ code: "purchase_check_unavailable", status: 503 });
  expect(warn).toHaveBeenCalledExactlyOnceWith("purchase_check_unavailable");
});
it("finds active App Store accounts in the purchase group independently of Web access", async () => {
  const f = fixture();
  f.rights.mockImplementation(async id => ({ stripe: false, appStore: id === "current" }));
  await expect(f.guard.appStoreUsers("current")).resolves.toEqual(["current"]);
});
it("lets callers distinguish an audit failure from an absence of overlaps", async () => {
  const f = fixture(), failure = Error("fixture lookup failure");
  f.query.mockRejectedValue(failure);
  await expect(f.guard.appStoreUsers("current")).rejects.toBe(failure);
});
it.each([["google", true], ["apple", true], ["apple", "true"]])("remembers only Auth.js-verified %s email (%s)", async (provider, email_verified) => {
  const save = vi.fn();
  await rememberVerifiedPurchaseEmail({ id: "owner", email: "Owner@example.invalid" }, { provider: String(provider) }, { email: " owner@example.invalid ", email_verified }, save);
  expect(save).toHaveBeenCalledExactlyOnceWith("owner", "Owner@example.invalid");
});
it.each([["google", "true", "owner@example.invalid"], ["google", false, "owner@example.invalid"], ["apple", true, "other@example.invalid"], ["github", true, "owner@example.invalid"]])("does not trust an unverified, mismatched or unsupported profile", async (provider, email_verified, email) => {
  const save = vi.fn();
  await rememberVerifiedPurchaseEmail({ id: "owner", email: "owner@example.invalid" }, { provider: String(provider) }, { email, email_verified }, save);
  expect(save).not.toHaveBeenCalled();
});
