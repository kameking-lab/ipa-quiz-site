import { describe, it, expect, beforeEach } from "vitest";
import {
  getCustomTags,
  getCustomTagColor,
  ensureCatalogForNames,
  mergeServerCustomTags,
  type CustomTagMeta,
} from "@/lib/storage/custom-tags";

beforeEach(() => {
  window.localStorage.clear();
});

describe("ensureCatalogForNames", () => {
  it("returns an empty catalog for a brand-new user", () => {
    expect(getCustomTags()).toEqual([]);
  });

  it("adds missing names with incrementing sortOrder and default colour", () => {
    const tags = ensureCatalogForNames(["苦手", "ネットワーク"]);
    expect(tags.map((t) => t.name)).toEqual(["苦手", "ネットワーク"]);
    expect(tags.every((t) => t.color === "zinc")).toBe(true);
    expect(tags.map((t) => t.sortOrder)).toEqual([0, 1]);
  });

  it("is idempotent and skips empty names", () => {
    ensureCatalogForNames(["a"]);
    const tags = ensureCatalogForNames(["a", "", "b"]);
    expect(tags.map((t) => t.name)).toEqual(["a", "b"]);
    expect(getCustomTagColor("a")).toBe("zinc");
  });
});

describe("mergeServerCustomTags", () => {
  it("applies server tags and keeps the newer side (last-write-wins)", () => {
    ensureCatalogForNames(["local"]);
    const localUpdatedAt = getCustomTags().find((t) => t.name === "local")!.updatedAt;
    const server: CustomTagMeta[] = [
      // Stale server copy → ignored (local is newer/equal).
      { name: "local", color: "red", sortOrder: 9, updatedAt: localUpdatedAt - 1000 },
      // Newer server-only entry → applied.
      { name: "remote", color: "blue", sortOrder: 5, updatedAt: localUpdatedAt + 1000 },
    ];
    mergeServerCustomTags(server);
    expect(getCustomTagColor("local")).toBe("zinc");
    expect(getCustomTagColor("remote")).toBe("blue");
  });
});

// readRaw() returns a module-level empty object on the "no stored key" path.
// ensureCatalogForNames assigns data.tags[name] in place, which would corrupt a
// shared-by-reference empty and leak into a later empty read.
describe("shared-empty footgun (absent-storage purity)", () => {
  it("does not leak an ensured tag into a later empty read", () => {
    ensureCatalogForNames(["leak"]); // empty-path write
    window.localStorage.clear(); // key absent again
    expect(getCustomTags()).toEqual([]);
    expect(getCustomTagColor("leak")).toBeUndefined();
  });
});
