# Essays Soft-404 Investigation (2026-05-15)

## Reproduction (production)

```
curl -sS https://www.kakomon-ai.jp/essays/sc/2025-spring/pm2/q1 | grep '読み込み中'
→ "読み込み中…" present, no essay body text in initial HTML
```

## Root cause

`app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` is declared
`"use client"` and loads its question via `useEffect` → `setQuestion`. Until
React hydrates and the effect fires, the server-rendered HTML contains only the
"読み込み中…" placeholder, with no `<h1>`, no question context, no essay text.
Googlebot and other crawlers that index the initial HTML see the placeholder and
treat the page as a soft-404.

## Affected URLs (production, 15 pages)

- /essays/sc/2023-spring/pm2/q1
- /essays/sc/2024-spring/pm2/q1
- /essays/sc/2025-spring/pm2/q1

Each detail page has 5 industries (it/finance/construction/healthcare/public),
but they share the same URL — the industry is selected via `useState`.

## Not affected (already server components)

- `/essays/sc` — `app/essays/[exam]/page.tsx` is already a server component with
  `generateMetadata` + `generateStaticParams`. HTML contains the question list.

## Data layer

- `lib/essays/load.ts` — pure synchronous getters over `SC_PM2_QUESTIONS` array
- `data/essays/sc/index.ts` — three questions (2023/2024/2025-spring/pm2/q1)
- No async I/O — fully compatible with server-side rendering at build time.

## Refactor plan

1. Remove `"use client"` from `[qnum]/page.tsx` and turn it into a server
   component:
   - Accept `params: Promise<RouteParams>` (Next 16 async params)
   - Validate exam/yearSeason/section/qnum; call `notFound()` on invalid input
   - Add `generateStaticParams()` to pre-render all valid combinations at build
   - Add `generateMetadata()` for title/description/canonical
   - Render header, question context, IPA citation, and AI CTA on the server
2. Extract industry-tab interactivity into a small client component
   `_components/EssayIndustryTabs.tsx`:
   - Receives `industries: SCEssayAnswer[]` as a serializable prop
   - Manages `selectedIndustry` via `useState`
   - Renders **all** industry essays in the HTML, hiding the inactive ones
     via the HTML5 `hidden` attribute so crawlers still see all 5 essays
3. No change to data files or sitemap; `lib/seo/sitemap-xml.ts` already lists
   these URLs.

## Acceptance criteria

- `curl /essays/sc/2025-spring/pm2/q1` returns initial HTML that includes the
  question theme, the question context, and at least one industry's essay body
  (序論/本論/結論).
- All 5 industries' essay content is present in the initial HTML.
- Industry tab switching still works after hydration.
- `pnpm build` shows the 3 detail pages prerendered as static (●) routes.
