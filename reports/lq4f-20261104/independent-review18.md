**gpt-6-astra read-only re-review: A PASS · B PASS · C PASS.** No mandatory findings remain.

| File | Verified changes |
|---|---|
| **A — `2025-pm-128-140.json`: PASS** | Exactly five fields changed: Q130 explanation/reason 3/URL; Q134 reason 4/URL. |
| **B — `2024-pm-125-139.json`: PASS** | Only Q129 reason 5 and URL changed. All original text, choices, and answers remain unchanged. |
| **C — `2024-pm-154-165.json`: PASS** | Only Q165 image alt text, SHA256, and left crop coordinate changed. |

Q130 and B/Q129 correctly apply the **150 mm minimum irrespective of pipe diameter** for drinking-water tanks; therefore, 125 mm is insufficient. Verified against Tokyo’s SHASE-S206-based table, printed p.68. Q130’s replacement flow-speed explanation also checks out. [Tokyo guidance](https://www.gesui.metro.tokyo.lg.jp/documents/d/gesui/3_3_R3youkou), [flow-speed guidance](https://www.city.higashihiroshima.lg.jp/material/files/group/57/004_Chapter2_in_drainage.pdf)

Q134’s **0.2–0.32 MPa** normal operating range and shock-wave explanation match the association’s 「④空圧式清掃法」. [National Pipe Cleaning Association](https://www.zenkankyo.jp/seisou)

Q165’s widened crop visibly retains the complete **「問題165」**, stem, blank rectangle, boxed ア・イ, headers, and all five rows. Regenerating source PDF page 24 using the recorded coordinates at 300 DPI reproduced the **1960 × 1088 PNG byte-for-byte**. Image SHA256: `45d94400848ffaca779d7f86176f6b6c390d6770750f1a4d71fa893adb72979a`.

| A question | Verdict | B question | Verdict | C question | Verdict |
|---|---|---|---|---|---|
| 128 | PASS | 125 | PASS | 154 | PASS |
| 129 | PASS | 126 | PASS | 155 | PASS |
| 130 | PASS | 127 | PASS | 156 | PASS |
| 131 | PASS | 128 | PASS | 157 | PASS |
| 132 | PASS | 129 | PASS | 158 | PASS |
| 133 | PASS | 130 | PASS | 159 | PASS |
| 134 | PASS | 131 | PASS | 160 | PASS |
| 135 | PASS | 132 | PASS | 161 | PASS |
| 136 | PASS | 133 | PASS | 162 | PASS |
| 137 | PASS | 134 | PASS | 163 | PASS |
| 138 | PASS | 135 | PASS | 164 | PASS |
| 139 | PASS | 136 | PASS | 165 | PASS |
| 140 | PASS | 137 | PASS | — | — |
| — | — | 138 | PASS | — | — |
| — | — | 139 | PASS | — | — |

Prior PASS findings were retained **only for exactly unchanged content**. B’s accepted-baseline lineage was verified: its differences from the review11-reviewed manuscript concern acceptance metadata only. All seven referenced images and saved source-PDF hashes verified.

**Exact CURRENT JSON SHA256**, rechecked unchanged at review completion:

```text
A — 2025-pm-128-140.json
c168c5fd5b60247f55ccd13e384d2742fec6108d480bdcc24bf2f64d38620730

B — 2024-pm-125-139.json
8a782d6f21cef9061d88175a1fb8dc5c002e9bcd3b9e1fb1cf46a0e61cd9ee94

C — 2024-pm-154-165.json
e04d3e80b8f1caa721f27097dbc650dcd0f19b634820b5f02375f2f89d34cf55
```

Old receipt hashes do **not** certify these changed bytes. No files were edited, resealed, or published.