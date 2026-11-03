# Safety exam learning release

Destination: https://www.kakomon-ai.jp/e-learning/exams only. Safe AI is a source workspace, not a deployment target.

78 official published papers, 1,972 questions and 2,075 question images. Of these, 1,508 questions use official answer marks for grading; 360 are unconfirmed and 104 descriptive/reference questions are never automatically graded. The 74 authored AI learning explanations are loaded by question ID and clearly distinguished from official answers. More explanations remain editorial work, not fabricated filler.

The player supports question selection, wrong-answer retry, readable mobile text/original figure switching and optional device storage. Dates distinguish publication months from actual exam dates. Source PDF links preserve page and original question number.

Verification: production build, TypeScript and scoped lint passed. Full suite initially had one timeout in sitemap metadata imports while building concurrently; that suite passed alone in 6.84s, and a full isolated rerun is recorded in logs/safety-tests-final.log. Real Chromium mobile/desktop check passed grading, retry, no default persistence, opt-in resume, unconfirmed/descriptive flows and invalid-ID 404. Data validation found no missing images or invalid official keys. See safety-exams-data-review.md for limits of automated validation.

Import snapshot scripts require Python pdfplumber, pypdf, lxml and Pillow; they are manual maintenance tools, not a runtime dependency. Run the discovery snapshot then importer in a clean branch and review the diff before release. Cached raw PDFs are local only. `node scripts/validate-safety-exams.mjs` validates deployable assets without downloading or writing.

Publishing and the verified note article link are recorded after release. Note manuscript is in the note-automation repository reports/state-2026-09-11/safe-exam-learning directory. Post only after the production catalog responds successfully. No paid API, provider or budget settings changed.

## Published evidence

- Feature merged as PR #482, main a5bf79f9427726027e83bf766f3891e61b7d3380.
- Production deployment dpl_DTeJjALQfzV2ozs5wt2BB7s8WGNz READY. All78 public URLs and representative images passed; real production browser flows passed.
- CI: 2,443 unit tests and 172 E2E tests passed (5 pre-existing skips). The clean local full rerun also passed all331 files.
- Free note: https://note.com/anzen_ai_jp/n/ne1975ac75e4a (published 2026-09-11). Owner/public API verification confirmed identity, free price0, cover, body, all4 expected URLs and one history entry. Receipt lives in note-automation/reports/state-2026-09-11/safe-exam-learning/receipts/.
- Related guide data is shared by the catalog and every exam's source panel. Its title, public200 and backlink were independently reviewed. Final link deployment is checked after merge.
- Safety AI portal /e-learning/exams still returns404; it was not deployed by this task.
