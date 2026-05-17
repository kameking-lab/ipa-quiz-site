import { describe, it, expect } from "vitest";
import {
  deterministicRerank,
  llmRerank,
  buildRetrievalQuery,
  isQueryRetrievable,
} from "@/lib/copilot/reranker";
import type { CorpusDoc, RetrievalCandidate } from "@/lib/copilot/types";
import type { LLMProvider } from "@/lib/ai/provider";

function cand(id: string, score: number, extras: Partial<CorpusDoc> = {}): RetrievalCandidate {
  return {
    score,
    doc: {
      id,
      kind: "question",
      title: id,
      url: `/x/${id}`,
      text: "abc def",
      meta: {},
      ...extras,
    },
  };
}

describe("deterministicRerank", () => {
  it("returns same items when no boosts apply", () => {
    const candidates = [cand("a", 10), cand("b", 8), cand("c", 6)];
    const result = deterministicRerank(candidates, {}, 3);
    expect(result.length).toBe(3);
    expect(result[0].doc.id).toBe("a");
  });

  it("boosts category match", () => {
    const candidates = [
      cand("a", 10, { meta: { category: "セキュリティ" } }),
      cand("b", 11, { meta: { category: "ネットワーク" } }),
    ];
    const result = deterministicRerank(candidates, { currentCategory: "セキュリティ" }, 2);
    // 10 * 1.2 = 12 > 11
    expect(result[0].doc.id).toBe("a");
  });

  it("boosts overlapping topic tags", () => {
    const candidates = [
      cand("a", 10, { meta: { topicTags: ["暗号", "署名"] } }),
      cand("b", 10.4, { meta: { topicTags: ["DB"] } }),
    ];
    const result = deterministicRerank(
      candidates,
      { currentTopicTags: ["暗号", "署名"] },
      2,
    );
    // 10 * (1 + 2*0.05) = 11 > 10.4
    expect(result[0].doc.id).toBe("a");
  });

  it("respects topN", () => {
    const candidates = [cand("a", 10), cand("b", 8), cand("c", 6)];
    const result = deterministicRerank(candidates, {}, 2);
    expect(result.length).toBe(2);
  });

  it("glossary base 1.5x boost", () => {
    const candidates = [
      cand("g:ACID", 10, { kind: "glossary", title: "用語集: 別の用語" }),
      cand("q:foo", 12),
    ];
    const result = deterministicRerank(candidates, {}, 2);
    // glossary boost 1.5: 10*1.5 = 15 > 12
    expect(result[0].doc.id).toBe("g:ACID");
  });

  it("strong title-match boost on glossary", () => {
    const candidates = [
      cand("g:ACID", 5, { kind: "glossary", title: "用語集: ACID (Atomicity)" }),
      cand("q:foo", 25),
    ];
    // query が "ACID" 完全一致 → 5 * 1.5 * (1+4*1) = 37.5 > 25
    const result = deterministicRerank(candidates, {}, 2, "ACID 特性");
    expect(result[0].doc.id).toBe("g:ACID");
  });
});

describe("buildRetrievalQuery", () => {
  it("concatenates category and tags into query", () => {
    const q = buildRetrievalQuery("これは何？", {
      currentCategory: "セキュリティ",
      currentTopicTags: ["暗号"],
    });
    expect(q).toContain("セキュリティ");
    expect(q).toContain("暗号");
  });

  it("returns plain message when no context", () => {
    const q = buildRetrievalQuery("hello", {});
    expect(q).toBe("hello");
  });
});

describe("isQueryRetrievable", () => {
  it("rejects symbol-only", () => {
    expect(isQueryRetrievable("???")).toBe(false);
  });

  it("accepts CJK", () => {
    expect(isQueryRetrievable("暗号")).toBe(true);
  });

  it("accepts ASCII words", () => {
    expect(isQueryRetrievable("OAuth flow")).toBe(true);
  });
});

function makeMockProvider(answer: string): LLMProvider {
  return {
    name: "mock",
    async *streamChat() {
      yield answer;
    },
  };
}

describe("llmRerank", () => {
  it("parses LLM response into ranked candidates", async () => {
    const candidates = [cand("a", 10), cand("b", 8), cand("c", 6)];
    const provider = makeMockProvider("2,0,1");
    const result = await llmRerank("Q", candidates, 3, provider, {});
    expect(result.map((r) => r.doc.id)).toEqual(["c", "a", "b"]);
  });

  it("falls back to deterministic on unparseable response", async () => {
    const candidates = [cand("a", 10), cand("b", 8)];
    const provider = makeMockProvider("nope nothing here");
    const result = await llmRerank("Q", candidates, 2, provider, {});
    expect(result.length).toBe(2);
    expect(result[0].doc.id).toBe("a");
  });

  it("falls back on provider throw", async () => {
    const candidates = [cand("a", 10), cand("b", 8)];
    const broken: LLMProvider = {
      name: "broken",
      async *streamChat() {
        throw new Error("nope");
      },
    };
    const result = await llmRerank("Q", candidates, 2, broken, {});
    expect(result.length).toBe(2);
  });
});
