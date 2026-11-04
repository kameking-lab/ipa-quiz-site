**FAIL — 7 residual findings.** Reviewed by **gpt-6-astra**, read-only, against final HEAD `16f39d6b` (clean tree).

The grade 3 connected figures, graph border, stray `a` removal, and number-label fix pass.

| Severity | Finding | Location |
|---|---|---|
| P2 | Grade 3 generic instruction still says `( 1)` instead of `□`; **6 records**. Confirmed against PDF p13. | [JSON:1465](data/questions/jken-katsuyo3/latest-two.json:1465) |
| P2 | Grade 1 complete, labelled figures are absent: sliced charts and unlabelled scatterplot remain; **8 records**. | [JSON:1938](data/questions/jken-katsuyo1/latest-two.json:1938) |
| P2 | Grade 2 Gantt still lacks the planned/actual legend and caption; **6 records**. | [JSON:285](data/questions/jken-katsuyo2/latest-two.json:285) |
| P2 | Grade 1/2 generic-instruction corrections are absent. Scan found **16 occurrences across 49 grade 1 records**, and **14 across 65 grade 2 records**; representative examples visually verified. | [Grade 1:2332](data/questions/jken-katsuyo1/latest-two.json:2332), [Grade 2:263](data/questions/jken-katsuyo2/latest-two.json:263) |
| P3 | Three grade 3 instruction rectangles are omitted entirely; **13 records**. Confirmed against original PDFs. | [JSON:1705](data/questions/jken-katsuyo3/latest-two.json:1705), [JSON:2408](data/questions/jken-katsuyo3/latest-two.json:2408) |
| P3 | Grade 3 retains `((4))` and `(5))`; **5 records**. Originals have ordinary `(4)` and `(5)`. | [JSON:1957](data/questions/jken-katsuyo3/latest-two.json:1957) |
| P3 | Grade 1 table captions remain clipped in the p5/p10 assets; **12 records**. | [JSON:2354](data/questions/jken-katsuyo1/latest-two.json:2354), [JSON:2898](data/questions/jken-katsuyo1/latest-two.json:2898) |

**Verified:** grade 3’s **93 answers match**, with **14 shared passages, 388 choices/explanations, and four current figures** inspected. Answers, choices, and explanations are unchanged from `c6644770`.

Actual question records remain publication-gated in the inspected paths. Static illustrations would be accessible upon future deployment, consistent with your contract.

**Limitations:** grade 1/2 checks covered the claimed fixes, not a complete data audit. PDF hashes rely on the parent’s verification. HEAD changed externally during review; findings were rechecked against the final snapshot. No edits, Git mutations, tests, push, PR, or deployment were performed.