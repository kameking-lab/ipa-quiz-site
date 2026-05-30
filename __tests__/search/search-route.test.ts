import { describe, it, expect, vi } from "vitest";

/**
 * GET /api/search/questions の HTTP 契約。検索フォーム/フィルタの唯一の
 * バックエンド ingress だが、これまでルートテストが無く zod バリデーション
 * (400) と Cache-Control ポリシーが未カバーだった。route は server-only な
 * question-index を import するため、vitest alias 解禁で初めて実行可能になった。
 *
 * Cache-Control: random ソートは並びが毎回変わるため no-store、それ以外は
 * public,max-age=60,s-maxage=300 でエッジキャッシュ可——崩れると検索が
 * 古い/壊れたページに固定 or 無駄に毎回再計算される。
 */
vi.mock("server-only", () => ({}));

import { GET } from "@/app/api/search/questions/route";

function get(qs: string): Request {
  return new Request(`http://test/api/search/questions${qs}`);
}

describe("GET /api/search/questions — バリデーション (400)", () => {
  it("不正な sort 値は 400", async () => {
    const res = await GET(get("?sort=bogus"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("invalid query");
  });

  it("limit が上限 60 超は 400", async () => {
    expect((await GET(get("?limit=999"))).status).toBe(400);
  });

  it("未知の exam コードは 400", async () => {
    expect((await GET(get("?exam=zz"))).status).toBe(400);
  });

  it("数値化できない year は 400", async () => {
    expect((await GET(get("?year=abc"))).status).toBe(400);
  });
});

describe("GET /api/search/questions — 正常系 (200) とレスポンス形状", () => {
  it("有効なクエリは 200 で SearchResponse 形状を返す", async () => {
    const res = await GET(get("?exam=ap"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(typeof body.total).toBe("number");
    expect(Array.isArray(body.hits)).toBe(true);
    expect(body.facets).toBeTruthy();
    expect(body.limit).toBeGreaterThan(0);
    expect(body.offset).toBe(0);
  });

  it("パラメータ無しでも 200（全項目 optional）", async () => {
    const res = await GET(get(""));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBeGreaterThan(0);
  });

  it("calculationOnly=true は文字列強制で受理され 200", async () => {
    const res = await GET(get("?exam=ap&calculationOnly=true"));
    expect(res.status).toBe(200);
  });
});

describe("GET /api/search/questions — Cache-Control ポリシー", () => {
  it("非 random ソートはエッジキャッシュ可ヘッダ", async () => {
    const res = await GET(get("?exam=ap&sort=relevance"));
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=60, s-maxage=300",
    );
  });

  it("既定（ソート未指定）もエッジキャッシュ可", async () => {
    const res = await GET(get("?exam=ap"));
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=60, s-maxage=300",
    );
  });

  it("random ソートは no-store（毎回並びが変わるため）", async () => {
    const res = await GET(get("?exam=ap&sort=random"));
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });
});
