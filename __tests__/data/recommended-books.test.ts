import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  RECOMMENDED_BOOKS,
  buildAmazonUrl,
  buildRakutenUrl,
  getDifficultyLabel,
  getRecommendedBooks,
  isAsinFilled,
  isRakutenIdFilled,
} from "@/data/recommended-books";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { ESSAY_EXAM_CODES } from "@/lib/essays/load";

// Characterization tests for data/recommended-books.ts — the affiliate book
// registry consumed by /recommended-books, /[exam], InlineBookHint, and the
// sitemap. The URL builders and "is this id real?" gates are load-bearing for
// revenue (a dropped affiliate tag = lost commission) and for UX (linking a
// placeholder asin = a 404). We pin the gate logic and URL formats here; the
// affiliate IDs themselves are env-driven (§14) and never hardcoded in source,
// so the tests stub the env to exercise both the with-id and no-id branches.

describe("isAsinFilled / isRakutenIdFilled — placeholder gates", () => {
  it("rejects undefined, empty, and whitespace-only ids", () => {
    expect(isAsinFilled(undefined)).toBe(false);
    expect(isAsinFilled("")).toBe(false);
    expect(isAsinFilled("   ")).toBe(false);
    expect(isRakutenIdFilled(undefined)).toBe(false);
    expect(isRakutenIdFilled("")).toBe(false);
    expect(isRakutenIdFilled("   ")).toBe(false);
  });

  it("rejects the literal placeholder sentinels (un-filled books)", () => {
    expect(isAsinFilled("ASIN_TO_BE_FILLED")).toBe(false);
    expect(isRakutenIdFilled("RAKUTEN_ID_TO_BE_FILLED")).toBe(false);
  });

  it("accepts a real-looking id", () => {
    expect(isAsinFilled("4297152991")).toBe(true);
    expect(isRakutenIdFilled("18403846")).toBe(true);
  });
});

describe("buildAmazonUrl — affiliate tag appending", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("appends ?tag=<associate-tag> when the env var is set", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "safeaisite22-22");
    expect(buildAmazonUrl("4297152991")).toBe(
      "https://www.amazon.co.jp/dp/4297152991?tag=safeaisite22-22",
    );
  });

  it("falls back to the bare /dp/ url when the tag env var is empty", () => {
    vi.stubEnv("NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG", "");
    expect(buildAmazonUrl("4297152991")).toBe(
      "https://www.amazon.co.jp/dp/4297152991",
    );
  });
});

describe("buildRakutenUrl — affiliate redirect wrapping", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("wraps the product url in the hb.afl redirect when affiliate id is set", () => {
    vi.stubEnv("NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID", "abc.def");
    const expectedProduct = "https://books.rakuten.co.jp/rb/18403846/";
    expect(buildRakutenUrl("18403846")).toBe(
      `https://hb.afl.rakuten.co.jp/hgc/abc.def/?pc=${encodeURIComponent(expectedProduct)}`,
    );
  });

  it("returns the bare product url when affiliate id is empty", () => {
    vi.stubEnv("NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID", "");
    expect(buildRakutenUrl("18403846")).toBe(
      "https://books.rakuten.co.jp/rb/18403846/",
    );
  });
});

describe("getDifficultyLabel", () => {
  it("maps each difficulty to its Japanese label", () => {
    expect(getDifficultyLabel("beginner")).toBe("入門");
    expect(getDifficultyLabel("intermediate")).toBe("中級");
    expect(getDifficultyLabel("advanced")).toBe("上級");
  });
});

describe("getRecommendedBooks / RECOMMENDED_BOOKS registry", () => {
  it("returns the books for a known exam and an empty array for an unknown one", () => {
    expect(getRecommendedBooks("ip").length).toBeGreaterThan(0);
    // An unknown code must degrade to [] (?? guard), never undefined — callers
    // .map over the result without a null check.
    expect(getRecommendedBooks("zz" as never)).toEqual([]);
  });

  it("has at least one book for every exam code (no exam left without picks)", () => {
    for (const exam of ALL_EXAM_CODES) {
      expect(getRecommendedBooks(exam).length).toBeGreaterThan(0);
    }
  });

  it("uses unique book ids across the whole registry (sitemap/keys rely on it)", () => {
    const ids = Object.values(RECOMMENDED_BOOKS)
      .flat()
      .map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // The essay funnel pages (/essays/[exam] and the answer-detail page) render
  // <InlineBookHint exam={exam} category="午後" />. pickBookForCategory matches
  // on tags.some(t => t.toLowerCase().includes(category)), so each essay exam
  // MUST have a 午後-tagged book — otherwise the affiliate silently falls back
  // to a non-午後 (e.g. 教科書) book on the flagship 論述 funnel. This pins that
  // data contract so dropping/retagging a 午後 book for an essay exam fails CI.
  it("has a 午後-tagged book for every essay exam (InlineBookHint category=午後)", () => {
    expect(ESSAY_EXAM_CODES.length).toBeGreaterThan(0); // non-vacuous
    for (const exam of ESSAY_EXAM_CODES) {
      const books = getRecommendedBooks(exam);
      const has午後 = books.some((b) =>
        b.tags.some((t) => t.toLowerCase().includes("午後")),
      );
      expect(has午後, `${exam} は午後タグ付き書籍が必要`).toBe(true);
    }
  });
});
