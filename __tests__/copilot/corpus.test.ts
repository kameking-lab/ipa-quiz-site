import { describe, it, expect, beforeEach } from "vitest";
import { getCorpus, resetCorpusCache } from "@/lib/copilot/corpus";
import { getAllQuestions } from "@/lib/questions/load";
import { GLOSSARY } from "@/data/glossary";

// getCorpus は AI コパイロットの RAG 検索（B軸）が参照する全コーパスを組み立てる。
// BM25 のフィールド重み付け（カテゴリ/タグ ×2・用語名 ×6・英語表記 ×3 を本文に重複挿入）と
// 「解説が空/短すぎる問題を検索対象から外す」フィルタは、崩れても例外は出ず検索の関連度が
// 静かに劣化するだけ＝気付きにくい。プロセス内キャッシュの同一性も含め契約を回帰固定する。

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  let count = 0;
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    count += 1;
    idx = haystack.indexOf(needle, idx + needle.length);
  }
  return count;
}

beforeEach(() => {
  resetCorpusCache();
});

describe("getCorpus - キャッシュ", () => {
  it("同一プロセス内では同じ参照を返す（再構築しない）", () => {
    const a = getCorpus();
    const b = getCorpus();
    expect(b).toBe(a);
  });

  it("resetCorpusCache 後は再構築するが内容は等価", () => {
    const a = getCorpus();
    resetCorpusCache();
    const b = getCorpus();
    expect(b).not.toBe(a);
    expect(b.length).toBe(a.length);
  });
});

describe("getCorpus - doc 形状の不変条件", () => {
  it("question doc は q: プレフィックス・kind=question・/quiz?id= の URL", () => {
    const qDocs = getCorpus().filter((d) => d.kind === "question");
    expect(qDocs.length).toBeGreaterThan(0);
    for (const d of qDocs.slice(0, 200)) {
      expect(d.id.startsWith("q:")).toBe(true);
      expect(d.url.startsWith("/quiz?id=")).toBe(true);
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.text.length).toBeGreaterThan(0);
    }
  });

  it("glossary doc は g: プレフィックス・kind=glossary・/glossary# の URL で全用語が乗る", () => {
    const gDocs = getCorpus().filter((d) => d.kind === "glossary");
    expect(gDocs.length).toBe(GLOSSARY.length);
    for (const d of gDocs) {
      expect(d.id.startsWith("g:")).toBe(true);
      expect(d.url.startsWith("/glossary#")).toBe(true);
    }
  });
});

describe("getCorpus - 解説フィルタ", () => {
  it("コーパスに乗る各 question doc の元問題は解説が 20 文字以上（空/短い解説は除外）", () => {
    const byId = new Map(getAllQuestions().map((q) => [q.id, q]));
    const qDocs = getCorpus().filter((d) => d.kind === "question");
    for (const d of qDocs.slice(0, 500)) {
      const realId = d.id.slice(2); // 先頭の "q:" を除去
      const q = byId.get(realId);
      expect(q).toBeDefined();
      expect((q?.explanation ?? "").trim().length).toBeGreaterThanOrEqual(20);
    }
  });
});

describe("getCorpus - BM25 フィールド重み付け", () => {
  it("用語集 doc は用語名を 6 回・英語表記を 3 回以上重複させる", () => {
    // GLOSSARY[0] = ACID（英語表記あり）を使ってタイトル重みの契約を観測する。
    const acid = GLOSSARY[0];
    const doc = getCorpus().find((d) => d.id === `g:${acid.term}`);
    expect(doc).toBeDefined();
    expect(countOccurrences(doc!.text, acid.term)).toBeGreaterThanOrEqual(6);
    if (acid.english) {
      expect(countOccurrences(doc!.text, acid.english)).toBeGreaterThanOrEqual(3);
    }
  });

  it("question doc はカテゴリを 2 回以上重複させる", () => {
    const doc = getCorpus().find((d) => d.kind === "question" && !!d.meta.category);
    expect(doc).toBeDefined();
    const category = doc!.meta.category!;
    expect(countOccurrences(doc!.text, category)).toBeGreaterThanOrEqual(2);
  });
});
