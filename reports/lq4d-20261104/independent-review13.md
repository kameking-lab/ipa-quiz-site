**Overall: PASS — partial staging re-review only. No mandatory issues remain.**

Current JSON SHA256:
```text
3b4ae51e929e18ba3acfe655edd035c748c8b50f6c60bbf9fdb683a08e3734e2
```

Compared against `reports/lq4d-20261104/reviewed-manuscripts/review8-before-fixes.json`. Its SHA256 matches review8’s recorded `06d0f473893a3770d85adb1b7b8045b820ce70ab92cc3b78fca7a4ae07e19bc3`.

Every diff checked: **two explanation replacements and four reference additions only**. All remaining fields are equal; prior semantic PASS findings are retained on that basis.

| Question | Result | Re-review finding |
|---|---|---|
| Q48 | PASS | Entire entry unchanged |
| Q49 | PASS | Mandatory correction verified |
| Q50 | PASS | Entire entry unchanged |
| Q51 | PASS | Entire entry unchanged |
| Q52 | PASS | Entire entry unchanged |
| Q53 | PASS | Only added reference; verified |
| Q54 | PASS | Entire entry unchanged |
| Q55 | PASS | Entire entry unchanged |
| Q56 | PASS | Only added reference; verified |
| Q57 | PASS | Only added reference; verified |
| Q58 | PASS | Entire entry unchanged |
| Q59 | PASS | Entire entry unchanged |
| Q60 | PASS | Optional explanation and reference verified |

**Mandatory:** Q49(1) now correctly says **air in voids is replaced by water**. Increased moisture generally increases conductivity and decreases resistance, consistent with [ASHRAE material properties](https://handbook.ashrae.org/Handbooks/F25/IP/F25_Ch26/F25_Ch26_ip.aspx).

**Optional changes: all PASS.**

- Q53: [ASHRAE](https://handbook.ashrae.org/Handbooks/S24/SI/S24_Ch20/S24_Ch20_si.aspx) directly supports restricted entrainment and longer throw near surfaces.
- Q56: [MHLW](https://www.mhlw.go.jp/content/11120000/001385599.pdf) supports the plasticizer distinction and historical diazinon use. This is relevant supporting documentation, not comprehensive evidence for every choice.
- Q57: The [primary marine-aerosol study](https://repository.tno.nl/SingleDoc?docId=20930) reports sea-salt number emissions peaking around 0.1 μm, supporting the qualified explanation.
- Q60(3): The conservative heating-load rationale is sound; the universal-small-gain implication is removed. [ASHRAE §8](https://handbook.ashrae.org/Handbooks/F21/SI/f21_ch17/f21_ch17_si.aspx) supports ignoring beneficial gains conservatively, although it addresses residential heating generally rather than explicitly prescribing fan treatment.

**Figures: PASS.** Metadata unchanged; actual file SHA256 values match both snapshots and review8:

```text
Q48  6e03f05bdb8273f3d877afeb61128e2a95ed856a3dc40e73f097840aaf5d5dc0
Q52  fc1e111c62b7c3278e7bb32ed7a6daa0149b5d0421c30de849f4b71aecf765f0
Q59  39fad7c99972f968fd228a723db5bf35817ef755be15794b4d7a89b3aa58ab07
```

Partial-draft status, `needsIndependentReview: true`, and `publicGo: false` remain unchanged. No edits, commits, publication, registration, secret access, or engineering changes performed.