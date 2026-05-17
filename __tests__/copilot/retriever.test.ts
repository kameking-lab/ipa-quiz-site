import { describe, it, expect } from "vitest";
import { tokenize, uniqueTokens } from "@/lib/copilot/tokenize";
import { buildIndex, retrieve, scoreBM25, maxQueryIdf } from "@/lib/copilot/retriever";
import type { CorpusDoc } from "@/lib/copilot/types";

function doc(id: string, text: string, extras: Partial<CorpusDoc> = {}): CorpusDoc {
  return {
    id,
    kind: "question",
    title: id,
    url: `/x/${id}`,
    text,
    meta: {},
    ...extras,
  };
}

describe("tokenize", () => {
  it("returns empty list for empty input", () => {
    expect(tokenize("")).toEqual([]);
  });

  it("char-bigrams CJK strings", () => {
    const tokens = tokenize("暗号化");
    expect(tokens).toContain("暗号");
    expect(tokens).toContain("号化");
  });

  it("lowercases ASCII words and filters stopwords", () => {
    const tokens = tokenize("The OAuth2 flow");
    expect(tokens).toContain("oauth2");
    expect(tokens).toContain("flow");
    expect(tokens).not.toContain("the");
  });

  it("mixed CJK + ASCII", () => {
    const tokens = tokenize("RSA 公開鍵暗号");
    expect(tokens).toContain("rsa");
    expect(tokens).toContain("公開");
    expect(tokens).toContain("暗号");
  });

  it("uniqueTokens dedupes", () => {
    const all = tokenize("暗号 暗号 暗号");
    const uniq = uniqueTokens("暗号 暗号 暗号");
    expect(all.length).toBeGreaterThan(uniq.length);
  });
});

describe("BM25 retriever", () => {
  const docs: CorpusDoc[] = [
    doc("d1", "暗号化アルゴリズム RSA 公開鍵 暗号方式 デジタル署名"),
    doc("d2", "データベース 正規化 第3正規形 関数従属 主キー"),
    doc("d3", "ネットワーク TCP/IP OSI 参照モデル ルーティング"),
    doc("d4", "公開鍵 暗号 認証 認証局 X.509 証明書"),
    doc("d5", "プロジェクト管理 PMBOK WBS リスク 課題管理"),
  ];

  it("returns documents in BM25 order", () => {
    const idx = buildIndex(docs);
    const results = retrieve(idx, "公開鍵 暗号", 3);
    expect(results.length).toBeGreaterThan(0);
    const topIds = results.slice(0, 2).map((r) => r.doc.id);
    expect(topIds.includes("d1") || topIds.includes("d4")).toBe(true);
  });

  it("scoreBM25 returns positive scores for matching docs", () => {
    const idx = buildIndex(docs);
    const scores = scoreBM25(idx, ["公開", "暗号"]);
    expect(scores.size).toBeGreaterThan(0);
    for (const v of scores.values()) {
      expect(v).toBeGreaterThan(0);
    }
  });

  it("returns empty array for non-matching query", () => {
    const idx = buildIndex(docs);
    const results = retrieve(idx, "存在しない単語zzz", 5);
    expect(results.length).toBe(0);
  });

  it("respects k parameter (allowing pin-in extras)", () => {
    const idx = buildIndex(docs);
    const results = retrieve(idx, "公開 暗号 ネットワーク データ", 2);
    // 用語集ピン用に +5 件まで返すが、コーパスに glossary docs はないので実質 k 以下
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it("ASCII-only query works", () => {
    const idx = buildIndex(docs);
    const results = retrieve(idx, "RSA TCP", 5);
    expect(results.length).toBeGreaterThan(0);
  });

  it("handles empty corpus", () => {
    const idx = buildIndex([]);
    const results = retrieve(idx, "anything", 5);
    expect(results.length).toBe(0);
  });

  it("glossary pin: title-match doc pinned in even if BM25 low", () => {
    const mixedDocs: CorpusDoc[] = [
      doc("q:x1", "暗号化に関する詳細な記述が大量に並ぶ大長文の問題説明", {
        kind: "question",
      }),
      doc("q:x2", "暗号化のさらに別の問題と解説", { kind: "question" }),
      doc("q:x3", "暗号化のもうひとつ別の長い問題", { kind: "question" }),
      {
        id: "g:暗号化",
        kind: "glossary",
        title: "用語集: 暗号化",
        url: "/glossary#暗号化",
        text: "暗号化",
        meta: {},
      },
    ];
    const idx = buildIndex(mixedDocs);
    const results = retrieve(idx, "暗号化", 2);
    const ids = results.map((r) => r.doc.id);
    expect(ids).toContain("g:暗号化");
  });
});

describe("maxQueryIdf", () => {
  it("returns 0 for unindexed tokens", () => {
    const idx = buildIndex([]);
    expect(maxQueryIdf(idx, "foo")).toBe(0);
  });

  it("returns higher IDF for rare tokens", () => {
    const docs: CorpusDoc[] = [
      doc("d1", "rare ubiquitous"),
      doc("d2", "common ubiquitous"),
      doc("d3", "another ubiquitous"),
      doc("d4", "yet ubiquitous"),
    ];
    const idx = buildIndex(docs);
    const rareIdf = maxQueryIdf(idx, "rare");
    const commonIdf = maxQueryIdf(idx, "ubiquitous");
    expect(rareIdf).toBeGreaterThan(commonIdf);
  });
});
