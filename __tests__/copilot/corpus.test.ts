import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
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
  it("question doc は q: プレフィックス・kind=question・正規 /q/ 問題ページの URL", () => {
    const qDocs = getCorpus().filter((d) => d.kind === "question");
    expect(qDocs.length).toBeGreaterThan(0);
    for (const d of qDocs.slice(0, 200)) {
      expect(d.id.startsWith("q:")).toBe(true);
      // 引用カード/関連問題のリンク先は正規 indexable な静的問題ページ /q/* を指す。
      // 旧 `/quiz?id=` は mode 無しで 308 → ホームへリダイレクトされる死リンクだった。
      expect(d.url.startsWith("/q/")).toBe(true);
      expect(d.url.startsWith("/quiz?")).toBe(false);
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.text.length).toBeGreaterThan(0);
    }
  });

  // needsReview の問題は /q ページが notFound()（404）を返すため、コーパスに
  // 乗せると引用/関連問題が死リンクになる。コーパスから除外されることを固定する。
  it("needsReview の問題はコーパスに乗らない（/q が 404 になる死リンクを作らない）", () => {
    const reviewIds = new Set(
      getAllQuestions().filter((q) => q.needsReview).map((q) => `q:${q.id}`),
    );
    expect(reviewIds.size).toBeGreaterThan(0); // データに needsReview が実在することを担保
    const docIds = new Set(getCorpus().map((d) => d.id));
    for (const rid of reviewIds) {
      expect(docIds.has(rid)).toBe(false);
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

  // 引用カードの glossary リンク(citation.url)は app/glossary/page.tsx の
  // 各用語アンカー id={`term-${encodeURIComponent(t.term)}`} へ着地する必要がある。
  // 接頭辞 `term-` が片側だけ変わると死アンカー(ページ先頭へ着地)になるため、
  // 両側のアンカー記法が一致することを機械固定する(崩れたら落ちる)。
  it("glossary doc の url アンカーは /glossary ページの term- アンカーと一致する", () => {
    const pageSource = readFileSync(
      join(process.cwd(), "app/glossary/page.tsx"),
      "utf8",
    );
    expect(pageSource).toContain("id={`term-${encodeURIComponent(t.term)}`}");

    const gDocs = getCorpus().filter((d) => d.kind === "glossary");
    for (const d of gDocs) {
      // url 例: /glossary#term-ACID — 接頭辞 term- が必須。
      expect(d.url.startsWith("/glossary#term-")).toBe(true);
    }
    // サンプル1件で encodeURIComponent 記法の一致を具体的に確認。
    const sample = GLOSSARY[0];
    const expected = `/glossary#term-${encodeURIComponent(sample.term)}`;
    const sampleDoc = gDocs.find((d) => d.id === `g:${sample.term}`);
    expect(sampleDoc?.url).toBe(expected);
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
