# Safety exam learning release

Destination: https://www.kakomon-ai.jp/e-learning/exams only. Safe AI is a source workspace, not a deployment target.

78 official published papers, 1,972 questions and 2,075 question images. Of these, 1,508 questions use official answer marks for grading; 360 are unconfirmed and 104 descriptive/reference questions are never automatically graded. The 74 authored AI learning explanations are loaded by question ID and clearly distinguished from official answers. More explanations remain editorial work, not fabricated filler.

The player supports question selection, wrong-answer retry, readable mobile text/original figure switching and optional device storage. Dates distinguish publication months from actual exam dates. Source PDF links preserve page and original question number.

Verification: production build, TypeScript and scoped lint passed. Full suite initially had one timeout in sitemap metadata imports while building concurrently; that suite passed alone in 6.84s, and a full isolated rerun is recorded in logs/safety-tests-final.log. Real Chromium mobile/desktop check passed grading, retry, no default persistence, opt-in resume, unconfirmed/descriptive flows and invalid-ID 404. Data validation found no missing images or invalid official keys. See safety-exams-data-review.md for limits of automated validation.

Import snapshot scripts require Python pdfplumber, pypdf, lxml and Pillow; they are manual maintenance tools, not a runtime dependency. Run the discovery snapshot then importer in a clean branch and review the diff before release. Cached raw PDFs are local only. `node scripts/validate-safety-exams.mjs` validates deployable assets without downloading or writing.

Publishing and the verified note article link are recorded after release. Note manuscript is in the note-automation repository reports/state-2026-09-11/safe-exam-learning directory. Post only after the production catalog responds successfully. No paid API, provider or budget settings changed.
