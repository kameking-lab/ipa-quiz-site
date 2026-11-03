"""Regression canary for byte-pinned evidence mirrors."""

from hashlib import sha256
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase, main
from unittest.mock import patch

import denken3_cli


class EvidenceMirrorTest(TestCase):
    def test_private_absent_mirror_exact_only(self) -> None:
        with TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "data/raw_pdfs/denken3/review/page.png"
            mirror = root / "docs/evidence/denken3/input/review/page.png"
            mirror.parent.mkdir(parents=True)
            mirror.write_bytes(b"official page bytes")
            expected = sha256(mirror.read_bytes()).hexdigest()
            with patch.object(denken3_cli, "ROOT", root), patch.object(denken3_cli, "TRACKED_INPUT", mirror.parents[1]):
                self.assertEqual(denken3_cli.evidence_file(source, expected), mirror)
                mirror.write_bytes(b"changed official page bytes")
                self.assertIsNone(denken3_cli.evidence_file(source, expected))
                mirror.write_bytes(b"")
                self.assertIsNone(denken3_cli.evidence_file(source, sha256(b"").hexdigest()))

    def test_empty_or_failed_raw_stream_is_rejected(self) -> None:
        with TemporaryDirectory() as directory:
            raw = Path(directory) / "raw.jsonl"
            raw.write_bytes(b"")
            self.assertFalse(denken3_cli.valid_raw_response(raw, {}))
            raw.write_text('{"type":"result","subtype":"error","is_error":true,"result":"text","modelUsage":{}}\n', encoding="utf-8")
            self.assertFalse(denken3_cli.valid_raw_response(raw, {}))


if __name__ == "__main__":
    main()
