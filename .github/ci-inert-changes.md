# Audit-only build applicability

This is a conservative opt-out from application build/browser work, not a result
reused from an earlier head. The existing quality job always runs lint, TypeScript,
unit tests and both source validators. The browser job always runs scope regressions
and proves applicability for the current checkout. The required e2e gate still
requires both jobs to succeed and rejects failure, skip and cancellation.

Eligible changes are ordinary, non-executable .md/.json/.jsonl/.txt/.csv files
under reports/, docs/evidence/ or docs/candidates/. Every other path runs the full
suite, including data/prepared-*, question data, images/PDFs, tests, loaders, UI,
dependencies and workflows. Symlinks, mode changes, unknown/empty diffs and missing
history run the full suite. Deleted ordinary records can qualify; moves to or
from application paths cannot.

## Dependency audit

Audited base: 7b2a4ce744e061bfb4f74f7a7badfa67d460f3ec (2026-10-11).
The audit JSON pins Git blobs, not checkout line endings, of build/package
configuration and possible filesystem/dynamic import/record consumers.

- package.json runs next build and prisma generate after install. Corpus import
  and source transformation scripts are separate manual commands.
- tsconfig.json includes all TS/TSX/MTS files; prepared code therefore remains
  build input even when not imported by a published route.
- next.config.ts traces data/exam-library/papers and presentation JSON.
- lib/exam-library-papers.ts reads only catalog-gated IDs in those data paths.
- lib/ai/cost-tracker.ts uses logs/api-cost.json, which is outside the allowlist.
- app/api/email-list/route.ts uses .data/email-list.jsonl (or its configured store);
  it does not import repository audit records.
- data/questions/denko2/latest.ts translates an evidence figure path to an existing
  public image URL; it does not read docs records. Both source/public assets remain
  full-build changes.
- Other record paths in runtime source are receipt comments. Current dynamic
  imports resolve application/data/package modules. Prepared validator/render
  tools are not invoked by the application build.

The consumer scan deliberately overmatches quoted record/manual-script paths,
filesystem/child-process modules, dynamic imports, cwd/import.meta and code
evaluation. A new, removed or changed matching code file or build config disables
the exemption until another dependency audit updates the checked-in blobs.
The scan is a conservative drift guard for this audited dependency model, not a
general JavaScript dependency resolver. Reviewers introducing a new build entry,
loader, runtime root or encoded/dynamic resource mechanism must re-audit scope.

## Diff boundaries and preview behavior

GitHub compares PR base SHA to the current synthetic merge SHA, never only the
last commit. Main pushes always build. Each PR retains the existing concurrency
group and cancellation policy from #749; no permissions are added.

Vercel ignoreCommand runs without package installation. Production/non-preview
always continues. Preview compares the current checkout to VERCEL_GIT_PREVIOUS_SHA,
the last successful deployment on the same branch. First previews, unavailable
history, non-ancestor history and same-SHA redeploys continue. There is no HEAD^
fallback. Exit 0 ignores only a proven audit-only preview; exit 1 builds.

Ignored builds still create canceled deployments and consume Vercel deployment
quotas/concurrent slots. This saves application build work, not deployment quota.
No Vercel account settings, credentials, production routing or cron were changed.
System variables and behavior:
https://vercel.com/docs/environment-variables/system-environment-variables
https://vercel.com/docs/project-configuration/vercel-json#ignorecommand
https://vercel.com/docs/project-configuration/project-settings#ignored-build-step

## Observed baseline

Frozen last-80 E2E sample, 2026-10-11 03:28:26–07:27:24 UTC:
67 success, 7 canceled, 5 failed, 1 active; duplicate same-SHA runs: 0.
26 branches had 40 additional head runs; these are not all unnecessary.
In 12 job samples, runner wait median was 2s (max 25s), build median 4:52.
Six successful parallel-browser samples had median 9:03.5.

Nine successive-head comparisons include two pure docs-record updates:
38120440445 (dental evidence) and 38121327253 (sharoushi candidates).
Their cumulative PRs still contain application changes: the sampled latest
100 PRs include zero fully eligible audit-only PRs. Thus GitHub savings apply
to future eligible PRs; these two incremental updates are preview candidates
only if successful-deployment history and the dependency audit match.

PR #755 required workflow/prepared-code changes, so it must keep the full suite.
Its visible Vercel status completed 8:34 after the associated CI run was created;
this is observed latency, not isolated build or queue duration. Billing and
Vercel queue components were unavailable; no monetary savings are asserted.
