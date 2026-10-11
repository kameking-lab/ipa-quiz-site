import { describe, it, expect } from "vitest";
import { getCategoryTip } from "@/lib/seo/category-tips";

describe("getCategoryTip", () => {
  it("returns the curated tip for a known category", () => {
    const tip = getCategoryTip("基礎理論");
    expect(tip?.whatMatters).toContain("2進数");
    expect(tip?.relatedKeywords.length).toBeGreaterThan(0);
  });

  it("omits an unknown category instead of publishing an empty generic lesson", () => {
    expect(getCategoryTip("存在しない分野")).toBeUndefined();
  });

  it("does not invent a shared lesson for distinct unknown categories", () => {
    expect(getCategoryTip("謎A")).toBe(getCategoryTip("謎B"));
  });
});
