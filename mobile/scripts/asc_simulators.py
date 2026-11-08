"""Select native screenshot sizes using CoreSimulator compatibility metadata."""

TYPE_PREFIX = "com.apple.CoreSimulator.SimDeviceType."
RUNTIME_PREFIX = "com.apple.CoreSimulator.SimRuntime.iOS-"

# Exact portrait pixels, not marketing diagonal sizes. Unknown models fail closed.
# Sources and the optional ASC1 Face ID large set are documented in simulators.md.
SCREEN_TYPES = {
    (1206, 2622): ("iPhone-16-Pro", "iPhone-17-Pro", "iPhone-17"),
    (1320, 2868): ("iPhone-16-Pro-Max", "iPhone-17-Pro-Max"),
    (1242, 2688): ("iPhone-11-Pro-Max", "iPhone-XS-Max"),
    (1284, 2778): ("iPhone-14-Plus", "iPhone-13-Pro-Max", "iPhone-12-Pro-Max"),
}


def version_number(value):
    """CoreSimulator encodes major/minor/patch as (major << 16 | minor << 8 | patch)."""
    parts = tuple(map(int, value.split(".")))
    if not 1 <= len(parts) <= 3 or any(p < 0 for p in parts):
        raise ValueError("Invalid simulator OS version: " + value)
    parts += (0,) * (3 - len(parts))
    return (parts[0] << 16) | (parts[1] << 8) | parts[2]


def runtime_bound(device_type, label):
    value = device_type.get(label)
    if isinstance(value, int):
        return value
    value = device_type.get(label + "String")
    return version_number(value) if value is not None else None


def compatible(device_type, runtime):
    version = version_number(runtime["version"])
    lower = runtime_bound(device_type, "minRuntimeVersion")
    upper = runtime_bound(device_type, "maxRuntimeVersion")
    if (lower is not None and version < lower) or (upper is not None and version > upper):
        return False
    supported = runtime.get("supportedDeviceTypes")
    if supported is not None:
        # This list is authoritative, including an explicitly empty list.
        return any(d.get("identifier") == device_type["identifier"] for d in supported)
    # Older simctl versions omit supportedDeviceTypes; require both bounds instead.
    return lower is not None and upper is not None


def select_simulator(device, runtimes, device_types):
    candidates = [TYPE_PREFIX + suffix for suffix in SCREEN_TYPES.get((device["width"], device["height"]), ())]
    types = {d["identifier"]: d for d in device_types if d.get("isAvailable", True) is True}
    available = sorted(
        (r for r in runtimes if r.get("isAvailable") is True and r["identifier"].startswith(RUNTIME_PREFIX)),
        key=lambda r: (version_number(r["version"]), r["identifier"]), reverse=True)
    for runtime in available:
        for identifier in candidates:
            if identifier in types and compatible(types[identifier], runtime):
                return types[identifier], runtime
    raise RuntimeError(
        f"No compatible available iOS simulator for {device['slug']} ({device['width']}x{device['height']}); "
        "see logged runtimes/devicetypes. Install a compatible iOS Simulator runtime in Xcode Components "
        "or run xcodebuild -downloadPlatform iOS within the CI time/disk budget, then recheck; no resizing fallback.")
