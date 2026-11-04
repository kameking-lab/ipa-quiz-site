import Capacitor
import AppTrackingTransparency
import UIKit
import WebKit

@objc(TrackingTransparencyPlugin)
public class TrackingTransparencyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TrackingTransparencyPlugin"
    public let jsName = "TrackingTransparency"
    public let pluginMethods = [
        CAPPluginMethod(name: "prepare", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise)
    ]
    // No advertising SDK is integrated yet. Keep permission requests disabled
    // until there is an actual disclosed tracking purpose in the release.
    private let trackingAdsAvailable = false
    private var requesting = false

    @objc func prepare(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let rules = #"[{"trigger":{"url-filter":"^https?://([^/]+\\.)?(googlesyndication\\.com|doubleclick\\.net|googleadservices\\.com|googletagservices\\.com)/"},"action":{"type":"block"}}]"#
            WKContentRuleListStore.default().compileContentRuleList(forIdentifier: "kakomon-no-webview-ads-v1", encodedContentRuleList: rules) { list, _ in
                DispatchQueue.main.async {
                    guard let list = list, let webView = self.bridge?.webView else {
                        call.reject("広告のプライバシー設定を準備できません。", "PRIVACY_UNAVAILABLE"); return
                    }
                    webView.configuration.userContentController.add(list)
                    call.resolve()
                }
            }
        }
    }

    private func statusName() -> String {
        switch ATTrackingManager.trackingAuthorizationStatus {
        case .notDetermined: return "notDetermined"
        case .restricted: return "restricted"
        case .denied: return "denied"
        case .authorized: return "authorized"
        @unknown default: return "restricted"
        }
    }
    @objc func status(_ call: CAPPluginCall) {
        DispatchQueue.main.async { call.resolve(["status": self.statusName()]) }
    }
    @objc func requestPermission(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard self.trackingAdsAvailable else {
                call.resolve(["status": "restricted"]); return
            }
            guard UIApplication.shared.applicationState == .active, !self.requesting else {
                call.reject("画面を閉じ、アプリが表示されている状態で再度お試しください。", "ATT_NOT_ACTIVE"); return
            }
            guard ATTrackingManager.trackingAuthorizationStatus == .notDetermined else {
                call.resolve(["status": self.statusName()]); return
            }
            self.requesting = true
            ATTrackingManager.requestTrackingAuthorization { _ in
                DispatchQueue.main.async {
                    self.requesting = false
                    call.resolve(["status": self.statusName()])
                }
            }
        }
    }
}
