# ST all recorded choice explanations — 2026-10-11

All 16 recorded sittings (24 morning papers), 680 questions, 2720 choices are retained. This is an explanation overlay; the canonical raw question, choice and answer fields are unchanged.

- All-choice explanations: 669/680 questions, 2676/2720 choices, 2007/2040 wrong choices.
- New coverage beyond the existing 2024/2025 set: 559 questions, 2236 choices, 1677 wrong choices.
- Latest two years: 110/110 questions, 440 choices. Their existing independent Opus review receipts are retained and tested without modification.
- Missing: 11 questions, 44 total choices, 33 wrong choices. All are listed in unresolved.json; ordinary unfinished drafts: 0.
- All 680 answer keys match the 24 official answer PDFs. 2022 AM1 is an image-only PDF and was read visually; other sequences were text-extracted. The hashes and source URLs are saved alongside the test fixtures.
- Canonical anchor SHA-256: 467a15e17b5eb444e8b210ce7429030edc0b345cdea41d771c961c1a255fabc7.
- Native task requested model: gpt-6.1-sol. Private runtime receipt: null (not exposed). CLI launches: 0. No new independent review receipt is claimed for the added explanations.
- Full builds: 0 (root integration owner runs production builds and deployment).

## Individual holds

Eight questions have discrepancies between the frozen raw transcription and the official source: 2009 AM1 Q3/Q19, 2010 AM1 Q8, 2010 AM2 Q6, 2014 AM1 Q7, 2015 AM1 Q7, 2021 AM1 Q26 and 2021 AM2 Q17. An explanation would contradict the displayed question or identical raw choices. The question/answer preservation constraint prevents correcting those fields in this PR.

Three questions have unresolved source interpretation: 2009 AM2 Q23 (control chart rule count), 2011 AM1 Q29 and its repeat 2013 AM1 Q29 (mixed strategy wording versus official maximin answer). Their formulas/graph were inspected but the doubtful wrong-choice reason is not published. The official answer key is retained.

Historical wording is interpreted at the exam date, including the electronic bookkeeping approval rule and the former NISC name. Previously saved drafts and exact matching questions were reused; missing choices were not invented.

## Verification

The focused test checks the exact 680-question anchor, 24 official answer sequences, all explained choice keys and prefixes, distinct reasons, the exact eleven holds, and narrative repair boundaries. The existing latest-two-year test verifies its original independent review receipts. See validation.json for executed commands and outcomes.

Schema validation exited 0 for all 680 ST questions. Existing empty topicTags, absent imageUrls for some image questions, and the uncertain narrative in held 2009 AM1 Q3 remain as warnings; this PR does not change those raw/metadata fields.
