**PASS — grade 1 only, all 85 records. No residual instruction errors found.**

- All three reported locations are fixed in JSON and source transcripts.
- The additional wrapped instruction at 260621 problem 5/subquestion 1 is also fixed.
- PDF visual checks confirm unnumbered empty rectangles at all four locations. Whitespace-aware scanning finds zero remaining matching `(1)` instruction placeholders.
- Exactly 23 records changed, exclusively through those instruction replacements. Genuine numbered slots/banks and all other fields are unchanged.
- All 85 answers agree with the official answer PDFs, including the accepted イ/ウ correction. The prior 443-rationale audit remains applicable. Earlier figure/caption and number-prefix fixes remain unchanged.

HEAD changed externally from `39a27dfcf` to `6b24af2d5` during review. The final working tree is clean and contains the verified fixes.

Scope/limits: compared the four local official grade 1 PDFs; no grade 2/3 assessment. Prior publication-gate findings remain applicable under the stated contract. No browser/runtime tests, edits, git mutations, push, PR or deployment performed.