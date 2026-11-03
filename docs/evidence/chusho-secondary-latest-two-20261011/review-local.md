# Independent local review

Scope: 2024/2025 case IV, question 3; narrow native UI contract. No manuscript regeneration or production mutation.

## Numeric findings

1. **2024 Q3(3): change required.** The market research was already conducted. Its 30万円 cost is sunk when deciding whether to implement the new machine. Remove the 30万円 deduction and change the recommendation to adopt.
2. **2024 Q3(1–3): tax timing needs correction or explicit interpretation.** Printed page 6 places all cash flows other than initial machine purchase and old-machine sale receipts at year-end. Under a literal gross-sale reading, the 33万円 disposal-loss tax benefit occurs at year 1 end, so part (1) is **69 / 74万円**, part (2) **51.14万円**, and part (3) **18.96万円, adopt**. The manuscript's time-zero net-sale convention instead yields **36 / 74万円**, **53.88万円**, and after removing sunk cost **21.70万円, adopt**. Prefer the literal year-end reading consistently. If retaining the alternative, explicitly state its tax-timing assumption and the alternative result. The official statement of intent does not publish exact answers or resolve this issue.
3. **2025 Q3: pass.** Printed page 6 explicitly puts all flows except equipment initial investment at year-end. Working capital of 9,000千円 is invested at year 1 end and recovered at year 4 end. Annual CFs are **10,620,000; 19,620,000; 19,620,000; 32,820,000円**. With supplied factors, **NPV 13,868,220円; adopt**.

Independent arithmetic:

```text
2024 base: -470 + (36+33)*.917 + 74*.842 + 89*5.033*.842 + 40*.460 = 51.143954万円
2024 expected: -470 + (33.48+33)*.917 + 68.12*.842 + 83.12*5.033*.842 + 40*.460 = 18.96397232万円
2025: (-60000 + 10620*.962 + 19620*.925 + 19620*.889 + 32820*.855)*1000 = 13868220円
```

Sources: [2024 problem](https://www.jf-cmca.jp/attach/test/shikenmondai/2ji2024/D2JI2024.pdf), [2025 problem](https://www.jf-cmca.jp/attach/test/shikenmondai/2ji2025/D2JI2025.pdf), [2024 official intent](https://www.jf-cmca.jp/attach/test/r06/2ji_shushi/r06_2ji_shushi_jirei4.pdf), [2025 official intent](https://www.jf-cmca.jp/attach/test/r07/2ji_shushi/r07_2ji_shushi_jirei4.pdf). The local PDF text cache was inspected and official problem PDFs were independently fetched.

## UI status

Pending implementation availability. Required checks: 33 originals / 54 solution blocks; separate question/page and official-intent provenance; independent editorial labels; no official automated score or score guarantee; draft saving; keyboard reveal; manual self-check; no inherited choice-quiz authentication path.

This is an editorial review, not an official answer endorsement, rights determination, or publication approval.

Static staging review: the six new route/component/schema files satisfy the stated label, provenance, draft-save, reveal keyboard semantics, and manual self-check contracts. Native buttons and inputs provide keyboard semantics; no browser interaction has been claimed. Independently counted CWT data: 8 papers / 33 originals / 54 solution blocks; all provenance literals correct; all constrained examples within limit. Recommendation: label 54 as 設問別解答例, not 解答欄, since a block can contain multiple official subfields. Installed CWT runtime review remains pending.

## Final verification

Installed CWT files reviewed. Numeric findings are resolved: 2024 primary answers now 69/74万円, 51.14万円, 18.96万円/adopt, with explicit alternative tax-timing convention. The 54 count labels now say 解答例. Installed schema and both components match the reviewed staging SHA256 values; all three installed routes were reread. Static contract review passes.

Runtime limitation: pnpm exec vitest run for the two dedicated tests could not start because the vitest executable was not recognized. This is an environment/tool-path blocker, not a failing assertion. No browser interaction or successful runtime test result is claimed by this reviewer. Parent runtime evidence remains necessary before claiming full UI verification. No production publication was performed or approved.
