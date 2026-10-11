# Kakomon AI quality repair — 2026-10-11

Base: `08d2b261a6c3616c4da3d85fc2f970d765bebb72`. Scope: application, public explanation context, existing learning articles, source disclosure and SEO. Question-authoring candidates and question-data ownership are untouched. No production publication or AdSense application change is part of this draft.

## Findings and implementation

| Finding after comparing prior recovery reports, current main and production | Change |
| --- | --- |
| 26 frequent-topic/analysis articles largely repeated generic revision advice | Retain 13 established guide URLs; replace bodies with 26 existing official-question worked examples, wrong-choice comparisons and independent checks. Consolidate 13 analysis URLs with explicit 301s. |
| Year-list HTML did not expose ordinary links to static explanations | Add separate solve/read links for practice-ready originals. Keep original canonical routes and all published qualifications. |
| Normal-mode switch dropped the exact question and paper parameters | Carry year, season and question into the normal quiz; review/weakness still select their own eligible history pools. The existing static-page exact-question CTA was already fixed in main and is preserved. |
| Non-IPA topics inherited IPA syllabus/learning-path language; generic tips and edition tags produced irrelevant recommendations | Use qualification context, omit unsupported tips, and exclude edition/session/figure markers from cross-qualification subject matching. |
| Official problem/key/answer-sheet/figure/law links looked like interchangeable evidence for all explanation claims | Label document roles separately; keep independent solutions and diagrams distinct from official originals. |
| Global editorial disclosure did not specify actual confirmation scope | Publish five bounded observations from the independent production AI review delivered 2026-10-11, with what was and was not checked; link static explanations directly to this section. No all-question human or expert review claim. |
| Operator, statistics, optional account history and IP-retention descriptions disagreed | Use the existing public operator handle; show home totals and common-registry totals as separate units; describe anonymous local history, optional account sync and actual IP-based rate-limit KV keys with up-to-48h expiration. Remove unverified historical cost/achievement/funding claims and missing-as-zero monthly points. |
| Qualification hubs had unconditional ad slots and reuse conditions were unclear | Remove hub slots. Retain existing exact-body/source review gate for blog ads without adding review approvals. Publish dated provider-specific reuse findings and unresolved evidence requirements. |

## Evidence boundaries

- `url-decisions.json`: all 26 affected article URLs and their keep/rewrite/301 decisions.
- `source-check.json`: 26 worked-example IDs, exact canonical problem URLs, expected answer symbols and 28 source URLs. 26 PDFs were fetched/read and hashes recorded; 24 examples were checked against the official question and key. Scanned question pages were rendered and visually read. The two 2024 IP examples agree with the current corpus but their primary PDFs were blocked in this execution environment; independent primary-source confirmation is still required before publication.
- Initial structural corpus audit: 22,879 registered questions, 21,144 practice-ready. No ready question with an explicit full-coverage claim had missing choice reasons; no local figure path was missing. Missing legacy coverage labels and a broad figure-reference regex are not evidence that every flagged question is defective. This is a structural check, not an all-corpus accuracy review.
- The parent provided an independent Astra review of production (13:53–14:05 UTC). Its five representative observations are bounded in `data/editorial-review-scope.ts`. That review predates this patch and is **not** approval of the changed version.

## Re-review and publication blockers

1. Independent Astra review of the exact final commit, including 13 rewritten articles, all 13 redirect/canonical/sitemap decisions, mobile learning flows and disclosure consistency.
2. Confirm IP 2024 question 1/3 against official primary question and answer PDFs. Network blocking was not worked around.
3. FP3 2026 published gakka q11 is still incorrectly categorized as risk management in `data/questions/fp3/academic-2026-05.json`; its official-source-based classification belongs to the data owner. This draft does not edit owned question data. Review the rest of that paper for the same classification pattern before claiming the issue solved.
4. Electric-exam reuse contact completion, provider-specific reuse evidence and individual third-party figure rights are unconfirmed. `/license` distinguishes these from conditions already read; it does not assert blanket permission.
5. Actual AdSense creatives, account-side Auto ads exclusions and regional CMP behavior require account/preview review. Source changes alone do not demonstrate these external settings. The pending application must stay pending; no withdrawal or duplicate submission.

No paid provider, paid API, authentication scope, fake activity count, success statistic, reviewer identity or approval guarantee was introduced. No new question corpus was authored.

## Validation

- TypeScript: `tsc --noEmit --incremental false` passed; the final production build also completed its TypeScript check.
- ESLint: passed with zero errors and one pre-existing unused-variable warning in `reports/civil2-2026-completion-20260926/parse-fenced-results.mjs`.
- Full Vitest suite: 551 files and 5,764 tests passed. Focused checks after final copy/layout changes: 33 tests passed.
- Production build: `next build --webpack` passed and generated 16,729 static pages. Generated HTML was inspected for the final privacy/ad copy and a single article heading.
- Playwright: all six mobile/JavaScript-disabled learning-flow cases in `tests/e2e/adsense-learning-quality.spec.ts` passed against the final production build (5.4s). The 390px article viewport and full-page capture were visually checked.
- `git diff --cached --check` passed. The remote main was still the base commit above at the final comparison.

Standard Turbopack rejected the existing cross-root `node_modules` junction; the supported Webpack production build was used to avoid a large dependency copy. Existing middleware/third-party instrumentation warnings are separate from errors. The local production preview uses `http://127.0.0.1:3031`; it is a temporary review server, not a deployed preview or production publication.
