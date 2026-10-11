# Zoen1 2026 first examination: five original supplement

Adds A21, A24, B5, B6 and B8 from the 2026 September first examination. These five original questions have 20 newly authored choice explanations. Saved editorial reuse: 0. The existing 24-question JSON remains byte-for-byte unchanged. Total available questions after this supplement: 29/65 (A 22/36; B 7/29). Another examination round has not been completed.

The source questions, four choices and official answers were checked against the repository's original PDFs. A21 is PDF page 9, A24 page 10; B5 and B6 are page 5, B8 page 6. The official answer PDF is page 1. Source page pixels were inspected before authoring. Superscript 3 omitted by the rubyless extractor was restored to m³ after checking pixels. B8's table was projected to Markdown without changing its ten values or their order. No figure-dependent or law-date-dependent question was added.

## Fixed primary sources

| Original | Evidence |
| --- | --- |
| A21 | [Forestry Agency civil works reference](https://www.rinya.maff.go.jp/j/sekou/gijutu/attach/pdf/bugakarisankou-58.pdf), PDF pages 1–2: L is loose/bank volume; C is compacted/bank volume. 13,500 / 0.9 = 15,000; 15,000 × 1.2 / 5 = 3,600 loads. |
| A24 | [MLIT rainwater reference](https://www.mlit.go.jp/common/000113728.pdf), printed page 7: Q = r × f × A / 360 with ha and mm/h. 0.25 × 80 × 7.2 / 360 = 0.4 m³/sec. |
| B5, B6 | [Japan Greenery Research and Development Center, MLIT-supervised fifth-revision explanation](https://www.jpgreen.or.jp/book/books/koukyouyou_2.pdf), printed pages 13–14 (definitions), page 36 (quality items). Tree vigor has seven items including root ball and bark; root ball describes the soil/root mass, root wrapping describes the operation. |
| B8 | NIST [location](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm) and [scale](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm): mode is most frequent value, range is maximum minus minimum. Given data: range 29 − 18 = 11; 19 appears three times. |

Sources inspected on 2026-10-11. The official question URLs and SHA-256 hashes remain in the supplement JSON and the existing source evidence README. The publisher's general reuse permission is handled by the owner; no new permission search was performed.

B2 is outside this batch: its calculation can be evaluated but an additional primary technical reference was not fixed. Other missing questions retain their existing state.

Requested model: gpt-6.1-sol as stated in the delegated instruction. The actual serving model cannot be independently verified through the available tools. No external paid model or author API was called.

Mechanical checks: `python scripts/audit-zoen1-supplement5.py`, existing pilot audit, focused Vitest and ESLint, TypeScript typecheck. Full build is delegated to PR CI. No merge or production publication is performed by this author.
