VERDICT: PASS

No actionable findings or regressions found in the two corrections.

- Strict-mode server rendering excludes `BlogPractice` and its question, answer, and explanation props. The CTA carries the specific mapped question ID into `/quiz`, which preserves that ID and uses the existing authorization flow.
- DB and ES now display accurate unsupported-grading guidance pointing to existing IPA resources, without grading CTAs. Supported exam branches remain intact.
- Read both added test files; their assertions cover the corrected behavior.

Read-only code review only; no tests or builds run. Pending unit, build, E2E, and visual verification remain for the later evidence review.