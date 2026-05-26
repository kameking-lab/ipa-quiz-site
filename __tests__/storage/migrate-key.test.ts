import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { migrateLegacyKey } from "@/lib/storage/migrate-key";
import { readUserContext, USER_CONTEXT_LS_KEY } from "@/lib/storage/user-context";

const LEGACY_USER_CONTEXT = "kakomon-ai-user-context-v1";

describe("migrateLegacyKey", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it("copies a legacy value to the new key and removes the legacy key", () => {
    localStorage.setItem("kakomon-ai-foo-v1", '{"a":1}');
    migrateLegacyKey("kakomon-ai-foo-v1", "ipa-quiz:foo:v1");
    expect(localStorage.getItem("ipa-quiz:foo:v1")).toBe('{"a":1}');
    expect(localStorage.getItem("kakomon-ai-foo-v1")).toBeNull();
  });

  it("never clobbers an existing new-key value, but still removes the legacy key", () => {
    localStorage.setItem("kakomon-ai-foo-v1", "OLD");
    localStorage.setItem("ipa-quiz:foo:v1", "NEW");
    migrateLegacyKey("kakomon-ai-foo-v1", "ipa-quiz:foo:v1");
    expect(localStorage.getItem("ipa-quiz:foo:v1")).toBe("NEW");
    expect(localStorage.getItem("kakomon-ai-foo-v1")).toBeNull();
  });

  it("is a no-op when the legacy key is absent (new users get no write)", () => {
    migrateLegacyKey("kakomon-ai-foo-v1", "ipa-quiz:foo:v1");
    expect(localStorage.getItem("ipa-quiz:foo:v1")).toBeNull();
    expect(localStorage.getItem("kakomon-ai-foo-v1")).toBeNull();
  });

  it("is idempotent on repeated calls", () => {
    localStorage.setItem("kakomon-ai-foo-v1", "X");
    migrateLegacyKey("kakomon-ai-foo-v1", "ipa-quiz:foo:v1");
    migrateLegacyKey("kakomon-ai-foo-v1", "ipa-quiz:foo:v1");
    expect(localStorage.getItem("ipa-quiz:foo:v1")).toBe("X");
  });
});

describe("user-context migration via readUserContext", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it("reads an existing legacy user-context and migrates it to the new key", () => {
    localStorage.setItem(
      LEGACY_USER_CONTEXT,
      JSON.stringify({ visitCount: 4, lastVisitAt: "2026-05-01T00:00:00.000Z" }),
    );
    const ctx = readUserContext();
    expect(ctx.visitCount).toBe(4);
    expect(USER_CONTEXT_LS_KEY).toBe("ipa-quiz:user-context:v1");
    expect(localStorage.getItem(USER_CONTEXT_LS_KEY)).not.toBeNull();
    expect(localStorage.getItem(LEGACY_USER_CONTEXT)).toBeNull();
  });

  it("returns empty for a brand-new user without writing anything", () => {
    const ctx = readUserContext();
    expect(ctx.visitCount).toBe(0);
    expect(localStorage.getItem(USER_CONTEXT_LS_KEY)).toBeNull();
  });
});
