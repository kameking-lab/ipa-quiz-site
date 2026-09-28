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
- Questions 1–10 have 40 choice-reason drafts independently checked against the official paper, answer key, and the pre-exam METI Article 149. The public approval marker remains absent.
- Questions 11–20 have 40 additional choice-reason drafts checked independently against the official text and visual diagrams; Q16 and Q18 wording was corrected based on that review.
- Notable extraction errors: missing exponent sign in Q1, fragmented 100 V in Q3/Q4, missing equipment photos and picture-only choices, missing μ in Q39, and unrecoverable switch order in Q43.

## Publication gate
PDF text extraction cannot establish correct equations, diagrams, photos, or picture choices. The visual review is **50/50**. Choice-reason drafts are **80/200**, independent review **80/200**, and public approval **0/200**. Normalized content and source/rights checks remain outstanding. Public addition remains **0 questions**. Do not merge as a launch or modify APPROVED/public loaders until all review steps pass.
