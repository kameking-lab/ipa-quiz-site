# Phase 1 Audit Notes — Living Document

Reviewer date: 2026-05-15
Persona: SEO veteran 15y, audit specialty.

## P1.1 Metadata — Confirmed Findings

### CRITICAL — Title double-pipe (literal "| 過去問AI | 過去問AI")
Root cause: pages set `metadata.title` already including "| 過去問AI" while root layout in app/layout.tsx defines `title.template: "%s | 過去問AI"`. The template appends a second "| 過去問AI".

Confirmed via curl on production (2026-05-15):
- /sitemap → "サイトマップ | 過去問AI | 過去問AI"
- /chat/share → "AIと一緒に解いたIPA過去問 | 過去問AI | 過去問AI" (also blocked by robots disallow /chat/share — low SERP impact but still wasteful)
- /keywords → "学習トピック特集記事一覧 | 過去問AI | 過去問AI"
- /features → "機能特集 | 過去問AI | 過去問AI"
- /api-docs → "Public API ドキュメント｜過去問AI | 過去問AI" (mixed full-width/half-width pipe)
- /stats → "公開統計ダッシュボード — 過去問AI | 過去問AI" (redundant brand, different separator)

Files with the bug:
- app/sitemap/page.tsx:13
- app/keywords/page.tsx:13
- app/features/page.tsx:11
- app/api-docs/page.tsx:10
- app/stats/page.tsx:42
- app/chat/share/page.tsx:6 (low priority — disallowed in robots)

### CRITICAL — Essay pages are client-rendered, soft-404 for crawlers
app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx is "use client" with no generateMetadata.
Production curl confirms:
- /essays/sc/2024-spring/pm2/q1 returns HTTP 200 but server HTML shows root-layout fallback title "過去問AI — AIネイティブ過去問学習" and canonical pointing to homepage.
- /essays/sc/2025-spring/pm2/q1 returns HTTP 200 + body contains literal "ページが見つかりません" string and canonical pointing to home.
- These URLs are listed in lib/seo/sitemap-xml.ts::getEssayRoutes() and in /sitemap/essays.xml.

Impact: This is the differentiation feature of the site (午後論述 NO-GO from 2023 pilot). The entire essays surface area is invisible to Google.

### MAJOR — Inconsistent question count claims
- Home (root layout) metadata description: "IPA 13試験 12,000問超"
- Home (app/page.tsx) metadata description: "全 13 区分・12,000問超"
- WebSite JSON-LD description: "12,000 問超"
- Actual count from production JSON-LD itemList totals: 15,082 questions
- CLAUDE.md claims 14,000+

Underselling by ~3,000 questions. CTR impact: smaller number = lower click-through. Also factual drift.

### MAJOR — Home page OG/Twitter title differs from page <title>
- <title>: "IPA過去問×AI、無料で全機能 — 過去問AI"
- og:title: "過去問AI — AIネイティブ過去問学習" (root layout fallback — page.tsx did not override openGraph.title)

Result: SERP and social share titles are different. Branded share previews lose the keyword-rich title.

### MAJOR — Exam page descriptions: boilerplate template detection risk
All 13 /[exam] descriptions follow the same template:
  "[name]試験の過去問X問をAIコパイロットで完全無料解説。[期]期分・[分野]分野を完全網羅。[audience]。[hook]。会員登録不要で即学習開始。"

Length 150-170 Japanese chars — likely truncated mid-sentence in Google SERPs (Japanese desktop cutoff ~90-110 chars; "会員登録不要で即学習開始" frequently truncated).

### MEDIUM — Home SearchAction structured data
Home JSON-LD potentialAction.target = "/quiz?mode=random&exam={search_term_string}"
exam expects an ExamCode like ap/fe/sc. But search_term_string is free text. Google's spec says target should accept the search string verbatim. This is a stub that doesn't actually match exam search.

## P1.2 Sitemap & Crawl Control — Confirmed Findings

### MAJOR — robots.ts duplicates sitemap entries with sitemap-index
app/robots.ts (lines 28-38) lists in `sitemap:`:
  /sitemap.xml (the index)
  /sitemap/main.xml
  /sitemap/exams.xml
  /sitemap/topics.xml
  /sitemap/blog.xml
  /sitemap/books.xml
  /sitemap/questions/{i}.xml × N

But /sitemap.xml is the index — it ALREADY lists all the children inside (renderSitemapIndexXml).
Google guidance (developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap):
> "If you have a sitemap index file, you can submit just that file"

Listing both creates noise in Search Console. Also robots.ts FORGETS /sitemap/essays.xml — only the index references it. Inconsistency.

### MAJOR — Legacy /sitemap/[id].xml still served + overlapping URLs
app/sitemap/[id]/route.ts uses renderSitemapChunkXml which (per lib/seo/sitemap-xml.ts comment) "combined chunk (static + exams + topics + blog + books on chunk 0, questions on every chunk)".

Every question URL appears twice: once in /sitemap/questions/[id].xml (referenced by index) and once in /sitemap/[id].xml (legacy, NOT referenced by index but still crawlable).

Crawlers that bypass the index could discover the legacy chunks via the typed URL pattern. Even though the index doesn't reference these, /sitemap/0.xml is statically generated and accessible.

### OK — robots.txt Disallow scope is reasonable
Disallow list (/api/, /admin/, /auth/, /account/, /chat/share, /analytics, /exec-review, /feature-review, /final-review, /final-review-v3, /strategy-discussion, /strategy-discussion-v2, /tmp/, /test/) — internal review pages are correctly excluded.

