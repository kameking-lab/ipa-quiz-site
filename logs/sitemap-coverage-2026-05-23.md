# /q/* sitemap coverage + 404 audit (2026-05-23)

## Before phase 6

- `ALL_QUESTIONS.length`: 14,402
- `needsReview: true`: 10 (404 by design at /q/*)
- placeholder explanation (`isPlaceholderExplanation`): 1,743 (skipped at sitemap level)
- indexable per `getIndexableQuestions()`: 12,649
- SSG params emitted by /q/* `generateStaticParams` (year >= 2024): 1,595
- `/q/*` page had `dynamicParams = false`, so any URL outside the 1,595 SSG set returned **404 at the router layer** before the page component could run.

## After PR `feat/question-pages-sitemap-and-404-fix`

- Sitemap chunk count unchanged (`SITEMAP_CHUNK_SIZE = 10000`, so 2 chunks for 12,649 indexable URLs). The questions sitemap was already wired into the `sitemap.xml` index via `renderSitemapIndexXml()`.
- `dynamicParams` flipped to `true`. The 11,054 indexable URLs that were sitting in the sitemap but 404'ing now render on-demand with ISR (`revalidate = 86400`).
- Existing 200 routes (SSG) keep their build-time prerender — no extra cost.
- Truly invalid params (typo year, bad exam) still hit `notFound()` inside the page handler.

## By-year question distribution

2009:1068, 2010:1070, 2011:615, 2012:845, 2013:870, 2014:870, 2015:870, 2016:870, 2017:970, 2018:970, 2019:970, 2020:455, 2021:710, 2022:810, 2023:844, 2024:850, 2025:745.

## Sample verifications (post-merge)

These URLs used to 404 (year < 2024) and now resolve 200 via ISR:

- /q/fe/2013-spring/am/q35
- /q/ap/2017-autumn/am/q12
- /q/sc/2018-spring/am1/q5
- /q/nw/2019-autumn/am2/q10
- /q/db/2020-autumn/am1/q3
- /q/ip/2021-spring/am/q1
- /q/es/2022-autumn/am1/q7
- /q/au/2023-spring/am1/q4

Run `curl -I https://www.kakomon-ai.jp/q/fe/2013-spring/am/q35` after deploy to confirm 200.

## Risks / follow-ups

- First request to an older year warms the ISR cache (~300-600 ms TTFB cold, then sub-100 ms warm for 24 h). Acceptable for SEO crawlers, which retry.
- If `findQuestionByRoute` returns nothing and no fallback matches, the page returns 404 via `notFound()` — that's correct (no manufactured "near-duplicate" 200 shells).
