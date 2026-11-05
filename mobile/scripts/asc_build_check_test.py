import unittest
from asc_build_check import check


class BuildSettingsTest(unittest.TestCase):
    def fixture(self, **overrides):
        return [{"target": "Pods", "buildSettings": {}}, {"target": "App", "buildSettings": {
            "CONFIGURATION": "Debug", "PLATFORM_NAME": "iphonesimulator",
            "PRODUCT_BUNDLE_IDENTIFIER": "jp.kakomon-ai.app",
            "SWIFT_ACTIVE_COMPILATION_CONDITIONS": "DEBUG ASC_CAPTURE",
            "UNRELATED_SECRET": "must-not-persist", **overrides,
        }}]

    def test_valid_settings_exclude_unrelated_values(self):
        self.assertNotIn("UNRELATED_SECRET", check(self.fixture()))
        check(self.fixture(SWIFT_ACTIVE_COMPILATION_CONDITIONS=["DEBUG", "ASC_CAPTURE"]))

    def test_release_device_missing_flags_and_wrong_bundle_fail(self):
        for overrides in ({"CONFIGURATION": "Release"}, {"PLATFORM_NAME": "iphoneos"},
                          {"SWIFT_ACTIVE_COMPILATION_CONDITIONS": "DEBUG"},
                          {"PRODUCT_BUNDLE_IDENTIFIER": "other.app"}):
            with self.subTest(overrides=overrides), self.assertRaises(ValueError):
                check(self.fixture(**overrides))
        with self.assertRaises(ValueError):
            check([])


if __name__ == "__main__":
    unittest.main()
