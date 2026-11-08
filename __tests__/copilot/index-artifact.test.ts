import { describe, expect, it } from "vitest";
import { buildIndex, getCachedIndex, resetIndexCache, retrieve, scoreBM25 } from "@/lib/copilot/retriever";
import { corpusFingerprint, deserializeIndex, serializeIndex } from "@/lib/copilot/index-artifact";
import type { CorpusDoc } from "@/lib/copilot/types";

function doc(id: string, text: string, kind: CorpusDoc["kind"] = "question"): CorpusDoc {
  return { id, kind, title: kind === "glossary" ? `用語集: ${id}` : id, url: `/x/${id}`, text, meta: {} };
}

const DOCS: CorpusDoc[] = [
  doc("d1", "暗号化アルゴリズム RSA 公開鍵 暗号方式 デジタル署名 RSA RSA"),
  doc("d2", "データベース 正規化 第3正規形 関数従属 主キー"),
  doc("d3", "ネットワーク TCP/IP OSI 参照モデル ルーティング"),
  doc("d4", "公開鍵 暗号 認証 認証局 X.509 証明書"),
  doc("RSA", "RSA 公開鍵暗号 素因数分解", "glossary"),
];

describe("prebuilt copilot index artifact", () => {
  it("round-trips to the same index and the same retrieval scores", () => {
    const built = buildIndex(DOCS);
    const restored = deserializeIndex(serializeIndex(built), DOCS);
    expect(restored).not.toBeNull();
    if (!restored) return;
    expect([...restored.termIds]).toEqual([...built.termIds]);
    expect([...restored.offsets]).toEqual([...built.offsets]);
    expect([...restored.postingDocs]).toEqual([...built.postingDocs]);
    expect([...restored.postingTfs]).toEqual([...built.postingTfs]);
    expect([...restored.docLen]).toEqual([...built.docLen]);
    expect(restored.avgDocLen).toBe(built.avgDocLen);
    expect(restored.docs).toBe(DOCS);
    const query = "公開鍵 暗号 RSA";
    expect([...scoreBM25(restored, ["公開", "暗号", "rsa"])]).toEqual([...scoreBM25(built, ["公開", "暗号", "rsa"])]);
    expect(retrieve(restored, query, 3)).toEqual(retrieve(built, query, 3));
  });

  it("rejects an index built from a different corpus", () => {
    const bytes = serializeIndex(buildIndex(DOCS));
    const changed = DOCS.map((d) => (d.id === "d2" ? { ...d, text: `${d.text} 追記` } : d));
    expect(deserializeIndex(bytes, changed)).toBeNull();
    expect(deserializeIndex(bytes, DOCS.slice(1))).toBeNull();
  });

  it("accepts a known fingerprint without re-reading document text (prebuilt mode)", () => {
    const built = buildIndex(DOCS);
    const bytes = serializeIndex(built);
    const fingerprint = corpusFingerprint(DOCS);
    expect(deserializeIndex(bytes, DOCS, { fingerprint, verifyTokenization: false })).not.toBeNull();
    expect(deserializeIndex(bytes, DOCS, { fingerprint: "other", verifyTokenization: false })).toBeNull();
  });

  it("handles an empty corpus", () => {
    const restored = deserializeIndex(serializeIndex(buildIndex([])), []);
    expect(restored?.termIds.size).toBe(0);
    expect(restored?.avgDocLen).toBe(0);
  });

  it("getCachedIndex falls back to a runtime build when the prebuilt loader returns null", () => {
    resetIndexCache();
    const index = getCachedIndex(() => DOCS, () => null);
    expect(index.docs).toBe(DOCS);
    expect(retrieve(index, "公開鍵 暗号", 2).length).toBeGreaterThan(0);
    resetIndexCache();
  });
});
