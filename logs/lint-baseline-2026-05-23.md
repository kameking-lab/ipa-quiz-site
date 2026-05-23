# Lint baseline before this PR — 2026-05-23

main HEAD: 3ec948d3 (post PR #312 merge).

`pnpm lint` output before any fix in this branch:

```
/home/user/ipa-quiz-site/app/[exam]/page.tsx
  9:18  warning  'SITE_ID' is defined but never used  @typescript-eslint/no-unused-vars

/home/user/ipa-quiz-site/app/admin/deployment-status/page.tsx
  177:9  error  Do not use an `<a>` element to navigate to `/admin/deployment-status/`. Use `<Link />` from `next/link` instead.  @next/next/no-html-link-for-pages
  (same error repeated 4 times — possibly cached)

/home/user/ipa-quiz-site/app/my-progress/MyProgressClient.tsx
  34:28  warning  'readDailyGoalTarget' is defined but never used
  34:71  warning  'DEFAULT_DAILY_GOAL' is defined but never used

/home/user/ipa-quiz-site/app/page.tsx
  14:10  warning  'ORG_ID' is defined but never used
  14:27  warning  'SITE_LOGO_IMAGE' is defined but never used

/home/user/ipa-quiz-site/scripts/verify-production.mjs
  9:10  warning  'join' is defined but never used

/home/user/ipa-quiz-site/tests/e2e/user-journey-bookmark.spec.ts
   4:7   warning  'BASE_URL' is assigned a value but never used
  67:11  warning  'count' is assigned a value but never used

✖ 12 problems (4 errors, 8 warnings)
```

## Fixes applied in this PR (no behavior change)

- `app/admin/deployment-status/page.tsx`: replace internal `<a>` refresh
  button with Next `<Link>` (same href, same className).
- `app/[exam]/page.tsx`: drop unused `SITE_ID` from import.
- `app/page.tsx`: drop unused `ORG_ID`, `SITE_LOGO_IMAGE` from import.
- `app/my-progress/MyProgressClient.tsx`: drop unused `readDailyGoalTarget`,
  `DEFAULT_DAILY_GOAL` from import.
- `scripts/verify-production.mjs`: drop unused `join` import.
- `tests/e2e/user-journey-bookmark.spec.ts`: drop unused `BASE_URL`
  constant, drop unused `count` assignment (still calls
  `bookmarkEl.count()` for the side effect of selector resolution).

## After

`pnpm lint` → 0 errors / 0 warnings.
`pnpm typecheck` → green.
`pnpm build` → green.

## Remaining items

None. All warnings/errors enumerated above are addressed.
