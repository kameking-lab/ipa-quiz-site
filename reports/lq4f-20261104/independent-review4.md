**FAIL — [2024-pm-125-139.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-pm-125-139.json)**

Independent review completed by **gpt-6-astra, read-only**. No files were changed, committed, registered, or published. Three mandatory findings remain.

All 15 stems and 75 choices match the inspected official page images after declared formatting normalization, apart from Q126’s added editorial note. All official answers and source page/URL/SHA metadata match the supplied index and inventory.

| Question | Verdict | Official answer | Findings |
|---|---|---:|---|
| 125 | PASS | 2 | Stem, choices, explanation and five reasons checked. |
| 126 | **FAIL** | 3 | Original choice table missing; flow diagram retained correctly. |
| 127 | PASS | 4 | Water-testing intervals and five reasons checked. |
| 128 | PASS | 1 | Sewer-system and institutional explanations checked. |
| 129 | PASS | 5 | Dimensional explanation and five reasons checked. |
| 130 | PASS | 3 | Pump-selection explanation and five reasons checked. |
| 131 | PASS | 3 | Vent connection explanation and five reasons checked. |
| 132 | **FAIL** | 4 | Original two-column pairing table replaced with text. |
| 133 | PASS | 5 | Maintenance dimensions, including 150mm sediment sump, checked. |
| 134 | PASS | 2 | Retention time and atmospheric limits checked. |
| 135 | **FAIL** | 1 | Incorrect numerical explanation for snake-wire working lengths. |
| 136 | PASS | 5 | Five reasons checked; optional interval clarification below. |
| 137 | PASS | 2 | Statutory registration/licensing distinctions checked. |
| 138 | PASS | 4 | Five reasons checked; optional rationale improvement below. |
| 139 | PASS | 2 | Inspection and reporting intervals checked. |

**Mandatory corrections**

1. **Q126 — retain the original choice table.**  
   `questions[1].figures` contains the treatment-flow diagram, but not the original five-row **ア／イ** choice table on PDF physical page 13. Preserve a direct crop of that original table, with source page and asset hash. Labeled choice strings may remain as supplementary text; they do not satisfy the requested original-table retention. Update `transcription` accordingly.

   The added text `（列：ア、イ。処理フローは原図参照）` is editorial, not part of the official stem. Move it outside the exact-transcription field. The choice contents, answer and technical explanations are correct.

2. **Q132 — retain the original pairing table.**  
   `questions[7].choices` flattens the original two-column, connecting-line layout into strings. Preserve the original five-row layout from PDF physical page 14 as a direct crop, record its provenance/hash, and update the asset metadata and `transcription`. Do not redraw it. The pairing contents and explanations are correct.

3. **Q135 — correct `questions[10].choiceExplanations["1"]`.**  
   Current text incorrectly states **vertical approximately 10m / horizontal 30m**.

   Suggested replacement:

   > 不適当です。厚生労働省「建築物における維持管理マニュアル」では、排水立て管はワイヤの重量から20m程度が限界とされ、排水横管は25mまでとされています。

   The primary source specifies **vertical approximately 20m / horizontal 25m**, printed page 41, PDF page 4. Answer **1** remains correct. [MHLW maintenance manual, Chapter 4](https://www.mhlw.go.jp/bunya/kenkou/seikatsu-eisei09/pdf/03e.pdf)

**Optional improvements**

- **Q136, reason 5:** Monthly inspection has primary-source operational support, so its wording as a practical “目安” is not a demonstrated error. Cite the adopted maintenance standard and distinguish it from a uniquely prescribed examination interval. [MHLW facility maintenance specification](https://www.mhlw.go.jp/public/bosyuu/iken/dl/p20150924-01-01.pdf)
- **Q138, reason 5:** Strengthen the bottom-return explanation with the official hygienic rationale: preventing accidental drinking of recirculated water and aerosol generation. The existing surface-dirt rationale was not established as false. [MHLW public-bath hygiene guidance](https://www.mhlw.go.jp/web/t_doc?dataId=00tb3600&dataType=1&pageNo=1)
- Populate `explanationReferenceUrls`, particularly for numerical and legal explanations. Empty arrays alone were not treated as mandatory failures.

**Verification basis**

- Visually inspected original saved images `biru-kan-2024-pm-p013.png` through `p016.png`; checked both saved OCR passes.
- Inspected Q126’s saved figure: the original flow is retained, but the choice table is absent.
- Checked every explanation and all five reasons individually. This does **not** mean a separate external citation was obtained for every sentence.
- Matched answers against `official-answer-index.json`; matched URLs, PDF physical pages and SHA metadata against `source-inventory.json`; recomputed source PDF and retained-figure hashes.
- Additional primary checks included [2024 MHLW miscellaneous-water guidance](https://www.mhlw.go.jp/content/11601000/001237732.pdf), [2023 municipal water-supply guidelines](https://www.shibetsutown.jp/file/contents/1704/15039/R05.04.pdf), [drainage technical standards](https://www.town.kibichuo.lg.jp/reiki/reiki_honbun/r056RG00000488.html), [Tokyo’s September 2024 building-pit guidance](https://www.tmiph.metro.tokyo.lg.jp/k_kenchiku/bldg/bldgpit/), [Environment Ministry legal-system material](https://www.env.go.jp/content/900496999.pdf), and [FDMA inspection](https://www.fdma.go.jp/singi_kento/kento/items/kento128_06_shiryo5.pdf) and [reporting guidance](https://www.fdma.go.jp/mission/prevention/suisin/items/minpaku_leaf_horetai.pdf).
- `expectedFullQualificationCount:360` correctly denotes **2 × 180**. Intentional draft/unregistered status and `publicGo:false` are not findings.

Exact SHA256 values for **every reviewed JSON**, unchanged between start and end:

```text
data/qualification-staging/lq4c-biru-kan/2024-pm-125-139.json
6ec2a149676c8916eeaabfd1a849dbf2afcf585bdd7261959c302c4b37d0743e

reports/lq4b-20261104/official-answer-index.json
ae007f42cdf7c18939cd044e9fda0b05287e4c02ad8287a5fa05a4a64f81dfd5

reports/lq4b-20261104/source-inventory.json
4d46f6675fc766355a00c48e8be3243f725c2f7e67a8fc79e8ef2f063f6fb322
```

Verified source hashes:

```text
biru-kan-2024-pm.pdf
3af224c2aa9fab1ca58032efd8911ad1339c3c005751745a046c7154b0ec0e73

biru-kan-2024-answer.pdf
faebc327503541422b331d5e14ff47035cec23b6ef0fd1048f9d6cd8f3b9c54c

assets/2024-pm-126-figure.png
441dd16add75e31ae017b8e2d8b68e6b7f3c1e7b9e2dc76ffc31620e45c1831e
```