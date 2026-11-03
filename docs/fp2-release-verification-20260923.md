# FP2 initial release verification — 2026-09-23

## Scope and source

- 2026年5月公表の2級FP技能検定学科60問のうち **問1〜10のみ**。全範囲・実技を収録したとは表示しない。
- Official question and answer PDF: https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf
- Retrieved PDF SHA-256: `525d190bb489b4187d39d6782eac999fc4b14bfdd1f489842b96685465b804ef`
- Copyright/reuse terms: https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf
- Terms permit use of 2級学科 without individual application when source is attributed and modifications are identified. The data attributes 日本FP協会 and declares whitespace normalization and replacement of 1–4 with ア–エ. JAFP/金財 share copyright in this paper.
- PDF law reference date: **2025-04-01**; publication year is 2026. All questions and both interactive/static views preserve that distinction. Institution links may describe newer rules; answer against the displayed reference date.
- Source extraction (PyMuPDF) independently compared with committed data: 10 question stems, 40 choices, 10 answers match after declared whitespace/label normalization. No figures required in this set. PDF page 2 was also rendered for visual transcription verification.
- Official answers 1–10: **3,4,4,3,3,4,3,1,2,3** → ウ,エ,エ,ウ,ウ,エ,ウ,ア,イ,ウ.

## Explanation review

40 individual explanations distinguish a true statement from the answer to a negative question. Official reference links are retained for each question and displayed on both question pages and the common quiz player.

- Q1: Six coefficient directions; official question/answer PDF page 2.
- Q2: 協会けんぽ benefit FAQs (birth benefit duplication, high-cost expense pooling, injury/sickness allowance).
- Q3: ハローワーク basic benefit eligibility, qualifying period and bonus exclusion.
- Q4: 日本年金機構 student exemption and 10-year catch-up payment.
- Q5: 日本年金機構 in-employment and deferred old-age pension; avoid applying the current changing income threshold to a 2025 question.
- Q6: 日本年金機構/厚生労働省 disability recognition date, before-age-20 claims, grade-specific spouse addition and calculation period.
- Q7: iDeCo official FAQ/厚生労働省 guidance; 2025 third-category monthly cap 23,000 yen.
- Q8: 国税庁 contribution deductions and retirement income classification.
- Q9: 住宅金融支援機構 Flat35 borrowing and early-repayment rules.
- Q10: 経済産業省 ABL guidance, 日本銀行 direct/indirect finance, official exam answer.

## Related correctness fixes

- Choice shuffling previously moved choices and answer but left each-choice explanations on original labels. Shuffle now permutes choice explanations by original key too, including duplicate-text options. Label references inside each-choice prose also prevent unsafe shuffling.
- FP3 Q31 イ: 630万円 incorrectly described as subtracting only life-insurance premiums. Corrected to 800−60−100−10 and explains why life insurance must not be subtracted.

## Validation

- TypeScript: PASS.
- Changed-file ESLint: PASS.
- Question schema validation: **14,429 / 14,429 PASS**, zero failures; 14,412 existing warnings mainly legacy topic/figure metadata (not newly resolved by this release).
- Focused unit tests: **90 passed** across qualification expansion, registry, configuration, filtering, practice-session separation. Registry tests were rerun alone after the simultaneous production build exhausted their 15s time budget; 7/7 pass in 9.84s without a timeout increase.
- Production build: **PASS**, `next build --webpack`, 2,608 pages. Default Turbopack cannot traverse this isolated worktree's dependency junction; webpack uses the same source successfully. Existing OpenTelemetry dynamic-dependency warnings remain.
- Browser E2E: **7 passed** (FP2 + FP3 browse → answer → back/progress; source/date; negative-question feedback; common player; hidden Denken3; metadata/catalog). One test initially used the static-view heading for the quiz view, corrected to the existing accessible region name.
- Denken3 remains gated pending its usage notification. IPA-only importer list remains 13; playable list becomes IPA13 + FP2 + FP3.

## Remaining scope

- FP2 Q11〜60 (50 questions), later published sets and practical exam are not part of this release.
- No live deployment is claimed by this document; PR review and production verification are separate steps.
