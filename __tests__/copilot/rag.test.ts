import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { runRAG, ragEnabled, ragMinScore } from "@/lib/copilot/rag";
import { resetCorpusCache } from "@/lib/copilot/corpus";
import { resetIndexCache } from "@/lib/copilot/retriever";

describe("ragEnabled / ragMinScore", () => {
  beforeEach(() => {
    delete process.env.COPILOT_RAG_ENABLED;
    delete process.env.COPILOT_RAG_MIN_SCORE;
  });
  afterEach(() => {
    delete process.env.COPILOT_RAG_ENABLED;
    delete process.env.COPILOT_RAG_MIN_SCORE;
  });

  it("defaults to enabled with a calibrated positive min score", () => {
    expect(ragEnabled()).toBe(true);
    expect(ragMinScore()).toBeGreaterThan(0);
  });

  it("respects env overrides", () => {
    process.env.COPILOT_RAG_ENABLED = "false";
    process.env.COPILOT_RAG_MIN_SCORE = "2.5";
    expect(ragEnabled()).toBe(false);
    expect(ragMinScore()).toBe(2.5);
  });
});

describe("runRAG (integration over real corpus)", () => {
  beforeEach(() => {
    resetCorpusCache();
    resetIndexCache();
  });

  it("returns passages for a clear knowledge query", async () => {
    const res = await runRAG({
      userMessage: "ACIDの永続性とは何ですか",
    });
    expect(res.passages.length).toBeGreaterThan(0);
    expect(res.topScore).toBeGreaterThan(0);
    expect(res.rerankerUsed).toBe("deterministic");
  });

  it("returns empty passages for unretrievable input", async () => {
    const res = await runRAG({ userMessage: "?????" });
    expect(res.passages).toEqual([]);
    expect(res.rerankerUsed).toBe("none");
  });

  it("respects topN", async () => {
    const res = await runRAG({
      userMessage: "TCP/IP の階層モデル",
      topN: 2,
    });
    expect(res.passages.length).toBeLessThanOrEqual(2);
  });

  it("skips RAG for socratic quick action", async () => {
    const res = await runRAG({
      userMessage: "DNSのキャッシュポイズニング",
      quickAction: "socratic",
    });
    expect(res.passages).toEqual([]);
    expect(res.rerankerUsed).toBe("none");
  });
});
