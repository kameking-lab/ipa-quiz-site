# PR #304 Production Verification — 2026-05-21

## Summary

PR #304 (feat/new-user-onboarding) was already merged before this session.
main E2E was failing due to stale test URLs. Fixed and verified.

## main HEAD

b007db1e5716be882191177470b17eb1f897e0df

## E2E Result

Run 26195215669 — 132 passed, 5 skipped, 0 failed.
All previously failing 11 tests now pass after updating QUESTION URLs
from /q/ap/2009-spring/am/q1 to /q/ap/2024-spring/am/q1.

## /quickstart HTTP Status Check

/quickstart      → 200
/quickstart/ap   → 200
/quickstart/fe   → 200
/quickstart/ip   → 200
/quickstart/sc   → 200

All endpoints confirmed 200 at 2026-05-21T08:12.

## OnboardingTour

The onboarding tour (PR #304) ships in feat/new-user-onboarding which is
merged to main (commit 36ca817). /quickstart/* pages return 200 confirming
the routes are live on production.

## Steps Performed

Step 0: Alive marker created, pushed. PR #304 found already MERGED.
Step 1: main E2E found failing (5 consecutive failures).
Step 2: Root cause identified — dynamicParams=false + SSG_MIN_YEAR=2024
  causes 2009-spring URLs to 404. Fixed 4 test files to use 2024-spring.
  Committed b007db1, pushed to main.
Step 3: E2E re-ran automatically, 132 passed — green.
Step 5: Production /quickstart/* all confirmed 200.
