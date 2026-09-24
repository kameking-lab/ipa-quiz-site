#!/usr/bin/env bash
# Sequential author -> full review rounds for lckohyo choice explanations.
# One process at a time so two authoring runs never draft the same question.
# Never promotes: publication stays a separate, explicit --promote-reviewed step.
#   scripts/run-lckohyo-choice-loop.sh IDS_JSON [ROUNDS] [AUTHOR_BATCHES] [REVIEW_BATCHES]
set -euo pipefail
cd "$(dirname "$0")/.."
ids="$1"; rounds="${2:-5}"; author_batches="${3:-6}"; review_batches="${4:-6}"
for ((round = 1; round <= rounds; round++)); do
  echo "== round $round author"
  python3 scripts/complete-safety-choice-explanations.py --generate --question-ids "$ids" \
    --batch-size 6 --max-batches "$author_batches" --workers 3 || true
  mkdir -p docs/evidence/lckohyo-choice-candidates
  cp .cache/safety-choice-lckohyo/*.candidate.json docs/evidence/lckohyo-choice-candidates/ 2>/dev/null || true
  echo "== round $round review"
  python3 scripts/review-safety-choice-clusters.py --group lckohyo --review \
    --max-batches "$review_batches" --workers 3 || true
  python3 scripts/review-safety-choice-clusters.py --group lckohyo \
    --plan docs/evidence/lckohyo-pipeline-review-plan.json | tail -1
done
