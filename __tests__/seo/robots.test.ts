import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import { SITE_BASE_URL } from "@/lib/seo/config";
import {
  renderBlogSitemapXml,
  renderBooksSitemapXml,
  renderExamsSitemapXml,
  renderMainSitemapXml,
  renderQuestionsSitemapChunkXml,
  renderTopicsSitemapXml,
} from "@/lib/seo/sitemap-xml";

describe("robots()", () => {
  const rules = robots().rules;
  const rule = Array.isArray(rules) ? rules[0] : rules;
  const disallow = Array.isArray(rule.disallow)
    ? rule.disallow
    : rule.disallow
      ? [rule.disallow]
      : [];
  const allow = Array.isArray(rule.allow)
    ? rule.allow
    : rule.allow
      ? [rule.allow]
      : [];

  it("no longer disallows /account/ (consistent with the header link)", () => {
    expect(disallow).not.toContain("/account/");
  });

  it("still disallows sensitive sections", () => {
    expect(disallow).toContain("/api/");
    expect(disallow).toContain("/admin/");
    expect(disallow).toContain("/auth/");
  });

  it("allows /api/og despite disallowing /api/ (SNS og:image scrapers)", () => {
    // og:image はサイト全ページで /api/og(/result) を指す。Disallow: /api/ の
    // 配下にあるため、SNS スクレイパがカード画像を取得できるよう longest-match
    // で勝つ Allow を必ず併記する。これが外れると SNS シェア画像が全滅する。
    expect(disallow).toContain("/api/");
    expect(allow).toContain("/api/og");
    // Allow の経路長 > 一致する Disallow の経路長（longest-match で Allow 勝ち）
    const matchedDisallow = disallow
      .filter((d) => "/api/og".startsWith(d))
      .sort((a, b) => b.length - a.length)[0];
    expect("/api/og".length).toBeGreaterThan((matchedDisallow ?? "").length);
  });

  it("advertises the sitemap index", () => {
    expect(robots().sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("emits no non-standard Host directive (deprecated 2018)", () => {
    expect(robots().host).toBeUndefined();
  });
});

/**
 * robots の Disallow と sitemap は矛盾してはならない: sitemap が「クロールせよ」と
 * 載せている URL を robots が Disallow で塞ぐと、クローラへ正反対の指示を出す
 * （典型的な高インパクト SEO バグ＝クロール資産の浪費）。robots.test は sitemap
 * directive の有無、sitemap 系 test は loc の解決可否を守るが、「Disallow × sitemap
 * loc の矛盾」自体はどのテストも守っていなかった。後から Disallow を足したり
 * sitemap に新ルートを載せた際に、両者が衝突したら CI で落とす。
 * 現状は衝突ゼロ（純粋な回帰ガード・本番挙動への影響なし）。
 */
describe("robots Disallow は sitemap 掲載 URL と矛盾しない", () => {
  const r = robots().rules;
  const rule = Array.isArray(r) ? r[0] : r;
  const disallow = Array.isArray(rule.disallow)
    ? rule.disallow
    : rule.disallow
      ? [rule.disallow]
      : [];
  const allow = Array.isArray(rule.allow)
    ? rule.allow
    : rule.allow
      ? [rule.allow]
      : [];

  function locs(xml: string): string[] {
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1].replace(SITE_BASE_URL, "") || "/",
    );
  }
  // 代表的な sitemap loc（Disallow は path 接頭辞マッチなので全列挙不要だが、
  // 主要カテゴリ＋question チャンク0 で全 path 接頭辞を網羅する）。
  const sampleLocs = [
    ...locs(renderMainSitemapXml()),
    ...locs(renderExamsSitemapXml()),
    ...locs(renderTopicsSitemapXml()),
    ...locs(renderBlogSitemapXml()),
    ...locs(renderBooksSitemapXml()),
    ...locs(renderQuestionsSitemapChunkXml(0)),
  ];

  // robots の longest-match 評価: path に前方一致する最長 Disallow 長 > 最長 Allow 長
  // なら blocked（同長・Allow 長い場合は Allow 勝ち＝/api/og precedent）。
  function longestPrefixLen(prefixes: string[], path: string): number {
    return prefixes
      .filter((p) => p && path.startsWith(p))
      .reduce((max, p) => Math.max(max, p.length), 0);
  }

  it("どの sitemap 掲載 URL も Disallow でブロックされない", () => {
    const blocked = [...new Set(sampleLocs)].filter(
      (p) =>
        longestPrefixLen(disallow, p) > longestPrefixLen(allow, p) &&
        longestPrefixLen(disallow, p) > 0,
    );
    expect(blocked).toEqual([]);
  });

  it("十分な件数の sitemap loc を検査している（空振り防止）", () => {
    expect(sampleLocs.length).toBeGreaterThan(50);
  });
});
