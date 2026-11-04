# KPERF1 — local production performance evidence

Base: `6bdf0f746` (`feat/grow-c-20261105`). Worktree: `C:/Users/kanet/20260522/wt-perf-k`.

## Reproduce

Use Node 22+ and the pinned pnpm version (`corepack pnpm`). No `.env` files or production credentials are required. Do not load production DB credentials.

```powershell
corepack pnpm install --frozen-lockfile
npm install --prefix .cache/perf-tools --no-audit --no-fund lighthouse@12.8.2
corepack pnpm build
node scripts/kperf1-server.mjs 3107
# Separate terminal, same worktree:
node scripts/kperf1-measure.mjs before
# After changes, rebuild/restart the same local server:
node scripts/kperf1-measure.mjs after
```

Raw Lighthouse JSON and first-sample screenshots: `.cache/kperf1/{before,after}/`. Runs resume only when build ID, script hash, browser version and measurement configuration match; use a fresh phase name for a complete rerun. The dedicated `next start` launcher permits only OS environment variables and refuses `.env` files, preventing production credential inheritance. The harness verifies its server manifest and build ID, refuses non-local origins and blocks cross-origin browser requests.

## Method

- Lighthouse 12.8.2; mobile 390×844, DPR 1; default simulated mobile network/CPU; 3 fresh Chromium launches per route. No browser cache is reused between samples. Onboarding is completed; history has 2,000 wrong answers and a starred AP question so review is populated.
- Six states: home, AP qualification, AP 2023 spring morning player, the same player with explanation open, populated review player, and `it-shikaku-rirekisho-kakikata` article with one-question practice. Explanation is measured as navigation followed by an answer within the Lighthouse navigation callback: its LCP/score describe the full load, not a new page navigation on answer.
- Playwright: 390×844 touch viewport, CDP CPU slowdown 4×, service workers blocked; 10 fresh contexts per quiz/blog × empty/2,000-entry history. Each sample waits for a usable choice, scrolls it into view, then taps it. Native `pointerdown.timeStamp` → explanation DOM insertion → two animation frames estimates first presentation, including input delay before the pointer handler. This is a lab proxy, not display hardware timing. Use an 8 ms tolerance when matching quantized Event Timing timestamps; measuring from handler `performance.now()` would incorrectly discard delayed events.
- Event Timing: maximum reported interaction duration for the answer tap, threshold 16 ms. Missing entries are `null` (below observation threshold / unavailable), never a claimed 0 ms. This is a single-interaction lab INP proxy, **not field INP / CrUX p75**. Lighthouse navigation TBT is reported separately.
- Additional 10-sample, 2,000-history-entry Event Timing actions: open the mobile menu on home and qualification, answer in review, and toggle review registration with explanation open. These actions define each screen's lab proxy; they are not claimed to measure an entire navigation or the page's field INP. Event Timing uses 8 ms duration granularity ([W3C draft](https://www.w3.org/TR/event-timing/)).
- Also record JS transfer/decoded bytes, scripts, third-party hostnames, font/image counts, URL continuity, answer API calls, persisted history and horizontal overflow. Static-answer interaction must not invoke AI.
- Local build has no PostHog/Sentry keys; the existing editorial gate has no ad-eligible articles. Cross-origin requests are blocked identically in both phases. Therefore live ad/analytics cost cannot be inferred from these scores; deferred ad behavior needs regression tests. No ad eligibility, ad slot IDs/counts, or production settings are changed.

Final requested report: `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/kperf1-report.md`.
