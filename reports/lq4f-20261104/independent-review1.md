**FAIL — `2024-pm-091-105.json`**

The requested **gpt-6-astra** reviewer completed the read-only review: **13 questions PASS; 2 FAIL**. Two transcription corrections are mandatory. No mandatory technical corrections were found in the 15 explanations or 75 choice reasons. No files were changed.

**Mandatory corrections**

1. **Q099 — choice 1**, `questions[8].choices["1"]`, [line 286](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-pm-091-105.json:286)  
   Change **`巻上機の速度制御` → `走行機の速度制御`**.  
   The official image says 「走行機」; both OCR passes agree. Even if the substituted term seems technically preferable, the manuscript must preserve the official choice.

2. **Q101 — choice 2**, `questions[10].choices["2"]`, [line 355](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-pm-091-105.json:355)  
   Change **`カーテン、幕、絨毯等` → `カーテン、暗幕、絨毯等`**.  
   「暗」 is missing.

Both occur on physical PDF page 6, printed page 3 of the [official 2024 afternoon examination](https://www.jahmec.or.jp/kokka/shiken_pdf/2024/2024shiken_pm.pdf). Neither correction changes the official answer.

**Per-question verdicts**

Each verdict covers the stem, all five choices, official answer, source metadata, explanation, and all five choice reasons.

- **091: PASS** — answer 1; page 4.
- **092: PASS** — answer 1; page 4.
- **093: PASS** — answer 3; page 4.
- **094: PASS** — answer 4; page 4.
- **095: PASS** — answer 5; page 5.
- **096: PASS** — answer 2; page 5.
- **097: PASS** — answer 4; page 5.
- **098: PASS** — answer 5; page 5.
- **099: FAIL** — answer 3; page 6. Choice 1 transcription error above; explanation and reasons pass.
- **100: PASS** — answer 1; page 6.
- **101: FAIL** — answer 2; page 6. Choice 2 transcription error above; explanation and reasons pass.
- **102: PASS** — answer 3; page 7.
- **103: PASS** — answer 5; page 7.
- **104: PASS** — answer 1; page 7.
- **105: PASS** — answer 2; page 8.

Page numbers above are physical PDF pages (`sourceQuestionPage`).

**Verification basis**

- Visually inspected saved official images `ocr-pass1/biru-kan-2024-pm-p004.png` through `p008.png`, with both OCR passes as supporting evidence.
- Checked all 15 answers against `official-answer-index.json` and visually inspected the saved [official answer sheet](https://www.jahmec.or.jp/kokka/shiken_pdf/2024/2024kizyun_seitou.pdf).
- All question/answer URLs, page references, and PDF hashes match `source-inventory.json`; source PDFs were independently rehashed.
- Reviewed all 15 explanations and **all 75 choice reasons**, independently checking uncertain legal and numerical claims. Notable checks included:
  - Reinforcement cover **4 cm** and stirrup diameter **6 mm** against the [Building Standards Act Enforcement Order](https://laws.e-gov.go.jp/law/325CO0000000338?occasion_date=20250329).
  - Annual gas-leak inspections for specified underground premises against [METI’s 2018 material](https://www.meti.go.jp/shingikai/sankoshin/hoan_shohi/gas_anzen/pdf/018_02_01.pdf).
  - Combustion air: `10.7 × 3.6 ÷ 45 = 0.856 m³/h per kW`, consistent with 0.8–0.9, using [Tokyo Gas air requirements](https://home.tokyo-gas.co.jp/gas_power/plan/gas/feature.html) and [gas heat value](https://support.tokyo-gas.co.jp/faq/show/2193?site_domain=open).
  - Earthquake energy increasing approximately **32 times** per magnitude unit against [JMA](https://www.jma.go.jp/jma/kishou/know/faq/faq27.html).
  - 防炎物品 versus 防炎製品 and emergency-lighting **1 lx / 2 lx** against [FDMA terminology](https://www.fdma.go.jp/relocation/html/life/yobou_contents/fire_retardant/index.html) and [FDMA lighting material](https://www.fdma.go.jp/laws/tutatsu/items/c40384a337f4a9076a2d438943928754a6275472.pdf).
  - Building definitions and repair classifications against the [2024 law version](https://laws.e-gov.go.jp/law/325AC0000000201?occasion_date=20240529) and [MLIT’s 2021 guidance](https://www.mlit.go.jp/jutakukentiku/house/content/001374063.pdf).
  - BELS against the [Japan Building Center](https://www.bcj.or.jp/assessment/bels/).

The review treated this as historical 2024 content; later regulatory changes were not applied retrospectively.

No required figures or substantive tables are missing. Q098 and Q102 retain all five term-to-description pairings. Whitespace, superscripts, character-width differences, and equivalent glyph variants were treated as typography rather than substantive transcription errors.

**Optional improvements**

- Populate the currently empty `explanationReferenceUrls`, particularly for legal and numerical explanations.
- Q096 choice 5: explicitly describe liquid water from condensation or ingress occupying insulation voids.
- Q097 choice 5: clarify the assumed fuel behind the approximate combustion-air requirement.

`expectedFullQualificationCount:360`, `publicGo:false`, and the draft/unregistered state were correctly treated as intentional.

**SHA-256 of every reviewed JSON**

- `data/qualification-staging/lq4c-biru-kan/2024-pm-091-105.json`  
  `39640d5c8966da1ad57e7500561aac1d82dd5c15f4d6bb4b11ba65a81e431194`
- `reports/lq4b-20261104/official-answer-index.json`  
  `ae007f42cdf7c18939cd044e9fda0b05287e4c02ad8287a5fa05a4a64f81dfd5`
- `reports/lq4b-20261104/source-inventory.json`  
  `4d46f6675fc766355a00c48e8be3243f725c2f7e67a8fc79e8ef2f063f6fb322`

Verified source PDF hashes:

- Question PDF: `3af224c2aa9fab1ca58032efd8911ad1339c3c005751745a046c7154b0ec0e73`
- Answer PDF: `faebc327503541422b331d5e14ff47035cec23b6ef0fd1048f9d6cd8f3b9c54c`

The manuscript hash remained unchanged at completion.