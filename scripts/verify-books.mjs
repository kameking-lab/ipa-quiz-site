/**
 * Playwright verification script for /recommended-books pages.
 * Targets the main-branch implementation (data/recommended-books.ts).
 * Usage: node scripts/verify-books.mjs [base-url]
 */
import { chromium, devices } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:3031";
const AMAZON_TAG = "safeaisite22-22";
const RAKUTEN_HOST = "hb.afl.rakuten.co.jp";
const RAKUTEN_ID = "5291f19d";

const EXAMS = ["ip", "sg", "fe", "ap", "sc", "nw", "db", "es", "st", "sa", "pm", "sm", "au"];

const MOBILE_VIEWPORTS = [
  { name: "iPhone 13", ...devices["iPhone 13"] },
  { name: "Pixel 5", ...devices["Pixel 5"] },
];

const results = { pages: [], failures: [], warnings: [] };

function pass(msg) { process.stdout.write(`  ✓ ${msg}\n`); }
function warn(msg) { process.stdout.write(`  ⚠ ${msg}\n`); results.warnings.push(msg); }
function fail(msg) { process.stdout.write(`  ✗ ${msg}\n`); results.failures.push(msg); }
function section(msg) { process.stdout.write(`\n── ${msg}\n`); }

async function verifyExamPage(page, exam) {
  const url = `${BASE_URL}/recommended-books/${exam}`;
  const res = await page.goto(url, { waitUntil: "domcontentloaded" });
  const row = {
    exam, url,
    bookCount: 0, amazonLinks: 0, amazonTagOk: 0,
    rakutenLinks: 0, rakutenIdOk: 0,
    jsonLd: false, title: false, metaDesc: false, canonical: false,
    placeholderAsins: 0,
  };

  if (!res || res.status() !== 200) {
    fail(`HTTP ${res?.status() ?? "???"}:  ${url}`);
    results.pages.push(row);
    return;
  }

  // Amazon links (affiliate anchors only, not JSON-LD)
  const amazonAnchors = await page.locator('a[href*="amazon.co.jp"]').all();
  row.amazonLinks = amazonAnchors.length;
  row.bookCount = amazonAnchors.length; // 1 Amazon link per book

  if (row.bookCount === 0) {
    fail(`書籍リンクなし: ${exam}`);
  } else {
    pass(`書籍カード ${row.bookCount}件`);
  }

  // Validate each Amazon link
  let amazonTagOk = 0;
  for (const a of amazonAnchors) {
    const href = await a.getAttribute("href");
    const target = await a.getAttribute("target");
    const rel = await a.getAttribute("rel") ?? "";

    if (href?.includes("ASIN_TO_BE_FILLED")) {
      warn(`Amazon ASIN未入力: ${exam} — ${href}`);
      row.placeholderAsins++;
    }
    if (href?.includes(`tag=${AMAZON_TAG}`)) amazonTagOk++;
    if (target !== "_blank") fail(`Amazon target!=_blank: ${href}`);
    if (!rel.includes("noopener") || !rel.includes("noreferrer") || !rel.includes("sponsored"))
      fail(`Amazon rel 不正: ${href} → "${rel}"`);
  }
  row.amazonTagOk = amazonTagOk;
  if (row.amazonLinks > 0) {
    if (amazonTagOk === row.amazonLinks) pass(`Amazon tag 含有 ${amazonTagOk}/${row.amazonLinks}`);
    else fail(`Amazon tag 不足 ${amazonTagOk}/${row.amazonLinks}: ${exam}`);
  }

  // Rakuten links
  const rakutenAnchors = await page.locator(`a[href*="${RAKUTEN_HOST}"]`).all();
  row.rakutenLinks = rakutenAnchors.length;
  let rakutenIdOk = 0;
  for (const a of rakutenAnchors) {
    const href = await a.getAttribute("href");
    const target = await a.getAttribute("target");
    const rel = await a.getAttribute("rel") ?? "";

    if (href?.includes("RAKUTEN_ID_TO_BE_FILLED")) {
      warn(`楽天ID未入力: ${exam} — ${href}`);
    }
    if (href?.includes(RAKUTEN_ID)) rakutenIdOk++;
    if (target !== "_blank") fail(`楽天 target!=_blank: ${href}`);
    if (!rel.includes("noopener") || !rel.includes("noreferrer") || !rel.includes("sponsored"))
      fail(`楽天 rel 不正: ${href} → "${rel}"`);
  }
  row.rakutenIdOk = rakutenIdOk;
  if (row.rakutenLinks > 0) {
    if (rakutenIdOk === row.rakutenLinks) pass(`楽天アフィリID 含有 ${rakutenIdOk}/${row.rakutenLinks}`);
    else fail(`楽天アフィリID 不足 ${rakutenIdOk}/${row.rakutenLinks}: ${exam}`);
  }

  // JSON-LD: handle both flat {"@type":"ItemList"} and {"@graph":[...]} wrapper
  const ldJsonContent = await page.locator('script[type="application/ld+json"]').first().textContent().catch(() => null);
  if (ldJsonContent) {
    try {
      const data = JSON.parse(ldJsonContent);
      const hasItemList =
        data["@type"] === "ItemList" ||
        (Array.isArray(data["@graph"]) && data["@graph"].some((n) => n["@type"] === "ItemList"));
      row.jsonLd = hasItemList;
      if (hasItemList) pass("JSON-LD ItemList 存在");
      else fail(`JSON-LD に ItemList なし (found: ${data["@type"] ?? "@graph"}): ${exam}`);
    } catch {
      fail(`JSON-LD parse error: ${exam}`);
    }
  } else {
    fail(`JSON-LD script タグなし: ${exam}`);
  }

  // SEO: title
  const title = await page.title();
  row.title = title.length > 5;
  if (row.title) pass(`title: "${title}"`);
  else fail(`title 空: "${title}"`);

  // SEO: meta description
  const desc = await page.locator('meta[name="description"]').getAttribute("content").catch(() => null);
  row.metaDesc = !!desc && desc.length > 20;
  if (row.metaDesc) pass(`meta description OK (${desc?.length}文字)`);
  else fail(`meta description なし/短い: ${exam} → "${desc}"`);

  // SEO: canonical
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href").catch(() => null);
  row.canonical = !!canonical && canonical.includes(`recommended-books/${exam}`);
  if (row.canonical) pass(`canonical: ${canonical}`);
  else fail(`canonical 不正: ${exam} → ${canonical}`);

  // タイトルに試験名含有
  const examName = { ip: "ITパスポート", sg: "セキュリティ", fe: "基本情報", ap: "応用情報",
    sc: "安全確保", nw: "ネットワーク", db: "データベース", es: "エンベデッド",
    st: "ストラテジスト", sa: "アーキテクト", pm: "マネージャ", sm: "サービスマネージャ", au: "システム監査" }[exam] ?? exam;
  if (!title.includes(examName) && !title.toLowerCase().includes(exam)) {
    warn(`title に試験名が不明確: "${title}" (期待: "${examName}")`);
  }

  results.pages.push(row);
}

async function verifyMobile(browser, exam) {
  for (const vp of MOBILE_VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.viewport.width, height: vp.viewport.height },
      userAgent: vp.userAgent,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}/recommended-books/${exam}`, { waitUntil: "domcontentloaded" });

    const amazonBtns = await page.locator('a[href*="amazon.co.jp"]').all();
    if (amazonBtns.length > 0) {
      const box = await amazonBtns[0].boundingBox();
      if (box && box.height >= 44 && box.width >= 44)
        pass(`${vp.name} Amazonボタン ${Math.round(box.width)}×${Math.round(box.height)}px (44px以上)`);
      else if (box)
        fail(`${vp.name} Amazonボタンが小さい: ${Math.round(box.width)}×${Math.round(box.height)}px < 44px`);
    }

    // Verify first book card is visible
    const cards = await page.locator('a[href*="amazon.co.jp"]').first().isVisible().catch(() => false);
    if (cards) pass(`${vp.name} 書籍リンク表示 OK`);
    else fail(`${vp.name} 書籍リンク非表示: ${exam}`);

    await ctx.close();
  }
}

(async () => {
  const browser = await chromium.launch();

  // ── Overview page ─────────────────────────────────────────────
  section(`Overview: ${BASE_URL}/recommended-books`);
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const res = await page.goto(`${BASE_URL}/recommended-books`, { waitUntil: "domcontentloaded" });
    if (!res || res.status() !== 200) fail(`HTTP ${res?.status()} on overview`);

    const links = await page.locator('a[href^="/recommended-books/"]').count();
    if (links >= 13) pass(`13区分リンク ${links}件`);
    else fail(`区分リンク不足 (${links}/13)`);

    const ldJsonContent = await page.locator('script[type="application/ld+json"]').first().textContent().catch(() => null);
    if (ldJsonContent) {
      const data = JSON.parse(ldJsonContent);
      const hasItemList = data["@type"] === "ItemList" ||
        (Array.isArray(data["@graph"]) && data["@graph"].some((n) => n["@type"] === "ItemList"));
      if (hasItemList) pass("JSON-LD ItemList 存在");
      else fail(`JSON-LD ItemList なし (overview)`);
    } else fail("JSON-LD なし (overview)");

    const title = await page.title();
    if (title.length > 5) pass(`title: "${title}"`);
    else fail(`title 空`);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href").catch(() => null);
    if (canonical?.includes("recommended-books")) pass(`canonical: ${canonical}`);
    else fail(`canonical 不正: ${canonical}`);

    await ctx.close();
  }

  // ── Per-exam pages ────────────────────────────────────────────
  for (const exam of EXAMS) {
    section(`/recommended-books/${exam}`);
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await verifyExamPage(page, exam);
    await ctx.close();
  }

  // ── Mobile verification (ap / sc / ip) ───────────────────────
  section("モバイル表示確認 (ap / sc / ip)");
  for (const exam of ["ap", "sc", "ip"]) {
    process.stdout.write(`  [${exam}]\n`);
    await verifyMobile(browser, exam);
  }

  await browser.close();

  // ── Summary table ─────────────────────────────────────────────
  console.log("\n\n════════════════════════════════════════════════════════════════════");
  console.log(" 検証結果サマリー");
  console.log("════════════════════════════════════════════════════════════════════");
  console.log(
    ["exam".padEnd(4), "書籍".padStart(4), "Amazon".padStart(8), "tag率".padStart(6),
      "楽天".padStart(6), "ID率".padStart(5), "JSON-LD".padStart(8), "SEO".padStart(5), "ASIN未".padStart(7)].join("  "),
  );
  console.log("─".repeat(75));
  for (const r of results.pages) {
    const tagRate = r.amazonLinks > 0 ? `${r.amazonTagOk}/${r.amazonLinks}` : "—";
    const idRate = r.rakutenLinks > 0 ? `${r.rakutenIdOk}/${r.rakutenLinks}` : "—";
    const seo = [r.title, r.metaDesc, r.canonical].filter(Boolean).length + "/3";
    console.log(
      [r.exam.padEnd(4), String(r.bookCount).padStart(4), String(r.amazonLinks).padStart(8),
        tagRate.padStart(6), String(r.rakutenLinks).padStart(6), idRate.padStart(5),
        (r.jsonLd ? "✓" : "✗").padStart(8), seo.padStart(5),
        (r.placeholderAsins > 0 ? `${r.placeholderAsins}件` : "—").padStart(7)].join("  "),
    );
  }

  console.log("\n");
  if (results.warnings.length > 0) {
    console.log(`⚠  警告 ${results.warnings.length}件:`);
    for (const w of results.warnings) console.log(`  • ${w}`);
    console.log("");
  }
  if (results.failures.length === 0) {
    console.log("✅ 全検証パス — 問題なし");
  } else {
    console.log(`❌ ${results.failures.length}件の失敗:`);
    for (const f of results.failures) console.log(`  • ${f}`);
    process.exit(1);
  }
})();
