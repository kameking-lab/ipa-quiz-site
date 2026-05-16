# IndexNow Bulk Submit — 2026-05-16

## Status: PENDING DEPLOYMENT

The production deployment needs to be updated before IndexNow submission can proceed.
Both INDEXNOW_KEY and INDEXNOW_ADMIN_TOKEN were set in Vercel on 2026-05-16.
The API endpoint (/api/indexnow) requires a redeploy to pick up the new env vars.

---

## URLs prepared for submission

Total unique URLs: 4136

Breakdown:
- main.xml (home/modes/topics/glossary/keywords): 38
- exams.xml (13 exams × year/season pages): 463
- blog.xml (blog articles): 116
- essays.xml (essays index + detail pages): 14
- topics.xml (topic pages): included
- books.xml (recommended books): included
- questions (2024-2025 only, priority): ~2348 (2341 from q/1.xml + 2024/2025 from q/0.xml)

---

## What changed since last IndexNow submission (triggering new submission)

New pages added (not previously indexed):
- /essays/st, /essays/sa, /essays/pm, /essays/sm, /essays/au (5 new essay index pages)
- /essays/st/..., /essays/sa/..., /essays/pm/..., /essays/sm/..., /essays/au/... (detail pages)
- /blog/*.* (new articles added in last 30 days, ~10 posts)
- /keywords/* (new keyword pages)

Structured data changed (re-indexing beneficial):
- /[exam] pages (13 exams): Course + HowTo added (PR #217)
- /blog/[slug] pages: LearningResource + HowTo added (PR #225)
- /essays/[exam] pages: CollectionPage + LearningResource added (PR #225)
- /essays/.../[qnum] pages: Article + LearningResource added (PR #225)
- /q/[exam]/... pages: educationalLevel field updated (this PR)

Deleted routes (404 - should be removed from index):
- /launch (brand inconsistency - PR #231 flagged)
- /analytics (mock data exposure - PR #231 flagged)
Note: These are pending cleanup in a separate dispatch.

---

## Submission procedure (post-deployment)

1. Wait for Vercel to deploy the merged chore/seo-final-polish PR
2. Verify key file is accessible: curl https://www.kakomon-ai.jp/indexnow-key.txt
3. Get INDEXNOW_ADMIN_TOKEN from Vercel: vercel env pull (from linked project dir)
4. Run: ADMIN_TOKEN=<token> bash /tmp/indexnow_submit.sh /tmp/indexnow_urls.txt
5. Verify submission results in Bing Webmaster Tools or Google Search Console

---

## Submission results

Status: SKIPPED — production deployment not yet updated (env vars set but redeploy needed)
URLs submitted: 0
Reason: INDEXNOW_ADMIN_TOKEN set in Vercel but serverless function needs redeploy to read it.
         Key file (/indexnow-key.txt) returns 404 until deployed code picks up INDEXNOW_KEY.

After PR merge + Vercel deployment:
- Expected submission: 4136 URLs in ~9 batches of 500
- Priority: essays, blog, exam pages (structured data changes)
