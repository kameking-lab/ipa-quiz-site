**LK6 review: one P2 finding; changes requested.**

- **P2 — Restore the 2025 equipment paper’s shared instructions.** [shared-contexts.json:12](C:/Users/kanet/20260522/wt-khk-hanbai/data/qualification-staging/khk-hanbai/shared-contexts.json:12) omits cover instructions ⑺–⑻: pressures default to gauge pressure, and answers default to the LPG Act and its subordinate regulations. All 15 equipment-law questions inherit this omission. For example, Q8 states 2.0–3.3 kPa without specifying gauge pressure. Preserve both instructions in the shared context and add regression coverage; the current substring audit cannot detect omitted conditions.

Verified against `origin/main`, through head `73c44756b`, including initially untracked validator/test/audit files:

- 190 available questions: **80 + 80 + 30**, with 950 choice explanations.
- All stems and ordered choices match the local PDFs under normalization; all 12 official answer rows match.
- Source hashes, question-page references, staging validator, and TypeScript check passed.
- **40 equipment piping questions remain missing**—20 per year. Documented LY candidate 404s do not constitute complete coverage.
- Reproduction prohibition is recorded; it is **not a failure reason**, per your authorization. Questions remain private.

I made no filesystem or Git changes. Vitest was inspected but not independently executed.