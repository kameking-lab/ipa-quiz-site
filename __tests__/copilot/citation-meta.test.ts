import { describe, expect, it } from "vitest";

import {
  buildCitationMetas,
  decodeCitationsHeader,
  encodeCitationsHeader,
} from "@/lib/copilot/citation-meta";
import type { CorpusDoc, RerankedCandidate } from "@/lib/copilot/types";

function glossaryDoc(text: string): CorpusDoc {
  // A `g:` doc whose term is NOT in the real GLOSSARY, so meta enrichment is
  // skipped and the snippet falls back to doc.text — isolating the snippet
  // transform from live data.
  return {
    id: "g:__test-term-not-in-glossary__",
    kind: "glossary",
    title: "テスト用語",
    url: "https://example.test/glossary/x",
    text,
    meta: {},
  };
}

function candidate(doc: CorpusDoc, i: number): RerankedCandidate {
  return { doc, score: 10 - i, rerankScore: 5 - i };
}

describe("buildCitationMetas", () => {
  it("assigns 1-based sequential ordinals in passage order", () => {
    const metas = buildCitationMetas([
      candidate(glossaryDoc("a"), 0),
      candidate(glossaryDoc("b"), 1),
      candidate(glossaryDoc("c"), 2),
    ]);
    expect(metas.map((m) => m.ordinal)).toEqual([1, 2, 3]);
  });

  it("collapses internal whitespace in the snippet", () => {
    const [meta] = buildCitationMetas([
      candidate(glossaryDoc("  foo\n\n  bar\t baz  "), 0),
    ]);
    expect(meta.snippet).toBe("foo bar baz");
  });

  it("truncates long snippets to 320 chars plus an ellipsis", () => {
    const long = "あ".repeat(400);
    const [meta] = buildCitationMetas([candidate(glossaryDoc(long), 0)]);
    expect(meta.snippet.length).toBe(321); // 320 + "…"
    expect(meta.snippet.endsWith("…")).toBe(true);
    expect(meta.snippet.startsWith("あ")).toBe(true);
  });

  it("leaves a snippet at exactly the limit untouched (no ellipsis)", () => {
    const exact = "x".repeat(320);
    const [meta] = buildCitationMetas([candidate(glossaryDoc(exact), 0)]);
    expect(meta.snippet).toBe(exact);
    expect(meta.snippet.endsWith("…")).toBe(false);
  });

  it("marks unknown glossary docs as kind=glossary without enriched meta", () => {
    const [meta] = buildCitationMetas([candidate(glossaryDoc("text"), 0)]);
    expect(meta.kind).toBe("glossary");
    expect(meta.glossary).toBeUndefined();
    expect(meta.docId).toBe("g:__test-term-not-in-glossary__");
  });
});

describe("citation header encode/decode round-trip", () => {
  it("round-trips metadata including Japanese titles over an ASCII header", () => {
    const metas = buildCitationMetas([
      candidate(glossaryDoc("セキュリティの解説本文"), 0),
      candidate(glossaryDoc("ネットワーク層の説明"), 1),
    ]);
    const header = encodeCitationsHeader(metas);
    // Header must be ASCII-safe (base64) so it survives HTTP transport.
    expect(/^[A-Za-z0-9+/=]+$/.test(header)).toBe(true);
    expect(decodeCitationsHeader(header)).toEqual(metas);
  });

  it("encodes an empty list to an empty string", () => {
    expect(encodeCitationsHeader([])).toBe("");
  });

  it("decodes empty / null / malformed headers to an empty array", () => {
    expect(decodeCitationsHeader("")).toEqual([]);
    expect(decodeCitationsHeader(null)).toEqual([]);
    expect(decodeCitationsHeader("!!!not-base64-json!!!")).toEqual([]);
  });
});
