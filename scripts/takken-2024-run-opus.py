"""Run one bounded Takken 2024 review with a proven first-party Opus 5.5 receipt."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import denken3_cli


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("prompt", type=Path)
    parser.add_argument("receipt", type=Path)
    args = parser.parse_args()
    if args.receipt.exists():
        raise FileExistsError(f"refusing to overwrite an accepted attempt: {args.receipt}")
    prompt = args.prompt.read_text(encoding="utf-8")
    request = {"type": "user", "message": {"role": "user", "content": [{"type": "text", "text": prompt}]}}
    stdout, model_usage, result = denken3_cli.run(request, "high", 900)
    parsed = denken3_cli.extract_json(result, "{")
    if not isinstance(parsed, dict) or not isinstance(parsed.get("items"), list):
        raise ValueError("Claude result lacks items")
    args.receipt.parent.mkdir(parents=True, exist_ok=True)
    args.receipt.write_text(json.dumps({
        "model": "claude-opus-5-5",
        "resolvedModel": "claude-opus-5-5",
        "modelUsage": model_usage,
        "inputSha256": hashlib.sha256(prompt.encode("utf-8")).hexdigest(),
        "rawStreamSha256": hashlib.sha256(stdout.encode("utf-8")).hexdigest(),
        "result": json.dumps(parsed, ensure_ascii=False),
        "is_error": False,
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Opus 5.5 first-party receipt: {args.receipt} ({len(parsed['items'])} items)")


if __name__ == "__main__":
    main()
