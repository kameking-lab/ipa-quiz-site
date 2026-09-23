"""Regression checks for cross-platform Denko2 evidence hashes."""

import importlib.util
from pathlib import Path
import tempfile
import unittest


MODULE = Path(__file__).with_name("denko2-strict-coverage.py")
SPEC = importlib.util.spec_from_file_location("denko2_strict_coverage", MODULE)
assert SPEC and SPEC.loader
strict = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(strict)


class PortableDigestTest(unittest.TestCase):
    def test_text_newlines_are_equivalent_but_content_changes_are_not(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "receipt.json"
            path.write_bytes(b'{"status":"PASS"}\n')
            lf = strict.portable_digests(path)
            canonical = strict.portable_digest(path)
            path.write_bytes(b'{"status":"PASS"}\r\n')
            self.assertEqual(lf, strict.portable_digests(path))
            self.assertEqual(canonical, strict.portable_digest(path))
            path.write_bytes(b'{"status":"FAIL"}\n')
            self.assertTrue(lf.isdisjoint(strict.portable_digests(path)))

    def test_binary_is_always_byte_exact(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "figure.png"
            path.write_bytes(b"figure\n")
            lf = strict.portable_digests(path)
            path.write_bytes(b"figure\r\n")
            self.assertTrue(lf.isdisjoint(strict.portable_digests(path)))


if __name__ == "__main__":
    unittest.main()
