import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import catalog from "../src/generated/catalog.json";
import { qualificationTargets, isQualificationUrl, qualificationUrl } from "../shared/qualification-schedules";
const read = (file: string) => readFileSync(new URL(file, import.meta.url), "utf8");
it("covers every catalog qualification with an exact mapping or an explicit source gap", () => {
  const unavailable = new Set<string>();
  for (const entry of catalog.exams) {
    const key = entry.qualification;
    const targets = qualificationTargets(key);
    if (!targets.length) unavailable.add(key);
    for (const target of targets) expect(isQualificationUrl(qualificationUrl(target.id))).toBe(true);
  }
  expect([...unavailable].sort()).toEqual(["gas-hei", "gas-otsu"]);
});
it("uses only the system editor and never introduces calendar read permissions or direct saves", () => {
  const swift = read("../ios-assets/QualificationBridgeViewController.swift");
  expect(swift).toContain("guard #available(iOS 17.0, *)");
  expect(swift).toContain("EKEventEditViewController()");
  expect(swift).toContain("action == .saved");
  expect(swift).toContain(".universalLinksOnly: true");
  expect(swift).not.toMatch(/request(?:FullAccess|WriteOnlyAccess|Access)|authorizationStatus|calendars\(for:|events\(matching:|store\.save\(/);
  expect(read("../scripts/configure-ios.rb")).not.toMatch(/NSCalendars|NSContacts|NSReminders/);
});
it("includes the native controller in generated projects and registers its plugin", () => {
  const ruby = read("../scripts/configure-ios.rb"), prepare = read("../scripts/prepare-ios.mjs");
  expect(prepare).toContain('new URL("../ios-assets/QualificationBridgeViewController.swift"');
  expect(ruby).toContain("target.source_build_phase.add_file_reference(native_source, true)");
  expect(ruby).toContain('customClass="QualificationBridgeViewController" customModule="App"');
  expect(read("../ios-assets/QualificationBridgeViewController.swift")).toContain("bridge?.registerPluginInstance(QualificationBridgePlugin())");
});
