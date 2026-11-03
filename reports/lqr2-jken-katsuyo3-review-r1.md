**FAIL — grade 3 read-only audit.** Answers are correct, but presentation defects need correction.

1. **P2 — Figures are split into disconnected fragments.**  
   `jken-katsuyo3-251221-m1-s1`–`s5` reference four horizontal slices of one flowchart. Boxes, decision diamonds and connectors cross slice boundaries, but `QuestionFigures` renders each slice in a separate bordered card with a caption and spacing. The GUI figure for `260621-m5-s1`–`s8` similarly uses two slices. Reconstruct each complete figure. See [flowchart references](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo3/data/questions/jken-katsuyo3/latest-two.json:1994) and [figure renderer](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo3/components/quiz/QuestionFigures.tsx:6). Also, `260621-p5-figure1.png` clips the right border of the `(6)` box.

2. **P2 — PDF extraction artifacts change visible instructions.**  
   For example, `260621-m1-s4` reproduces the generic empty rectangle in 設問２ as **“(1)”**, although that section asks about slots `(4)`–`(6)`. Similar artifacts recur in other passages. The first problem’s table also contains stray `a` characters. Matching extracted PDF text does not establish visual fidelity. See [question text](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo3/data/questions/jken-katsuyo3/latest-two.json:182).

3. **P3 — Original-number labels acquire a duplicate prefix.**  
   `questionNumberLabel()` now returns `問題1(1)`, while existing callers prepend `問`, producing **“問問題1(1)”** in quiz badges, question headings and SEO titles. See [changed helper](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo3/lib/questions/display.ts:10) and [quiz caller](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo3/components/quiz/QuestionCard.tsx:25).

Audited counts:

| Check | Result |
|---|---|
| Official answers | **93/93 match**: 46 + 47 |
| Shared question passages | **14/14 inspected** against original PDF extraction |
| Choices and full choice explanations | **388/388 inspected**; no answer-mapping or substantive rationale errors found |
| Image assets | **8/8 visually inspected**, representing four original figures |
| Source pack | Four PDF hashes match manifest; four text sidecars compared |
| Fiscal year / slot metadata | Correct for both sittings and all 93 slots |

Question registries, lazy loading and homepage visibility remain publication-gated. **The eight images are static `public/` assets and would be accessible if deployed**, independently of those gates.

Limitations: static code/data audit; no browser rendering, deployment inspection, network access or test suites. Other grades excluded. No files changed. Reviewed HEAD `c6644770` against merge-base `00e49b94`; existing review records were not used as PASS evidence.

Official sources inspected:

:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/260621_mondaijk03.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/260621_kaitojk03.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/251221_mondaijk03.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/251221_kaitojk03.pdf" purpose="source"}