import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * グローバルヘッダ（SiteHeader）の静的内部リンク切れ回帰ガード。
 *
 * SiteHeader は全 indexable ページの最上部に描画される最高トラフィックの
 * ナビゲーション。ハードコードされた静的 href（/mock-exam, /why-kakomon-ai,
 * /recommended-books, ...）が指すページが削除・改名されると、サイト全体の
 * ヘッダがクリックで 404 になる。app/ の実ルートツリー（route group 透過）を
 * 走査して、SiteHeader の全静的 href が実在ルートに解決することを保証する。
 *
 * 動的セグメント由来の href（href={`/${exam}`} 等のテンプレートリテラル）は
 * 本テスト対象外（純静的 href="/..." のみ照合）。クエリ/アンカー付きも除外。
 */
const APP_DIR = join(process.cwd(), "app");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

/** app/ を走査し、静的（動的セグメントを含まない）ルートの pathname 集合を作る。 */
function staticRoutePathnames(): Set<string> {
  const routes = new Set<string>();
  for (const file of walk(APP_DIR)) {
    if (!/[/\\]page\.tsx$/.test(file)) continue;
    const relDir = relative(APP_DIR, dirname(file));
    const segments = relDir === "" ? [] : relDir.split(sep);
    // route group ( (marketing) ) と並列ルート ( @slot ) は URL に現れない。
    const urlSegments = segments.filter(
      (s) => !(s.startsWith("(") && s.endsWith(")")) && !s.startsWith("@"),
    );
    // 動的セグメント([slug] / [...slug])を含むルートは静的照合の対象外。
    if (urlSegments.some((s) => s.includes("[") || s.includes("]"))) continue;
    routes.add("/" + urlSegments.join("/"));
  }
  return routes;
}

/** SiteHeader.tsx の純静的 href="/..." を抽出（テンプレート/クエリ/アンカー除外）。 */
function staticHeaderHrefs(): string[] {
  const src = readFileSync(join(process.cwd(), "components/SiteHeader.tsx"), "utf8");
  const hrefs = new Set<string>();
  const re = /href="(\/[a-z0-9/_-]*)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    hrefs.add(m[1]);
  }
  return [...hrefs];
}

describe("SiteHeader static internal links resolve to real routes", () => {
  it("extracts the header's hardcoded internal links (sanity)", () => {
    const hrefs = staticHeaderHrefs();
    // 最低でもルート + 主要ハブが含まれているはず（抽出ロジックの自己点検）。
    expect(hrefs).toContain("/");
    expect(hrefs.length).toBeGreaterThanOrEqual(8);
  });

  it("every static header href maps to an existing app route (no 404 in global nav)", () => {
    const routes = staticRoutePathnames();
    const dead = staticHeaderHrefs().filter((href) => {
      const normalized = href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
      return !routes.has(normalized);
    });
    expect(dead).toEqual([]);
  });
});
