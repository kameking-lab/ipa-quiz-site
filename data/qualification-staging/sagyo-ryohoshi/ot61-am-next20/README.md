# OT61 morning: 20 source-verified candidates

This independent `Question[]` module completes original questions AM51–57, AM59,
AM61–71 and AM73 from the 61st occupational therapist exam. It contains the
original stems, all 100 original choices, the official keys and 100 choice
explanations. AM66, AM67, AM70 and AM73 each require two selections.

The official booklet is dated 23 February 2026. The existing site's canonical
mapping is round 61 → year 2025; `examDate` and the attribution retain the actual
exam date/year. Numeric choices 1–5 map to ア–オ without reordering. The supplied
question/answer PDFs were SHA-256 checked. Every original page and answer cell
was visually inspected. None of these 20 originals requires a question figure.

`docs/evidence/ot61-am-next20-20261011/SOURCE.json` stores the original text,
official keys, source URLs/digests, physical page numbers, source-render hashes,
visual checks and explanation references. Evidence images are unaltered renders
from those original PDFs, not runtime question assets. `MHLW-attributed` is the
existing schema attribution label; this change does not invent reuse permission.
The owner handles publication rights.

At claim time, main `4b190a6fb8df715c223b45a7d495a33bdd33a363` held 299 OT
questions across the latest two rounds (400 originals in total). These 20 had
zero overlap with main, open PRs, helper reservations or queued/pending owner
drafts. The helper reservation is `automotive-ot-next20-20261011`. This change
does not register the candidates, change displayed counts, merge or deploy.

## Integration handoff

Import `OT61_AM_NEXT20_QUESTIONS` from
`@/data/qualification-staging/sagyo-ryohoshi/ot61-am-next20`. The integration owner
must recheck exact IDs against current main, all live PRs and reservations, then
append these originals to the OT collection and update the affected registered
counts/tests. Existing PR742, PR743 and PR748 are separate work. Exclude none of
their originals or official-key corrections to make this batch fit.

Public increment is **0** in this PR; completed candidates increment is **20**.
No source shortage or held ID remains inside this assigned batch. This does not
claim completion of all 400 originals in the latest two rounds.

Local validation is recorded in `docs/evidence/ot61-am-next20-20261011/QA.json`.
The scoped source test runs with:

```powershell
pnpm exec vitest run __tests__/questions/ot61-am-next20-staging.test.ts
```
