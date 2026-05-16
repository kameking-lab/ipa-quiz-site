# Bug Hunt — Malicious User Perspective

Date: 2026-05-17  
Branch: fix/comprehensive-bug-hunt  
Method: Static code review only. NO live payloads executed.

## Findings

### 高 (High)

- **X-Forwarded-For trust in getClientIp** — lib/rate-limit/server.ts:113-119
  - Leftmost XFF used as client IP. On Vercel this is correct (Vercel sets XFF and edge prepends real IP). Not actionable unless we move off Vercel — keep as **観察**.

- **x-feedback-submitted client header lifts daily quota to 9999** — lib/rate-limit/server.ts:122-124
  - **By design** per CLAUDE.md (educational free tier; changing requires approval). DO NOT touch.

- **Email-list path-traversal risk if EMAIL_LIST_DIR is attacker-controlled** — app/api/email-list/route.ts
  - Need to confirm — verify below.

### 中 (Medium)

- **Admin middleware leaks "auth not configured" on missing env** — middleware.ts:42-47
  - 503 message reveals existence + env-var names. Fix: opaque 401.

- **essay-grade may interpolate raw error message** — app/api/essay-grade/route.ts
  - Need verification.

- **No Content-Length pre-check on JSON parse** — app/api/contact/route.ts and others
  - Large payloads consume memory before zod rejects. Soft issue.

### 観察 (Observation)

- In-memory rate-limit buckets grow until 10-min sweep — acceptable
- CSP allows `'unsafe-inline'` scripts (theme bootstrap) — documented, mitigated by `object-src 'none'`, `frame-ancestors 'none'`

## Out-of-scope-for-fix

Items requiring product-owner approval (per CLAUDE.md "10. 承認必須事項"):
- feedback-flag bypass design
- rate-limit threshold changes
- payment / Stripe wiring
