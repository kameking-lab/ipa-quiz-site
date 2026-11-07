"""Windows-safe tests using representative simctl JSON (no Mac or network)."""
import copy
import json
import unittest

from asc_simulators import RUNTIME_PREFIX, TYPE_PREFIX, select_simulator, version_number

# Fields emitted by `simctl list runtimes/devicetypes --json` on modern Xcode.
TYPES = json.loads('''{"devicetypes": [
  {"name":"iPhone 16 Pro","identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-16-Pro",
   "minRuntimeVersion":1179648,"maxRuntimeVersion":4294967295},
  {"name":"iPhone 17 Pro","identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro",
   "minRuntimeVersionString":"26.0.0","maxRuntimeVersionString":"65535.255.255"},
  {"name":"iPhone 17 Pro Max","identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro-Max",
   "minRuntimeVersionString":"26.0.0","maxRuntimeVersionString":"65535.255.255"},
  {"name":"iPhone 11 Pro Max","identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-11-Pro-Max",
   "minRuntimeVersionString":"13.0.0","maxRuntimeVersionString":"26.9.0"},
  {"name":"iPhone 13 Pro Max","identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-13-Pro-Max",
   "minRuntimeVersionString":"15.0.0","maxRuntimeVersionString":"65535.255.255"}
]}''')["devicetypes"]
RUNTIMES = json.loads('''{"runtimes": [
  {"identifier":"com.apple.CoreSimulator.SimRuntime.iOS-26-5","version":"26.5","isAvailable":true,
   "supportedDeviceTypes":[
     {"identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro"},
     {"identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-17-Pro-Max"},
     {"identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-11-Pro-Max"},
     {"identifier":"com.apple.CoreSimulator.SimDeviceType.iPhone-13-Pro-Max"}]},
  {"identifier":"com.apple.CoreSimulator.SimRuntime.iOS-26-6","version":"26.6","isAvailable":false,
   "availabilityError":"runtime profile not found using System match policy"},
  {"identifier":"com.apple.CoreSimulator.SimRuntime.tvOS-27-0","version":"27.0","isAvailable":true}
]}''')["runtimes"]
MEDIUM = {"slug": "iphone-medium", "width": 1206, "height": 2622}
LARGE = {"slug": "iphone-large", "width": 1320, "height": 2868}


class SimulatorSelectionTest(unittest.TestCase):
    def select(self, device=MEDIUM, runtimes=None, types=None):
        return select_simulator(device, RUNTIMES if runtimes is None else runtimes, TYPES if types is None else types)

    def test_json_selects_supported_medium_instead_of_fixed_16_pro(self):
        device_type, runtime = self.select()
        self.assertEqual(device_type["name"], "iPhone 17 Pro")
        self.assertEqual(runtime["version"], "26.5")

    def test_69_and_optional_65_use_their_exact_native_size(self):
        self.assertEqual(self.select(LARGE)[0]["name"], "iPhone 17 Pro Max")
        self.assertEqual(self.select({"slug": "iphone-65", "width": 1242, "height": 2688})[0]["name"], "iPhone 11 Pro Max")
        self.assertEqual(self.select({"slug": "iphone-65", "width": 1284, "height": 2778})[0]["name"], "iPhone 13 Pro Max")

    def test_latest_compatible_runtime_is_numeric_and_independent_of_input_order(self):
        older = dict(RUNTIMES[0], version="26.9", identifier=RUNTIME_PREFIX + "26-9")
        newer = dict(RUNTIMES[0], version="26.10.1", identifier=RUNTIME_PREFIX + "26-10-1")
        self.assertEqual(self.select(runtimes=[older, newer])[1], newer)
        self.assertEqual(self.select(runtimes=[newer, older])[1], newer)

    def test_newest_ios_without_size_match_uses_latest_compatible_ios(self):
        newer = dict(RUNTIMES[0], version="27.0", identifier=RUNTIME_PREFIX + "27-0", supportedDeviceTypes=[])
        self.assertEqual(self.select(runtimes=[*RUNTIMES, newer])[1]["version"], "26.5")

    def test_device_specific_runtime_does_not_win_just_because_version_matches(self):
        special = dict(RUNTIMES[0], identifier=RUNTIME_PREFIX + "26-5-iPhone99-1",
                       supportedDeviceTypes=[{"identifier": TYPE_PREFIX + "iPhone-Unknown"}])
        self.assertEqual(self.select(runtimes=[special, *RUNTIMES])[1], RUNTIMES[0])

    def test_legacy_runtime_requires_and_honors_numeric_or_string_bounds(self):
        runtime = dict(RUNTIMES[0])
        del runtime["supportedDeviceTypes"]
        self.assertEqual(self.select(runtimes=[runtime])[0]["name"], "iPhone 16 Pro")
        old = dict(runtime, version="18.0", identifier=RUNTIME_PREFIX + "18-0")
        self.assertEqual(self.select(runtimes=[old])[0]["name"], "iPhone 16 Pro")
        with self.assertRaisesRegex(RuntimeError, "No compatible"):
            self.select(LARGE, [old])
        future = dict(runtime, version="27.0", identifier=RUNTIME_PREFIX + "27-0")
        with self.assertRaisesRegex(RuntimeError, "No compatible"):
            self.select({"slug": "iphone-65", "width": 1242, "height": 2688}, [future])

    def test_missing_compatibility_metadata_is_not_assumed_compatible(self):
        runtime = dict(RUNTIMES[0])
        del runtime["supportedDeviceTypes"]
        types = [{"name": "iPhone 17 Pro", "identifier": TYPE_PREFIX + "iPhone-17-Pro"}]
        with self.assertRaisesRegex(RuntimeError, "No compatible"):
            self.select(runtimes=[runtime], types=types)

    def test_supported_membership_does_not_override_version_bounds(self):
        types = copy.deepcopy(TYPES)
        types[1]["minRuntimeVersionString"] = "27.0"
        with self.assertRaisesRegex(RuntimeError, "No compatible"):
            self.select(types=types)

    def test_unavailable_and_non_ios_or_wrong_size_never_selected(self):
        for runtimes, types, device in (
            ([], TYPES, MEDIUM), (RUNTIMES, [], MEDIUM),
            (RUNTIMES[1:], TYPES, MEDIUM),
            (RUNTIMES, [dict(d, isAvailable=False) for d in TYPES], MEDIUM),
            (RUNTIMES, TYPES, dict(MEDIUM, width=1179, height=2556)),
        ):
            with self.subTest(runtimes=runtimes, types=types, device=device):
                with self.assertRaisesRegex(RuntimeError, "No compatible.*no resizing fallback"):
                    self.select(device, runtimes, types)

    def test_version_padding_and_packed_bounds(self):
        self.assertEqual(version_number("26.5"), version_number("26.5.0"))
        self.assertEqual(version_number("18.0"), 1179648)
        self.assertEqual(version_number("65535.255.255"), 4294967295)


if __name__ == "__main__":
    unittest.main()
