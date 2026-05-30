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
});
