**FAIL — `gpt-6-astra` found three residual grade 1 instruction errors affecting 23 records.**

Each still displays `(1)` where the original PDF shows an **unnumbered empty rectangle**:

| Source | JSON location | Affected records |
|---|---|---:|
| 260621, problem 5, subquestion 4; PDF p12 | [Line 1196](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/data/questions/jken-katsuyo1/latest-two.json:1196) | 8 |
| 251221, problem 4, subquestion 2; PDF p9 | [Line 2874](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/data/questions/jken-katsuyo1/latest-two.json:2874) | 7 |
| 251221, problem 6, subquestion 1; PDF p14 | [Line 3524](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/data/questions/jken-katsuyo1/latest-two.json:3524) | 8 |

These **P2** errors also remain in the source transcripts. Only the instruction placeholders need replacement; genuine numbered slots must remain.

The previous grade 1 figure/caption defects and duplicated question prefix are **resolved**.

The reported grade 2/3 fixes are **absent from this worktree**: Gantt legend/caption remain missing; flowchart and GUI remain split; graph `(6)` still has a clipped right border; table padding `a` remains.

Review coverage:

- **85 grade 1 records** compared: answers, choices, explanations and image references unchanged.
- **12 shared texts**, **2 transcripts**, **12 images** and **9 source-page visuals** inspected.
- Registry, loader and search gates checked; **no unintended question-record exposure found**. Public static illustrations comply with the clarified scope and would be accessible upon deployment.

Limitations: prior exhaustive answer/hash audits were relied upon, not repeated. No browser, runtime checks or test suites. No edits or git mutations performed. HEAD changed externally from `8864a7a8` to `39a27dfcf` during review; final status was clean, and the three residual errors were rechecked afterward.