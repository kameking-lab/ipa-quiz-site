**Overall: PASS for this partial staging content review. Mandatory corrections: none.** This does not authorize publication or registration.

Reviewed [2024-am-046-061.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-am-046-061.json): all 16 questions, 80 choices, 80 choice explanations, general explanations and metadata. Read both OCR passes; visually inspected original p017–p021 and the official answer-check image. OCR errors were resolved against the images.

Exact JSON SHA-256:
`85201c81810964ae8c707906313bbd606e7f5a686958ed39c5746bfa17fb03c3`

Per-question results; answer numbers are verified against the official answer image:

- **Q46 PASS — 4:** All five unit combinations match. Sound pressure is Pa; W/m² is sound intensity.
- **Q47 PASS — 2:** Conditions and choices match. Manual calculation: area = 5 × 3 × 3 = 45 m²; ΔT = 20 − (−4) = 24 K; U = 1,350 ÷ (45 × 24) = **1.25 W/(m²·K)**.
- **Q48 PASS — 1:** A has the steepest temperature gradient and smallest conductivity, because |q| = λ|dT/dx|. B’s larger thickness does not imply smaller conductivity. Outdoor surface temperature difference is smaller, supporting greater outdoor heat-transfer coefficient. External insulation, equal steady heat flux and boundary-layer explanations agree with the figure.
- **Q49 PASS — 2:** All statements match; furniture against the exterior wall increases condensation risk.
- **Q50 PASS — 5:** The original deliberately says *second power*. Explanation correctly gives emission εσT⁴ and distinguishes net exchange between surfaces.
- **Q51 PASS — 2:** Full Bernoulli passage, both sides of the equation, variable definitions and all five ア／イ／ウ combinations match. Dynamic pressure / static pressure / pressure loss is correct.
- **Q52 PASS — 3:** Flow scales with √|ΔCp| and external wind speed; buoyancy flow scales with the square roots of height difference and density difference under otherwise fixed conditions.
- **Q53 PASS — 1:** All five size-order combinations match. Representative pollen > bacteria > virus ordering and airborne-carrier qualification are sound.
- **Q54 PASS — 3:** All statements match. Viruses require host cells; condensation water alone does not support replication. [NHGRI](https://www.genome.gov/genetics-glossary/Virus)
- **Q55 PASS — 4:** Infrared is non-ionizing; the other four classifications and explanations are correct.
- **Q56 PASS — 1:** CO₂ generation/concentration is the usual occupancy-related ventilation basis. The cited [ventilation report](https://www.mhlw.go.jp/content/11130500/000771220.pdf) supports this.
- **Q57 PASS — 5:** Original “10～20%台” is faithfully retained. **Exam treatment confirmed:** option 2 is accepted. **Independent corroboration:** Tokyo’s own study reports approximately 15–20% from the Showa 40s, with monitoring from FY1971. This supports the historical range, without establishing an exact commencement-year percentage or a current national rate. [Tokyo primary report, pp. 247–248](https://www.tmiph.metro.tokyo.lg.jp/files/archive/issue/kenkyunenpo/nenpo62/01-34.pdf)
- **Q58 PASS — 3:** All five pairings match. Historical chlorpyrifos use as a termiticide is supported by [MHLW](https://www.mhlw.go.jp/file/06-Seisakujouhou-11130500-Shokuhinanzenbu/0000155147.pdf); present restrictions on chlorpyrifos-added building materials are confirmed by [MLIT](https://www.mlit.go.jp/jutakukentiku/build/jutakukentiku_house_tk_000043.html).
- **Q59 PASS — 2:** All combinations match. Vapor partial pressure and dew point provide dependent information; fixed-pressure qualification is appropriate.
- **Q60 PASS — 2:** All five inequalities match. Explanation correctly qualifies the conventional room → equipment → heat-source load addition.
- **Q61 PASS — 3:** All choices match. Outdoor-air load includes moisture-related latent load.

**Figure verification: PASS.** Independently rendered the saved official PDF **in memory**, using each declared clip rectangle and 300 dpi with PyMuPDF 1.28.0. Generated PNG bytes exactly match both stored assets and declared hashes:

- Q47: `ed9863506abaf4b26fe9736678cddc240f71bd0e6e27b47c1b8e32004147aacf`
- Q48: `cc2d5e580f207f863fe01ee786c65fe952dc610e0e97523282101cd4fe49f66d`

Visual inspection confirms complete dimensions, arrows, floor label, temperature axis, A/B/C labels, indoor/outdoor labels and temperature curve. These are reproducible official-PDF crops, not redrawn diagrams.

**Source metadata/SHA: PASS.** PDF page references 17–21 correspond to printed pages 14–18; answer page 1 is correct. Saved source hashes match every question:

- Question PDF: `b788546847af935f8f068f0e0d2a5d5ea9ba302fa083a590ef4ffdd548a75aef`
- Answer PDF: `faebc327503541422b331d5e14ff47035cec23b6ef0fd1048f9d6cd8f3b9c54c`

**Optional improvements only:**

- Q47: replace unrelated distractor-error illustrations with direct numerical rejection; six faces would yield about 1.042, not option 5’s 2.10.
- Q57: add the direct Tokyo historical report to the references.
- Q58: use MLIT’s precise wording, “クロルピリホスを添加した建築材料の使用は禁止,” and add its reference.

No files changed. Partial-draft status, `needsIndependentReview: true` and `publicGo: false` remain intact.