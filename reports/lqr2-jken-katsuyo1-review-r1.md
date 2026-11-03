**FAIL — J検 情報活用1級 only.** Reviewed HEAD `8864a7a8` against merge-base `00e49b94`.

- **P2 — Broken figure extraction:** `jken-katsuyo1-251221-m1-s1` through `s8` reference `251221-p3-figure1.png` and `figure2.png`, which contain the **upper and lower halves of both charts**, rather than complete figures. The renderer separates them into bordered cards. The scatterplot crop also omits its axis labels and figure number, leaving those labels detached in the question text. Re-crop complete, labelled figures. References: [image assignments](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/data/questions/jken-katsuyo1/latest-two.json:1938), [figure renderer](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/components/quiz/QuestionFigures.tsx:6). Confirmed against PDF page 3 of :codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/LQR2/pdfs/251221_mondaijk01.pdf" purpose="source"}.

- **P3 — Duplicated question prefix:** [display.ts:11](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/lib/questions/display.ts:11) now returns `問題1(1)`, but existing callers prepend `問`, producing **`問問題1(1)`**. This affects question cards, stream views and question metadata; examples: [QuestionCard.tsx:25](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/components/quiz/QuestionCard.tsx:25), [question-meta.ts:31](C:/Users/kanet/20260522/wt-LQR2-jken-katsuyo1/lib/seo/question-meta.ts:31).

Audited counts:

- **85/85 answer slots** matched official answers: 43 + 42, including independently accepted **イ／ウ** for `260621-m6-s1`.
- **12/12 distinct shared question texts**, **443 choices and corresponding explanations** reviewed. No additional substantive transcription, option-mapping or rationale errors found.
- **15/15 image assets** visually inspected against relevant original pages. Two additional crops (`251221-p5-vector.png`, `251221-p10-vector.png`) partially clip their table titles.
- **4/4 PDF hashes**, four source-pack transcripts and all 85 manifest answers checked.
- Fiscal-year mappings are correct. Static inspection confirms the qualification remains unpublished through catalog/loader gates.

Limitations: no browser rendering, runtime publication checks or test suites were run. Static image URLs remain deployment-accessible independently of question gates. Other grades and existing review verdicts were excluded. No files changed.