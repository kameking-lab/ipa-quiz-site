import { describe, it, expect, vi } from "vitest";

/**
 * lib/search/question-index.ts は /api/search/questions の検索バックエンド。
 * 公開関数 searchQuestions が tokenize / scoreQuestion / makeSnippet /
 * limit・offset クランプ / sort / facet 集計 を一手に担うが、これまで
 * ルートテストも直接テストも無く logic 層は未カバーだった。
 *
 * 同モジュールは先頭で `import "server-only"`（クライアントバンドル混入を
 * 防ぐためのトークン。テスト環境では import 時に throw する）を持つ。これを
 * no-op にモックして実ロジックを動かす（プロジェクト他所の server-only は
 * source-scan で代替しているが、source-scan ではスコアリング/ソート/クランプの
 * 挙動は検証できない）。プロダクションソースは無変更。
 *
 * 問題データは時とともに増減するため、特定の件数や ID に依存せず
 * 「データが変わっても成り立つ不変条件」のみを assert する。
 */
vi.mock("server-only", () => ({}));

import { searchQuestions } from "@/lib/search/question-index";

describe("searchQuestions — limit / offset クランプ", () => {
  it("limit 未指定は DEFAULT_LIMIT=30・offset 未指定は 0", async () => {
    const res = await searchQuestions({ exam: "ap" });
    expect(res.limit).toBe(30);
    expect(res.offset).toBe(0);
    expect(res.hits.length).toBeLessThanOrEqual(30);
    expect(res.hits.length).toBeLessThanOrEqual(res.total);
  });

  it("limit は MAX_LIMIT=60 で上限クランプされる", async () => {
    const res = await searchQuestions({ exam: "ap", limit: 1000 });
    expect(res.limit).toBe(60);
    expect(res.hits.length).toBeLessThanOrEqual(60);
  });

  it("limit 0 / 負数は下限 1 にクランプされる", async () => {
    expect((await searchQuestions({ exam: "ap", limit: 0 })).limit).toBe(1);
    expect((await searchQuestions({ exam: "ap", limit: -5 })).limit).toBe(1);
  });

  it("負の offset は 0 にクランプされる", async () => {
    const res = await searchQuestions({ exam: "ap", offset: -10 });
    expect(res.offset).toBe(0);
  });

  it("total を超える offset では hits は空・total は全件数のまま", async () => {
    const res = await searchQuestions({ exam: "ap", offset: 100_000, limit: 60 });
    expect(res.hits).toEqual([]);
    expect(res.total).toBeGreaterThan(0);
  });
});

describe("searchQuestions — トークンマッチング", () => {
  it("q 未指定（空トークン）は base/facet を通る全問が score=1 でヒットする", async () => {
    const res = await searchQuestions({ exam: "ap", limit: 60 });
    expect(res.total).toBeGreaterThan(0);
    expect(res.hits.every((h) => h.score === 1)).toBe(true);
  });

  it("どの問題にも含まれないトークンは total 0・hits 空", async () => {
    const res = await searchQuestions({
      exam: "ap",
      q: "zzqqxxnotarealtoken1234567890",
    });
    expect(res.total).toBe(0);
    expect(res.hits).toEqual([]);
  });
});

describe("searchQuestions — facet フィルタ", () => {
  it("exam facet で絞ると全ヒットがその exam になる", async () => {
    const res = await searchQuestions({ exam: "ap", limit: 60 });
    expect(res.hits.length).toBeGreaterThan(0);
    expect(res.hits.every((h) => h.exam === "ap")).toBe(true);
  });

  it("category facet で絞ると全ヒットがその category になる", async () => {
    const all = await searchQuestions({ exam: "ap", limit: 60 });
    const cat = all.hits[0]?.category;
    expect(cat).toBeTruthy();
    const filtered = await searchQuestions({
      exam: "ap",
      category: cat,
      limit: 60,
    });
    expect(filtered.hits.length).toBeGreaterThan(0);
    expect(filtered.hits.every((h) => h.category === cat)).toBe(true);
  });

  it("各 facet グループの合計はマッチ総数（total）と一致する", async () => {
    const res = await searchQuestions({ exam: "ap", limit: 60 });
    const sum = (rec: Record<string, number>) =>
      Object.values(rec).reduce((a, b) => a + b, 0);
    expect(sum(res.facets.exam)).toBe(res.total);
    expect(sum(res.facets.year)).toBe(res.total);
    expect(sum(res.facets.season)).toBe(res.total);
    expect(sum(res.facets.category)).toBe(res.total);
    expect(sum(res.facets.difficulty)).toBe(res.total);
  });
});

describe("searchQuestions — ソート不変条件", () => {
  it("relevance（既定）は score 降順・同点は year 降順タイブレーク", async () => {
    // 空クエリでは全 score=1 のためタイブレーク（year 降順）が支配的になる。
    // facets.year は全マッチ年を含むので最新年を先頭不変条件で検証できる。
    const res = await searchQuestions({ exam: "ap", limit: 60 });
    for (let i = 1; i < res.hits.length; i++) {
      expect(res.hits[i - 1].score).toBeGreaterThanOrEqual(res.hits[i].score);
    }
    const maxYear = Math.max(...Object.keys(res.facets.year).map(Number));
    expect(res.hits[0].year).toBe(maxYear);
  });

  it("year_desc は year 降順（最新年が先頭）", async () => {
    const res = await searchQuestions({
      exam: "ap",
      sort: "year_desc",
      limit: 60,
    });
    expect(res.hits.length).toBeGreaterThan(0);
    const maxYear = Math.max(...Object.keys(res.facets.year).map(Number));
    expect(res.hits[0].year).toBe(maxYear);
    for (let i = 1; i < res.hits.length; i++) {
      expect(res.hits[i - 1].year).toBeGreaterThanOrEqual(res.hits[i].year);
    }
  });

  it("random はマッチ総数とページ件数を変えない（並びのみ撹拌）", async () => {
    const rel = await searchQuestions({ exam: "ap", limit: 60 });
    const rnd = await searchQuestions({
      exam: "ap",
      sort: "random",
      limit: 60,
    });
    expect(rnd.total).toBe(rel.total);
    expect(rnd.hits.length).toBe(rel.hits.length);
  });
});

describe("searchQuestions — snippet", () => {
  it("snippet 長は SNIPPET_LEN=160（+省略記号2字）以内", async () => {
    const res = await searchQuestions({ exam: "ap", limit: 60 });
    expect(res.hits.length).toBeGreaterThan(0);
    expect(res.hits.every((h) => h.snippet.length <= 162)).toBe(true);
  });
});

describe("searchQuestions — 全試験横断（exam 未指定）", () => {
  it("exam 未指定は全チャンクを母集団に取り、非空で返す", async () => {
    const res = await searchQuestions({ limit: 60 });
    expect(res.total).toBeGreaterThan(0);
    const sumExam = Object.values(res.facets.exam).reduce((a, b) => a + b, 0);
    expect(sumExam).toBe(res.total);
  });
});
