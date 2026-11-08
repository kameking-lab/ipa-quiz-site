**LK6 re-review: PASS.** No new findings against `8f457fd69`; the prior P2 is resolved.

- Both R7 cover instructions ⑺–⑻ match the PDF and appear in all 15 equipment-law questions. Existing context is retained.
- Read-only source audit: **190 questions, zero mismatches**; regenerated results match the saved audit.
- Validator passes; removing instruction ⑺, ⑻, or both is rejected.
- TypeScript check and whitespace check pass.

Vitest was inspected, not executed; regression behavior was checked in memory. The documented 40 missing piping questions remain outside completed coverage.

No file or Git mutations performed.