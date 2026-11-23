#if canImport(GoogleMobileAds) && canImport(UserMessagingPlatform)
import AppTrackingTransparency
import Capacitor
import GoogleMobileAds
import StoreKit
import UIKit
import UserMessagingPlatform
import WebKit

@objc(NativeBannerAds)
public final class NativeBannerAds: CAPPlugin, CAPBridgedPlugin, BannerViewDelegate {
    public let identifier = "NativeBannerAds"
    public let jsName = "KakomonBannerAds"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "config", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "prepareBanner", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showBanner", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "hideBanner", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "privacyOptions", returnType: CAPPluginReturnPromise)
    ]

    private static let browseRoots: Set<String> = ["/", "/ip", "/fe", "/sg", "/ap", "/sc", "/pm", "/db", "/es", "/au", "/nw", "/st", "/sa", "/sm"]
    private static var sdkStart: Task<Void, Never>?
    private var generation = 0
    private var readyGeneration: Int?
    private var preparing = false
    private var consentUpdated = false
    private var privacyOptionsOpen = false
    private var productId: String?
    private var transactionUpdates: Task<Void, Never>?
    private var urlObservation: NSKeyValueObservation?
    private var loadingObservation: NSKeyValueObservation?
    private var backgroundObserver: NSObjectProtocol?
    private var banner: BannerView?

    static var configured: Bool {
        Bundle.main.object(forInfoDictionaryKey: "KakomonAdsEnabled") as? Bool == true &&
            !ASCCaptureGate.isActive && !bannerId.isEmpty
    }

    private static var bannerId: String {
        Bundle.main.object(forInfoDictionaryKey: "KakomonAdMobBannerID") as? String ?? ""
    }

    private var host: QualificationBridgeViewController? { bridge?.viewController as? QualificationBridgeViewController }

    private var trustedPage: Bool {
        guard let url = bridge?.webView?.url else { return false }
        return url.scheme == "https" && url.host == "www.kakomon-ai.jp" && url.port == nil
    }

    @MainActor private var placementAllowed: Bool {
        guard Self.configured, trustedPage, UIApplication.shared.applicationState == .active,
              let host = host, host.viewIfLoaded?.window != nil, host.presentedViewController == nil,
              let path = bridge?.webView?.url?.path else { return false }
        return Self.browseRoots.contains(path) ||
            path.range(of: #"^/(?:blog|qualifications|e-learning/exams/qualifications)/[^/]+$"#, options: .regularExpression) != nil
    }

    public override func load() {
        urlObservation = bridge?.webView?.observe(\.url, options: [.old, .new]) { [weak self] _, change in
            guard (change.oldValue ?? nil)?.path != (change.newValue ?? nil)?.path ||
                (change.oldValue ?? nil)?.host != (change.newValue ?? nil)?.host else { return }
            DispatchQueue.main.async { self?.removeBanner() }
        }
        loadingObservation = bridge?.webView?.observe(\.isLoading, options: .new) { [weak self] _, change in
            if change.newValue == true { DispatchQueue.main.async { self?.removeBanner() } }
        }
        backgroundObserver = NotificationCenter.default.addObserver(forName: UIApplication.didEnterBackgroundNotification,
            object: nil, queue: .main) { [weak self] _ in
            DispatchQueue.main.async { self?.removeBanner() }
        }
    }

    deinit {
        transactionUpdates?.cancel()
        if let observer = backgroundObserver { NotificationCenter.default.removeObserver(observer) }
    }

    @MainActor private func removeBanner() {
        generation += 1
        readyGeneration = nil
        banner?.delegate = nil
        banner?.removeFromSuperview()
        banner = nil
        host?.removeAdPanel()
    }

    @MainActor private func deviceHasAccess(_ productId: String) async -> Bool {
        for await result in StoreKit.Transaction.currentEntitlements {
            switch result {
            case .verified(let transaction), .unverified(let transaction, _):
                if transaction.productID == productId { return true }
            }
        }
        return false
    }

    @MainActor private func watchPurchases(_ productId: String) {
        self.productId = productId
        guard transactionUpdates == nil else { return }
        transactionUpdates = Task { [weak self] in
            for await result in StoreKit.Transaction.updates {
                guard let self = self else { return }
                switch result {
                case .verified(let transaction), .unverified(let transaction, _):
                    if transaction.productID == self.productId { self.removeBanner() }
                }
            }
        }
    }

    @objc func config(_ call: CAPPluginCall) {
        Task { @MainActor in
            let enabled = Self.configured && trustedPage
            call.resolve([
                "enabled": enabled,
                "privacyOptionsRequired": enabled && ConsentInformation.shared.privacyOptionsRequirementStatus == .required
            ])
        }
    }

    @objc func prepareBanner(_ call: CAPPluginCall) {
        Task { @MainActor in
            var result: [String: Any] = ["consent": false]
            defer { call.resolve(result) }
            guard placementAllowed, !preparing, !privacyOptionsOpen, let host = host,
                  let productId = call.getString("productId"), !productId.isEmpty else { return }
            preparing = true
            defer { preparing = false }
            let attempt = generation
            watchPurchases(productId)
            guard !(await deviceHasAccess(productId)), attempt == generation, placementAllowed else { return }
            do {
                if !consentUpdated {
                    try await ConsentInformation.shared.requestConsentInfoUpdate(with: RequestParameters())
                    guard attempt == generation, placementAllowed else { return }
                    try await ConsentForm.loadAndPresentIfRequired(from: host)
                    consentUpdated = true
                }
            } catch { return }
            guard attempt == generation, placementAllowed, ConsentInformation.shared.canRequestAds else { return }
            if ATTrackingManager.trackingAuthorizationStatus == .notDetermined {
                _ = await ATTrackingManager.requestTrackingAuthorization()
            }
            guard attempt == generation, placementAllowed else { return }
            switch ATTrackingManager.trackingAuthorizationStatus {
            case .authorized: result = ["consent": true, "tracking": "authorized"]
            case .denied: result = ["consent": true, "tracking": "denied"]
            default: return
            }
            readyGeneration = attempt
        }
    }

    @objc func showBanner(_ call: CAPPluginCall) {
        Task { @MainActor in
            defer { call.resolve() }
            let attempt = generation
            let initialTracking = ATTrackingManager.trackingAuthorizationStatus
            let personalized = initialTracking == .authorized
            guard readyGeneration == attempt, placementAllowed, !privacyOptionsOpen, banner == nil,
                  ConsentInformation.shared.canRequestAds, let productId = productId,
                  initialTracking == .authorized || initialTracking == .denied,
                  call.getString("mode") == (personalized ? "personalized" : "nonPersonalized"),
                  !(await deviceHasAccess(productId)), attempt == generation, placementAllowed,
                  ATTrackingManager.trackingAuthorizationStatus == initialTracking else { return }
            readyGeneration = nil
            let sdk = MobileAds.shared
            sdk.requestConfiguration.maxAdContentRating = GADMaxAdContentRating.general
            sdk.requestConfiguration.setPublisherFirstPartyIDEnabled(false)
            sdk.requestConfiguration.publisherPrivacyPersonalizationState = personalized ? .default : .disabled
            if Self.sdkStart == nil {
                sdk.disableMediationInitialization()
                Self.sdkStart = Task { _ = await sdk.start() }
            }
            await Self.sdkStart?.value
            guard attempt == generation, placementAllowed, ConsentInformation.shared.canRequestAds,
                  ATTrackingManager.trackingAuthorizationStatus == initialTracking, let host = host,
                  host.view.bounds.width >= 320 else { return }
            let view = BannerView(adSize: AdSizeBanner)
            view.adUnitID = Self.bannerId
            view.rootViewController = host
            view.delegate = self
            banner = view
            host.reserveAdPanel()
            let request = Request()
            if !personalized {
                let extras = Extras()
                extras.additionalParameters = ["npa": "1"]
                request.register(extras)
            }
            view.load(request)
        }
    }

    @objc func hideBanner(_ call: CAPPluginCall) {
        Task { @MainActor in removeBanner(); call.resolve() }
    }

    @objc func privacyOptions(_ call: CAPPluginCall) {
        Task { @MainActor in
            defer { call.resolve() }
            guard Self.configured, trustedPage, !preparing, !privacyOptionsOpen,
                  UIApplication.shared.applicationState == .active,
                  let host = host, host.presentedViewController == nil,
                  ConsentInformation.shared.privacyOptionsRequirementStatus == .required else { return }
            privacyOptionsOpen = true
            defer { privacyOptionsOpen = false }
            removeBanner()
            do { try await ConsentForm.presentPrivacyOptionsForm(from: host) }
            catch { consentUpdated = false }
        }
    }

    @MainActor public func bannerViewDidReceiveAd(_ bannerView: BannerView) {
        guard bannerView === banner else { return }
        guard placementAllowed, ConsentInformation.shared.canRequestAds else {
            removeBanner()
            return
        }
        host?.showAdPanel(bannerView)
    }

    @MainActor public func bannerView(_ bannerView: BannerView, didFailToReceiveAdWithError error: Error) {
        if bannerView === banner { removeBanner() }
    }
}
#endif
