# Nursing latest two exam follow-up — 2026-10-11

This branch reuses eight previously saved originals (35 choices) from the 114th and 115th nursing examinations. It adds no newly invented original and does not duplicate the three originals in PR683.

Baseline: 464 originals / 1,918 choices. This branch: 472 originals / 1,953 choices. Combined with PR683: 475 of 480 originals. Five individually stopped originals remain excluded: 114AM112, 114PM70, 115AM32, 115AM79, 115PM77.

`SAVED-DRAFTS.json` preserves the received original objects, source-packet hashes, official PDF hashes, shared-case metadata, and source-page image hashes. `CANDIDATE-QUESTIONS.json` is the exact independently reviewed eight-question candidate. Runtime adoption changes only `needsReview` from true to false. `REFERENCE-CORRECTIONS.json` records official-key string normalization, answer-PDF page fragments, and corrections to the saved PM general-question classification; official scoring values and original stems/choices are unchanged.

`INDEPENDENT-REVIEW.json` records the independent Astra local review of 8 questions and all 35 choices. Its per-question semantic hashes exclude only `needsReview`. `INTEGRATION.json` freezes every previous original object and both annual data files for regression verification.

The explanations of 114PM60, 114PM89, and 115AM103 explicitly distinguish official scoring from unresolved scientific/clinical source correspondence. They are bounded exam-study explanations, not a claim that those correspondences have been resolved. Full coverage means every listed choice has explanation text. 114AM98 uses case-limited pain assessment rather than invented device settings or universal posture restrictions.

Primary-source locations and access limits are in `PRIMARY-SOURCES.json` and `ADDITIONAL-SOURCE-LOCATORS.json`. Access denials, restricted full texts and CAPTCHA were not bypassed. No third-party source PDF is redistributed and no new publication permission is claimed.

This branch is a draft integration deliverable. It does not merge, deploy or certify the production count. Publication, existing strict receipt requirements, and final release verification belong to the integration owner.
