# Qualification site quality fixes — 2026-09-12

## Implemented

- All 30 official answer keys in the 2025 spring common AM I paper compared across ST, SA, NW, SM and SC. Corrected questions 5, 6, 8 and 9 (20 answer records), with independently written explanations.
- Corrected the AM I Q1 fraction/termination explanation and Q4 CPU table and calculation. Restored Q3 stack and Q7 timing figures from the official PDF (figures only), Q10 SQL text, Q15 layer ordering, Q25 contract table. Corrected Q20 distractor reasoning and Q25 phase labels. The complete 30-question paper now passes the material-availability check across all five copies.
- SG 2025 Q9: transcribed table, corrected total respondents from 450 to 500 and average from 4.0 to 3.6, resulting in 0.9 (answer エ).
- Render registered imageUrls in practice and direct question pages. Shared material check excludes flagged figures without renderable assets, while allowing transcribed Markdown tables. Missing-material questions cannot be graded on their direct page or public grading API and cannot be served by the next-question API. Spaced review uses the same material check.
- Client-safe citation/related-header types and codecs isolated from server corpus/retrieval code. The full-corpus chunk remains for the intentional offline route; it is no longer referenced by the quiz client manifest.
- Removed production mock metrics response. Missing/unimplemented measurements are explicit `source: unavailable`, without a numeric summary, fabricated insights, or zero substitution. Range controls remain available. Complete real dashboard aggregation remains unimplemented.
- Year cards and year detail show section-specific counts; common-AM-I-only years explicitly state AM II is not included.

## Official sources inspected

- https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html
- https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_koudo_am1_qs.pdf (pages 4–16, specifically restored material on pages 4–9, 11–13, 15)
- https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07h_koudo_am1_ans.pdf (all 30 keys)
- https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/tbl5kb0000005r9r-att/2025r07_sg_qs.pdf#page=5

## Remaining, not claimed complete

- 2,124 raw records still have hasImage without imageUrls. This includes duplicated common questions and records with transcribed material; it is not a count of unique missing figures.
- Shared conservative material check excludes 2,157 raw records (including textual figure references without the flag). This is containment, not restoration of all assets.
- 146 explanation-pattern candidates remain from the prior 149-candidate machine scan. They require original-source review; the regex does not prove they are wrong.
- ST 2012–2019 AM II source ingestion, global legacy PDF URL repair, and true admin dashboard aggregation remain.
- No AI provider, prompt, model, quota or grading logic was changed. Header transport split is behavior-preserving; live AI Preview verification still required by repository instructions for the modified copilot client import path.
- Existing dirty BookmarkButton snapshot and unrelated untracked logs/assets were not part of this change.

## Validation

Initial production build, typecheck and lint passed. Initial unrestricted test parallelism produced six timeout failures and exposed the SG table case; after restoration, bounded-parallel suite and final build/browser results are recorded in the PR.
