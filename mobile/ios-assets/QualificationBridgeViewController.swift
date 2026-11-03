import Capacitor
import UIKit
import EventKit
import EventKitUI

@objc(QualificationBridgeViewController)
class QualificationBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(QualificationBridgePlugin())
    }
}

@objc(QualificationBridgePlugin)
public class QualificationBridgePlugin: CAPPlugin, CAPBridgedPlugin, EKEventEditViewDelegate {
    public let identifier = "QualificationBridgePlugin"
    public let jsName = "QualificationBridge"
    public let pluginMethods = [
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
