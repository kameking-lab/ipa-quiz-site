# EM source-pack refresh invariant (2026-09-24)

`scripts/emkohyo-source-pack-orchestrate.py --refresh-stale` may replace a five-question pack only when the batch contains no published choice explanation. `--plan` lists the protected batches; focused one-question packs remain the route for unfinished questions in a protected batch. A matched excerpt is evidence for review, not acceptance.

The first broad refresh changed three packs referenced by five accepted receipts and reduced `reviewedPassCurrentHash` from 40 to 35. Those packs were restored byte-for-byte from the preceding commit before this checkpoint. The protection gate now skips all published batches, including the three affected packs. No accepted receipt or previously published explanation was changed to make the count pass.

Verification after restoration:

- `py -3.12 scripts/emkohyo-source-pack-invariant.py`: `acceptedPinsVerified=40`, `invalid=[]`.
- `py -3.12 scripts/emkohyo-choice-status.py`: `publicOverlays=40`, `reviewedPassCurrentHash=40`.
- `py -3.12 scripts/emkohyo-source-pack-orchestrate.py --refresh-stale --plan --limit-batches 50`: `pending=0`, `selected=[]`, `protectedPublishedBatches=20`.
- Compared with the preceding commit, all 488 published explanations are unchanged; only `emkohyo-EM20251807-q19` and `emkohyo-EM20261803-q16` were appended.
- `node scripts/validate-safety-exams.mjs --require-explanations`: PASS; EM two-year completion remains false at 40/360.

The 196 drafted/unaccepted questions without a current, verified government excerpt remain a research queue, not accepted content. Cached and stale packs must not be rehashed into a pass; use current government excerpts and a focused direct Opus 5.5 review for each candidate.
