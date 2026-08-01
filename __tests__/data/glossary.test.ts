import { describe, expect, it } from "vitest";

import { GLOSSARY, GLOSSARY_CATEGORY_LABELS } from "@/data/glossary";

// Characterization tests for data/glossary.ts — the IT term glossary. /glossary
// sorts by `reading` (五十音 localeCompare), groups by `category` (heading +
// aria-label + section id from GLOSSARY_CATEGORY_LABELS[category]), and emits a
// DefinedTermSet JSON-LD (DefinedTerm: name=term, description=short). So: an
// empty reading breaks the sort key, an empty term/short = invalid structured
// data, a duplicate term = duplicate DefinedTerm names, and a category with no
// label = a blank section heading / aria-label.

describe("GLOSSARY registry — DefinedTermSet + sort/group invariants", () => {
  it("is non-empty and every term has a reading, term, and short definition", () => {
    expect(GLOSSARY.length).toBeGreaterThan(0);
    for (const t of GLOSSARY) {
      expect(t.reading.trim().length).toBeGreaterThan(0);
      expect(t.term.trim().length).toBeGreaterThan(0);
      expect(t.short.trim().length).toBeGreaterThan(0);
    }
  });

  it("has no duplicate terms (DefinedTerm names must be distinct)", () => {
    const terms = GLOSSARY.map((t) => t.term);
    expect(new Set(terms).size).toBe(terms.length);
  });

  it("every category in use has a GLOSSARY_CATEGORY_LABELS entry (no blank headings)", () => {
    for (const t of GLOSSARY) {
      expect(GLOSSARY_CATEGORY_LABELS[t.category]).toBeTruthy();
    }
  });

  // OWASP Top 10 の最新版は 2025 年版（OWASP 公式・2026年1月最終版公開）。
  // 旧「最新版は 2021 年版」は陳腐化した誤り。最新版表記が次の世代へ
  // 進んだら更新できるよう、stale な 2021 表記を禁止する。
  it("OWASP Top 10 term does not claim a stale latest version (2021)", () => {
    const owasp = GLOSSARY.find((t) => t.term === "OWASP Top 10");
    expect(owasp).toBeDefined();
    expect(owasp?.detail ?? "").not.toContain("最新版は 2021 年版");
    expect(owasp?.detail ?? "").toContain("2025 年版");
  });
});
