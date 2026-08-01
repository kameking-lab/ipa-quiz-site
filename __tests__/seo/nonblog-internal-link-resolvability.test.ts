import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { getAllBlogPosts } from "@/data/blog";
import { FEATURE_LANDING_PAGES } from "@/data/features";
import { KEYWORD_PAGES } from "@/data/keywords";

/**
 * no-404 (非blog面の outbound 死リンク防止):
 *
 * blog 本文どうしの内部リンクは scripts/audit-internal-links.ts が走査するが、
 * **非blogのクロール面**（旗艦ハブ /essay・試験ハブ /[exam]・recommended-books・
 * /why-kakomon-ai・各 React コンポーネント・data/features.ts の relatedLinks など）が
 * ハードコードする内部レジストリへのリンク（`/blog/<slug>`・`/features/<slug>`・
 * `/keywords/<slug>`）は、その監査の対象外で**どのテストにも守られていなかった**。
 * 個別 funnel テスト（fe-hub-kamoku-b-cta 等）や keywords.test.ts の relatedBlogSlug
 * チェックは一部 slug しか pin しておらず、対象 slug を改名/削除したり新規リンクを
 * 足したりすると、旗艦・土台・機能間の高価値 funnel リンクが無言で 404 になりうる。
 *
 * ここで app/ ・ components/ ・ data/features.ts ・ data/keywords.ts に現れる
 * **静的** な `/blog|features|keywords/<slug>` リンクを全件抽出し、対応する
 * レジストリ（blog 記事 / FEATURE_LANDING_PAGES / KEYWORD_PAGES）に解決することを
 * 「崩れたら落ちる」形で一括 pin する。テンプレートリテラル（`/blog/${...}`）は
 * 動的なので対象外。data/blog/**（blog 本文＝script 監査の担当）と
 * lib/admin（noindex のダッシュボード・mock データに意図的な架空 slug あり）は
 * 走査対象から除外する。
 */

// `/blog|features|keywords/<slug>` を、直前が英字でないときだけ拾う（= クォート/
// 括弧/空白/行頭が直前）。これにより import パス `@/lib/blog/related-content`・
// `@/data/blog/types` や、ディレクトリ名の一部（例 `app/features/...`）のような
// 非リンク文字列を確実に除外できる。動的セグメント `[slug]` は文字クラス外なので
// 自然に非マッチ。
const LINK_RE = /(?<![A-Za-z])\/(blog|features|keywords)\/([a-z0-9-]+)/g;

const SCAN_DIRS = ["app", "components"];
const SCAN_FILES = ["data/features.ts", "data/keywords.ts"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

interface Ref {
  kind: "blog" | "features" | "keywords";
  slug: string;
  file: string;
}

function collectRefs(): Ref[] {
  const refs: Ref[] = [];
  const files = [
    ...SCAN_DIRS.flatMap((d) => walk(join(process.cwd(), d))),
    ...SCAN_FILES.map((f) => join(process.cwd(), f)),
  ];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    let m: RegExpExecArray | null;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(src)) !== null) {
      refs.push({
        kind: m[1] as Ref["kind"],
        slug: m[2],
        file: file.replace(process.cwd(), "").replace(/\\/g, "/"),
      });
    }
  }
  return refs;
}

describe("非blogクロール面の内部レジストリ ハードリンクは全て実在する", () => {
  const validBlog = new Set(getAllBlogPosts().map((p) => p.slug));
  const validFeatures = new Set(FEATURE_LANDING_PAGES.map((f) => f.slug));
  const validKeywords = new Set(KEYWORD_PAGES.map((k) => k.slug));
  const registry = {
    blog: validBlog,
    features: validFeatures,
    keywords: validKeywords,
  } as const;

  const refs = collectRefs();

  it("走査が機能している（既知の funnel リンクを検出できる）", () => {
    // スキャナが無言で 0 件マッチして「全部 OK」に見えるのを防ぐ。
    // 旗艦（論述）・土台（科目B）・機能/特集ページの代表リンクが拾えていること。
    const has = (kind: Ref["kind"], slug: string) =>
      refs.some((r) => r.kind === kind && r.slug === slug);
    expect(has("blog", "koudo-ronjutsu-kakikata-kotsu")).toBe(true);
    expect(has("blog", "fe-kamoku-b-taisaku")).toBe(true);
    expect(has("features", "essay-grading")).toBe(true);
    expect(has("keywords", "sc-incident-response")).toBe(true);
    expect(refs.length).toBeGreaterThan(10);
  });

  it("抽出した全リンクが実在するレジストリ slug に解決する（死リンクゼロ）", () => {
    const dead = refs.filter((r) => !registry[r.kind].has(r.slug));
    expect(dead.map((r) => `${r.file} -> /${r.kind}/${r.slug}`)).toEqual([]);
  });
});
