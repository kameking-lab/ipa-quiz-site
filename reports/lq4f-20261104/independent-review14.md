**FAIL — 2 mandatory corrections** in [2025-pm-128-140.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-pm-128-140.json).

The independent review was performed by **gpt-6-astra**, read-only. All 13 stems, 65 choices, official answers, source metadata, and three retained image assets passed verification. The failures concern explanations for Q130 and Q134. No files were changed.

### Mandatory corrections

1. **Q130 — remove the unsupported claim that choice 3 conflicts with general technical standards.**

   Affects [explanation, line 89](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-pm-128-140.json:89) and [choiceExplanations["3"], line 93](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-pm-128-140.json:93).

   The manuscript applies “2×pipe diameter and at least 150 mm,” concludes that a 100 mm pipe requires 200 mm, and presents the official choice as technically inconsistent. However, the Tokyo Sewerage Bureau’s SHASE-S206-based table explicitly specifies **at least 150 mm for drinking-water storage tanks, irrespective of the diameter table**. A different standard cannot establish a contradiction without demonstrating its applicability. [Tokyo drainage equipment guidelines, p.68](https://www.gesui.metro.tokyo.lg.jp/documents/d/gesui/3_3_R3youkou)

   Suggested replacements:

   - `explanation`: 「正答は5です。自然流下式の排水横管は、管内流速を一般に0.6～1.5m/s程度とするように勾配を設けます。」
   - Reason 3: 「適当です。飲料用貯水槽等の間接排水管の排水口空間は、管径によらず最小150mmとする基準に対応しています。」

   Retain the original question, choices, and official answer **5**.

2. **Q134 — correct the normal air-pressure cleaning range.**

   Affects [choiceExplanations["4"], line 245](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-pm-128-140.json:245).

   Replace 「一般に0.4〜0.5MPa程度」 with **「一般に0.2～0.32MPa程度」**. The National Pipe Cleaning Association distinguishes this usual operating range from maximum pressure. [Association technical description, 「④空圧式清掃法」](https://www.zenkankyo.jp/seisou)

   Suggested replacement:

   「不適当です。空圧式清掃法は、一般に0.2～0.32MPa程度の圧縮空気を一気に放出し、その衝撃波で閉塞物を除去します。」

   Retain the original question, choices, and official answer **4**.

### Per-question verdicts

“Transcription passed” covers the stem and **all five choices**, inspected against official page images. Technical review covers the overall explanation and **all five choice reasons**.

| Q | PDF page | Official answer | Transcription | Explanation and five reasons | Verdict |
|---|---:|---:|---|---|---|
| 128 | 14 | 3 | Passed | Vent takeoff distance, combined venting, highest fixture reference, opening clearance, and bend explanation consistent. | **PASS** |
| 129 | 14 | 4 | Passed | Sediment sump, outlet drop, trap, strainer opening allowance, and infiltration explanations consistent. | **PASS** |
| 130 | 14 | 5 | Passed | Reasons 1, 2, 4, 5 consistent; reason 3 and overall explanation require correction above. | **FAIL** |
| 131 | 15 | 4 | Passed | Cleanout sizing and spacing, chamber sizing, 120D interval, and invert explanations consistent. | **PASS** |
| 132 | 15 | 1 | Passed | Pump clearance, joints, trap, pump selection, and lint interceptor explanations consistent. **13 mm is not a transcription error.** | **PASS** |
| 133 | 15 | 3 | Passed | Trap depth, individual venting, indirect drainage, seal retention, and opening ratio consistent. Original table retained. | **PASS** |
| 134 | 15 | 4 | Passed | Reasons 1, 2, 3, 5 consistent; reason 4 requires pressure correction above. | **FAIL** |
| 135 | 16 | 2 | Passed | Cleaning, monthly insulation measurement, statutory cleaning interval, seal replacement guidance, and vent inspection consistent. Original table retained. | **PASS** |
| 136 | 16 | 1 | Passed | Urinal categories, direct supply, bathtub insulation conditions, flush-valve pressure, and automatic faucet explanations consistent. | **PASS** |
| 137 | 16 | 2 | Passed | All five components of the statutory septic-tank definition consistent. Numbered term correspondence retained. | **PASS** |
| 138 | 17 | 1 | Passed | Treatment sequence, sludge storage/concentration, return flow, and all distractor reasons consistent. Original diagram retained. | **PASS** |
| 139 | 17 | 4 | Passed | Backflow prevention, sediment removal, materials, circulation-water inlet, and suction protection consistent. | **PASS** |
| 140 | 17 | 5 | Passed | Emergency performance, annual reporting, six-month equipment inspection, fault repair, and three-year reporting consistent. | **PASS** |

### Verification basis

- Inspected official rendered images `biru-kan-2025-pm-p014.png` through `p017.png`; read the corresponding **eight TXT files across both OCR passes**. Image evidence resolved OCR errors.
- Compared all answers with `official-answer-index.json`.
- Compared every source URL, PDF page, and source SHA with `source-inventory.json`; independently hashed the saved PDFs.
- Inspected Q133, Q135, and Q138 assets. In-memory rendering from their declared PDF crop coordinates and 300 dpi produced **identical dimensions and RGB pixels**.
- Confirmed `expectedFullQualificationCount:360`, draft/unregistered status, and `publicGo:false` are intentional and are not findings.

Additional primary verification sources included:

| Questions | Sources |
|---|---|
| 128–133 | [Hiroshima drainage/vent guidance](https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/010/167/13368.pdf), [Musashino cleanout requirements](https://www.city.musashino.lg.jp/_res/projects/default_project/_page_/001/015/410/kaisetu202401.pdf), [Saga indoor drainage standards, including 13 mm interceptor screen](https://www.water.saga.saga.jp/site_files/file/haisuisetubigijutukijun-3%2820240401%29.pdf), [Sapporo pump clearance](https://www.city.sapporo.jp/gesui/03otoiawase/haisuisou.html) |
| 134–135 | [National Pipe Cleaning Association](https://www.zenkankyo.jp/seisou), [MHLW building sanitation requirements](https://www.mhlw.go.jp/bunya/kenkou/seikatsu-eisei10/index.html), [METI pump maintenance example](https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/mine/portal/kaisetsu/kaisetu-3.pdf) |
| 136 | [Exam body’s JIS-related correction notice](https://www.jahmec.or.jp/uploads/100H_teisei.2023.11.1.pdf), [Tokyo bathtub insulation conditions](https://www.juutakuseisaku1.metro.tokyo.lg.jp/syoene_saienejuutakuplatform/platform_02/setsubi04.html), [Ebara fixture pressure guidance](https://www.ebook.ebara.com/handbook/unit/60Hz/html/pageindices/index352.html) |
| 137–138 | [Septic Tank Act, Article 2](https://laws.e-gov.go.jp/law/358AC1000000043?occasion_date=20170401), [Yokohama septic-tank guidance](https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/gomi-recycle/shinyo/jokaso/joukasou.files/0030_20240319.pdf) |
| 139–140 | [MHLW public-bath sanitation guidance](https://www.mhlw.go.jp/web/t_doc?dataId=00tb3600&dataType=1&pageNo=1), [FDMA inspection/reporting intervals](https://www.fdma.go.jp/singi_kento/kento/items/post-63/12/sankou12-7.pdf), [Saitama generator inspection guidance](https://www.pref.saitama.lg.jp/a0404/yobou/jikahatutenken.html) |

### Optional improvements

- Populate the empty `explanationReferenceUrls` with the relevant primary sources.
- Q132 reason 5 could directly explain the public specification of a removable basket screen with openings **13 mm or smaller**, rather than saying merely “treated as appropriate in this question.”
- Q129 reason 4 could qualify its “approximately twice” opening-area guidance by strainer shape and specification; published criteria vary. [Furano drainage standards](https://www.city.furano.hokkaido.jp/fs/2/9/1/2/0/_/sekkei_kijyun_all.pdf)

### Exact SHA-256

| Reviewed JSON | SHA-256 |
|---|---|
| `2025-pm-128-140.json` | `db536353723d0a76a8b52e7dc7fb3dfcda1abb58295c496843ba790cfd9753bc` |
| `source-inventory.json` | `4d46f6675fc766355a00c48e8be3243f725c2f7e67a8fc79e8ef2f063f6fb322` |
| `official-answer-index.json` | `ae007f42cdf7c18939cd044e9fda0b05287e4c02ad8287a5fa05a4a64f81dfd5` |

The manuscript hash was recalculated at review completion and remained unchanged.

| Verified source/asset | SHA-256 |
|---|---|
| Question PDF | `6d537264afbd40657eb6075fbf16e07cd879528a6925a67abd5bb52a241ed3e8` |
| Answer PDF | `587f114205af05d4776f241af9a822bff5caa70bae5178f13ad6c948d8ac4088` |
| `2025-pm-133-table.png` | `a754cadd34f203d123ec0ca2ef922947e43c9efefeda90171e5452ac998dd2c1` |
| `2025-pm-135-table.png` | `0e56e2149ccd969e36a8449f215c9c449d0cf55217130d3c55ab015217e715be` |
| `2025-pm-138-figure.png` | `c58355a6b6edd0b477c23c1487ba03a8d11a51d33650496925062fe08c3f66db` |