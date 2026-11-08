# W2 independent review brief (read-only on drafts)

You are an INDEPENDENT reviewer. Another agent transcribed an official JASPA automotive mechanic exam paper (image-only PDF) into JSON and wrote original explanations. You must verify it against the official source images. Do NOT edit the draft JSON. Write only your review file.

SCR = C:/Users/kanet/AppData/Local/Temp/claude/C--Users-kanet-20260522-ipa-quiz-site/885af4e8-704d-4a74-9834-839234442e58/scratchpad
- Page images (180dpi): SCR/w2png/<pdfstem>_pNN.png ; PDFs: SCR/w2pdf/<pdfstem>.pdf
- Official answer PDF page images: SCR/w2png/2024_20250323_kai_p01.png, _p02.png (令和7年3月23日実施 = 令和6年度第2回) and SCR/w2png/2025_20251005_kai_p01.png (令和7年10月5日実施 = 令和7年度第1回). Read the answer column for your subject directly from these images yourself (column headers: 12(1小), 23(2シ), 34(3に), 42(電装), 24(2に)).
- Zoom: `python -I -c "import fitz;d=fitz.open(r'<pdf>');p=d[<page-1>];p.get_pixmap(dpi=300,clip=fitz.Rect(x0,y0,x1,y1)).save(r'SCR/w2png/rv_<prefix>_<n>.png')"` (points; PNG px*0.4 = pt), then Read it.
- No network. Do not modify files other than your review output and rv_* zoom PNGs.
- The draft authoring rules are in SCR/w2draft/AUTHOR-BRIEF.md (read it to know the conventions: "(1)" prefixes, full-width punctuation, furigana omitted, Unicode sub/superscripts acceptable, "（図：…）" sentences allowed only for values that are actually in the figure, hasImage true whenever the stem refers to a figure).

For EVERY question check:
1. answer/officialAnswerNumber equal the official answer PDF (read it yourself; (1)=ア … (4)=エ).
2. stem and all four options match the printed page character-for-character in substance: wording, numbers, units, negations (適切/不適切), every cell of combination options. Ignore purely cosmetic differences (half/full-width parentheses or spaces, Unicode subscript vs plain, line-break joins). Anything that changes meaning or a number is a defect.
3. Any "（図：…）" sentence in the stem is accurate to the figure.
4. sourcePages contains the page(s) where the question (and its figure) is printed. hasImage/sourceFigureRequired is true when the stem refers to a figure or the answer depends on a figure/graph/drawn table.
5. All four choiceExplanations are technically correct, consistent with the official answer, and do not assert false facts. The correct option's explanation is marked as the answer. Calculations are arithmetically right. Pay particular attention to any reviewNotes in the draft.
6. Count: qNumbers complete with no gaps.

Output: write JSON to the path given in your task:
```json
{"subject":"...","reviewer":"claude-independent","pagesChecked":[...],"answerKeyReadFromImage":[3,4,...],
 "rows":[{"qNumber":1,"verdict":"PASS"|"FIX","sourcePagesChecked":[2],"answerChecked":true,"allFourExplanationsChecked":true,
          "issues":[{"field":"question|choices.ア|choiceExplanations.イ|explanation|sourcePages|hasImage|answer","problem":"...","correctText":"exact corrected text if transcription"}]}],
 "summary":{"pass":N,"fix":M}}
```
Be strict on fidelity and facts; do not flag stylistic preferences. Final message: short English summary listing every FIX with the problem.
