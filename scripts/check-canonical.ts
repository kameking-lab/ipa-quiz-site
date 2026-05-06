/**
 * Canonical URL checker — scripts/check-canonical.ts
 *
 * 主要ページの <link rel="canonical"> を検証します。
 *
 * 使い方:
 *   tsx scripts/check-canonical.ts                    # localhost:3000
 *   tsx scripts/check-canonical.ts http://localhost:3000
 *   tsx scripts/check-canonical.ts https://ipa-quiz-site.vercel.app
 *
 * 事前に `pnpm dev` または `pnpm start` でサーバーを起動してください。
 */

import { ALL_QUESTIONS } from "@/data/questions";
import {
  getAvailableExams,
  groupByYearSeason,
  groupByCategory,
} from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";

const BASE_URL = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

// ─── 固定ページ ───────────────────────────────────────────────────────────────

const STATIC_PAGES: string[] = [
  "/",
  "/faq",
  "/pricing",
  "/about",
  "/privacy",
  "/terms",
  "/operator",
  "/mock-exam",
  "/topics",
  "/modes/year",
  "/modes/topic",
];

// ─── 動的ページ（データから生成）─────────────────────────────────────────────

function buildDynamicPages(): string[] {
  const pages: string[] = [];

  for (const exam of getAvailableExams()) {
    // 試験区分ハブ
    pages.push(`/${exam}`);

    const questions = ALL_QUESTIONS.filter((q) => q.exam === exam);

    // 年度別一覧（試験ごと最大 3 件）
    for (const g of groupByYearSeason(questions).slice(0, 3)) {
      pages.push(`/${exam}/${g.year}-${g.season}`);
    }

    // 分野別ページ（試験ごと最大 3 件）
    for (const c of groupByCategory(questions).slice(0, 3)) {
      pages.push(`/${exam}/topic/${encodeURIComponent(c.category)}`);
    }
  }

  // 問題ページ（AP 午前 5 問）
  const sample = ALL_QUESTIONS.filter(
    (q) => q.exam === "ap" && q.session === "am",
  ).slice(0, 5);
  for (const q of sample) {
    pages.push(questionPagePath(q));
  }

  return pages;
}

// ─── canonical 抽出 ───────────────────────────────────────────────────────────

function extractCanonical(html: string): string | null {
  const m =
    html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["']/i) ??
    html.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["']/i);
  return m ? m[1] : null;
}

function toPathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url.startsWith("/") ? url.split("?")[0] : `/${url.split("?")[0]}`;
  }
}

// ─── チェック実行 ─────────────────────────────────────────────────────────────

interface Result {
  path: string;
  ok: boolean;
  actual: string | null;
  status?: number;
  error?: string;
}

async function checkPage(path: string): Promise<Result> {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "text/html" },
      redirect: "follow",
    });
    if (!res.ok) {
      return { path, ok: false, actual: null, status: res.status, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    const canonical = extractCanonical(html);
    if (!canonical) {
      return { path, ok: false, actual: null, status: res.status, error: "canonical タグなし" };
    }
    const canonicalPath = toPathname(canonical);
    return { path, ok: canonicalPath === path, actual: canonicalPath, status: res.status };
  } catch (err) {
    return { path, ok: false, actual: null, error: String(err) };
  }
}

// ─── メイン ───────────────────────────────────────────────────────────────────

async function main() {
  const all = [...STATIC_PAGES, ...buildDynamicPages()];
  const pages = [...new Set(all)].slice(0, 60); // 上限 60

  console.log(`対象 ${pages.length} ページ — ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;
  const failures: Result[] = [];

  // 5 件ずつ並列フェッチ
  for (let i = 0; i < pages.length; i += 5) {
    const batch = pages.slice(i, i + 5);
    const results = await Promise.all(batch.map(checkPage));
    for (const r of results) {
      if (r.ok) {
        passed++;
        console.log(`  ✓  ${r.path}`);
      } else {
        failed++;
        failures.push(r);
        console.log(`  ✗  ${r.path}`);
        if (r.error) {
          console.log(`     → ${r.error}`);
        } else {
          console.log(`     → canonical: ${r.actual}  (期待値: ${r.path})`);
        }
      }
    }
  }

  console.log(`\n${"─".repeat(50)}`);
  console.log(`✓ ${passed} 件  ✗ ${failed} 件  合計 ${pages.length} 件`);

  if (failed > 0) {
    console.log("\n失敗ページ一覧:");
    for (const f of failures) {
      console.log(`  ${f.path}  →  ${f.error ?? f.actual}`);
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
