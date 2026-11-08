import Capacitor
import UIKit
import EventKit
import EventKitUI
import WebKit
import os.log

@objc(QualificationBridgeViewController)
class QualificationBridgeViewController: CAPBridgeViewController {
    #if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)
    private var ascCapture: ASCCapture?
    #endif

    // Capacitor paints the WebView systemBackground (white, or black in dark
    // mode) until index.html draws. Use the launch screen's colour instead so
    // LaunchScreen -> bundled splash -> web home never flashes white/black.
    override func viewDidLoad() {
        super.viewDidLoad()
        let background = UIColor(named: "LaunchBackground")
            ?? UIColor(red: 0.969, green: 0.953, blue: 0.914, alpha: 1)
        view.backgroundColor = background
        webView?.backgroundColor = background
        webView?.scrollView.backgroundColor = background
    }

    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(QualificationBridgePlugin())
        bridge?.registerPluginInstance(TrackingTransparencyPlugin())
        #if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)
        if ASCCapture.isActive, let webView = webView {
            ascCapture = ASCCapture(webView: webView)
        }
        #endif
    }

    // The WebView is edge-to-edge (contentInset "never"). Publish the real
    // status bar / Dynamic Island and home-indicator insets to CSS as
    // --native-safe-top/bottom so pages never depend on env() alone
    // (app/globals.css takes the larger of the two).
    override func viewSafeAreaInsetsDidChange() {
        super.viewSafeAreaInsetsDidChange()
        guard let webView = webView else { return }
        let insets = view.safeAreaInsets
        let source = "(function(){function f(){var r=document.documentElement;if(!r){return false;}"
            + "r.style.setProperty('--native-safe-top','\(Int(insets.top.rounded()))px');"
            + "r.style.setProperty('--native-safe-bottom','\(Int(insets.bottom.rounded()))px');return true;}"
            + "if(!f()){document.addEventListener('readystatechange',f);}})();"
        // Runs for every later document (local shell and www.kakomon-ai.jp)...
        webView.configuration.userContentController.addUserScript(
            WKUserScript(source: source, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        // ...and updates the document that is already showing.
        webView.evaluateJavaScript(source, completionHandler: nil)
    }
}

// The implementation and its arguments do not exist in distribution binaries.
// No URL scheme, preference, remote flag or JavaScript API can enable capture.
enum ASCCaptureGate {
    static var isActive: Bool {
        #if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)
        return ASCCapture.isActive
        #else
        return false
        #endif
    }
}

#if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)
private final class ASCCapture {
    static let routes = ["/", "/ap", "/review", "/account/dashboard", "reminder"]
    static let request: (route: String, token: String)? = {
        let arguments = ProcessInfo.processInfo.arguments
        // simctl passes application arguments after the bundle ID: -key value.
        // Reject duplicate, missing and legacy key=value forms rather than
        // silently enabling a different capture request.
        func value(_ key: String) -> String? {
            guard !arguments.contains(where: { $0.hasPrefix(key + "=") }) else { return nil }
            let indices = arguments.indices.filter { arguments[$0] == key }
            guard indices.count == 1, let index = indices.first, index + 1 < arguments.count else { return nil }
            return arguments[index + 1]
        }
        guard let route = value("-ascCaptureRoute"), let token = value("-ascCaptureToken") else { return nil }
        guard ASCCapture.routes.contains(route), UUID(uuidString: token) != nil else { return nil }
        return (route, token)
    }()
    static var isActive: Bool { request != nil }
    private weak var webView: WKWebView?
    private var timer: Timer?
    private var evaluating = false
    private var navigated = false
    private var finished = false
    private var ticks = 0
    private let deadline = Date().addingTimeInterval(150)
    private static let captureLog = OSLog(subsystem: "jp.kakomon-ai.app.asc-capture", category: "readiness")

    private func emit(_ event: String, _ detail: String) {
        guard let request = Self.request else { return }
        // Public placeholders are deliberate: only the non-secret launch UUID,
        // allowlisted route and fixed state labels are emitted, never DOM/URLs.
        os_log("ASC_CAPTURE_%{public}@ %{public}@ %{public}@", log: Self.captureLog,
               type: .default, event, request.token, detail)
        // Independent of unified logging subscription, privacy and persistence.
        // Python may only fall back to pixels with this launch's READY receipt.
        do {
            let directory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
            let path = directory.appendingPathComponent("asc-capture-" + request.token + ".json")
            let data = try JSONSerialization.data(withJSONObject: [
                "token": request.token, "route": request.route, "event": event, "detail": detail
            ])
            try data.write(to: path, options: .atomic)
        } catch {
            os_log("ASC_CAPTURE_RECEIPT_ERROR %{public}@", log: Self.captureLog, type: .error, request.token)
        }
    }

    init(webView: WKWebView) {
        self.webView = webView
        emit("STARTED", Self.request!.route)
        timer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { [weak self] _ in self?.poll() }
    }
    deinit { timer?.invalidate() }
    private func poll() {
        guard !finished else { return }
        guard let request = Self.request, let webView = webView else { timer?.invalidate(); return }
        guard Date() < deadline else {
            finished = true
            emit("FAILED", "timeout")
            timer?.invalidate(); return
        }
        ticks += 1
        guard !evaluating, !webView.isLoading else {
            if ticks % 20 == 0 { emit("STATE", evaluating ? "javascript-pending" : "webview-loading") }
            return
        }
        evaluating = true
        if !navigated {
            // Wait for privacy blocking, public SDK config, React and actual
            // anonymous local history restoration before any online navigation.
            webView.evaluateJavaScript("location.origin === 'capacitor://localhost' && !!document.querySelector('#root main[data-mobile-ready=true]')") { [weak self] result, _ in
                guard let self = self else { return }
                self.evaluating = false
                guard !self.finished, Date() < self.deadline else { return }
                guard result as? Bool == true else {
                    if self.ticks % 20 == 0 { self.emit("STATE", "local-bootstrap-pending") }
                    return
                }
                self.navigated = true
                if request.route != "reminder", let url = URL(string: "https://www.kakomon-ai.jp" + request.route) {
                    webView.load(URLRequest(url: url))
                }
            }
            return
        }
        let encoded = try! JSONSerialization.data(withJSONObject: ["route": request.route])
        let prefix = "const captureRequest = " + String(data: encoded, encoding: .utf8)! + ";\n"
        webView.evaluateJavaScript("(() => {\n" + prefix + Self.pageScript + "\n})()") { [weak self] result, error in
            guard let self = self else { return }
            self.evaluating = false
            guard !self.finished, Date() < self.deadline else { return }
            if let state = result as? String, state == "ready" {
                self.finished = true
                self.emit("READY", request.route)
                self.timer?.invalidate()
            } else if self.ticks % 20 == 0 {
                self.emit("STATE", (result as? String) ?? (error == nil ? "pending" : "javascript-error"))
            }
        }
    }

    // ASC_CAPTURE_PAGE_SCRIPT: evaluated only by the gated simulator helper.
    static let pageScript = #"""
const route = captureRequest.route;
const local = route === 'reminder';
if (location.origin !== (local ? 'capacitor://localhost' : 'https://www.kakomon-ai.jp') ||
    (!local && location.pathname !== route)) return 'waiting for expected URL';
if (document.readyState !== 'complete') return 'waiting for document';
const visible = e => !!e && e.getClientRects().length > 0;
const inViewport = e => { if (!visible(e)) return false; const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
const state = window.__ascCapturePage ??= { stable: '', since: Date.now() };
const pending = reason => { state.stable = ''; state.since = Date.now(); return reason; };
if ([...document.querySelectorAll('main [aria-busy=true],main [role=progressbar],main .animate-spin')].some(inViewport) ||
    [...document.querySelectorAll('main p,main span,main div')].some(e => inViewport(e) && e.children.length === 0 && /^(読み込み中|Loading)[.…。\s]*$/i.test(e.innerText.trim()))) return pending('waiting for loading indicator');
// Use existing, explicit dismissal controls; never accept consent or start a quiz.
for (const dialog of document.querySelectorAll('[role=dialog],dialog[open]')) {
  if (!visible(dialog)) continue;
  const privacy = /cookie|クッキー|広告|プライバシー/i.test(dialog.innerText);
  const labels = privacy ? ['同意しない', 'すべて拒否', 'Reject all', 'Reject All'] : ['スキップ', 'スキップして閉じる', 'あとで'];
  const button = [...dialog.querySelectorAll('button')].find(b => visible(b) && !b.disabled && labels.includes(b.textContent.trim()));
  if (!button) return pending('blocked by unknown dialog');
  button.click(); return pending('dismissing dialog');
}
if (!local && !visible(document.querySelector('[aria-label="iPhoneの学習機能"]'))) return pending('waiting for native online tools');
let selector = local ? 'input[type=time]' : 'main h1';
if (route === '/') {
  const filter = [...document.querySelectorAll('#choose-qualification button')].find(b => b.textContent.trim() === 'IT・情報処理');
  if (!visible(filter)) return pending('waiting for IT filter');
  if (filter.getAttribute('aria-pressed') !== 'true') { filter.click(); return pending('selecting IT filter'); }
  if (!visible(document.querySelector('#qualification-results a[href="/ap"]'))) return pending('waiting for qualifications');
  selector = '#choose-qualification';
}
const target = document.querySelector(selector);
if (!visible(target) || (local && !document.querySelector('main[data-mobile-ready=true]'))) return pending('waiting for screen');
const mainText = document.querySelector('main')?.innerText ?? '';
if (route === '/review' && !mainText.includes('復習キューはまだ空です')) return pending('waiting for actual empty review');
if (route === '/account/dashboard' && !mainText.includes('総問題数')) return pending('waiting for actual dashboard data');
document.activeElement?.blur();
target.scrollIntoView({block:'start',behavior:'instant'});
if (document.fonts.status !== 'loaded') return pending('waiting for fonts');
if (![...document.images].filter(e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }).every(e => e.complete && e.naturalWidth > 0)) return pending('waiting for visible images');
// Require a settled layout, text and scroll position for two seconds. This also
// lets React hydration, anonymous history reads and dismissal effects settle.
const signature = JSON.stringify([document.body.innerText, target.getBoundingClientRect().top, scrollY, document.body.scrollHeight]);
if (state.stable !== signature) { state.stable = signature; state.since = Date.now(); }
return Date.now() - state.since >= 2000 ? 'ready' : 'waiting for stable layout';
"""#
}
#endif

@objc(QualificationBridgePlugin)
public class QualificationBridgePlugin: CAPPlugin, CAPBridgedPlugin, EKEventEditViewDelegate {
    public let identifier = "QualificationBridgePlugin"
    public let jsName = "QualificationBridge"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "openUniversalLink", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "presentCalendar", returnType: CAPPluginReturnPromise)
    ]
    private let store = EKEventStore()
    private var pending: CAPPluginCall?

    @objc func openUniversalLink(_ call: CAPPluginCall) {
        guard let text = call.getString("url"), let url = URL(string: text),
              url.scheme == "https", url.host == "tsugino-shikaku.jp",
              url.user == nil, url.password == nil, url.port == nil,
              url.query == nil, url.fragment == nil,
              url.path.range(of: "^/shikaku/[a-z0-9][a-z0-9-]{0,99}$", options: .regularExpression) != nil else {
            call.reject("資格の情報ページだけを開けます。", "INVALID_URL")
            return
        }
        DispatchQueue.main.async {
            UIApplication.shared.open(url, options: [.universalLinksOnly: true]) { opened in
                call.resolve(["opened": opened])
            }
        }
    }

    @objc func presentCalendar(_ call: CAPPluginCall) {
        // iOS 17's out-of-process editor needs no calendar access permission.
        // Older iOS versions keep the information link but cannot use this feature.
        guard #available(iOS 17.0, *) else {
            call.reject("カレンダー追加にはiOS 17以降が必要です。", "IOS_17_REQUIRED")
            return
        }
        DispatchQueue.main.async {
            guard self.pending == nil, let host = self.bridge?.viewController,
                  host.presentedViewController == nil else {
                call.reject("開いている画面を閉じてから再度お試しください。", "EDITOR_BUSY")
                return
            }
            let formatter = DateFormatter()
            formatter.locale = Locale(identifier: "en_US_POSIX")
            formatter.calendar = Calendar(identifier: .gregorian)
            formatter.timeZone = .current
            formatter.dateFormat = "yyyy-MM-dd"
            formatter.isLenient = false
            guard let title = call.getString("title"), !title.isEmpty, title.count <= 1000,
                  let startText = call.getString("startDay"), let start = formatter.date(from: startText), formatter.string(from: start) == startText,
                  let endText = call.getString("endDay"), let end = formatter.date(from: endText), formatter.string(from: end) == endText, end > start,
                  let sourceText = call.getString("sourceUrl"), let source = URL(string: sourceText),
                  source.scheme == "https", source.host != nil, source.user == nil, source.password == nil,
                  let notes = call.getString("notes"), notes.count <= 10000 else {
                call.reject("日程と出典の形式を確認してください。", "INVALID_EVENT")
                return
            }
            let event = EKEvent(eventStore: self.store)
            event.title = title
            event.startDate = start
            event.endDate = end
            event.isAllDay = true
            event.timeZone = nil // Floating calendar day preserves the Japanese date abroad.
            event.url = source
            event.notes = notes
            let editor = EKEventEditViewController()
            editor.eventStore = self.store
            editor.event = event
            editor.editViewDelegate = self
            editor.isModalInPresentation = true
            self.pending = call
            host.present(editor, animated: true)
        }
    }

    public func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
        let call = pending
        pending = nil
        controller.dismiss(animated: true) { call?.resolve(["saved": action == .saved]) }
    }
}
