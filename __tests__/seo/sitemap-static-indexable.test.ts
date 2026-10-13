/// <reference types="vite/client" />
import { describe, expect, it } from "vitest";
import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { SITE_BASE_URL } from "@/lib/seo/config";
import { getAllEssayQuestions } from "@/lib/essay/load";
import {
  renderBooksSitemapXml,
  renderMainSitemapXml,
} from "@/lib/seo/sitemap-xml";

/**
 * Guards the hand-maintained invariant documented in `lib/seo/sitemap-xml.ts`
 * (STATIC_ROUTES の前後コメント): "noindex ページを sitemap に載せるとクローラ
 * signal が矛盾するため除外する"。`sitemap-resolvability.test.ts` は 404/301/410 を
 * 守るが、static app ルートの indexability は明示的に out-of-scope（手動メンテ）と
 * している。ここを埋める＝sitemap に載る**具象 static ルート**が実際に
 * `robots: { index: false }`（noindex）になっていないことを、各ページの実メタデータ
 * （metadata / generateMetadata）から解決して検証する。
 *
 * これにより、(a) 既存ページを後から noindex 化したのに STATIC_ROUTES から外し忘れる、
 * (b) noindex ページを誤って STATIC_ROUTES に足す、のどちらが起きても CI で落ちる。
 * 現状は矛盾ゼロ（純粋な回帰ガード・本番挙動への影響なし）。
 *
 * 注: slug/exam/id 駆動の動的ルート（/blog/*, /keywords/*, /features/*,
 * /recommended-books/<exam>, /essay/<exam>/<id>, /topics/*）は indexability が
 * 条件付きで、404 は sitemap-resolvability、indexability は各機能テストが守るため
 * ここでは対象外（具象 static ルートのみ監査）。
 */

function locs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE_BASE_URL, ""),
  );
}

// データ駆動（1 slug/exam/id = 1 エントリ）の動的ルート接頭辞。具象 static のみ残す。
const DYNAMIC_PREFIXES: RegExp[] = [
  /^\/e-learning\/exams\/.+/,
  /^\/blog\/.+/,
  /^\/keywords\/.+/,
  /^\/features\/.+/,
  /^\/recommended-books\/.+/,
  /^\/essay\/[a-z]{2}\/.+/,
  /^\/topics\/.+/,
];

function isConcreteStatic(path: string): boolean {
  return !DYNAMIC_PREFIXES.some((re) => re.test(path));
}

// route path -> import.meta.glob key（ルートグループ無し・1:1 マッピング）
function moduleKeyForRoute(path: string): string {
  const sub = path === "/" ? "" : path;
  return `../../app${sub}/page.tsx`;
}

// 全 page.tsx を遅延 loader として取得（呼んだものだけ import される）。
const pageModules = import.meta.glob("../../app/**/page.tsx");

type PageModule = {
  metadata?: Metadata;
  generateMetadata?: (arg: unknown) => Metadata | Promise<Metadata>;
};

async function resolvePageMetadata(
  loader: () => Promise<unknown>,
): Promise<Metadata | undefined> {
  const mod = (await loader()) as PageModule;
  if (mod.metadata) return mod.metadata;
  if (mod.generateMetadata) {
    // 具象 static ページの generateMetadata は引数不要 or {searchParams}/{params} のみ。
    // 余分なキーを渡しても no-arg 関数は無視するので両対応できる。
    return mod.generateMetadata({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
  }
  // メタデータ export 無し = 親 layout 継承。具象 static ルートでは発生しない想定。
  return undefined;
}

function canonicalOf(md: Metadata | undefined): string | undefined {
  const c = md?.alternates?.canonical;
  return typeof c === "string" ? c : undefined;
}

// openGraph.url を相対パスへ正規化（絶対 `${SITE_BASE_URL}/x` も relative "/x" も許容）。
// 未設定（親 metadataBase 継承）は undefined。
function ogUrlOf(md: Metadata | undefined): string | undefined {
  const u = md?.openGraph?.url;
  if (u == null) return undefined;
  return String(u).replace(SITE_BASE_URL, "");
}

function isNoindex(robots: Metadata["robots"]): boolean {
  if (!robots) return false;
  if (typeof robots === "string") return robots.includes("noindex");
  return robots.index === false;
}

describe("sitemap が載せる具象 static ルートは全て indexable（noindex 矛盾なし）", () => {
  const staticLocs = [
    ...locs(renderMainSitemapXml()),
    ...locs(renderBooksSitemapXml()),
  ].filter(isConcreteStatic);

  it("具象 static ルートを十分な件数監査している（空振り防止）", () => {
    // STATIC_ROUTES は ~30 件 + /recommended-books。激減したら抽出ロジックの退行。
    expect(staticLocs.length).toBeGreaterThan(20);
  });

  it("全ての具象 static ルートが import 可能な page モジュールに解決する", () => {
    const missing = staticLocs.filter(
      (p) => !(moduleKeyForRoute(p) in pageModules),
    );
    expect(missing).toEqual([]);
  });

  it("どの具象 static ルートも robots:noindex ではない", async () => {
    const bad: string[] = [];
    for (const p of staticLocs) {
      const loader = pageModules[moduleKeyForRoute(p)];
      if (!loader) continue; // 上の解決テストが拾う
      const md = await resolvePageMetadata(loader);
      if (isNoindex(md?.robots)) bad.push(p);
    }
    expect(bad).toEqual([]);
  }, 30_000); // Cold page imports take about 20s on the Windows development host.

  // canonical が別URLを指すと、そのページは「自分でなく別ページが正規」と宣言し、
  // sitemap に載せていても deindex され crawl 資産が無駄になる（激辛レビュー: /quiz の
  // canonical 自己矛盾が SEO 致命 TOP5 だった）。canonical を**明示している**具象 static
  // ルートは、必ず自URL（home は "/" 正規化）を指していることを固定する。
  it("canonical を持つ具象 static ルートは自URLを正規化先にしている", async () => {
    const bad: string[] = [];
    for (const p of staticLocs) {
      const loader = pageModules[moduleKeyForRoute(p)];
      if (!loader) continue;
      const md = await resolvePageMetadata(loader);
      const canonical = canonicalOf(md);
      if (canonical === undefined) continue; // 明示なし=自己参照フォールバック（許容）
      const selfRoute = p === "" ? "/" : p; // sitemap の home loc は "" だが canonical は "/"
      if (canonical !== selfRoute) bad.push(`${p} -> ${canonical}`);
    }
    expect(bad).toEqual([]);
  });

  // og:url と canonical はどちらもクローラ/SNS への「このページの正規 URL」signal。
  // 両者が食い違うと、共有時の正規化先と検索の正規化先が矛盾し、誤った URL に
  // シグナルが集約されうる（canonical 自己矛盾と同genre の crawl-signal 不整合）。
  // og:url を**明示している**具象 static ルートは、canonical（=自URL）と一致させる。
  // og:url 未設定（親 metadataBase 継承）は許容＝チェック対象外。
  it("og:url を持つ具象 static ルートは canonical と同一 URL を指す", async () => {
    const bad: string[] = [];
    let withOg = 0;
    for (const p of staticLocs) {
      const loader = pageModules[moduleKeyForRoute(p)];
      if (!loader) continue;
      const md = await resolvePageMetadata(loader);
      const og = ogUrlOf(md);
      if (og === undefined) continue; // og:url 未設定=継承（許容）
      withOg += 1;
      // canonical 明示時はそれを正、未明示なら自URL（"/" は home）。
      const expected = canonicalOf(md) ?? (p === "" ? "/" : p);
      if (og !== expected) bad.push(`${p}: og=${og} canonical=${expected}`);
    }
    expect(bad).toEqual([]);
    // 空振り防止: og:url を明示する具象 static ルートが十分数ある（監査が機能している）。
    expect(withOg).toBeGreaterThan(5);
  });
});

/** Original essay deep routes are retired; only the official hub is indexable. */
describe("retired original essay deep routes", () => {
  const essayPageKey = "../../app/essay/[exam]/[questionId]/page.tsx";

  it("retains the raw manuscripts but removes all deep URLs from the sitemap", () => {
    const questions = getAllEssayQuestions();
    expect(questions).toHaveLength(12);
    expect(questions.every((question) => question.license === "original")).toBe(true);
    const paths = locs(renderMainSitemapXml());
    expect(paths).toContain("/essay");
    expect(paths.filter((path) => /^\/essay\/[a-z]{2}\//.test(path))).toEqual([]);
  });

  it("has a route module that redirects deep original URLs to the official hub", () => {
    expect(essayPageKey in pageModules).toBe(true);
    const source = readFileSync(join(process.cwd(), "app/essay/[exam]/[questionId]/page.tsx"), "utf8");
    expect(source).toContain('redirect("/essay")');
    expect(source).not.toContain("generateMetadata");
  });
});
