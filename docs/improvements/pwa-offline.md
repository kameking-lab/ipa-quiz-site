# PWA Offline Support

Status: implemented in `feat/pwa-offline-support` (2026-05-17)
Goal: 電車内・通勤中でも問題演習可能にする。

## What shipped

| Area | Change |
| --- | --- |
| `public/manifest.webmanifest` | Added `scope`, `id`, `lang`, `dir`, `categories`, `display_override`, three shortcuts (ランダム / 復習 / オフライン) |
| `app/layout.tsx` | Added `appleWebApp` metadata block (iOS standalone + status bar) and apple-touch icon |
| `public/sw.js` | Rewrote cache strategy: cache-first static, stale-while-revalidate for `/q/* /essays/* /blog/*`, network-first elsewhere, `/offline` fallback for navigations |
| `app/offline/page.tsx` | New offline shell page, precached by SW on install |
| `components/offline/OfflineHome.tsx` | Client-side list of bookmarked + recent questions, online/offline status badge |
| `components/offline/OfflineIndicator.tsx` | Bottom-pinned toast shown when `navigator.onLine === false` |
| `components/DeferredLayoutWidgets.tsx` | Lazy-mounts the offline indicator on idle so it stays off the LCP path |
| `components/ServiceWorkerRegistration.tsx` | Listens for `updatefound` and posts `SKIP_WAITING` so deploys take effect on the next navigation |
| `tests/e2e/pwa-offline.spec.ts` | Playwright assertions for manifest fields, SW headers, `/offline` route, apple meta tags |

## Cache strategy summary

| Path | Strategy | Cache | Cap |
| --- | --- | --- | --- |
| `/_next/static/*`, `/fonts/*` | Cache-first | `ipa-quiz-static-<ver>` | n/a (immutable) |
| `/q/*`, `/essays/*`, `/blog/*` | Stale-while-revalidate | `ipa-quiz-content-<ver>` | 100 entries |
| Other navigations (`/`, `/about`, `/modes/*`, ...) | Network-first → cache → `/offline` | `ipa-quiz-pages-<ver>` | 50 entries |
| `/api/*` | Bypass (never cached) | – | – |

Precached on install: `/`, `/about`, `/modes/year`, `/modes/topic`, `/offline`.

## What is intentionally NOT shipped

- **No serwist / next-pwa dependency.** The existing hand-rolled `public/sw.js`
  already handles the same lifecycle and a recent security review (PR #16,
  #223) tuned its cache-busting. Adding a build-time plugin would invalidate
  that hardening for no functional gain at this scale.
- **No bundled `data/questions/index.json`.** Question data is already imported
  into JS chunks (`data/questions/*`) which are content-hashed and served from
  `/_next/static/`, so the cache-first rule above gives us full offline question
  data automatically. Shipping a duplicate JSON would double the bundle.
- **No Lighthouse CI gate.** Lighthouse score >= 90 is the verification target
  but not wired into CI in this PR — run `npx lighthouse <preview-url> --only-categories=pwa`
  against the Vercel preview after merge.

## Verification

```
pnpm typecheck
pnpm build
pnpm playwright test tests/e2e/pwa-offline.spec.ts
```

Manual: load the site, open DevTools → Application → Service Workers, click
"Offline", reload `/`, navigate to a previously-visited `/q/...` page, then
to `/offline`.
