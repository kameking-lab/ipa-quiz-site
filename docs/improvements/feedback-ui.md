# Feedback & Error Report UI

Implemented in PR: feat/feedback-and-error-report

## What was added

### UI
- `components/FeedbackButton.tsx` — floating "報告" button (fixed bottom-right, visible on /q/, /essays/, /blog/)
- `components/FeedbackModal.tsx` — modal dialog with 4 categories: 誤字/誤答/解説不足/その他, free text (800 chars), auto-attaches page URL and question ID

### API
- `app/api/feedback/route.ts` — POST endpoint with Zod validation, in-memory rate limit (5/min/IP), JSONL file storage at `data/feedback/<YYYY-MM-DD>.jsonl`

### Admin
- `app/admin/feedback/page.tsx` — protected by existing Basic Auth middleware, lists all received feedback, supports `?format=csv` for CSV export

### Mount points
FeedbackButton is mounted globally via `DeferredLayoutWidgets` (loaded after first paint). It uses `usePathname` to conditionally render on matching paths:
- `/q/*` — individual question pages
- `/essays/*` — essay question pages
- `/blog/*` — blog article pages

## Rate limits
- 5 requests/minute/IP (independent from AI copilot limits)
- Returns HTTP 429 on excess with user-friendly message in modal
