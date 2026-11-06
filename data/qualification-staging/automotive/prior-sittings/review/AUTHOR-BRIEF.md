# W2 author brief: JASPA automotive mechanic exam transcription (OCR by eye)

You transcribe ONE official JASPA (日本自動車整備振興会連合会) written exam paper into JSON, and write original Japanese explanations.
Accuracy is paramount. Official questions + official answers only. Never invent questions or answers.

## Inputs (all under SCR = C:/Users/kanet/AppData/Local/Temp/claude/C--Users-kanet-20260522-ipa-quiz-site/885af4e8-704d-4a74-9834-839234442e58/scratchpad)
- Page images (180dpi PNG, already rendered): SCR/w2png/<pdfstem>_pNN.png  (page 1 is usually the cover/instructions)
- Original PDFs: SCR/w2pdf/<pdfstem>.pdf (image-only; no text layer)
- Official answer keys (already transcribed and verified from the official answer PDF): SCR/w2draft/official-keys.json
  - key arrays are 1-based official option numbers per question (index 0 = No.1).
- If small text / subscripts / figure numbers are hard to read, re-render a zoomed crop with PyMuPDF, e.g.
  `python -I -c "import fitz;d=fitz.open(r'<pdf>');p=d[<page-1>];p.get_pixmap(dpi=300,clip=fitz.Rect(x0,y0,x1,y1)).save(r'SCR/w2png/zoom_<you>_<n>.png')"`
  (Rect in PDF points; page is 595.7 x 842.4 pt; PNG px * 0.4 = pt). Then Read the PNG. Write your zoom files with a unique prefix.
- Do not use any network access. Do not edit anything outside SCR/w2draft/ and SCR/w2png/zoom_*.

## Output
Write a JSON array to the output path given in your task. One object per question, in qNumber order:

```json
{
  "qNumber": 1,
  "question": "stem text exactly as printed (Japanese), without the 〔No. 1〕 label",
  "choices": { "ア": "(1)text of option (1)", "イ": "(2)...", "ウ": "(3)...", "エ": "(4)..." },
  "officialAnswerNumber": "4",
  "answer": "エ",
  "explanation": "1-3 sentence original explanation of why the official answer is correct (starts like 不適切なのは(4)。 / 適切なのは(2)。 / 正答は(3)。)",
  "choiceExplanations": { "ア": "...", "イ": "...", "ウ": "...", "エ": "..." },
  "sourcePages": [2],
  "sourceFigureRequired": false,
  "hasImage": false,
  "topicTags": ["short Japanese topic", "..."],
  "difficulty": 2,
  "isCalculation": false,
  "reviewNotes": []
}
```

Rules:
1. Text fidelity: reproduce stem and options character-for-character as printed (same wording, kana, katakana with ・, numbers, units, punctuation). Use full-width Japanese punctuation as printed (、。「」（）). Keep half-width digits/latin as printed (e.g. 3,450回転, 12V, kW, N·m, km/h, m/s², Ω). Omit furigana (ruby) and bold/underline formatting. Join line breaks; no stray spaces inside Japanese text.
   - Blanks like （イ）（ロ） or underlined labels keep their markers as printed.
   - Choice prefix is exactly "(1)", "(2)", "(3)", "(4)" (half-width parentheses) followed immediately by the option text. For options that are only a letter/number/symbol, write e.g. "(1) A" or "(2) 12V" with one space.
   - Combination options (e.g. (イ)/(ロ) pairs or tables of choices) must be written fully, e.g. "(1)（イ）大きく　（ロ）高く" — reproduce every cell.
   - Tables in stems: write as readable text keeping all values.
2. Mapping: (1)=ア, (2)=イ, (3)=ウ, (4)=エ. `officialAnswerNumber` = the official key digit as a string; `answer` = mapped kana. You MUST use the official key exactly. If, after careful reading, you believe the key contradicts the question, still use the official key and add a note to reviewNotes explaining the concern.
3. Figures: if answering requires a figure, graph, diagram, circuit, or a table that is drawn as an image, set `sourceFigureRequired: true` and `hasImage: true`, and list the page(s) containing that figure in `sourcePages`. Keep the full stem text. Where the figure carries numeric values needed for a calculation and you can read them with certainty, append one sentence to the stem starting with "（図：" giving those values (e.g. "（図：A点からの距離は800mm、荷重は2,000N。）"). If you cannot read a value with certainty, do not guess; describe nothing and add a reviewNotes entry. Questions solvable from text alone: sourceFigureRequired false, hasImage false.
   `sourcePages` = 1-based physical PDF page(s) where the question appears (include continuation pages).
4. Explanations: ORIGINAL writing in natural Japanese (do not copy textbooks). For each option explain concretely why it is appropriate/inappropriate (for 不適切 questions: the inappropriate one says what is wrong and the correct fact; the appropriate ones briefly confirm the correct fact). For calculations show the formula and arithmetic leading to the official answer, and for wrong numeric options say they do not match the computed value. 1-2 sentences per option. Mark the correct option's explanation with 「正答。」 or 「不適切（正答）。」 style at the start so it is clear. `explanation` summarises why the official answer is right. Be technically correct; if unsure about a technical point, keep the statement modest and accurate rather than inventive. For law/regulation questions (道路運送車両法, 保安基準 etc.) state that it is per law at the time of the exam (出題時点の法令).
5. difficulty 1-5 (most 2-3). topicTags: 1-3 short topic words (e.g. ブレーキ, 電気基礎, 法令). isCalculation true only for computation questions.
6. Count: the paper has exactly N questions (stated in your task). Output exactly N objects, qNumber 1..N, none skipped.
7. After writing, re-open each page image and re-verify every stem and option against your JSON (second pass). Fix any discrepancy. Then validate the file parses as JSON (python -I -c "import json;json.load(open(r'path',encoding='utf-8'))") and that every answer equals the key.
8. Final message: a short English summary: count written, which qNumbers have sourceFigureRequired, any reviewNotes/concerns, any characters you could not read with certainty.
