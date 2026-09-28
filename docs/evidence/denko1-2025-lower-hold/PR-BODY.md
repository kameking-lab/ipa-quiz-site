## Summary
- Add the official 2025 lower First Class Electrician academic paper as a separate 50-question paper alongside the existing 2026 upper paper.
- Pin both PDF hashes, source URLs, per-question pages, and extraction coordinates.
- Visually compare all 50 questions to the official PDF; record diagrams, photos, units, formulas, and OCR omissions in five review ledgers.
- This branch includes the public question loader and figures; the PR remains unmerged and production undeployed pending final review. `APPROVED` remains untouched.

## Evidence
- Official source and reuse conditions: https://www.shiken.or.jp/construction/first/qa/
- Problem PDF: https://www.shiken.or.jp/construction/upload/20251005_co_first_q01.pdf
- Answer PDF: https://www.shiken.or.jp/construction/upload/20251005_co_first_a01.pdf
- `python scripts/denko1-2025-lower-stage.py <problem.pdf> <answer.pdf> --check` passed: 50 unique question numbers, 50 matching answer numbers, four extracted choice labels each.
- Visual ledger: `docs/evidence/denko1-2025-lower-hold/visual-q01-10.json` through `visual-q41-50.json`; 50/50 questions inspected against pages 3–15.
- All 50 questions and 200 choice reasons have separate independent review evidence in `reason-review-*-independent.json`, including Q1–10's four-choice primary-source recheck against official pages 3–5 and the pre-exam METI Article 149. Q25's photo component, Q29's grounding condition, Q35's grounding class, Q39's 100 μF and appliance classification, Q42's crimp tool, and Q46's diagram symbols were corrected or refined.
- Isolated `reviewed-candidate/` contains 50 normalized candidates, 76 exact official-PDF crops (50 rows, two shared diagrams, 24 figure/photo choices), and `QC-CANDIDATE-2026-09-28.md`. The checker matches 50 official answer keys and resolves all 89 media references. The 50 full-row source crops remain evidence-only.
- The public loader includes both papers (100 questions). `public/images/denko1/2025-second/` contains only 41 minimal diagrams/photos: 15 question figures, two shared diagrams, and 24 individually cropped picture choices without the original イロハニ labels. The exam page and metadata state 100 questions across two papers.
- Notable extraction errors: missing exponent sign in Q1, fragmented 100 V in Q3/Q4, missing equipment photos and picture-only choices, missing μ in Q39, and unrecoverable switch order in Q43.

## Publication gate
PDF text extraction cannot establish correct equations, diagrams, photos, or picture choices. The visual review is **50/50**, choice-reason drafts **200/200**, independent review **200/200**, and normalized candidates **50/50**. Owner final QA authorized implementation. Merge and production deployment await the owner's final review and passing CI. `APPROVED` remains untouched.
