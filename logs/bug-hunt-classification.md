# Bug Hunt — Classification

Date: 2026-05-17  
Branch: fix/comprehensive-bug-hunt

## Triage outcome

### 致命 (Critical) — to fix this PR

(none)

### 高 (High) — to fix this PR

1. **404 page links to non-existent `/exam/{code}` route**
   - File: app/not-found.tsx:75
   - Verified: `app/exam/` does not exist; exam route is `app/[exam]/` so URL is `/{code}`
   - User impact: click exam chip on 404 → another 404 → user dead-ends
   - Fix: change `href={`/exam/${code}`}` → `href={`/${code}`}`

2. **"続きから 問N+1" link 404s on last question of session**
   - File: components/ContinueFromLast.tsx:46-47
   - Verified: `nextQNumber = last.qNumber + 1` with no session-boundary lookup; question page returns 404 if not found
   - User impact: user finishes a session → returns home → primary CTA leads to 404
   - Fix: link to `lastHref` (the question they were last on) with text "前回の続き 問{lastQNumber} を再開"

### 中 (Medium / Security) — to fix this PR

3. **essay-grade leaks raw upstream error to client**
   - File: app/api/essay-grade/route.ts:336-338
   - Verified: `err.message` interpolated into `overallAdvice` shown to user; can leak provider/env-internal details
   - User/security impact: information disclosure; ugly UX
   - Fix: log full error server-side, return generic message to client

## False positives / out-of-scope

| Item | Why skipped |
|---|---|
| Empty quiz pool crash (naive #2) | False positive — line 257 already handles `total===0` |
| Mobile bottom-nav overlap | Already mitigated by `h-20` spacer; speculative |
| `/essays/{non-essay}` UX | `notFound()` is correct behavior |
| ContinueFromLast truncate | Cosmetic; `truncate` is intentional |
| XFF spoofing (malicious #1) | Vercel-platform constraint; no actionable code change without env migration |
| `x-feedback-submitted` bypass (malicious #2) | **By design** per CLAUDE.md (educational free tier); changing requires owner approval |
| Email-list "path traversal" (malicious #3) | `EMAIL_LIST_DIR` is operator-controlled env, not user input |
| Middleware "info leak" 503 | Intentional dev aid; opaque 401 would hide misconfig from operator |
| Cron endpoint unprotected | Already conditionally auth'd (line 88) and read-only probe |
| In-memory bucket growth | Has 10-min sweep; acceptable |
| Sheet missing aria-modal | Radix DialogPrimitive sets it automatically |
| QuizPlayer timer aria-live | Would announce every second → SR noise; do NOT add |
| Various low-severity copy/markup nits | Cosmetic; defer |

## Plan

3 single-bug commits → typecheck/lint/build → PR → merge.
