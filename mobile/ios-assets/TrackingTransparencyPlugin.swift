import Capacitor
import WebKit

@objc(TrackingTransparencyPlugin)
public final class TrackingTransparencyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TrackingTransparencyPlugin"
    public let jsName = "TrackingTransparency"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "prepare", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermission", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "enableAds", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disableAds", returnType: CAPPluginReturnPromise)
    ]

    @objc func prepare(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            // The legacy AdSense path stays blocked in this app. This rule list
            // applies only to Capacitor's WKWebView, separate from the native SDK.
            let rules = #"[{"trigger":{"url-filter":"^https?://([^/]+\\.)?googlesyndication\\.com/"},"action":{"type":"block"}},{"trigger":{"url-filter":"^https?://([^/]+\\.)?doubleclick\\.net/"},"action":{"type":"block"}},{"trigger":{"url-filter":"^https?://([^/]+\\.)?googleadservices\\.com/"},"action":{"type":"block"}},{"trigger":{"url-filter":"^https?://([^/]+\\.)?googletagservices\\.com/"},"action":{"type":"block"}},{"trigger":{"url-filter":"^https?://([^/]+\\.)?adtrafficquality\\.google/"},"action":{"type":"block"}}]"#
            WKContentRuleListStore.default().compileContentRuleList(
                forIdentifier: "kakomon-consent-gated-ads-v3", encodedContentRuleList: rules
            ) { list, error in
                DispatchQueue.main.async {
                    if let list = list {
                        self.bridge?.webView?.configuration.userContentController.add(list)
                    } else {
                        CAPLog.print("TrackingTransparency: WebView ad rules unavailable", error?.localizedDescription ?? "")
                    }
                    // The online code uses this response to skip WebView ads.
                    call.resolve(["enabled": false, "client": "", "slot": "", "cmpScriptUrl": ""])
                }
            }
        }
    }

    // Older versions of the online UI still speak this bridge contract.
    @objc func status(_ call: CAPPluginCall) { call.resolve(["status": "restricted"]) }
    @objc func requestPermission(_ call: CAPPluginCall) { status(call) }
    @objc func enableAds(_ call: CAPPluginCall) { call.resolve(["enabled": false]) }
    @objc func disableAds(_ call: CAPPluginCall) { call.resolve() }
}
