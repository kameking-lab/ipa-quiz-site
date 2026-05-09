# SEO OGP & Sitemap Fix — Progress Log

Branch: fix/seo-ogp-and-sitemap

## Investigation Summary (session 2026-05-09)

### Issue 1: mock-exam OGP
- `app/mock-exam/page.tsx` uses **static** `metadata` export with NO `openGraph.images`
- Fix: replace with `generateMetadata`, add `/api/og?type=mock-exam&title=<examLabel>` image
- Also add `mock-exam` type to `TYPE_META` in `app/api/og/route.tsx`

### Issue 2: blog OGP
- `app/blog/[slug]/page.tsx` `generateMetadata` already builds OGP URL with title ✓
- Root cause: `/api/og/route.tsx` has NO Japanese font loaded → Japanese titles render as boxes
- Fix: load Noto Sans JP 700 WOFF from `/fonts/noto-sans-jp-700.woff` (added to public/)

### Issue 3: sitemap missing /essays/sc
- `lib/seo/sitemap-xml.ts` `STATIC_ROUTES` and `renderMainSitemapXml()` don't include essays
- Fix: add `getEssayRoutes()` using `SC_ESSAY_EXAM_CODES` + `getSCpm2Questions()`

## Files Changed

- `public/fonts/noto-sans-jp-700.woff` — ADDED (1.4MB, Japanese font)
- `app/api/og/route.tsx` — add font loading + mock-exam type
- `app/mock-exam/page.tsx` — static→dynamic generateMetadata + OGP
- `lib/seo/sitemap-xml.ts` — add getEssayRoutes()

## Progress

- [x] Investigation complete
- [x] Font downloaded to public/fonts/
- [ ] app/api/og/route.tsx patched
- [ ] app/mock-exam/page.tsx patched
- [ ] lib/seo/sitemap-xml.ts patched
- [ ] typecheck + build pass
- [ ] PR created
- [ ] main merged
- [ ] Production verified
