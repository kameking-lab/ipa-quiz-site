## Summary
- Stage the official 2025 lower First Class Electrician academic paper (50 questions) and answer key in review-only manifests.
- Pin both PDF hashes, source URLs, per-question pages, and extraction coordinates.
- Visually compare all 50 questions to the official PDF; record diagrams, photos, units, formulas, and OCR omissions in five review ledgers.
- Keep all 50 questions on publication HOLD. No public loader, APPROVED marker, or existing 2026 paper changes.

## Evidence
- Official source and reuse conditions: https://www.shiken.or.jp/construction/first/qa/
- Problem PDF: https://www.shiken.or.jp/construction/upload/20251005_co_first_q01.pdf
- Answer PDF: https://www.shiken.or.jp/construction/upload/20251005_co_first_a01.pdf
- `python scripts/denko1-2025-lower-stage.py <problem.pdf> <answer.pdf> --check` passed: 50 unique question numbers, 50 matching answer numbers, four extracted choice labels each.
- Visual ledger: `docs/evidence/denko1-2025-lower-hold/visual-q01-10.json` through `visual-q41-50.json`; 50/50 questions inspected against pages 3–15.
- All 50 questions and 200 choice reasons have separate independent review evidence in `reason-review-*-independent.json`, including Q1–10's four-choice primary-source recheck against official pages 3–5 and the pre-exam METI Article 149. Q25's photo component, Q29's grounding condition, Q35's grounding class, Q39's 100 μF and appliance classification, Q42's crimp tool, and Q46's diagram symbols were corrected or refined.
- Isolated `reviewed-candidate/` contains 50 normalized candidates, 76 exact official-PDF crops (50 rows, two shared diagrams, 24 figure/photo choices), and `QC-CANDIDATE-2026-09-28.md`. The checker matches 50 official answer keys and resolves all 89 media references. Paths are evidence-relative and remain on HOLD for final editorial and rights QA.
- After owner final QA, add the reviewed 2025 lower 50 questions to the existing Denko1 loader as a second paper. Publish only 41 minimal diagrams/photos in `public/images/denko1/2025-second/`: 15 question figures, two shared diagrams, and 24 individually cropped picture choices without the original イロハニ labels. Update the exam page and metadata to state 100 questions across two papers. The 50 full-row source crops remain evidence-only.
- Notable extraction errors: missing exponent sign in Q1, fragmented 100 V in Q3/Q4, missing equipment photos and picture-only choices, missing μ in Q39, and unrecoverable switch order in Q43.

## Publication gate
PDF text extraction cannot establish correct equations, diagrams, photos, or picture choices. The visual review is **50/50**, choice-reason drafts **200/200**, independent review **200/200**, and normalized candidates **50/50**. Owner final QA authorized implementation; branch includes the second paper. Keep this PR unmerged and production undeployed for the owner's last review. `APPROVED` remains untouched.
