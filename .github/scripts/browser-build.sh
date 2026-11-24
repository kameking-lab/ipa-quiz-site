#!/usr/bin/env bash
set -euo pipefail

mode=$1
artifact=$2
expected_sha=$3

build_inputs() {
  local actual_sha
  actual_sha=$(git rev-parse HEAD)
  if [[ "$actual_sha" != "$expected_sha" ]]; then
    echo "Wrong checkout for the browser build: $actual_sha (expected $expected_sha)" >&2
    return 1
  fi
  printf '%s\n' "$actual_sha" "$(git rev-parse 'HEAD^{tree}')" "$(node --version)" "$(pnpm --version)" "$(uname -sm)"
  sha256sum package.json pnpm-lock.yaml
}

case "$mode" in
  pack)
    mkdir -p "$artifact"
    build_inputs > "$artifact/inputs.txt"
    test -s .next/BUILD_ID
    # Keep runtime output and both generated indexes. Cache and diagnostic
    # files are unnecessary for next start. Never bundle working-tree config.
    tar --exclude='.next/cache' --exclude='.next/diagnostics' --exclude='.env*' \
      -I 'gzip -1' -cf "$artifact/build.tar.gz" .next generated/question-corpus generated/copilot
    (cd "$artifact" && sha256sum build.tar.gz > build.sha256)
    ;;
  restore)
    build_inputs | cmp - "$artifact/inputs.txt"
    (cd "$artifact" && sha256sum --check build.sha256)
    tar -xzf "$artifact/build.tar.gz"
    test -s .next/BUILD_ID
    ;;
  *)
    echo "Usage: $0 {pack|restore} artifact-directory checkout-sha" >&2
    exit 2
    ;;
esac
