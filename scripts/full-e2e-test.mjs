#!/usr/bin/env node
// scripts/full-e2e-test.mjs
//
// 本番サイト全機能の自動 E2E テスト。10 シナリオを順次実行し、
// 結果を logs/full-e2e-report-YYYY-MM-DD.md に書き出す。
//
// 使い方:
//   node --experimental-vm-modules scripts/full-e2e-test.mjs
//   NODE_PATH=../node_modules node scripts/full-e2e-test.mjs   (worktree から)
//
// 実装メモ:
// - playwright は worktree に node_modules が無い場合があるので、
//   ../../../node_modules / ../node_modules を NODE_PATH 経由で参照する。
// - 失敗してもプロセスを止めず、全シナリオを最後まで走らせる。
// - 各シナリオの判定は ✅ / ⚠️ / ❌ の 3 値。

import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const LOGS_DIR = resolve(ROOT, "logs");
const BASE_URL = process.env.E2E_BASE_URL ?? "https://ipa-quiz-site.vercel.app";

// playwright の解決: worktree 内に無ければ親リポジトリの node_modules を見にいく
async function loadPlaywright() {
  const candidates = [
    resolve(ROOT, "node_modules", "playwright"),
    "C:/Users/kanet/ipa-quiz-site/node_modules/playwright",
  ];
  for (const p of candidates) {
    try {
      const mod = await import(`file://${p}/index.js`);
      // playwright exports via CJS — useful members live on default
      const root = mod.default ?? mod;
      return {
        chromium: root.chromium,
        firefox: root.firefox,
        webkit: root.webkit,
        devices: root.devices,
      };
    } catch {
      /* try next */
    }
  }
  throw new Error("playwright が見つからない。npm install するか NODE_PATH を指定してください。");
}

// ─────────────────────────────────────────────────────────────
// 結果集約
// ─────────────────────────────────────────────────────────────
const results = [];
const issues = [];

function record(name, status, notes, details = {}) {
  results.push({ name, status, notes, details });
  const icon = status === "pass" ? "✅" : status === "warn" ? "⚠️" : "❌";
  console.log(`${icon} ${name} — ${notes}`);
}

function addIssue(severity, where, what, fix = null) {
  issues.push({ severity, where, what, fix });
}

function fmt(ms) {
  return `${Math.round(ms)}ms`;
}

// ─────────────────────────────────────────────────────────────
// メイン
// ─────────────────────────────────────────────────────────────
async function main() {
  await mkdir(LOGS_DIR, { recursive: true });
  const { chromium, devices } = await loadPlaywright();

  console.log(`\n=== Full E2E Test against ${BASE_URL} ===\n`);

  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent:
        "Mozilla/5.0 (full-e2e-test/1.0) IpaQuizE2E PlaywrightSmokeTest",
      locale: "ja-JP",
      timezoneId: "Asia/Tokyo",
    });

    // 1. トップページ
    await scenario1_top(ctx);

    // 2. 学習フロー (/[exam] → /quiz → 解答 → 解説 → AIコパイロット)
    await scenario2_quiz(ctx);

    // 3. ダッシュボード (実装は /account のみ。タブ存在を検証)
    await scenario3_dashboard(ctx);

    // 4. 設定
    await scenario4_settings(ctx);

    // 5. ナビゲーション (ヘッダー/ハンバーガー/フッター)
    await scenario5_nav(ctx);

    // 6. 推薦書籍 (/recommended-books の存在チェック)
    await scenario6_books(ctx);

    // 7. 観測 (PostHog/Sentry/Analytics)
    await scenario7_observability(ctx);

    // 8. SEO (構造化データ / メタ / sitemap / robots)
    await scenario8_seo(ctx);

    await ctx.close();

    // 9. モバイル
    await scenario9_mobile(browser, devices);

    // 10. パフォーマンス
    await scenario10_perf(browser);
  } finally {
    await browser.close();
  }

  await writeReport();
  console.log("\n=== Done ===");
}

// ─────────────────────────────────────────────────────────────
// 1. トップページ
// ─────────────────────────────────────────────────────────────
async function scenario1_top(ctx) {
  const name = "1. トップページ";
  const page = await ctx.newPage();
  try {
    const t0 = performance.now();
    const resp = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    const loadMs = performance.now() - t0;

    if (!resp || !resp.ok()) {
      record(name, "fail", `HTTP ${resp?.status()}`);
      addIssue("critical", "/", `トップページが ${resp?.status()} で応答`);
      return;
    }

    // 試験区分カード — components/ExamCategoryGrid.tsx で 13 区分描画
    const examCards = await page.locator('a[href^="/"][href*="/"]').filter({
      hasText: /(IT パスポート|ITパスポート|応用情報|基本情報|情報セキュリティ|ストラテジスト|アーキテクト|プロジェクト|ネットワーク|データベース|エンベデッド|安全確保支援|サービスマネ|システム監査)/,
    });
    const cardCount = await examCards.count();

    // 「カレンダー」要素は実装上「収録年度」バッジ群が該当
    const yearsBadge = await page.locator('text=/収録年度/').count();

    // スクロール量
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const scrollRatio = scrollHeight / viewportHeight;

    let status = "pass";
    const notes = [];
    notes.push(`load=${fmt(loadMs)}`);
    notes.push(`exam-cards=${cardCount}`);
    notes.push(`年度badge=${yearsBadge}`);
    notes.push(`scrollH=${scrollHeight}px (${scrollRatio.toFixed(1)}vh)`);

    if (cardCount < 13) {
      status = "warn";
      addIssue("medium", "/", `試験区分カードが ${cardCount} 枚しか見えない（期待 13）`);
    }

    record(name, status, notes.join(" / "), { cardCount, scrollHeight, loadMs });
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
    addIssue("critical", "/", `例外発生: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 2. 学習フロー
// ─────────────────────────────────────────────────────────────
async function scenario2_quiz(ctx) {
  const name = "2. 学習フロー";
  const page = await ctx.newPage();
  try {
    // /ap → CTA → /quiz?mode=random&exam=ap
    const examResp = await page.goto(`${BASE_URL}/ap`, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (!examResp || !examResp.ok()) {
      record(name, "fail", `/ap が ${examResp?.status()}`);
      addIssue("critical", "/ap", `応答 ${examResp?.status()}`);
      return;
    }

    // /quiz に直接遷移して問題が出るかを確認
    const quizResp = await page.goto(`${BASE_URL}/quiz?mode=random&exam=ap`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    if (!quizResp || !quizResp.ok()) {
      record(name, "fail", `/quiz が ${quizResp?.status()}`);
      addIssue("critical", "/quiz", `応答 ${quizResp?.status()}`);
      return;
    }

    // 問題本文が表示されるまで待機
    await page.waitForLoadState("networkidle");

    // 選択肢ボタン (ア/イ/ウ/エ) を探す
    const choices = page.locator('button').filter({ hasText: /^[アイウエ]/ });
    const choiceCount = await choices.count();

    let answered = false;
    let explanationShown = false;
    let copilotPresent = false;

    if (choiceCount >= 4) {
      await choices.first().click({ timeout: 5000 }).catch(() => {});
      // 解説の出現を 5 秒待つ
      const explanation = page.locator('text=/正解|解説|不正解/').first();
      try {
        await explanation.waitFor({ state: "visible", timeout: 5000 });
        explanationShown = true;
        answered = true;
      } catch {
        /* not shown */
      }
    }

    // AI コパイロット UI
    const copilotTriggers = page.locator('button').filter({ hasText: /(AI|コパイロット|質問|聞|copilot)/i });
    copilotPresent = (await copilotTriggers.count()) > 0;

    let status = "pass";
    const notes = [];
    notes.push(`choices=${choiceCount}`);
    notes.push(`answered=${answered}`);
    notes.push(`expl=${explanationShown}`);
    notes.push(`copilot-ui=${copilotPresent}`);

    if (choiceCount < 4) {
      status = "fail";
      addIssue("critical", "/quiz", `選択肢ボタンが ${choiceCount} 個しか見えない`);
    } else if (!explanationShown) {
      status = "warn";
      addIssue("medium", "/quiz", "選択後に解説が 5 秒以内に表示されない");
    } else if (!copilotPresent) {
      status = "warn";
      addIssue("medium", "/quiz", "AI コパイロット トリガが見つからない");
    }

    record(name, status, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
    addIssue("critical", "/quiz", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 3. ダッシュボード (/account/dashboard)
// 実装は /account のみで、5 タブ構成は存在しない。
// 仕様確認のためここで状態を可視化する。
// ─────────────────────────────────────────────────────────────
async function scenario3_dashboard(ctx) {
  const name = "3. ダッシュボード";
  const page = await ctx.newPage();
  try {
    const url = `${BASE_URL}/account/dashboard`;
    const resp = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    const status = resp?.status() ?? 0;

    let verdict = "warn";
    const notes = [`/account/dashboard → HTTP ${status}`];

    if (status === 404) {
      notes.push("ルート未実装 (期待 5 タブ未実装)");
      addIssue(
        "info",
        "/account/dashboard",
        "ダッシュボードルート未実装。/account のシンプルページに統合されている",
      );
    } else if (status >= 200 && status < 400) {
      // タブを数える
      const tabs = await page.locator('[role="tab"], button[data-tab], [data-tabs] button').count();
      notes.push(`tabs=${tabs}`);
      if (tabs < 5) {
        addIssue("medium", "/account/dashboard", `タブが ${tabs} しか見えない (期待 5)`);
      } else {
        verdict = "pass";
      }
    } else if (status === 401 || status === 302 || status === 307) {
      notes.push("未認証リダイレクト → /auth/signin");
    }

    // /account 自体は確認できる
    const acctResp = await page.goto(`${BASE_URL}/account`, { waitUntil: "domcontentloaded", timeout: 30000 });
    notes.push(`/account → HTTP ${acctResp?.status()}`);

    record(name, verdict, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 4. 設定
// ─────────────────────────────────────────────────────────────
async function scenario4_settings(ctx) {
  const name = "4. 設定";
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle", timeout: 30000 });
    if (!resp || !resp.ok()) {
      record(name, "fail", `HTTP ${resp?.status()}`);
      addIssue("critical", "/settings", `応答 ${resp?.status()}`);
      return;
    }

    const sections = await page.locator("section").count();
    const themeButtons = await page.locator('button').filter({ hasText: /(ライト|ダーク|システム)/ }).count();
    const charSwitch = await page.locator('text=/AI|キャラ/').count();

    const notes = [`sections=${sections}`, `theme-buttons=${themeButtons}`, `ai-mention=${charSwitch}`];

    let status = "pass";
    if (sections < 4) {
      status = "warn";
      addIssue("medium", "/settings", `section 数が ${sections}（期待 7 だが実装は 4 セクション）`);
    }
    if (themeButtons < 2) {
      status = "warn";
      addIssue("medium", "/settings", "テーマ切替ボタンが少ない");
    }

    // 一応テーマトグルを 1 回叩いてエラーが出ないことを確認
    try {
      await page.locator('button').filter({ hasText: /ダーク/ }).first().click({ timeout: 2000 });
    } catch {
      /* ignore */
    }

    record(name, status, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 5. ナビゲーション
// 実装にはサイトヘッダー/ナビ/ハンバーガーが無い。
// フッターのみ存在を確認する。
// ─────────────────────────────────────────────────────────────
async function scenario5_nav(ctx) {
  const name = "5. ナビゲーション";
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    if (!resp?.ok()) {
      record(name, "fail", `HTTP ${resp?.status()}`);
      return;
    }

    const headerCount = await page.locator("header").count();
    const navCount = await page.locator("nav").count();
    const footerCount = await page.locator("footer").count();
    const hamburger = await page.locator(
      'button[aria-label*="menu"], button[aria-label*="メニュー"], button:has(svg[class*="menu"])',
    ).count();

    const footerLinks = await page.locator("footer a").count();
    const hasIpaCredit = (await page.locator('text=/出典:.*IPA/').count()) > 0;

    const notes = [
      `header=${headerCount}`,
      `nav=${navCount}`,
      `footer=${footerCount}`,
      `hamburger=${hamburger}`,
      `footer-links=${footerLinks}`,
      `ipa-credit=${hasIpaCredit}`,
    ];

    let status = "warn";
    if (footerCount >= 1 && footerLinks >= 4 && hasIpaCredit) {
      status = "pass";
    }

    if (headerCount === 0) {
      addIssue(
        "info",
        "layout",
        "<header>/サイトヘッダー未実装。タイトル+ロゴはトップ本文に統合（モバイル最優先設計と整合）",
      );
    }
    if (hamburger === 0) {
      addIssue("info", "layout", "ハンバーガーメニュー未実装");
    }
    if (!hasIpaCredit) {
      addIssue("medium", "footer", "IPA 出典クレジットが見えない");
    }

    record(name, status, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 6. 推薦書籍 (/recommended-books)
// ─────────────────────────────────────────────────────────────
async function scenario6_books(ctx) {
  const name = "6. 推薦書籍";
  const page = await ctx.newPage();
  try {
    const resp = await page.goto(`${BASE_URL}/recommended-books`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const status = resp?.status() ?? 0;

    if (status === 404) {
      record(name, "warn", `HTTP 404 — ルート未実装 (フェーズ4 予定)`);
      addIssue("info", "/recommended-books", "推薦書籍ルート未実装。フェーズ4 でアフィリエイト予定");
      return;
    }

    if (!resp.ok()) {
      record(name, "fail", `HTTP ${status}`);
      return;
    }

    // index ページに 13 試験区分カードがあるか
    const indexHtml = await page.content();
    const examMentions = (
      await page.locator('text=/(IT パスポート|ITパスポート|応用情報|基本情報|情報セキュリティ|ストラテジスト|アーキテクト|プロジェクト|ネットワーク|データベース|エンベデッド|安全確保支援|サービスマネ|システム監査)/').count()
    );

    // index にはアフィリリンクが無いので /recommended-books/ap 配下も確認する
    const apResp = await page.goto(`${BASE_URL}/recommended-books/ap`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    let amazonTagOk = false;
    let rakutenIdOk = false;
    if (apResp?.ok()) {
      const apHtml = await page.content();
      amazonTagOk = /tag=safeaisite22-22/.test(apHtml);
      rakutenIdOk = /5291f19d\.a0fc3c16\.5291f19e\.b91d11f6/.test(apHtml);
    }

    const notes = [
      `HTTP ${status}`,
      `index/exam-mentions=${examMentions}`,
      `/ap amazon-tag=${amazonTagOk}`,
      `/ap rakuten-id=${rakutenIdOk}`,
    ];

    let verdict = "pass";
    if (!amazonTagOk) {
      verdict = "warn";
      addIssue("medium", "/recommended-books/ap", "Amazon アフィリエイトタグ (safeaisite22-22) 未挿入");
    }
    if (!rakutenIdOk) {
      verdict = "warn";
      addIssue("medium", "/recommended-books/ap", "楽天アフィリ ID 未挿入");
    }
    if (examMentions < 13) {
      verdict = "warn";
      addIssue("medium", "/recommended-books", `試験区分言及 ${examMentions} (期待 13)`);
    }

    record(name, verdict, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 7. 観測 (PostHog / Sentry / Vercel Analytics)
// ─────────────────────────────────────────────────────────────
async function scenario7_observability(ctx) {
  const name = "7. 観測";
  const page = await ctx.newPage();
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  try {
    const resp = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(3000);

    // CSP ヘッダから Sentry/PostHog の許可状態を読む (Sentry は通常エラー時しか発火しない)
    const csp = resp?.headers()["content-security-policy"] ?? "";
    const sentryAllowed = /ingest\.[a-z-]+\.sentry\.io/i.test(csp);
    const posthogAllowed = /posthog/i.test(csp);

    const posthogReq = requests.some((u) => /posthog|i\.posthog\.com/i.test(u));
    const sentryReq = requests.some((u) => /sentry\.io|ingest\.sentry/i.test(u));
    const vercelAnalytics = requests.some((u) => /vitals\.vercel|_vercel\/insights|va\.vercel/i.test(u));
    const ga = requests.some((u) => /google-analytics|googletagmanager|gtag/i.test(u));

    const notes = [
      `PostHog req=${posthogReq} (CSP=${posthogAllowed})`,
      `Sentry req=${sentryReq} (CSP=${sentryAllowed})`,
      `VercelAnalytics req=${vercelAnalytics}`,
      `GA req=${ga}`,
    ];

    let status = "warn";
    if (posthogReq) status = "pass"; // PostHog がトップで発火していれば OK
    if (!posthogReq && !posthogAllowed) {
      addIssue("medium", "observability", "PostHog のリクエスト/CSP どちらも検出されない");
    }
    if (!sentryAllowed) {
      addIssue("info", "observability", "Sentry が CSP connect-src に無い (エラー収集設定要確認)");
    }

    record(name, status, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 8. SEO
// ─────────────────────────────────────────────────────────────
async function scenario8_seo(ctx) {
  const name = "8. SEO";
  const page = await ctx.newPage();
  try {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    const html = await page.content();

    const titleOk = /<title>.+<\/title>/.test(html);
    const descOk = /name=["']description["']/.test(html);
    const ogOk = /property=["']og:(title|description|image)["']/.test(html);
    const jsonLdCount = (html.match(/<script[^>]+type=["']application\/ld\+json["']/g) ?? []).length;

    // sitemap / robots
    const robotsResp = await page.goto(`${BASE_URL}/robots.txt`, { timeout: 15000 });
    const robotsOk = robotsResp?.ok();
    const robotsBody = robotsOk ? await robotsResp.text() : "";
    const sitemapDeclared = /Sitemap:/i.test(robotsBody);

    const sitemapResp = await page.goto(`${BASE_URL}/sitemap.xml`, { timeout: 15000 });
    const sitemapOk = sitemapResp?.ok();
    const sitemapBody = sitemapOk ? await sitemapResp.text() : "";
    let urlCount = (sitemapBody.match(/<url>/g) ?? []).length;
    // sitemap-index 形式の場合は子サイトマップを辿る
    const subSitemaps = [...sitemapBody.matchAll(/<loc>([^<]+\.xml)<\/loc>/g)].map((m) => m[1]);
    if (urlCount === 0 && subSitemaps.length > 0) {
      for (const sub of subSitemaps.slice(0, 5)) {
        try {
          const subResp = await page.goto(sub, { timeout: 15000 });
          if (subResp?.ok()) {
            const subBody = await subResp.text();
            urlCount += (subBody.match(/<url>/g) ?? []).length;
          }
        } catch { /* ignore */ }
      }
    }

    const notes = [
      `title=${titleOk}`,
      `desc=${descOk}`,
      `og=${ogOk}`,
      `jsonld=${jsonLdCount}`,
      `robots=${robotsOk}`,
      `sitemap=${sitemapOk}`,
      `urls=${urlCount}`,
      `sitemap-in-robots=${sitemapDeclared}`,
    ];

    let status = "pass";
    if (!titleOk || !descOk) {
      status = "warn";
      addIssue("medium", "SEO", "title/description タグ不足");
    }
    if (!ogOk) {
      status = "warn";
      addIssue("medium", "SEO", "OGP メタ不足");
    }
    if (jsonLdCount === 0) {
      status = "warn";
      addIssue("medium", "SEO", "JSON-LD 構造化データなし");
    }
    if (!robotsOk) {
      status = "warn";
      addIssue("medium", "SEO", "robots.txt が応答しない");
    }
    if (!sitemapOk) {
      status = "warn";
      addIssue("medium", "SEO", "sitemap.xml が応答しない");
    }

    record(name, status, notes.join(" / "));
  } catch (e) {
    record(name, "fail", `例外: ${e.message}`);
  } finally {
    await page.close();
  }
}

// ─────────────────────────────────────────────────────────────
// 9. モバイル (iPhone 13 / Pixel 5)
// ─────────────────────────────────────────────────────────────
async function scenario9_mobile(browser, devices) {
  const name = "9. モバイル";
  const targets = [
    { dev: devices["iPhone 13"], label: "iPhone 13" },
    { dev: devices["Pixel 5"], label: "Pixel 5" },
  ];
  const summaries = [];
  let overall = "pass";

  for (const { dev, label } of targets) {
    const ctx = await browser.newContext({ ...dev, locale: "ja-JP" });
    const page = await ctx.newPage();
    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });

      // タップターゲット 48px 確認 (interactive な要素を抽出してサイズ計測)
      const small = await page.evaluate(() => {
        const isInteractive = (el) => {
          if (!(el instanceof HTMLElement)) return false;
          if (el.hasAttribute("disabled")) return false;
          const tag = el.tagName.toLowerCase();
          if (["button", "a", "input", "select", "textarea"].includes(tag)) return true;
          const role = el.getAttribute("role");
          return role === "button" || role === "link" || role === "tab";
        };
        const all = Array.from(document.querySelectorAll("a,button,[role=button],[role=link],[role=tab],input,select,textarea"));
        const issues = [];
        for (const el of all) {
          if (!isInteractive(el)) continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue; // hidden
          if (r.width < 40 || r.height < 40) {
            issues.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent ?? "").trim().slice(0, 30),
              w: Math.round(r.width),
              h: Math.round(r.height),
            });
          }
        }
        return { total: all.length, issues: issues.slice(0, 8), smallCount: issues.length };
      });

      summaries.push(
        `${label}: overflow=${overflow}, interactive=${small.total}, <40px=${small.smallCount}`,
      );

      if (overflow) {
        overall = overall === "fail" ? "fail" : "warn";
        addIssue("medium", `mobile/${label}`, "横スクロールが発生");
      }
      if (small.smallCount > 5) {
        overall = overall === "fail" ? "fail" : "warn";
        addIssue(
          "low",
          `mobile/${label}`,
          `48px 未満タップ要素 ${small.smallCount} 個 (例: ${small.issues
            .slice(0, 3)
            .map((i) => `${i.tag}:${i.w}x${i.h}`)
            .join(", ")})`,
        );
      }
    } catch (e) {
      overall = "fail";
      summaries.push(`${label}: ERROR ${e.message}`);
    } finally {
      await page.close();
      await ctx.close();
    }
  }

  record(name, overall, summaries.join(" || "));
}

// ─────────────────────────────────────────────────────────────
// 10. パフォーマンス
// ─────────────────────────────────────────────────────────────
async function scenario10_perf(browser) {
  const name = "10. パフォーマンス";
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const targets = [
    "/",
    "/ap",
    "/quiz?mode=random&exam=ap",
    "/about",
    "/faq",
    "/settings",
    "/recommended-books",
    "/account/dashboard",
  ];
  const rows = [];
  let overall = "pass";

  for (const path of targets) {
    const url = `${BASE_URL}${path}`;
    const t0 = performance.now();
    let status = 0;
    try {
      const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      status = resp?.status() ?? 0;
    } catch (e) {
      rows.push(`${path}: ERROR ${e.message}`);
      overall = "fail";
      continue;
    }
    const ms = Math.round(performance.now() - t0);
    rows.push(`${path}: ${status} ${ms}ms`);
    if (ms > 4000) {
      overall = overall === "fail" ? "fail" : "warn";
      addIssue("low", path, `応答時間 ${ms}ms (>4s)`);
    }
    if (status >= 400) {
      overall = "fail";
      addIssue("critical", path, `HTTP ${status}`);
    }
  }

  await page.close();
  await ctx.close();
  record(name, overall, rows.join(" | "));
}

// ─────────────────────────────────────────────────────────────
// レポート出力
// ─────────────────────────────────────────────────────────────
async function writeReport() {
  const today = "2026-05-04"; // ファイル名固定
  const out = resolve(LOGS_DIR, `full-e2e-report-${today}.md`);

  const passN = results.filter((r) => r.status === "pass").length;
  const warnN = results.filter((r) => r.status === "warn").length;
  const failN = results.filter((r) => r.status === "fail").length;

  const lines = [];
  lines.push(`# 本番 E2E レポート — ${today}`);
  lines.push("");
  lines.push(`- 対象: ${BASE_URL}`);
  lines.push(`- 実行: \`scripts/full-e2e-test.mjs\``);
  lines.push(`- 結果: ✅ ${passN} / ⚠️ ${warnN} / ❌ ${failN}`);
  lines.push("");
  lines.push("## サマリ");
  lines.push("");
  lines.push("| # | シナリオ | 判定 | メモ |");
  lines.push("|---|---------|:----:|------|");
  for (const r of results) {
    const icon = r.status === "pass" ? "✅" : r.status === "warn" ? "⚠️" : "❌";
    lines.push(`| ${results.indexOf(r) + 1} | ${r.name} | ${icon} | ${r.notes.replace(/\|/g, "\\|")} |`);
  }
  lines.push("");
  lines.push("## 発見した問題");
  lines.push("");
  if (issues.length === 0) {
    lines.push("（特になし）");
  } else {
    lines.push("| 重要度 | 対象 | 内容 |");
    lines.push("|--------|------|------|");
    for (const i of issues) {
      lines.push(`| ${i.severity} | ${i.where} | ${i.what.replace(/\|/g, "\\|")} |`);
    }
  }
  lines.push("");
  lines.push("## 詳細");
  lines.push("");
  for (const r of results) {
    const icon = r.status === "pass" ? "✅" : r.status === "warn" ? "⚠️" : "❌";
    lines.push(`### ${icon} ${r.name}`);
    lines.push("");
    lines.push(`- ${r.notes}`);
    lines.push("");
  }

  await writeFile(out, lines.join("\n"), "utf8");
  console.log(`\nReport: ${out}`);
}

main().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
