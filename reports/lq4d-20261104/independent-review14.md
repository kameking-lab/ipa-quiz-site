**Overall: FAIL — two mandatory transcription corrections.** Read-only review completed for all 17 questions, 85 choices, 17 overall explanations and 85 choice explanations. I visually inspected PNGs p027–p031 and the direct official-answer image, consulting both OCR passes. No files were changed.

Current file SHA256, rechecked at completion:

`44c8e6a24de3cd5f8ba52d9abf2f2b563c17e035a4115951ed2da1b2cbe44128`

**Mandatory corrections**

- **Q75(2), [line 49](/C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-am-074-090.json:49):** JSON `停電時水撃作用` → original **`停電時の水撃作用`**. Enlarged visual inspection confirms the missing 「の」.
- **Q90(4), [line 563](/C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-am-074-090.json:563):** JSON `照明器具の焼損や火災` → original **`照明器具の燃焼や火災`**. “焼損” is technically plausible but is not the original wording.

**Per-question verdicts** — each includes all five choices and their explanations:

- **Q74 PASS**, answer **3**. Materials and high-temperature explanation acceptable; galvanized coatings have temperature-dependent service limits. [American Galvanizers Association](https://galvanizeit.org/hot-dip-galvanizing/how-long-does-hdg-last/in-extreme-temperatures)
- **Q75 FAIL**, answer **4** correct. Missing 「の」 above; technical explanations otherwise acceptable, including the ordinary centrifugal-pump head curve and qualified square-law resistance explanation. [Wilo](https://wilo.com/us/en_us/Training/On-Demand-Resources/Pump-Basics/Getting-the-Most-Out-of-Your-Pumps/)
- **Q76 PASS**, answer **2**. The heat-pump desiccant explanation correctly allows operation without humidification water supply or dehumidification drainage piping. [Daikin](https://www.ac.daikin.co.jp/desica/features)
- **Q77 PASS**, answer **2**. Thermal-desorption sensitivity, GC retention-window definition and qualified passive-sampling limitation are acceptable. Component-specific uptake rates support avoiding an absolute “passive measurement is impossible” claim. [MHLW method](https://www.mhlw.go.jp/hourei/doc/tsuchi/T250120I0020.pdf), [ESPEC](https://www.test-navi.com/jp/report/bn/tech_no40/40.pdf), [sampler manufacturer](https://www.sigmaaldrich.com/JP/ja/campaigns/passive-sampling-voc-passive)
- **Q78 PASS**, answer **3**. Measurement principles and all explanations consistent.
- **Q79 PASS**, answer **5**. Correct distinction: olf describes source strength; decipol describes perceived pollution concentration. [Fanger’s original paper](https://www.sciencedirect.com/science/article/pii/0378778888900515)
- **Q80 PASS**, answer **3**. The explanation’s “通常の” qualification appropriately confines the oxygen/IR statement; ordinary NDIR is unsuitable, while specialized laser absorption methods exist. [AKM](https://www.akm.com/jp/ja/products/gas-sensor/sensor-components/tutorial/types-mechanism/), [Yokogawa](https://www.yokogawa.co.jp/solutions/products-and-services/measurement/analyzers/gas-analyzers/tunable-diode-laser-spectrometer/)
- **Q81 PASS**, answer **5**. MTBF, preventive versus corrective maintenance, and aerosol explanation acceptable.
- **Q82 PASS**, answer **4**. Annual cleaning and startup/monthly inspections are correctly distinguished in substance. Product-dependent replacement is appropriate; a manufacturer’s pack example lasts approximately three months, not one year. [MHLW regulation](https://www.mhlw.go.jp/web/t_doc_keyword?dataId=79073000&dataType=0&keyword=%E5%BB%BA%E7%AF%89%E7%89%A9%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E8%A1%9B%E7%94%9F%E7%9A%84%E7%92%B0%E5%A2%83%E3%81%AE&mode=0&pageNo=1), [Aquas product specification](https://www.aquas.co.jp/wp-content/uploads/2022/09/1951058505e7c0a23cc399b8c807f702.pdf)
- **Q83 PASS**, answer **5**. Transmission loss, resonance, coincidence and smaller-is-better Lr explanation consistent.
- **Q84 PASS**, answer **3**. Entire passage and all **15 combination cells**, with ア／イ／ウ ordering, preserved. Explanations distinguish heavy-impact structural measures from soft finishes.
- **Q85 PASS**, answer **1**. Formula, all variable definitions, units and both supplied logarithms are complete; independent calculation confirmed below.
- **Q86 PASS**, answer **5**. Background noise, leakage and vibration isolation explanations acceptable.
- **Q87 PASS**, answer **2**. Glare, diffuse-globe classification, reflection and task/ambient explanations acceptable.
- **Q88 PASS**, answer **3**. All lamp/principle combinations preserved; explanations correctly distinguish semiconductor emission, thermal radiation and discharge.
- **Q89 PASS**, answer **2**. Solar-altitude projection independently confirmed below.
- **Q90 FAIL**, answer **3** correct. Original-word substitution above; maintenance explanations otherwise acceptable. Luminaire maintenance includes optical deterioration and dirt, distinct from the light-source factor. [Toshiba Lighting](https://www.tlt.co.jp/tlt/lighting_design/legal_rules/guides/ieij_led_mf/ieij_led_mf.htm)

All 17 answer numbers agree with the visually inspected official image and [official answer PDF](https://www.jahmec.or.jp/kokka/shiken_pdf/2025/2025kizyun_seitou.pdf). Intentionally false statements remain false as required.

**Numerics and completeness**

- Q85 retains `L₁−L₂ = TL + 10log₁₀(A₂/S_w)`, definitions of **L₁, L₂, A₂, S_w, TL**, their units, and `log₁₀2=0.3010`, `log₁₀3=0.4771`.  
  `TL = 80−40−10log₁₀(20/10) = 36.989700… dB`; using the supplied log gives **36.990 dB → 37 dB**.
- Q89: horizontal direct illuminance is `80,000 sin45° = 56,568.5425 lx`; nearest choice **56,000 lx**. Solar altitude is measured from the horizon.
- **No required figure is missing.** Q84’s labeled text preserves the table; Q85’s text preserves the mathematical information.

**Metadata**

- Unique, consecutive IDs/numbers **74–90**; exactly **17/85/85** questions/choices/choice explanations.
- PDF page references correct: **74–77→27; 78–81→28; 82–84→29; 85–87→30; 88–90→31**. These correspond to printed pages **24–28**. Answer page **1** correct.
- Both recorded source SHA256 values match the local source PDFs exactly:
  - Questions: `0947f24245ec6ebd75654824605f426429634c17b4ca8f9d0e7d92388752ba40`
  - Answers: `587f114205af05d4776f241af9a822bff5caa70bae5178f13ad6c948d8ac4088`
- Partial-draft status, `needsIndependentReview:true` and `publicGo:false` remain intact.
- **`expectedFullQualificationCount:360` is not independently established by this file.** The 2025 exam has 180 questions. A 360-question multi-year collection target is possible, but its scope is unspecified here; do not interpret it as the 2025 exam count.

**Optional improvements**

- Q82 explanation: replace ambiguous `年1回以内` with `1年以内ごとに1回`; specify inspections during use and the statutory non-use exception.
- Add direct primary-source URLs to explanation references; most are currently empty.
- Clarify the collection scope underlying **360**. No additional content correction is needed for Q84, Q85 or Q89.