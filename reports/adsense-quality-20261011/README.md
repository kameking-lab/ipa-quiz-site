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
- `source-check.json`: 26 worked-example IDs, exact canonical problem URLs, expected answer symbols and 28 source URLs. All 28 PDFs were fetched/read and hashes recorded; all 26 examples were checked against the official question and key. Scanned question pages were rendered and visually read. The web reader initially received the IP site's network-restriction response, but ordinary HTTP fetch subsequently retrieved both official PDF bodies without authentication or access-control changes. IP question 1/3 were checked on scanned pages 2/3 and the official answer table on page 1 (エ/ウ).
- Initial structural corpus audit: 22,879 registered questions, 21,144 practice-ready. No ready question with an explicit full-coverage claim had missing choice reasons; no local figure path was missing. Missing legacy coverage labels and a broad figure-reference regex are not evidence that every flagged question is defective. This is a structural check, not an all-corpus accuracy review.
- The parent provided an independent Astra review of production (13:53–14:05 UTC). Its five representative observations are bounded in `data/editorial-review-scope.ts`. That review predates this patch and is **not** approval of the changed version.

## Re-review and remaining work

1. Independent Astra review of the exact final commit, including 13 rewritten articles, all 13 redirect/canonical/sitemap decisions, mobile learning flows and disclosure consistency.
2. FP3 2026 published gakka q11 is still incorrectly categorized as risk management in `data/questions/fp3/academic-2026-05.json`. `fp3-category-correction-proposal.md` records the latest-main/open-PR overlap check and the proposed separate correction. This draft does not edit owned question data or claim that correcting one item fixes the paper's other categories.
3. Existing electric-exam contact evidence and individual third-party figure rights are operational follow-ups on already published material, not new original-question/figure reproduction in this PR. Their scope is specified below; already verified data is not scheduled for a blanket re-audit.
4. Actual AdSense creatives, account-side Auto ads exclusions and regional CMP behavior were not exercised. With the blog approval ledger empty and qualification ad slots removed, current route-level initialization can be tested without claiming successful ad delivery or CMP consent. Keep the pending application pending; no withdrawal or duplicate submission.

## Narrow rights and advertising boundary

- New guide content is independent reasoning/comparison/check text for existing IPA questions, with links to official problems and keys. This PR adds no full original-question corpus and no third-party problem figures. Existing IPA/JAFP reuse conditions and source annotations are retained. Neither a new grant of rights nor completion of every provider's procedures is asserted.
- The electric-exam center's educational-use FAQ was already read; the outstanding item is evidence that the site operator completed its requested usage contact. This PR only changes descriptions/links around already published electric-exam material.
- The general MHLW reuse conditions and JAFP notice were already read. Any specific excluded/third-party photo, and evidence of MOJ/Judo-foundation item-specific requirements, remain unconfirmed only where the existing original uses them. No new such photo/original is introduced here.
- Actual Google ad delivery is unavailable during the pending application. Testable now: unknown/unapproved articles, qualification hubs, questions, navigation and errors contain no ad slot/script initialization; root verification metadata alone does not request ads. Existing reviewed-blog eligibility remains tied to exact body/source/receipt evidence, with no approvals added.
- The underlying `ContentEndAd` component has no site-managed consent gate. Because it is not mounted by the empty approval ledger, no regional Google CMP or personalized-ad consent state was exercised. Enabling approved articles/Auto ads later requires a separate account/CMP check before ad initialization; this PR does not claim consent is already implemented or verified.

## Independent review follow-up

The parent returned an Astra review of `27fe4988`: no confirmed wrong answer in the 26 examples, independent acquisition/visual checks for the non-IP PDFs, and consistent calculations/changed-condition checks. The two requested fixes are the remaining header links that used AP/default mock routes, and a related-question description that printed unfiltered edition tags. The patch keeps the qualification in desktop/mobile header links, omits unsupported mock/stream entries, and derives the displayed subject from actual filtered shared tags. This is AI source comparison, not human specialist or all-corpus review.

No paid provider, paid API, authentication scope, fake activity count, success statistic, reviewer identity or approval guarantee was introduced. No new question corpus was authored.

## Validation

- TypeScript: `tsc --noEmit --incremental false` passed; the final production build also completed its TypeScript check.
- ESLint: passed with zero errors and one pre-existing unused-variable warning in `reports/civil2-2026-completion-20260926/parse-fenced-results.mjs`.
- Full Vitest suite after the review fixes: 552 files and 5,770 tests passed.
- Production build: `next build --webpack` passed and generated 16,729 static pages. Generated HTML was inspected for the final privacy/ad copy and a single article heading.
- Playwright after the review fixes: all 22 cases across the quality, land-surveyor descriptive and qualification-expansion specs passed against the final production build (29.3s). This includes all 18 desktop/mobile header transitions (three qualifications × three modes × two layouts), source-role labels and no Google-ad initialization on six unapproved/navigation/404 routes. The six header cases passed again (12.0s) with menu animations completed for clear screenshot evidence; those six captures were visually checked.
- `git diff --cached --check` passed. The remote main was still the base commit above at the final comparison.

Standard Turbopack rejected the existing cross-root `node_modules` junction; the supported Webpack production build was used to avoid a large dependency copy. Existing middleware/third-party instrumentation warnings are separate from errors. The local production preview uses `http://127.0.0.1:3031`; it is a temporary review server, not a deployed preview or production publication.

The initial `27fe4988` GitHub CI failed on three stale assertions after the final disclosure copy change: historic monthly report names, the official-purpose-document label, and the reference-navigation label. Those tests now assert current bounded cost disclosure, the same original MOJ document, and the same three MHLW references plus the separate JAFP problem/key. They are not removed or skipped.

The `27fe4988` Vercel preview reached Ready. Its branch URL is `https://ipa-quiz-site-git-codex-kakomon-a-c95d56-kameking-labs-projects.vercel.app`, and its immutable deployment URL is `https://ipa-quiz-site-rhgstiy3w-kameking-labs-projects.vercel.app`. Both are subject to Vercel login protection; external reachability returned 302 to Vercel SSO. No protection/authentication setting was changed. The reviewer therefore cannot be assumed to have access. Per the parent's instruction, the changed flows were checked on the user's Windows PC with local Chromium at 390px/1280px, with six header-menu captures saved in the local Playwright results. A viewport emulation is not a physical-phone test.
