# E2E Pre-existing Failures Analysis

CI run analyzed: https://github.com/kameking-lab/ipa-quiz-site/actions/runs/25977027685
Branch: main (commit 8e1b2dd "feat(pwa): offline support — /offline shell + scoped runtime caches")

## Summary

All 5 failures share the same symptom: HTTP requests to URLs that should return 404 are returning 200 instead.

The page handlers all call `notFound()` correctly when the data is missing, so the bug appears to be downstream — likely in how Next.js 16 serves these dynamic routes.

| # | Test | URL | Expected | Received |
|---|------|-----|----------|----------|
| 1 | user-journey-blog.spec.ts:23 — nonexistent blog slug returns 404 | `/blog/this-slug-does-not-exist-xyz-abc-123` | 404 | 200 |
| 2 | user-journey-essays.spec.ts:22 — nonexistent essay returns 404 | `/essays/sc/2025-spring/pm2/q99` | 404 | 200 |
| 3 | user-journey-essays.spec.ts:27 — nonexistent year returns 404 | `/essays/sc/1999-spring/pm2/q1` | 404 | 200 |
| 4 | user-journey-quiz.spec.ts:28 — nonexistent question returns 404 | `/q/ap/2009-spring/am/q9999` | 404 | 200 |
| 5 | user-journey-quiz.spec.ts:33 — needsReview question returns 404 | `/q/fe/2019-spring/am/q5` | 404 | 200 |

## Classification

All 5 are **(d) real bugs** — not flaky, not data-dependent, not selectors. The app is serving 200 when it should serve 404.

- Not flaky: tests fail with retry too
- Not data-dependent: the missing data IS the test condition
- Not UI selectors: these are `request.get()` HTTP status checks, not DOM probes

## Root-cause hypothesis

Three different dynamic routes, all using `notFound()` correctly:
- `app/blog/[slug]/page.tsx` — `if (!post) notFound();`
- `app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` — calls `notFound()` after fallback redirect attempt
- `app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` — `if (!question) notFound();`

CI WebServer log shows `[WebServer] Error: Internal: NoFallbackError` repeatedly during the test run. This Next.js 16 internal error suggests the framework's dynamic-route fallback handling is misbehaving — possibly returning the rendered page body with a 200 status instead of the 404 status that `notFound()` should emit.

## Fix plan

1. **Reproduce locally** with `pnpm build && pnpm start` then curl the 5 URLs to confirm status codes.
2. **If notFound() truly returns 200**, the fix is to add an explicit fallback that throws `notFound()` BEFORE any render — likely by tightening the `dynamicParams` strategy or by adding a per-route `not-found.tsx` so Next.js routes correctly.
3. **Verify all 5 tests pass** locally 3 times in a row.
