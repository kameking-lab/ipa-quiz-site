import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

import { describe, expect, it } from "vitest";

import { getAvailableExams } from "@/lib/seo/exam-meta";

/**
 * グローバルフッタ（app/layout.tsx）とモバイル下部ナビ（MobileBottomNav）の
 * 静的内部リンク切れ回帰ガード。SiteHeader と同じく全 indexable ページに
 * 描画される高トラフィックなナビで、ハードコード href が指すページの削除・改名で
 * サイト全体のフッタ/下部ナビがクリックで 404 になる。
 *
 * フッタは試験ハブ（/ip…/db）へのリンクを含むため、静的ルートに加えて
 * 動的 [exam] ルート（getAvailableExams 由来）も解決先として許容する。
 * MobileBottomNav は config オブジェクト（href: "..."）形式のため、JSX 属性
 * （href="..."）と両形式を抽出する。動的セグメント由来のテンプレート href は対象外。
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
    const urlSegments = segments.filter(
      (s) => !(s.startsWith("(") && s.endsWith(")")) && !s.startsWith("@"),
    );
    if (urlSegments.some((s) => s.includes("[") || s.includes("]"))) continue;
    routes.add("/" + urlSegments.join("/"));
  }
  return routes;
}

/** 純静的 href（href="/..." と href: "/..." の両形式）を抽出。 */
function staticHrefs(relPath: string): string[] {
  const src = readFileSync(join(process.cwd(), relPath), "utf8");
  const hrefs = new Set<string>();
  const re = /href[:=]\s*"(\/[a-z0-9/_-]*)"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    hrefs.add(m[1]);
  }
  return [...hrefs];
}

function deadLinks(relPath: string): string[] {
  const routes = staticRoutePathnames();
  const examRoutes = new Set(getAvailableExams().map((e) => `/${e}`));
  return staticHrefs(relPath).filter((href) => {
    const normalized =
      href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
    return !routes.has(normalized) && !examRoutes.has(normalized);
  });
}

describe("global footer / bottom-nav static internal links resolve", () => {
  it("the layout footer exposes its hardcoded links (sanity)", () => {
    const hrefs = staticHrefs("app/layout.tsx");
    expect(hrefs).toContain("/");
    expect(hrefs.length).toBeGreaterThanOrEqual(10);
  });

  it("every static footer href maps to an existing route (no 404 in global footer)", () => {
    expect(deadLinks("app/layout.tsx")).toEqual([]);
  });

  it("every static MobileBottomNav href maps to an existing route (no 404 in bottom nav)", () => {
    const hrefs = staticHrefs("components/MobileBottomNav.tsx");
    expect(hrefs.length).toBeGreaterThanOrEqual(5);
    expect(deadLinks("components/MobileBottomNav.tsx")).toEqual([]);
  });
});
