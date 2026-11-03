# Saved AM Q76–90 integration (local only)

Exactly 29 ready originals were reused from candidate SHA256 `0f356d62290ac970a50e96af92b1b7029997836bb318f96764b14ecd01672145`. The only data transformation was Q90 `type: descriptive` to the implemented `type: numeric`; original wording, answer and explanation were retained. Q80 accepts either official choice 4 or 5 as one selected answer. Q88 includes its existing targeted primary-source correction. Q79 and the previously withheld Q32 remain absent.

The normally merged parent candidate is `cb2b09d971b7326b4c28590070a2f86a732124d4`. All 149 previous original question objects are unchanged; their canonical object SHA256 values are recorded in `INTEGRATION.json`. No question or image was deleted.

This local candidate contains **178 originals**: 114th AM 90, 115th AM 88, **738 choices with every choice explanation**, plus **one numeric original**. Two complete sittings: **0**. AM Q91 onwards and all afternoon questions are still absent at this commit. Hub, catalog and metadata state the partial scope and both withheld AM questions.

The year archive now opens numeric originals directly in the unanswered quiz, with the original year/session/return target. The existing selection-count validator accepts explicit `requiredSelections: 1`; numeric questions still must omit that field.

Validation: **73 tests passed / 0 failed**, full TypeScript passed, targeted ESLint passed, diff check passed. Registered-data validator: **178 passed / 0 failed / 1 preexisting warning** (115th AM Q52 MRI/pacemaker explanation wording). The parent's separate clinical review remains responsible for that earlier question and the other earlier flags. Five new tests use real registered data, old149 object hashes, official alternative/multiple-selection contracts, numeric grading/history and the year link.

The preceding numeric fixture production build and browser proof are in `../nurse-numeric-answer-20261010/`. That build preceded this data registration; the combined release still requires parent-owned CI and anonymous production verification. This task made **0 public pushes, 0 PRs and 0 model calls**.
