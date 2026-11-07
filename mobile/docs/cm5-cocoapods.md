# CM5: RevenueCat CocoaPods compatibility

As of 2026-11-05, pin `@revenuecat/purchases-capacitor` to **13.8.0** (no range) in both the mobile manifest and npm lockfile.

## Cause and verified dependencies

RevenueCat's [14.0.0 release notes](https://github.com/RevenueCat/purchases-capacitor/releases/tag/14.0.0) explicitly state that its required `PurchasesHybridCommon 20.0.0` has not been published to CocoaPods during the trunk freeze. Updating the local spec repository cannot download an unpublished pod.

The [13.8.0 release](https://github.com/RevenueCat/purchases-capacitor/releases/tag/13.8.0) and its [podspec](https://github.com/RevenueCat/purchases-capacitor/blob/13.8.0/RevenuecatPurchasesCapacitor.podspec) use `PurchasesHybridCommon 19.17.0`, which depends on `RevenueCat 5.99.0`. Both specs returned HTTP 200 from the official CocoaPods CDN:

- [PurchasesHybridCommon 19.17.0](https://cdn.cocoapods.org/Specs/9/a/d/PurchasesHybridCommon/19.17.0/PurchasesHybridCommon.podspec.json)
- [RevenueCat 5.99.0](https://cdn.cocoapods.org/Specs/e/9/b/RevenueCat/5.99.0/RevenueCat.podspec.json)

The 20.0.0 spec returned HTTP 404. The 13.8.0 plugin supports Capacitor 8 and iOS 15, and uses the same native iOS SDK version as 14.0.0. The app uses configure/login, offerings, package purchase, restore, customer-info listeners and logout; it does not use the Android/Amazon APIs changed in v14. Its existing purchase tests and typecheck must pass with the pinned SDK.

## Why keep CocoaPods for this repair

The existing generator explicitly selects CocoaPods. ADS1 pins Google Mobile Ads 13.11.0 and UMP 3.1.0 in the Podfile, and `verify-ios.rb` validates those pins and the iOS 15 pod deployment hook. Keeping this path preserves the WebView registration and consent integration, all Capacitor plugins, and the post-sync restoration of `jp.kakomon-ai.app` in both App build configurations and bundled runtime JSON. Codemagic continues building `App.xcworkspace`.

[Capacitor supports SPM](https://capacitorjs.com/docs/ios/spm), and [Google Mobile Ads supports SPM](https://developers.google.com/admob/ios/quick-start). SPM is therefore a viable follow-up, but requires explicit migration of the custom ads dependencies, project generation, verification and workspace build flow. This repair prioritizes getting purchases and ads through the existing native build with a published dependency chain. The standalone `pod repo update` added for build #5 is removed because the failure was publication availability, not a stale local repository.

Before upgrading RevenueCat again, confirm every required pod is published, or migrate and validate the entire native dependency path on macOS. RevenueCat's [installation guidance](https://www.revenuecat.com/docs/getting-started/installation) says existing published CocoaPods versions remain available, while future SDK updates will require SPM after trunk becomes permanently read-only on December 2, 2026.
