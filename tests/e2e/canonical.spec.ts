import { test, expect } from "@playwright/test";

// [path, expectedCanonicalPath]
const CANONICAL_PAGES: [string, string][] = [
  // ─── ホーム・共通 ──────────────────────────────────────────────────────────
  ["/", "/"],
  ["/about", "/about"],
  ["/faq", "/faq"],
  ["/terms", "/terms"],
  ["/transparency", "/transparency"],
  ["/referral", "/referral"],
  ["/ranking", "/ranking"],
  ["/blog", "/blog"],
  ["/features", "/features"],
  ["/challenge", "/challenge"],
  ["/essay", "/essay"],
  ["/contact", "/contact"],
  ["/demo/afternoon", "/demo/afternoon"],
  ["/sitemap", "/sitemap"],
  ["/launch", "/launch"],
  ["/student", "/student"],
  // ─── クイズ関連 ────────────────────────────────────────────────────────────
  ["/quiz/review", "/quiz/review"],
  ["/quiz/stream", "/quiz/stream"],
  ["/mock-exam", "/mock-exam"],
  ["/modes/topic", "/modes/topic"],
  // ─── 参考書 ────────────────────────────────────────────────────────────────
  ["/recommended-books", "/recommended-books"],
  ["/recommended-books/ap", "/recommended-books/ap"],
  ["/recommended-books/ip", "/recommended-books/ip"],
  ["/recommended-books/sg", "/recommended-books/sg"],
  ["/recommended-books/fe", "/recommended-books/fe"],
  ["/recommended-books/sc", "/recommended-books/sc"],
  ["/recommended-books/nw", "/recommended-books/nw"],
  ["/recommended-books/db", "/recommended-books/db"],
  ["/recommended-books/es", "/recommended-books/es"],
  ["/recommended-books/st", "/recommended-books/st"],
  ["/recommended-books/sa", "/recommended-books/sa"],
  ["/recommended-books/pm", "/recommended-books/pm"],
  ["/recommended-books/sm", "/recommended-books/sm"],
  ["/recommended-books/au", "/recommended-books/au"],
  // ─── トピック・用語集 ──────────────────────────────────────────────────────
  ["/topics", "/topics"],
  ["/glossary", "/glossary"],
  ["/keywords", "/keywords"],
  // ─── 試験区分 13 ──────────────────────────────────────────────────────────
  ["/ap", "/ap"],
  ["/ip", "/ip"],
  ["/sg", "/sg"],
  ["/fe", "/fe"],
  ["/sc", "/sc"],
  ["/nw", "/nw"],
  ["/db", "/db"],
  ["/es", "/es"],
  ["/st", "/st"],
  ["/sa", "/sa"],
  ["/pm", "/pm"],
  ["/sm", "/sm"],
  ["/au", "/au"],
];

test("主要ページの canonical URL が自ページを指している", async ({ request }) => {
  const failures: string[] = [];

  for (const [path, expectedPath] of CANONICAL_PAGES) {
    const res = await request.get(path);
    if (!res.ok()) {
      failures.push(`${path}: HTTP ${res.status()}`);
      continue;
    }

    const html = await res.text();
    const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);

    if (!match) {
      failures.push(`${path}: canonical タグが見つからない`);
      continue;
    }

    let canonicalPath: string;
    try {
      canonicalPath = new URL(match[1]).pathname;
    } catch {
      // 相対 URL の場合はそのまま使う
      canonicalPath = match[1].split("?")[0].split("#")[0];
    }

    if (canonicalPath !== expectedPath) {
      failures.push(`${path}: canonical="${canonicalPath}" (期待値: "${expectedPath}")`);
    }
  }

  expect(failures, `canonical 不正なページ:\n${failures.join("\n")}`).toHaveLength(0);
});
