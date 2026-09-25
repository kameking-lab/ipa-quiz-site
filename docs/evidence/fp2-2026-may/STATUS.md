# FP2 2026年5月公表 学科 問11〜60 — release status (2026-09-25)

Plan: [PLAN.md](PLAN.md). Scope is FP2 2026年5月公表 学科 問11〜60 only; no other dataset was changed.

## Result

- **Verified: 50 / 50 (問11〜60). HOLD: 0.** Released contiguous range: 問11〜60.
- With the existing 問1〜10, the 2026年5月公表 学科 set is now complete: `FP2_2026_MAY_COVERAGE` = 60 questions, label 「全60問」.
  All UI/SEO wording and test counts are derived from the published array (`data/questions/fp2/index.ts`), not hard-coded.

## Sources (pinned)

| File | URL | SHA-256 |
| --- | --- | --- |
| Question + answer PDF (34 pages) | https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf | `525d190bb489b4187d39d6782eac999fc4b14bfdd1f489842b96685465b804ef` |
| Reuse terms | https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf | `db604850c3f14cab982bedf622beae6f33d0624dd79f8dc8f9baaa979e00df45` |

The QA hash equals the one recorded for 問1〜10 on 2026-09-23. Reuse terms: 2級学科 may be used without application
when the source is stated and modification is stated. Each question carries
「出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）を加工して作成。改行・空白を整形し、選択肢番号1〜4をア〜エへ置換。…解説は当サイト作成。」
(figure questions add that the figure is an image crop of the original with a text transcription).

## Gates per question (`receipts/qNN.json`)

1. **Transcription** — `scripts/fp2_2026_may/extract.py`: PyMuPDF and pdfminer.six independently parse the pinned PDF;
   stem, 4 choices and 「正解 N)」 must agree after whitespace normalization (50/50 agree).
2. **Figures** — pages with vector drawings/raster images were checked against renders. Figures: Q14 (table),
   Q55 (親族関係図), Q59 (table) → cropped to `public/fp2/academic/202605/` and transcribed as text in the stem.
   Q13/Q54/Q60 share a page with those figures; Q28's page has only two rule lines. All other pages have no graphics.
3. **Law reference date** — cover 注意事項2: 2025年4月1日現在施行の法令等 → `lawReferenceDate: 2025-04-01` on every
   question; the final reviewer must confirm the answer is settled at that date (`lawDateClear`).
4. **Judgment by `claude-opus-5-5`** — `scripts/fp2_2026_may/opus_review.py` runs headless
   `claude -p --model claude-opus-5-5 --output-format json` for (a) a blind solve without the official answer,
   (b) a draft with the official answer (WebSearch allowed), (c) up to 3 review rounds (FIX → corrected text is re-reviewed).
   The raw CLI result, including `modelUsage`, is saved verbatim in `model-calls/`. A question is HOLD unless every call's
   `modelUsage` names exactly `claude-opus-5-5` with output tokens, and each call's prompt contains the current stem.
   Result: blind solve = official answer 50/50; final verdict PASS 50/50 (14 needed ≥1 FIX round). 166 calls, US$29.54.
5. **Explanation support** — HOLD if the final review flags any choice explanation, the general explanation or the URLs.
   Reference URLs are published only after a live check (`reference-url-checks.json`): e-Gov links via the e-Gov API v2
   law lookup, other *.go.jp pages by HTTP 200 plus a non-"not found" title. Unverifiable links (e.g. moj.go.jp, 403 from
   the build sandbox) were dropped, not published. Some product-feature/calculation questions have no government page.

## Issue found and fixed during acceptance

A rendered-page check showed Q55's stem truncated to 「下記の」: the stem names 〈親族関係図〉 before the figure caption and
the extractor cut at the first mention. The extractor now cuts at the last mention and aborts if the text before a figure
is short or not a prefix of the text-layer stem. Q55's model calls were deleted and re-run on the corrected stem (PASS).
Tests now require each released stem's first line to contain the question sentence and each saved prompt to contain the stem.

## Validation

- `pnpm test`: 388 files / 3,944 tests passed.
- `pnpm typecheck`: pass. `pnpm lint`: pass (0 warnings).
- `pnpm validate:questions`: 15,352 ok / 0 fail (no warnings on the new questions).
- `pnpm build`: pass (4,054 static pages).
- Playwright FP2/qualification specs (production server): 9 passed.
- Not claimed: a Preview/production deploy check; the site's Gemini AI copilot path was not changed.
