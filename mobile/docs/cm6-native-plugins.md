# CM6: Capacitor 8 custom native plugin contracts

The app pins `@capacitor/core`, `@capacitor/ios` and `@capacitor/cli` to 8.6.0.
Both app-local plugins implement `CAPBridgedPlugin` directly in Swift.

| Swift / Objective-C class and identifier | jsName / JS registerPlugin name | Promise methods |
| --- | --- | --- |
| QualificationBridgePlugin | QualificationBridge | openUniversalLink, presentCalendar |
| TrackingTransparencyPlugin | TrackingTransparency | prepare, status, requestPermission, enableAds, disableAds |

All custom native code is in `mobile/ios-assets/QualificationBridgeViewController.swift`
and `mobile/ios-assets/TrackingTransparencyPlugin.swift`. There are no custom `.m`,
`.mm` or `.h` sources. The controller registers both plugin instances in
`capacitorDidLoad()`. `prepare-ios.mjs` copies both files into the generated App;
`configure-ios.rb` adds them to the App Sources phase and selects the controller
in Main.storyboard. The ignored `mobile/ios/` directory is generated output.

## Repair and official references

Both plugins declared an inferred `pluginMethods` array. Explicitly declare
`public let pluginMethods: [CAPPluginMethod] = [...]`, as shown in the
[Capacitor v8 custom native code guide](https://capacitorjs.com/docs/ios/custom-code)
and [v8 iOS plugin guide](https://capacitorjs.com/docs/plugins/ios).

The installed SDK matches the official 8.6.0 source:

- [CAPBridgedPlugin.h](https://github.com/ionic-team/capacitor/blob/8.6.0/ios/Capacitor/Capacitor/CAPBridgedPlugin.h)
  requires nonnull identifier, jsName and an NSArray of CAPPluginMethod objects.
- [CAPPluginMethod.h](https://github.com/ionic-team/capacitor/blob/8.6.0/ios/Capacitor/Capacitor/CAPPluginMethod.h)
  leaves initializer nullability unspecified. Without the contextual array type,
  Swift can infer optional elements, which do not satisfy the protocol property.
  This is the likely explanation for the two reported conformance errors; Windows
  cannot reproduce the Swift compiler diagnostic.
- [CapacitorBridge.swift](https://github.com/ionic-team/capacitor/blob/8.6.0/ios/Capacitor/Capacitor/CapacitorBridge.swift)
  checks CAPBridgedPlugin in registerPluginInstance and registers by jsName.

Keep `@objc(ClassName)` on the classes and `@objc` on each exported method.
The three Swift metadata properties already satisfy the protocol with the
explicit array type. A `.m` file using `CAP_PLUGIN` would implement the same
metadata in an Objective-C category, so it is unnecessary for this Swift setup.
The 8.6.0 header retains the macro for Objective-C plugins; it is not an additional
registration step for these Swift plugins.

## Regression checks

- `npm test`: `tests/native-plugin-contract.test.ts` discovers all custom native
  sources, inventories CAPPlugin subclasses, checks protocol declarations,
  explicit nonoptional method-array types, unique identifiers/names, @objc class
  and method exports, native instance registration and JS registerPlugin names.
  TypeScript AST inspection also compares each JS API's Promise methods with the
  native method metadata. It runs before archive in the existing Codemagic flow.
- `npm run ios:test` after `npm run ios:prepare`: checks generated files against
  source, both Sources phase entries exactly once and storyboard selection.
- Windows preparation: `npm run ios:prepare -- --allow-non-macos` with Ruby and
  xcodeproj available. This skips CocoaPods and Xcode compilation.

These are static/source and generated-project checks, not proof of Swift
compilation, signing, IPA export, or on-device plugin behavior. Codemagic provides
the macOS archive result after push.
