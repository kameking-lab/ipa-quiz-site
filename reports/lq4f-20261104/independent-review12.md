**PASS — `data/qualification-staging/lq4c-biru-kan/2025-pm-109-127.json`**

Independent review completed by **gpt-6-astra**, read-only. **No mandatory corrections found.** No files were edited, registered, committed, or published.

All 19 stems and 95 choices were compared with the **10 original page images** covering PDF pages 9–13 in both OCR directories. Both OCR text passes were checked. Text matches apart from declared formatting normalization and omitted pronunciation guides.

All official answers match `official-answer-index.json`. Question/answer URLs, page numbers, and PDF hashes match `source-inventory.json` and the actual PDFs. Each explanation and all five choice reasons were reviewed.

| Question | Source PDF page | Official answer | Text—all five choices | Explanation—all five reasons | Verdict |
|---|---:|---:|---|---|---|
| 109 | 9 | 4 | PASS | PASS | PASS |
| 110 | 9 | 2 | PASS | PASS | PASS |
| 111 | 9 | 1 | PASS | PASS | PASS |
| 112 | 9 | 4 | PASS | PASS | PASS |
| 113 | 10 | 5 | PASS | PASS | PASS |
| 114 | 10 | 5 | PASS | PASS | PASS |
| 115 | 10 | 5 | PASS | PASS | PASS |
| 116 | 10 | 4 | PASS | PASS | PASS |
| 117 | 11 | 2 | PASS | PASS | PASS |
| 118 | 11 | 2 | PASS | PASS | PASS |
| 119 | 11 | 4 | PASS | PASS | PASS |
| 120 | 11 | 1 | PASS | PASS | PASS |
| 121 | 12 | 2 | PASS | PASS | PASS |
| 122 | 12 | 3 | PASS | PASS | PASS |
| 123 | 12 | 2 | PASS | PASS | PASS |
| 124 | 12 | 3 | PASS | PASS | PASS |
| 125 | 13 | 4 | PASS | PASS | PASS |
| 126 | 13 | 5 | PASS | PASS | PASS |
| 127 | 13 | 3 | PASS | PASS | PASS |

The required tables for **Q112 and Q113 are retained**. Both were inspected and match the recorded source PDF crops pixel-for-pixel. PDF pages 9–13 correspond to printed pages 6–10.

**Optional improvements only:**

- **Q120, `choiceExplanations.1`:** Explain that draw-off produces different supply and return flows, so reverse-return piping alone does not equalize circulation and temperature. [Technical basis](https://www.nikkenren.com/kenchiku/setsubi/setsubidata/info/contents/2kiki/2p25.pdf)
- **Q123, `choiceExplanations.2`:** Replace the weaker 「通常電気防食を必要としません」 with a clearer rationale: 「SUS444では水素脆化のおそれがあるため電気防食を施さない」. [MLIT specification](https://www.mlit.go.jp/common/001109857.pdf), [Stainless Steel Association](https://ssda.or.jp/wp-content/uploads/2024/07/publication05.pdf)
- **Q113 table asset:** Its upper margin contains a clipped question-number fragment. The complete table remains readable. A cleaner crop is optional; any replacement would require updated crop metadata and image hash.

Verification used the [official question PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025shiken_pm.pdf), [official answer PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025kizyun_seitou.pdf), saved source images, both OCR passes, and technical sources independently of the answer key. Additional checks included:

| Questions | Technical verification basis |
|---|---|
| 109–110 | [FY2022 water coverage figures](https://www.mlit.go.jp/mizukokudo/watersupply/content/001737264.pdf), [water-supply classifications](https://www.pref.gunma.jp/page/8237.html), [Water Supply Act Enforcement Order](https://laws.e-gov.go.jp/law/332CO0000000336/) |
| 111 | [Saitama building sanitation training material](https://www.pref.saitama.lg.jp/documents/10039/siryou-r1.pdf) |
| 113–116 | [Valve industry technical material](https://j-valve.or.jp/cms/wp-content/uploads/2023/05/550d17d7ca94643564a38d270ff96eb8.pdf), [Tokyo Waterworks design standard](https://www.waterworks.metro.tokyo.lg.jp/documents/d/waterworks/106023027007-07_r0804), [water-supply engineering material](https://www.kyuukou.or.jp/books/file-journal/kyuusui-kouji_vol19.pdf) |
| 117–118 | [Municipal maintenance manual](https://www.city.asahikawa.hokkaido.jp/kurashi/135/203/205/d069435_d/fil/manual.pdf); Q118’s approximate 30 m spacing additionally corroborated by a [piping supplier glossary](https://www.wadakizai.co.jp/glossary.html), not an official numerical standard |
| 120–124 | [Circulation balancing material](https://www.nikkenren.com/kenchiku/setsubi/setsubidata/info/contents/2kiki/2p25.pdf), [FDMA notice](https://www.fdma.go.jp/laws/tutatsu/assets/070731yo167.pdf), [MLIT specification](https://www.mlit.go.jp/common/001109857.pdf), [MHLW Legionella guidance](https://www.mhlw.go.jp/topics/bukyoku/kenkou/legionella/030725-1.html) |
| 125–127 | [MHLW building sanitation standards](https://www.mhlw.go.jp/bunya/kenkou/seikatsu-eisei10/index.html), [MLIT advanced water treatment](https://www.mlit.go.jp/common/830003002.pdf), [Osaka water-quality definitions](https://www.pref.osaka.lg.jp/o130130/gesui_jigyo/suishitu/suishituyougo.html) |

`expectedFullQualificationCount: 360`, partial draft status, and `publicGo: false` were treated as intentional.

Exact SHA256 of every reviewed JSON:

```text
data/qualification-staging/lq4c-biru-kan/2025-pm-109-127.json
08d14b98f2d99ae9e1e2f989ca4b47c1d7c7f15a122a24684e12cf11654392a0

reports/lq4b-20261104/official-answer-index.json
ae007f42cdf7c18939cd044e9fda0b05287e4c02ad8287a5fa05a4a64f81dfd5

reports/lq4b-20261104/source-inventory.json
4d46f6675fc766355a00c48e8be3243f725c2f7e67a8fc79e8ef2f063f6fb322
```

The manuscript hash was unchanged at the end of review.