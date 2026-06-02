import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { getAllBlogPosts } from "@/data/blog";

/**
 * no-404 (非blog面の outbound 死リンク防止):
 *
 * blog 本文どうしの内部リンクは scripts/audit-internal-links.ts が走査するが、
 * **非blogのクロール面**（旗艦ハブ /essay・試験ハブ /[exam]・recommended-books・
 * 各 React コンポーネント・data/features.ts の relatedLinks など）が
 * ハードコードする `/blog/<slug>` リンクは、その監査の対象外で**どのテストにも
 * 守られていなかった**。個別 funnel テスト（fe-hub-kamoku-b-cta 等）は 1 slug ずつ
 * しか pin していないため、新規にリンクを足したり blog slug を改名/削除すると、
 * 旗艦・土台の高価値 funnel リンクが無言で 404 になりうる。
 *
 * ここで app/ ・ components/ ・ data/features.ts に現れる **静的** な
 * `/blog/<slug>` リンクを全件抽出し、実在する blog slug に解決することを
 * 「崩れたら落ちる」形で一括 pin する。テンプレートリテラル（`/blog/${...}`）は
 * 動的なので対象外。data/blog/**（blog 本文＝script 監査の担当）と
 * lib/admin（noindex のダッシュボード・mock データに意図的な架空 slug あり）は
 * 走査対象から除外する。
 */

// `/blog/` の直前が英字でないもののみ拾う（= クォート/括弧/空白/行頭が直前）。
// これにより import パス `@/lib/blog/related-content`・`@/data/blog/types` や
// コメント内 `topics/blog/books` のような非リンク文字列を確実に除外できる。
const BLOG_LINK_RE = /(?<![A-Za-z])\/blog\/([a-z0-9-]+)/g;

const SCAN_DIRS = ["app", "components"];
const SCAN_FILES = ["data/features.ts"];

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
    BLOG_LINK_RE.lastIndex = 0;
    while ((m = BLOG_LINK_RE.exec(src)) !== null) {
      refs.push({ slug: m[1], file: file.replace(process.cwd(), "").replace(/\\/g, "/") });
    }
  }
  return refs;
}

describe("非blogクロール面の /blog/<slug> ハードリンクは全て実在する", () => {
  const validSlugs = new Set(getAllBlogPosts().map((p) => p.slug));
  const refs = collectRefs();

  it("走査が機能している（既知の funnel リンクを検出できる）", () => {
    // スキャナが無言で 0 件マッチして「全部 OK」に見えるのを防ぐ。
    // 旗艦（論述）と土台（科目B）の代表 funnel slug が拾えていること。
    const slugs = new Set(refs.map((r) => r.slug));
    expect(slugs.has("koudo-ronjutsu-kakikata-kotsu")).toBe(true);
    expect(slugs.has("fe-kamoku-b-taisaku")).toBe(true);
    expect(refs.length).toBeGreaterThan(5);
  });

  it("抽出した全リンクが実在する blog slug に解決する（死リンクゼロ）", () => {
    const dead = refs.filter((r) => !validSlugs.has(r.slug));
    expect(dead.map((r) => `${r.file} -> /blog/${r.slug}`)).toEqual([]);
  });
});
