# Core Web Vitals Measurement — 2026-05-16

Measured against production: https://www.kakomon-ai.jp
Tool: Lighthouse 13.3.0 (mobile, headless Chrome)
Note: production is 114 commits behind main HEAD (pre-PR #229 bundle reduction)

---

## Results (before this PR's fixes)

### Home page (/)

Performance score: 78 / 100
FCP: 1.1s (Good - 0.99)
LCP: 2.6s (Needs Improvement - 0.87, threshold: 2.5s Good)
TBT: 700ms (Poor - 0.42, threshold: 200ms Good)
CLS: 0 (Good - 1.0)
Speed Index: 3.3s (Good - 0.9)
TTI: 4.7s (Good - 0.8)

Primary bottleneck: TBT 700ms
Root cause: 25MB client JS bundle (pre-PR #229) — 9 long tasks, largest 523ms
Script evaluation: 2647ms for main page JS, 820ms for 0pfisc66qo9e..js chunk
Unused JS: 83KB (surveys.js 27KB external, Next.js chunks 56KB)

### Question page (/q/ap/2024-spring/am/q1)

Performance score: 89 / 100
FCP: 1.3s (Good - 0.98)
LCP: 3.7s (Needs Improvement - 0.59, threshold: 2.5s Good)
TBT: 90ms (Good - 0.99)
CLS: 0 (Good - 1.0)
Speed Index: 2.9s (Good - 0.95)
TTI: 3.9s (Good - 0.89)

LCP bottleneck: render-blocking CSS 157ms, then question text renders as LCP element
Unused JS: 89KB (surveys.js 27KB + Next.js chunks)

### AP exam page (/ap)

Performance score: 88 / 100
FCP: 1.2s (Good - 0.99)
LCP: 3.8s (Needs Improvement - 0.55)
TBT: 40ms (Good - 1.0)
CLS: 0.018 (Good - 1.0)
Speed Index: 2.7s (Good - 0.96)
TTI: 3.8s (Good - 0.89)

Server response: 10ms (excellent)

---

## Issues identified

CRITICAL (home page only):
  TBT: 700ms — 25MB bundle (pre-PR #229). Deploy PR #229 to production to fix.

MODERATE (all pages):
  LCP: 3.7-3.8s on question/exam pages — above 2.5s Good threshold
  Contributing factors: render-blocking CSS 157ms + large text LCP element

MINOR:
  Redundant preconnect to fonts.googleapis.com/fonts.gstatic.com
  (fonts are self-hosted via next/font/google — preconnect not needed)
  PostHog uses dns-prefetch but not preconnect

---

## Fixes applied in this PR

1. Removed preconnect to fonts.googleapis.com + fonts.gstatic.com
   Rationale: Geist font is self-hosted by Next.js; these connections were wasted.
   File: app/layout.tsx

2. Added preconnect for us.i.posthog.com
   Rationale: Upgrade from dns-prefetch to preconnect for faster analytics init.
   File: app/layout.tsx

---

## Expected improvement after PR #229 deployment

TBT (home): 700ms -> estimated <200ms
  Bundle reduction: 25MB -> 4MB (-86%)
  Long task at 523ms should break into smaller tasks

LCP (all pages): marginal improvement from reduced script parsing
  LCP is text-based so improvement will be limited

After PR #229 deploys:
  Home page score: estimated 78 -> 88-92
  Question page score: 89 -> 90-92 (unchanged TBT, slight LCP improvement)
  AP page score: 88 -> 88-90

---

## Current known deployment gap

Production at: ce043dccd4 (PR #203, 2026-05-16T01:20 UTC)
Main HEAD at: 8674588 (PR #234, 2026-05-16T10:51 UTC)
PRs not deployed: #204-#234 (30 PRs including critical PR #229)

Action required: trigger new Vercel production deployment from main HEAD
