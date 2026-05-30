import { describe, it, expect } from "vitest";
import { tokenize, uniqueTokens } from "@/lib/copilot/tokenize";
import {
  buildIndex,
  retrieve,
  scoreBM25,
  maxQueryIdf,
  getCachedIndex,
  resetIndexCache,
} from "@/lib/copilot/retriever";
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

  // retrieve() の rerank/ピン留めには、BM25 では取れない glossary doc を救済する
  // 3 系統がある: ①タイトルトークン完全一致(既存テスト) ②タイトルトークン過半数一致
  // (弱採用) ③エイリアス完全一致。②③が崩れると paraphrase/略称クエリで用語解説が
  // 候補から消える(コパイロット RAG の主救済策)ため、各分岐を回帰固定する。
  it("glossary pin: 過半数タイトル一致(ratio>=0.5)の glossary を弱採用する", () => {
    const docs: CorpusDoc[] = [
      doc("q:a", "foo bar baz long irrelevant question body text here", {
        kind: "question",
      }),
      doc("q:b", "foo bar baz another unrelated question explanation", {
        kind: "question",
      }),
      {
        id: "g:partial",
        kind: "glossary",
        // titleNorm = "alpha beta gamma" → 3 トークン
        title: "用語集: alpha beta gamma",
        url: "/glossary#x",
        // BM25 ではクエリと一致させない(text にクエリ語を入れない)
        text: "zzz unrelated body",
        meta: {},
      },
    ];
    const idx = buildIndex(docs);
    // クエリは alpha/beta の 2 トークンを供給 → hit 2/3 ≒ 0.667 >= 0.5 で弱採用。
    // gamma を欠くため title 完全一致ではない(②の経路)。
    const results = retrieve(idx, "alpha beta", 2);
    expect(results.map((r) => r.doc.id)).toContain("g:partial");
  });

  it("glossary pin: 過半数未満(ratio<0.5)の glossary は採用しない", () => {
    const docs: CorpusDoc[] = [
      doc("q:a", "foo bar baz long irrelevant question body text here", {
        kind: "question",
      }),
      doc("q:b", "foo bar baz another unrelated question explanation", {
        kind: "question",
      }),
      {
        id: "g:partial",
        kind: "glossary",
        title: "用語集: alpha beta gamma",
        url: "/glossary#x",
        text: "zzz unrelated body",
        meta: {},
      },
    ];
    const idx = buildIndex(docs);
    // alpha 1 トークンのみ → hit 1/3 ≒ 0.333 < 0.5 で不採用。
    const results = retrieve(idx, "alpha", 2);
    expect(results.map((r) => r.doc.id)).not.toContain("g:partial");
  });

  it("glossary pin: エイリアス完全一致で BM25・タイトルとも非一致の用語をピン留めする", () => {
    const docs: CorpusDoc[] = [
      doc("q:a", "encryption key management overview question body", {
        kind: "question",
      }),
      doc("q:b", "another encryption key topic explanation text", {
        kind: "question",
      }),
      {
        id: "g:pubkey",
        kind: "glossary",
        // titleNorm = "公開鍵暗号"。クエリ "RSA encryption key" には
        // タイトルトークン(公開/開鍵/鍵暗/暗号)が 1 つも含まれない。
        title: "用語集: 公開鍵暗号",
        url: "/glossary#pubkey",
        // BM25 でも一致しない(text にクエリ語なし)
        text: "公開鍵暗号方式の説明",
        meta: {},
      },
    ];
    const idx = buildIndex(docs);
    // "RSA" は GLOSSARY_ALIASES["公開鍵暗号"] のエイリアス → 用語 "公開鍵暗号" を強制ピン。
    const results = retrieve(idx, "RSA encryption key", 2);
    expect(results.map((r) => r.doc.id)).toContain("g:pubkey");
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

describe("getCachedIndex / resetIndexCache", () => {
  // RAG リトリーバはプロセス内シングルトンの転置インデックスを lazy build する。
  // 「初回だけ getDocs を呼んで以降は同一参照を返す」「reset で再構築させる」契約が
  // 崩れると、毎リクエストでコーパス再構築(コスト)か、更新が反映されない不具合になる。
  function corpusDocs(): CorpusDoc[] {
    return [doc("c1", "rare ubiquitous"), doc("c2", "common ubiquitous")];
  }

  it("初回は getDocs を1回だけ呼んで構築し、以降はキャッシュした同一参照を返す", () => {
    resetIndexCache();
    let calls = 0;
    const getDocs = () => {
      calls += 1;
      return corpusDocs();
    };
    const first = getCachedIndex(getDocs);
    const second = getCachedIndex(getDocs);
    expect(second).toBe(first); // 同一参照
    expect(calls).toBe(1); // getDocs は2回目で呼ばれない
    expect(first.docs).toHaveLength(2);
  });

  it("resetIndexCache 後は getDocs を再度呼んで作り直す（新しい参照）", () => {
    resetIndexCache();
    let calls = 0;
    const getDocs = () => {
      calls += 1;
      return corpusDocs();
    };
    const before = getCachedIndex(getDocs);
    resetIndexCache();
    const after = getCachedIndex(getDocs);
    expect(after).not.toBe(before); // reset で別インスタンス
    expect(calls).toBe(2); // 再構築のため再度 getDocs
  });
});
