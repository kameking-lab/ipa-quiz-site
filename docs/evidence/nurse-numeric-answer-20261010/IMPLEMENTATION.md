# Original numeric-entry question support

Base: `f4d91ea0845ef307a9573155f494604a6c520cb9`.
Worktree: `C:/wt/nurse-numeric-answer-20261010`.
Scope: local implementation and unpublished fixture only; no question registration, Git push, PR, Claude request, authentication change, or paid API introduction.

## Data contract

```ts
type: "numeric",
numericAnswer: { format: "integer", unit: "滴/分" },
answer: "42",
```

Omit `choices`, `choiceExplanations`, `choiceImageUrls`, and `requiredSelections`. The common validator and practice-pool filter reject inconsistent numeric metadata. Numeric answers currently support nonnegative integers only; signed, decimal, scientific notation, and unit-bearing input are rejected. Full-width digits, leading zeros, and surrounding whitespace normalize to the canonical integer string without floating-point parsing.

The real, unpublished fixture is the 115th national nursing examination morning Q90. Its original wording and official answer were reused from the saved public-source packet; the existing saved explanation was reused without another model call. The printed form has two digit columns and the unit `滴/分`. No multiple-choice alternatives were invented.

- Packet SHA256: `1352e1df3ee6d6b9596179fd44a278fbe0f50fa94153cee642282b0e7c0298ff`.
- Saved draft SHA256: `45ecc98215d102731e57b0f3f47ebe43856ea782baff9429ea23f02bec2eade8`.
- Official question PDF: https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-05a_01.pdf
- Official answer PDF: https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-05seitou.pdf

## Implemented behavior

- Shared labelled numeric form in QuizPlayer and the canonical question reader, with validation feedback and a separate grading action.
- Blank/invalid input and IME composition do not grade or record an attempt. Enter in the input grades without bubbling to the next-question shortcut.
- Grading uses the existing history, last-question, spaced-review, study-day and quiz result mechanisms; units appear in feedback and structured answers.
- Numeric questions remain available to year/random/review/unanswered pools and scheduled review. The reader can reveal without recording, expose explanation/next links, and reset when navigation reuses the component.
- No registered question or image changes, no deletions. The withheld Q32 worktree is untouched.

## Validation

- New numeric and existing quiz/filter/accepted-answer unit tests: **100 passed, 0 failed** across 11 files. New numeric cases: 44; existing cases: 56.
- Existing two-choice-selection component regression: **5 passed, 0 failed**.
- Full `pnpm typecheck`: passed.
- ESLint of all 18 implementation/test files: passed.
- `git diff --check`: passed.
- Registered nurse data validator: **99 passed, 0 failed, 0 warnings**.

Raw local logs and JSON receipts are in `note-automation/reports/claude-capacity-20261010/NURSE-NUMERIC-*-20261010.*`.

Q90 remains unregistered. The integrating owner must compare the candidate to this numeric contract, then run the required CI/build/anonymous release checks on the combined commit. This task did not run a production build or modify the separately documented multiple-choice-only Public API v1 grade endpoint.
