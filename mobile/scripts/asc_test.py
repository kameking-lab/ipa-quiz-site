import hashlib
import json
from pathlib import Path
import shutil
import struct
import tempfile
import unittest

from asc_validate import ROOT, png_size, validate


def png_header_fixture(width, height, color_type=2):
    return (
        b'\x89PNG\r\n\x1a\n\x00\x00\x00\x0dIHDR' + struct.pack('>IIBBBBB', width, height, 8, color_type, 0, 0, 0)
        + b'\x00\x00\x00\x00\x00\x00\x00\x00IEND\xaeB\x60\x82'
    )


class AscValidationTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        for directory in ('fastlane/metadata', 'asc'):
            shutil.copytree(ROOT / directory, self.root / directory)
        self.directory = self.root / 'fastlane/screenshots/ja'
        self.directory.mkdir(parents=True)
        config = json.loads((self.root / 'asc/listing-screenshots.json').read_text())
        entries = []
        for size in config['sets']:
            for file in size['files']:
                path = self.directory / file
                path.write_bytes(png_header_fixture(size['width'], size['height']))
                entries.append({'file': path.name, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
        (self.directory.parent / 'manifest.json').write_text(json.dumps({'images': entries}))

    def tearDown(self):
        self.temp.cleanup()

    def test_valid_sets(self):
        validate(True, self.root)

    def test_missing_frame_rejected(self):
        next(self.directory.iterdir()).unlink()
        with self.assertRaisesRegex(ValueError, 'Unexpected screenshot set'):
            validate(True, self.root)

    def test_changed_image_rejected(self):
        path = next(self.directory.iterdir())
        # A valid dimension header must not permit changed bytes after capture.
        original = path.read_bytes()
        path.write_bytes(original[:-12] + b'altered' + original[-12:])
        with self.assertRaisesRegex(ValueError, 'Changed image'):
            validate(True, self.root)

    def test_wrong_dimensions_rejected(self):
        next(self.directory.iterdir()).write_bytes(png_header_fixture(1242, 2208))
        with self.assertRaisesRegex(ValueError, 'Wrong screenshot size'):
            validate(True, self.root)

    def test_credential_file_rejected(self):
        p = self.root / 'fastlane/metadata/review_information/demo_password.txt'
        p.parent.mkdir(exist_ok=True)
        p.write_text('placeholder')
        with self.assertRaisesRegex(ValueError, 'Unexpected'):
            validate(root=self.root)

    def test_keyword_bytes_rejected(self):
        (self.root / 'fastlane/metadata/ja/keywords.txt').write_text('語' * 34, encoding='utf-8')
        with self.assertRaisesRegex(ValueError, '100 UTF-8 bytes'):
            validate(root=self.root)

    def test_truncated_png_rejected(self):
        with self.assertRaises(ValueError):
            png_size(png_header_fixture(1320, 2868)[:-2])

    def test_alpha_png_rejected(self):
        with self.assertRaisesRegex(ValueError, 'RGB PNG'):
            png_size(png_header_fixture(1320, 2868, color_type=6))


if __name__ == '__main__':
    unittest.main()
