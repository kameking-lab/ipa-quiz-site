/**
 * Production site verification script for www.kakomon-ai.jp
 * Read-only observation only — no writes, no form submissions.
 * Outputs: logs/verification-2026-05-19/results.json + screenshots
 */

import { chromium } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import https from 'https';
import http from 'http';

const BASE_URL = 'https://www.kakomon-ai.jp';
const LOG_DIR = 'logs/verification-2026-05-19';

mkdirSync(LOG_DIR, { recursive: true });

const results = {
  meta: {
    verifiedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    tool: 'Playwright chromium',
  },
  pageObservations: {},
  features: {},
  structuredData: {},
  seo: {},
  ngChecks: {},
  handoffComparison: {},
};

// Helper: fetch URL with curl-like behavior
function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 15000 }, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    });
    req.on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '', error: 'timeout' }); });
  });
}

async function observePage(page, url, label, screenshotPrefix) {
  console.log(`  Observing: ${url}`);
  const obs = { url, label };

  try {
    const startTime = Date.now();
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    obs.loadTimeMs = Date.now() - startTime;
    obs.httpStatus = resp?.status() ?? 0;
  } catch (e) {
    obs.httpStatus = 0;
    obs.error = e.message;
    return obs;
  }

  obs.title = await page.title().catch(() => null);
  obs.metaDescription = await page.$eval('meta[name="description"]', el => el.content).catch(() => null);
  obs.h1 = await page.$eval('h1', el => el.textContent?.trim()).catch(() => null);
  obs.allH1s = await page.$$eval('h1', els => els.map(e => e.textContent?.trim())).catch(() => []);

  // Navigation items
  obs.navItems = await page.$$eval('nav a, header a', els =>
    els.map(e => e.textContent?.trim()).filter(Boolean).slice(0, 20)
  ).catch(() => []);

  // Footer text
  obs.footerText = await page.$eval('footer', el => el.textContent?.trim().slice(0, 500)).catch(() => null);
  obs.footerHasEducation = obs.footerText?.includes('教育') || obs.footerText?.includes('無料') || obs.footerText?.includes('登録不要') || false;

  // AI Copilot button
  obs.copilotButtonExists = await page.$('[data-copilot], [aria-label*="コパイロット"], [aria-label*="copilot"], button:has-text("AIコパイロット"), button:has-text("AI コパイロット"), button:has-text("コパイロット")').then(el => !!el).catch(() => false);
  obs.copilotButtonText = await page.$eval('[data-copilot], [aria-label*="コパイロット"], [aria-label*="copilot"], button:has-text("AIコパイロット"), button:has-text("AI コパイロット")', el => el.textContent?.trim()).catch(() => null);

  // JSON-LD
  obs.jsonLd = await page.$$eval('script[type="application/ld+json"]', scripts =>
    scripts.map(s => {
      try { return JSON.parse(s.textContent || '{}'); } catch { return null; }
    }).filter(Boolean)
  ).catch(() => []);
  obs.jsonLdTypes = obs.jsonLd.map(j => j['@type']).filter(Boolean);

  // Screenshots
  const desktopPath = `${LOG_DIR}/${screenshotPrefix}-desktop.png`;
  const mobilePath = `${LOG_DIR}/${screenshotPrefix}-mobile.png`;

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: desktopPath, fullPage: false }).catch(() => {});
  obs.screenshotDesktop = desktopPath;

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: mobilePath, fullPage: false }).catch(() => {});
  obs.screenshotMobile = mobilePath;

  await page.setViewportSize({ width: 1440, height: 900 }); // restore

  return obs;
}

async function main() {
  console.log('Starting production site verification...');
  const browser = await chromium.launch({ headless: true });

  try {
    // ===== BLOCK A: Main pages =====
    console.log('\n=== BLOCK A: Main Pages ===');
    const pagesToCheck = [
      { url: '/', label: 'Home', prefix: 'a-01-home' },
      { url: '/quiz', label: 'Quiz', prefix: 'a-02-quiz' },
      { url: '/mock-exam', label: 'Mock Exam', prefix: 'a-03-mock-exam' },
      { url: '/search', label: 'Search', prefix: 'a-04-search' },
      { url: '/success-stories', label: 'Success Stories', prefix: 'a-05-success-stories' },
      { url: '/study-plan', label: 'Study Plan', prefix: 'a-06-study-plan' },
      { url: '/my-progress', label: 'My Progress', prefix: 'a-07-my-progress' },
      { url: '/bookmarks', label: 'Bookmarks', prefix: 'a-08-bookmarks' },
      { url: '/why-kakomon-ai', label: 'Why Kakomon AI', prefix: 'a-09-why' },
      { url: '/features', label: 'Features', prefix: 'a-10-features' },
      { url: '/features/copilot', label: 'Features Copilot', prefix: 'a-11-features-copilot' },
      { url: '/features/mock-exam', label: 'Features Mock Exam', prefix: 'a-12-features-mock-exam' },
      { url: '/features/study-plan', label: 'Features Study Plan', prefix: 'a-13-features-study-plan' },
    ];

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });

    for (const { url, label, prefix } of pagesToCheck) {
      const obs = await observePage(page, `${BASE_URL}${url}`, label, prefix);
      results.pageObservations[url] = obs;
    }

    // ===== BLOCK B: Feature verification =====
    console.log('\n=== BLOCK B: Feature Verification ===');

    // B-1: AI Copilot
    console.log('  B-1: AI Copilot...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const copilotPanel = await page.$('[data-copilot-panel], [role="dialog"]:has-text("コパイロット"), aside:has-text("コパイロット"), .copilot-panel').then(el => !!el).catch(() => false);
    const copilotBtn = await page.$('button:has-text("コパイロット"), button:has-text("AI"), [aria-label*="AI"]').catch(() => null);
    let copilotPanelAfterClick = false;
    let quickPresets = [];
    let streamingUIExists = false;
    let stopButtonExists = false;

    if (copilotBtn) {
      await copilotBtn.click().catch(() => {});
      await page.waitForTimeout(1500);
      copilotPanelAfterClick = await page.$('[role="dialog"], aside, .copilot, [data-state="open"]').then(el => !!el).catch(() => false);
      quickPresets = await page.$$eval('button[data-preset], [data-quick-action], .quick-action', els => els.map(e => e.textContent?.trim()).filter(Boolean)).catch(() => []);
      streamingUIExists = await page.$('[data-streaming], [aria-label*="typing"], .typing-indicator, .stream-indicator').then(el => !!el).catch(() => false);
      stopButtonExists = await page.$('button:has-text("停止"), button[aria-label*="stop"], button:has-text("Stop")').then(el => !!el).catch(() => false);
    }

    // Check for input field and send button
    const copilotInputExists = await page.$('textarea[placeholder*="質問"], input[placeholder*="質問"], textarea[placeholder*="Enter"], [data-copilot-input]').then(el => !!el).catch(() => false);
    const copilotSendExists = await page.$('button[type="submit"], button:has-text("送信"), button[aria-label*="send"]').then(el => !!el).catch(() => false);

    await page.screenshot({ path: `${LOG_DIR}/b-01-copilot.png` }).catch(() => {});
    results.features['B1_copilot'] = {
      copilotPanelInitial: copilotPanel,
      copilotBtnFound: !!copilotBtn,
      copilotPanelAfterClick,
      quickPresets,
      streamingUIExists,
      stopButtonExists,
      inputExists: copilotInputExists,
      sendBtnExists: copilotSendExists,
      screenshotPath: `${LOG_DIR}/b-01-copilot.png`,
    };

    // B-2: Mock exam
    console.log('  B-2: Mock exam...');
    await page.goto(`${BASE_URL}/mock-exam`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText2 = await page.content().catch(() => '');
    const examSelectors = await page.$$eval('select option, [role="option"], [data-exam]', els => els.map(e => e.textContent?.trim()).filter(Boolean).slice(0, 30)).catch(() => []);
    const examCheckboxes = await page.$$eval('input[type="checkbox"], input[type="radio"]', els => els.map(e => e.value || e.id).filter(Boolean).slice(0, 30)).catch(() => []);
    const allExams = ['IP', 'FE', 'AP', 'SC', 'PM', 'SA', 'SM', 'ST', 'AU', 'ES', 'NW', 'DB'];
    const visibleExams = allExams.filter(ex => pageText2.includes(ex));
    const hasResultAnalysis = pageText2.includes('合格') || pageText2.includes('分野別') || pageText2.includes('分析');
    const hasHistoryTracking = pageText2.includes('履歴') || pageText2.includes('ヒストリー');
    await page.screenshot({ path: `${LOG_DIR}/b-02-mock-exam.png` }).catch(() => {});
    results.features['B2_mockExam'] = {
      visibleExams,
      examSelectorsFound: examSelectors.slice(0, 20),
      examCheckboxesFound: examCheckboxes.slice(0, 20),
      hasResultAnalysis,
      hasHistoryTracking,
      pageTextSnippet: pageText2.slice(0, 300),
    };

    // B-3: Search
    console.log('  B-3: Search...');
    await page.goto(`${BASE_URL}/search`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText3 = await page.content().catch(() => '');
    const sortModes = await page.$$eval('[data-sort], select[name*="sort"], .sort-option, [aria-label*="並び"]', els => els.map(e => e.textContent?.trim()).filter(Boolean)).catch(() => []);
    const hasSearchHistory = pageText3.includes('履歴') || pageText3.includes('検索履歴');
    const hasHighlight = pageText3.includes('ハイライト') || pageText3.includes('highlight');
    const hasCTA = pageText3.includes('学習') && (pageText3.includes('始め') || pageText3.includes('続け') || pageText3.includes('おすすめ'));
    await page.screenshot({ path: `${LOG_DIR}/b-03-search.png` }).catch(() => {});
    results.features['B3_search'] = {
      sortModesFound: sortModes,
      hasSearchHistory,
      hasHighlight,
      hasCTA,
    };

    // B-4: My progress
    console.log('  B-4: My progress...');
    await page.goto(`${BASE_URL}/my-progress`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText4 = await page.content().catch(() => '');
    const hasStreak = pageText4.includes('ストリーク') || pageText4.includes('連続') || pageText4.includes('streak');
    const hasBadge = pageText4.includes('バッジ') || pageText4.includes('badge') || pageText4.includes('Badge');
    const hasDailyGoal = pageText4.includes('目標') || pageText4.includes('ゴール') || pageText4.includes('goal');
    const hasLocalStorageNote = pageText4.includes('localStorage') || pageText4.includes('ブラウザ') || pageText4.includes('ローカル');
    await page.screenshot({ path: `${LOG_DIR}/b-04-my-progress.png` }).catch(() => {});
    results.features['B4_myProgress'] = {
      hasStreak,
      hasBadge,
      hasDailyGoal,
      hasLocalStorageNote,
    };

    // B-5: Bookmarks
    console.log('  B-5: Bookmarks...');
    await page.goto(`${BASE_URL}/bookmarks`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText5 = await page.content().catch(() => '');
    const hasCustomTags = pageText5.includes('タグ') || pageText5.includes('tag') || pageText5.includes('Tag');
    const hasEmptyState = pageText5.includes('まだ') || pageText5.includes('ありません') || pageText5.includes('空') || pageText5.includes('登録') || pageText5.includes('なし');
    await page.screenshot({ path: `${LOG_DIR}/b-05-bookmarks.png` }).catch(() => {});
    results.features['B5_bookmarks'] = {
      hasCustomTags,
      hasEmptyState,
      pageSnippet: pageText5.slice(0, 400),
    };

    // B-6: Why and features
    console.log('  B-6: Why and features...');
    await page.goto(`${BASE_URL}/why-kakomon-ai`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText6a = await page.content().catch(() => '');
    const hasDiffMessage = pageText6a.includes('過去問道場') || pageText6a.includes('AI') || pageText6a.includes('差別化') || pageText6a.includes('ネイティブ');
    const ngWords6a = ['絶対合格', '100%合格', '確実合格', '最強', '唯一無二'];
    const foundNg6a = ngWords6a.filter(w => pageText6a.includes(w));
    await page.screenshot({ path: `${LOG_DIR}/b-06-why.png` }).catch(() => {});
    results.features['B6_why'] = { hasDiffMessage, foundNgWords: foundNg6a };

    // B-7: Success stories
    console.log('  B-7: Success stories...');
    await page.goto(`${BASE_URL}/success-stories`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const pageText7 = await page.content().catch(() => '');
    const storyCards = await page.$$eval('article, .story-card, [data-story], .card', els => els.length).catch(() => 0);
    const hasAiDisclaimer = pageText7.includes('AI生成') || pageText7.includes('フィクション') || pageText7.includes('架空') || pageText7.includes('実体験ではない') || pageText7.includes('参考');
    const hasStoryLinks = await page.$$eval('a[href*="/success-stories/"]', els => els.length).catch(() => 0);
    await page.screenshot({ path: `${LOG_DIR}/b-07-success-stories.png` }).catch(() => {});
    results.features['B7_successStories'] = {
      cardCount: storyCards,
      storyLinkCount: hasStoryLinks,
      hasAiDisclaimer,
      aiDisclaimerSnippet: pageText7.match(/(AI生成|フィクション|架空|実体験ではない)[^。]*。/)?.[0] ?? null,
    };

    // B-8: Motivation system
    console.log('  B-8: Motivation...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const homeText = await page.content().catch(() => '');
    const hasStreakHome = homeText.includes('ストリーク') || homeText.includes('連続') || homeText.includes('streak');
    const hasDailyGoalHome = homeText.includes('目標') || homeText.includes('今日');
    results.features['B8_motivation'] = { hasStreakHome, hasDailyGoalHome };

    // ===== BLOCK C: Structured data =====
    console.log('\n=== BLOCK C: Structured Data ===');
    const structuredPages = ['/', '/success-stories', '/why-kakomon-ai', '/blog', '/essays'];
    for (const p of structuredPages) {
      await page.goto(`${BASE_URL}${p}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      const jsonLdData = await page.$$eval('script[type="application/ld+json"]', scripts =>
        scripts.map(s => {
          try { const obj = JSON.parse(s.textContent || '{}'); return { type: obj['@type'], keys: Object.keys(obj) }; }
          catch { return null; }
        }).filter(Boolean)
      ).catch(() => []);
      results.structuredData[p] = jsonLdData;
    }

    // Try to find a sample question URL from sitemap
    const sitemapResp = await fetchUrl(`${BASE_URL}/sitemap.xml`);
    let sampleQuestionUrl = null;
    if (sitemapResp.body.includes('sitemap')) {
      const childSitemapMatch = sitemapResp.body.match(/<loc>(https:\/\/[^<]+questions[^<]+)<\/loc>/);
      if (childSitemapMatch) {
        const childResp = await fetchUrl(childSitemapMatch[1]);
        const qMatch = childResp.body.match(/<loc>(https:\/\/[^<]+\/q\/[^<]+)<\/loc>/);
        if (qMatch) sampleQuestionUrl = qMatch[1];
      }
    }
    if (sampleQuestionUrl) {
      await page.goto(sampleQuestionUrl, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      const qJsonLd = await page.$$eval('script[type="application/ld+json"]', scripts =>
        scripts.map(s => {
          try { const obj = JSON.parse(s.textContent || '{}'); return { type: obj['@type'], keys: Object.keys(obj) }; }
          catch { return null; }
        }).filter(Boolean)
      ).catch(() => []);
      results.structuredData['/q/[sample]'] = { url: sampleQuestionUrl, data: qJsonLd };
    }

    // Blog and essays sample
    for (const feedPath of ['/blog', '/essays', '/success-stories']) {
      const feedLinks = await page.goto(`${BASE_URL}${feedPath}`, { waitUntil: 'networkidle', timeout: 30000 })
        .then(() => page.$$eval('a[href*="' + feedPath + '/"]', els => els.map(e => e.href).filter(u => u !== BASE_URL + feedPath + '/').slice(0, 1)))
        .catch(() => []);
      if (feedLinks.length > 0) {
        await page.goto(feedLinks[0], { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
        const itemJsonLd = await page.$$eval('script[type="application/ld+json"]', scripts =>
          scripts.map(s => {
            try { const obj = JSON.parse(s.textContent || '{}'); return { type: obj['@type'] }; }
            catch { return null; }
          }).filter(Boolean)
        ).catch(() => []);
        results.structuredData[feedPath + '/[item]'] = { url: feedLinks[0], data: itemJsonLd };
      }
    }

    await page.close();

    // ===== BLOCK D: SEO/Infrastructure =====
    console.log('\n=== BLOCK D: SEO/Infrastructure ===');

    // D-1: robots.txt
    console.log('  D-1: robots.txt...');
    const robotsResp = await fetchUrl(`${BASE_URL}/robots.txt`);
    results.seo.robotsTxt = {
      status: robotsResp.status,
      content: robotsResp.body,
      hasStopClaudeNote: robotsResp.body.includes('Stop Claude') || robotsResp.body.includes('Claude'),
      hasSitemapDirective: robotsResp.body.includes('Sitemap:'),
      hasUserAgent: robotsResp.body.includes('User-agent:'),
    };

    // D-2: sitemap.xml
    console.log('  D-2: sitemap.xml...');
    const sitemapRespMain = await fetchUrl(`${BASE_URL}/sitemap.xml`);
    const childSitemapUrls = [...sitemapRespMain.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]).filter(u => u.includes('sitemap'));
    const childSitemapCounts = {};
    let totalUrls = 0;
    for (const csUrl of childSitemapUrls) {
      const csResp = await fetchUrl(csUrl);
      const urlCount = (csResp.body.match(/<loc>/g) || []).length;
      childSitemapCounts[csUrl] = urlCount;
      totalUrls += urlCount;
    }
    results.seo.sitemap = {
      mainStatus: sitemapRespMain.status,
      childSitemapUrls,
      childSitemapCounts,
      totalUrlCount: totalUrls,
    };

    // D-3: PWA
    console.log('  D-3: PWA...');
    const manifestResp = await fetchUrl(`${BASE_URL}/manifest.webmanifest`);
    let manifestData = null;
    try { manifestData = JSON.parse(manifestResp.body); } catch {}
    const swResp = await fetchUrl(`${BASE_URL}/sw.js`);
    results.seo.pwa = {
      manifestStatus: manifestResp.status,
      manifest: manifestData ? { name: manifestData.name, shortName: manifestData.short_name, startUrl: manifestData.start_url, display: manifestData.display, iconCount: (manifestData.icons || []).length } : null,
      swStatus: swResp.status,
    };

    // D-4: Analytics
    console.log('  D-4: Analytics...');
    const homePage2 = await chromium.launch({ headless: true }).then(async b => {
      const ctx = await b.newContext();
      const p = await ctx.newPage();
      await p.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      const html = await p.content().catch(() => '');
      await b.close();
      return html;
    });
    results.seo.analytics = {
      hasVercelInsights: homePage2.includes('/_vercel/insights') || homePage2.includes('/_vercel/speed-insights'),
      hasPostHog: homePage2.includes('posthog') || homePage2.includes('PostHog'),
      vercelInsightsSnippet: homePage2.includes('/_vercel/insights/script.js') ? 'found /_vercel/insights/script.js' : homePage2.includes('/_vercel/speed-insights/script.js') ? 'found /_vercel/speed-insights/script.js' : 'not found',
    };

    // ===== BLOCK E: NG checks =====
    console.log('\n=== BLOCK E: NG Checks ===');
    const ngBrowser = await chromium.launch({ headless: true });
    const ngPage = await ngBrowser.newPage();
    const ngWords = ['絶対合格', '100%合格', '確実合格', '最強', '唯一無二'];
    const ngResults = {};

    const ngPages = ['/', '/why-kakomon-ai', '/features', '/mock-exam', '/study-plan'];
    for (const ngUrl of ngPages) {
      await ngPage.goto(`${BASE_URL}${ngUrl}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      const content = await ngPage.content().catch(() => '');
      const found = ngWords.filter(w => content.includes(w));
      if (found.length > 0) {
        ngResults[ngUrl] = found.map(w => {
          const idx = content.indexOf(w);
          return { word: w, context: content.slice(Math.max(0, idx - 50), idx + 100) };
        });
      } else {
        ngResults[ngUrl] = [];
      }
    }
    results.ngChecks.ngWordsFound = ngResults;

    // E-2: AI content disclaimers
    const aiDisclaimerPages = ['/success-stories', '/essays', '/blog'];
    const disclaimerResults = {};
    for (const dp of aiDisclaimerPages) {
      await ngPage.goto(`${BASE_URL}${dp}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
      const content = await ngPage.content().catch(() => '');
      const words = ['AI生成', 'フィクション', '架空', '実体験ではない', 'サンプル', '参考'];
      disclaimerResults[dp] = {
        hasDisclaimer: words.some(w => content.includes(w)),
        foundWords: words.filter(w => content.includes(w)),
      };
    }
    results.ngChecks.aiDisclaimers = disclaimerResults;

    // E-3: Affiliate disclosure
    await ngPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    const homeContent = await ngPage.content().catch(() => '');
    const sponsoredLinks = await ngPage.$$eval('a[rel~="sponsored"]', els => els.map(e => e.href)).catch(() => []);
    results.ngChecks.affiliateDisclosure = {
      sponsoredLinksOnHome: sponsoredLinks.length,
      amazonTagInHtml: homeContent.includes('safeaisite22-22'),
    };
    await ngBrowser.close();

    // ===== BLOCK F: Handoff comparison =====
    console.log('\n=== BLOCK F: Handoff Comparison ===');

    // F-1: Question count vs claimed 14,417+
    const questionSitemapUrls = Object.entries(results.seo.sitemap.childSitemapCounts);
    const questionUrls = questionSitemapUrls.filter(([u]) => u.includes('question') || u.includes('/q/'));
    const questionUrlCount = questionUrls.reduce((sum, [, c]) => sum + c, 0);

    const blogUrls = questionSitemapUrls.filter(([u]) => u.includes('blog'));
    const essayUrls = questionSitemapUrls.filter(([u]) => u.includes('essay'));
    const successUrls = questionSitemapUrls.filter(([u]) => u.includes('success'));

    // F-2: Hub pages existence
    const hubPages = ['/why-kakomon-ai', '/features', '/features/copilot', '/features/mock-exam', '/features/study-plan'];
    const hubStatuses = {};
    for (const hp of hubPages) {
      const obs = results.pageObservations[hp];
      hubStatuses[hp] = obs?.httpStatus ?? 'not checked';
    }

    // F-3: /admin/launch-monitoring Basic Auth check
    const adminResp = await fetchUrl(`${BASE_URL}/admin/launch-monitoring`);

    results.handoffComparison = {
      claimedQuestions: 14417,
      actualQuestionsInSitemap: questionUrlCount,
      questionSitemapDetails: questionUrls.map(([u, c]) => ({ url: u, count: c })),
      blogCount: blogUrls.reduce((s, [, c]) => s + c, 0),
      essayCount: essayUrls.reduce((s, [, c]) => s + c, 0),
      successStoriesCount: successUrls.reduce((s, [, c]) => s + c, 0),
      hubPageStatuses: hubStatuses,
      adminLaunchMonitoringStatus: adminResp.status,
      adminExpected401: adminResp.status === 401,
    };

    // Save results
    writeFileSync(`${LOG_DIR}/results.json`, JSON.stringify(results, null, 2));
    console.log('\n=== Verification complete ===');
    console.log(`Results saved to ${LOG_DIR}/results.json`);
    console.log(`Total sitemap URLs: ${results.seo.sitemap.totalUrlCount}`);
    console.log(`Questions in sitemap: ${questionUrlCount}`);

  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
