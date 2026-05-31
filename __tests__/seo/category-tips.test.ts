import { describe, it, expect } from "vitest";
import { getCategoryTip } from "@/lib/seo/category-tips";

describe("getCategoryTip", () => {
  it("returns the curated tip for a known category", () => {
    const tip = getCategoryTip("基礎理論");
    expect(tip.whatMatters).toContain("2進数");
    expect(tip.relatedKeywords.length).toBeGreaterThan(0);
  });

  it("falls back to a non-empty generic tip for an unknown category", () => {
    // Load-bearing: /q pages read .whatMatters/.howToStudy/.relatedKeywords
    // unconditionally, so the fallback must be a fully-shaped object, never undefined.
    const tip = getCategoryTip("存在しない分野");
    expect(tip).toBeDefined();
    expect(typeof tip.whatMatters).toBe("string");
    expect(tip.whatMatters.length).toBeGreaterThan(0);
    expect(typeof tip.howToStudy).toBe("string");
    expect(tip.howToStudy.length).toBeGreaterThan(0);
    expect(Array.isArray(tip.relatedKeywords)).toBe(true);
  });

  it("returns the same fallback reference for distinct unknown categories", () => {
    expect(getCategoryTip("謎A")).toBe(getCategoryTip("謎B"));
  });
});
