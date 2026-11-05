import Capacitor
import AppTrackingTransparency
#if canImport(GoogleMobileAds)
import GoogleMobileAds
#endif
import UIKit
import WebKit

@objc(TrackingTransparencyPlugin)
public class TrackingTransparencyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TrackingTransparencyPlugin"
    public let jsName = "TrackingTransparency"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "prepare", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enableAds", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disableAds", returnType: CAPPluginReturnPromise)
    ]
    private var requesting = false
    private var blockList: WKContentRuleList?
    private var registered = false
    private var adsAllowed = false
    private var observer: NSObjectProtocol?

    private var configured: Bool { !ASCCaptureGate.isActive && Bundle.main.object(forInfoDictionaryKey: "KakomonAdsEnabled") as? Bool == true }
    private var trustedPage: Bool {
        guard let url = bridge?.webView?.url else { return false }
        return url.scheme == "https" && url.host == "www.kakomon-ai.jp" && url.port == nil
    }

    public override func load() {
        observer = NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification, object: nil, queue: .main) { [weak self] _ in
            guard let self = self, self.adsAllowed,
                  ATTrackingManager.trackingAuthorizationStatus != .authorized else { return }
            self.blockAds()
            self.bridge?.webView?.reload()
        }
    }
    deinit { if let observer = observer { NotificationCenter.default.removeObserver(observer) } }

    private func blockAds() {
        adsAllowed = false
        if let list = blockList { bridge?.webView?.configuration.userContentController.add(list) }
    }

    @objc func prepare(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            // Consent UI is separate from ad-serving hosts. The shell awaits
            // this rule before any online navigation is possible.
            let rules = #"[{"trigger":{"url-filter":"^https?://([^/]+\\.)?(googlesyndication\\.com|doubleclick\\.net|googleadservices\\.com|googletagservices\\.com|adtrafficquality\\.google)/"},"action":{"type":"block"}}]"#
            WKContentRuleListStore.default().compileContentRuleList(forIdentifier: "kakomon-consent-gated-ads-v2", encodedContentRuleList: rules) { list, _ in
                DispatchQueue.main.async {
                    guard let list = list, self.bridge?.webView != nil else {
                        call.reject("広告のプライバシー設定を準備できません。", "PRIVACY_UNAVAILABLE"); return
                    }
                    self.blockList = list
                    self.blockAds()
                    let info = Bundle.main
                    call.resolve([
                        "enabled": self.configured,
                        "client": info.object(forInfoDictionaryKey: "KakomonAdsenseClient") as? String ?? "",
                        "slot": info.object(forInfoDictionaryKey: "KakomonAdsenseSlot") as? String ?? "",
                        "cmpScriptUrl": info.object(forInfoDictionaryKey: "KakomonAdsCMPScriptURL") as? String ?? ""
                    ])
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
            guard self.configured, self.trustedPage else {
                call.resolve(["status": "restricted"]); return
            }
            guard UIApplication.shared.applicationState == .active, !self.requesting else {
                call.reject("アプリを表示してから再度お試しください。", "ATT_NOT_ACTIVE"); return
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

    @objc func enableAds(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            // Web CMP completion is checked independently by the web caller.
            // A JS boolean cannot bypass the native ATT/config checks.
            guard self.configured, self.trustedPage, UIApplication.shared.applicationState == .active,
                  ATTrackingManager.trackingAuthorizationStatus == .authorized,
                  let list = self.blockList, let webView = self.bridge?.webView else {
                self.blockAds()
                call.resolve(["enabled": false]); return
            }
            #if canImport(GoogleMobileAds)
            if !self.registered {
                // Actual Capacitor WKWebView, on main, before the first ad tag.
                // WebView-only usage does not call MobileAds.shared.start.
                MobileAds.shared.register(webView)
                self.registered = true
            }
            webView.configuration.userContentController.remove(list)
            self.adsAllowed = true
            call.resolve(["enabled": true])
            #else
            self.blockAds()
            call.resolve(["enabled": false])
            #endif
        }
    }
    @objc func disableAds(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let wasAllowed = self.adsAllowed
            self.blockAds()
            call.resolve()
            // Unload running tags when consent is withdrawn.
            if wasAllowed && call.getBool("reload") == true { self.bridge?.webView?.reload() }
        }
    }
}
