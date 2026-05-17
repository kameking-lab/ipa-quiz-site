import { describe, it, expect } from "vitest";
import {
  buildCitationFooter,
  buildRAGContextBlock,
  responseHasInlineCitation,
  NO_GROUNDING_FALLBACK,
} from "@/lib/copilot/citations";
import type { RerankedCandidate } from "@/lib/copilot/types";

function p(id: string, title: string, url: string, text = "本文"): RerankedCandidate {
  return {
    rerankScore: 1,
    score: 1,
    doc: { id, kind: "question", title, url, text, meta: {} },
  };
}

describe("buildRAGContextBlock", () => {
  it("returns empty for empty passages", () => {
    expect(buildRAGContextBlock([])).toBe("");
  });

  it("numbers passages and includes URLs", () => {
    const block = buildRAGContextBlock([
      p("q:a", "Q1 タイトル", "/quiz?id=a"),
      p("g:ACID", "用語: ACID", "/glossary#ACID"),
    ]);
    expect(block).toContain("[1] Q1 タイトル");
    expect(block).toContain("[2] 用語: ACID");
    expect(block).toContain("/quiz?id=a");
    expect(block).toContain("/glossary#ACID");
  });

  it("trims very long passage bodies", () => {
    const long = "a".repeat(3000);
    const block = buildRAGContextBlock([p("q:a", "title", "/u", long)]);
    expect(block.length).toBeLessThan(2000);
    expect(block).toContain("…");
  });
});

describe("buildCitationFooter", () => {
  it("returns empty for empty passages", () => {
    expect(buildCitationFooter([])).toBe("");
  });

  it("includes title and URL", () => {
    const f = buildCitationFooter([
      p("q:a", "Q1 タイトル", "/quiz?id=a"),
      p("g:ACID", "用語: ACID", "/glossary#ACID"),
    ]);
    expect(f).toContain("[1] [Q1 タイトル](/quiz?id=a)");
    expect(f).toContain("[2] [用語: ACID](/glossary#ACID)");
    expect(f).toContain("出典");
  });
});

describe("responseHasInlineCitation", () => {
  it("detects [1] [10] etc.", () => {
    expect(responseHasInlineCitation("これは [1] と関係します")).toBe(true);
    expect(responseHasInlineCitation("詳細 [10] 参照")).toBe(true);
  });

  it("rejects when no citation", () => {
    expect(responseHasInlineCitation("出典なしの応答")).toBe(false);
  });

  it("rejects single brackets", () => {
    expect(responseHasInlineCitation("[abc]")).toBe(false);
  });
});

describe("NO_GROUNDING_FALLBACK", () => {
  it("contains user-facing fallback message", () => {
    expect(NO_GROUNDING_FALLBACK).toContain("回答できません");
  });
});
