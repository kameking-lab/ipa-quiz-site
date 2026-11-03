"""Render only the 2026 practical figures without touching earlier editions."""

import json
from pathlib import Path

import fp3_render_practical as renderer


root = Path(__file__).resolve().parents[1]
renderer.SOURCE = json.loads((root / "docs" / "evidence" / "fp3-2026-may" / "jitsugi-extraction.json").read_text(encoding="utf-8"))
renderer.RECEIPT = root / "data" / "questions" / "fp3" / "practical-figures-2026-05.json"

if __name__ == "__main__":
    renderer.main()
