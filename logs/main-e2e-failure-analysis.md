# main E2E failure analysis — 2026-05-21

## Root cause

All 11 failures trace to a single root cause:

`/q/ap/2009-spring/am/q1` returns HTTP 404.

`app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx` has:
- `export const dynamicParams = false;`
- `const SSG_MIN_YEAR = 2024;`
- `generateStaticParams()` only generates routes for `q.year >= 2024`

Because `dynamicParams = false`, any URL whose params were not pre-generated at build time
is rejected at the routing layer — Next.js returns 404 without calling the page component.

The test constant `QUESTION = "/q/ap/2009-spring/am/q1"` (year 2009) is outside the
SSG range, so the page is never built and always 404s.

## Fix applied

Updated 4 test files to use `/q/ap/2024-spring/am/q1` (and `q5` for QUESTION_MID):
- tests/e2e/user-journey-quiz.spec.ts
- tests/e2e/user-journey-bookmark.spec.ts
- tests/e2e/user-journey-copilot-rag.spec.ts
- tests/e2e/user-journey-mobile.spec.ts

2024-spring AP data exists at `data/questions/ap/by-year/2024-spring.ts` (80 questions,
no needsReview flags), so the new URL produces a valid 200 response.

## Why the test was written with 2009-spring

The comment "all 80 questions have no needsReview flag" suggests the test was written
before SSG_MIN_YEAR was raised to 2024. Once the cutoff was raised (likely to reduce
build time), the test URL fell outside the served range but was not updated.

## Conclusion

No implementation change needed. Test-only fix: update URL constants to 2024-spring.
